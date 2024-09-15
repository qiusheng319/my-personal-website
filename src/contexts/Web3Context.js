import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import SocialMediaABI from '../abis/SocialMedia.json';

const Web3Context = createContext();

export function Web3Provider({ children }) {
    const { active, library, account } = useWeb3React();
    const [contract, setContract] = useState(null);

    useEffect(() => {
        if (active && library) {
            const signer = library.getSigner();
            const socialMediaContract = new ethers.Contract(
                process.env.REACT_APP_CONTRACT_ADDRESS,
                SocialMediaABI.abi,
                signer
            );
            setContract(socialMediaContract);
        }
    }, [active, library]);

    return (
        <Web3Context.Provider value={{ active, account, contract }}>
            {children}
        </Web3Context.Provider>
    );
}

export function useWeb3() {
    return useContext(Web3Context);
}