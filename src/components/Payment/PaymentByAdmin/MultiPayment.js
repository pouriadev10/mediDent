import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Paymentcontroller } from '../../../Paymentcontroller';
import PaymentDoneMulti from './PaymentDoneMulti';
import PaymentWizard from './PaymentWizard';
import PaymentWizardStep2 from './PaymentWizardStep2';

class MultiPayment extends Component {
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
        const { paymentId } = this.props;

        const response = await Paymentcontroller.get_payment_wizard_data(
            paymentId
        )
        const response_logo = await Paymentcontroller.officeprofile(response.office)
        this.setState({ logo: response_logo.logo })

    }

    constructor(props) {
        super(props)
        this.state = {
            stage: 0,
            logo: ""
        }

        this.getLogo()
        this.handleSubmitStepOne = this.handleSubmitStepOne.bind(this)
    }
    dismiss() {
        this.props.unmountMe();
    }
    render() {
        const { paymentId } = this.props;
        return (
            <div>
                {
                    this.state.stage == 0 ?
                        <PaymentWizard paymentId={paymentId} logo={this.state.logo} onSubmitStepOne={this.handleSubmitStepOne} onSubmitStepThree={this.handleSubmitStepThree} />
                        :
                        this.state.stage == 1 ?
                            <>
                                <PaymentWizardStep2 paymentId={paymentId} logo={this.state.logo} onSubmitStepTwo={this.handleSubmitStepTwo} selectedIntervalId={this.props.selectedIntervalId} />
                            </>
                            :
                            <PaymentDoneMulti paymentId={paymentId} logo={this.state.logo} onSubmitStepThree={this.handleSubmitStepThree} />
                }
            </div>
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

const paywizH = connect(mapStateToProps)(MultiPayment)

export default paywizH

