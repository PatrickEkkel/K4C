import json
import queue
import requests

from connect import producer, subscriber
from connect.connection_config import ConnectionConfig


class SimpleClient:

    def __init__(self, push_config=None, publish_config=None):
        self.push_config = push_config
        self.publish_config = publish_config
        self._queue = queue.Queue()
        self._producer = None
        self._subscriber = None
        if push_config is not None:
            self._producer = producer.Producer(self.push_config)
        if publish_config is not None:
            self._subscriber = subscriber.Subscriber()

    @staticmethod
    def get_push_config(push_config_location):
        response = requests.get(push_config_location)
        config_dict = response.json()
        return ConnectionConfig.create_from_url(config_dict['push_url'])

    @staticmethod
    def get_publish_config(publish_config_location):
        response = requests.get(publish_config_location)
        config_dict = response.json()
        return ConnectionConfig.create_from_url(config_dict['publish_url'])

    def connect(self):
        if self.push_config is not None:
            self._producer.start()
        if self.publish_config is not None:
            self._subscriber.connect(self.publish_config.get_address(), self.publish_config.get_port())
            self._subscriber.set_callback(self._incoming_data)
            self._subscriber.listen()

    def subscribe(self, topic):
        self._subscriber.subscribe(topic)

    def push(self, topic, data):
        value_dict = {'topic': topic, 'data': data}
        self._producer.push(value_dict)

    def _incoming_data(self, topic, data):
        self._queue.put({'topic': topic, 'data': data})

    def get_next_received_message(self):
        return self._queue.get()
    
    def stop(self):
        if self._subscriber:
            self._subscriber.stop()
        if self._producer:
            self._producer.stop()
        self._queue = queue.Queue()




