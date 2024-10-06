import { Button, Calendar, notification, Card, Spin } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { appointmentController } from "../../appointmentController";
import "./style.css";
import moment from "moment";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
function DentistCard(props) {
  const { classes } = props;
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [appointments, setappointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(moment().format());
  const get_appointment = async () => {
    const response = await appointmentController.get_appointment_times(
      window.location.href.split("?selectedOffice=")[1],
      localStorage.getItem("booking-step-one"),
      localStorage.getItem("booking-step-two"),
      inputValue
    );
    if (response && response.response) {
      setappointments(response.response);
    }
  };
  const onPanelChangeDate = async (date) => {
    setLoading(true);
    if (date < moment()) {
      notification.info({
        message: `Error`,
        description: "please select a future date",
        placement: "bottom",
      });
    }
    setInputValue(moment(date).format());
    const response = await appointmentController.get_appointment_times(
      window.location.href.split("?selectedOffice=")[1],
      localStorage.getItem("booking-step-one"),
      localStorage.getItem("booking-step-two"),
      moment(date).format()
    );
    if (response && response.response) {
      setappointments(response.response);
    }
    setLoading(false);
  };

  useEffect(() => {
    get_appointment();
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log(appointments)

  return (
    <Card
      style={
        window.location.href.search("finance") != -1
          ? { marginBottom: "25px", padding: "25px", width: "100%" }
          : { marginBottom: "25px", padding: "25px" }
      }
      bodyStyle={{ padding: 0 }}
    >
      <div
        style={{
          display: "block",
          alignItems: "start",
          justifyContent: "left",
        }}
      >
        <div className="doctorInfo">
          <span className="text-center fs20"> Select Day</span>
        </div>
        <br />
        <div className="row">
          <div className="site-calendar-demo-card">
            <Calendar fullscreen={false} onSelect={onPanelChangeDate} />
          </div>
          <div className="col">
            {loading ? (
              <div
                style={{
                  marginTop: "50px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Spin spinning style={{ color: "#5d00fe" }} size={"large"} />
              </div>
            ) : (
              <div
                style={
                  windowDimensions.width > 700
                    ? {}
                    : {
                        textAlign: "center",
                        marginTop: "25px",
                        paddingTop: "10px",
                        borderTop: "1px solid #5d00fe",
                      }
                }
              >
                {appointments && appointments.length > 0 ? (
                  appointments.map((appointment, index) => (
                    <div className="cardChoose" style={{ display: "contents" }}>
                      <Button
                        className="times_calnder_appointment_button badgeButton"
                        onClick={() => {
                          props.props.onSubmitStepThree("done");
                          localStorage.setItem(
                            "booking-step-three",
                            appointment.date_time
                          );
                        }}
                      >
                        {appointment.date_time &&
                        appointment.date_time.split("T")[1] &&
                        appointment.date_time.split("T")[1].split("Z")[0]
                          ? appointment.date_time.split("T")[1].split("Z")[0]
                          : appointment.date_time}
                        <span class="badge">
                          {appointment.discount == "0%"
                            ? ""
                            : appointment.discount}
                        </span>
                      </Button>
                    </div>
                  ))
                ) : (
                  <div
                    style={
                      windowDimensions.width > 700
                        ? {
                            marginTop: "50px",
                            display: "flex",
                            justifyContent: "center",
                            color: "gray",
                          }
                        : {
                            marginTop: "20px",
                            display: "flex",
                            justifyContent: "center",
                            color: "gray",
                          }
                    }
                  >
                    There are no availabilities
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div></div>

        <div></div>
      </div>
    </Card>
  );
}

DentistCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default DentistCard;
