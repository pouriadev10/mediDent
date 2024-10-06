 import {Card, Row, DatePicker, Input, Modal, Select, Steps, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Error } from "../../../ErrorHandeling";
import "../style.css";

const { Step } = Steps;
const { Option } = Select;
const { confirm } = Modal;

const Questions = ({ handleBackStage, handleDoneStage }) => {
  const [loading, setLoading] = useState(false);
  const [addFamilyBool, setAddFamilyBool] = useState(false);
  const [stage, setStage] = useState(1);
  const [dataSource, setDataSource] = useState([]);
  const [openFamilyModal, setOpenFamilyModal] = useState(false);

  const [AddAnotherFamilyResponse, setAddAnotherFamilyResponse] = useState(1);
  const [openAddAnotherFamily, setOpenAddAnotherFamily] = useState(true);
  const [financeOptions, setFinanceOptions] = useState({});

  const [familyMember, setFamilyMember] = useState({
    fullName: "",
    birthDate: "",
    relation: "",
    occupation: "",
    country: "",
  });

  const [formError, SetFormError] = useState({
    fullName: {
      status: true,
      massage: "",
    },
    birthDate: {
      status: true,
      massage: "",
    },
    relation: {
      status: true,
      massage: "",
    },
    occupation: {
      status: true,
      massage: "",
    },
    country: {
      status: true,
      massage: "",
    },
  });

  const [userInput, setUserInput] = useState({
    occupation: "",
    Policyholder: "",
    familyMember: "",
  });

  const handleAddFamilyMember = () => {
    setOpenFamilyModal(true);
  };

  const handleBackStage3 = () => {
    setStage(4);
  };

  const handleBackStage1 = () => {
    handleBackStage();
  };

  const handleNextStage1 = () => {
    if (addFamilyBool) setStage(2);
    else handleDoneStage();
  };
  const handleNextStage3 = () => {
    setStage(4);
  };
  const handleBackStage2 = () => {
    setStage(1);
  };

  const handleDeleteFamilyMember = (e) => {
    var temp_data = dataSource;

    temp_data = temp_data.filter((obj) => obj != e);

    setDataSource(temp_data);
  };

  const handleOk = async () => {
    const fullNameValidation = await Error.NameHandling(familyMember.fullName);
    const birthDateValidation = await Error.NameHandling(
      familyMember.birthDate
    );
    const relationValidation = await Error.SelectItem(familyMember.relation);
    const occupationValidation = await Error.SelectItem(
      familyMember.occupation
    );
    const countryValidation = await Error.NameHandling(familyMember.country);

    if (
      fullNameValidation.status &&
      birthDateValidation.status &&
      relationValidation.status &&
      occupationValidation.status &&
      countryValidation.status
    ) {
      setDataSource([...dataSource, familyMember]);
      setFamilyMember({
        fullName: "",
        birthDate: "",
        relation: "",
        occupation: "",
        country: "",
      });
      setOpenFamilyModal(false);
    } else {
      SetFormError({
        fullName: fullNameValidation,
        birthDate: birthDateValidation,
        relation: relationValidation,
        occupation: occupationValidation,
        country: countryValidation,
      });
    }
  };

  useEffect(() => {
    SetFormError({
      fullName: {
        status: true,
        massage: "",
      },
      birthDate: {
        status: true,
        massage: "",
      },
      relation: {
        status: true,
        massage: "",
      },
      occupation: {
        status: true,
        massage: "",
      },
      country: {
        status: true,
        massage: "",
      },
    });
  }, [openFamilyModal]);

  function showConfirm() {
    confirm({
      title: "Do you want add another family member?!",
      content:
        familyMember.fullName +
        " as your " +
        familyMember.relation +
        " added successfully, if you want another member click Ok else click Cancel",
      onOk() {
        var temp = dataSource;
        temp.push(familyMember);
        setDataSource(temp);
        setFamilyMember({
          fullName: "",
          birthDate: "",
          relation: "",
          occupation: "",
          country: "",
        });
        setStage(2);
      },
      onCancel() {
        handleDoneStage();
      },
    });
  }

  const handleNextStage2 = () => {
    handleDoneStage();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Occupation",
      dataIndex: "occupation",
      key: "occupation",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Relation",
      dataIndex: "relation",
      key: "relation",
    },
    {
      title: "Action",
      render: (_, record) => {
        return (
          <>
            <span
              style={{
                cursor: "pointer",
                color: "red",
              }}
              onClick={() => {
                handleDeleteFamilyMember(record);
              }}
            >
              Delete
            </span>
          </>
        );
      },
    },
  ];
  return (
    <React.Fragment>
      <div className="dashboard-container">
        <div className="pageBody wizard-page">
          <div className="page-header">
            <div className="title pageHeader">
              <div className="bookcLogo"></div>
            </div>
            <span className="appointmentStep" style={{ fontWeight: "bold" }}>
              POC Payments & Insurance
            </span>
            <span
              className="appointmentStep"
              style={{ fontSize: "10px", color: "#ccc" }}
            >
              {stage == 1 ? "Answer the questions" : "Add family member"}
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Steps
              size="small"
              current={2}
              style={{ paddingLeft: "30px", paddingRight: "30px" }}
            >
              <Step title="" />
              <Step title="" />
              <Step title="" />
            </Steps>
          </div>

          <div style={{ marginLeft: "15px", marginRight: "15px" }}>
            <div className="body">
              <div className="stepCards">
                <div className="decorLine financeflow_mt15"></div>
                <div className="body">
                  {stage == 1 ? (
                    <div className="stepCards">
                      <Card style={{ marginBottom: "25px" }}>
                        <div 
                          style={{ display: "block" }}
                        >
                          <React.Fragment>
                            <p style={{ marginTop: "15px" }}>
                              What is your occupation?
                            </p>
                            <Input
                              placeholder="Occupation"
                              onChange={(e, value) => {
                                console.log(e);
                                setUserInput({
                                  ...userInput,
                                  occupation: e.target.value,
                                });
                              }}
                              value={
                                userInput.occupation
                                  ? userInput.occupation
                                  : undefined
                              }
                            />

                            <p style={{ marginTop: "15px" }}>
                              Is the Policyholder to be insured under this
                              policy?
                            </p>
                            <Select
                              placeholder="Select a option"
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                option.props.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              value={
                                userInput.Policyholder
                                  ? userInput.Policyholder
                                  : undefined
                              }
                              onChange={(e) => {
                                setUserInput({
                                  ...userInput,
                                  Policyholder: e,
                                });
                              }}
                              style={{ width: "100%" }}
                            >
                              <Option value="yes">Yes</Option>
                              <Option value="no">No</Option>
                            </Select>
                            <p style={{ marginTop: "15px" }}>
                              During the last 5 years, have you had any
                              treatment in hospital or stayed in a nursing home,
                              consulted a doctor, medical practitioner or
                              specialist, or suffered from an illness which
                              keeps returning?
                            </p>
                            <Select
                              placeholder="Select a option"
                              optionFilterProp="children"
                              //onChange={onChange}
                              //onFocus={onFocus}
                              //onBlur={onBlur}
                              //onSearch={onSearch}
                              filterOption={(input, option) =>
                                option.props.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              //onChange={handleChange}
                              style={{ width: "100%" }}
                            >
                              <Option value="yes">Yes</Option>
                              <Option value="no">No</Option>
                            </Select>
                            <p style={{ marginTop: "15px" }}>
                              Do you have any treatment, consultations,
                              investigations, diagnostic tests or check-ups,
                              planned or pending?
                            </p>
                            <Select
                              placeholder="Select a option"
                              optionFilterProp="children"
                              //onChange={onChange}
                              //onFocus={onFocus}
                              //onBlur={onBlur}
                              //onSearch={onSearch}
                              filterOption={(input, option) =>
                                option.props.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              //onChange={handleChange}
                              style={{ width: "100%" }}
                            >
                              <Option value="yes">Yes</Option>
                              <Option value="no">No</Option>
                            </Select>
                            <p style={{ marginTop: "15px" }}>
                              Have you had any medical condition, or health
                              problem, whether or not a doctor has been
                              consulted during the last 5 years?
                            </p>
                            <Select
                              placeholder="Select a option"
                              optionFilterProp="children"
                              //onChange={onChange}
                              //onFocus={onFocus}
                              //onBlur={onBlur}
                              //onSearch={onSearch}
                              filterOption={(input, option) =>
                                option.props.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              //onChange={handleChange}
                              style={{ width: "100%" }}
                            >
                              <Option value="yes">Yes</Option>
                              <Option value="no">No</Option>
                            </Select>
                            <p style={{ marginTop: "15px" }}>
                              {" "}
                              Are you adding additional family member to this
                              policy?
                            </p>
                            <Select
                              filterOption={(input, option) =>
                                option.props.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              size={"middle"}
                              placeholder="Please select"
                              value={
                                userInput.familyMember
                                  ? userInput.familyMember
                                  : undefined
                              }
                              onChange={(e) => {
                                console.log(e);
                                setUserInput({
                                  ...userInput,
                                  familyMember: e,
                                });
                                if (e == "yes") setAddFamilyBool(true);
                              }}
                              style={{ width: "100%" }}
                            >
                              <Option value="yes">Yes</Option>
                              <Option value="no">No</Option>
                            </Select>
                          </React.Fragment>
                        </div>
                      </Card>
                      <button className="backBtn" onClick={handleBackStage1}>
                        Back
                      </button>
                      <div>
                        <button
                          className="stepBtn"
                          style={{ width: "100px" }}
                          onClick={loading ? "" : handleNextStage1}
                        >
                          {loading ? "Next..." : "Next"}
                        </button>
                      </div>
                    </div>
                  ) : stage == 2 ? (
                    <div className="stepCards" style={{ width: "100%" }}>
                      <Card
                        style={{
                          marginBottom: "25px",
                           minHeight: "400px",
                        }}
                      >
                        <div 
                          style={{ display: "block" }}
                        >
                          <React.Fragment>
                            <Modal
                              visible={openFamilyModal}
                              title="Family member information"
                              okText="Add"
                              cancelText="Close"
                              onOk={handleOk}
                              onCancel={() => {
                                setOpenFamilyModal(false);
                              }}
                            >
                              <p
                                onClick={() => {
                                  console.log(formError);
                                }}
                              >
                                Full Name
                              </p>
                              <Input
                                className={
                                  formError.fullName.status
                                    ? "inputs"
                                    : "inputs-error"
                                }
                                value={
                                  familyMember.fullName
                                    ? familyMember.fullName
                                    : undefined
                                }
                                onChange={(e) => {
                                  setFamilyMember({
                                    ...familyMember,
                                    fullName: e.target.value,
                                  });
                                }}
                                placeholder="Full Name"
                              />
                              {!formError.fullName.status && (
                                <div className="error-text">
                                  {formError.fullName.massage}
                                </div>
                              )}
                              <p style={{ marginTop: "15px" }}>
                                Relationship to policyholder
                              </p>
                              <Select
                                className={
                                  formError.relation.status
                                    ? "inputs"
                                    : "inputs-error"
                                }
                                placeholder="Relation"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                  option.props.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                                }
                                onChange={(e) => {
                                  console.log(e);
                                  setFamilyMember({
                                    ...familyMember,
                                    relation: e,
                                  });
                                }}
                                value={
                                  familyMember.relation
                                    ? familyMember.relation
                                    : undefined
                                }
                                style={{ width: "100%" }}
                              >
                                <Option value="Partner">Partner</Option>
                                <Option value="Child">Child</Option>
                                <Option value="Mother">Mother</Option>
                                <Option value="Father">Father</Option>
                                <Option value="Sister">Sister</Option>
                                <Option value="Brother">Brother</Option>
                                <Option value="Friend">Friend</Option>
                                <Option value="Other">Other</Option>
                              </Select>
                              {!formError.relation.status && (
                                <div className="error-text">
                                  {formError.relation.massage}
                                </div>
                              )}
                              <p style={{ marginTop: "15px" }}>
                                What is your occupation?
                              </p>
                              <Input
                                onChange={(e) => {
                                  console.log(e);
                                  setFamilyMember({
                                    ...familyMember,
                                    occupation: e.target.value,
                                  });
                                }}
                                className={
                                  formError.occupation.status
                                    ? "inputs"
                                    : "inputs-error"
                                }
                                value={
                                  familyMember.occupation
                                    ? familyMember.occupation
                                    : undefined
                                }
                                placeholder="Occupation"
                              />
                              {!formError.occupation.status && (
                                <div className="error-text">
                                  {formError.occupation.massage}
                                </div>
                              )}
                              <p style={{ marginTop: "15px" }}>
                                Country of Residence
                              </p>
                              <Select
                                showSearch
                                placeholder="Select a country"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                  option.props.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                                }
                                className={
                                  formError.country.status
                                    ? "inputs"
                                    : "inputs-error"
                                }
                                onChange={(e) => {
                                  setFamilyMember({
                                    ...familyMember,
                                    country: e,
                                  });
                                }}
                                value={
                                  familyMember.country
                                    ? familyMember.country
                                    : undefined
                                }
                                style={{ width: "100%" }}
                              >
                                <Option value="Canada">Canada</Option>
                                <Option value="United state of America">
                                  United state of America
                                </Option>
                                <Option value="Mexico">Mexico</Option>
                                <Option value="Japan">Japan</Option>
                              </Select>
                              {!formError.occupation.status && (
                                <div className="error-text">
                                  {formError.country.massage}
                                </div>
                              )}
                              <p style={{ marginTop: "15px" }}>Date of Birth</p>
                              <DatePicker
                                className={
                                  formError.birthDate.status
                                    ? "inputs"
                                    : "inputs-error"
                                }
                                value={familyMember.birthDate}
                                onChange={(e, value) => {
                                  setFamilyMember({
                                    ...familyMember,
                                    birthDate: e,
                                  });
                                }}
                                size="small"
                              />
                              {!formError.birthDate.status && (
                                <div className="error-text">
                                  {formError.birthDate.massage}
                                </div>
                              )}
                            </Modal>
                            <Row
                              type="flex"
                              justify="space-between"
                              style={{ alignItems: "baseline" }}
                            >
                              <h5 style={{ marginTop: "15px" }}>
                                Family Members
                              </h5>
                              <button
                                className="stepBtn"
                                style={{ marginLeft: "15px", width: "100px" }}
                                onClick={loading ? "" : handleAddFamilyMember}
                              >
                                {loading ? "..." : "Add"}
                              </button>
                            </Row>
                            <Table
                              columns={columns}
                              dataSource={dataSource}
                              style={{ marginTop: "15px" }}
                              pagination={false}
                            />
                          </React.Fragment>
                        </div>
                      </Card>
                      <button className="backBtn" onClick={handleBackStage2}>
                        Back
                      </button>
                      <div>
                        <button
                          className="stepBtn"
                          style={{ marginLeft: "15px", width: "100px" }}
                          onClick={loading ? "" : handleNextStage2}
                        >
                          {loading ? "Next..." : "Next"}
                        </button>
                      </div>
                    </div>
                  ) : stage == 3 ? (
                    <div className="stepCards">
                      <Card style={{ marginBottom: "25px"  }}>
                        <div 
                          style={{ display: "block" }}
                        >
                          <React.Fragment></React.Fragment>
                        </div>
                      </Card>
                      <button className="backBtn" onClick={handleBackStage3}>
                        Back
                      </button>

                      <button
                        className="stepBtn"
                        style={{ width: "100px" }}
                        onClick={loading ? "" : handleNextStage3}
                      >
                        {loading ? "..." : "Add"}
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Questions;
