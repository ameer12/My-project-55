// src/wallet.js
// Wallet connector using Ethers.js v5 (must include ethers.js in index.html)
(async () => {
  window.app = {
    provider: null,
    signer: null,
    account: null,
    connect: connectWallet,
    getSigner: getSigner
  };

  async function connectWallet() {
    try {
      if (!window.ethereum) {
        alert('Please install MetaMask!');
        return null;
      }

      // Request account access from MetaMask
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Create provider and signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const account = await signer.getAddress();

      // Store globally
      window.app.provider = provider;
      window.app.signer = signer;
      window.app.account = account;

      console.log('✅ Wallet connected:', account);
      const statusEl = document.getElementById('status');
      if (statusEl) statusEl.innerText = 'Connected: ' + account;

      return account;
    } catch (err) {
      console.error('❌ connectWallet error:', err);
      const statusEl = document.getElementById('status');
      if (statusEl) statusEl.innerText = 'Wallet connection error';
      return null;
    }
  }

  function getSigner() {
    if (!window.app.signer && window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      window.app.provider = provider;
      window.app.signer = provider.getSigner();
    }
    return window.app.signer;
  }

  // Auto-connect if MetaMask already authorized
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts && accounts.length > 0) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        window.app.provider = provider;
        window.app.signer = signer;
        window.app.account = accounts[0];
        console.log('🔄 Auto-connected to', accounts[0]);
        const statusEl = document.getElementById('status');
        if (statusEl) statusEl.innerText = 'Connected: ' + accounts[0];
      }
    } catch (e) {
      console.warn('⚠️ Auto-connect failed:', e);
    }
  }
})();
