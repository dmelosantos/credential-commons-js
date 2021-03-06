const UCA = require('./uca/UserCollectableAttribute');
const VC = require('./creds/VerifiableCredential');
const { initServices } = require('./services/index');
const isValidGlobalIdentifier = require('./isValidGlobalIdentifier');
const isClaimRelated = require('./isClaimRelated');
/**
 * Entry Point for Civic Credential Commons
 * @returns {CredentialCommons}
 * @constructor
 */
function CredentialCommons() {
  this.UCA = UCA;
  this.VC = VC;
  this.init = initServices;
  this.isValidGlobalIdentifier = isValidGlobalIdentifier;
  this.isClaimRelated = isClaimRelated;
  return this;
}

// to work with entry points in multi module manage the best way
module.exports = new CredentialCommons();