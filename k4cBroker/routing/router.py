import json

from connect.connection_config import ConnectionConfig
from connect.publisher import Publisher
from routing.consumer_manager import ConsumerManager


class RouterBuilder:
    def __init__(self, consumer_manager):
        self._consumer_manager = consumer_manager

    def create_router(self):
        return Router(self._consumer_manager)

    def create_router_from_config(self, config):
        router = Router(self._consumer_manager, config=config)
        return router


class Router:

    def __init__(self, consumer_manager, config=None):
        # TODO: fix the 127.0.0.1 hardcoded bit
        if config is None:
            publisher_connection = ConnectionConfig(5020, "127.0.0.1")
        else:
            publisher_connection = ConnectionConfig(int(config.get_publish_port()), "127.0.0.1")
        self._consumer_manager = consumer_manager
        self._consumer = self._consumer_manager.create_new_consumer()
        self._publisher = Publisher(publisher_connection)
        self._consumer.set_callback(self._incoming)

    def _incoming(self, received_data):
        data = self._consumer.pull()
        while data is not None:
            print('received data ')
            payload = data['data']
            topic = payload['topic']
            topic_data = payload['data']
            self._publisher.publish(topic, topic_data)
            data = self._consumer.pull()

    def serve(self):
        self._publisher.start()
        self._consumer.start()
        self._consumer.listen()

    def stop(self):
        self._publisher.stop()
        self._consumer.stop()

    def get_advertised_push_url(self):
        return self._consumer.get_advertised_url()

    def get_advertised_publish_url(self):
        return self._publisher.get_advertised_url()



