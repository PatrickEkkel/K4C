import unittest

from config.config_reader import ConfigReader


class BrokerTests(unittest.TestCase):

    def test_read_property(self):
        configreader = ConfigReader('tests/resources/config.test')
        configreader.load()
        self.assertEqual('5030', configreader.get_publish_port())
        self.assertEqual('5001', configreader.get_consumer_start_port())
        self.assertEqual('5010', configreader.get_consumer_end_port())

    def test_read_nonexistant_prop(self):
        configreader = ConfigReader('tests/resources/config.borked')
        configreader.load()
        self.assertEqual(None, configreader.get_publish_port())
