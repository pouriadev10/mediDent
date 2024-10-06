import React, { useEffect, useState } from "react";
import PoweredBy from "../../CommonUi/PoweredBy";
import { Checkbox } from "antd";
import { Card, Steps } from "antd";
import "../style.css";

const { Step } = Steps;

const AcceptTerms = ({ handleDoneStage, handleBackStage }) => {
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
  });

  const [error, setError] = useState({});

  const [checked, setChecked] = useState(false);

  const handleChangeCheckBox = (event) => {
    setChecked(event.target.checked);
  };

  const handleNext = async () => {
    handleDoneStage(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (localStorage.getItem("patient_id")) {
      localStorage.removeItem("patient_id");
    }
  }, []);
  return (
    <>
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
              Accept Terms and Conditions
            </span>
          </div>
          <Steps
            size="small"
            current={1}
            style={{ paddingLeft: "30px", paddingRight: "30px" }}
          >
            <Step title="" />
            <Step title="" />
            <Step title="" />
          </Steps>
          <div style={{ marginLeft: "15px", marginRight: "15px" }}>
            <div className="decorLine" style={{ marginTop: "15px" }}></div>
            <div className="body">
              <div className="stepCards">
                <Card style={{ marginBottom: "25px" }}>
                  <div 
                    style={{ display: "block" }}
                  >
                    <p id="custom-scrollbar" className="scroll-terms-support">
                      Welcome to Smilepass Dental Clinic! We are committed to
                      providing high-quality dental services to our patients. By
                      using our website, you agree to be bound by these terms
                      and conditions. Your use of our website is subject to the
                      following terms and conditions: Use of Website You may use
                      our website for your personal, non-commercial use. You may
                      not use our website for commercial purposes, such as for
                      resale or redistribution of our website's content. Content
                      Our website may contain information that is accurate, but
                      we do not guarantee its completeness or accuracy. We
                      reserve the right to make changes to our website and its
                      content at any time without notice. Disclaimer of
                      Warranties Our website is provided "as is" without any
                      warranty of any kind. We do not guarantee that our website
                      will be error-free, uninterrupted, or free from viruses or
                      other harmful components. Limitation of Liability In no
                      event shall we be liable for any direct, indirect,
                      incidental, special, or consequential damages arising out
                      of or in connection with your use of our website, even if
                      we have been advised of the possibility of such damages.
                      Privacy Policy We take your privacy seriously. Our website
                      uses cookies to enhance your browsing experience and to
                      provide personalized content. You can control the use of
                      cookies by modifying your browser settings. Privacy Policy
                      for Smilepass Dental Clinic Your privacy is important to
                      us. We have developed this privacy policy to explain how
                      we collect, use, and protect your personal information
                      when you use our website. We only collect and use your
                      personal information to provide our services and to
                      improve our website. We do not share your personal
                      information with third parties without your consent. We
                      use your personal information to: Provide you with our
                      services Send you promotional materials and other
                      marketing communications Respond to your inquiries and
                      requests Monitor and analyze website traffic and usage
                      patterns We do not sell or rent your personal information
                      to third parties. Your rights: You have the right to
                      access your personal information that we have collected or
                      processed. You can also request that we correct, amend, or
                      delete your personal information. You have the right to
                      opt-out of receiving marketing communications from us at
                      any time. You have the right to lodge a complaint with the
                      appropriate regulatory body in your jurisdiction. Changes
                      to this Policy: We may update this privacy policy from
                      time to time. We will notify you of any changes by posting
                      the new privacy policy on our website. If you have any
                      questions or concerns about our privacy policy, please
                      contact us. Sincerely,
                      <br />
                      <br />
                      <br />
                    </p>
                    <Checkbox checked={checked} onChange={handleChangeCheckBox}>
                      I accept terms and conditions and privacy policy
                    </Checkbox>
                  </div>
                </Card>
                <button className="backBtn" onClick={handleBackStage}>
                  Back
                </button>

                <button
                  className="stepBtn"
                  style={{ width: "100px" }}
                  onClick={loading ? "" : handleNext}
                  disabled={!checked}
                >
                  {loading ? "Next..." : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PoweredBy />
    </>
  );
};

export default AcceptTerms;
