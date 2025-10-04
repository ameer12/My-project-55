// src/wallet.js
// Simple wallet connector using Ethers.js v5 (included in index.html)
(async () => {
  // We'll expose a global `app` object for other scripts (functions.js) to use.
  window.app = {
    provider: null,
    signer: null,
    account: null,
    connect: connectWallet,
    getSigner: getSigner
  };

  async function connectWallet() {
    try {
      if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask!');
        return null;
      }
      // Request accounts
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      // Create ethers provider (v5 style uses ethers.providers.Web3Provider)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const account = await signer.getAddress();

      window.app.provider = provider;
      window.app.signer = signer;
      window.app.account = account;

      console.log('Connected account:', account);
      document.getElementById('status').innerText = 'Connected: ' + account;
      return account;
    } catch (err) {
      console.error('connectWallet error', err);
      document.getElementById('status').innerText = 'Wallet connection error';
      return null;
    }
  }

  function getSigner() {
    return window.app.signer;
  }

  // auto connect if accounts already available
  if (typeof window.ethereum !== 'undefined') {
    try {
      window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
        if (accounts && accounts.length > 0) {
          // set minimal info (don't auto-request popup)
          window.app.account = accounts[0];
          window.app.provider = new ethers.providers.Web3Provider(window.ethereum);
          window.app.signer = window.app.provider.getSigner();
          document.getElementById('status').innerText = 'Connected: ' + window.app.account;
        }
      });
    } catch (e) {
      console.warn('No auto accounts');
    }
  }
})();
