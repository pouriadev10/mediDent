import React, { useEffect, useState } from "react";
import {
    Avatar,
    Button,
    Col,
    Card,
    Typography,
    Tabs,
    DatePicker,
    Select,
    Form,
    Row,
    Divider
} from "antd";

// icons
import up from '../../../assets/icons/arrow-up.png'
import down from '../../../assets/icons/arrow-down.png'
import frame from '../../../assets/icons/send2.svg'
import task from '../../../assets/icons/task-square2.svg'
import bookmark from '../../../assets/icons/bookmark.svg'
import archive from '../../../assets/icons/archive2.svg'
import group from '../../../assets/icons/group.svg'
import filter from '../../../assets/icons/filter.png';
import arrow from '../../../assets/icons/arrow-right.svg';
import phone from '../../../assets/icons/call.svg'
import email from '../../../assets/icons/sms3.svg'



import "../style.css";
import ModalStep3 from './ModalStep3'

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;




// variables
const { Meta } = Card;
const { TabPane } = Tabs;

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
        // marginBottom: '20px',
        width: '100%'
    },
    tabs: {
        width: '100%'
    },
};

const TreatmentCard = (props) => {
    const [isExpanded, setisExpanded] = useState(false);
    const [item, setitems] = useState([]);
    const [isModalVisible1, setIsModalVisible1] = useState(false);



    useEffect(() => {
        if (props.data) {
            setitems(props.data);
        }
    }, [props.data]);



    const handleClick = () => {
        // props.updateData();
        props.setCurrentStep(2); // Set the current step to 2
        props.setSelectedPatient(props.data); // Set the selected patient data
        localStorage.setItem("patient_id", props.data.id);
    };

    const handleClose = () => {
        setisExpanded(false);
        props.updateData();
    };



    return (
        <>
            <ModalStep3
                isModalVisible={isModalVisible1}
                setIsModalVisible={setIsModalVisible1}
                selectedMember={item}
            />

            <Col xs={24} lg={23.5} md={23.5}>
                <Card className="card-size">
                    <div className="flex-row-space-between">
                        <div className="avatar-meta-container1">
                            <div className="avatar-meta-width">
                                <Meta
                                    className="meta-align-left"
                                    title={item.first_name + " " + item.last_name}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', width: '100%', alignItems: 'center' }}>
                            {/* <div style={{ display: 'flex', flexDirection: 'row', width: "35%" }}>
                                <img src={task} alt="" style={{ marginRight: '8px' }} />
                                <Typography style={{ color: "#848696" }}>Treatments: <span style={{ color: 'black' }}>{item.updated_plans}</span></Typography>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', width: "35%" }}>
                                <img src={bookmark} alt="" style={{ marginRight: '8px' }} />
                                <Typography style={{ color: "#848696" }}>Planned: <span style={{ color: 'black' }}>{item.planned}</span></Typography>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', width: "35%" }}>
                                <img src={archive} alt="" style={{ marginRight: '8px' }} />
                                <Typography style={{ color: "#848696" }}>To Send: <span style={{ color: 'black' }}>{item.to_send}</span></Typography>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', width: "35%" }}>
                                <img src={frame} alt="" style={{ marginRight: '8px' }} />
                                <Typography style={{ color: "#848696" }}>Sent: <span style={{ color: 'black' }}>{item.sent}</span></Typography>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', width: "35%" }}>
                                <img src={group} alt="" style={{ marginRight: '8px' }} />
                                <Typography style={{ color: "#848696" }}>Accepted: <span style={{ color: 'black' }}>{item.accepted}</span></Typography>
                            </div> */}
                            <div style={{ display: 'flex', flexDirection: 'row', width: "35%" }}>
                                <img src={phone} alt="" style={{ marginRight: '8px', width: 18, height: 18 }} />
                                <Typography style={{ color: "#848696" }}>{item.phone || '-'}</Typography>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', width: "35%" }}>
                                <img src={email} alt="" style={{ marginRight: '8px', width: 18, height: 18 }} />
                                <Typography style={{ color: "#848696" }}>{item.email || '-'}</Typography>
                            </div>
                        </div>
                        <div className="meta-card">
                            {isExpanded ? (
                                <Button
                                    className="details-button-color"
                                    type="text"
                                    onClick={handleClose}
                                >
                                    <span className="size-16">View</span>
                                    <img src={arrow} alt="" style={{ marginLeft: '8px' }} />
                                </Button>
                            ) : (
                                <Button
                                    className="details-button-color"
                                    type="text"
                                    onClick={handleClick}
                                >
                                    <span className="size-16">View</span>
                                    <img src={arrow} alt="" style={{ marginLeft: '8px' }} />
                                </Button>
                            )}
                        </div>
                    </div>
                </Card>
            </Col >
        </>
    );
};

export default TreatmentCard;
