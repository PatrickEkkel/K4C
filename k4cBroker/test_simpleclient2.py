import time

from client.simple_client import SimpleClient
publish_config = SimpleClient.get_publish_config("http://localhost:5000")

client = SimpleClient(push_config=None, publish_config=publish_config)
client.connect()
client.subscribe("TEST")
while True:
    message = client.get_next_received_message()
    if message is not None:
        print(message)
        break


client.stop()
print('done')


