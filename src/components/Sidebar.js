import { Badge, Layout, Menu, Modal, Row } from "antd";
import {
  MenuOutlined,
  DashboardOutlined,
  WalletOutlined,
  CreditCardOutlined,
  ClockCircleOutlined,
  ShopOutlined,
  DatabaseOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { push } from "react-router-redux";
import { controller } from "../controller";
import "./app.local.css";

// icons
import dashboard from "../assets/icons/dashboardIcon.png";
import member from "../assets/icons/memberIcon.png";
import treatmentPlan from "../assets/icons/data.png";
import payment from "../assets/icons/payment.png";
import appointment from "../assets/icons/appointment.png";
import data from "../assets/icons/data.png";
import office from "../assets/icons/office.png";
import setting from "../assets/icons/ticket20.png";
import logoSmall from "../assets/img/logo-collapsed.png"
import ticket from '../assets/icons/ticket.png'
import market from '../assets/icons/market.png'
import MenuItem from "antd/es/menu/MenuItem";

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
    window.location.href.search("dashboard") != -1
      ? "0"
      : window.location.href.search("office/appointments") != -1
        ? "15"
        : window.location.href.search("upload-pdf") != -1
          ? "2"
          : window.location.href.search("add-provider") != -1
            ? "3"
            : window.location.href.search("provider-scheduling") != -1
              ? "5"
              : window.location.href.search("appointments") != -1
                ? "6"
                : window.location.href.search("treatment-plans") != -1
                  ? "treatment-plans"
                  : window.location.href.search("campaigns") != -1
                    ? "campaigns"
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
      window.location.href.search("treatment-plans") != -1
    ) {
      setOpenSubMenus(["treatmentSub"]);
    } else if (
      window.location.href.search("campaigns") != -1
    ) {
      setOpenSubMenus(["markettSub"]);
    } else if (
      window.location.href.search("members") != -1 ||
      window.location.href.search("plans") != -1 ||
      window.location.href.search("visit") != -1
    ) {
      setOpenSubMenus(["sub1"]);
    } else if (
      (window.location.href.search("appointments") != -1 &&
        window.location.href.search("office/appointments") == -1) ||
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
    } else if (
      window.location.href.search("office/review") != -1 ||
      window.location.href.search("office/profile") != -1 ||
      window.location.href.search("Services") != -1 ||
      window.location.href.search("office/appointments") != -1
    ) {
      setOpenSubMenus(["sub5"]);
    } else if (
      window.location.href.search("data/health-categories") != -1 ||
      window.location.href.search("data/procedures") != -1
    ) {
      setOpenSubMenus(["sub5-data"]);
    } else {
      setOpenSubMenus(["sub2"]);
    }
  }, []);
  const handleOpenChange = (value) => {
    setOpenSubMenus(value);
  };

  const checlPracticeAdmin = async () => {
    const response = await controller.checkPracticeAdmin();
    if (response.data.result && response.data.result == "super_admin") {
      setIsPracticeAdmin(true);
    } else {
      setIsPracticeAdmin(false);
    }
  };

  const [count, setCount] = useState(0);

  const getCounterData = async () => {
    const response = await controller.getBadge();

    if (response.data) setCount(response.data);
  };

  useEffect(() => {
    getCounterData();
  }, [reloadSidebar]);

  useEffect(() => {
    getLogo();
    getCounterData();
    checlPracticeAdmin();

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
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        className="collapsedMenu"
        width={260}
      >
        <div className="logoMenu p0">
          {!collapsed ? (
            <img
              src={officeProfile.dark}
              alt="smilepass"
              className="smpassLogo"
            />
          ) : (
            <img
              height={160}
              src={logoSmall}
              alt="smilepass"
              className="smpassLogoCollpased"
            />
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
            onClick={() => dispatch(push(`/dashboard`))}
          >
            {/* <DashboardOutlined className="menuIcon" /> */}
            <img src={dashboard} alt="" className="Icon" />
            <span style={{ fontSize: 18 }} >{collapsed ? "" : "Dashboard"}</span>
          </Menu.Item>
          <MenuItem
            key="treatmentSub"
            className="sidebar_menuitem"
            onClick={() => dispatch(push(`/treatment-plans`))}
          >
            <span className="align-menu">
              <img src={treatmentPlan} alt="" className="Icon" />
              <span style={{ fontSize: 18 }}>{collapsed ? "" : "Treatment Planning"}</span>
            </span>
            {/* <Menu.Item
              className="sidebar_menuitem"
              key="treatment-plans"
              onClick={() => dispatch(push(`/treatment-plans`))}
            >
              <span >{collapsed ? "" : "New Plans"}</span>
            </Menu.Item> */}
          </MenuItem>
          {/* <SubMenu
            key="sub1"
            className="sidebar_submenu"
            title={
              <span className="align-menu">
                <img src={member} alt="" className="Icon" />
                <span style={{ fontSize: 18 }}>{collapsed ? "" : "Membership"}</span>
              </span>
            }
          >
            <Menu.Item
              className="sidebar_menuitem"
              key="60"
              onClick={() => dispatch(push(`/members`))}
            >
              <span>Members</span>
            </Menu.Item>
            <Menu.Item
              className="sidebar_menuitem"
              key="70"
              onClick={() => dispatch(push(`/plans`))}
            >
              <span>Create Subscription</span>
            </Menu.Item>
            <Menu.Item
              className="sidebar_menuitem"
              key="71"
              onClick={() => dispatch(push(`/Services-management`))}
            >
              <span>Services</span>
            </Menu.Item>
            <Menu.Item
              className="sidebar_menuitem"
              key="72"
              onClick={() => dispatch(push(`/plans-management`))}
            >
              <span>Plans</span>
            </Menu.Item>
            <Menu.Item
              className="sidebar_menuitem"
              key="80"
              onClick={() => dispatch(push(`/visit`))}
              style={{ marginBottom: "0px" }}
            >
              <span>Visits</span>
            </Menu.Item>
          </SubMenu>*/}

          <SubMenu
            key="sub2"
            className="sidebar_submenu"
            title={
              <span className="align-menu">
                <img src={payment} alt="" className="Icon" />
                <span style={{ fontSize: 18 }}>{collapsed ? "" : "Payments"}</span>
              </span>
            }
          >
            <Menu.Item
              className="sidebar_menuitem"
              key="9"
              onClick={() => dispatch(push(`/ar`))}
            >
              <span>Accounts Receivable</span>
            </Menu.Item>
            <Menu.Item
              className="sidebar_menuitem"
              key="1"
              onClick={() => dispatch(push(`/payment-requests`))}
            >
              <span>Payment Plans</span>
            </Menu.Item>
            <Menu.Item
              className="sidebar_menuitem w102p"
              key="141"
              onClick={() => dispatch(push(`/transactions`))}
            >
              <span >Transactions</span>
              <Badge
                count={count.t_count ? count.t_count : 0}
                className="ml10"
                style={{ backgroundColor: "#9340ff" }}
              />
            </Menu.Item>
            <Menu.Item
              className="sidebar_menuitem w102p"
              key="142"
              style={{ marginBottom: "0px" }}
              onClick={() => dispatch(push(`/failed-payments`))}
            >
              <span>Plans In-Default</span>
              <Badge
                className="ml10"
                count={count.fp_count ? count.fp_count : 0}
                style={{ backgroundColor: "red" }}
              />
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="sub3"
            className="sidebar_submenu"
            title={
              <span className="align-menu">
                <img src={appointment} alt="" className="Icon" />
                <span style={{ fontSize: 18 }}>{collapsed ? "" : "Appointments"}</span>
              </span>
            }
          >
            <Menu.Item
              className="sidebar_menuitem"
              key="6"
              onClick={() => dispatch(push(`/appointments`))}
            >
              <span>Appointments</span>
            </Menu.Item>
            <Menu.Item
              className="sidebar_menuitem"
              key="3"
              onClick={() => dispatch(push(`/add-provider`))}
            >
              <span>Add Provider</span>
            </Menu.Item>
            <Menu.Item
              className="sidebar_menuitem"
              key="5"
              onClick={() => dispatch(push(`/provider-scheduling`))}
            >
              <span>Provider Scheduling</span>
            </Menu.Item>
            <Menu.Item
              className="sidebar_menuitem"
              key="143"
              onClick={() => dispatch(push(`/discount-options`))}
              style={{ marginBottom: "0px" }}
            >
              <span>Discount Options</span>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="sub5"
            className="sidebar_submenu"
            title={
              <span className="align-menu">
                <img src={office} alt="" className="Icon" />
                <span style={{ fontSize: 18 }}>{collapsed ? "" : "My Office"}</span>
              </span>
            }
          >
            <Menu.Item
              className="sidebar_menuitem"
              key="8"
              onClick={() => dispatch(push(`/office/profile`))}
            >
              <span>Edit Profile</span>
            </Menu.Item>
            <Menu.Item
              className="sidebar_menuitem"
              key="15"
              onClick={() => dispatch(push(`/office/appointments`))}
            >
              <span>Appointment Types</span>
            </Menu.Item>
            <Menu.Item
              className="sidebar_menuitem"
              key="70"
              onClick={() => dispatch(push(`/Services-management`))}
            >
              <span>Services</span>
            </Menu.Item>
            <Menu.Item
              className="sidebar_menuitem"
              key="12"
              onClick={() => dispatch(push(`/office/review`))}
              style={{ marginBottom: "0px" }}
            >
              <span> Check Reviews </span>
            </Menu.Item>
          </SubMenu>
          {isPracticeAdmin ? (
            <SubMenu
              key="sub5-data"
              className="sidebar_submenu"
              title={
                <span className="align-menu">
                  <img src={ticket} alt="" className="Icon" />
                  <span style={{ fontSize: 18 }}>{collapsed ? "" : "Data"}</span>
                </span>
              }
            >
              <Menu.Item
                className="sidebar_menuitem"
                key="30"
                onClick={() => dispatch(push(`/data/health-categories`))}
              >
                <span>Health Categories</span>
              </Menu.Item>

              <Menu.Item
                className="sidebar_menuitem"
                key="31"
                onClick={() => dispatch(push(`/data/procedures`))}
              >
                <span>Procedures</span>
              </Menu.Item>
            </SubMenu>
          ) : (
            <></>
          )}

          <SubMenu
            key="markettSub"
            className="sidebar_submenu"
            title={
              <span className="align-menu" style={{ display: 'flex', alignItems: 'center' }}>
                <img src={market} alt="" className="Icon" style={{ marginRight: 8 }} />
                <span
                  style={{
                    fontSize: 18,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {collapsed ? "" : "Patient Engagement"}
                </span>
              </span>
            }
          >
            <Menu.Item
              className="sidebar_menuitem"
              key="campaigns"
              onClick={() => dispatch(push(`/campaigns`))}
            >
              <span
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {collapsed ? "" : "Engagement Campaigns"}
              </span>
            </Menu.Item>
          </SubMenu>


          <SubMenu
            key="sub4"
            className="sidebar_submenu"
            title={
              <span className="align-menu">
                <img src={setting} alt="" className="Icon" />
                <span style={{ fontSize: 18 }}>{collapsed ? "" : "Settings"}</span>
              </span>
            }
          >
            <Menu.Item
              className="sidebar_menuitem"
              key="4"
              onClick={() => dispatch(push(`/add-connected-account`))}
            >
              <span>Configure Banking</span>
            </Menu.Item>
            {isPracticeAdmin ? (
              <Menu.Item
                className="sidebar_menuitem"
                key="132"
                onClick={() => dispatch(push(`/offices`))}
              >
                <span>User Management</span>
              </Menu.Item>
            ) : (
              <></>
            )}
          </SubMenu>
        </Menu>
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
