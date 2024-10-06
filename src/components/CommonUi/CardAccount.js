import React, { useEffect, useState } from "react";
import { notification, Spin, Icon, Input, Button, Modal, Select } from "antd";
import { controllerAccount } from "../../controllerAccount";
import { Error } from "../../ErrorHandeling";
import "./style.css";

const { Option } = Select;

export default function CardAccount({ isExpress, data, onActiveCard }) {
  const [viewBankInfo, setViewBankInfo] = useState({});
  const [openModalViewBank, setOpenModalViewBank] = useState(false);
  const [loadingAddBank, setLoadingAddBank] = React.useState(false);
  const [openModalAddBank, setOpenModalAddBank] = useState(false);
  const [modalInfoIncompelete, setModalInfoIncompelete] = useState(false);
  const [stripe_account_id, setStripe_account_id] = useState("");
  const [addBankInfo, setAddBankInfo] = useState({
    office: localStorage.getItem("selectedOffice"),
    name: "",
    stripe_bank_id: "",
    stripe_account_id: "",
    account_number: "",
    routing_number: "",
    account_holder_name: "",
    account_holder_type: "",
    country: "",
    currency: "",
    description: "",
  });
  const [formError, setFormError] = useState({
    Name: {
      massage: "",
      status: true,
    },
    Description: {
      massage: "",
      status: true,
    },
    AccountNumber: {
      massage: "",
      status: true,
    },
    RoutingNumber: {
      massage: "",
      status: true,
    },
    AccountHolderName: {
      massage: "",
      status: true,
    },
    AccountHolderType: {
      massage: "",
      status: true,
    },
    Country: {
      massage: "",
      status: true,
    },
    Currency: {
      massage: "",
      status: true,
    },
  });
  const [loadingActive, setloadingActive] = useState(false);
  const [loadingstripeLink, setloadingstripeLink] = useState(false);
  const [loadingAddBankEnable, setLoadingAddBankEnable] = useState(false);
  const addBankAccount = async (stripe_account_id) => {
    setLoadingAddBankEnable(true);
    const response = await controllerAccount.isenableaccount(
      localStorage.getItem("selectedOffice"),
      stripe_account_id
    );
    if (response.status < 250) {
      setLoadingAddBankEnable(false);
      if (response.enable) {
        setOpenModalAddBank(true);
        setAddBankInfo({
          ...addBankInfo,
          stripe_account_id: stripe_account_id,
        });
      } else {
        setStripe_account_id(stripe_account_id);
        setModalInfoIncompelete(true);
      }
    }
  };
  const stripeLink = async () => {
    setloadingstripeLink(true);
    const response = await controllerAccount.accountlink(stripe_account_id);
    if (response.status < 250) {
      window.location.href = response.data;
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddBankInfo({
      ...addBankInfo,
      [name]: value,
    });
  };
  const openNotification = (placement, message, status) => {
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
  const handleOk = async () => {
    const Name_validation = await Error.NameHandling(addBankInfo.name);
    const Description_validation = await Error.NameHandling(
      addBankInfo.description
    );
    const AccountNumber_validation = await Error.NameHandling(
      addBankInfo.account_number
    );
    const RoutingNumber_validation = await Error.NameHandling(
      addBankInfo.routing_number
    );
    const AccountHolderName_validation = await Error.NameHandling(
      addBankInfo.account_holder_name
    );
    const AccountHolderType_validation = await Error.SelectItem(
      addBankInfo.account_holder_type
    );
    const Country_validation = await Error.SelectItem(addBankInfo.country);
    if (
      Name_validation.status &&
      Description_validation.status &&
      AccountNumber_validation.status &&
      RoutingNumber_validation.status &&
      AccountHolderName_validation.status &&
      AccountHolderType_validation.status &&
      Country_validation.status
    ) {
      setFormError({
        Name: {
          massage: "",
          status: true,
        },
        Description: {
          massage: "",
          status: true,
        },
        AccountNumber: {
          massage: "",
          status: true,
        },
        RoutingNumber: {
          massage: "",
          status: true,
        },
        AccountHolderName: {
          massage: "",
          status: true,
        },
        AccountHolderType: {
          massage: "",
          status: true,
        },
        Country: {
          massage: "",
          status: true,
        },
      });
      setLoadingAddBank(true);
      const response = await controllerAccount.add_bank_account(addBankInfo);
      if (response.status < 250) {
        openNotification(
          "bottom",
          response.message ? response.message : "Done",
          "Successful"
        );
        setAddBankInfo({
          office: localStorage.getItem("selectedOffice"),
          name: "",
          stripe_bank_id: "",
          stripe_account_id: "",
          account_number: "",
          routing_number: "",
          account_holder_name: "",
          account_holder_type: "",
          country: "",
          currency: "",
          description: "",
        });
        setLoadingAddBank(false);
        setOpenModalAddBank(false);
        onActiveCard("sallasm");
      } else {
        setLoadingAddBank(false);
        openNotification(
          "bottom",
          response.detail
            ? response.detail[1]
              ? response.detail[0] + response.detail[1]
              : response.detail[0]
            : response.massage,
          "Error"
        );
        setFormError({
          Name: {
            massage: response.name ? response.name[0] : "",
            status: response.name ? false : true,
          },
          Description: {
            massage: response.description ? response.description[0] : "",
            status: response.description ? false : true,
          },
          AccountNumber: {
            massage: response.account_number ? response.account_number[0] : "",
            status: response.account_number ? false : true,
          },
          RoutingNumber: {
            massage: response.routing_number ? response.routing_number[0] : "",
            status: response.routing_number ? false : true,
          },
          AccountHolderName: {
            massage: response.account_holder_name
              ? response.account_holder_name[0]
              : "",
            status: response.account_holder_name ? false : true,
          },
          AccountHolderType: {
            massage: response.account_holder_type
              ? response.account_holder_type[0]
              : "",
            status: response.account_holder_type ? false : true,
          },
          Country: {
            massage: response.country ? response.country[0] : "",
            status: response.country ? false : true,
          },
        });
      }
    } else {
      setFormError({
        Name: Name_validation,
        Description: Description_validation,
        AccountNumber: AccountNumber_validation,
        RoutingNumber: RoutingNumber_validation,
        AccountHolderName: AccountHolderName_validation,
        AccountHolderType: AccountHolderType_validation,
        Country: Country_validation,
      });
    }
  };
  const handleCancelAddBank = () => {
    setOpenModalAddBank(false);
    setFormError({
      Name: {
        massage: "",
        status: true,
      },
      Description: {
        massage: "",
        status: true,
      },
      AccountNumber: {
        massage: "",
        status: true,
      },
      RoutingNumber: {
        massage: "",
        status: true,
      },
      AccountHolderName: {
        massage: "",
        status: true,
      },
      AccountHolderType: {
        massage: "",
        status: true,
      },
      Country: {
        massage: "",
        status: true,
      },
      Currency: {
        massage: "",
        status: true,
      },
    });
    setAddBankInfo({
      office: localStorage.getItem("selectedOffice"),
      name: "",
      stripe_bank_id: "",
      stripe_account_id: "",
      account_number: "",
      routing_number: "",
      account_holder_name: "",
      account_holder_type: "",
      country: "",
      currency: "",
      description: "",
    });
  };
  const activeCardAccount = async () => {
    setloadingActive(true);
    data = {
      office_id: localStorage.getItem("selectedOffice"),
      bank_id: data.id,
    };
    const response = await controllerAccount.active_cart_bank_new(data);
    if (response.status < 250) {
      onActiveCard("sallasm");
    } else {
      if (response.error) {
        openNotification(
          "bottom",
          response.error ? response.error[0] : response.massage,
          "Error"
        );
      }
    }
    setloadingActive(false);
  };
  return (
    <>
      <div
        style={
          data.is_default
            ? {
                marginBottom: "6px",
                background:
                  "#EEEDFA",
                  border: 'none',
                  width: 395,
                  height: 156
              }
            : { marginBottom: "6px" }
        }
        className="col-4  bank-account-card-new"
      >
        <div className="commonui_w100">
          <div className="commonui_description">
            <div>
              <p className="cardHeadLeft" style={{color: '#979797'}}>
                Funding Source
                <br />
                <span style={{color: '#6B43B5', fontSize: 16}}>
                  {data.fundingsource_name ? data.fundingsource_name : "-"}
                </span>
              </p>
            </div>
            <div>
              <p className="cardHeadRight"  style={{color: '#979797'}}>
                Bank
                <br />
                <span style={{color: '#6B43B5', fontSize: 16}}>
                  {data.bank_name ? data.bank_name : "-"}
                </span>
              </p>
            </div>
          </div>
          <div className="commonui_description">
            <div>
              <p className="cardHeadLeft"  style={{color: '#979797'}}>
                Funding ID
                <br />
                <span style={{color: '#6B43B5', fontSize: 16}}>
                  {data.funding_id ? data.funding_id : "-"}
                </span>
              </p>
            </div>
          </div>
          <div className="commonui_description">
            <p className=" cardHeadLeft"  style={{color: '#979797'}}>
              Created
              <br />
              <span style={{color: '#6B43B5', fontSize: 16}}>
                {data.created
                  ? new Date(data.created).toLocaleDateString() +
                    " " +
                    new Date(data.created).toLocaleTimeString()
                  : "-"}
              </span>
            </p>
          </div>
          <div className="commonui_cardaccount">
            {isExpress ? (
              <></>
            ) : (
              <></>
              // <Button
              //   onClick={activeCardAccount}
              //   className="commonui_mw70"
              //   disabled={data.is_default ? true : false}
              // >
              //   {loadingActive ? "..." : "Active"}
              // </Button>
            )}
          </div>
        </div>
      </div>
      {/* <Modal
        title="View Bank"
        open={openModalViewBank}
        footer={null}
        onCancel={() => {
          setOpenModalViewBank(false);
        }}
      >
        <div className="commonui_description">
          <div>
            <p className="cardHeadModal cardHeadLeft">
              Account Holder Name
              <br />
              <span className="cardContextModal">
                {viewBankInfo.account_holder_name
                  ? viewBankInfo.account_holder_name
                  : "-"}
              </span>
            </p>
          </div>
          <div>
            <p className="cardHeadModal cardHeadRight">
              Account HolderType
              <br />
              <span className="cardContextModal">
                {viewBankInfo.account_holder_type
                  ? viewBankInfo.account_holder_type
                  : "-"}
              </span>
            </p>
          </div>
        </div>
        <div className="commonui_description">
          <div>
            <p className="cardHeadModal cardHeadLeft">
              Bank Name
              <br />
              <span className="cardContextModal">
                {viewBankInfo.name ? viewBankInfo.name : "-"}
              </span>
            </p>
          </div>
          <p className="cardHeadModal cardHeadRight">
            Country
            <br />
            <span className="cardContextModal">
              {viewBankInfo.country ? viewBankInfo.country : "-"}
            </span>
          </p>
        </div>
        <div className="commonui_description">
          <div>
            <p className="cardHeadModal cardHeadLeft">
              Account Number (last 4 digit)
              <br />
              <span className="cardContextModal">
                {viewBankInfo.last4 ? viewBankInfo.last4 : "-"}
              </span>
            </p>
          </div>
          <p className="cardHeadModal cardHeadRight">
            Routing Number
            <br />
            <span className="cardContextModal">
              {viewBankInfo.routing_number ? viewBankInfo.routing_number : "-"}
            </span>
          </p>
        </div>
        <div className="commonui_description">
          <div>
            <p className="cardHeadModal cardHeadLeft">
              Description
              <br />
              <span className="cardContextModal">
                {viewBankInfo.description ? viewBankInfo.description : "-"}
              </span>
            </p>
          </div>
        </div>
        <div className="commonui_closebutton">
          <Button
            onClick={() => {
              setOpenModalViewBank(false);
            }}
            className="commonui_ml5"
            type="primary"
          >
            Close
          </Button>
        </div>
      </Modal> */}

      <Modal
        width={1000}
        title="Add Bank Account"
        visible={openModalAddBank}
        footer={null}
        okText="Create new bank account"
        onOk={handleOk}
        onCancel={handleCancelAddBank}
      >
        <div className="row">
          <div className="col commonui_mb10">
            <label className="formLabel">Name</label>
            <Input
              className={
                formError && formError.Name && formError.Name.status
                  ? "inputs"
                  : "inputs-error"
              }
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Name"
              value={addBankInfo.name}
            />
            {formError && formError.Name && formError.Name.status ? (
              <></>
            ) : (
              <div className="error-text">{formError.Name.massage}</div>
            )}
          </div>
          <div className="col commonui_mb10">
            <label className="formLabel">Description</label>
            <Input
              className={
                formError &&
                formError.Description &&
                formError.Description.status
                  ? "inputs"
                  : "inputs-error"
              }
              onChange={handleChange}
              type="text"
              name="description"
              placeholder="Description"
              value={addBankInfo.description}
            />
            {formError &&
            formError.Description &&
            formError.Description.status ? (
              <></>
            ) : (
              <div className="error-text">{formError.Description.massage}</div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col commonui_mb10">
            <label className="formLabel">Account Number</label>
            <Input
              className={
                formError &&
                formError.AccountNumber &&
                formError.AccountNumber.status
                  ? "inputs"
                  : "inputs-error"
              }
              onChange={handleChange}
              type="text"
              name="account_number"
              placeholder="Account Number"
              value={addBankInfo.account_number}
            />
            {formError &&
            formError.AccountNumber &&
            formError.AccountNumber.status ? (
              <></>
            ) : (
              <div className="error-text">
                {formError.AccountNumber.massage}
              </div>
            )}
          </div>
          <div className="col commonui_mb10">
            <label className="formLabel">Routing Number</label>
            <Input
              className={
                formError &&
                formError.RoutingNumber &&
                formError.RoutingNumber.status
                  ? "inputs"
                  : "inputs-error"
              }
              onChange={handleChange}
              type="text"
              name="routing_number"
              placeholder="Routing Number"
              value={addBankInfo.routing_number}
            />
            {formError &&
            formError.RoutingNumber &&
            formError.RoutingNumber.status ? (
              <></>
            ) : (
              <div className="error-text">
                {formError.RoutingNumber.massage}
              </div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col commonui_mb10">
            <label className="formLabel">Account Holder Name</label>
            <Input
              className={
                formError &&
                formError.AccountHolderName &&
                formError.AccountHolderName.status
                  ? "inputs"
                  : "inputs-error"
              }
              onChange={handleChange}
              type="text"
              name="account_holder_name"
              placeholder="Account Holder Name"
              value={addBankInfo.account_holder_name}
            />
            {formError &&
            formError.AccountHolderName &&
            formError.AccountHolderName.status ? (
              <></>
            ) : (
              <div className="error-text">
                {formError.AccountHolderName.massage}
              </div>
            )}
          </div>
          <div className="col commonui_mb10">
            <label className="formLabel">Account Holder Type</label>
            <Select
              className={
                formError &&
                formError.AccountHolderType &&
                formError.AccountHolderType.status
                  ? "inputs commonui_w100"
                  : "inputs-error commonui_w100"
              }
              name="account_holder_name"
              placeholder="Account Holder Type"
              defaultValue={[]}
              onChange={(e) => {
                setAddBankInfo({
                  ...addBankInfo,
                  account_holder_type: e,
                });
              }}
            >
              <Option key="individual">individual</Option>
              <Option key="company">company</Option>
            </Select>
            {formError &&
            formError.AccountHolderType &&
            formError.AccountHolderType.status ? (
              <></>
            ) : (
              <div className="error-text">
                {formError.AccountHolderType.massage}
              </div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col commonui_mb10">
            <label className="formLabel">Country</label>
            <Select
              className={
                formError && formError.Country && formError.Country.status
                  ? "inputs commonui_w100"
                  : "inputs-error commonui_w100"
              }
              placeholder="Country"
              defaultValue={[]}
              onChange={(e) => {
                setAddBankInfo({
                  ...addBankInfo,
                  country: e,
                });
              }}
            >
              <Option key="US">US</Option>
              <Option key="CA">CA</Option>
              <Option key="None">None</Option>
            </Select>
            {formError && formError.Country && formError.Country.status ? (
              <></>
            ) : (
              <div className="error-text">{formError.Country.massage}</div>
            )}
          </div>
          <div className="col commonui_mb10"></div>
        </div>
        <div className="modalButton">
          <Button onClick={handleCancelAddBank}>cancel</Button>
          {loadingAddBank ? (
            <Button className="commmonui_modal-button" type="primary">
              Loading ...
            </Button>
          ) : (
            <Button
              className="commmonui_modal-button"
              type="primary"
              onClick={handleOk}
            >
              Add Bank
            </Button>
          )}
        </div>
      </Modal>
      <Modal
        title="Information Is Incompelete"
        visible={modalInfoIncompelete}
        footer={null}
        onCancel={() => {
          setModalInfoIncompelete(false);
        }}
      >
        For add bank you must compelete youre information in Stripe. Please
        compelete youre information.
        <br />
        <br />
        {loadingstripeLink ? (
          <Button className="commmonui_w100" type="primary">
            Loading ...
          </Button>
        ) : (
          <Button
            onClick={stripeLink}
            className="commmonui_w100"
            type="primary"
          >
            Compelete Information
          </Button>
        )}
      </Modal>
    </>
  );
}
