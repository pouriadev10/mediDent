import React, { useEffect, useState, useRef } from "react";
import { Form, Select, Checkbox, DatePicker, Card, Row, Col, Input, Button, Modal, Dropdown, Menu } from 'antd';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import add from '../../../assets/icons/add-circle.png'

import { controller } from '../controller';



import arrow from '../../../assets/icons/arrow-left.png';
import calendar from '../../../assets/icons/calendar.png';
import rec from '../../../assets/icons/Rectangle 7734.png'
import rec3 from '../../../assets/icons/Rectangle 7733.png'




const { Option } = Select;


const CreateStep3 = ({ providePutCampaignData2, ...props }) => {
    const [email, setEmail] = useState([]);
    const [category, setCategory] = useState([]);
    const [selectedcategory, setSelectedCategory] = useState(null);
    const [emailTemplate, setEmailTemplate] = useState({ name: '', subject: '', text: '' });
    const [smsTemplate, setSmsTemplate] = useState({ name: '', text: '' });
    const [triggerType, setTriggerType] = useState('');
    const [triggerEvent, setTriggerEvent] = useState('');
    const [triggerTime, setTriggerTime] = useState('');
    const [recurringPeriod, setRecurringPeriod] = useState();
    const [deliveryType, setDeliveryType] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [text, setText] = useState('');
    const [text2, setText2] = useState('');
    const [selectedId, setSelectedId] = useState({});


    function resetForm() {
        setEmailTemplate({ name: '', subject: '', text: '' });
        setSmsTemplate({ name: '', text: '' });
        setText('');
        setText2('');

    }


    const contentEditableRef = useRef(null);
    const contentEditableRef2 = useRef(null);


    const handleInput = () => {
        setText(contentEditableRef.current.innerText);
    };

    const handleInput2 = () => {
        setText2(contentEditableRef2.current.innerText);
    };


    useEffect(() => {
        if (contentEditableRef.current) {
            contentEditableRef.current.focus();
        }
    }, []);

    useEffect(() => {
        if (contentEditableRef2.current) {
            contentEditableRef2.current.focus();
        }
    }, []);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const showModal2 = () => {
        setIsModalVisible2(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleCancel2 = () => {
        setIsModalVisible2(false);
    };


    const insertHtmlAtCursor = (html) => {
        const div = contentEditableRef.current;
        if (div) {
            div.insertAdjacentHTML('beforeend', html);

            const textNode = document.createTextNode("\u00A0");
            div.appendChild(textNode);

            const range = document.createRange();
            const selection = window.getSelection();
            range.setStartAfter(textNode);
            range.setEndAfter(textNode);
            selection.removeAllRanges();
            selection.addRange(range);

            div.focus();
        }
    };

    const insertHtmlAtCursor2 = (html) => {
        const div = contentEditableRef2.current;
        if (div) {
            div.insertAdjacentHTML('beforeend', html);

            const textNode = document.createTextNode("\u00A0");
            div.appendChild(textNode);

            const range = document.createRange();
            const selection = window.getSelection();
            range.setStartAfter(textNode);
            range.setEndAfter(textNode);
            selection.removeAllRanges();
            selection.addRange(range);

            div.focus();
        }
    };

    const handleMenuClick = ({ key }) => {
        const tagHtml = `<span class="custom-tag">${key}</span>`;
        insertHtmlAtCursor(tagHtml);
    };

    const handleMenuClick2 = ({ key }) => {
        const tagHtml = `<span class="custom-tag">${key}</span>`;
        insertHtmlAtCursor2(tagHtml);
    };

    // const handleUpload = (file) => {
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //         const imgHtml = `<img src="${e.target.result}" alt="uploaded" class="custom-image"/>`;
    //         insertHtmlAtCursor(imgHtml);
    //         message.success(`${file.name} file uploaded successfully.`);
    //     };
    //     reader.readAsDataURL(file);
    //     return false;
    // };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="Patient's Name">Patient's Name</Menu.Item>
            <Menu.Item key="Address">Address</Menu.Item>
            <Menu.Item key="Date">Date</Menu.Item>
        </Menu>
    );

    const menu2 = (
        <Menu onClick={handleMenuClick2}>
            <Menu.Item key="Patient's Name">Patient's Name</Menu.Item>
            <Menu.Item key="Address">Address</Menu.Item>
            <Menu.Item key="Date">Date</Menu.Item>
        </Menu>
    );

    const handleChange = (id) => {
        setSelectedId(prev => prev === id ? null : id);
    };

    const recurringPeriodMapping = {
        'every day': 1,
        'every 3 days': 3,
        'every week': 7,
        'every 1 month': 30,
        'every 3 months': 90,
        'every 6 months': 180,
        'annual': 365
    };

    const createEmailSms = async (event) => {
        event.preventDefault();
        let data = {};

        let formattedText = text.replace(/<span class="custom-tag">{?Patient's Name}<\/span>/g, "{?patient_name}")
            .replace(/<span class="custom-tag">{?Address}<\/span>/g, "{?address}")
            .replace(/<span class="custom-tag">{?Date}<\/span>/g, "{?date}");

        let formattedText2 = text2.replace(/<span class="custom-tag">{?Patient's Name}<\/span>/g, "{?patient_name}")
            .replace(/<span class="custom-tag">{?Address}<\/span>/g, "{?address}")
            .replace(/<span class="custom-tag">{?Date}<\/span>/g, "{?date}");

        if (deliveryType === "email" || deliveryType === "email_sms") {
            data.email_template = {
                name: emailTemplate.name,
                subject: emailTemplate.subject,
                text: formattedText
            };
        }

        if (deliveryType === "sms" || deliveryType === "email_sms") {
            data.sms_template = {
                name: smsTemplate.name,
                text: formattedText2
            }
        }

        try {
            const response = await controller.postEmailSms(data, props.campaignid);
            handleReadEmail();
            setIsModalVisible(false);
            console.log('Response:', response);

            // Check if the response status is less than 250
            if (response.status < 250) {
                resetForm(); // Resets the form fields
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };


    const handleInputChange = (setter) => (event) => {
        const { name, value } = event.target;
        setter(prev => ({ ...prev, [name]: value }));
    };

    const convertedRecurringPeriod = recurringPeriodMapping[recurringPeriod] || 0;
    const putData = async () => {
        const actionTrigger = {
            trigger_type: triggerType,
            trigger_event: triggerType === 'event' ? triggerEvent : '',
            recurring_period: triggerType === 'recurring' ? convertedRecurringPeriod : 0
        };

        if (triggerType === 'scheduled') {
            actionTrigger.trigger_time = triggerTime;
        }

        const data = {
            category: selectedcategory,
            action: {
                action_type: deliveryType
            },
            action_trigger: actionTrigger
        };

        try {
            const response = await controller.updateCampaigns(props.campaignid, data);
            if (response.status >= 200 && response.status < 300) {
                console.log('Request successful:', response.json);
            } else {
                console.error('Request failed:', response.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const patchEmailId = async () => {
        try {
            const response = await controller.updateEmailId(props.campaignid, {
                action: selectedId
            });

            if (!response.ok && response.status !== 201) {
                const errorResponse = await response.json;
                console.error('Error details:', errorResponse);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json;
            const campaignId = data.id;
            console.log('Newly created campaign ID:', campaignId);


            console.log(`Campaign created successfully with ID: ${campaignId}`);
        } catch (error) {
            console.error('Error posting campaign data:', error);
        }
    };

    useEffect(() => {
        if (selectedId) {
            patchEmailId();
        }
    }, [selectedId]);


    const handleReadEmail = async () => {
        try {
            const response = await controller.getEmailList(0, props.campaignid);

            if (response.status < 250) {
                setEmail(response.json);
            }
        } catch (e) {
        }
    };


    const handleReadCategory = async () => {
        try {
            const response = await controller.getCategoryList();

            if (response.status < 250) {
                setCategory(response.json);
            }
        } catch (e) {
        }
    };

    const handleDeliveryChange = (checkedValues) => {
        let deliveryType = '';
        if (checkedValues.includes('email') && checkedValues.includes('sms')) {
            deliveryType = 'email_sms';
        } else if (checkedValues.includes('email')) {
            deliveryType = 'email';
        } else if (checkedValues.includes('sms')) {
            deliveryType = 'sms';
        }
        console.log('Checked values:', checkedValues);
        console.log('Delivery type:', deliveryType);
        setDeliveryType(deliveryType);
    };

    const isEmailSelected = deliveryType.includes('email');
    const isSmsSelected = deliveryType.includes('sms');


    useEffect(() => {
        handleReadCategory();
    }, []);

    useEffect(() => {
        handleReadEmail();
    }, []);

    useEffect(() => {
        providePutCampaignData2(putData, { selectedcategory, deliveryType, triggerType, triggerEvent, triggerTime, convertedRecurringPeriod });
    }, [selectedcategory, deliveryType, triggerType, triggerEvent, triggerTime, convertedRecurringPeriod]);


    return (
        <>
            <Form
                layout="vertical"

            >
                <p style={{ fontSize: 16, fontWeight: '600' }}>Campaign Category</p>
                <Form.Item
                    style={{ marginBottom: '20px', width: '30%', fontSize: 16 }}
                    className='form-font'
                >
                    <Select
                        style={{ height: "42px", border: '1px solid #6B43B5', borderRadius: '7px' }}
                        placeholder="Select Category"
                        suffixIcon={<img src={arrow} alt="" />}
                        onChange={(value) => setSelectedCategory(value)}
                        showSearch
                        allowClear
                    >
                        {category.map((items) => {
                            let displayText2 = "";
                            switch (items.category) {
                                case 'occasional':
                                    displayText2 = 'Occasional';
                                    break;
                                case 'discount':
                                    displayText2 = 'Discount';
                                    break;
                                case 'new_patients':
                                    displayText2 = 'New Patients';
                                    break;
                                case 'business_boost':
                                    displayText2 = 'Business Boost';
                                    break;
                                default:
                                    displayText2 = items.category;
                            }

                            return <Option value={items.category}>{displayText2}</Option>;
                        })}
                    </Select>
                    <div style={{ color: '#8c8c8c', marginTop: '8px' }}>
                        Templates change based on your selected category.
                    </div>
                </Form.Item>
                <p style={{ fontSize: 16, fontWeight: '600' }}>Delivery Type</p>
                <Form.Item
                    label="Delivery Type"
                    style={{ marginBottom: '20px' }}
                >
                    <Checkbox.Group style={{ display: 'flex', gap: '20px' }} onChange={handleDeliveryChange}>
                        <Checkbox value="email">Email</Checkbox>
                        <Checkbox value="sms">SMS</Checkbox>
                    </Checkbox.Group>
                </Form.Item>
                {isSmsSelected && (
                    <Row justify="space-between" align="middle" >
                        <Col>
                            <label>Sms Template</label>
                            <Button
                                className="details-button-color2"
                                onClick={showModal2}
                                type="text"
                            >
                                <img src={add} alt="" style={{ marginRight: '8px' }} />
                                <span style={{ fontSize: 12 }}>Add new Template</span>
                            </Button>
                        </Col>
                    </Row>
                )}
                {isEmailSelected && (
                    <><Row justify="space-between" align="middle" >
                        <Col>
                            <label>Email Template</label>
                            <Button
                                className="details-button-color2"
                                onClick={showModal}
                                type="text"
                            >
                                <img src={add} alt="" style={{ marginRight: '8px' }} />
                                <span style={{ fontSize: 12 }}>Add new Template</span>
                            </Button>
                        </Col>
                        <Col>
                            <Input
                                placeholder="Search Email Template"
                                size="small"
                                prefix={<SearchOutlined />}
                                style={{ width: 157, borderRadius: 30, border: '1px solid #6B43B5', height: 27 }} />
                        </Col>
                    </Row>
                        <Row style={{ display: 'flex', flexDirection: 'row', gap: 17 }}>
                            {email && email.results.length > 0 && email.results.map((result) => {
                                const { name, subject, text } = result.multinotify.email_template;

                                return (
                                    <Card
                                        key={result.id}
                                        className={`custom-card125 ${selectedId === result.id ? 'selected-card' : 'not-selected-card'}`}
                                        bordered={false}
                                    >
                                        <div style={{ fontSize: 14, fontWeight: '600', color: '#6B43B5', zIndex: 1000, position: 'relative', display: 'flex', alignItems: 'flex-start', left: 0, height: 30 }}>
                                            <p>{name}</p>
                                        </div>
                                        <div style={{ fontSize: 12 }}>
                                            {subject}
                                        </div>
                                        <div style={{ fontSize: 12, color: '#848696' }}>
                                            {text}
                                        </div>
                                        {selectedId === result.id ? (
                                            <img src={rec} alt="" className="image-pay" />
                                        ) : (
                                            <img src={rec3} alt="" className="image-pay" />
                                        )}
                                        <Checkbox onChange={() => handleChange(result.id)} checked={selectedId === result.id} className="custom-checkbox" />
                                    </Card>
                                );
                            })}

                        </Row>
                    </>
                )}
                <p style={{ fontSize: 16, fontWeight: '600' }}>Delivery Action</p>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
                    <Form.Item
                        label="Action Type"
                        style={{ marginBottom: '20px', width: '50%' }}
                    >
                        <Select
                            placeholder="Select Action Type"
                            style={{ height: 44, border: '1px solid #6B43B5', borderRadius: 7 }}
                            onChange={(value) => setTriggerType(value)}
                            value={triggerType}
                        >
                            <Option value="event">Trigger By Event</Option>
                            <Option value="scheduled">Manual Trigger</Option>
                            <Option value="recurring">Routine</Option>
                        </Select>
                    </Form.Item>
                    {triggerType === 'event' && (
                        <Form.Item
                            label="Event"
                            style={{ width: 'calc(50% - 10px)' }}
                        >
                            <Select
                                value={triggerEvent}
                                onChange={(value) => setTriggerEvent(value)}
                                placeholder="Select Event"
                                style={{ height: 44, border: '1px solid #6B43B5', borderRadius: 7 }}
                            >
                                <Option value="birthday">Dates of birth</Option>
                                <Option value="last_login">When login</Option>
                                <Option value="last_visit">Enter the office</Option>
                                <Option value="appointment">Book appointment</Option>
                            </Select>
                        </Form.Item>
                    )}
                    {triggerType === 'scheduled' && (
                        <Form.Item
                            label="Trigger Time"
                            style={{ width: 'calc(50% - 10px)', marginTop: 8 }}
                        >
                            <DatePicker
                                suffixIcon={<img src={calendar} alt="calendar" />}
                                style={{ width: '100%', height: 42, border: '1px solid #6B43B5' }}
                                onChange={(date) => setTriggerTime(date)}
                            />

                        </Form.Item>
                    )}
                    {triggerType === 'recurring' && (
                        <Form.Item
                            label="Recurring Period"
                            style={{ width: 'calc(50% - 10px)' }}
                        >
                            <Select
                                value={recurringPeriod}
                                onChange={(value) => setRecurringPeriod(value)}
                                placeholder="Select Recurring Period"
                                style={{ height: 44, border: '1px solid #6B43B5', borderRadius: 7 }}
                            >
                                <Option value="every day">Every Day</Option>
                                <Option value="every 3 days">Every 3 Days</Option>
                                <Option value="every week">Every Week</Option>
                                <Option value="every 1 month">Every 1 Month</Option>
                                <Option value="every 3 months">Every 3 Months</Option>
                                <Option value="every 6 months">Every 6 Months</Option>
                                <Option value="annual">Annual</Option>
                            </Select>
                        </Form.Item>
                    )}
                </div>
            </Form>
            <Modal
                title="Create Email Template"
                visible={isModalVisible}
                onOk={createEmailSms}
                onCancel={handleCancel}
            >
                <form className="email-template-form">
                    <label>Email Template Name</label>
                    <input
                        style={{ borderRadius: 8, height: 41, border: '1px solid #6B43B5' }}
                        type="text"
                        name="name"
                        value={emailTemplate.name}
                        onChange={handleInputChange(setEmailTemplate)}
                        placeholder="Email Name"
                    />
                    <label>Email Subject</label>
                    <input
                        style={{ borderRadius: 8, height: 41, border: '1px solid #6B43B5' }}
                        type="text"
                        name="subject"
                        value={emailTemplate.subject}
                        onChange={handleInputChange(setEmailTemplate)}
                        placeholder="Email Subject"
                    />
                    <p>
                        Wherever you need dynamic items such as patient's name, address, etc ..., you should add them by the <a href="#">add icon</a>
                    </p>
                    <div className="custom-textarea-container">
                        <div
                            contentEditable
                            className="text-area-content"
                            ref={contentEditableRef}
                            onInput={handleInput}
                        ></div>
                        <div className="icon-container">
                            <Dropdown overlay={menu} trigger={['click']}>
                                <PlusCircleOutlined className="textarea-icon" />
                            </Dropdown>
                        </div>
                    </div>
                </form>
            </Modal>
            <Modal
                title="Basic Modal"
                visible={isModalVisible2}
                onOk={createEmailSms}
                onCancel={handleCancel2}
            >
                <form className="email-template-form">
                    <label>Sms Template Name</label>
                    <input
                        type="text"
                        name="name"
                        value={smsTemplate.name}
                        onChange={handleInputChange(setSmsTemplate)}
                        placeholder="Email Name"
                    />
                    <p>
                        Wherever you need dynamic items such as patient's name, address, etc ..., you should add them by the <a href="#">add icon</a>
                    </p>
                    <div className="custom-textarea-container">
                        <div
                            contentEditable
                            className="text-area-content"
                            ref={contentEditableRef2}
                            onInput={handleInput2}
                        ></div>
                        <div className="icon-container">
                            <Dropdown overlay={menu2} trigger={['click']}>
                                <PlusCircleOutlined className="textarea-icon" />
                            </Dropdown>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default CreateStep3
