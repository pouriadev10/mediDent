import React from "react";
import {
  Button,
  Row,
  Col,
  Avatar
} from "antd"

// icon
import notificationIcon from "../assets/icon/notification-top-bar.png"
import userProfile from "../assets/img/user.jpg";
const TopBar = () => {
  return (
    <div className="topbarContainer">
      <Row type="flex" justify={"space-between"} align="middle">
        <Col span={12}>
          <p className="greetingTopBar">Hello!</p>
          <p>You have on upcoming Appointment tomorrow. <span className="detailTopBar">View Details</span> </p>
        </Col>
        <Col span={12}>
          <Row type="flex" justify={"end"} align={"middle"}>
            <Col className="mr5p">
              <img src={notificationIcon} alt="notification" width={40} />
            </Col>
            <Col className="mr5p">
              <div>
                <span className="mr10 usernameText">User Name</span>
                {/* <Avatar size={50} src={userProfile} /> */}
              </div>

            </Col>
            <Col>
              <Button
                className="topbar-button"
              >
                Book Now
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default TopBar;