import {
  Button,
  Calendar,
  Col,
  Row,
  Select,
  Spin,
  notification
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Controller } from "../Controller/Controller";
import "../calendar.css";
import RegistrationForm from "./RegistrationForm";
import SelectProviderCard from "./SelectProviderCard";
const { Option } = Select;

const disabledDate = (current) => {
  return current && current < moment().startOf("day");
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const ProviderMembershipPart = (props) => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [providers, setProviders] = useState([]);
  const [loadingProvider, setLoadingProvider] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedProviderTime, setSelectedProviderTime] = useState("");
  const [selectedDate, setSelectedDate] = useState();
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [bookingStep, setBookingStep] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const [providersToDisplay, setProvidersToDisplay] = useState([]);
  const itemsPerPage = 2;
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  //const providersToDisplay = props.provider.slice(startIndex, endIndex);

  useEffect(() => {
    if (providers && providers.slice(0, 2)) {
      setCurrentPage(1);
      const startIndex = (1 - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setProvidersToDisplay(providers.slice(startIndex, endIndex));
    }
  }, [providers]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    if (providers && providers.slice(startIndex, endIndex)) {
      setProvidersToDisplay(providers.slice(startIndex, endIndex));
    }
  }, [currentPage]);

  const [showFirstHalf, setShowFirstHalf] = useState(true);
  const [currentView, setCurrentView] = useState({
    month: moment().format("MM"),
    year: moment().year(),
  });

  const handleSwitchChange = (checked) => {
    setShowFirstHalf(checked);
  };

  const dateCellRender = (value) => {
    const dayOfMonth = value.date();
    const isSelectedDay =
      selectedDate &&
      selectedDate.format("DD/MM/YYYY") == value.format("DD/MM/YYYY");
    const isDisabled = value && value < moment().startOf("day");

    const isToday = moment(new Date()).format("DD") == value.format("DD");
    if (value.format("MM") !== currentView.month) {
      return null;
    }

    if (showFirstHalf) {
      if (dayOfMonth <= 15) {
        return (
          <div
            style={
              isSelectedDay || isToday
                ? {}
                : {
                  paddingInlineEnd: "12px",
                  paddingBottom: "20px",
                  paddingTop: "20px",
                }
            }
            className={
              isSelectedDay && !isDisabled
                ? "selected calander-hover"
                : isToday && !isDisabled
                  ? "today calander-hover"
                  : "calander-hover"
            }
          >
            {dayOfMonth}
          </div>
        );
      }
    } else {
      if (dayOfMonth >= 15) {
        return (
          <div
            style={
              isSelectedDay || isToday
                ? {}
                : {
                  paddingInlineEnd: "12px",
                  paddingBottom: "20px",
                  paddingTop: "20px",
                }
            }
            className={
              isSelectedDay && !isDisabled
                ? "selected calander-hover"
                : isToday && !isDisabled
                  ? "today calander-hover"
                  : "calander-hover"
            }
          >
            {dayOfMonth}
          </div>
        );
      }
    }

    return null;
  };

  // function onPanelChange(value, mode) {
  //   // Update the state when the panel changes to a different month or year
  //   setCurrentView({
  //     month: value.month(),
  //     year: value.year()
  //   });
  //   console.log(value.format('MMMM YYYY'), mode);
  // }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const openNotification = (placement, message, status) => {
    if (status && status.toLowerCase().search("success") != -1) {
      notification.success({
        message: status,
        description: message,
        placement,
      });
    } else if (status && status.toLowerCase().search("error") != -1) {
      notification.error({
        message: status,
        description: message,
        placement,
      });
    } else {
      notification.info({
        message: status,
        description: message,
        placement,
      });
    }
  };

  const onSubmitRegistrationStep = async () => {
    const response = await Controller.set_appointment(
      window.location.href.split("/")[
      window.location.href.split("/").length - 1
      ],
      selectedAppointment,
      selectedProviderTime,
      selectedDate,
      selectedProvider,
      JSON.parse(localStorage.getItem("booking-step-four-clinic")).id,
      "",
      "myself"
    );
    if (response.status < 250) {
      openNotification(
        "bottom",
        response.message
          ? response.message
          : "Your appointment date has been successfully registered",
        "Successful"
      );
      setBookingStep(3);
    }
  };

  const handleNextStep = async () => {
    setBookingStep(2);
  };

  const backToStep1 = () => {
    setBookingStep(1);
    setProviders([]);
  };

  const handleCheckProvider = (e) => {
    setSelectedProvider(e.provider_id);
    setSelectedProviderTime(e.date_time);
  };
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onPanelChange = (value, mode) => {
    setCurrentView({
      month: value.format("MM"),
      year: value.format("YYYY"),
    });
    setSelectedProvider("");
    setProviders([]);
    setSelectedDate(value);
  };

  const getAppointmentType = async () => {
    setSelectedProvider("");
    const response = await Controller.getListofAppointment(
      window.location.href.split("/")[
      window.location.href.split("/").length - 1
      ]
    );
    if (response && response.length > 0 && response[0] && response[0].id) {
      setSelectedAppointment(response[0].id);
    }
    setAppointments(response);
  };

  const handleSelectAppointment = (e) => {
    setSelectedProvider("");
    setSelectedAppointment(e);
  };

  useEffect(() => {
    getAppointmentType();
  }, []);

  const getProviderList = async () => {
    setLoadingProvider(true);
    const data = {
      appointment_type: selectedAppointment,
      date: selectedDate,
      office_id: window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ],
    };

    const response = await Controller.getProviderList(data);
    if (response.status < 250) setProviders(response.json.response);

    setLoadingProvider(false);
  };

  useEffect(() => {
    getProviderList();
  }, [selectedAppointment]);

  useEffect(() => {
    getProviderList();
  }, [selectedDate]);

  return (
    <div>

      <Col span={24} className="mt5p">
        <div style={{ background: "#FFF" }}>
          <Row style={{ background: "#FFF" }} className="mb5p" type="flex" justify="space-between">
            <div
              className="profile-clinic-section-title"
              style={{ background: "#FFF", paddingTop: "5px" }}
            >
              Appointment for

            </div>
            <Select
              filterOption={(input, option) => option.props.children}
              mode="single"
              style={{ background: "white" }}
              onChange={handleSelectAppointment}
              className="select-filter"
              defaultActiveFirstOption={true}
              value={selectedAppointment ? selectedAppointment : ""}
              placeholder="Select Appointment"
            >
              {appointments &&
                appointments.length > 0 &&
                appointments.map((item) => (
                  <Option value={item.id} key={item.id}>
                    {item.service}
                  </Option>
                ))}
            </Select>
          </Row>

          <div className="">
            {bookingStep == 1 ? (
              <div className="">
                <div>
                  <div>
                    <div className="clanader-weeks-holderS">
                      <span
                        style={{ color: showFirstHalf ? "black" : "#aaa" }}
                        className="cal-1to14"
                        onClick={() => {
                          handleSwitchChange(true);
                        }}
                      >
                        1 - 14
                      </span>
                      <span
                        style={{ color: !showFirstHalf ? "black" : "#aaa" }}
                        className="cal-15to30"
                        onClick={() => {
                          handleSwitchChange(false);
                        }}
                      >
                        15 - 30
                      </span>
                    </div>
                    <div className="x1-cal mb5p">
                      <Calendar
                        // cellRender ={dateCellRender}
                        fullCellRender={dateCellRender}
                        // fullscreen={false}
                        // value={selectedDate}
                        onPanelChange={onPanelChange}
                        disabledDate={disabledDate}
                        onSelect={onPanelChange}
                        mode="month"
                      />
                    </div>

                  </div>


                </div>
                <div className="mt30N">
                  {loadingProvider ? (
                    <Row type={"flex"} justify="center" className="mt-5">
                      <Spin />
                    </Row>
                  ) : providers && providers.length > 0 ? (
                    <>
                      <div style={{ overflow: "auto", maxHeight: "210px", width: "100%" }} id="custom-scrollbar">
                        {providers.map((item) => (
                          <SelectProviderCard
                            provider={item}
                            handleCheckProvider={handleCheckProvider}
                            checkTime={selectedProviderTime}
                            check={selectedProvider}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <Row type={"flex"} justify="center" className="mt-5">
                      There are no providers for this day!!
                    </Row>
                  )}
                </div>
                <Row type="flex" justify="center" className="mt-2">
                  {providers && providers.length > 0 && (
                    <button
                      onClick={handleNextStep}
                      disabled={selectedProvider ? false : true}
                      className="book-clinic-button mt5p"
                    >
                      Next
                    </button>
                  )}
                </Row>
              </div>
            ) : bookingStep == 2 ? (
              <div className="card-membership">
                <RegistrationForm
                  backToStep1={backToStep1}
                  providerID={selectedProvider}
                  onSubmitRegistrationStep={onSubmitRegistrationStep}
                />
              </div>
            ) : bookingStep == 3 ? (
              <div className="card-membership">
                <Row type="flex" justify="center">
                  <h3>Thank you!</h3>
                  <div className="success-message-appointment">
                    Your dental appointment information has been sent to your email.
                  </div>
                  <Button className="mt5p" type="primary" key="console" onClick={backToStep1}>
                    Start over
                  </Button>
                </Row>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Col>


    </div>
  );
};

export default ProviderMembershipPart;
