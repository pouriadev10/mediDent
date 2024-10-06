import React, { Component } from "react";
import DentistRadioGroup from "./DentistRadioGroup";
import { Card } from "antd";

class ChooseDentist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      action: true,
    };
  }

  handleSelectedButton = (value) => {
    let nextVal = value;
    this.setState({ value });
    this.props.onSelect(nextVal);
  };

  render() {
    return (
      <div className="muiCardBody">
        <Card className="dentist_container" bodyStyle={{padding:'0px'}}>
          <DentistRadioGroup onSelect={this.handleSelectedButton} />
        </Card>
      </div>
    );
  }
}

export default ChooseDentist;
