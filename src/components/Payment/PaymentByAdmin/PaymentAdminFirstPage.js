import { Modal, notification, Radio, Spin, Button, Card, Checkbox, Select, message } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { controller } from '../../../controller';
import { Paymentcontroller } from '../../../Paymentcontroller';
import '../../app.local.css';
import App from '../../stripe/App';
import SinglePaymentAdmin from './SinglePaymentAdmin';
import MultiPayment from './MultiPayment';
import CreateGurantorBillingForm from "./CreateGurantorBillingForm";

import rec from '../../../assets/icons/Rectangle 7734.png';
import rec2 from '../../../assets/icons/Rectangle 7733.png';

const { Option } = Select

class SelectPaymentMethod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentMode: 'loading',
            isDelete: false,
            loading: false,
            value: '',
            logo: '',
            inter: null,
            mainLoading: true,
            selectedPaymentType: null,
            payment_data: {},
            stripe_complete: true,
            intervals: [
                { id: '1', name: 'Single Payment' },
                { id: '2', name: 'Multiple Payments' },
            ],
            intervals2: [],
            selectedIntervalId: ''
        };

        this.checkDetail();
        this.getData();

        this.getData = this.getData.bind(this);
        this.handleIntervalChange = this.handleIntervalChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        const inter = localStorage.getItem('inter');
        this.setState({ inter });
        if (localStorage.getItem('inter') == 1 && localStorage.getItem('inter').length == 1) {
            localStorage.setItem("type", "single")
        } else {
            localStorage.setItem("type", "wizard")
        }
    }


    openNotification = (placement, message, status) => {
        if (status && status.toLowerCase().includes('success')) {
            notification.success({
                message: status,
                description: message,
                placement,
            });
        } else if (status && status.toLowerCase().includes('error')) {
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

    handleIntervalChange = (value, option) => {
        localStorage.setItem('wizard_recurring_interval_count', value);
        localStorage.setItem('wizard_recurring_interval_count_name', option.children);
        this.setState({ selectedIntervalId: value });
    };


    getLogo = async () => {
        const response = await Paymentcontroller.get_payment_wizard_data(this.props.paymentId);
        const response_logo = await Paymentcontroller.officeprofile(response.office);
        this.setState({ logo: response_logo.logo });
    };

    handleSubmit = async () => {
        if (localStorage.getItem('wizard_recurring_interval_count_name') === 'Single Payment') {
            this.setState({
                paymentMode: 'Single Payment',
            });
        } else {
            this.setState({
                paymentMode: 'Multi Payment',
            });
        }
    };

    handleSubmit2 = () => {
        this.setState({
            stripe_complete: true
        })
    };

    getPaymentData = async () => {
        const { paymentId } = this.props;
        this.setState({
            loading: true,
        });

        localStorage.setItem(
            "paymentId",
            paymentId
        );
        const response = await Paymentcontroller.get_payment_data(
            paymentId
        );
        if (response.paid || response.status == "subscription") {
            localStorage.setItem("Payment-Receipt", true);
            this.setState({
                paymentDoneState: true
            })
        } else {
            localStorage.setItem("Payment-Receipt", false);
            if (!response.billing_complete) {
                this.setState({
                    stripe_complete: false,
                });
            }
        }
        this.setState({
            payment_data: response,
            loading: false,
        });

    };

    checkDetail = async () => {
        const urlParts = window.location.href.split('/');
        const urlPaymentId = urlParts[urlParts.length - 1];
        const paymentId = urlPaymentId.match(/^\d+$/) ? urlPaymentId : this.props.paymentId;

        localStorage.setItem('paymentId', paymentId);

        const resp = await Paymentcontroller.checkMultiPaymentDone(paymentId);
        if (resp.status1 < 250 && resp.status) {
            window.location.href = '#/wizard-payment-Done';
        }

        const response = await Paymentcontroller.payment_detail(paymentId);
        if (response.status < 250) {
            if (response) {
                this.setState({ logo: response.office_logo });
            }
            const resp = await Paymentcontroller.checkPayment(paymentId);
            if (resp.status < 250) {
                if (resp.is_delete) {
                    this.setState({
                        isDelete: true,
                    });
                } else if (resp.paid || resp.status === 'subscription') {
                    localStorage.setItem('paymentId', paymentId);
                    localStorage.setItem('Payment-Receipt', true);
                    window.location.href = '#/payment-Done';
                }
            }
        }
        setTimeout(() => {
            this.setState({ mainLoading: false });
        }, 100);
    };

    getData = async () => {
        const { paymentId } = this.props;
        const response = await controller.getIntervalsForPayment(paymentId);
        this.setState({
            intervals2: response,
        });
    };

    getPaymentData = async () => {
        this.setState({
            loading: true,
        });

        const url = window.location.hash;
        const match = url.match(/payment\/(\d+)/);
        const selectedPaymentId = match ? match[1] : this.props.paymentId;

        localStorage.setItem('paymentId', selectedPaymentId);

        try {
            const response = await Paymentcontroller.get_payment_data(selectedPaymentId);
            if (response && response.interval_data) {
                this.setState({
                    payment_data: response,
                    loading: false,
                });
            } else {
                this.setState({
                    payment_data: { interval_data: [] },
                    loading: false,
                });
            }
        } catch (error) {
            this.setState({
                payment_data: { interval_data: [] },
                loading: false,
            });
        }
    };

    handleCheckboxChange = (selectedPaymentType) => {
        this.setState(
            (prevState) => ({
                selectedPaymentType: prevState.selectedPaymentType === selectedPaymentType ? null : selectedPaymentType,
            }),
            () => {
                this.getPaymentData()
                    .then(() => {
                        const effectivePaymentType = this.state.selectedPaymentType === 'Single Payment' ? 'single' : 'wizard';
                        localStorage.setItem('type', effectivePaymentType);
                        this.props.onSelectPaymentType(effectivePaymentType);

                        // Refresh the page after a short delay
                        setTimeout(() => {
                            window.location.reload();
                        }, 100);
                    })
                    .catch((error) => {
                        console.error('Failed to fetch or process payment data', error);
                    });
            }
        );
    };



    render() {
        console.log(this.props.available_interval)
        const { paymentId } = this.props;
        const { inter, selectedPaymentType } = this.state;
        return this.state.mainLoading ? (
            <div style={{ justifyContent: 'center', display: 'flex', height: '250px' }}>
                <Spin size="large" style={{ alignSelf: 'center' }} />
            </div>
        ) : (
            <div className="align-center-text" style={{padding: 25}}>
                {this.state.loading ? (
                    <div style={{ justifyContent: 'center', display: 'flex', height: '250px' }}>
                        <Spin size="large" style={{ alignSelf: 'center' }} />
                    </div>
                ) : (
                    <>
                        {!this.state.isDelete ? (
                            !this.state.stripe_complete ? (
                                <CreateGurantorBillingForm
                                    handleSubmit2={this.handleSubmit2} />
                            ) : (
                                inter && inter.length == 1 ? (
                                    inter == 1 ? (
                                        <SinglePaymentAdmin paymentId={paymentId} />
                                    ) : (
                                        <MultiPayment paymentId={paymentId} selectedIntervalId={this.state.selectedIntervalId} />
                                    )
                                ) : (
                                    <>
                                        <div style={{ marginBottom: 25, fontSize: 20, fontWeight: 600 }}>Payment Options</div>
                                        <Card style={{ width: '100%' }}>
                                            <div className="header_payment_page_part" style={{ marginBottom: 25 }}>Payment Options</div>
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '50%', marginLeft: 15 }}>
                                                <Card className={`custom-card12 ${selectedPaymentType === 'Recurring Payment' ? 'selected-card' : 'not-selected-card'}`} bordered={false} onClick={() => this.handleCheckboxChange('Recurring Payment')} style={{ cursor: "pointer" }}>
                                                    <div style={{ fontSize: 14, fontWeight: '600', color: '#6B43B5', zIndex: 1000, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: 18, left: 10 }}>
                                                        <p>Payment Plan</p>
                                                    </div>
                                                    {/* <Checkbox
                                                        onChange={() => this.handleCheckboxChange('Recurring Payment')}
                                                        checked={selectedPaymentType === 'Recurring Payment'}
                                                        className="custom-checkbox" />
                                                    {/* {selectedPaymentType === 'Recurring Payment' ? (
                                                        <img src={rec} alt="Recurring Payment" className="image-pay" />
                                                    ) : (
                                                        <img src={rec2} alt="" className="image-pay" />
                                                    )}  */}
                                                </Card>
                                                <Card className={`custom-card12 ${selectedPaymentType === 'Single Payment' ? 'selected-card' : 'not-selected-card'}`} bordered={false} onClick={() => this.handleCheckboxChange('Single Payment')} style={{ cursor: 'pointer' }}>
                                                    <div style={{ fontSize: 14, fontWeight: '600', color: '#6B43B5', zIndex: 1000, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: 18, left: 10 }}>
                                                        <p>Single Payment</p>
                                                    </div>
                                                    {/* <Checkbox
                                                        onChange={() => this.handleCheckboxChange('Single Payment')}
                                                        checked={selectedPaymentType === 'Single Payment'}
                                                        className="custom-checkbox" />
                                                    {/* {selectedPaymentType === 'Single Payment' ? (
                                                        <img src={rec} alt="Single Payment" className="image-pay" />
                                                    ) : (
                                                        <img src={rec2} alt="" className="image-pay" />
                                                    )} */}
                                                </Card>
                                            </div>
                                            {selectedPaymentType && (
                                                <div>
                                                    {selectedPaymentType === 'Single Payment' ? (
                                                        <></>
                                                    ) : (
                                                        <div>
                                                            <div>
                                                                <Select
                                                                    style={{ width: '18%', height: 42, border: '1px solid #6B43B5', borderRadius: '7px', marginTop: 15, marginLeft: 15, marginBottom: 10 }}
                                                                    placeholder='Select Months for Payment'
                                                                    onChange={this.handleIntervalChange} // Use the handler directly
                                                                    value={this.state.selectedIntervalId}
                                                                >
                                                                    {this.state.payment_data && this.state.payment_data.interval_data &&
                                                                        this.state.payment_data.interval_data
                                                                            .filter(interval => interval.interval !== '4 Days for Testing' && interval.interval !== 'Single Payment') // Filter out 'Single Payment'
                                                                            .map(interval => (
                                                                                <Option key={interval.id} value={interval.id}>
                                                                                    {interval.interval}
                                                                                </Option>
                                                                            ))}
                                                                </Select>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}


                                            {selectedPaymentType === 'Single Payment' ? (
                                                <div style={{ marginLeft: 15 }}>
                                                    <SinglePaymentAdmin paymentId={paymentId} />
                                                </div>
                                            ) : selectedPaymentType === 'Recurring Payment' ? (
                                                <MultiPayment paymentId={paymentId} selectedIntervalId={this.state.selectedIntervalId} />
                                            ) : null}


                                        </Card></>
                                )

                            )

                        ) : (
                            <React.Fragment>
                                <div className="header_payment_page_part">Deleted</div>
                                <hr className="endline_payment" />
                                <div style={{ padding: '15px', lineHeight: '30px' }} className="main_container_card">
                                    This payment request expired, and we've sent a new payment request for you.
                                </div>
                            </React.Fragment>
                        )
                        }
                        <div style={{ height: '15px' }}></div>
                        <Modal
                            onCancel={() => {
                                this.setState({ visibleModal: false });
                            }}
                            footer={null}
                            title="Payment"
                            visible={this.state.visibleModal}
                        >
                            <App />
                        </Modal>
                    </>
                )}
            </div >
        );
    }
}

function mapStateToProps(state) {
    const { creating, error } = state.paymentRequest;
    const { profileSummary } = state.dashboard;
    return {
        creating,
        error,
        profileSummary,
    };
}

const paywiz = connect(mapStateToProps)(SelectPaymentMethod);

export default paywiz;
