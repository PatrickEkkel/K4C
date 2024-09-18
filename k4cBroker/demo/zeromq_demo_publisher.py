import time
import zmq
context = zmq.Context()
socket = context.socket(zmq.PUB)
socket.bind('tcp://127.0.0.1:2000')

# Allow clients to connect before sending data
time.sleep(10)
socket.send_string("bla bla")
