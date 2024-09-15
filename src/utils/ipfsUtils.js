import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

// 连接到 IPFS 节点
// 注意：这里使用的是 Infura 的 IPFS 节点，您需要替换为自己的项目 ID 和密钥
const projectId = '您的Infura项目ID';
const projectSecret = '您的Infura项目密钥';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

export async function uploadToIPFS(content) {
    try {
        const added = await client.add(JSON.stringify(content));
        return added.path;
    } catch (error) {
        console.error('上传到IPFS失败:', error);
        throw error;
    }
}

export async function getFromIPFS(hash) {
    try {
        const stream = client.cat(hash);
        let data = '';

        for await (const chunk of stream) {
            data += chunk.toString();
        }

        return JSON.parse(data);
    } catch (error) {
        console.error('从IPFS获取数据失败:', error);
        throw error;
    }
}