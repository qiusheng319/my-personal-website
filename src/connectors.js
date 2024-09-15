import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

export const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42] // 支持的链 ID
})

export const walletconnect = new WalletConnectConnector({
    rpc: { 1: 'https://mainnet.infura.io/v3/YOUR-PROJECT-ID' },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
})

export const connectors = {
    injected: injected,
    walletConnect: walletconnect
}