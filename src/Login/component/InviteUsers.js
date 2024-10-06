import React, { useState, useRef, useEffect } from 'react';
import { Radio, Row, Col, Table, Input, Tag, Button, Modal, Popconfirm, message, Card, Checkbox } from 'antd';
import { controller } from '../controller';

// icon 
import checkIcon from "../assets/icon/check.png"
import trash from "../assets/icon/trash.png"
import rec from '../../assets/icons/shape4.png';
import rec2 from '../../assets/icons/shape3.png';
import add2 from '../../assets/icons/add-circle2.png';


const InviteUsers = (props) => {
    const [selectedLic, setSelectedLic] = useState(null);
    const [invitedUserList, setInvitedUserList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [licenses, setLicenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModalDone, setOpenModalDone] = useState(false);
    const [anotherOfficeValue, setAnotherOfficeValue] = useState(false);

    const onChangeRadio = (e) => {
        setAnotherOfficeValue(e.target.value);
    };

    const getListOfLicences = async () => {
        const response = await controller.LicencesList();
        setLicenses(response);
    };

    const handleDelete = async (e) => {
        setLoading(true);
        const response = await controller.deleteInvitedUser(e.id);
        if (response.status < 250) {
            getInvitedUserList();
            message.success("Removed");
        } else {
            message.error("Error during remove invited user");
        }
        setLoading(false);
    };

    const handleSkip = async () => {
        const response = await controller.skipOnBoarding();
        props.readOnboardingStatus();
    };

    const showModal = () => {
        getListOfLicences();
        setIsModalVisible(true);
    };

    const handleDoneModal = async () => {
        const response = await controller.addNewOfficeQuestion(anotherOfficeValue ? "yes" : "no");
        props.readOnboardingStatus();
    };

    const handleInvite = async () => {
        setLoading(true);
        const data = {
            "receiver_email": userEmail,
            "meta_data": {},
            "subscription_tier": selectedLic, // id subscription ke entekhab mikone
            "branch": localStorage.getItem("selectedOffice"),
        };
        const response = await controller.inviteUser(data);

        if (response.status < 250) {
            message.success("user Invited succesfully");
            setIsModalVisible(false);
            setUserEmail("");
            setSelectedLic(null);
            getInvitedUserList();
        } else {
            message.error(JSON.stringify(response));
        }
        setLoading(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setUserEmail("");
        setSelectedLic(null);
    };

    const columns = [
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            width: '69px',
            render: (_, record) => {
                return (
                    <>
                        {record.roles[0]}
                    </>
                );
            },
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '118px',
            render: (_, record) => {
                return (
                    <>
                        {record.receiver_email}
                    </>
                );
            },
        },
        {
            title: 'Subscription',
            dataIndex: 'subscription',
            key: 'subscription',
            width: '20%',
            render: (_, record) => {
                return (
                    record.subscription_tier ?
                        <div>
                            <Row justify={"space-between"} className='lastAntdTableColumn' style={{ width: record.subscription_tier.title === "Pro" ? "100%" : "max-content" }}>
                                <Tag color="green">
                                    {record.subscription_tier && record.subscription_tier.title}
                                </Tag>

                                <div>
                                    <Popconfirm
                                        title="Are you sure to delete this invites user?"
                                        onConfirm={() => {
                                            handleDelete(record);
                                        }}
                                    >
                                        <img className='trash-action-icon' src={trash} alt="trash" />
                                    </Popconfirm>

                                </div>

                            </Row>
                        </div>

                        :
                        <Row justify={"space-between"}>
                            <div></div>

                            <div>
                                <Popconfirm
                                    title="Are you sure to delete this invites user?"
                                    onConfirm={() => {
                                        handleDelete(record);
                                    }}
                                >
                                    <img className='trash-action-icon' src={trash} alt="trash" />
                                </Popconfirm>

                            </div>
                        </Row>

                );
            },
        },

    ];

    const getInvitedUserList = async () => {
        const response = await controller.invitedUserList();
        if (response) {
            setInvitedUserList(response.invites);
        }
    };

    useEffect(() => {
        getInvitedUserList();
    }, []);

    const handleDoneInviteUser = async () => {
        const response = await controller.checkIsMultiple();
        if (response.result)
            setOpenModalDone(true);
        else {
            const response0 = await controller.addNewOfficeQuestion("no");
            props.readOnboardingStatus();
        }
    };

    const handleCheckboxChange = (licenseId) => {
        setSelectedLic(licenseId);
    };

    return (
        <>
            <div className="custom-table-container">
                <div className="add-message">
                <Button
                    type="link"
                    onClick={
                        showModal}
                >
                    <span className="size-16">Add</span>
                    <img src={add2} alt="" style={{ marginLeft: '8px' }} />
                </Button>

                </div>
                <div style={{ width: "100%" }}>
                    <Table
                        dataSource={invitedUserList}
                        columns={columns}
                        bordered
                        pagination={false}
                        className="custom-table"
                    // scroll={{ x: 'auto' }} 
                    />
                </div>
            </div>
            <div>
                <Button onClick={handleDoneInviteUser} className='login-button mt15'>
                    Done
                </Button>
            </div>
            <Modal
                title="Want to add another Office?"
                visible={openModalDone}
                onCancel={() => setOpenModalDone(false)}
                centered
                footer={[
                    <Button key="done" type="primary" onClick={handleDoneModal} style={{ width: '100%', height: 39 }}>
                        Done
                    </Button>
                ]}
            >
                <Radio.Group onChange={onChangeRadio} value={anotherOfficeValue} style={{ display: 'flex', flexDirection: 'row', marginBottom: 30, marginTop: 25 }}>
                    <Radio value={true} style={{ marginRight: 145 }}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
            </Modal>

            <Modal
                title="Invite User"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button
                        style={{ width: '100%', height: 39 }}
                        disabled={selectedLic == null}
                        loading={loading} key="submit" type="primary" onClick={handleInvite}>
                        Invite
                    </Button>,
                ]}
            >
                <label className='input-lable' style={{ marginTop: 25 }}>Email</label>
                <Input
                    onChange={(e) => {
                        setUserEmail(e.target.value);
                    }}
                    name="email" value={userEmail} placeholder='Enter user Email' />

                <div className='mt10' style={{ marginTop: 20 }}>
                    <label className='input-lable'>License</label>
                </div>
                <div style={{
                    fontWeight: "400",
                    fontSize: "12px",
                    color: "#888"
                }}>Select the license you want for this User</div>

                <br />

                <Row>
                    {
                        licenses && licenses.length > 0 && licenses.map((item, index) => (
                            <Col span={12} key={item.id}>
                                <Row justify={index % 2 == 1 ? "end" : "start"}
                                >
                                    <Card
                                        onClick={() => {
                                            setSelectedLic(item.id);
                                        }}
                                        className={`custom-card1290 ${selectedLic === item.id ? 'selected-card' : 'not-selected-card'}`}
                                        bordered={false}
                                        style={{ marginBottom: 20 }}
                                    >
                                        <Row style={{
                                            fontSize: 16,
                                            fontWeight: '600',
                                            color: '#6B43B5',
                                            zIndex: 1000,
                                            position: 'relative',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            width: '100%'
                                        }}
                                        >
                                            <Col style={{ color: "#6B43B5", fontWeight: "bold", fontSize: "20px" }}>
                                                {item.title}
                                            </Col>
                                            <Col style={{ display: 'flex', justifyContent: 'flex-end', fontSize: 14, color: 'black', fontWeight: '400' }}>
                                                $ {item.price}
                                            </Col>
                                        </Row>
                                        <div className='mt5' style={{ color: "#979797", fontSize: "11px", marginTop: 10, position: 'relative', zIndex: 1000 }}>
                                            <img width={10} height={7} src={checkIcon} alt="check" style={{ marginRight: 5 }} /> {item.description1}
                                        </div>
                                        <div style={{ color: "#979797", fontSize: "11px" }}>
                                            <img width={10} height={7} src={checkIcon} alt="check" style={{ marginRight: 5 }} /> {item.description2}
                                        </div>
                                        <div style={{ color: "#979797", fontSize: "11px" }}>
                                            <img width={10} height={7} src={checkIcon} alt="check" style={{ marginRight: 5 }} /> {item.description3}
                                        </div>
                                        <Checkbox
                                            onChange={() => handleCheckboxChange(item.id)}
                                            checked={selectedLic === item.id}
                                            className="custom-checkbox"
                                        />
                                        {selectedLic === item.id ? (
                                            <img src={rec} alt="Selected" className="image-pay" />
                                        ) : (
                                            <img src={rec2} alt="Not selected" className="image-pay" />
                                        )}
                                    </Card>
                                </Row>
                            </Col>
                        ))
                    }
                </Row>
            </Modal>
        </>
    );
};

export default InviteUsers;
