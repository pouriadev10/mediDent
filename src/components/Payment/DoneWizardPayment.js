import React, { Component } from 'react'
import '../app.local.css'
import Logo from '../../assets/img/logo-bookc.png'
import PoweredBy from '../CommonUi/PoweredBy'
import { Paymentcontroller } from '../../Paymentcontroller'
import { connect } from 'react-redux'
class DoneWizardPayment extends Component {



  getData = async () => {
    if (window.location.href.split("/") &&
      window.location.href.split("/")[window.location.href.split("/").length - 1]
    ) {
      const response = await Paymentcontroller.get_payment_wizard_data(
        window.location.href.split("/")[window.location.href.split("/").length - 1]
      )
      if (response.subscription) {
        const responseSubscription = await Paymentcontroller.get_clinics_subscription_data(
          response.subscription
        )
        const strPhone = responseSubscription.customer_phone.substring(0, 3) + " " + responseSubscription.customer_phone.substring(3, 6) + " " + responseSubscription.customer_phone.substr(6)
        responseSubscription.customer_phone = strPhone
        this.setState({ data: responseSubscription })
      }


    }

  }


  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }

    this.getData();
  }
  dismiss() {
    this.props.unmountMe();
  }
  render() {

    return (
      <div>
        <div className='dashboard-container'>
          <div className="pageBody wizard-page">
            <div className="page-header">
              <div className="title pageHeader">
                {
                  this.props.logo ?
                    <img className='bookcLogo' src={this.props.logo} alt={Logo} />
                    :
                    <></>
                }
              </div>
            </div>
            <div>
              <div className="decorLine" style={{ marginTop: '15px' }}></div>
              <div className='body'>
                <div className="stepCards">
                  <div className='muiCardBody' style={{ marginBottom: '25px' }}>
                    <div className='muiCard'>
                      <div style={{ marginTop: '15px' }}></div>
                      <div>
                        <div style={{ marginTop: '15px' }}></div>
                        <br />
                        <svg fill="#25b96d" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><path d="M 25 2 C 12.317 2 2 12.317 2 25 C 2 37.683 12.317 48 25 48 C 37.683 48 48 37.683 48 25 C 48 20.44 46.660281 16.189328 44.363281 12.611328 L 42.994141 14.228516 C 44.889141 17.382516 46 21.06 46 25 C 46 36.579 36.579 46 25 46 C 13.421 46 4 36.579 4 25 C 4 13.421 13.421 4 25 4 C 30.443 4 35.393906 6.0997656 39.128906 9.5097656 L 40.4375 7.9648438 C 36.3525 4.2598437 30.935 2 25 2 z M 43.236328 7.7539062 L 23.914062 30.554688 L 15.78125 22.96875 L 14.417969 24.431641 L 24.083984 33.447266 L 44.763672 9.046875 L 43.236328 7.7539062 z" />
                        </svg>

                        <div style={{ marginTop: '15px' }}></div>
                        <p style={{ color: "#25b96d", fontSize: "20px" }}>successfully completed!</p>
                        <hr className='endline_payment' />
                        <div className='header_payment_page_part'>
                          Price
                        </div>
                        <div className='main_container_card '>

                          <div>
                            <div>Installment Period</div>
                            <div>Monthly Amount</div>
                            <div>Total Amount</div>
                          </div>
                          <div className='align_rights_items'>

                            <div>{this.state.data.recurring_interval_count ? this.state.data.recurring_interval_count : "-"}{"-"}{this.state.data.recurring_interval ? this.state.data.recurring_interval : "-"}</div>
                            <div> {this.state.data.recurring_amount ? this.state.data.recurring_amount : "-"}</div>
                            <div>{this.state.data.total_amount ? this.state.data.total_amount : "-"}</div>
                          </div>
                        </div>
                        <hr className='endline_payment' />
                        <div className='header_payment_page_part'>
                          Customer
                        </div>
                        <div className='main_container_card '>

                          <div>
                            <div>Full Name</div>
                            <div>Phone</div>
                            <div>Email</div>
                          </div>
                          <div className='align_rights_items'>

                            <div>{this.state.data.customer_fullname ? this.state.data.customer_fullname : "-"}</div>
                            <div>+1 {this.state.data.customer_phone ? this.state.data.customer_phone : "-"}</div>
                            <div>{this.state.data.customer_email ? this.state.data.customer_email : "-"}</div>
                            <br />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PoweredBy />
      </div >
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

const paywizDone = connect(mapStateToProps)(DoneWizardPayment)

export default paywizDone
