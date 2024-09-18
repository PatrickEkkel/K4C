from connect.consumer import Consumer
from connect.connection_config import ConnectionConfig


class ConsumerManager(object):

    def __init__(self, config=None):
        self.consumers = []
        # TODO: this should come from a configuration file
        if config is None:
            self.start_port_range = 5000
            self.end_port_range = 5010
        else:
            self.start_port_range = int(config.get_consumer_start_port())
            self.end_port_range = int(config.get_consumer_end_port())
        self.current_port_range = self.start_port_range

    def create_new_consumer(self):
        # TODO: address should come from a configuration file
        config = ConnectionConfig(self.current_port_range, "127.0.0.1")
        consumer = Consumer(config)
        self.consumers.append(consumer)
        self._increment_port_range()
        return consumer

    def _increment_port_range(self):
        self.current_port_range += 1
