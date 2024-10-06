import { notification } from "antd";
import Axios from "axios";
import { CloudUploadOutlined} from "@ant-design/icons";
import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { dashboardActions } from "../actions";
import config from "../config";
import { controller } from "../controller";
import { Error } from "../ErrorHandeling";
import DashboardLayout from "../layout/dashboardLayout/DashboardLayout";
import "./app.local.css";

const Config = {
  headers: {
    Authorization: localStorage.getItem("user")
      ? "Token " + JSON.parse(localStorage.getItem("user")).key
      : "",
  },
};

class UploadPdfPage extends Component {
  handleSelectOfficeID = (event) => {
    this.setState({
      selectedOfficeID: event,
    });
  };
  openNotification = (placement, message, status) => {
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
  getData = () => {
    Axios.get(config.apiGateway.URL + `/clinics/selectoffice/`, Config).then(
      (res) => {
        const response = res.data;
        this.setState((prevState) => ({
          office_id: response,
        }));
      }
    );
  };
  constructor(props) {
    super(props);
    this.getData();
    this.getLogo();
    this.onDrop = (files) => {};
    this.state = {
      serverLogo: "",
      office_id: [],
      selectedOfficeID: 0,
      patient_name: "",
      patient_email: "",
      patient_phone: "",
      reason: "",
      appointment_datetime: null,
      amount: null,
      receipt_file: null,
      submitted: false,
      collapsed: false,
      sending_data: false,
      files: [],
      formError: {
        ReceiptFile: {
          massage: "",
          status: true,
        },
      },
    };
    this.getLogo = this.getLogo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.props.dispatch(dashboardActions.fetchProfileSummary());
  }

  getLogo = async () => {
    const response = await controller.getLogo();
    this.setState({ serverLogo: response.data.dark });
  };

  goToDashboard = () => {
    this.props.dispatch(push(`/payment-requests`));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const receipt_file_validation = await Error.UploadFilePDF(
      this.state.receipt_file
    );
    this.setState({
      formError: {
        ReceiptFile: receipt_file_validation,
      },
    });
    if (receipt_file_validation.status) {
      this.setState({ submitted: true });
      this.setState({ sending_data: true });

      const data = {
        office: localStorage.getItem("selectedOffice")
          ? localStorage.getItem("selectedOffice") + ""
          : 0,
        receipt_file: this.state.receipt_file,
      };

      let formData = new FormData();
      formData.append("office", data.office);
      if (data.receipt_file) formData.append("file", data.receipt_file);
      const response = await controller.upload_pdf_file(formData);
      if (response.status > 250) {
        this.openNotification(
          "bottom",
          response.message && response.message.office
            ? response.message.office[0]
            : response.message && response.message.file
            ? response.message.file[0]
            : response.detail
            ? response.detail
            : JSON.stringify(response.message),
          "Error"
        );
      } else {
        this.setState({ receipt_file: "" });
        this.openNotification(
          "bottom",
          response.message,

          "Successful"
        );
      }
      this.setState({ sending_data: false });
    }
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleUpload = (e) => {
    if (e[0] && e[0].name) {
      this.setState({ receipt_file: e[0] });
    } else {
      this.setState({ receipt_file: e.target.files[0] });
    }
  };

  handleDateChange(value, dateString) {
    this.setState({
      ...this.state,
      appointment_datetime: dateString,
    });
  }

  handleMenuClick(e) {
    this.setState({
      ...this.state,
      reason: e.item.props.children[1],
    });
  }

  render() {
    const { creating, error, profileSummary } = this.props;

    const patient_name_error =
      this.state.submitted && error && error.data && error.data.patient_name;
    const patient_phone_error =
      this.state.submitted && error && error.data && error.data.patient_phone;
    const patient_email_error =
      this.state.submitted && error && error.data && error.data.patient_email;
    const datetime_error =
      this.state.submitted &&
      error &&
      error.data &&
      error.data.appointment_datetime;
    const amount_error =
      this.state.submitted && error && error.data && error.data.amount;

    const button_text = this.sending_data ? "Sending ..." : "Send";

    return (
      <DashboardLayout
        breadCrumb={false}
        logo={profileSummary && profileSummary.logo ? profileSummary.logo : ""}
        footerLogo={this.state.serverLogo}
      >
        <div className="page-breadcrumb">
          <button className="breadcrumb-part" onClick={this.goToDashboard}>
            Payment Request
          </button>
          &nbsp;&nbsp;/&nbsp;&nbsp;
          <span className="breadcrumb-part">Upload PDF FILE</span>
        </div>
        <div className="paymentRequestContent">
          <div className="payreq-container">
            <div className="content">
              {this.state.submitted && !creating && error && error.message && (
                <div className="alert">{error.message}</div>
              )}
              <Dropzone
                accept={{
                  "file/pdf": [".pdf"],
                }}
                onDrop={(e) => this.handleUpload(e)}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section className="container">
                    <div {...getRootProps({ className: "dropzone" })}>
                      <input {...getInputProps()} />

                      <label className="formLabel uploadpdf_label">
                        <div className="mr8">
                          <CloudUploadOutlined className="fs25" />
                        </div>

                        <div>Uploading new Invoice PDF file</div>
                        <div className="mb50"></div>
                      </label>
                    </div>
                  </section>
                )}
              </Dropzone>
              {this.state.formError &&
              this.state.formError.ReceiptFile &&
              this.state.formError.ReceiptFile.status ? (
                this.state.receipt_file && this.state.receipt_file.name ? (
                  <p>
                    <span className="fwb">
                      {this.state.receipt_file.name + ""}
                    </span>
                    selected
                  </p>
                ) : (
                  <></>
                )
              ) : (
                <div className="error-text">
                  {this.state.formError.ReceiptFile.massage}
                </div>
              )}

              <div className="btnBox df">
                <button className="whiteBtn " onClick={this.goToDashboard}>
                  Back
                </button>

                <button
                  onClick={this.handleSubmit}
                  className="createBtn"
                  type="submit"
                  disabled={this.state.sending_data}
                >
                  {this.state.sending_data ? "Sending ..." : "Send"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }
}

function mapStateToProps(state) {
  const { creating, error } = state.paymentRequest;
  const { profileSummary } = state.dashboard;
  return {
    creating,
    error,
    profileSummary,
  };
}

const connectedUploadPdfPage = connect(mapStateToProps)(UploadPdfPage);

export default connectedUploadPdfPage;
