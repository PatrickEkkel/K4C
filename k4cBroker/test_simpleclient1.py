import time
import sys
sys.path.insert(0, '/path/to/Project')
from client.simple_client import SimpleClient
push_config = SimpleClient.get_push_config("http://localhost:5000")
publish_config = SimpleClient.get_publish_config("http://localhost:5000")

client = SimpleClient(push_config)
client.connect()
client.push("TEST", "bla")

