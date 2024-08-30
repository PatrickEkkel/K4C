import packageInfo  from '../../package.json';
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api/v1',
  localUrl: 'http://localhost:4200',
  jwtLogin: 'api-token-auth/',
  jwtRefresh: 'api-token-refresh/',
  version: packageInfo.version
};
