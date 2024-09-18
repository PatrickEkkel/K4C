import zmq
from threading import Thread


class Subscriber:
    def __init__(self):
        self._topics = []
        self._messages = []
        self._callback = None
        self._context = zmq.Context()
        self._socket = self._context.socket(zmq.SUB)
        self._running = False
        self._thread = Thread(target=self._do_listen)

    def _do_listen(self):
        while self._running:
            try:
                recv_data = self._socket.recv_string()
                split_array = recv_data.split(':')
                recieved_topic = split_array[0]
                if recieved_topic in self._topics:
                    if self._callback is not None:
                        # TODO: Maybe create Messagetypes here at a later stage.
                        self._messages.append(recv_data)
                        self._callback(recieved_topic, split_array[1])
            except Exception as ex:
                print(ex)
                pass

    def set_callback(self, callback):
        self._callback = callback

    def connect(self, address, port):
        url = f"tcp://{address}:%s" % port
        print('subscribed to: ' + url)
        self._socket.connect(url)

    def subscribe(self, topic):
        if topic not in self._topics:
            self._topics.append(topic)
        pass

    def listen(self):
        self._running = True
        self._socket.setsockopt_string(zmq.SUBSCRIBE, '')

        self._thread.start()

    def stop(self):
        self._running = False
        self._context.destroy(False)
        #self._thread.join()

