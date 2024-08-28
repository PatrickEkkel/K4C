import packageInfo  from '../../package.json';
export const environment = {
  production: false,
  apiUrl: 'http://localhost:4200/',
  localUrl: 'http://localhost:4200',
  version: packageInfo.version
};
