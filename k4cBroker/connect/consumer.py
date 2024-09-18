import json
from threading import Thread

import zmq
import queue


class Consumer:

    def __init__(self, config):
        self._context = zmq.Context()
        self._socket = self._context.socket(zmq.PULL)
        self._config = config
        self._running = False
        self._thread = Thread(target=self._do_listen)
        self._callback = None
        self._queue = queue.Queue()

    def set_callback(self, callback):
        self._callback = callback

    def _do_listen(self):
        while self._running:
            try:
                data = self._socket.recv_json()
                if self._callback is not None:
                    self._queue.put(data)
                    self._callback(data)
            except Exception as ex:
                print(ex)
                pass

    def start(self):
        conn_string = "tcp://%s:%s" % (self._config.get_address(), self._config.get_port())
        self._socket.connect(conn_string)

    def listen(self):
        self._running = True
        self._thread.start()

    def pull(self):
        if not self._queue.empty():
            result = self._queue.get()
            if result is not None:
                self._queue.task_done()
                return result
        return None

    def stop(self):
        self._running = False
        self._context.destroy(False)

    def get_advertised_url(self):
        return "tcp://%s:%s" % (self._config.get_address(), self._config.get_port())
