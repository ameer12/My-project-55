// src/functions.js
(async () => {
  // Replace this with your deployed contract address after deploying in Remix
  const CONTRACT_ADDRESS = '0xREPLACE_WITH_YOUR_CONTRACT_ADDRESS';

  // Load ABI from file
  async function loadABI() {
    try {
      const res = await fetch('./src/abi.json');
      return await res.json();
    } catch (err) {
      console.error('Failed to load ABI:', err);
      return null;
    }
  }

  const abi = await loadABI();
  if (!abi) {
    document.getElementById('status').innerText = 'ABI load failed';
    return;
  }

  // helper to get contract instance (signer for write, provider for read)
  function getContractWithSigner() {
    const signer = window.app && window.app.signer;
    if (!signer) {
      throw new Error('No signer found. Connect wallet first.');
    }
    return new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  }

  function getContractWithProvider() {
    const provider = window.app && window.app.provider;
    if (!provider) {
      // fallback to default provider (read-only)
      return new ethers.providers.JsonRpcProvider();
    }
    return new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
  }

  // UI elements
  const connectBtn = document.getElementById('connectWallet');
  const approveBtn = document.getElementById('approveToken');
  const transferBtn = document.getElementById('transferFunds');
  const getAttBtn = document.getElementById('getAttestation');
  const statusDiv = document.getElementById('status');

  // Connect wallet button
  if (connectBtn) {
    connectBtn.addEventListener('click', async () => {
      const account = await window.app.connect();
      if (account) {
        statusDiv.innerText = 'Connected: ' + account;
      }
    });
  }

  // Approve token (this calls approveToken on your contract)
  if (approveBtn) {
    approveBtn.addEventListener('click', async () => {
      try {
        statusDiv.innerText = 'Sending approveToken tx...';
        const contract = getContractWithSigner();
        // For demo, prompt user for token address and amount
        const token = prompt('Enter token address to approve (ERC20):');
        if (!token) return statusDiv.innerText = 'Approve canceled';
        const amtInput = prompt('Enter amount (units as integer): e.g., 1 for token with 18 decimals you may need big number');
        const amount = ethers.BigNumber.from(amtInput || '0');

        const tx = await contract.approveToken(token, amount);
        statusDiv.innerText = 'Tx sent: ' + tx.hash;
        await tx.wait();
        statusDiv.innerText = 'ApproveTx mined: ' + tx.hash;
      } catch (err) {
        console.error(err);
        statusDiv.innerText = 'Approve failed: ' + (err.message || err);
      }
    });
  }

  // Transfer funds (transferFunds)
  if (transferBtn) {
    transferBtn.addEventListener('click', async () => {
      try {
        statusDiv.innerText = 'Sending transferFunds tx...';
        const contract = getContractWithSigner();
        const token = prompt('Enter token address to transfer from you to contract:');
        if (!token) return statusDiv.innerText = 'Transfer canceled';
        const amtInput = prompt('Enter amount (as integer):');
        const amount = ethers.BigNumber.from(amtInput || '0');

        const tx = await contract.transferFunds(token, amount);
        statusDiv.innerText = 'Tx sent: ' + tx.hash;
        await tx.wait();
        statusDiv.innerText = 'Transfer mined: ' + tx.hash;
      } catch (err) {
        console.error(err);
        statusDiv.innerText = 'Transfer failed: ' + (err.message || err);
      }
    });
  }

  // Get attestation (read)
  if (getAttBtn) {
    getAttBtn.addEventListener('click', async () => {
      try {
        const contract = getContractWithProvider();
        const user = prompt('Enter user address to fetch attestation for:') || (window.app && window.app.account);
        if (!user) return statusDiv.innerText = 'Cancelled';
        const att = await contract.getAttestation(user);
        // att = [reportHash, verdict, timestamp]
        const reportHash = att[0];
        const verdict = att[1];
        const ts = att[2].toString ? att[2].toString() : att[2];
        const timeStr = ts && !isNaN(Number(ts)) ? new Date(Number(ts) * 1000).toLocaleString() : ts;
        statusDiv.innerText = `Report: ${reportHash}\nVerdict: ${verdict}\nTime: ${timeStr}`;
      } catch (err) {
        console.error(err);
        statusDiv.innerText = 'Get attestation failed: ' + (err.message || err);
      }
    });
  }

  // Optionally expose functions for console/testing
  window.contractUI = {
    getContractWithSigner,
    getContractWithProvider,
    abi,
    CONTRACT_ADDRESS
  };

  console.log('functions.js initialized. CONTRACT_ADDRESS =', CONTRACT_ADDRESS);
})();
