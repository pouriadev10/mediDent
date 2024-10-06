import React, { useState } from "react";
import { message, Form, Input, Button, Spin, Modal } from "antd";
import { controller } from "../controller";
import { PopupMessage } from "./PopupMessage";
import Axios from "axios";
import config from "../../config";

const ResetPassForm = (props) => {
  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields();
    props.goToLogin();
    window.location.href = "/#/";
  };

  const handleSubmit = async (values) => {
    console.log("Form values:", values);
    // Get the hash part of the URL
    const hash = window.location.hash;

    // Remove the leading '#' character
    const hashWithoutHashSign = hash.slice(1);

    // Split the hash into parts using '/'
    const parts = hashWithoutHashSign.split("/");

    // The second part contains the UUID, and the third part contains the token
    const uid = parts[3];
    const token = parts[4];

    // Log the UUID and token
    console.log("UUID:", uid);
    console.log("Token:", token);
    values["uid"] = uid;
    values["token"] = token;

    // Here you can handle form submission logic
    const response = await controller.PassResetConfirm(values);
    if (response.status < 250) {
      message.success("Password reset successfully");
      props.goToLogin();
    }
  };

  return (
    <>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <div className="input-lable mt20">New Password</div>
        <Form.Item
          label=""
          name="new_password1"
          rules={[
            {
              required: true,
              message: "Please enter your new password",
            },
            {
              min: 6,
              message: "Password must be at least 6 characters long",
            },
          ]}
        >
          <Input.Password placeholder="Enter your new password" />
        </Form.Item>

        <div className="input-lable mt20">Confirm New Password</div>
        <Form.Item
          label=""
          name="new_password2"
          dependencies={["new_password1"]}
          rules={[
            {
              required: true,
              message: "Please confirm your new password",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("new_password1") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm your new password" />
        </Form.Item>
        <div className="mt10p"></div>
        <Form.Item>
          <Button className="login-button" type="primary" htmlType="submit">
            Submit
          </Button>
          <div className="forgotpass-text" onClick={handleReset}>
            Login
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState("loading");

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [noOfficeModal, setNoOfficeModal] = useState(false);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoToSignUpPage = () => {
    props.goToSignUpPage();
  };

  const handleForgetPass = () => {
    props.goToForgetPass();
  };

  const getOfficesData = async () => {
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
      window.location.href = "/";
      return response;
    } else {
      setNoOfficeModal(true);
      // this.setState({
      //     noOfficeModal: true,
      // });
      // localStorage.clear();
      // window.location.href = "/";
      // return [];
    }
  };

  const checkOnboardingOffice = async () => {
    const response = await controller.getOnboardingSteps();

    const onboarding_name =
      response.result.length == 0
        ? "completed"
        : response.result[0].onboarding_step_name;
    if (onboarding_name == "completed") {
      await getOfficesData();
    } else {
      props.readOnboardingStatus();
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    const response = await controller.Login(data);
    if (response.status < 250) {
      localStorage.setItem("user", JSON.stringify(response));
      checkOnboardingOffice();
      message.success("Login was successful");

      //props.readOnboardingStatus();
    } else {
      message.error(
        // response.email
        //   ? response.email
        //   : response.password
        //   ? response.password
        //   : response.detail
        <span>
        <div>We couldn't find your account.</div>
        <div>Please try again or Sign Up.</div>
      </span>
      );
    }
    setLoading(false);
  };

  const checkForgotPass = async () => {
    if (window.location.href.includes("password/reset")) {
      setMood("reset-pass");
    } else {
      setMood("login");
    }
  };

  React.useEffect(() => {
    checkForgotPass();
  }, []);

  const goToLogin = () => {
    setMood("login");
  };

  return mood == "login" || mood == "loading" ? (
    <>
      <div>
        {window.location.hash.includes("complete_onboarding=true") ? (
          <p>
            <span className="login-title"> Login to your account again</span>
            <br /> Onboarding Process Completed successfully
          </p>
        ) :
        window.location.hash.includes("verify-email-login") ? (
          <p>
            <span className="login-title"> Login to your account again</span>
            <br /> <p>Your Account has been verified.🎉</p>
          </p>
        ) 
        : (
          <p className="login-title">Login to your account</p>
        )}
        <p className="login-subtitle" onClick={handleGoToSignUpPage}>
          I don't have an account
        </p>
      </div>

      <div className="mt8p" style={{ marginTop: 43}}>
        <div className="input-lable">Email</div>
        <Input
          name="email"
          onChange={handleChange}
          value={data.email}
          placeholder="Enter Email"
          style={{height: 39}}
        />

        <div className="input-lable mt20">Password</div>
        <Input
          name="password"
          onChange={handleChange}
          value={data.password}
          type="password"
          placeholder="Enter Password"
          style={{height: 39}}
        />
      </div>

      <div className="mt10p">
        <Button
          className="login-button"
          onClick={handleLogin}
          loading={loading}
        >
          {loading ? "Login..." : "Login"}
        </Button>
        <div>
          <p onClick={handleForgetPass} className="forgotpass-text">
            Forget Password?
          </p>
        </div>
      </div>
      <Modal
        centered
        title="No Office"
        visible={noOfficeModal}
        footer={null}
        onCancel={() => {
          setNoOfficeModal(false);
          localStorage.clear();
          window.location.href = "/"
          window.location.reload();
        }}
      >
        <p> Ask smilepass admin too add your office then try again.</p>
      </Modal>
    </>
  ) : (
    <ResetPassForm goToLogin={goToLogin} />
  );
};

export default Login;
