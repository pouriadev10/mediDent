import React, { Component } from 'react';
import PaymentWizard from './PaymentWizard';
import PaymentWizardStep2 from './PaymentWizardStep2';
import DoneWizardPayment from './DoneWizardPayment';
import { Paymentcontroller } from '../../Paymentcontroller'
import { connect } from 'react-redux'
import PaymentDoneMulti from './PaymentDoneMulti';
import config from '../../config'
import { Row, Spin, message } from 'antd';
class PaymentWizardHandler extends Component {
    handleSubmitStepOne = (event) => {
        if (event == "done") {
            this.setState({ stage: 1 })
        }
    }
    handleSubmitStepTwo = (event) => {
        if (event == "done") {
            this.setState({ stage: 2 })
        }
    }
    handleSubmitStepThree = (event) => {
        if (event == "done") {
            this.setState({ stage: 3 })
        }
    }
    getLogo = async () => {
        if (window.location.href.split("/") &&
            window.location.href.split("/")[window.location.href.split("/").length - 1]
        ) {
            const response = await Paymentcontroller.get_payment_wizard_data(
                window.location.href.split("/")[window.location.href.split("/").length - 1]
            )
            const response_logo = await Paymentcontroller.officeprofile(response.office)
            this.setState({ logo: response_logo.logo })
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            stage: 0,
            logo: "",
            loadingHelcimResultCheck: false
        }

        this.getLogo()
        this.handleSubmitStepOne = this.handleSubmitStepOne.bind(this)
    }
    dismiss() {
        this.props.unmountMe();
    }

    handleReadDataIP = async () => {

        try {
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            const userIp0 = ipData.ip;
            return userIp0.ip


        } catch (error) {
            console.error('Error fetching IP address:', error);
        }
        return null;
    };


    handleApprovedCardByHelcim = async (cardToken) => {
        const userIP = ""
        try {
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            const userIp0 = ipData.ip;
            const response = await Paymentcontroller.helcimPayMulti(
                window.location.href.split("/")[
                window.location.href.split("/").length - 1
                ],
                cardToken,
                userIp0
            )

            if (response.status < 250) {
                // window.location.href = window.location.origin + window.location.pathname +
                //     "#/payment/" + window.location.href.split("/")[
                //     window.location.href.split("/").length - 1
                //     ]
            } else {
                var errors = Object.keys(response)

                errors.map((resp) =>
                    resp != "status" ? message.error(response[resp]) : ""
                )
                this.setState({
                    loadingHelcimResultCheck: false
                })
            }
        } catch (error) {
            console.error('Error fetching IP address:', error);
        }
        /*
        }*/
    }

    checkHelcimPay = async () => {
        // Function to parse URL parameters
        const getUrlParameter = (name) => {
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            const results = regex.exec(window.location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        };

        // Get the value of responseMessage and cardToken from URL parameters
        const responseMessage = getUrlParameter('responseMessage');
        const cardToken = getUrlParameter('cardToken');

        // Check if responseMessage is "APPROVED" and log cardToken
        if (responseMessage === 'APPROVED' || responseMessage === 'APPROVAL' || window.location.href.includes("/?")) {
            const userIp = this.handleReadDataIP()

            this.handleApprovedCardByHelcim(cardToken)
            console.log('user ip:', userIp);
            console.log('Card Token:', cardToken);
        } else {
            this.setState({
                loadingHelcimResultCheck: false
            })
        }
    }


    componentDidMount() {
        if (window.location.href.includes("/?")) {
            this.setState({
                loadingHelcimResultCheck: true
            })
            this.checkHelcimPay()
        }
    }


    render() {
        return (
            this.state.loadingHelcimResultCheck ?
                <>
                    <Row justify={"center"} className="mt5p">
                        <br />
                        <br />
                        <br />
                        <Spin size="large" />

                    </Row>
                    <Row justify={"center"}>
                        <p style={{ marginTop: "15px", color: " #722ed1", fontWeight: "600", fontSize: "15px" }}>Processing Payment</p>
                    </Row>
                </>
                :
                <React.Fragment>
                    {
                        this.state.stage == 0 ?
                            <PaymentWizard logo={this.state.logo} onSubmitStepOne={this.handleSubmitStepOne} onSubmitStepThree={this.handleSubmitStepThree} />
                            :
                            this.state.stage == 1 ?
                                <>
                                    <PaymentWizardStep2 logo={this.state.logo} onSubmitStepTwo={this.handleSubmitStepTwo} />
                                </>
                                :
                                <PaymentDoneMulti logo={this.state.logo} onSubmitStepThree={this.handleSubmitStepThree} />
                    }
                </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    const { creating, error } = state.paymentRequest
    const { profileSummary } = state.dashboard
    return {
        creating,
        error,
        profileSummary
    }
}

const paywizH = connect(mapStateToProps)(PaymentWizardHandler)

export default paywizH

