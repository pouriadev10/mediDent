import React, { useEffect, useState } from "react";


import DashboardLayout from "../../layout/dashboardLayout/DashboardLayout";
import CampaignCard from "./components/CampaignsCard";
import { controller } from "./controller";
import { Typography, Button, Col, Card, Tag, Tabs, Row, Divider, DatePicker, Select, Input } from "antd";
import "./style.css";

//Icons 
import people from '../../assets/icons/people.no-white.png';
import user from '../../assets/icons/tag-user.png';
import accept from '../../assets/icons/accept.png';
import reject from '../../assets/icons/reject.png';
import filter from '../../assets/icons/filter.png';
import calendar from '../../assets/icons/calendar.png';
import arrow from '../../assets/icons/arrow-left.png';

const { Title } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const customStyles = {
    card: {
        borderRadius: '8px',
        marginBottom: '10px',
        marginTop: '20px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    audienceTag: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.9rem',
    },
    statusTag: {
        padding: '5px 15px',
        borderRadius: '16px',
    },
    page: {
        padding: '20px',
        paddingTop: '0px',
        marginBottom: '20px',
        width: '100%'
    },
    tabs: {
        width: '100%'
    },
};

const Campaigns = ({history}) => {
    const [toggleContent, setToggleContent] = useState(false);
    const [selectedDates, setSelectedDates] = useState({ startDate: null, endDate: null });
    const [selectedstatus, setSelectedStatus] = useState(null);
    const [selectedcategory, setSelectedCategory] = useState(null);
    const [selectedlead, setSelectedLead] = useState("");
    const [selectedname, setSelectedName] = useState("");
    const [data, setData] = useState([]);
    const [status, setStatus] = useState([]);
    const [category, setCategory] = useState([])

    const handleCreateCampaign = () => {
        history.push('/create-campaigns'); 
    };
    

    const handleReadStatus = async () => {
        try {
            const response = await controller.getStatusList();

            if (response.status < 250) {
                setStatus(response.json);
            }
        } catch (e) {
        }
    };

    useEffect(() => {
        handleReadStatus();
    }, []);



    const handleReadCategory = async () => {
        try {
            const response = await controller.getCategoryList();

            if (response.status < 250) {
                setCategory(response.json);
            }
        } catch (e) {
        }
    };

    useEffect(() => {
        handleReadCategory();
    }, []);


    const handleReadData = async () => {
        try {
            const queryParams = new URLSearchParams();

            if (selectedDates.startDate) queryParams.append('start_date', selectedDates.startDate);
            if (selectedDates.endDate) queryParams.append('end_date', selectedDates.endDate);
            if (selectedstatus) queryParams.append('status', selectedstatus);
            if (selectedcategory) queryParams.append('category', selectedcategory);
            if (selectedlead) queryParams.append('lead_criteria_seleciton', selectedlead);
            if (selectedname) queryParams.append('campaign_name', selectedname);

            const response = await controller.getCampaignsList(queryParams.toString());

            if (response.status < 250) {
                setData(response.json);
            }
        } catch (e) {
            console.error("Failed to fetch data:", e);
        }
    };

    useEffect(() => {
        handleReadData();
    }, [selectedstatus, selectedDates, selectedcategory, selectedlead, selectedname]);

    const handleToggle = () => {
        setToggleContent(true);
    };

    const handleClose = () => {
        setToggleContent(false);
    }

    const filterCampaigns = statusFilter => {
        return data && data.campaigns && data.campaigns
            .filter(campaign => statusFilter === 'All' || campaign.status === statusFilter)
            .map(campaign => (
                <Col key={campaign.id} style={{marginRight: 55}} >
                    <CampaignCard xs={24} sm={12} md={12} lg={8}
                        title={campaign.campaign_name}
                        startDate={formatDate(campaign.start_date)}
                        endDate={formatDate(campaign.end_date)}
                        status={campaign.status}
                    />
                </Col>
            ));
    };

    const handleRemoveFilter = (filterName) => {
        switch (filterName) {
            case 'status':
                setSelectedStatus('');
                break;
            case 'dates':
                setSelectedDates({ startDate: null, endDate: null });
                break;
            case 'category':
                setSelectedCategory('');
                break;
            case 'lead':
                setSelectedLead('');
                break;
            case 'name':
                setSelectedName('');
                break;
            default:
                break;
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <>
            <DashboardLayout>
                <div style={{ marginTop: 55, marginLeft: 20 }}>
                    <div className="flex-row-space-between-marginBottom-20">
                        <Title level={4}>Campaigns</Title>
                        <Button
                            className="button-primary-small-width1"
                            type="primary"
                            onClick={handleCreateCampaign}
                        >

                            Create
                        </Button>

                    </div>
                    <Col xs={24} style={{ marginBottom: 15, marginTop: 20 }} >
                        <Card>
                            <Row gutter={[25,25]}>
                                <Col xs={24} sm={12} md={12} lg={6}>
                                    <div style={{ width: '100%', height: 108, display: 'flex', alignItems: 'center', flexDirection: 'row', background: 'rgba(223, 218, 255, 0.7)', borderRadius: '8px' }}>
                                        <div className='circle' style={{ marginLeft: 15 }}>
                                            <img className='icon-center' src={people} alt='' />
                                        </div>
                                        <div style={{ marginLeft: 20 }}>
                                            <div style={{ fontSize: 20, fontWeight: 400, color: '#4D3280', marginBottom: 5 }}>Total</div>
                                            <div style={{ fontSize: 24, color: "#5D3B9C", fontWeight: 700 }}>{data.total_campaigns ? data.total_campaigns : '-'}</div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={6}>
                                    <div style={{ width: '100%', height: 108, display: 'flex', alignItems: 'center', flexDirection: 'row', background: 'rgba(223, 218, 255, 0.7)', borderRadius: '8px' }}>
                                        <div className='circle' style={{ marginLeft: 15 }}>
                                            <img className='icon-center' src={accept} alt='' />
                                        </div>
                                        <div style={{ marginLeft: 20 }}>
                                            <div style={{ fontSize: 20, fontWeight: 400, color: '#4D3280', marginBottom: 5 }}>Active</div>
                                            <div style={{ fontSize: 24, color: "#5D3B9C", fontWeight: 700 }}>{data.active_campaigns ? data.active_campaigns : '-'}</div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={6}>
                                    <div style={{ width: '100%', height: 108, display: 'flex', alignItems: 'center', flexDirection: 'row', background: 'rgba(223, 218, 255, 0.7)', borderRadius: '8px' }}>
                                        <div className='circle' style={{ marginLeft: 15 }}>
                                            <img className='icon-center' src={reject} alt='' />
                                        </div>
                                        <div style={{ marginLeft: 20 }}>
                                            <div style={{ fontSize: 20, fontWeight: 400, color: '#4D3280', marginBottom: 5 }}>Archived</div>
                                            <div style={{ fontSize: 24, color: "#5D3B9C", fontWeight: 700 }}>{data.inactive_campaigns ? data.inactive_campaigns : '-'}</div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={6}>
                                    <div style={{ width: '100%', height: 108, display: 'flex', alignItems: 'center', flexDirection: 'row', background: 'rgba(223, 218, 255, 0.7)', borderRadius: '8px' }}>
                                        <div className='circle' style={{ marginLeft: 15 }}>
                                            <img className='icon-center' src={user} alt='' />
                                        </div>
                                        <div style={{ marginLeft: 20 }}>
                                            <div style={{ fontSize: 20, fontWeight: 400, color: '#4D3280', marginBottom: 5 }}>Not-Started</div>
                                            <div style={{ fontSize: 24, color: "#5D3B9C", fontWeight: 700 }}>{data.not_started ? data.not_started : '-'}</div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Card style={{ marginTop: 30 }}>
                        {toggleContent && (
                            <>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25, width: '100%', alignItems: 'center', paddingLeft: 20, paddingTop: 20 }}>
                                    <Title level={5}>Advanced Filters</Title>
                                    <Button
                                        className="details-button-color1"
                                        type="text"
                                        onClick={handleClose}
                                    >
                                        <img src={filter} alt="" style={{ marginLeft: '8px', bottom: 5, position: 'relative' }} />
                                    </Button>
                                </div>
                                <div className="selected-filters" style={{ paddingLeft: 20 }}>
                                    {selectedstatus && <Tag closable style={{ height: 28, background: '#EEEDFA', borderRadius: '500px', color: '#6B43B5', padding: 3, paddingLeft: 8, paddingRight: 8 }} onClose={() => handleRemoveFilter('status')}>{selectedstatus}</Tag>}
                                    {selectedDates.startDate && <Tag closable style={{ height: 28, background: '#EEEDFA', borderRadius: '500px', color: '#6B43B5', padding: 3, paddingLeft: 8, paddingRight: 8 }} onClose={() => handleRemoveFilter('dates')}>Start: {selectedDates.startDate}</Tag>}
                                    {selectedDates.endDate && <Tag closable style={{ height: 28, background: '#EEEDFA', borderRadius: '500px', color: '#6B43B5', padding: 3, paddingLeft: 8, paddingRight: 8 }} onClose={() => handleRemoveFilter('dates')}>End: {selectedDates.endDate}</Tag>}
                                    {selectedcategory && <Tag closable style={{ height: 28, background: '#EEEDFA', borderRadius: '500px', color: '#6B43B5', padding: 3, paddingLeft: 8, paddingRight: 8 }} onClose={() => handleRemoveFilter('category')}>{selectedcategory}</Tag>}
                                    {selectedlead && <Tag closable style={{ height: 28, background: '#EEEDFA', borderRadius: '500px', color: '#6B43B5', padding: 3, paddingLeft: 8, paddingRight: 8 }} onClose={() => handleRemoveFilter('lead')}>{selectedlead}</Tag>}
                                    {selectedname && <Tag closable style={{ height: 28, background: '#EEEDFA', borderRadius: '500px', color: '#6B43B5', padding: 3, paddingLeft: 8, paddingRight: 8 }} onClose={() => handleRemoveFilter('name')}>{selectedname}</Tag>}
                                </div>
                            </>
                        )}
                        {toggleContent && (
                            <Row justify="space-between" type="flex" style={{ marginBottom: 23, paddingLeft: 20 }}>
                                <Col span={8}>
                                    <Row>
                                        <label>Status</label>
                                    </Row>

                                    <Select
                                        style={{ width: '85%', height: "42px", border: '1px solid #6B43B5', borderRadius: '7px' }}
                                        placeholder="Select Status"
                                        onChange={(value) => setSelectedStatus(value)}
                                        suffixIcon={<img src={arrow} alt="" />}
                                        showSearch
                                        allowClear
                                    >
                                        {status.map((item) => {
                                            let displayText = "";
                                            switch (item.status) {
                                                case 'active':
                                                    displayText = 'Active';
                                                    break;
                                                case 'inactive':
                                                    displayText = 'Not-started';
                                                    break;
                                                case 'draft':
                                                    displayText = 'Draft';
                                                    break;
                                                case 'archived':
                                                    displayText = 'Archived';
                                                    break;
                                                default:
                                                    displayText = item.status;
                                            }

                                            return <Option value={item.status}>{displayText}</Option>;
                                        })}

                                    </Select>
                                    <Divider type="vertical" className="vertical-divider" />
                                </Col>
                                <Col span={8}>
                                    <Row>
                                        <label>Start Date</label>
                                    </Row>
                                    <div className="c1">
                                        <DatePicker
                                            onChange={(date, dateString) => {
                                                setSelectedDates(prevDates => ({ ...prevDates, startDate: dateString }));
                                            }}
                                            suffixIcon={<img src={calendar} alt="" />}
                                            style={{ width: '85%', height: 42, border: '1px solid #6B43B5' }}
                                        />
                                        <Divider type="vertical" className="vertical-divider" />
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <Row>
                                        <label>End Date</label>
                                    </Row>
                                    <DatePicker
                                        onChange={(date, dateString) => {
                                            setSelectedDates(prevDates => ({ ...prevDates, endDate: dateString }));
                                        }}
                                        suffixIcon={<img src={calendar} alt="" />}
                                        style={{ width: '85%', height: 42, border: '1px solid #6B43B5' }}
                                    />
                                </Col>

                                <Col span={24} style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
                                    <Col span={8}>
                                        <Row>
                                            <label>Category</label>
                                        </Row>

                                        <Select
                                            style={{ width: '85%', height: "42px", border: '1px solid #6B43B5', borderRadius: '7px' }}
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
                                                        displayText2 = 'New_Patients';
                                                        break;
                                                    case 'business_boost':
                                                        displayText2 = 'Business_Boost';
                                                        break;
                                                    default:
                                                        displayText2 = items.category;
                                                }

                                                return <Option value={items.category}>{displayText2}</Option>;
                                            })}
                                        </Select>
                                        <Divider type="vertical" className="vertical-divider" />
                                    </Col>

                                    <Col span={8}>
                                        <Row>
                                            <label>Lead Selection criteria</label>
                                        </Row>
                                        <Input
                                            onChange={(e) => setSelectedLead(e.target.value)}
                                            style={{ width: '85%', height: 42, border: '1px solid #6B43B5', borderRadius: '8px' }}
                                            placeholder="Enter Audience Name"

                                        />
                                        <Divider type="vertical" className="vertical-divider" />
                                    </Col>
                                    <Col span={8}>
                                        <Row>
                                            <label>Campaign Name</label>
                                        </Row>
                                        <Input
                                            onChange={(e) => setSelectedName(e.target.value)}
                                            style={{ width: '85%', height: 42, border: '1px solid #6B43B5', borderRadius: '8px' }}
                                            placeholder="Enter Campaign Name"

                                        />
                                    </Col>
                                </Col>
                            </Row>
                        )}
                        <div className="div-row">
                            <div style={customStyles.page}>
                                <Tabs defaultActiveKey="1" style={customStyles.tabs} >
                                    <TabPane tab="All" key="1">
                                        <Row gutter={[16, 16]}>{filterCampaigns('All')}</Row>
                                    </TabPane>
                                    <TabPane tab="Active" key="2">
                                        <Row gutter={[16, 16]}>{filterCampaigns('active')}</Row>
                                    </TabPane>
                                    <TabPane tab="Archived" key="3">
                                        <Row gutter={[16, 16]}>{filterCampaigns('archived')}</Row>
                                    </TabPane>
                                    <TabPane tab="Not-Started" key="4">
                                        <Row gutter={[16, 16]}>{filterCampaigns('not-Started')}</Row>
                                    </TabPane>
                                    <TabPane tab="Drafts" key="5">
                                        <Row gutter={[16, 16]}>{filterCampaigns('draft')}</Row>
                                    </TabPane>
                                </Tabs>
                            </div>
                            {!toggleContent ? (
                                <div style={{ marginTop: 10 }}>
                                    <Button
                                        className="details-button-color1"
                                        type="text"
                                        onClick={handleToggle}
                                    >
                                        <img src={filter} alt="" style={{ marginLeft: '8px' }} />
                                    </Button>
                                </div>
                            ) : (
                                <></>
                            )}

                        </div>
                    </Card>
                </div>
            </DashboardLayout >
        </>
    );
};

export default Campaigns;