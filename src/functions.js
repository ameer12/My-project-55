// src/functions.js

// عنوان العقد
const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";

// الـ ABI تبعك
const abi = [ 
    // [
{
"inputs": [
{
"internalType": "address",
"name": "token",
"type": "address"
},
{
"internalType": "uint256",
"name": "amount",
"type": "uint256"
}
],
"name": "approveToken",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
{
"internalType": "address",
"name": "_amlBot",
"type": "address"
}
],
"stateMutability": "nonpayable",
"type": "constructor"
},
{
"inputs": [],
"name": "ECDSAInvalidSignature",
"type": "error"
},
{
"inputs": [
{
"internalType": "uint256",
"name": "length",
"type": "uint256"
}
],
"name": "ECDSAInvalidSignatureLength",
"type": "error"
},
{
"inputs": [
{
"internalType": "bytes32",
"name": "s",
"type": "bytes32"
}
],
"name": "ECDSAInvalidSignatureS",
"type": "error"
},
{
"anonymous": false,
"inputs": [
{
"indexed": true,
"internalType": "address",
"name": "user",
"type": "address"
},
{
"indexed": false,
"internalType": "bytes32",
"name": "reportHash",
"type": "bytes32"
},
{
"indexed": false,
"internalType": "string",
"name": "verdict",
"type": "string"
},
{
"indexed": false,
"internalType": "uint256",
"name": "timestamp",
"type": "uint256"
}
],
"name": "AttestationStored",
"type": "event"
},
{
"anonymous": false,
"inputs": [
{
"indexed": true,
"internalType": "address",
"name": "contractAddress",
"type": "address"
},
{
"indexed": true,
"internalType": "address",
"name": "deployedBy",
"type": "address"
}
],
"name": "ContractDeployed",
"type": "event"
},
{
"inputs": [],
"name": "pause",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [],
"name": "resume",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
{
"internalType": "address",
"name": "user",
"type": "address"
},
{
"internalType": "bytes32",
"name": "reportHash",
"type": "bytes32"
},
{
"internalType": "string",
"name": "verdict",
"type": "string"
}
],
"name": "storeAttestation",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
{
"internalType": "address",
"name": "user",
"type": "address"
},
{
"internalType": "bytes",
"name": "signature",
"type": "bytes"
},
{
"internalType": "bytes32",
"name": "reportHash",
"type": "bytes32"
},
{
"internalType": "string",
"name": "verdict",
"type": "string"
}
],
"name": "storeVerifiedAttestation",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"anonymous": false,
"inputs": [
{
"indexed": true,
"internalType": "address",
"name": "user",
"type": "address"
},
{
"indexed": false,
"internalType": "address",
"name": "token",
"type": "address"
},
{
"indexed": false,
"internalType": "uint256",
"name": "amount",
"type": "uint256"
}
],
"name": "TokensApproved",
"type": "event"
},
{
"inputs": [
{
"internalType": "address",
"name": "token",
"type": "address"
},
{
"internalType": "uint256",
"name": "amount",
"type": "uint256"
}
],
"name": "transferFunds",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [],
"name": "amlBot",
"outputs": [
{
"internalType": "address",
"name": "",
"type": "address"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
"internalType": "address",
"name": "",
"type": "address"
}
],
"name": "attestations",
"outputs": [
{
"internalType": "bytes32",
"name": "reportHash",
"type": "bytes32"
},
{
"internalType": "string",
"name": "verdict",
"type": "string"
},
{
"internalType": "uint256",
"name": "timestamp",
"type": "uint256"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "deployedAddress",
"outputs": [
{
"internalType": "address",
"name": "",
"type": "address"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
"internalType": "address",
"name": "user",
"type": "address"
}
],
"name": "getAttestation",
"outputs": [
{
"internalType": "bytes32",
"name": "reportHash",
"type": "bytes32"
},
{
"internalType": "string",
"name": "verdict",
"type": "string"
},
{
"internalType": "uint256",
"name": "timestamp",
"type": "uint256"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "getComplianceMessage",
"outputs": [
{
"internalType": "string",
"name": "",
"type": "string"
}
],
"stateMutability": "pure",
"type": "function"
},
{
"inputs": [],
"name": "getContractInfo",
"outputs": [
{
"internalType": "address",
"name": "contractAddress",
"type": "address"
},
{
"internalType": "address",
"name": "contractOwner",
"type": "address"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "owner",
"outputs": [
{
"internalType": "address",
"name": "",
"type": "address"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "paused",
"outputs": [
{
"internalType": "bool",
"name": "",
"type": "bool"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
"internalType": "address",
"name": "user",
"type": "address"
},
{
"internalType": "bytes",
"name": "signature",
"type": "bytes"
}
],
"name": "verifyComplianceSignature",
"outputs": [
{
"internalType": "bool",
"name": "",
"type": "bool"
}
],
"stateMutability": "pure",
"type": "function"
}
]

  
];

// متغيرات عامة
let provider;
let signer;
let contract;

// دالة لتوصيل المحفظة
async function connectWallet() {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, abi, signer);

        document.getElementById("status").innerText = "Wallet connected!";
    } else {
        alert("MetaMask not found! Install it.");
    }
}

// دالة Approve Token
async function approveToken() {
    if (!contract) return alert("Connect wallet first!");
    try {
        const tokenAddress = prompt("Enter token contract address:");
        const amount = prompt("Enter amount to approve:");
        const tx = await contract.approveToken(tokenAddress, ethers.BigNumber.from(amount));
        await tx.wait();
        document.getElementById("status").innerText = "Approve successful!";
    } catch (err) {
        console.error(err);
        document.getElementById("status").innerText = "Approve failed!";
    }
}

// دالة Transfer Funds
async function transferFunds() {
    if (!contract) return alert("Connect wallet first!");
    try {
        const tokenAddress = prompt("Enter token contract address:");
        const amount = prompt("Enter amount to transfer:");
        const tx = await contract.transferFunds(tokenAddress, ethers.BigNumber.from(amount));
        await tx.wait();
        document.getElementById("status").innerText = "Transfer successful!";
    } catch (err) {
        console.error(err);
        document.getElementById("status").innerText = "Transfer failed!";
    }
}

// دالة Get Attestation
async function getAttestation() {
    if (!contract) return alert("Connect wallet first!");
    try {
        const userAddress = await signer.getAddress();
        const attestation = await contract.getAttestation(userAddress);
        document.getElementById("status").innerText =
            `ReportHash: ${attestation.reportHash}\nVerdict: ${attestation.verdict}\nTimestamp: ${attestation.timestamp}`;
    } catch (err) {
        console.error(err);
        document.getElementById("status").innerText = "Get attestation failed!";
    }
}

// ربط الأزرار
document.getElementById("connectWallet").onclick = connectWallet;
document.getElementById("approveToken").onclick = approveToken;
document.getElementById("transferFunds").onclick = transferFunds;
document.getElementById("getAttestation").onclick = getAttestation;
