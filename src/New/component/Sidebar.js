import {
  MenuOutlined
} from "@ant-design/icons";
import { Layout, Menu, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { push } from "react-router-redux";
// import logoDashboard from "../../assets/img/logo-new-dashboard.png";
import logoDashboard from '../assets/img/Color_logo_-_no_bg_2_new 2.png'
import underLogoDashboard from "../../assets/img/under-logo-new-dashboard.png";
import { controller } from "../../controller";

// side bar icons
import insuranceIcon from "../assets/icon/brifecase-tick.png";
import appointmentIcon from "../assets/icon/calendar.png";
// import billingIcon from "../assets/icon/cards.png";
import vrcounsultIcon from "../assets/icon/gallery.png";
import rewardIcon from "../assets/icon/gift.png";
import homeIcon from "../assets/icon/house.png";
import oralIcon from "../assets/icon/receipt-text.png";
import taskIcon from "../assets/icon/task-square.png";
import payIcon from "../assets/icon/ticket.png";
import shop from "../assets/icon/shop2.png";


import insuranceIcon1 from "../assets/icon/brifecase-tick1.png";
import appointmentIcon1 from "../assets/icon/calendar1.png";
// import billingIcon1 from "../assets/icon/";
import vrcounsultIcon1 from "../assets/icon/gallery1.png";
import rewardIcon1 from "../assets/icon/gift1.png";
import homeIcon1 from "../assets/icon/house1.png";
import oralIcon1 from "../assets/icon/receipt-text1.png";
import taskIcon1 from "../assets/icon/task-square1.png";
import payIcon1 from "../assets/icon/ticket1.png";
import shop1 from "../assets/icon/shop1.png";




import BotImg from "../assets/icon/BotImg.png";
import questionMarkBadge from "../assets/icon/questionMarkBadge.png";
const { SubMenu } = Menu;
const { Sider } = Layout;
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function Sidebar({ props, dispatch, reloadSidebar }) {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null); // State to track the selected menu item
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [collapsed, setcollapsed] = useState();
  const [officeProfile, setofficeProfile] = useState(
    localStorage.getItem("smilepassLogo")
      ? JSON.parse(localStorage.getItem("smilepassLogo")).data
      : []
  );
  const [isPracticeAdmin, setIsPracticeAdmin] = useState(false);
  const [displaySidebar, setdisplaySidebar] = useState("none");
  const [default_hover, setdefault_hover] = useState(
    window.location.href.search("new/home") != -1
      ? "0"
      : window.location.href.search("new/oral-health") != -1
        ? "2"
        : window.location.href.search("new/treatment-plan") != -1
          ? "1"
          : window.location.href.search("add-provider") != -1
            ? "3"
            : window.location.href.search("provider-scheduling") != -1
              ? "5"
              : window.location.href.search("appointments") != -1
                ? "6"
                : window.location.href.search("members") != -1
                  ? "60"
                  : window.location.href.search("plans-management") != -1
                    ? "72"
                    : window.location.href.search("plan") != -1
                      ? "70"
                      : window.location.href.search("visit") != -1
                        ? "80"
                        : window.location.href.search("ar") != -1
                          ? "9"
                          : window.location.href.search("transactions") != -1
                            ? "141"
                            : window.location.href.search("add-connected-account") != -1
                              ? "4"
                              : window.location.href.search("Services-management") != -1
                                ? "71"
                                : window.location.href.search("failed-payments") != -1
                                  ? "142"
                                  : window.location.href.search("discount-options") != -1
                                    ? "143"
                                    : window.location.href.search("office/profile") != -1
                                      ? "8"
                                      : window.location.href.search("office/review") != -1
                                        ? "12"
                                        : window.location.href.search("data/health-categories") != -1
                                          ? "30"
                                          : window.location.href.search("data/procedures") != -1
                                            ? "31"

                                            : window.location.href.search("offices") != -1
                                              ? "132"
                                              : "1"
  );

  const [openSubMenus, setOpenSubMenus] = useState([""]);
  useEffect(() => {
    if (window.location.href.search("dashboard") != -1) {
      setOpenSubMenus([]);
    } else if (
      window.location.href.search("members") != -1 ||
      window.location.href.search("plans") != -1 ||

      window.location.href.search("visit") != -1
    ) {
      setOpenSubMenus(["sub1"]);
    } else if (
      window.location.href.search("appointments") != -1 && window.location.href.search("office/appointments") == -1 ||
      window.location.href.search("add-provider") != -1 ||
      window.location.href.search("discount-options") != -1 ||
      window.location.href.search("provider-scheduling") != -1
    ) {
      setOpenSubMenus(["sub3"]);
    } else if (
      window.location.href.search("add-connected-account") != -1 ||
      window.location.href.search("officesprovider") != -1 ||
      window.location.href.search("offices") != -1
    ) {
      setOpenSubMenus(["sub4"]);
    }
    else if (
      window.location.href.search("office/review") != -1 ||
      window.location.href.search("office/profile") != -1 ||
      window.location.href.search("Services") != -1 ||
      window.location.href.search("office/appointments") != -1
    ) {
      setOpenSubMenus(["sub5"]);
    }
    else if (
      window.location.href.search("data/health-categories") != -1 ||
      window.location.href.search("data/procedures") != -1

    ) {
      setOpenSubMenus(["sub5-data"]);
    }
    else {
      setOpenSubMenus(["sub2"]);
    }
  }, []);
  const handleOpenChange = (value) => {
    setOpenSubMenus(value);
  };
 

  useEffect(() => {
    getLogo();
    

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
      if (getWindowDimensions().width >= 600) {
        setdisplaySidebar("none");
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getLogo = async () => {
    const response = await controller.getLogo();
    setofficeProfile(response.data);
  };

  const onCollapse = (collapsed) => {
    setOpenSubMenus([]);
    setcollapsed(collapsed);
    localStorage.setItem("collapsed", collapsed);
  };

  return (
    <div className="sidebar_container">
      <div className="iconMenuSideBae">
        <MenuOutlined
          onClick={() => {
            setdisplaySidebar("absolute");
          }}
          style={
            windowDimensions
              ? windowDimensions.width > "600"
                ? { display: "none" }
                : windowDimensions.width > "450"
                  ? { fontSize: "22px", color: "#7A08FA" }
                  : { fontSize: "15px", color: "#7A08FA" }
              : { display: "none" }
          }
        />
      </div>
      <Sider
        trigger={null}
        collapsed={false}
        collapsible
        //collapsed={collapsed}
        onCollapse={onCollapse}
        className="collapsedMenu"
        width={230}
      >
        <div className="logoMenu p0">
          {!collapsed ? (
            <div>
              <img
                src={logoDashboard}
                alt="smilepass"
                className="smpassLogo"
              />
              <img
                src={underLogoDashboard}
                alt="smilepass"
                className="smpassUnderLogo"
              />

            </div>

          ) : (
            <></>
          )}
        </div>

        <Menu
          className="collapsedMenu"
          defaultSelectedKeys={[default_hover]}
          mode="inline"
          openKeys={openSubMenus}
          onOpenChange={handleOpenChange}
          theme="dark"
        >
          <Menu.Item
            className="sidebar_menuitem"
            key="0"
            onClick={() => dispatch(push(`/new/home`))}
          >
            {/* <img src={homeIcon} alt="Home" className="siderIcon" /> */}
            <img
              src={default_hover === "0" ? homeIcon1 : homeIcon}
              alt="Home"
              className="siderIcon"
            />
            <span className="font-16">Home</span>
          </Menu.Item>
          <Menu.Item
            className="sidebar_menuitem"
            key="1"
            onClick={() => dispatch(push(`/new/treatment-plan`))}
          >
            {/* <img src={taskIcon} alt="Treatment" className="siderIcon" /> */}
            <img
              src={default_hover === "1" ? taskIcon1 : taskIcon}
              alt="Home"
              className="siderIcon"
            />
            <span className="font-16">Treatment plans</span>
          </Menu.Item>
          <Menu.Item
            className="sidebar_menuitem"
            key="2"
            onClick={() => dispatch(push(`/new/oral-health`))}
          >
            {/* <img src={oralIcon} alt="Oral Health" className="siderIcon" /> */}
            <img
              src={default_hover === "2" ? oralIcon1 : oralIcon}
              alt="Home"
              className="siderIcon"
            />
            <span className="font-16">Oral Health Report</span>
          </Menu.Item>
          <Menu.Item
            className="sidebar_menuitem"
            key="3"
            onClick={() => dispatch(push(`/new/home`))}
          >
            {/* <img src={appointmentIcon} alt="Appointments" className="siderIcon" /> */}
            <img
              src={default_hover === "3" ? appointmentIcon1 : appointmentIcon}
              alt="Home"
              className="siderIcon"
            />
            <span className="font-16">Appointments</span>
          </Menu.Item>
          <Menu.Item
            className="sidebar_menuitem"
            key="9"
            onClick={() => dispatch(push(`/new/home`))}
          >
            {/* <img src={payIcon} alt="Payments" className="siderIcon" /> */}
            <img
              src={default_hover === "4" ? payIcon1 : payIcon}
              alt="Home"
              className="siderIcon"
            />
            <span className="font-16">Payments</span>
          </Menu.Item>
          {/* <Menu.Item
            className="sidebar_menuitem"
            key="4"
            onClick={() => dispatch(push(`/new/home`))}
          >
            <img src={billingIcon} alt="Billing Information" className="siderIcon" />
            <span className="font-16">Billing Information</span>
          </Menu.Item> */}
          <Menu.Item
            className="sidebar_menuitem"
            key="5"
            onClick={() => dispatch(push(`/new/home`))}
          >
            {/* <img src={insuranceIcon} alt="Insurance" className="siderIcon" /> */}
            <img
              src={default_hover === "6" ? insuranceIcon1 : insuranceIcon}
              alt="Home"
              className="siderIcon"
            />
            <span className="font-16">Insurance</span>
          </Menu.Item>
          <Menu.Item
            className="sidebar_menuitem"
            key="7"
            onClick={() => dispatch(push(`/new/home`))}
          >
            {/* <img src={rewardIcon} alt="Rewards" className="siderIcon" /> */}
            <img
              src={default_hover === "7" ? rewardIcon1 : rewardIcon}
              alt="Home"
              className="siderIcon"
            />
            <span className="font-16">Rewards</span>
          </Menu.Item>
          <Menu.Item
            className="sidebar_menuitem"
            key="8"
            onClick={() => dispatch(push(`/new/home`))}
          >
            {/* <img src={vrcounsultIcon} alt="Virtual Consult" className="siderIcon" /> */}
            <img
              src={default_hover === "8" ? vrcounsultIcon1 : vrcounsultIcon}
              alt="Home"
              className="siderIcon"
            />
            <span className="font-16">Virtual Consult</span>
          </Menu.Item>
          <Menu.Item
            className="sidebar_menuitem"
            key="9"
            onClick={() => dispatch(push(`/new/home`))}
          >
            <img
              src={default_hover === "9" ? shop1 : shop}
              alt="Home"
              className="siderIcon"
            />
            <span className="font-16">Online Health Store</span>
          </Menu.Item>
        </Menu>
        <div className="badgeSideWrapper">
          <div className="badgeSideContainer">
            <Row justify={"space-between"}>
              <img src={questionMarkBadge} alt="question" width={35} height={35} />
              <img src={BotImg} alt="question" width={40} height={40} />
            </Row>
            <Row>
              <span className="textBold">Need help?</span>

              <span>Please check our docs</span>
            </Row>
            <Row>
              <div className="docButton">
                DOCUMENTATION
              </div>
            </Row>
          </div>
        </div>

      </Sider>
      <Modal
        open={displaySidebar == "none" ? false : true}
        onCancel={() => {
          setdisplaySidebar("none");
        }}
        className="sidebar_modal"
      ></Modal>
    </div>
  );
}

function mapStateToProps(state) {
  const { sendingLoginEmail, loginEmailSent, loggingIn, error } =
    state.authentication;
  return {
    sendingLoginEmail,
    loginEmailSent,
    loggingIn,
    error,
  };
}

const connectedCompleteRegistration = connect(mapStateToProps)(Sidebar);

export default withRouter(connectedCompleteRegistration);
