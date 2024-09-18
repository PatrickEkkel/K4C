import zmq


class Producer:

    def __init__(self, config):
        self._context = zmq.Context()
        self._socket = self._context.socket(zmq.PUSH)
        self._config = config

    def start(self):
        conn_string = "tcp://%s:%s" % (self._config.get_address(), self._config.get_port())
        self._socket.bind(conn_string)

    def stop(self):
        self._context.destroy(False)

    def push(self, data):
        message = {'data': data}
        self._socket.send_json(message)

