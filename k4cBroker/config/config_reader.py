import configparser


class ConfigReader:

    def __init__(self, filepath):
        self._filepath = filepath
        self._config = configparser.ConfigParser()

    def load(self):
        self._config.read(self._filepath)

    def _get_prop(self, prop):
        if self._config is not None:
            return self._config['DEFAULT'].get(prop)
        return None

    def get_publish_port(self):
        return self._get_prop('PublishPort')

    def get_consumer_start_port(self):
        return self._get_prop('ConsumerStartPort')

    def get_consumer_end_port(self):
        return self._get_prop('ConsumerEndPort')


