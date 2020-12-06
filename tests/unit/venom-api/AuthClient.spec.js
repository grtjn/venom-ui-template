/**
 * @jest-environment node
 */

import { AuthClient } from '@/venom-api/stub-client';

const venomAppHost = process.env.VENOM_TEST_HOST || 'localhost';
const venomAppPort = process.env.VENOM_TEST_PORT || '9003';
const venomBaseUrl = 'http://' + venomAppHost + ':' + venomAppPort + '/';

const userName = process.env.VENOM_TEST_USER || 'venom-app-user';
const userPass = process.env.VENOM_TEST_PWD || 'iINQY4Ufa';

console.log(
  'Testing venom-api/stub-client/AuthClient.js against ' + venomBaseUrl
);

var authClientNoLogin;
var configNoLogin = {
  baseURI: venomBaseUrl,
  noRandomEror: true
};

var authClientWithLogin;
var configWithLogin = {
  baseURI: venomBaseUrl,
  noRandomEror: true
};

beforeAll(() => {
  authClientNoLogin = AuthClient(configNoLogin);
  authClientWithLogin = AuthClient(configWithLogin);
  return authClientWithLogin.login(userName, userPass, true).then(json => {
    configWithLogin.sessionId = json.sessionId;
  }, console.log);
});

describe('AuthClient', () => {
  it('can get status without Cookie', () => {
    return authClientNoLogin.status().then(response => {
      expect(response).toMatchObject({
        authenticated: false
      });
    });
  });

  it('can get status with Cookie', () => {
    return authClientWithLogin.status().then(response => {
      expect(response).toMatchObject({
        authenticated: true
      });
    });
  });

  it('can get profile', () => {
    return authClientWithLogin.profile().then(response => {
      expect(response).toMatchObject({});
    });
  });

  it('can logout', () => {
    return authClientWithLogin.logout().then(response => {
      expect(response).toBeDefined();
    });
  });

  it('can not get profile after logout', () => {
    return authClientNoLogin.profile().then(response => {
      expect(response).toMatchObject({
        isError: true,
        error: {
          status: 401
        }
      });
    });
  });
});
