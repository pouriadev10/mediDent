import React, { useState, useEffect, useRef } from 'react';
import { Card, Input, DatePicker, Form, Row, Col, Divider, Checkbox, Tag, Avatar, Tooltip, Button, Select, Modal, Radio, Slider } from 'antd';
import dayjs from 'dayjs';
import { controller } from '../controller';
import PatientDetailsDropdown from './PatientDetailsDropdown'
import GoogleMapComponent from './GoogleMap';
import calendar from '../../../assets/icons/calendar.png';
import union2 from '../../../assets/icons/Union2.png'
import rec2 from '../../../assets/icons/rec22.png';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { CloseOutlined, DownOutlined } from '@ant-design/icons';

import arrow from '../../../assets/icons/arrow-down12.png'


const { Option } = Select

const criteriaMapping = {
    first_name: "meta_data_character",
    last_name: "meta_data_character",
    date_joined: ["meta_data_datetime_start", "meta_data_datetime_end"],
    age_range: ["meta_data_integer_lower", "meta_data_integer_upper"],
    health_score: ["meta_data_integer_lower", "meta_data_integer_upper", "meta_data_character"],
    date_of_birth: ["meta_data_datetime_start", "meta_data_datetime_end"],
    gender: "meta_data_character",
    country: "meta_data_character",
    city: "meta_data_character",
    zip_code: "meta_data_character",
    treatment_plan: ["meta_data_integer", "meta_data_datetime_start", "meta_data_datetime_end"]
};

function extractValuesByCriteria(type, values) {
    const keys = criteriaMapping[type];
    if (!keys) return null;

    if (Array.isArray(keys)) {
        return keys.map(key => values[key]);
    } else {
        return values[keys];
    }
}

const initialCenter = {
    lat: 0,
    lng: 0,
};


const CreateStep1 = ({ providePostCampaignData, sendCampaignId }) => {
    const [patients, setPatient] = useState([]);
    const [selectedPatients, setSelectedPatients] = useState([]);
    const [campaignName, setCampaignName] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [value, setValue] = React.useState("include");
    const [value2, setValue2] = React.useState("combine");
    const [isExpanded, setIsExpnded] = useState(false);
    const [isExpanded2, setIsExpnded2] = useState(false);
    const [isExpanded3, setIsExpnded3] = useState(false);
    const [isExpanded4, setIsExpnded4] = useState(false);
    const [procedure, setProcedures] = useState([]);
    const [audienceGroupName, setAudienceGroupName] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [ageStart, setAgeStart] = useState(null);
    const [ageEnd, setAgeEnd] = useState(null);
    const [birthDateStart, setBirthDateStart] = useState(null);
    const [birthDateEnd, setBirthDateEnd] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [stateName, setStateName] = useState('');
    const [cityName, setCityName] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [address, setAddress] = useState('');
    const [selectedDistance, setSelectedDistance] = useState(null);
    const [startDate2, setStartDate2] = useState(null);
    const [endDate2, setEndDate2] = useState(null);
    const [oralHealthType, setOralHealthType] = useState('');
    const [oralHealthRanges, setOralHealthRanges] = useState([]);
    const [coordinates, setCoordinates] = useState(initialCenter);
    const [selectedPatients2, setSelectedPatients2] = useState([]);


    function resetForm() {
        setFirstName('');
        setLastName('');
        setGender('');
        setAgeStart(null);
        setAgeEnd(null);
        setBirthDateStart(null);
        setBirthDateEnd(null);
        setCoordinates(initialCenter);
        setSelectedCountry(null);
        setStateName('');
        setCityName('');
        setZipCode('');
        setAddress('');
        setSelectedDistance(null);
        setStartDate2(null);
        setEndDate2(null);
        setOralHealthType('');
        setOralHealthRanges([]);
        setAudienceGroupName('');
    }



    const handleReadPatient = async () => {
        try {
            const response = await controller.getPatientList();
            if (response.status < 250) {
                const data = await response.json;
                const processedPatients = data.results.map(patient => ({
                    ...patient,
                    identification: patient.identification && patient.identification.filter(id => id.selected_criteria_type).map(id => {
                        const criteriaType = id.selected_criteria_type.name;
                        return {
                            ...id,
                            extractedValues: extractValuesByCriteria(criteriaType, id.selected_criteria_value)
                        };
                    }),
                    location: patient.location && patient.location.filter(loc => loc.selected_criteria_type).map(loc => {
                        const criteriaType = loc.selected_criteria_type.name;
                        return {
                            ...loc,
                            extractedValues: extractValuesByCriteria(criteriaType, loc.selected_criteria_value)
                        };
                    }),
                    treatment_plan: patient.treatment_plan && patient.treatment_plan.filter(treat => treat.selected_criteria_type).map(treat => {
                        const criteriaType = treat.selected_criteria_type.name;
                        return {
                            ...treat,
                            extractedValues: extractValuesByCriteria(criteriaType, treat.selected_criteria_value)
                        };
                    }),
                    health_score: patient.health_score && patient.health_score.filter(score => score.selected_criteria_type).map(score => {
                        const criteriaType = score.selected_criteria_type.name;
                        return {
                            ...score,
                            extractedValues: extractValuesByCriteria(criteriaType, score.selected_criteria_value)
                        };
                    }),
                }));
                setPatient(processedPatients);

            }
        } catch (e) {
            console.error('Failed to fetch patient data:', e);
        }
    };


    const handleCheckboxChange = (id) => {
        setSelectedPatients(prev => {
            if (prev.includes(id)) {
                return prev.filter(patientId => patientId !== id);

            } else {
                return [...prev, id];
            }
        });
    };

    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsExpnded(false);
        setIsExpnded2(false);
        setIsExpnded3(false);
        setIsExpnded4(false);
        resetForm()
    };

    const showContent = () => {
        setIsExpnded(true);
    }

    const showContent2 = () => {
        setIsExpnded2(true);
    }

    const showContent3 = () => {
        setIsExpnded3(true);
    }

    const showContent4 = () => {
        setIsExpnded4(true);
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCampaignName = (e) => {
        setAudienceGroupName(e.target.value);
    };

    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastName = (e) => {
        setLastName(e.target.value);
    };

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const handleAgeRangeChange = (value) => {
        setAgeStart(value[0]);
        setAgeEnd(value[1]);
    };

    const handleStart1DateChange = (date, dateString) => {
        setStartDate(dateString);
    };

    const handleEndDate1Change = (date, dateString) => {
        setEndDate(dateString);
    };

    const handleBirthDateStartChange = (date, dateString) => {
        setBirthDateStart(dateString);
    };

    const handleBirthDateEndChange = (date, dateString) => {
        setBirthDateEnd(dateString);
    };

    const handleCountryChange = (value) => {
        setSelectedCountry(value);
    };

    const handleStateChange = (e) => {
        setStateName(e.target.value);
    };

    const handleCityChange = (e) => {
        setCityName(e.target.value);
    };

    const handleZipCodeChange = (e) => {
        setZipCode(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleStartDateChange2 = (date, dateString) => {
        setStartDate2(dateString);
    };

    const handleEndDateChange2 = (date, dateString) => {
        setEndDate2(dateString);
    };

    const handleDistanceChange = (value, option) => {
        setSelectedDistance(option.children);
    };

    const handleOralHealthTypeChange = (value) => {
        setOralHealthType(value);
    };




    const handleOk = async (values) => {
        console.log("Form Data:", values);
        const criteria_item = [];

        // Identification Fields
        if (firstname) {
            criteria_item.push({
                criteria_type: "first_name",
                criteria_value: firstname
            });
        }
        if (lastname) {
            criteria_item.push({
                criteria_type: "last_name",
                criteria_value: lastname
            });
        }
        if (gender) {
            criteria_item.push({
                criteria_type: "gender",
                criteria_value: gender
            });
        }
        if (ageStart && ageEnd) {
            criteria_item.push({
                criteria_type: "age_range",
                int_range_start: ageStart,
                int_range_end: ageEnd
            });
        }
        if (startDate && endDate) {
            criteria_item.push({
                criteria_type: "date_joined",
                start_date: startDate,
                end_date: endDate
            });
        }
        if (birthDateStart && birthDateEnd) {
            criteria_item.push({
                criteria_type: "date_of_birth",
                start_date: birthDateStart,
                end_date: birthDateEnd
            });
        }

        // Location Fields
        if (selectedCountry) {
            criteria_item.push({
                criteria_type: "country",
                criteria_value: selectedCountry
            });
        }
        if (stateName) {
            criteria_item.push({
                criteria_type: "state",
                criteria_value: stateName
            });
        }
        if (cityName) {
            criteria_item.push({
                criteria_type: "city",
                criteria_value: cityName
            });
        }
        if (zipCode) {
            criteria_item.push({
                criteria_type: "zip_code",
                criteria_value: zipCode
            });
        }
        if (address) {
            criteria_item.push({
                criteria_type: "address",
                criteria_value: address
            });
        }
        if (selectedDistance) {
            criteria_item.push({
                criteria_type: "distance",
                int_distance: selectedDistance
            });
        }
        if (coordinates.lat && coordinates.lng) {
            criteria_item.push({
                criteria_type: "distance",
                latitude: coordinates.lat,
                longitude: coordinates.lng
            });
        }

        // Treatment Plan
        if (values.procedure) {
            criteria_item.push({
                criteria_type: "treatment_plan",
                criteria_value: values.procedure
            });
        }
        // procedure || startdate && enddate 
        if (startDate2 && endDate2) {
            criteria_item.push({
                criteria_type: "treatment_plan",
                start_date: startDate2,
                end_date: endDate2,
                // criteria_value: values.procedure
            });
        }

        // Oral Health
        if (oralHealthType && oralHealthRanges.length > 0) {
            oralHealthRanges.forEach(range => {
                criteria_item.push({
                    criteria_type: "health_score",
                    criteria_value: oralHealthType,
                    int_range_start: range.start,
                    int_range_end: range.end
                });
            });
        }


        const data = {
            title: audienceGroupName,
            method_type: value,
            criteria_item: criteria_item
        };

        try {
            const response = await controller.postAudienceGroup(data);
            if (response.status < 250) {
                console.log('Data sent successfully');
                resetForm();
            } else {
                console.error('Error sending data:', response.error);
                resetForm();
            }
        } catch (error) {
            console.error('Error:', error);
        }

        setIsModalVisible(false);
        handleReadPatient()
    };

    useEffect(() => {
        if (!isModalVisible) {
            resetForm();
        }
    }, [isModalVisible]);



    const handleOralHealthRangesChange = (checkedValues) => {
        const ranges = checkedValues.map(value => {
            const [start, end] = value.split('-').map(Number);
            return { start, end };
        });
        setOralHealthRanges(ranges);
    };



    const handleCampaignNameChange = (e) => {
        setCampaignName(e.target.value);
    };

    const handleStartDateChange = (date, dateString) => {
        setStartDate(dateString);
    };

    const handleEndDateChange = (date, dateString) => {
        setEndDate(dateString);
    };

    const postCampaignData = async () => {
        try {
            const response = await controller.createCampaigns({
                campaign_name: campaignName,
                start_date: startDate,
                end_date: endDate,
                patient_selectors: selectedPatients
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
            sendCampaignId(campaignId);
        } catch (error) {
            console.error('Error posting campaign data:', error);
        }
    };

    useEffect(() => {
        providePostCampaignData(postCampaignData, { campaignName, startDate, endDate, selectedPatients });
    }, [campaignName, startDate, endDate, selectedPatients]);



    useEffect(() => {
        handleReadPatient();
    }, []);


    const isFirstPatientReady = patients.length > 0 && patients[0].identification && patients[0].identification.length > 0;
    const patients2 = patients && patients.length > 0 ? patients[0].patients : [];
    console.log(patients2)



    return (
        <>
            <div>
                <Form layout="vertical">
                    <Row justify="space-between" type="flex" style={{ width: '100%', marginBottom: 23, paddingLeft: 20 }} gutter={[0, 75]}>
                        <Col span={8} style={{ display: 'flex', paddingRight: 15 }}>
                            <div style={{ flexGrow: 1 }}>
                                <Row style={{ marginBottom: 5 }}>
                                    <label>Campaign Name</label>
                                </Row>
                                <Input
                                    style={{ width: '100%', height: 42, border: '1px solid #6B43B5', borderRadius: '8px' }}
                                    placeholder="Enter Audience Name"
                                    onChange={handleCampaignNameChange}
                                />
                            </div>
                            <Divider type="vertical" className="vertical-divider" style={{ height: 'auto', marginTop: '20px' }} />
                        </Col>
                        <Col span={16} style={{ display: 'flex', flexDirection: 'row' }}>
                            <Col span={12} style={{ marginTop: 2, paddingRight: 5 }}>
                                <Row style={{ marginBottom: 6 }}>
                                    <label>Campaign Time</label>
                                </Row>
                                <DatePicker
                                    onChange={handleStartDateChange}
                                    suffixIcon={<img src={calendar} alt="" />}
                                    style={{ width: '95%', height: 42, border: '1px solid #6B43B5' }} />
                            </Col>
                            <Col span={12} style={{ marginTop: 37 }}>
                                <DatePicker
                                    onChange={handleEndDateChange}
                                    suffixIcon={<img src={calendar} alt="" />}
                                    style={{ width: '95%', height: 42, border: '1px solid #6B43B5' }} />
                            </Col>
                        </Col>
                    </Row>
                </Form>
            </div>

            <div style={{ marginTop: 55 }}>
                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20, marginRight: 20 }}>
                    <p style={{ fontSize: 16 }}>Select the audience group you want this campaign for:</p>
                    <Input
                        size="medium"
                        placeholder="Search Lead Selection "
                        prefix={<img src={union2} alt="" />}
                        style={{ marginBottom: '20px', height: 34, border: '1px solid #6B43B5', width: 206, borderRadius: 30, marginLeft: 'auto' }}
                    />
                </div>
            </div>
            <Row gutter={[16, 16]} style={{ marginBottom: '20px', flexWrap: 'wrap' }}>
                {/* All Patients Card */}
                <Col span={24} md={8} style={{ marginBottom: '35px', display: 'flex', justifyContent: 'center' }}>
                    <Card className="custom-card123">
                        <div style={{ width: '100%' }}>
                            <Checkbox
                                //   onChange={() => this.handleCheckboxChange()}
                                className="custom-checkbox"
                            />
                            <div style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute' }}>
                                <p style={{ fontSize: 20, fontWeight: '600', color: '#6B43B5' }}>All Patients</p>

                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', top: '100%', transform: 'translate(0%, -100%)', position: 'absolute', width: '100%' }}>
                                <p style={{ fontSize: 14, color: '#979797' }}>Total:</p>
                                <p style={{ fontSize: 14, color: '#6B43B5', position: 'absolute', left: 200 }}>{patients2 && patients2.length} patients</p>
                            </div>
                        </div>
                    </Card>
                </Col>

                {/* Patient Cards */}
                {patients.map((patient) => (
                    <Col span={24} md={8} key={patient.id} style={{ marginBottom: '35px', display: 'flex', justifyContent: 'center' }}>
                        <Card className="custom-card123" bordered={false} >
                            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: 10 }}>
                                <p style={{ color: '#6B43B5', fontSize: 16, fontWeight: '600', zIndex: 1, position: 'relative', width: '100%' }}> {patient ? patient.title : '-'} </p>
                                <Tag
                                    color={"rgba(35, 208, 32, 0.2)"}
                                    style={{ borderRadius: "20px", color: "rgba(35, 208, 32, 1)", width: 61, height: 22, textAlign: 'center', left: 0 }}
                                >
                                    Include
                                </Tag>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                <p style={{ fontSize: 16, zIndex: 1, position: 'relative', width: '100%' }}>Identification</p>
                                {isFirstPatientReady ? (
                                    <PatientDetailsDropdown
                                        identification={patient.identification}
                                        number={
                                            // Check if 'identification' is defined and not empty
                                            patient.identification && patient.identification.length > 0
                                                ? new Set(patient.identification.map(item => item.selected_criteria_type && item.selected_criteria_type.name).filter(name => name)).size
                                                : 0
                                        }
                                    />
                                ) : (
                                    <div>Loading or not ready...</div>
                                )}




                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                <p style={{ fontSize: 16, zIndex: 1, position: 'relative', width: '100%' }}>Location</p>
                                {isFirstPatientReady ? (
                                    <PatientDetailsDropdown
                                        location={patient.location}
                                        number={
                                            // Check if 'identification' is defined and not empty
                                            patient.location && patient.location.length > 0
                                                ? new Set(patient.location.map(item => item.selected_criteria_type && item.selected_criteria_type.name).filter(name => name)).size
                                                : 0
                                        }
                                    />
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                <p style={{ fontSize: 16, zIndex: 1, position: 'relative', width: '100%' }}>Treatment Plans</p>
                                {isFirstPatientReady ? (
                                    <PatientDetailsDropdown
                                        treatmentPlans={patient.treatment_plans}
                                        number={
                                            // Check if 'identification' is defined and not empty
                                            patient.treatment_plans && patient.treatment_plans.length > 0
                                                ? new Set(patient.treatment_plans.map(item => item.selected_criteria_type && item.selected_criteria_type.name).filter(name => name)).size
                                                : 0
                                        }
                                    />
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                <p style={{ fontSize: 16, zIndex: 1, position: 'relative', width: '100%' }}>Health Score</p>
                                {isFirstPatientReady ? (
                                    <PatientDetailsDropdown
                                        healthScore={patient.health_score}
                                        number={
                                            // Check if 'identification' is defined and not empty
                                            patient.health_score && patient.health_score.length > 0
                                                ? new Set(patient.health_score.map(item => item.selected_criteria_type && item.selected_criteria_type.name).filter(name => name)).size
                                                : 0
                                        }
                                    />
                                ) : (
                                    <></>
                                )}
                            </div>

                            <img src={rec2} alt="" className="image-pay1" />
                            <Checkbox
                                onChange={() => handleCheckboxChange(patient.id)}
                                checked={selectedPatients.includes(patient.id)}
                                className="custom-checkbox"
                            />
                            <Divider type="horizental" style={{ width: '300px' }} />
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 25 }}>
                                <p style={{ color: '#848696' }}>Total Patients </p>
                                <Avatar.Group
                                    maxCount={2}
                                    maxStyle={{
                                        color: '#fff',
                                        backgroundColor: '#6B43B5',
                                    }}
                                >
                                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
                                    <Avatar
                                        style={{
                                            backgroundColor: '#E0DDF7',
                                        }}
                                    >
                                        K
                                    </Avatar>
                                    <Tooltip title="Ant User" placement="top">
                                        <Avatar
                                            style={{
                                                backgroundColor: '#9932cc',
                                            }}
                                            icon={<UserOutlined />}
                                        />
                                    </Tooltip>
                                    <Avatar
                                        style={{
                                            backgroundColor: '#6a0dad',
                                        }}
                                        icon={<AntDesignOutlined />}
                                    />
                                </Avatar.Group>

                            </div>
                        </Card>
                    </Col>
                ))}

                {/* Create New Card */}
                <Col span={24} md={8} style={{ marginBottom: '35px', display: 'flex', justifyContent: 'center' }}>
                    <Card className="custom-card123" onClick={showModal} style={{ cursor: 'pointer' }} >
                        <div style={{ width: '100%' }}>
                            <div style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute' }}>
                                <p style={{ fontSize: 20, fontWeight: '600', color: '#6B43B5' }}>Create New</p>

                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Modal
                title="Create Audience Group"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                style={{ minWidth: 965 }}
            >
                <div style={{ flexGrow: 1 }}>
                    <Row style={{ marginBottom: 5 }}>
                        <label>Audience Group Name</label>
                    </Row>
                    <Input
                        style={{ width: 383, height: 38, border: '1px solid #6B43B5', borderRadius: '8px' }}
                        placeholder="Enter Audience Group Name"
                        onChange={handleCampaignName}
                        value={audienceGroupName}
                    />
                </div>
                <p style={{ fontSize: 12, color: '#979797', marginTop: 20 }}>By Expand every item below you can add filters to your audience group.</p>
                <Card className='card-modal'>
                    {isExpanded ? (
                        <>
                            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 15 }}>
                                <div>
                                    <p style={{ fontSize: 16, marginBottom: 7, marginTop: 6 }}>Identification</p>
                                    <p style={{ fontSize: 14, color: '#848696' }}>Such as First name, Last name, Birth date, Gender, Age</p>
                                </div>
                                <div className="arow-left">
                                    <Button
                                        onClick={showContent}
                                        className="details-button-color"
                                        type="text"
                                    >
                                        <img src={arrow} alt="" style={{ marginLeft: '8px' }} />
                                    </Button>
                                </div>
                            </div>
                            <Form
                                layout="vertical"
                                style={{ mminWidth: '100%', borderRadius: '8px' }}
                            >
                                <Row align="middle" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Col flex="1">
                                        <Form.Item label="Patient's First Name">
                                            <Input placeholder="Enter First Name" style={{ width: 157, height: 41, borderRadius: 8, border: '1px solid #6B43B5' }}
                                                onChange={handleFirstName}
                                                value={firstname}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Divider type="vertical" className="vertical-divider1" style={{ height: '60px' }} />
                                    <Col flex="1">
                                        <Form.Item label="Patient's Last Name">
                                            <Input placeholder="Enter Last Name" style={{ width: 157, height: 41, borderRadius: 8, border: '1px solid #6B43B5' }}
                                                onChange={handleLastName}
                                                value={lastname}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Divider type="vertical" className='vertical-divider1' style={{ height: '60px' }} />
                                    <Col flex="1">
                                        <Form.Item label="Gender">
                                            <Radio.Group defaultValue="female" style={{ display: 'flex', flexDirection: 'row' }} onChange={handleGenderChange} value={gender}>
                                                <Radio value="female">Female</Radio>
                                                <Radio value="male">Male</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Col>
                                    <Divider type="vertical" className='vertical-divider1' style={{ height: '60px' }} />
                                    <Col flex="1">
                                        <Form.Item label="Age">
                                            <Slider
                                                range
                                                defaultValue={[ageStart, ageEnd]}
                                                min={18}
                                                max={99}
                                                style={{ width: '150px' }}
                                                onChange={handleAgeRangeChange}
                                                value={[ageStart, ageEnd]}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <p style={{ fontSize: 12, color: 'rgba(132, 134, 150, 1)' }}>
                                    If you just select start date the result will be afterwards and if select end date the result would be before.
                                </p>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="Date Joined">
                                            <DatePicker
                                                suffixIcon={<img src={calendar} alt="calendar" />}
                                                style={{ width: '100%', height: 42, border: '1px solid #6B43B5', marginBottom: 15 }}
                                                onChange={handleStartDateChange}
                                                value={startDate ? dayjs(startDate, 'YYYY-MM-DD') : null}
                                            />
                                            <DatePicker
                                                suffixIcon={<img src={calendar} alt="calendar" />}
                                                style={{ width: '100%', height: 42, border: '1px solid #6B43B5' }}
                                                onChange={handleEndDateChange}
                                                value={endDate ? dayjs(endDate, 'YYYY-MM-DD') : null}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Birth Date">
                                            <DatePicker
                                                suffixIcon={<img src={calendar} alt="calendar" />}
                                                style={{ width: '100%', height: 42, border: '1px solid #6B43B5', marginBottom: 15 }}
                                                onChange={handleBirthDateStartChange}
                                                value={birthDateStart ? dayjs(birthDateStart, 'YYYY-MM-DD') : null}
                                            />
                                            <DatePicker
                                                suffixIcon={<img src={calendar} alt="calendar" />}
                                                style={{ width: '100%', height: 42, border: '1px solid #6B43B5' }}
                                                onChange={handleBirthDateEndChange}
                                                value={birthDateEnd ? dayjs(birthDateEnd, 'YYYY-MM-DD') : null}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div>
                                <p style={{ fontSize: 16, marginBottom: 7, marginTop: 6 }}>Identification</p>
                                <p style={{ fontSize: 14, color: '#848696' }}>Such as First name, Last name, Birth date, Gender, Age</p>
                            </div>
                            <div className="arow-left">
                                <Button
                                    onClick={showContent}
                                    className="details-button-color"
                                    type="text"
                                >
                                    <img src={arrow} alt="" style={{ marginLeft: '8px' }} />
                                </Button>
                            </div>
                        </div>
                    )}

                </Card>
                <Card className='card-modal'>
                    {isExpanded2 ? (
                        <>
                            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 15 }}>
                                <div>
                                    <p style={{ fontSize: 16, marginBottom: 7, marginTop: 6 }}>Location</p>
                                    <p style={{ fontSize: 14, color: '#848696' }}>Such as Country, City, ZIP Code, Address</p>
                                </div>
                                <div className="arow-left">
                                    <Button
                                        onClick={showContent2}
                                        className="details-button-color"
                                        type="text"
                                    >
                                        <img src={arrow} alt="" style={{ marginLeft: '8px' }} />
                                    </Button>
                                </div>
                            </div>
                            <Row style={{ width: '100%', maxWidth: 1000, margin: 'auto' }}>
                                <Col span={12} style={{ paddingRight: 18 }}>
                                    <Form layout="vertical">
                                        <Form.Item label="Country">
                                            <Select
                                                placeholder="Select Country"
                                                style={{ height: 42, borderRadius: 7, border: '1px solid #6B43B5' }}
                                                value={selectedCountry}
                                                onChange={handleCountryChange}
                                            >
                                                <Option value="usa">USA</Option>
                                                <Option value="canada">Canada</Option>
                                            </Select>
                                        </Form.Item>

                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item label="State">
                                                    <Input
                                                        placeholder="Enter State"
                                                        style={{ height: 42, borderRadius: 8, border: '1px solid #6B43B5' }}
                                                        value={stateName}
                                                        onChange={handleStateChange}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label="City">
                                                    <Input
                                                        placeholder="Enter City"
                                                        style={{ height: 42, borderRadius: 8, border: '1px solid #6B43B5' }}
                                                        value={cityName}
                                                        onChange={handleCityChange}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Form.Item label="ZIP Code">
                                            <Input
                                                placeholder="Enter Zip Code"
                                                style={{ height: 42, borderRadius: 8, border: '1px solid #6B43B5' }}
                                                value={zipCode}
                                                onChange={handleZipCodeChange}
                                            />
                                        </Form.Item>

                                        <Form.Item label="Address">
                                            <Input
                                                placeholder="Enter Address"
                                                style={{ height: 42, borderRadius: 8, border: '1px solid #6B43B5' }}
                                                value={address}
                                                onChange={handleAddressChange}
                                            />
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col span={12}>
                                    <p>Detected Location</p>
                                    <div style={{ height: '85%', backgroundColor: '#EEEDFA', padding: 20, borderRadius: 8 }}>

                                        <GoogleMapComponent coordinates={coordinates} setCoordinates={setCoordinates} />
                                        <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', border: '1px solid #6B43B5', borderRadius: 7 }}>
                                            <Input
                                                style={{
                                                    width: 'calc(100% - 0px)',
                                                    height: 42,
                                                    borderRadius: '8px 0 0 8px',
                                                    border: 'none',
                                                    boxShadow: 'none',
                                                }}
                                                defaultValue="21 Street, Houston"
                                            />
                                            <Select
                                                defaultValue="1"
                                                style={{
                                                    width: 100,
                                                    height: 42,
                                                    border: 'none',
                                                    boxShadow: 'none',
                                                    lineHeight: '40px',
                                                }}
                                                dropdownStyle={{ zIndex: 1000 }}
                                                suffixIcon={<DownOutlined style={{ color: 'rgba(0, 0, 0, 0.45)' }} />}
                                                // Step 4: Bind value and onChange
                                                value={selectedDistance}
                                                onChange={handleDistanceChange}
                                            >
                                                <Option value="1">+5 km</Option>
                                                <Option value="2">+10 km</Option>
                                                <Option value="3">+25 km</Option>
                                                <Option value="4">+50 km</Option>
                                                <Option value="5">+100 km</Option>
                                            </Select>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div>
                                <p style={{ fontSize: 16, marginBottom: 7, marginTop: 6 }}>Location</p>
                                <p style={{ fontSize: 14, color: '#848696' }}>Such as Country, City, ZIP Code, Address</p>
                            </div>
                            <div className="arow-left">
                                <Button
                                    onClick={showContent2}
                                    className="details-button-color"
                                    type="text"
                                >
                                    <img src={arrow} alt="" style={{ marginLeft: '8px' }} />
                                </Button>
                            </div>
                        </div>
                    )}
                </Card>
                <Card className='card-modal'>
                    {isExpanded3 ? (
                        <>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div>
                                    <p style={{ fontSize: 16, marginBottom: 7, marginTop: 6 }}>Treatment Plans</p>
                                    <p style={{ fontSize: 14, color: '#848696' }}>Such as Treatment Plans, Procedure Codes, Date of Actions</p>
                                </div>
                                <div className="arow-left">
                                    <Button
                                        onClick={showContent3}
                                        className="details-button-color"
                                        type="text"
                                    >
                                        <img src={arrow} alt="" style={{ marginLeft: '8px' }} />
                                    </Button>
                                </div>
                            </div>
                            <Form layout="vertical" style={{ margin: '0 auto', width: '100%' }}>
                                <Form.Item
                                    label="Procedure"
                                    name="procedure"
                                    style={{ marginBottom: 20 }}
                                >
                                    <Select placeholder="Select Treatment Plan" style={{ height: 42, borderRadius: 7, border: '1px solid #6B43B5', width: '50%' }}>
                                        <Option value="plan1">Treatment Plan 1</Option>
                                        <Option value="plan2">Treatment Plan 2</Option>
                                        <Option value="plan3">Treatment Plan 3</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item label="Treatment Plans Date" style={{ marginBottom: 20 }}>
                                    <p style={{ fontSize: 12, color: '#848696' }}>
                                        If you just select start date the result will be afterwards and if select end date the result would be before.
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Form.Item
                                            name="startDate"
                                            style={{ marginRight: 10, flex: 1 }}
                                        >
                                            <DatePicker
                                                placeholder="Select Start Date"
                                                style={{ width: '100%', height: 42, borderRadius: 8, border: '1px solid #6B43B5' }}
                                                value={startDate2 ? dayjs(startDate2, 'YYYY-MM-DD') : null}
                                                onChange={handleStartDateChange2}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="endDate"
                                            style={{ marginLeft: 10, flex: 1 }}
                                        >
                                            <DatePicker
                                                placeholder="Select End Date"
                                                style={{ width: '100%', height: 42, borderRadius: 8, border: '1px solid #6B43B5' }}
                                                value={endDate2 ? dayjs(endDate2, 'YYYY-MM-DD') : null}
                                                onChange={handleEndDateChange2}
                                            />
                                        </Form.Item>
                                    </div>
                                </Form.Item>
                            </Form>
                        </>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div>
                                <p style={{ fontSize: 16, marginBottom: 7, marginTop: 6 }}>Treatment Plans</p>
                                <p style={{ fontSize: 14, color: '#848696' }}>Such as Treatment Plans, Procedure Codes, Date of Actions</p>
                            </div>
                            <div className="arow-left">
                                <Button
                                    onClick={showContent3}
                                    className="details-button-color"
                                    type="text"
                                >
                                    <img src={arrow} alt="" style={{ marginLeft: '8px' }} />
                                </Button>
                            </div>
                        </div>
                    )}

                </Card>
                <Card className='card-modal'>
                    {isExpanded4 ? (
                        <>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div>
                                    <p style={{ fontSize: 16, marginBottom: 7, marginTop: 6 }}>Oral Health</p>
                                    <p style={{ fontSize: 14, color: '#848696' }}>Such as Occlusion score, Preventive Care score, Oral Health Score and Gum & Bone Health Score</p>
                                </div>
                                <div className="arow-left">
                                    <Button
                                        onClick={showContent4}
                                        className="details-button-color"
                                        type="text"
                                    >
                                        <img src={arrow} alt="" style={{ marginLeft: '8px' }} />
                                    </Button>
                                </div>
                            </div><Form layout="vertical" style={{ margin: '0 auto', width: '100%' }}>
                                <Form.Item
                                    label="Oral Health Type"
                                    name="oralHealthType"
                                    style={{ marginBottom: 20, width: '50%' }}
                                >
                                    <Select
                                        placeholder="Select Oral Health Type"
                                        style={{ height: 42, borderRadius: 7, border: '1px solid #6B43B5' }}
                                        // Step 4: Bind value and onChange
                                        value={oralHealthType}
                                        onChange={handleOralHealthTypeChange}
                                    >
                                        <Option value="type1">Type 1</Option>
                                        <Option value="type2">Type 2</Option>
                                        <Option value="type3">Type 3</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item label="Oral Health Score" style={{ marginBottom: 20 }}>
                                    <Checkbox.Group
                                        style={{ width: '100%' }}
                                        value={oralHealthRanges.map(range => `${range.start}-${range.end}`)}
                                        onChange={handleOralHealthRangesChange}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                            <Checkbox value="0-25" style={{ marginRight: 50 }}>0 &lt; Score &lt; 25</Checkbox>
                                            <Checkbox value="25-50" style={{ marginRight: 50 }}>25 &lt; Score &lt; 50</Checkbox>
                                            <Checkbox value="50-75" style={{ marginRight: 50 }}>50 &lt; Score &lt; 75</Checkbox>
                                            <Checkbox value="75-100">75 &lt; Score &lt; 100</Checkbox>
                                        </div>
                                    </Checkbox.Group>
                                </Form.Item>
                            </Form>
                        </>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div>
                                <p style={{ fontSize: 16, marginBottom: 7, marginTop: 6 }}>Oral Health</p>
                                <p style={{ fontSize: 14, color: '#848696' }}>Such as Occlusion score, Preventive Care score, Oral Health Score and Gum & Bone Health Score</p>
                            </div>
                            <div className="arow-left">
                                <Button
                                    onClick={showContent4}
                                    className="details-button-color"
                                    type="text"
                                >
                                    <img src={arrow} alt="" style={{ marginLeft: '8px' }} />
                                </Button>
                            </div>
                        </div>
                    )}
                </Card>
                <Radio.Group onChange={onChange} value={value} style={{ display: 'flex', flexDirection: 'row' }}>
                    <Radio value="include">Include</Radio>
                    <Radio value="exclude">Exclude</Radio>
                </Radio.Group>
            </Modal >
        </>
    )
}

export default CreateStep1