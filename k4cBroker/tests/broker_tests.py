import unittest
import time

from connect.consumer import Consumer
from connect.producer import Producer
from connect.publisher import Publisher
from connect.connection_config import ConnectionConfig
from connect.subscriber import Subscriber
from routing.consumer_manager import ConsumerManager
from routing.router import RouterBuilder
from client.simple_client import SimpleClient


class ZmqTester:

    def __init__(self):
        self.callback_called = False
        self._retry_counter = 0

    def callback_with_topic(self, topic, data):
        print('callback received')
        self.callback_called = True

    def callback_with_json(self, json):
        print("callback received")
        self.callback_called = True

    def wait_for_callback(self):
        result = False
        while True:
            time.sleep(2)
            self._retry_counter += 1
            if self.callback_called:
                result = True
                break
            if self._retry_counter == 3:
                break
        return result

    def reset(self):
        self._retry_counter = 0
        self.callback_called = False


class BrokerTests(unittest.TestCase):

    def test_publish_subcribe(self):
        tester = ZmqTester()
        config = ConnectionConfig(2000, '127.0.0.1')
        publisher = Publisher(config)
        subscriber = Subscriber()
        publisher.start()
        subscriber.subscribe("test")
        subscriber.connect("127.0.0.1", 2000)
        subscriber.set_callback(tester.callback_with_topic)
        subscriber.listen()
        time.sleep(2)
        publisher.publish("test", "stukkie data")
        result = tester.wait_for_callback()
        subscriber.stop()
        publisher.stop()
        self.assertTrue(result)

    def test_push_pull(self):
        test = ZmqTester()
        push_config = ConnectionConfig(2001, '127.0.0.1')
        pull_config = ConnectionConfig(2001, '127.0.0.1')

        producer = Producer(push_config)
        consumer = Consumer(pull_config)
        consumer.set_callback(test.callback_with_json)
        producer.start()
        consumer.start()
        consumer.listen()
        time.sleep(2)
        producer.push("stukkie tekst")
        time.sleep(2)
        result = test.wait_for_callback()
        consumer.stop()
        producer.stop()
        self.assertTrue(result)
        self.assertEquals("stukkie tekst", consumer.pull()['data'])

    # create a broker instance. Subscribe to the topic "TEST" with a broker client
    # create a borker client. PUSH a worker load to the broker with TOPIC "TEST
    # Verify that the broker forwards the message from broker_client1 to broker_client2
    def test_broker_routing_1(self):
        consumer_manager = ConsumerManager()
        router = RouterBuilder(consumer_manager).create_router()
        push_url = router.get_advertised_push_url()
        publish_url = router.get_advertised_publish_url()
        push_config = ConnectionConfig.create_from_url(push_url)
        publish_config = ConnectionConfig.create_from_url(publish_url)
        simple_client = SimpleClient(push_config, publish_config)
        router.serve()
        simple_client.connect()
        simple_client.push('TEST', 'bla')
        simple_client.subscribe('TEST')
        time.sleep(3)
        message = simple_client.get_next_received_message()
        self.assertEqual('TEST', message['topic'])
        self.assertEqual('bla', message['data'])

        simple_client.stop()
        router.stop()





if __name__ == '__main__':
    unittest.main()
