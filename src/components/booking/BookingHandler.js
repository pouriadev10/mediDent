import React, { Component } from 'react';
import BookingStepOne from './BookingStepOne';
import BookingStepThree from './BookingStepThree';
import BookingStepTwo from './BookingStepTwo';
import BookingSummary from './BookingSummary';
import DoneBooking from './DoneBooking';
import RegistrationStep from '../auth/RegistrationStep';
import  './style.css';

class BookingHandler extends Component {
  handleSubmitStepOne = (event) => {
    if (event == "done") {
      this.setState({ stage: 1 })
    }
  }
  handleSubmitStepTwo = (event) => {
    if (event == "done") {
      this.setState({ stage: 2 })
    }
    if (event == "reject") {
      this.setState({ stage: 0 })
    }
  }
  handleSubmitStepThree = (event) => {
    if (event == "done") {
      this.setState({ stage: 3 })
    }
    if (event == "reject") {
      this.setState({ stage: 1 })
    }
  }
  handleSubmitStepFour = (event) => {
    if (event == "done") {
      this.setState({ stage: 4 })
    }
    if (event == "reject") {
      this.setState({ stage: 2 })
    }
  }
  handleSubmitStepFive = (event) => {
    if (event == "done") {
      this.setState({ stage: 5 })
    }
    if (event == "reject") {
      this.setState({ stage: 3 })
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      stage: 0,
      loading: false,
    }
  }

  render() {
    return (
      this.state.loading ?
        <div>
          <div className='dashboard-container mt100' >
            <div className="pageBody" >
              <div className="page-header p60" >
                <div className='handler_body'>
                  <div className='body'>
                    <div className="stepCards">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        :
        this.state.stage == 0 ?
          <BookingStepOne hello="hello" onSubmitStepOne={this.handleSubmitStepOne} />
          :
          this.state.stage == 1 ?
            <BookingStepTwo onSubmitStepTwo={this.handleSubmitStepTwo} />
            :
            this.state.stage == 2 ?
              < BookingStepThree onSubmitStepThree={this.handleSubmitStepThree} />
              :
              this.state.stage == 3 ?
                <RegistrationStep onSubmitStepFour={this.handleSubmitStepFour} />
                :
                this.state.stage == 4 ?
                  <BookingSummary onSubmitStepFive={this.handleSubmitStepFive} />
                  :
                  this.state.stage == 5 ?
                    <DoneBooking />
                    :
                    <p>error</p>
    )
  }
}

export default BookingHandler
