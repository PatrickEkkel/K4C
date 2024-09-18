import threading
import atexit
from flask import Flask
from routing.consumer_manager import ConsumerManager
from routing.router import RouterBuilder
from config.config_reader import ConfigReader

POOL_TIME = 1  # Seconds

# variables that are accessible from anywhere
common_data_struct = {}
# lock to control access to variable
data_lock = threading.Lock()
# timer handler
your_timer = threading.Timer(0, lambda x: None, ())
config = ConfigReader('config.default')
config.load()
consumer_manager = ConsumerManager(config=config)
traffic_router = RouterBuilder(consumer_manager).create_router_from_config(config)


def create_app():
    app = Flask(__name__)

    def interrupt():
        global your_timer
        your_timer.cancel()
        common_data_struct['router'].stop()

    def run():
        global common_data_struct
        global your_timer
        your_timer = threading.Timer(POOL_TIME, run, ())
        your_timer.start()

    def start_background():
        # Do initialisation stuff here
        global your_timer
        # Create your timer
        your_timer = threading.Timer(POOL_TIME, run, ())
        common_data_struct['router'] = traffic_router
        common_data_struct['router'].serve()
        your_timer.start()

    # Initiate
    start_background()
    # When you kill Flask (SIGTERM), cancels the timer
    atexit.register(interrupt)
    return app


app = create_app()


def get_active_endpoints():
    endpoints = {'push_url': traffic_router.get_advertised_push_url(),
                 'publish_url': traffic_router.get_advertised_publish_url()}

    return endpoints


@app.route('/')
def get_urls():
    return get_active_endpoints()
