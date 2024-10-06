import React, { useEffect } from "react";
import { useState } from "react";
import { Pagination, Button, Row, Col, Typography, notification, Spin, Card, Input, Select, DatePicker, Tabs, Divider } from "antd";

import DashboardLayout from "../../layout/dashboardLayout/DashboardLayout";
import TreatmentCard from "./component/TreatmentCard";
import TreatmentCardStep2 from "./component/TreatmentCardStep2";
import ModalComponent from "./component/Modal";
import { controller } from "./controller";
import "./style.css";
import active from '../../assets/icons/active.svg';
import completed from '../../assets/icons/completed.svg';
import chart from '../../assets/icons/chart.svg';
import search from '../../assets/icons/input-affix.jpg';
import archive from '../../assets/icons/archive.svg';
import send from '../../assets/icons/send-2.svg';
import calendar from '../../assets/icons/calendar.png';
import filter1 from '../../assets/icons/filter.png';


const { Title } = Typography;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;


const options = [
  { value: "not_approved", label: "New" },
  { value: "approved", label: "Approved" },
];

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

function TreatmentPlans() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [prodata, setProData] = useState([]);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState([]);
  const [mode, setMode] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentStep, setCurrentStep] = useState(1); // Added state for tracking the current step
  const [selectedPatient, setSelectedPatient] = useState(null); // State for selected patient
  const [searchQuery2, setSearchQuery2] = useState("");
  const [current, setCurrent] = useState(1)
  const [page_size, setPage_size] = useState(0);
  const [toggleContent, setToggleContent] = useState(false);
  const [selectedprocedure, setSelectedProcedure] = useState("");
  const [startDates, setStartDates] = useState("");
  const [endDates, setEndDates] = useState("");
  const [itemlist, setItemList] = useState([]);
  const [members, setMembers] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState(true);



  const getPatients = async () => {
    try {
      const response = await controller.getMemberList2(current, searchQuery2);
      const data = await response.json;
      setMembers(data);
      setPage_size(data.count)
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery2 && isFirstTime) {
        setCurrent(1);
        setIsFirstTime(false); // Ensure this runs only once
      } else {
        getPatients(); // Fetch patients as usual
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [current, searchQuery2, isFirstTime]);





  const getData = async () => {
    try {
      const response = await controller.getData();
      const data = await response.json;
      setItemList(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };


  useEffect(() => {
    getData()
  }, []);



  // const handleReadData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await controller.getTreatmentPlans(mode, searchQuery2, current, startDates, endDates, selectedprocedure);

  //     if (response.status < 250) {
  //       const data = await response.json;  // Properly parsing the JSON
  //       setData(data);
  //       setPage_size(data.count);           // Accessing count from the parsed data
  //     }
  //   } catch (e) {
  //     // notification.error({
  //     //   message: "Error",
  //     //   description: "Server error.",
  //     //   placement: 'bottomRight',
  //     // });
  //   }
  //   setLoading(false);
  // };


  const handleToggle = () => {
    setToggleContent(true);
  };

  const handleClose2 = () => {
    setToggleContent(false);
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleTabChange = (key) => {
    setMode(key);
  };

  const handleProcedureChange = (value) => {
    setSelectedProcedure(value);
  };







  const handleReadProcedure = async () => {
    try {
      const response = await controller.getProcedure(0, '');

      if (response.status < 250) {
        setProData(response.json);
      }
    } catch (e) {
      notification.error({
        message: "Error",
        description: "Server error.",
        placement: 'bottomRight',
      });
    }
  };

  const handleSearch = (e) => {
    setSearchQuery2(e.target.value);
  };



  // const handlePostNoteAndImage = async (note, imageFile) => {
  //   try {
  //     const response = await controller.postNoteAndImage(note, imageFile);
  //     console.log(response);
  //   } catch (error) {
  //     console.error("Error posting note and image:", error);
  //   }
  // };





  const handlePageChange = async (page) => {
    setCurrent(page)
  }

  const onBack = () => {
    setCurrentStep(1)
  }

  // const updateDataUpdatePriority = () => {
  //   // handleReadDataNoLoading();
  //   handleReadData()
  // };

  // const updateData = () => {
  //   handleReadData();
  // };


  // useEffect(() => {
  //   handleReadData();
  //   console.log(data);
  // }, [current, mode, startDates, endDates, selectedprocedure]);

  useEffect(() => {
    handleReadProcedure();
    console.log(prodata);
  }, []);

  useEffect(() => {
    console.log(filter);
  }, [searchQuery]);

  return (
    <>
      <ModalComponent
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        list={list}
        data1={data}
        filter={filter}
        setSearchQuery={setSearchQuery}
      />
      <DashboardLayout>
        <div className="top-margin-large margin-left-small">
          <div className="flex-row-space-between-marginBottom-20">
            {currentStep === 1 && (
              <Title level={4}>Patient's Treatment Plans</Title>
            )}
            {currentStep === 1 ? (
              <Button
                className="button-primary-small-width"
                style={{ width: 154, height: 34 }}
                type="primary"
                onClick={showModal}
              >
                Add
              </Button>
            ) : (
              <Button
                // className="button-primary-small-width"
                // type="primary"
                style={{ border: '1px solid #6B43B5', color: '#6B43B5', marginLeft: 'auto', width: 154, height: 34 }}
                onClick={onBack}
              >
                Back
              </Button>
            )
            }
          </div>
          {currentStep === 1 && (
            <Card style={{ width: '100%', marginBottom: 30 }}>
              <Row gutter={[16, 16]} className="flex-row-evenlyy">
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ height: 121, display: 'flex', alignItems: 'center', flexDirection: 'row', background: 'rgba(223, 218, 255, 0.7)', borderRadius: '8px' }}>
                    <div className='circle' style={{ marginLeft: 20 }}>
                      <img className='icon-center' src={active} alt='' />
                    </div>
                    <div style={{ marginLeft: 25 }}>
                      <div style={{ fontSize: 20, fontWeight: 400, color: '#4D3280', marginBottom: 10 }}>Planned</div>
                      <div style={{ fontSize: 24, color: "#4D3280", fontWeight: 600 }}>
                        {itemlist ? itemlist.planned : ''}
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ height: 121, display: 'flex', alignItems: 'center', flexDirection: 'row', background: 'rgba(223, 218, 255, 0.7)', borderRadius: '8px' }}>
                    <div className='circle' style={{ marginLeft: 20 }}>
                      <img className='icon-center' src={archive} alt='' />
                    </div>
                    <div style={{ marginLeft: 25 }}>
                      <div style={{ fontSize: 20, fontWeight: 400, color: '#4D3280', marginBottom: 10 }}>To Send </div>
                      <div style={{ fontSize: 24, color: "#4D3280", fontWeight: 600 }}>
                        {itemlist ? itemlist.to_send : ''}
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ height: 121, display: 'flex', alignItems: 'center', flexDirection: 'row', background: 'rgba(223, 218, 255, 0.7)', borderRadius: '8px' }}>
                    <div className='circle' style={{ marginLeft: 20 }}>
                      <img className='icon-center' src={send} alt='' />
                    </div>
                    <div style={{ marginLeft: 25 }}>
                      <div style={{ fontSize: 20, fontWeight: 400, color: '#4D3280', marginBottom: 10 }}>Sent</div>
                      <div style={{ fontSize: 24, color: "#4D3280", fontWeight: 600 }}>
                        {itemlist ? itemlist.sent : ''}
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div style={{ height: 121, display: 'flex', alignItems: 'center', flexDirection: 'row', background: 'rgba(223, 218, 255, 0.7)', borderRadius: '8px' }}>
                    <div className='circle' style={{ marginLeft: 20 }}>
                      <img className='icon-center' src={completed} alt='' />
                    </div>
                    <div style={{ marginLeft: 25 }}>
                      <div style={{ fontSize: 20, fontWeight: 400, color: '#4D3280', marginBottom: 10 }}>Accepted</div>
                      <div style={{ fontSize: 24, color: "#4D3280", fontWeight: 600 }}>
                        {itemlist ? itemlist.accepted : ''}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>

          )}
          {currentStep === 1 && (
            <Col xs={24} lg={23.2} md={23.2}>
              <Card>
                <Row justify="end" style={{marginRight: 16}}>
                  <Input
                    onChange={handleSearch}
                    value={searchQuery2}
                    size="middle"
                    placeholder="Search by patient names, phone numbers, or email addresses"
                    suffix={<img src={search} alt="" />}
                    style={{ width: '40%', marginBottom: '16px', height: 41 }}
                  />
                </Row>
                {toggleContent && (
                  <>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25, width: '100%', alignItems: 'center', paddingLeft: 20, paddingTop: 20 }}>
                      <Title level={5}>Advanced Filters</Title>
                      <Button
                        className="details-button-color1"
                        type="text"
                        onClick={handleClose2}
                      >
                        <img src={filter1} alt="" style={{ marginLeft: '8px', bottom: 5, position: 'relative' }} />
                      </Button>
                    </div>
                    {/* <div className="selected-filters" style={{ paddingLeft: 20 }}>
                            {selectedstatus && <Tag closable style={{ height: 28, background: '#EEEDFA', borderRadius: '500px', color: '#6B43B5', padding: 3, paddingLeft: 8, paddingRight: 8 }} onClose={() => handleRemoveFilter('status')}>{selectedstatus}</Tag>}
                            {selectedDates.startDate && <Tag closable style={{ height: 28, background: '#EEEDFA', borderRadius: '500px', color: '#6B43B5', padding: 3, paddingLeft: 8, paddingRight: 8 }} onClose={() => handleRemoveFilter('dates')}>Start: {selectedDates.startDate}</Tag>}
                            {selectedDates.endDate && <Tag closable style={{ height: 28, background: '#EEEDFA', borderRadius: '500px', color: '#6B43B5', padding: 3, paddingLeft: 8, paddingRight: 8 }} onClose={() => handleRemoveFilter('dates')}>End: {selectedDates.endDate}</Tag>}
                            {selectedcategory && <Tag closable style={{ height: 28, background: '#EEEDFA', borderRadius: '500px', color: '#6B43B5', padding: 3, paddingLeft: 8, paddingRight: 8 }} onClose={() => handleRemoveFilter('category')}>{selectedcategory}</Tag>}
                            {selectedlead && <Tag closable style={{ height: 28, background: '#EEEDFA', borderRadius: '500px', color: '#6B43B5', padding: 3, paddingLeft: 8, paddingRight: 8 }} onClose={() => handleRemoveFilter('lead')}>{selectedlead}</Tag>}
                            {selectedname && <Tag closable style={{ height: 28, background: '#EEEDFA', borderRadius: '500px', color: '#6B43B5', padding: 3, paddingLeft: 8, paddingRight: 8 }} onClose={() => handleRemoveFilter('name')}>{selectedname}</Tag>}
                        </div> */}
                  </>
                )}
                {toggleContent && (
                  <>

                    <Row justify="space-between" type="flex" style={{ marginBottom: 23, paddingLeft: 20 }}>
                      <Col span={8} style={{ marginTop: 0 }}>
                        <Row>
                          <label style={{ marginBottom: 15 }}>Start Date</label>
                        </Row>
                        <div className="c1">
                          <DatePicker
                            allowClear={true}
                            onChange={(date) => {
                              if (date === null) {
                                setStartDates(""); // Set to an empty string if cleared
                              } else {
                                setStartDates(date.format('YYYY-MM-DD')); // Set to the selected date
                              }
                            }}
                            suffixIcon={<img src={calendar} alt="" />}
                            style={{ width: '85%', height: 42, border: '1px solid #6B43B5' }}
                          />

                        </div>
                      </Col>
                      <Col span={8}>
                        <Row>
                          <label>End Date</label>
                        </Row>
                        <DatePicker
                          allowClear={true}
                          onChange={(date) => {
                            if (date === null) {
                              setEndDates(""); // Set to an empty string if cleared
                            } else {
                              setEndDates(date.format('YYYY-MM-DD')); // Set to the selected date
                            }
                          }}
                          suffixIcon={<img src={calendar} alt="" />}
                          style={{ width: '85%', height: 42, border: '1px solid #6B43B5' }}
                        />

                        <Divider type="vertical" className="vertical-divider" />
                      </Col>
                      <Col span={8} style={{ marginTop: 0 }}>
                        <Row>
                          <label style={{ marginBottom: 15 }}>Procedures Code</label>
                        </Row>
                        <Select
                          placeholder="Select Procedure Code"
                          style={{
                            width: '85%',
                            height: 42,
                            border: '1px solid #6B43B5',
                            borderRadius: 7
                          }}
                          filterOption={(input, option) =>
                            option.props.children.toLowerCase().includes(input.toLowerCase())
                          }
                          showSearch={true}
                          onChange={(value) => {
                            if (value === undefined) {
                              handleProcedureChange(""); // Set to empty string if cleared
                            } else {
                              handleProcedureChange(value); // Set to the selected value
                            }
                          }}
                          value={selectedprocedure || undefined}
                          allowClear={true}
                        >
                          {prodata && prodata.length > 0 ? (
                            prodata.map((item) => (
                              item && item.id ? ( // Check if item and item.id are valid
                                <Select.Option key={item.id} value={item.id}>
                                  {item.procedure_code + "-" + item.procedure_code_description}
                                </Select.Option>
                              ) : null // If item is null or doesn't have an id, don't render
                            ))
                          ) : (
                            <Select.Option disabled key={-2} value="">
                              empty
                            </Select.Option>
                          )}
                          ) : (
                          <Select.Option disabled key={-2} value="">
                            empty
                          </Select.Option>
                          )
                        </Select>

                      </Col>
                    </Row>
                  </>
                )}
                <div className="div-row">
                  {/* <div style={customStyles.page}>
                    <Tabs defaultActiveKey="1" onChange={handleTabChange}>
                      <TabPane tab="All" key="all">
                      </TabPane>
                      <TabPane tab="Planned" key="planned">
                      </TabPane>
                      <TabPane tab="To Send" key="to_send">
                      </TabPane>
                      <TabPane tab="Sent" key="sent">
                      </TabPane>
                      <TabPane tab="Accepted" key="accepted">
                      </TabPane>
                    </Tabs>
                  </div> */}
                  {/* {!toggleContent ? (
                    <div style={{ marginTop: 10 }}>
                      <Button
                        className="details-button-color1"
                        type="text"
                        onClick={handleToggle}
                      >
                        <img src={filter1} alt="" style={{ marginLeft: '8px' }} />
                      </Button>
                    </div>
                  ) : (
                    <></>
                  )} */}

                </div>

                {loading ? (
                  <Row justify={"center"}>
                    <Spin />
                  </Row>
                ) : (
                  <div>
                    {Array.isArray(members.results) && members.results.length > 0 ? (
                      members && members.results && members.results.map((item) => (
                        <div className="mb" key={item.id}>
                          <TreatmentCard
                            // updateData={updateData}
                            // updateDataUpdatePriority={updateDataUpdatePriority}
                            data={item}
                            // postNoteAndImage={handlePostNoteAndImage}
                            currentStep={currentStep}
                            setCurrentStep={setCurrentStep}
                            setSelectedPatient={setSelectedPatient}
                            selectedPatient={selectedPatient}
                          />
                        </div>
                      ))
                    ) : (
                      <p>Loading members...</p>
                    )}
                  </div>
                )}
              </Card>
              <Row type='flex' justify='center' style={{ marginBottom: 35, marginTop: 35 }}>
                <Pagination
                  showSizeChanger={false}
                  hideOnSinglePage={true}
                  current={current}
                  total={page_size}
                  onChange={handlePageChange}
                  className="paginator"
                  size="small"
                />
              </Row>
            </Col>
          )}

          {currentStep === 2 && selectedPatient && (
            <Col xs={24} lg={23.2} md={23.2}>
              <TreatmentCardStep2
                // updateData={updateData}
                // updateDataUpdatePriority={updateDataUpdatePriority}
                data={selectedPatient} // Pass the selected patient data
                // postNoteAndImage={handlePostNoteAndImage}
                setSelectedPatient={setSelectedPatient}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              // handleReadData={handleReadData}
              />
            </Col>
          )}
        </div>
      </DashboardLayout>
    </>
  );
}

export default TreatmentPlans;
