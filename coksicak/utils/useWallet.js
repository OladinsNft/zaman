import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';

const useWallet = () => {
  const { activate, deactivate, active, account } = useWeb3React();
  const [connecting, setConnecting] = useState(false);

  const injectedConnector = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42], // Add the desired chain IDs here
  });

  useEffect(() => {
    if (active && !account) {
      deactivate();
    }
  }, [active, account, deactivate]);

  const connectWallet = async () => {
    setConnecting(true);
    try {
      await activate(injectedConnector);
    } catch (error) {
      console.log('Failed to connect wallet:', error);
    } finally {
      setConnecting(false);
    }
  };

  return { connecting, connectWallet, account };
};

export default useWallet;
