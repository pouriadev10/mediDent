import React from 'react';
import { Card, Progress, Tag, Avatar, Tooltip } from 'antd';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';

import circle from '../../../assets/icons/discount-circle.png'

// A single reusable CampaignCard component
const CampaignCard = ({ title, startDate, endDate, status, audienceCount }) => {
    // Calculate the progress percentage based on the start and end dates
    const progressPercent = Math.min(100, ((new Date() - new Date(startDate)) / (new Date(endDate) - new Date(startDate))) * 100);


    return (
        <Card style={{ width: 350, marginTop: 25 }}>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(238, 237, 250, 1)', marginRight: 15, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={circle} alt='' />
                </div>
                <p style={{ fontSize: 20 }}> {title}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <p style={{ color: '#848696' }}>Start: {startDate}</p>
                <p style={{ color: '#848696' }}>Ends: {endDate}</p>
            </div>
            <Progress strokeColor={'#6B43B5'} percent={progressPercent} status="active" showInfo={false} />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 15 }}>
                <p style={{ color: '#848696' }}>Status: </p>
                <Tag
                    color={status === "active" ? "rgba(35, 208, 32, 0.2)" : "volcano"}
                    style={{
                        borderRadius: "20px", color: "rgba(35, 208, 32, 1)", width: 82,
                        height: 22, textAlign: 'center'
                    }}
                >
                    {status ? status.charAt(0).toUpperCase() + status.slice(1) : '-'}
                </Tag>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <p style={{ color: '#848696' }}>Audience: </p>
                <Avatar.Group
                    maxCount={2}
                    maxStyle={{
                        color: '#fff', // White text color for better contrast on purple background
                        backgroundColor: '#6B43B5', // Purple background for the overflow count
                    }}
                >
                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
                    <Avatar
                        style={{
                            backgroundColor: '#E0DDF7', // A lighter purple shade
                        }}
                    >
                        K
                    </Avatar>
                    <Tooltip title="Ant User" placement="top">
                        <Avatar
                            style={{
                                backgroundColor: '#9932cc', // Medium purple shade
                            }}
                            icon={<UserOutlined />}
                        />
                    </Tooltip>
                    <Avatar
                        style={{
                            backgroundColor: '#6a0dad', // Darker purple shade
                        }}
                        icon={<AntDesignOutlined />}
                    />
                </Avatar.Group>

            </div>
        </Card>
    );
};

export default CampaignCard;
