from threading import Thread

import zmq


class Publisher:

    def __init__(self, config):
        self._config = config
        self._context = zmq.Context()
        self._socket = self._context.socket(zmq.PUB)

    def start(self):
        conn_string = "tcp://%s:%s" % (self._config.get_address(), self._config.get_port())

        self._socket.bind(conn_string)

    def publish(self, topic, data):
        payload = "%s:%s" % (topic, data)
        print(f"Publishing: %s" % payload)
        self._socket.send_string(payload)

    def stop(self):
        self._context.destroy(False)

    def get_advertised_url(self):
        return str(self._config)

