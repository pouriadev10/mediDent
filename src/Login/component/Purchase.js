import React, { useState, useRef, useEffect } from "react";
import {
  Row,
  Col,
  Table,
  Button,
  Popconfirm,
  Tag,
  message,
  Modal,
  Input,
  Checkbox,
  Spin
} from "antd";
import { controller } from "../controller";
import config from "../../config";
import PlatformForm from "./PlatformForm";
import HelcimForm from "./HelcimForm";
import Axios from "axios";
// icon
import checkIcon from "../assets/icon/check.png";
import trash from "../assets/icon/trash.png";

const Purchase = (props) => {
  const [openPlatform, setOpenPlatform] = useState(false);
  const [mode, setMode] = useState("loading");
  /*
    1. loaidng
    2. inviter
    3. invitee
  */

  const [mainLoading, setMainLoading] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [licenses, setLicenses] = useState([]);
  const [summary, setSummary] = useState([]);
  const [allInvitedUserID, setAllInvitedUserID] = useState([]);
  const [paymentMode, setPaymentMode] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (selectedRowKeys) => {
    console.log(selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleSkip = async () => {
    const res = await controller.skipOnBoarding();
    if (res.status < 250) {
      message.success("Payment successful");
      const res = await getData();
      if (res && res.data && res.data.length > 0) window.location.href = "/";

      // localStorage.clear();
      // window.location.href =
      //   window.location.origin +
      //   window.location.pathname +
      //   "#/?complete_onboarding=true";
    }
    window.location.reload();
  };

  const getListOfInvitedUser = async () => {
    setMainLoading(true)
    const response = await controller.getAllInvitedUser();
    if (response && response.invites && response.invites.length > 0) {
      setData(response.invites);
      setMode(response.status)
      if (response.status != "inviter") {
        setSelectedRowKeys([response.invites[0].id])
      }
    }

    else
      handleSkip();
    setMainLoading(false)
  };

  const getListOfLicences = async () => {
    const response = await controller.LicencesList();
    setLicenses(response);
  };

  const handleCalculateSummary = async () => {
    var users_invitedId = [];
    var subscriptionList = [];
    var subscriptionCounts = {};
    var subscriptionPrices = {};

    data.forEach((item) => {
      if (selectedRowKeys.includes(item.id)) {
        users_invitedId.push(item.id);
        const title =
          item.subscription_tier
            ? item.subscription_tier.title
            : "No Subscription";
        const price =
          item.subscription_tier
            ? eval(item.subscription_tier.price)
            : 0;

        if (!subscriptionList.includes(title)) {
          subscriptionList.push(title);
          subscriptionCounts[title] = 1;
          subscriptionPrices[title] = price;
        } else {
          subscriptionCounts[title]++;
        }
      }
    });

    // Calculate total price for each subscription tier
    var subscriptionCountArray = Object.keys(subscriptionCounts).map(
      (title) => ({
        title: title,
        count: subscriptionCounts[title],
        price: subscriptionPrices[title],
        total_price: subscriptionCounts[title] * subscriptionPrices[title],
      })
    );

    setAllInvitedUserID(users_invitedId);
    console.log(subscriptionCountArray);
    setSummary(subscriptionCountArray);
  };

  const handleDoneInviteUser = async () => {
    setLoading(true);
    const response = await controller.checkUserStatus();
    if (response.status) {
      console.log(selectedRowKeys);
      let formData = new FormData();
      for (var i in selectedRowKeys) {
        formData.append("invite", selectedRowKeys[i]);
      }
      const resp = await controller.inviteMembership(formData);
      setPaymentMode(true);
    } else {
      setOpenPlatform(true);
    }
    setLoading(false);
  };

  const closeOpenPlatform = () => {
    props.readOnboardingStatus();
    setOpenPlatform(false);
  };

  const getData = async () => {
    const Config = {
      headers: {
        Authorization: localStorage.getItem("user")
          ? "Token " + JSON.parse(localStorage.getItem("user")).key
          : "",
      },
    };
    const response = await Axios.get(
      config.apiGateway.URL + `/clinics/selectoffice/`,
      Config
    );
    var chengedResponse = response.data;

    if (chengedResponse && chengedResponse.length > 0) {
      for (var i = 0; i < chengedResponse.length; i++)
        chengedResponse[i].office_id = chengedResponse[i].id;

      localStorage.setItem("office_ids", JSON.stringify(chengedResponse));
      localStorage.setItem(
        "selectedOffice",
        eval(JSON.stringify(chengedResponse[0].office_id))
      );
      localStorage.setItem(
        "selectedOfficeName",
        eval(JSON.stringify(chengedResponse[0].office_name))
      );
      return response;
    } else {
      this.setState({
        noOfficeModal: true,
      });
      localStorage.clear();

      return [];
    }
  };

  const handleApprovedCardByHelcim = async (cardToken) => {
    try {
      const res = await controller.helcimPayMulti(cardToken);

      if (res.status < 250) {
        message.success("Payment successful");
        const res = await getData();
        if (res && res.data && res.data.length > 0) window.location.href = "/";


        // localStorage.clear();
        // window.location.href =
        //   window.location.origin +
        //   window.location.pathname +
        //   "#/?complete_onboarding=true";.
        window.location.reload();
      }
      else {
        message.error("error")
        this.setState({
          loadingHelcimResultCheck: false
        })
      }
    } catch (error) {
      console.error("Error fetching IP address:", error);
    }
  };

  useEffect(() => {
    getData()
    const getUrlParameter = (name) => {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
      const results = regex.exec(window.location.search);
      return results === null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    // Get the value of responseMessage and cardToken from URL parameters
    const responseMessage = getUrlParameter("responseMessage");
    const cardToken = getUrlParameter("cardToken");

    // Check if responseMessage is "APPROVED" and log cardToken
    if (responseMessage === "APPROVED") {
      handleApprovedCardByHelcim(cardToken);
    }
  }, []);

  const checkMode = async () => {
    setLoadingPage(true);
    const response = await controller.checkUserStatus();
    if (response.status) {
      setPaymentMode(true);
    } else {
      setPaymentMode(false);
    }
    setLoadingPage(false);
  };

  useEffect(() => {
    handleCalculateSummary();
  }, [data]);

  useEffect(() => {
    getListOfInvitedUser();
    getListOfLicences();
    checkMode();
  }, []);

  const handleDelete = async (e) => {
    setLoadingDelete(true);
    const response = await controller.deleteInvitedUser(e.id);
    if (response.status < 250) {
      getListOfInvitedUser();
      message.success("Removed");
    } else {
      message.error("Error during remove invited user");
    }
    setLoadingDelete(false);
  };

  useEffect(() => {
    handleCalculateSummary();
  }, [selectedRowKeys]);

  const columns = [
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (_, record) => {
        return <>{record.roles[0]}</>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => {
        return <div className='lastAntdTableColumn'>{record.receiver_email}</div>;
      },
    },
    {
      title: "Subscription",
      dataIndex: "subscription",
      key: "subscription",
      render: (_, record) => {
        return (
          <Row
            className='lastAntdTableColumn'
            justify={"space-between"}
            style={{
              width:
                record.subscription_tier && record.subscription_tier.title == "Pro"
                  ? "100%"
                  : "max-content",
            }}
          >
            <Tag color="green">{record.subscription_tier && record.subscription_tier.title}</Tag>

            <span>
              <Popconfirm
                title="Are you sure to delete this invites user?"
                onConfirm={() => {
                  handleDelete(record);
                }}
              >
                <img className="trash-action-icon" src={trash} alt="trash" />
              </Popconfirm>
            </span>
          </Row>
        );
      },
    },
  ];

  return (
    mainLoading ?
      <Spin />
      :
      <>
        {loadingPage ? (
          <></>
        ) : paymentMode ? (
          <>
            <HelcimForm />
          </>
        ) : (
          <>
          <p style={{fontSize: 20, marginBottom: 37}}>Seats you want</p>
            <div className="custom-table-container">
              <div style={{ with: "100%", overflow: "auto" }}>
                <Table
                  rowKey="id"
                  rowSelection={rowSelection}
                  dataSource={data}
                  columns={columns}
                  bordered
                  pagination={false}
                  className="custom-table"
                />
              </div>
            </div>
            <Row>
              <p
                className="card-box-text-title-onboarding"
                style={{ margin: "20px 0px" }}
              >
                Summery
              </p>
            </Row>
            {summary &&
              summary.length > 0 &&
              summary.map((item, index) => (
                <>
                  <Row justify={"space-between"} style={{marginBottom: 5}}>
                    <Col>
                      <span style={{ color: "#979797" }}>{item.title}</span>
                    </Col>
                    <Col>
                      <span style={{ color: "#979797" }}>
                        {item.count} * ${item.price} = ${item.total_price}
                      </span>
                    </Col>
                  </Row>
                </>
              ))}
            <div className="line-result"></div>
            <Row justify={"space-between"}>
              <p
                className="card-box-text-title-onboarding"
                style={{ margin: "0px 0px", fontWeight: "bold" }}
              >
                Total Amount
              </p>
              <p
                className="card-box-text-title-onboarding"
                style={{ margin: "0px 0px", fontWeight: "bold" }}
              >
                $
                {summary.reduce(
                  (total, subscription) => total + subscription.total_price,
                  0
                )}
              </p>
            </Row>

            <div className="mt10"></div>
            <div>
              <Button
                disabled={selectedRowKeys.length == 0}
                loading={loading}
                onClick={handleDoneInviteUser}
                className="login-button "
                style={{marginBottom: 15, marginTop: 40}}
              >
                Pay
              </Button>
              <div className="skip-btn mt5" onClick={handleSkip}>
                Skip
              </div>
            </div>
            <Modal
              onCancel={() => {
                setOpenPlatform(false);
              }}
              open={openPlatform}
              footer={null}
              title="Create Customer Platform"
            >
              <PlatformForm
                selectedRowKeys={selectedRowKeys}
                readOnboardingStatus={props.readOnboardingStatus}
                closeOpenPlatform={closeOpenPlatform}
              />
            </Modal>
          </>
        )}
      </>
  );
};

export default Purchase;
