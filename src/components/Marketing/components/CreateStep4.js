import React, { useState, useEffect } from 'react';
import { Typography, Space, Progress, Row, Col, Tag, Card, Avatar, Tooltip, Checkbox, Divider } from 'antd';
import { EditOutlined, UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import { controller } from '../controller'
import PatientDetailsDropdown from './PatientDetailsDropdown'

import rec2 from '../../../assets/icons/rec22.png';


const { Title, Text, Link } = Typography;

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
const CampaignInfo = ({ providePatchCampaignData3, ...props }) => {
    const [patients, setPatient] = useState([]);
    const [selectedPatients, setSelectedPatients] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
   

    // props.campaignid
    const handleReadPatient = async () => {
        try {
            const response = await controller.getPatientListWithId(0, props.campaignid);
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

    const handleReadCampaigns = async () => {
        try {
            const response = await controller.getCampaignsInfo(0, props.campaignid);

            if (response.status < 250) {
                setCampaigns(response.json);
            }
        } catch (e) {
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

    const doneCampaign = async () => {
        try {
            const response = await controller.activeCampaign(props.campaignid, {
                patient_selectors: selectedPatients,
                status: 'active'
            });
    
            // Check if response status is less than 250
            if (response.status < 250) {
                window.location.hash = '#/campaigns'; // Redirect using window.location for hash-based routing
                return; // Prevent further execution
            }
    
            if (!response.ok && response.status !== 201) {
                const errorResponse = await response.json();
                console.error('Error details:', errorResponse);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            const campaignId = data.id;
            console.log('Newly created campaign ID:', campaignId);
    
            console.log(`Campaign created successfully with ID: ${campaignId}`);
            // sendCampaignId(campaignId);
        } catch (error) {
            console.error('Error posting campaign data:', error);
        }
    };
    

    useEffect(() => {
        providePatchCampaignData3(doneCampaign, { selectedPatients });
    }, [selectedPatients]);


    useEffect(() => {
        handleReadPatient();
    }, []);

    useEffect(() => {
        handleReadCampaigns();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return 'No Date Provided';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Splits at the 'T' and returns only the date part
      };

      const startDate = campaigns && campaigns.campaigns ? formatDate(campaigns.campaigns.start_date) : 'Loading...';
      const endDate = campaigns && campaigns.campaigns ? formatDate(campaigns.campaigns.end_date) : 'Loading...';
      const progressPercent = Math.min(100, ((new Date() - new Date(startDate)) / (new Date(endDate) - new Date(startDate))) * 100);


    const isFirstPatientReady = patients.length > 0 && patients[0].identification && patients[0].identification.length > 0;
    const patients2 = patients && patients.length > 0 ? patients[0].patients : [];


    return (
        <>
            <div style={{ borderRadius: '8px' }}>
                <Title level={4} style={{ marginBottom: '16px' }}>
                    Campaign Information
                    <EditOutlined style={{ float: 'right', fontSize: '16px' }} />
                </Title>
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <div>
                        <Text style={{color: '#848696'}}>Campaign Name: </Text>
                        <Link href="#">{campaigns && campaigns.campaigns ? campaigns.campaigns.campaign_name : "-"} </Link>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text style={{color: '#848696'}}>{campaigns && campaigns.campaigns ? formatDate(campaigns.campaigns.start_date) : '-'}</Text>
                        <Text style={{color: '#848696'}}>{campaigns && campaigns.campaigns ? formatDate(campaigns.campaigns.end_date) : '-'}</Text>
                    </div>
                </Space>
                <Progress  percent={progressPercent} showInfo={false} style={{ marginTop: '20px' }} strokeColor={'#6B43B5'} />
            </div>
            <div style={{ marginTop: 30 }}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <Title level={5} style={{ margin: 0 }}>
                            Lead Selection Criteria
                        </Title>
                    </Col>
                    <Col>
                        <EditOutlined style={{ float: 'right', fontSize: '16px' }} />
                    </Col>
                </Row>
            </div>
            <div style={{ marginTop: 20 }}>
                <div style={{ marginRight: '20px' }}>
                    <span style={{ marginRight: '8px', color: '#848696' }}>Filters:</span>
                    <Tag closable style={{ height: 28, background: '#EEEDFA', borderRadius: '500px', color: '#6B43B5', padding: 3, paddingLeft: 8, paddingRight: 8 }}>18 &lt; Age &lt; 60</Tag>
                    <Tag closable style={{ height: 28, background: '#EEEDFA', borderRadius: '500px', color: '#6B43B5', padding: 3, paddingLeft: 8, paddingRight: 8 }}>Location : Houston</Tag>
                    <Tag closable style={{ height: 28, background: '#EEEDFA', borderRadius: '500px', color: '#6B43B5', padding: 3, paddingLeft: 8, paddingRight: 8 }}>Status : Include</Tag>
                </div>
                <div style={{ width: '100%', marginTop: 10 }}>
                    <span style={{ marginRight: '8px', color: '#848696'}}>Total:</span>
                    <Link href="#" style={{ fontSize: '16px', marginLeft: '88.8%' }}>{patients2 && patients2.length} Patients</Link>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: 30, width: '100%', justifyContent: 'space-between' }} >
                <Row gutter={[100, 55]}>
                    {patients.map((patient) => (
                        <Col span={8} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                            <Card
                                className={`custom-card123`}
                                bordered={false}
                                key={patient.id}
                            >
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
                                        />
                                    ) : (
                                        <p>Loading patient details or no data available...</p>
                                    )}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                    <p style={{ fontSize: 16, zIndex: 1, position: 'relative', width: '100%' }}>Location</p>
                                    {isFirstPatientReady ? (
                                        <PatientDetailsDropdown
                                            location={patient.location}
                                        />
                                    ) : (
                                        <p>Loading patient details or no data available...</p>
                                    )}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                    <p style={{ fontSize: 16, zIndex: 1, position: 'relative', width: '100%' }}>Treatment Plans</p>
                                    {isFirstPatientReady ? (
                                        <PatientDetailsDropdown
                                            treatmentPlans={patient.treatment_plans}
                                        />
                                    ) : (
                                        <p>Loading patient details or no data available...</p>
                                    )}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                    <p style={{ fontSize: 16, zIndex: 1, position: 'relative', width: '100%' }}>Health Score</p>
                                    {isFirstPatientReady ? (
                                        <PatientDetailsDropdown
                                            healthScore={patient.health_score}
                                        />
                                    ) : (
                                        <p>Loading patient details or no data available...</p>
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
                </Row>
            </div>
            <div style={{ marginTop: 30 }}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <Title level={5} style={{ marginBottom: 30}}>
                            Delivery Information
                        </Title>
                    </Col>
                    <Col>
                        <EditOutlined style={{ float: 'right', fontSize: '16px' }} />
                    </Col>
                </Row>
            </div>
            <div className="email-template-container">
                <div className="campaign-details">
                    <div className="detail-item">
                        <Text strong>Campaign Category</Text>
                        <Tag  style={{ height: 28, background: '#EEEDFA', borderRadius: '500px', color: '#6B43B5', padding: 3, paddingLeft: 8, paddingRight: 8, marginTop: 20, textAlign: 'center' }}>{campaigns.campaigns ? campaigns.campaigns.category : "-"}</Tag>
                    </div>
                    <div className="detail-item">
                        <Text strong>Delivery Type</Text>
                        <Tag  style={{ height: 28, background: '#EEEDFA', borderRadius: '500px', color: '#6B43B5', padding: 3, paddingLeft: 8, paddingRight: 8, marginTop: 20, textAlign: 'center' }}>{campaigns.campaigns &&  campaigns.campaigns.action ? campaigns.campaigns.action.action_type : "-"}</Tag>
                    </div>
                    <div className="detail-item">
                        <Text strong>Action Type</Text>
                        <Tag  style={{ height: 28, background: '#EEEDFA', borderRadius: '500px', color: '#6B43B5', padding: 3, paddingLeft: 8, paddingRight: 8, marginTop: 20, textAlign: 'center' }}>{campaigns.campaigns &&  campaigns.campaigns.action_trigger ? campaigns.campaigns.action_trigger.trigger_type : "-"}</Tag>
                    </div>
                    <div className="detail-item">
                        <Text strong>Event</Text>
                        <Tag  style={{ height: 28, background: '#EEEDFA', borderRadius: '500px', color: '#6B43B5', padding: 3, paddingLeft: 8, paddingRight: 8, marginTop: 20, textAlign: 'center' }}>{campaigns.campaigns &&  campaigns.campaigns.action_trigger ? campaigns.campaigns.action_trigger.recurring_period : "-"}</Tag>
                    </div>
                </div>

                <div className="email-template">
                    <Text strong >Email Template</Text>
                    <div className="template-item" style={{marginTop: 30}}>
                        <Text style={{color: '#848696'}}>Email Template Name:</Text> Email Template 1
                    </div>
                    <div className="template-item">
                        <Text style={{color: '#848696'}}>Email Template Subject:</Text> Hurry Up! lorem ipsum lorem ipsum lorem ipsum
                    </div>
                    <div className="email-preview">
                        <Text type="secondary">Email Preview</Text>
                    </div>
                </div>
            </div>
           
        </>
    );
};

export default CampaignInfo;
