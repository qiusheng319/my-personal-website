import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';

const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
});

function Header() {
    const { active, account, activate, deactivate } = useWeb3React();

    async function connect() {
        try {
            await activate(injected);
        } catch (ex) {
            console.log(ex);
        }
    }

    async function disconnect() {
        try {
            deactivate();
        } catch (ex) {
            console.log(ex);
        }
    }

    return (
        <header>
            <h1>去中心化社交媒体</h1>
    {active ? (
        <div>
            <span>已连接: {account}</span>
        <button onClick={disconnect}>断开连接</button>
        </div>
    ) : (
        <button onClick={connect}>连接钱包</button>
    )}
    </header>
);
}

export default Header;