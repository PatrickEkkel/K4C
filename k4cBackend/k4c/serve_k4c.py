import os
import threading
import time
from watchdog.observers import Observer
from watchdog.events import PatternMatchingEventHandler

event_queue = []
build_in_progress = False


def podman_worker(name):
    global build_in_progress
    print(f'podman worker {name} started')
    while True:
        if len(event_queue) > 0 and not build_in_progress:
            # something has changed. Rebuild the backend container
            build_in_progress = True
            event_queue.clear()
            run_podman_build()
            # backoff for 3 seconds
            time.sleep(3)
            build_in_progress = False

def build_base_image():
    os.system('podman build -f Containerfile_K4CBase -t k4c_python_base')

def run_podman_build():
    os.system('podman build -f Containerfile -t k4c_backend')
    print("backend build completed successfully!")


def queue_event():
    event_queue.append('file_mutation')


def on_created(event):
    queue_event()


def on_deleted(event):
    queue_event()


def on_modified(event):
    queue_event()


def on_moved(event):
    queue_event()


if __name__ == "__main__":
    patterns = ["*"]
    # TODO: read_from git ignore maybe
    ignore_patterns = [".idea", "*.zip,**/__pycache__/*.pyc"]
    my_event_handler = PatternMatchingEventHandler(patterns=["*"],
                                                   ignore_patterns=ignore_patterns,
                                                   ignore_directories=False,
                                                   case_sensitive=True)
    my_event_handler.on_created = on_created
    my_event_handler.on_deleted = on_deleted
    my_event_handler.on_modified = on_modified
    my_event_handler.on_moved = on_moved
    path = "."
    go_recursively = True
    x = threading.Thread(target=podman_worker, args=(1,))
    x.start()
    my_observer = Observer()
    my_observer.schedule(my_event_handler, path, recursive=go_recursively)
    print('Building base container')
    build_base_image()
    print('watching for file changes...')
    my_observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        my_observer.stop()
        my_observer.join()








