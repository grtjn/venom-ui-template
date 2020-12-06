'use strict';

const factory = (function() {
  const AuthClient = function(config) {
    return require('./AuthClient').default(config);
  };

  return {
    name: 'VenomApi',
    AuthClient
  };
})();

export default factory;
export const AuthClient = factory.AuthClient;
