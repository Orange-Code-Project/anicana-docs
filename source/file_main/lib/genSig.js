const ethAbi = require("ethereumjs-abi");
const ethUtil = require("ethereumjs-util");
const { web3 } = require("openzeppelin-test-helpers/src/setup");
const { genSigConfig,eggSigConfig,arcanaSigConfig,incubatorSigConfig,personaSigConfig } = require("./genSig.cfg.json");
/**
 * Javascript module to construct and hash EIP-712 typed messages to be signed by private key.
 * [EIP712]{@link https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md} standard
 *
 * @author Ashwin Yardi
 * @module eip712Signature
 */

const { padLeft, sha3 } = require("web3-utils");
const web3EthAbi = require("web3-eth-abi");

function keccak256Hash(data) {
  return padLeft(sha3(data).slice(2), 64);
}

/**
 * Create 'type' component of a struct
 *
 * @method encodeStruct
 * @param {string} primaryType the top-level type of the struct
 * @param {Object} types set of all types encompassed by struct
 * @param {string} types.name name
 * @param {string} types.type type
 * @returns {string} encoded type string
 */
function encodeStruct(primaryType, types) {
  const findTypes = (type) =>
    [type].concat(
      types[type].reduce((acc, { type: typeKey }) => {
        if (types[typeKey] && acc.indexOf(typeKey) === -1) {
          return [...acc, ...findTypes(typeKey)];
        }
        return acc;
      }, [])
    );
  return [primaryType]
    .concat(
      findTypes(primaryType)
        .sort((a, b) => a.localeCompare(b))
        .filter((a) => a !== primaryType)
    )
    .reduce(
      (acc, key) =>
        `${acc}${key}(${types[key]
          .reduce((iacc, { name, type }) => `${iacc}${type} ${name},`, "")
          .slice(0, -1)})`,
      ""
    );
}

/**
 * Recursively encode a struct's data into a unique string
 *
 * @method encodeMessageData
 * @param {Object} types set of all types encompassed by struct
 * @param {string} types.name name
 * @param {string} types.type type
 * @param {string} primaryType the top-level type of the struct
 * @param {Object} message the struct instance's data
 * @returns {string} encoded message data string
 */
function encodeMessageData(types, primaryType, message) {
  return types[primaryType].reduce((acc, { name, type }) => {
    if (types[type]) {
      return `${acc}${keccak256Hash(
        `0x${encodeMessageData(types, type, message[name])}`
      )}`;
    }
    if(type === "string calldata") {
      return `${acc}${keccak256Hash(web3.utils.asciiToHex(message[name]))}`;
    }
    if (type === "string" || type === "bytes") {
      return `${acc}${keccak256Hash(message[name])}`;
    }
    if (type.includes("[")) {
      return `${acc}${keccak256Hash(
        web3EthAbi.encodeParameter(type, message[name])
      )}`;
    }
    return `${acc}${web3EthAbi
      .encodeParameters([type], [message[name]])
      .slice(2)}`;
  }, keccak256Hash(encodeStruct(primaryType, types)));
}

/**
 * generate EIP-712 domain separator
 */

/**
 * Construct EIP-712 standardised message hash to be signed.
 *
 * @method generateEip712Hash
 * @param {Object} typedData the EIP712 typed object
 * @returns {string} encoded message string
 */
function generateEip712Hash(typedData) {
  const domainSeparator = keccak256Hash(
    `0x${encodeMessageData(typedData.types, "EIP712Domain", typedData.domain)}`
  );
  const structHash = keccak256Hash(
    `0x${encodeMessageData(
      typedData.types,
      typedData.primaryType,
      typedData.message
    )}`
  );
  return `0x${keccak256Hash(`0x1901${domainSeparator}${structHash}`)}`;
}

const DOMAIN_TYPE = [
    {name: "name",              type: "string" },
    {name: "version",           type: "string"},
    {name: "chainId",           type: "uint256"},
    {name: "verifyingContract", type:"address"}
];
const APPROVE_TYPES = {
    EIP712Domain: DOMAIN_TYPE,
    Approve: [
        {name: "to",      type: "address" },
        {name: "tokenId", type: "uint256"},
        {name: "nonce",   type: "uint256"},
    ]
};
const TRANSFER_FROM_TYPES = {
  EIP712Domain: DOMAIN_TYPE,
  TransferFrom: [
      {name: "from",    type: "address" },
      {name: "to",      type: "address" },
      {name: "tokenId", type: "uint256"},
      {name: "nonce",   type: "uint256"},
  ]
};
const INCUBATE_TYPES = {
  EIP712Domain: DOMAIN_TYPE,
  Incubate: [
      {name: "eggTokenId", type: "uint256" },
      {name: "to",         type: "address" },
      {name: "seed",       type: "uint256"},
  ]
};

function domainData(contractInfo,verifierAddress) {
    return {
        name: contractInfo.name,
        version: contractInfo.version,
        chainId: genSigConfig.chainId,
        verifyingContract: verifierAddress
    }
}
/*
var __chainId = undefined;
async function getChainId(contract) {
  if(__chainId == undefined) {
    __chainId = await contract.getChainId();
  }
  return __chainId;
}
*/
function typedDataForApprove(pToAddress,pTokenId,pNonce,contractInfo,contract) {
  return {
    types: APPROVE_TYPES,
    domain: domainData(contractInfo,contract),
    primaryType:'Approve',
    message: {
      to: pToAddress,
      tokenId: pTokenId,
      nonce: pNonce 
    }
  }
}

function digestForApprove(pToAddress,pTokenId,pNonce,contractInfo,contract) {
  var td = typedDataForApprove(pToAddress,pTokenId,pNonce,contractInfo,contract);
  return generateEip712Hash(td);
}

function typedDataForTransferFrom(pFromAddress,pToAddress,pTokenId,pNonce,contractInfo,contract) {
  return {
    types: TRANSFER_FROM_TYPES,
    domain: domainData(contractInfo,contract),
    primaryType:'TransferFrom',
    message: {
      from: pFromAddress,
      to: pToAddress,
      tokenId: pTokenId,
      nonce: pNonce 
    }
  }
}

function digestForTransferFrom(pFromAddress,pToAddress,pTokenId,pNonce,contractInfo,contract) {
  var td = typedDataForTransferFrom(pFromAddress,pToAddress,pTokenId,pNonce,contractInfo,contract);
  return generateEip712Hash(td);
}

function typedDataForIncubate(pEggTokenId,pToAddress,pSeed,contract) {
  return {
    types: INCUBATE_TYPES,
    domain: domainData(incubatorSigConfig,contract),
    primaryType:'Incubate',
    message: {
      eggTokenId: pEggTokenId,
      to: pToAddress,
      seed: pSeed 
    }
  }
}

function digestForIncubate(pEggTokenId,pToAddress,pSeed,contract) {
  var td = typedDataForIncubate(pEggTokenId,pToAddress,pSeed,contract);
  return generateEip712Hash(td);
}

/**
 * 署名付きApprove用の nonce および 署名を作成。
 * 
 * 使用例<pre>
 * const genSig = require('path to genSig.js without .js extension. eg: ../genSig4Approve');
 * 
 * const toAddress = '0x1234.......abcdef':    // address: approve先
 * const tokenId = 123;                     // uint256: トークンID
 * const privateKey = '0xabcd.......ef';    // token ownerのprivate key
 * const arcana = await Arcana.deployed();
 * const sigData = genSig.forApprove(toAddr,tokenId,'Arcana',arcana, privateKey);
 * 
 * await arcana.methods["approve(address,uint256,uint256, bytes)"]
 *            (toAddr, tokenId, sigData.nonce, sigData.sign);
 * </pre>
 * @param {*} toAddress approve先address
 * @param {*} tokenId approve対象tokenId
 * @param {*} contractName 対象コントラクト名称 'Egg' or 'Arcana'
 * @param {*} contract 対象コントラクト（使用例参照）
 * @param {*} privateKey tokenIdオーナのprivate key
 * @returns 署名付approveに利用するnonce 及び 署名
 */
function forApprove(toAddress, tokenId, contractInfo, contract, privateKey) {
  const now = new Date();
  const nonce = Math.floor(now.getTime() / 1000) + genSigConfig.nonceOffset;
  const hash = digestForApprove(toAddress,tokenId,nonce,contractInfo,contract);
  // hash = ethAbi.soliditySHA3(["address", "uint256"], [toAddress, tokenId]);
  const {v, r, s} = ethUtil.ecsign(ethUtil.toBuffer(hash), ethUtil.toBuffer(privateKey));
  const sig = ethUtil.toRpcSig(v, r, s);
  return { nonce: nonce, sign: sig };
}

function signForEggApprove(toAddress, tokenId, contract, privateKey) {
  return forApprove(toAddress, tokenId, eggSigConfig, contract, privateKey);
}

function forEggApprove(toAddress, tokenId, contract, privateKey) {
  return signForEggApprove(toAddress, tokenId, contract.address, privateKey);
}

function signForArcanaApprove(toAddress, tokenId, contract, privateKey) {
  return forApprove(toAddress, tokenId, arcanaSigConfig, contract, privateKey);
}

function forArcanaApprove(toAddress, tokenId, contract, privateKey) {
  return signForArcanaApprove(toAddress, tokenId, contract.address, privateKey);
}

function signForPersonaApprove(toAddress, tokenId, contract, privateKey) {
  return forApprove(toAddress, tokenId, personaSigConfig, contract, privateKey);
}

function forPersonaApprove(toAddress, tokenId, contract, privateKey) {
  return signForPersonaApprove(toAddress, tokenId, contract.address, privateKey);
}


/**
 * 署名付きTransferFrom用の署名を作成。
 * 
 * 使用例<pre>
 * const genSig = require('path to genSig.js without .js extension. eg: ../genSig4Approve');
 * 
 * const fromAddress = '0x1234.......abcdef':    // address: approve先
 * const toAddress = '0x1234.......abcdef':    // address: approve先
 * const tokenId = 123;                     // uint256: トークンID
 * const privateKey = '0xabcd.......ef';    // token ownerまたはapproveされたprivate key
 * const sig = genSig.forTransferFrom(fromAddress,toAddr,tokenId,privateKey);
 * const arcana = await Arcana.deployed();
 * 
 * arcana.methods['transferFrom(address,address,uint256,bytes)']
 *              (fromAddress,toAddr,tokenId,sig),
 * </pre>
 * @param {*} from transfer元address
 * @param {*} to transfer先address
 * @param {*} tokenId transfer対象tokenId
 * @param {*} privateKey tokenIdオーナのprivate key
 * @returns 署名付approveに利用する署名
 */
function forTransferFrom(from,to,tokenId,contractInfo, contract,privateKey) {
  const now = new Date();
  const nonce = Math.floor(now.getTime() / 1000) + genSigConfig.nonceOffset;
  const hash = digestForTransferFrom(from,to,tokenId,nonce,contractInfo,contract);
//    const hash = ethAbi.soliditySHA3(["address", "address","uint256"], [from, to, tokenId]);
  const {v, r, s} = ethUtil.ecsign(ethUtil.toBuffer(hash), ethUtil.toBuffer(privateKey));
  const sig = ethUtil.toRpcSig(v, r, s);
  return { nonce: nonce, sign: sig };
}

function signForArcanaTransferFrom(from, to, tokenId, contract, privateKey) {
  return forTransferFrom(from,to, tokenId, arcanaSigConfig, contract, privateKey);
}
function forArcanaTransferFrom(from, to, tokenId, contract, privateKey) {
  return signForArcanaTransferFrom(from,to, tokenId, contract.address, privateKey);
}

function signForIncubate(eggTokenId,to,seed,contractAddr,privateKey) {
  const hash = digestForIncubate(eggTokenId,to,seed,contractAddr);
  const {v, r, s} = ethUtil.ecsign(ethUtil.toBuffer(hash), ethUtil.toBuffer(privateKey));
  return ethUtil.toRpcSig(v, r, s);
}

function forIncubate(eggTokenId,to,seed,contract,privateKey) {
  return signForIncubate(eggTokenId,to,seed,contract.address,privateKey);
}

function signForPersonaTransferFrom(from, to, tokenId, contract, privateKey) {
  return forTransferFrom(from,to, tokenId, personaSigConfig, contract, privateKey);
}
function forPersonaTransferFrom(from, to, tokenId, contract, privateKey) {
  return signForPersonaTransferFrom(from,to, tokenId, contract.address, privateKey);
}

module.exports = {
  digestForApprove, digestForTransferFrom,
  signForEggApprove, forEggApprove,
  signForArcanaApprove, forArcanaApprove,
  signForArcanaTransferFrom, forArcanaTransferFrom,
  signForIncubate, forIncubate,
  signForPersonaApprove, forPersonaApprove,
  signForPersonaTransferFrom, forPersonaTransferFrom
};
