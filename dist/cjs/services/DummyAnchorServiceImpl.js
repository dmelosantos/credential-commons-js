'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Current Anchor/Attester service
 *
 */
const uuid = require('uuid/v4');
const logger = require('../logger');

/**
 * An Anchor/Attester implementation
 *
 * @param {*} config
 * @param {*} http
 */
function DummyAnchorServiceImpl(config, http) {
  var _this = this;

  this.config = config;
  this.http = http;
  const pollService = (() => {
    var _ref = _asyncToGenerator(function* (statusUrl) {
      try {
        const attestation = yield _this.http.request({
          url: statusUrl,
          method: 'GET',
          simple: true,
          json: true
        });

        if (!attestation || !attestation.type) {
          return yield pollService(statusUrl);
        }
        if (attestation && attestation.type !== 'permanent') {
          attestation.statusUrl = statusUrl;
          return attestation;
        }
        return attestation;
      } catch (error) {
        logger.error(`Error polling: ${statusUrl}`, JSON.stringify(error, null, 2));
        throw new Error(`Error polling: ${statusUrl}`);
      }
    });

    return function pollService(_x) {
      return _ref.apply(this, arguments);
    };
  })();

  this.anchor = (() => {
    var _ref2 = _asyncToGenerator(function* (label, data, options) {
      return Promise.resolve({
        subject: {
          pub: 'xpub:dummy',
          label,
          data,
          signature: 'signed:dummy'
        },
        walletId: 'none',
        cosigners: [{
          pub: 'xpub:dummy'
        }, {
          pub: 'xpub:dummy'
        }],
        authority: {
          pub: 'xpub:dummy',
          path: '/'
        },
        coin: 'dummycoin',
        tx: new uuid(), // eslint-disable-line
        network: 'dummynet',
        type: 'temporary',
        civicAsPrimary: false,
        schema: 'dummy-20180201'
      });
    });

    return function (_x2, _x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  })();

  this.update = (() => {
    var _ref3 = _asyncToGenerator(function* (tempAnchor) {
      tempAnchor.type = 'permanent'; // eslint-disable-line
      tempAnchor.value = new uuid(); // eslint-disable-line
      return Promise.resolve(tempAnchor);
    });

    return function (_x5) {
      return _ref3.apply(this, arguments);
    };
  })();

  this.verifySignature = signature => {
    return true;
  };

  /**
   * This method checks if the subject signature matches the pub key
   * @param subject a json with label, data, signature, pub
   * @returns {*} true or false for the validation
   */
  this.verifySubjectSignature = subject => {
    return true;
  };

  /**
   * This method checks that the attestation / anchor exists on the BC
   */
  this.verifyAttestation = (() => {
    var _ref4 = _asyncToGenerator(function* (signature) {
      return true;
    });

    return function (_x6) {
      return _ref4.apply(this, arguments);
    };
  })();

  this.revokeAttestation = (() => {
    var _ref5 = _asyncToGenerator(function* (signature) {
      signature.revoked = true; // eslint-disable-line
      return Promise.resolve(signature);
    });

    return function (_x7) {
      return _ref5.apply(this, arguments);
    };
  })();

  this.isRevoked = signature => {
    return signature.revoked ? signature.revoked : false;
  };

  return this;
}

module.exports = {
  CurrentCivicAnchor: DummyAnchorServiceImpl
};