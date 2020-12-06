'use strict';

import { delay, randomError as randomErrorUtil } from '../utils';

const provider = (function() {
  const provide = function(config = {}) {
    var randomError = config.noRandomError
      ? promise => promise
      : randomErrorUtil;
    var sessions = config.sessions || {};
    var users = config.users || {
      grtjn: {
        role: 'super-user',
        pwd: 'grtjn',
        profile: {
          fullname: 'Grtjn the Super user',
          emails: ['grtjn@foo.biz']
        }
      },
      bernard: {
        role: 'editor',
        pwd: 'bernard',
        profile: {
          fullname: 'Bernard the Editor',
          emails: ['bernard@foo.biz']
        }
      },
      john: {
        role: 'user',
        pwd: 'john',
        profile: {
          fullname: 'John the User',
          emails: ['john@foo.biz']
        }
      }
    };

    const status = function() {
      let session = config.sessionId ? sessions[config.sessionId] : null;
      return randomError(
        delay(200, 2000).then(() => ({
          username: session ? session.user : undefined,
          authenticated: !!session
        }))
      );
    };

    const login = function(user, pwd, returnSession = true) {
      // invalidate existing session
      if (config.sessionId && sessions[config.sessionId]) {
        delete sessions[config.sessionId];
      }
      if (users[user] && users[user].pwd === pwd) {
        // create new session
        let sessionId = '' + Math.random();
        sessions[sessionId] = {
          user
        };
        return randomError(
          delay(200, 2000).then(() => ({
            username: user,
            authenticated: true,
            sessionId: returnSession ? sessionId : undefined
          }))
        );
      } else {
        return delay(200, 2000).then(() => ({
          isError: true,
          error: {
            status: 401,
            statusText: 'Unauthorized',
            message: 'Unauthorized',
            url: '/api/auth/login'
          }
        }));
      }
    };

    const logout = function() {
      // invalidate existing session
      if (config.sessionId && sessions[config.sessionId]) {
        delete sessions[config.sessionId];
      }
      return randomError(delay(200, 2000).then(() => ({})));
    };

    const profile = function(profile) {
      let session = config.sessionId ? sessions[config.sessionId] : null;
      if (!session) {
        return delay(200, 2000).then(() => ({
          isError: true,
          error: {
            status: 401,
            statusText: 'Unauthorized',
            message: 'Unauthorized',
            url: '/api/auth/profile'
          }
        }));
      } else if (profile !== undefined) {
        // update, if allowed
        if (config.disallowUpdates) {
          return delay(200, 2000).then(() => ({
            isError: true,
            error: {
              status: 403,
              statusText: 'Forbidden',
              message: 'Forbidden',
              url: '/api/auth/profile'
            }
          }));
        } else {
          users[session.user].profile = profile;
          return randomError(delay(200, 2000).then(() => ({})));
        }
      } else {
        // get
        return randomError(
          delay(200, 2000).then(() => users[session.user].profile)
        );
      }
    };

    return {
      name: 'AuthClient',
      status,
      login,
      logout,
      profile
    };
  };

  return provide;
})();

export default provider;
