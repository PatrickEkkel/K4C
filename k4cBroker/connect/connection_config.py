
class ConnectionConfig:
    def __init__(self, port, address):
        self._port = port
        self._address = address

    def get_port(self):
        return self._port

    def get_address(self):
        return self._address

    def __str__(self):
        return "tcp://%s:%s" % (self.get_address(), self.get_port())

    @staticmethod
    def create_from_url(url):
        url = url.replace('tcp://', '')
        elements = url.split(':')
        port = int(elements[1])
        address = elements[0]
        return ConnectionConfig(port, address)
