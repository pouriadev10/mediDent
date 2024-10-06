import React, { Component } from "react";
import "./app.global.scss";
import "./app.global2.css";
import Root from "./containers/Root";
import { configureStore, history } from "./store/configureStore";
import { ToastContainer } from "react-toastify";
import { ConfigProvider } from "antd";
import config from './config';
import "react-toastify/dist/ReactToastify.css";

const store = configureStore();

class App extends Component {
  componentDidMount() {
    if(document.getElementById('g-recaptcha-response')){
      document.getElementById('g-recaptcha-response').value = sessionStorage.getItem("GoogleRecaptcha");
    }
    // const script = document.createElement('script');
    // script.src = "https://www.google.com/recaptcha/api.js?render=" + config.googleCaptch.code;
    // script.async = true;
    // document.body.appendChild(script);

    // script.onload = () => {
    //   window.grecaptcha.ready(() => {
    //     window.grecaptcha.execute(config.googleCaptch.code, { action: 'helcimJSCheckout' })
    //       .then(token => {
    //         if (document.getElementById('g-recaptcha-response'))
    //           document.getElementById('g-recaptcha-response').value = token;
    //       });
    //   });
    // };
  }

  componentWillUnmount() {
    const script = document.querySelector('script[src="https://www.google.com/recaptcha/api.js?render=' + config.googleCaptch.code + '"]');
    if (script) {
      script.remove();
    }
  }

  render() {
    return (
      <div>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#6B43B5',
              controlItemBgHover: "#c293ff",
              colorLink: '#6B43B5',
            },
            components: {
              Radio: {
                /* here is your component tokens */
                buttonSolidCheckedActiveBg: "#6B43B5",
                buttonSolidCheckedBg: "#6B43B5",
                buttonSolidCheckedHoverBg: "#6B43B5"
              },
              Badge: {
                color: "#fff", // Text color
                backgroundColor: "#f5222d", // Background color
              },
              Button: {
                link: 'red',
                borderRadius: '20px',
                colorPrimary: '#6B43B5'
              },
              Layout: {
                bodyBg: "#FFF",
                siderBg: "#fff",
                triggerColor: "gray",
                triggerBg: "#fff",
              },
              Menu: {
                darkSubMenuItemBg: "#fff",
                darkItemSelectedTextColor: "#6B43B5",
                darkItemHoverBg: "#EEEDFA",
                darkItemHoverColor: "#6B43B5",
                darkItemColor: " #301F56",
              },
              Select: {
                optionSelectedBg: "#c293ff",
              },
            },
          }}
          direction="ltr"
        >
          <ToastContainer
            className="toastContainerClass"
            toastClassName="toastClass"
            progressClassName="toastprogressClass"
          />
          <Root store={store} history={history} />
        </ConfigProvider>
      </div>
    );
  }
}



export default App;
