from connect.subscriber import Subscriber

sub = Subscriber()
sub.connect('127.0.0.1', 2000)


def handle_message(topic, data):
    print(data)


sub.subscribe("test")
sub.set_callback(handle_message)
sub.listen()

