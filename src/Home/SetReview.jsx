import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Avatar,
  notification,
  Menu,
  Typography,
  Upload,
  Rate,
  Divider,
  Card,
} from "antd";
import Footer from "./Component/Footer";
import Header from "./Component/Header";
import { controller } from "../controller";
import config from "../config";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const SetReview = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [review, setReview] = useState("");
  const [logoFile, setLogoFile] = useState("");
  const [image, setImage] = useState("");
  const [rate, setRate] = useState(5);
  const [data, setData] = useState({ clinic_logo: "" });
  const [error, setError] = useState({
    rate: "",
    note: "",
    logoFile: "",
  });
  const token =
    window.location.href.split("/").indexOf("set-review") !== -1 &&
      window.location.href.split("/").indexOf("set-review") <
      window.location.href.split("/").length - 1
      ? window.location.href.split("/")[
      window.location.href.split("/").indexOf("set-review") + 1
      ]
      : "";


  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getProviderDetail = async () => {
    const response = await controller.GetProviderDetail(token);
    if (response.status === 401 || response.status === 400) {
      window.location.href = "/#/Home";
    }
    if (response.json) {
      setData(response.json);
    }
  };

  useEffect(() => {
    getProviderDetail();
  }, []);

  const handleSaveReview = async () => {
    setError({ rate: "", note: "", image: "" });
    try {
      const response = await controller.SetReview(token, rate, image, review);
      if (response.status === 401) {
        window.location.href = "/#/Home";
      } else if (response.status === 400) {
        setError({
          note: response.json.note,
          image: response.json.image,
          score: response.json.score,
        });
      } else if (response.status === 201) {
        notification.success({
          message: "Success",
          placement: "Success",
        });
        setTimeout(() => {
          window.location.href = "/#/Home";
        }, 2500);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="main-clinic-profile">
        <div className="container-clinic">
          <Header />
        </div>
        <div>
          <Row
            style={{
              margin: "40px 0px 40px 0px",
            }}
          >
            <Col xs={24} sm={24} md={24} lg={10}>
              <Typography.Text
                style={{
                  color: "black",
                  fontWeight: "600",
                }}
              >
                Thank you for using Smilepass. We'd love to hear from you. Your
                feedback will help us improve how we cater to your needs
              </Typography.Text>
            </Col>
          </Row>
          <React.Fragment>
            <Card
              style={{
                minHeight: "300px",
                border: "none",
                borderRadius: "8px",
              }}
              bodyStyle={{ padding: "28px 40px 28px 40px" }}
            >
              <Row style={{ marginBottom: "24px" }}>
                <Col span={24}>
                  <img
                    src={config.apiGateway.URL + data.clinic_logo}
                    alt="Logo"
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "55px",
                    }}
                  />
                </Col>
              </Row>
              <Row style={{ marginBottom: "24px" }}>
                <Col sm={24} md={8}>
                  <Typography.Text style={{ fontSize: "20px" }}>
                    Clinic :
                    <p style={{ fontSize: "16px" }}>
                      {data && data.clinic_name ? data.clinic_name : ""}
                    </p>
                  </Typography.Text>
                </Col>
                <Col sm={24} md={8}>
                  <Typography.Text style={{ fontSize: "20px" }}>
                    Provider :
                    <p style={{ fontSize: "16px" }}>
                      {data && data.provider_name ? data.clinic_name : ""}
                    </p>
                  </Typography.Text>
                </Col>
                <Col sm={24} md={8}>
                  <Typography.Text style={{ fontSize: "20px" }}>
                    Date :
                    <p style={{ fontSize: "16px" }}>
                      {data && data.appoinetment_date_time
                        ? data.appoinetment_date_time
                        : ""}
                    </p>
                  </Typography.Text>
                </Col>
              </Row>
              <Divider />
              <Row>
                <Col
                  span={24}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Upload
                    showUploadList={false}
                    beforeUpload={(e) => {
                      setLogoFile(URL.createObjectURL(e));
                      setImage(e);
                      return false;
                    }}
                    style={{
                      margin: "0px !important",
                    }}
                    accept="image/*"
                  >
                    {logoFile ? (
                      <img
                        src={logoFile}
                        alt="Logo"
                        style={{
                          width: "64px",
                          height: "64px",
                          borderRadius: "55px",
                          cursor: "pointer",
                          transition: "opacity 0.3s",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.opacity = 0.5;
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.opacity = 1;
                        }}
                      />
                    ) : (
                      <Avatar
                        style={{
                          width: "64px",
                          height: "60px",
                          fontSize: "30px",
                          lineHeight: "60px",
                          cursor: "pointer",
                        }}
                        icon="user"
                        src={logoFile}
                        onMouseEnter={(e) => {
                          e.target.style.opacity = 0.5;
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.opacity = 1;
                        }}
                      ></Avatar>
                    )}
                  </Upload>
                </Col>
              </Row>
              <Row>
                {error.logoFile && (
                  <p style={{ color: "red" }}>{error.logoFile}</p>
                )}
              </Row>
              <Row style={{ marginTop: "20px" }}>
                <Col span={24}>
                  <textarea
                    style={{
                      border: " none",
                      fontSize: "20px",
                      outline: "none",
                      resize: "none",
                      width: "100%",
                      color: "#B7B7B7",
                    }}
                    placeholder="Add Review"
                    rows="9"
                    value={review}
                    onChange={(e) => {
                      setReview(e.target.value);
                    }}
                  ></textarea>
                  <Row>
                    {error.note && <p style={{ color: "red" }}>{error.note}</p>}
                  </Row>
                </Col>
              </Row>
              <Row>
                <Typography.Text
                  style={{
                    fontSize: "20px",
                    fontWeight: "400",
                    color: "#B7B7B7",
                  }}
                >
                  Please rate your provider
                </Typography.Text>
              </Row>
              <Row>
                <Col lg={12} md={24}>
                  <Rate
                    onChange={(e) => {
                      setRate(e);
                    }}
                    style={{ fontSize: 34, marginTop: "10px" }}
                    value={rate}
                  />
                </Col>
                <Col
                  lg={12}
                  md={24}
                  style={{
                    justifyContent: "end",
                    display: "flex",
                    alignItems: "end",
                  }}
                >
                  <Button
                    onClick={handleSaveReview}
                    shape="round"
                    size={"large"}
                    style={{
                      padding: "0 43px",
                      height: "51px",
                      marginTop: "10px",
                    }}
                  >
                    Save Review
                  </Button>
                </Col>
              </Row>
              <Row>
                {error.rate && <p style={{ color: "red" }}>{error.rate}</p>}
              </Row>
            </Card>
          </React.Fragment>
        </div>
      </div>
      <div style={{ marginTop: "80px" }}>
        <Footer />
      </div>
    </div>
  );
};

export default SetReview;
