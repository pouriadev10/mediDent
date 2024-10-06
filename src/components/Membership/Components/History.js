import React, { useState, useEffect } from "react";
import { Controller } from "../Controller/Controller";
import { Row, Timeline,Col } from "antd";
import "./componentStyle.css";
import { ClockCircleOutlined } from "@ant-design/icons";

const History = (props) => {
  const [items, setItems] = useState([]);

  const getRoadMap = async () => {
    const response = await Controller.GetMembershipHistory(props.selectedSub);

    var temp = [];
    for (var i in response.json) {
      var item = response.json[i];

      var label =
        new Date(item.date).toLocaleDateString() +
        " " +
        new Date(item.date).toLocaleTimeString();

      var changes = {};

      if (item.change_data_for_custom_membership) {
        changes = item.change_data_for_custom_membership;
      } else if (item.change_data_for_predefiend_membership) {
        changes = item.change_data_for_predefiend_membership;
      }

      var children = "";

      if (changes.after_cost != changes.before_cost) {
        children +=
          "cost changed from $" +
          changes.before_cost +
          " to $" +
          changes.after_cost +
          "\n";
        temp.push({
          label: label,
          children:
            "cost changed from $" +
            changes.before_cost +
            " to $" +
            changes.after_cost +
            "\n",
        });
      }

      if (changes.after_description != changes.before_description) {
        children +=
          "Description changed from " +
          changes.before_description +
          " to $" +
          changes.after_description +
          "\n";
        temp.push({
          label: label,
          children:
            "Description changed from " +
            changes.before_description +
            " to $" +
            changes.after_description +
            "\n",
        });
      }

      if (changes.after_interval != changes.before_interval) {
        children +=
          "Description changed from " +
          changes.before_interval +
          " to $" +
          changes.after_interval +
          "\n";
        temp.push({
          label: label,
          children:
            "Description changed from " +
            changes.before_interval +
            " to $" +
            changes.after_interval +
            "\n",
        });
      }

      if (changes.after_name != changes.before_name) {
        children +=
          "Name changed from " +
          changes.before_name +
          " to " +
          changes.after_name +
          "\n";
        temp.push({
          label: label,
          children:
            "Name changed from " +
            changes.before_name +
            " to " +
            changes.after_name +
            "\n",
        });
      }
    }

    setItems(temp);
  };

  useEffect(() => {
    getRoadMap();
  }, []);

  return (
    <React.Fragment>
      <Row direction="column" overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Col span={24}>
          <Timeline mode={"alternate"}>
            {items.map((item) => (
            <Timeline.Item
              dot={
                <ClockCircleOutlined
                  style={{ fontSize: "16px", color: "#A351FF" }}
                />
              }
            >
              <p className="membership_history-label">{item.label}</p>
              <p> {item.children} </p>
            </Timeline.Item>
          ))}
        </Timeline>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default History;
