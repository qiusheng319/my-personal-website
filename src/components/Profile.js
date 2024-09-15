import React from 'react';
import { useWeb3React } from '@web3-react/core';

function Profile() {
    const { active, account } = useWeb3React();

    if (!active) {
        return <div>请连接钱包查看个人资料</div>;
    }

    return (
        <div className="profile">
            <h2>个人资料</h2>
            <p>地址: {account}</p>
            {/* 这里可以添加更多用户信息,如头像、昵称等 */}
        </div>
    );
}

export default Profile;