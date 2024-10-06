import { Row, Form, Button, Input, Modal, notification, Select, Spin } from "antd";
import React, { Component } from "react";
import { controller } from "../../controller";
import { controllerAccount } from "../../controllerAccount";
import { Error } from "../../ErrorHandeling";
import CardAccount from "../CommonUi/CardAccount";
import "./style.css";
import AddConnectedAccount from "../Payment/AddConnectedAccount";
import CreateFundingSourceForm from "../Payment/CreateFundingSourceForm";
import DashboardLayout from "../../layout/dashboardLayout/DashboardLayout";
import config from "../../config";
const { Option } = Select;
const { Search } = Input;

class AddAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      helcimModalOpen: false,
      helcimLink: false,
      isExpress: false,
      activeStripe: true,
      isConnectedAccount: true,
      serverLogo: "",
      openAddAccountModal: false,
      email: "",
      accountType: "",
      country: "",
      connectedAccounts: [],
      openAddConnectedAccount: false,
      name: "",
      description: "",
      loadingNewAccount: false,
      loadingGetData: true,
      formError: {
        Name: {
          massage: "",
          status: true,
        },
        Description: {
          massage: "",
          status: true,
        },
        Email: {
          massage: "",
          status: true,
        },
        AccountType: {
          massage: "",
          status: true,
        },
        Country: {
          massage: "",
          status: true,
        },
      },
    };
    this.getLogo();
    this.getLogo = this.getLogo.bind(this);
    this.handleEnableAccount = this.handleEnableAccount.bind(this);
    this.handleActive = this.handleActive.bind(this);
    this.submitNewFundingSource = this.submitNewFundingSource.bind(this);
    this.submitConnectedAccount = this.submitConnectedAccount.bind(this);
    this.handleOpenAddConnectedAccount = this.handleOpenAddConnectedAccount.bind(
      this
    );
    this.handleEnableAccount = this.handleEnableAccount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getAccount();
  }

  submitConnectedAccount = async (data) => {
    this.setState({
      openAddConnectedAccount: false,
    });
    this.setState({ loadingGetData: true });
    this.getAccount();
  };

  submitNewFundingSource = async (data) => {
    const response = await controllerAccount.createFundingSourceBusiness(data);

    if (response.status < 250) {
      this.openNotification(
        "bottom",
        response && response.message ? response.message : "Done",
        "Successful"
      );
      this.setState({
        openAddAccountModal: false,
      });
      this.setState({ loadingGetData: true });
      const response = await controllerAccount.getListBanks();
      if (response.status < 250) {
        this.setState({
          connectedAccounts: response.bank_list,
          loadingGetData: false,
        });
      }
    } else {
      this.openNotification(
        "bottom",
        response.detail ? response.detail[0] : response.massage,
        "Error"
      );
    }
  };

  handleEnableAccount = async () => {
    const response = await controllerAccount.EnableAccount();

    if (response.url.search("helcim") != -1) {
      this.setState({
        helcimModalOpen: true,
        helcimLink: response.url
      })
      //window.open(response.url, '_blank');
    } else {
      window.open(response.url, '_blank');
    }



  };

  handleCloseAddConnectedAccount = () => {
    this.setState({
      openAddConnectedAccount: false,
    });
  };

  handleOpenAddConnectedAccount = () => {
    this.setState({
      openAddConnectedAccount: true,
    });
  };

  getLogo = async () => {
    const response = await controller.getLogo();
    this.setState({ serverLogo: response.data.dark });
  };

  getAccount = async () => {
    this.setState({ loadingGetData: true });
    const resp = await controllerAccount.checkConnectedAccounts();

    if (resp.detail && resp.detail.id) {
      this.setState({
        isConnectedAccount: true,
        isExpress: resp.detail.billing_type == "express" ? true : false,
      });
      const resp2 = await controllerAccount.checkEnableAccount();
      if (resp2.enable) {
        this.setState({
          activeStripe: true,
        });
        const response = await controllerAccount.getListBanks();
        if (response.status < 250) {
          this.setState({
            connectedAccounts: response.bank_list,
            loadingGetData: false,
          });
        }
      } else {
        this.setState({
          activeStripe: false,
        });
      }
    } else {
      this.setState({
        isConnectedAccount: false,
      });
    }
    this.setState({ loadingGetData: false });
  };

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  visibleAddAccountModal = () => {
    this.setState({ openAddAccountModal: true });
  };
  InVisibleAddAccountModal = () => {
    this.setState({
      openAddAccountModal: false,
      name: "",
      description: "",
      email: "",
      accountType: "",
      country: "",
      formError: {
        Name: {
          massage: "",
          status: true,
        },
        Description: {
          massage: "",
          status: true,
        },
        Email: {
          massage: "",
          status: true,
        },
        AccountType: {
          massage: "",
          status: true,
        },
        Country: {
          massage: "",
          status: true,
        },
      },
    });
  };

  handleActive = async (event) => {
    this.setState({ connectedAccounts: [], loadingGetData: true });
    const response = await controllerAccount.getListBanks();

    if (response.status < 250) {
      this.setState({
        connectedAccounts: response.bank_list,
        loadingGetData: false,
      });
    }
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
  handleOk = async () => {
    this.setState({ loadingNewAccount: true });

    const Name_validation = await Error.NameHandling(this.state.name);
    const country_validation = await Error.SelectItem(this.state.country);
    const description_validation = await Error.NameHandling(
      this.state.description
    );
    const email_validation = await Error.EmailHandling(this.state.email);
    const accountType_validation = await Error.SelectItem(
      this.state.accountType
    );

    if (
      Name_validation.status &&
      country_validation.status &&
      description_validation.status &&
      email_validation.status &&
      accountType_validation.status
    ) {
      this.setState({
        formError: {
          Name: {
            massage: "",
            status: true,
          },
          Description: {
            massage: "",
            status: true,
          },
          Email: {
            massage: "",
            status: true,
          },
          AccountType: {
            massage: "",
            status: true,
          },
          Country: {
            massage: "",
            status: true,
          },
        },
      });
      const response = await controllerAccount.add_connected_account(
        localStorage.getItem("selectedOffice"),
        this.state.email,
        this.state.accountType,
        this.state.country,
        this.state.name,
        this.state.description
      );
      if (response.status < 250) {
        this.setState({
          email: "",
          accountType: "",
          country: "",
          name: "",
          description: "",
        });

        const response_get_connected_account = await controllerAccount.get_connected_account();
        this.setState({
          connectedAccounts: response_get_connected_account,
        });
        this.openNotification(
          "bottom",
          response.message ? response.message : "Done",
          "Successful"
        );
        this.setState({
          loadingNewAccount: false,
          name: "",
          description: "",
          email: "",
          accountType: "",
          country: "",
        });
        this.InVisibleAddAccountModal();
      } else {
        this.openNotification(
          "bottom",
          response.detail ? response.detail[0] : response.massage,
          "Error"
        );
        this.setState({
          loadingNewAccount: false,
          formError: {
            AccountType: {
              massage: response.type ? response.type[0] : "",
              status: response.type ? false : true,
            },
            Name: {
              massage: response.name ? response.name[0] : "",
              status: response.name ? false : true,
            },
            Country: {
              massage: response.country ? response.country[0] : "",
              status: response.country ? false : true,
            },
            Email: {
              massage: response.email ? response.email[0] : "",
              status: response.email ? false : true,
            },
            Description: {
              massage: response.description ? response.description[0] : "",
              status: response.description ? false : true,
            },
          },
        });
      }
    } else {
      this.setState({
        loadingNewAccount: false,
        formError: {
          Name: Name_validation,
          Description: description_validation,
          Email: email_validation,
          AccountType: accountType_validation,
          Country: country_validation,
        },
      });
    }
  };

  formRef = React.createRef();

  onFinish = async (values) => {
    if (values.account) {
      // Call your function here
      window.location.href = config.apiGateway.URL + "/payment/check-business-onboarding/" + localStorage.getItem("selectedOffice")
        + "/" + values.account + "/" + encodeURIComponent(values.account1) + "/"

    } else {
      // Handle validation error
      console.log('Account is required!');
    }
  }

  render() {
    return (
      <DashboardLayout
        breadCrumb={"Configure Banking"}
        logo={false}
        footerLogo={this.state.serverLogo}
      >
        <div className="paymentRequestContent">
          <div className="payreq-container">
            {!this.state.isConnectedAccount ? (
              <p className="tac">
                You dont have any account yet!
                <span
                  className="addaccount_create-new"
                  onClick={this.handleOpenAddConnectedAccount}
                >
                  Create new account!
                </span>
              </p>
            ) : !this.state.activeStripe ? (
              <p className="tac">
                You're account isn't enable!
                <span className="addaccount_create-new" onClick={this.handleEnableAccount}>
                  {" "}
                  Enable Your account!
                </span>
              </p>
            ) : (
              <>
                <div className="addaccount_banks">
                  <div>Banks</div>
                  <div
                    className="addaccount_newbank"
                    onClick={this.visibleAddAccountModal}
                  >
                    {this.state.isExpress ? "" :
                      ""
                      // " + Add New Bank"
                    }
                  </div>
                </div>
                {this.state.loadingGetData ? (
                  <div className="addaccount_loading">
                    <Spin size="large" className="addaccount_asc" />
                  </div>
                ) : (
                  <div className="addaccount_bank-account-card-row">
                    {this.state.connectedAccounts.map((connectedAccount) => (
                      <CardAccount
                        isExpress={this.state.isExpress}
                        data={connectedAccount}
                        onActiveCard={this.handleActive}
                      />
                    ))}
                    {this.state.isExpress ? (
                      <></>
                    ) : (
                      <></>
                      // <div
                      //   onClick={this.visibleAddAccountModal}
                      //   className="col-4  bank-account-card-new mb6"
                      // >
                      //   <div className="add-new-card">+</div>
                      // </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <Modal
          title="Add Connected Account"
          onCancel={this.handleCloseAddConnectedAccount}
          visible={this.state.openAddConnectedAccount}
          onOk={this.handleCloseAddConnectedAccount}
          footer={null}
          okText={
            !this.state.loadingNewAccount ? (
              "Create new connected account"
            ) : (
              <Spin />
            )
          }
        >
          <div className="content">
            <AddConnectedAccount
              submitConnectedAccount={this.submitConnectedAccount}
            />
          </div>
        </Modal>
        <Modal
          title="Add Bank"
          onCancel={this.InVisibleAddAccountModal}
          visible={this.state.openAddAccountModal}
          onOk={this.handleOk}
          footer={null}
          okText={
            !this.state.loadingNewAccount ? (
              "Create new connected account"
            ) : (
              <Spin />
            )
          }
        >
          <div className="content">
            <CreateFundingSourceForm
              openAddAccountModal={this.state.openAddAccountModal}
              submitNewFundingSource={this.submitNewFundingSource}
            />
          </div>
        </Modal>

        <Modal
          title="Enable account by helcim"
          open={this.state.helcimModalOpen}
          footer={null}
          onCancel={() => {
            this.setState({
              helcimModalOpen: false,
            })
            this.formRef.current.resetFields();
          }}
        >

          <p>
            Please enter your Helcim information below.
          </p>
          <Row type="flex" justify={"center"} className="mb5">
            <a style={{ color: "#983cfc", textDecoration: "underline" }} href={this.state.helcimLink} target="blank">Enable account by helcim</a>
          </Row>


          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <label>Helcim js token</label>
            <Form.Item
              label=""
              name="account"
              rules={[{ required: true, message: 'Please input your Helcim js token!' }]}
            >
              <Input placeholder="Enter Helcim js token" />
            </Form.Item>
            <label>Helcim Account token</label>
            <Form.Item
              label=""
              name="account1"
              rules={[{ required: true, message: 'Please input your Helcim Account token!' }]}
            >
              <Input placeholder="Enter Helcim Account token" />
            </Form.Item>
            <Row justify={"end"}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Row>

          </Form>
        </Modal>

      </DashboardLayout >
    );
  }
}

export default AddAccount;
