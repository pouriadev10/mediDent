import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; 
import avatarOne from "../../assets/img/imgpsh_mobile_save.jpg";
import { appointmentController } from "../../appointmentController";
import config from "../../config";
import { notification, Card } from "antd";
import "./style.css";
function DentistCard(props) {
  const [providers, setProviders] = useState([]);
  const [updating, setUpdating] = useState(false);

  const get_provider = async () => {
    setUpdating(true);
    const response = await appointmentController.office_providers(
      window.location.href.split("?selectedOffice=")[1],
      localStorage.getItem("booking-step-one")
    );
    setProviders(response);
    setUpdating(false);
  };

  const openModalHasNotFreeTime = () => {
    notification.info({
      message: `Error`,
      description: "This provider hasn't any time",
      placement: "bottom",
    });
  };

  useEffect(() => {
    get_provider();
  }, []);

  return (
    <div>
      <Card className="dentist_container">
        {providers && providers.length > 0 ? (
          providers.map((provider) => (
            <>
              {provider.has_any_free_time ? (
                <div
                  className="cardChoose dentist_cp"
                  onClick={() => {
                    props.props.onSubmitStepTwo("done");
                    localStorage.setItem("booking-step-two", provider.id);
                    localStorage.setItem(
                      "booking-step-two-provider-info",
                      JSON.stringify(provider)
                    );
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "flex-left",
                    }}
                  >
                    <img
                      alt="Remy Sharp"
                      src={
                        provider.image
                          ? config.apiGateway.URL + provider.image
                          : avatarOne
                      }
                      className="avatar"
                    />
                    <div className="doctorInfo mt10">
                      <span className="doctorName">
                        {provider.specialty == "General Dentist" ? "Dr. " : ""}
                        {provider.name ? provider.name : "-----"}
                      </span>
                      <span className="doctorGrade">
                        {provider.specialty ? provider.specialty : "-----"}{" "}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="cardChoose dentist_cp"
                  onClick={() => {
                    openModalHasNotFreeTime();
                    localStorage.setItem("booking-step-two", provider.id);
                    localStorage.setItem(
                      "booking-step-two-provider-info",
                      JSON.stringify(provider)
                    );
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "flex-left",
                    }}
                  >
                    <img
                      alt="Remy Sharp"
                      src={
                        provider.image
                          ? config.apiGateway.URL + provider.image
                          : avatarOne
                      }
                      className="avatar"
                    />
                    <div className="doctorInfo mt10">
                      <span className="doctorName">
                        {provider.specialty == "General Dentist" ? "Dr. " : ""}
                        {provider.name ? provider.name : "-----"}
                      </span>
                      <span className="doctorGrade">
                        {provider.specialty ? provider.specialty : "-----"}{" "}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </>
          ))
        ) : updating ? (
          <p className="dentist_updating">Getting providers data ...</p>
        ) : (
          <p className="dentist_updating">
            There isn't any provider for this appointment type
          </p>
        )}
      </Card>
    </div>
  );
}

DentistCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default DentistCard;
