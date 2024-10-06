import { Button, Calendar, Spin, Card } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { appointmentController } from "../../../appointmentController";
import "../style.css";
import moment from "moment";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
function DentistCard(props) {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [appointments, setappointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(moment().format());

  const disabledDate = (current) => {
    current = moment(current, "DD-MM-YYYY").subtract(-1, "days");
    const times = current && current < dayjs().endOf("day");

    return times;
  };

  const get_appointment = async () => {
    const response = await appointmentController.get_appointment_times2(
      inputValue
    );
    setappointments(response);
  };

  const onPanelChangeDate = async (date) => {
    setLoading(true);
    setInputValue(moment(date).format());
    const response = await appointmentController.get_appointment_times2(
      moment(date).format()
    );
    setappointments(response.response);

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

  return (
    <>
      <Card
        style={
          window.location.href.search("finance") != -1
            ? { marginBottom: "25px", width: "100%" }
            : { marginBottom: "25px" }
        }
      >
        <div 
          className="financeflow_db"
        >
          <div className="doctorInfo">
            <span className="text-center"> Select Day</span>
          </div>
          <br />
          <div className="row">
            <div className=" site-calendar-demo-card ">
              <Calendar
                disabledDate={disabledDate}
                fullscreen={false}
                onSelect={onPanelChangeDate}
              />
            </div>
            <div className="col">
              {loading ? (
                <div className="financeflow_progresscontainer">
                  <Spin
                    spinning
                    className="financeflow_progress"
                    size={"large"}
                  />
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
                      <div className="cardChoose financeflow_dc">
                        <Button
                          className="times_calnder_appointment_button"
                          onClick={() => {
                            props.submitTime();
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
      <button className="backBtn" onClick={props.handleBackStages}>
        Back
      </button>
    </>
  );
}

DentistCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default DentistCard;
