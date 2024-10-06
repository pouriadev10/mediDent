import React from "react";
import PropTypes from "prop-types";
import { Radio, Form, Space } from "antd";
import "../app.local.css";
import "./style.css";
import { appointmentController } from "../../appointmentController";

class DentistRadioGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      services: [],
      updating: false,
    };

    this.get_appointment_types();
  }

  get_appointment_types = async () => {
    this.setState({ updating: true });
    const response = await appointmentController.office_services(
      window.location.href.split("?selectedOffice=")[1]
    );
    this.setState({ services: response, updating: true });
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    this.props.onSelect(event.target.value);
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className="dentist_root">
          <Form
            className="formGroup"
            initialValues={{ gender1: this.state.value }}
            onFinish={this.handleChange}
          >
            <Form.Item name="gender1">
              <Radio.Group
                size="large"
                style={{ padding: 20 }}
                onChange={this.handleChange}
              >
                <Space direction="vertical" className="fs25" align={"start"}>
                  {this.state.services && this.state.services.length > 0 ? (
                    this.state.services.map((service) => (
                      <Radio
                        key={service.id}
                        value={service.id + " " + service.service}
                      >
                        {service.service}
                      </Radio>
                    ))
                  ) : !this.state.updating ? (
                    <div className="dentist_updating">Getting data ...</div>
                  ) : (
                    <div>There isn't any Appointments Type</div>
                  )}
                </Space>
              </Radio.Group>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

DentistRadioGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default DentistRadioGroup;
