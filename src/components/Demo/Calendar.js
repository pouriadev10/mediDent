import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import './style.css';

class Calendar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      appointmentType: '',
      doctorName: '',
      date: '',
      date1: '',
      date2: '',
      date3: '',
      date4: '',
      day: '',
      day1: '',
      day2: '',
      day3: '',
      day4: '',
      currentWeek: true,
      firstWeek: true,
      arrowNextColor: '#2F2F2F',
      arrowPastColor: '#dcdcdc'
    }
    this.handleNextWeek = this.handleNextWeek.bind(this)
    this.handleLastWeek = this.handleLastWeek.bind(this)
    this.renderFirstWeek = this.renderFirstWeek.bind(this)
    this.renderSecondWeek = this.renderSecondWeek.bind(this)
  }


  componentDidMount () {
    let date = new Date();
    let date1 = new Date();
    let date2 = new Date();
    let date3 = new Date();
    let date4 = new Date();
    date1.setDate(date.getDate()+1);
    date2.setDate(date1.getDate()+1);
    date3.setDate(date2.getDate()+1);
    date4.setDate(date3.getDate()+1);

    let day = String(date).substr(0, 3)
    let day1 = String(date1).substr(0, 3)
    let day2 = String(date2).substr(0, 3)
    let day3 = String(date3).substr(0, 3)
    let day4 = String(date4).substr(0, 3)

    let month = String(date).substr(4, 6)
    let month1 = String(date1).substr(4, 6)
    let month2 = String(date2).substr(4, 6)
    let month3 = String(date3).substr(4, 6)
    let month4 = String(date4).substr(4, 6)

    this.setState({
      date: month,
      date1: month1,
      date2: month2,
      date3: month3,
      date4: month4,
      day,
      day1,
      day2,
      day3,
      day4
    })

  }

  handleNextWeek() {
    if(this.state.currentWeek === true) {
      let date = new Date();
      let date1 = new Date();
      let date2 = new Date();
      let date3 = new Date();
      let date4 = new Date();
      date.setDate(date.getDate()+5)
      date1.setDate(date.getDate()+6);
      date2.setDate(date.getDate()+7);
      date3.setDate(date.getDate()+8);
      date4.setDate(date.getDate()+9);

      let day = String(date).substr(0, 3)
      let day1 = String(date1).substr(0, 3)
      let day2 = String(date2).substr(0, 3)
      let day3 = String(date3).substr(0, 3)
      let day4 = String(date4).substr(0, 3)

      let month = String(date).substr(4, 6)
      let month1 = String(date1).substr(4, 6)
      let month2 = String(date2).substr(4, 6)
      let month3 = String(date3).substr(4, 6)
      let month4 = String(date4).substr(4, 6)
      this.setState({
        date: month,
        date1: month1,
        date2: month2,
        date3: month3,
        date4: month4,
        day,
        day1,
        day2,
        day3,
        day4,
        currentWeek: false,
        firstWeek: false,
        arrowNextColor: '#dcdcdc',
        arrowPastColor: '#2f2f2f'
      })
    }
  }

  handleLastWeek() {
    if(this.state.currentWeek === false) {
      let date = new Date();
      let date1 = new Date();
      let date2 = new Date();
      let date3 = new Date();
      let date4 = new Date();
      date1.setDate(date.getDate()+1);
      date2.setDate(date1.getDate()+1);
      date3.setDate(date2.getDate()+1);
      date4.setDate(date3.getDate()+1);

      let day = String(date).substr(0, 3)
      let day1 = String(date1).substr(0, 3)
      let day2 = String(date2).substr(0, 3)
      let day3 = String(date3).substr(0, 3)
      let day4 = String(date4).substr(0, 3)

      let month = String(date).substr(4, 6)
      let month1 = String(date1).substr(4, 6)
      let month2 = String(date2).substr(4, 6)
      let month3 = String(date3).substr(4, 6)
      let month4 = String(date4).substr(4, 6)

      this.setState({
        date: month,
        date1: month1,
        date2: month2,
        date3: month3,
        date4: month4,
        day,
        day1,
        day2,
        day3,
        day4,
        currentWeek: true,
        firstWeek: true,
        arrowNextColor: '#2f2f2f',
        arrowPastColor: '#dcdcdc'
      })
    }
  }


  handleSubmit1 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day,
        date: this.state.date,
        time: '08:00 am'
      }
    })
  }



  handleSubmit2 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day1,
        date: this.state.date1,
        time: '08:00 am'
      }
    })

  }



  handleSubmit3 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day2,
        date: this.state.date2,
        time: '08:00 am'
      }
    })

  }



  handleSubmit4 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day3,
        date: this.state.date3,
        time: '08:00 am'
      }
    })

  }



  handleSubmit5 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day4,
        date: this.state.date4,
        time: '08:00 am'
      }
    })

  }



  handleSubmit6 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day,
        date: this.state.date,
        time: '09:00 am'
      }
    })

  }

  handleSubmit7 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day1,
        date: this.state.date1,
        time: '09:00 am'
      }
    })

  }

  handleSubmit8 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day2,
        date: this.state.date2,
        time: '09:00 am'
      }
    })

  }



  handleSubmit9 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day3,
        date: this.state.date3,
        time: '09:00 am'
      }
    })

  }



  handleSubmit10 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day4,
        date: this.state.date4,
        time: '09:00 am'
      }
    })

  }



  handleSubmit11 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day,
        date: this.state.date,
        time: '10:00 am'
      }
    })

  }



  handleSubmit12 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day1,
        date: this.state.date1,
        time: '10:00 am'
      }
    })

  }



  handleSubmit13 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day2,
        date: this.state.date2,
        time: '10:00 am'
      }
    })

  }



  handleSubmit14 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day3,
        date: this.state.date3,
        time: '10:00 am'
      }
    })

  }



  handleSubmit15 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day4,
        date: this.state.date4,
        time: '10:00 am'
      }
    })

  }



  handleSubmit16 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day,
        date: this.state.date,
        time: '11:00 am'
      }
    })

  }



  handleSubmit17 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day1,
        date: this.state.date1,
        time: '11:00 am'
      }
    })

  }



  handleSubmit18 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day2,
        date: this.state.date2,
        time: '11:00 am'
      }
    })

  }



  handleSubmit19 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day3,
        date: this.state.date3,
        time: '11:00 am'
      }
    })

  }



  handleSubmit20 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day4,
        date: this.state.date4,
        time: '11:00 am'
      }
    })

  }



  handleSubmit21 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day,
        date: this.state.date,
        time: '12:00 pm'
      }
    })

  }



  handleSubmit22 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day1,
        date: this.state.date1,
        time: '12:00 pm'
      }
    })

  }



  handleSubmit23 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day2,
        date: this.state.date2,
        time: '12:00 pm'
      }
    })

  }



  handleSubmit24 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day3,
        date: this.state.date3,
        time: '12:00 pm'
      }
    })

  }



  handleSubmit25 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day4,
        date: this.state.date4,
        time: '12:00 pm'
      }
    })

  }



  handleSubmit26 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day,
        date: this.state.date,
        time: '01:00 pm'
      }
    })

  }



  handleSubmit27 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day1,
        date: this.state.date1,
        time: '01:00 pm'
      }
    })

  }



  handleSubmit28 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day2,
        date: this.state.date2,
        time: '01:00 pm'
      }
    })

  }



  handleSubmit29 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day3,
        date: this.state.date3,
        time: '01:00 pm'
      }
    })

  }



  handleSubmit30 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day4,
        date: this.state.date4,
        time: '01:00 pm'
      }
    })

  }



  handleSubmit31 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day,
        date: this.state.date,
        time: '02:00 pm'
      }
    })

  }



  handleSubmit32 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day1,
        date: this.state.date1,
        time: '02:00 pm'
      }
    })

  }



  handleSubmit33 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day2,
        date: this.state.date2,
        time: '02:00 pm'
      }
    })

  }



  handleSubmit34 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day3,
        date: this.state.date3,
        time: '02:00 pm'
      }
    })

  }



  handleSubmit35 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day4,
        date: this.state.date4,
        time: '02:00 pm'
      }
    })

  }



  handleSubmit36 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day,
        date: this.state.date,
        time: '03:00 pm'
      }
    })

  }



  handleSubmit37 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day1,
        date: this.state.date1,
        time: '03:00 pm'
      }
    })

  }



  handleSubmit38 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day2,
        date: this.state.date2,
        time: '03:00 pm'
      }
    })

  }



  handleSubmit39 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day3,
        date: this.state.date3,
        time: '03:00 pm'
      }
    })

  }



  handleSubmit40 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day4,
        date: this.state.date4,
        time: '03:00 pm'
      }
    })

  }



  handleSubmit41 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day,
        date: this.state.date,
        time: '04:00 pm'
      }
    })

  }



  handleSubmit42 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day1,
        date: this.state.date1,
        time: '04:00 pm'
      }
    })

  }



  handleSubmit43 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day2,
        date: this.state.date2,
        time: '04:00 pm'
      }
    })

  }



  handleSubmit44 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day3,
        date: this.state.date3,
        time: '04:00 pm'
      }
    })

  }



  handleSubmit45 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day4,
        date: this.state.date4,
        time: '04:00 pm'
      }
    })

  }

  renderFirstWeek () {
    return (
      <div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit1()} >08:00 am</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit2()} >08:00 am</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit3()} >08:00 am</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit4()} >08:00 am</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit5()} >08:00 am</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit6()} >09:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit7()} >09:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit8()} >09:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit9()} >09:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit10()} >09:00 am</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit11()} >10:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit12()} >10:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit13()} >10:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit14()} >10:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit15()} >10:00 am</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit16()} >11:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit17()} >11:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit18()} >11:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit19()} >11:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit20()} >11:00 am</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit21()} >12:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit22()} >12:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit23()} >12:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit24()} >12:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit25()} >12:00 pm</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit26()} >01:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit27()} >01:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit28()} >01:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit29()} >01:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit30()} >01:00 pm</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit31()} >02:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit32()} >02:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit33()} >02:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit34()} >02:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit35()} >02:00 pm</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit36()} >03:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit37()} >03:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit38()} >03:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit39()} >03:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit40()} >03:00 pm</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit41()} >04:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit42()} >04:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit43()} >04:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit44()} >04:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit45()} >04:00 pm</Button>

            </div>
          </div>
        </div>
      </div>
    )
  }

  renderSecondWeek () {
    return (
      <div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit1()} >08:00 am</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit2()} >08:00 am</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit3()} >08:00 am</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit4()} >08:00 am</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit5()} >08:00 am</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit6()} >09:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit7()} >09:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit8()} >09:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit9()} >09:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit10()} >09:00 am</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit11()} >10:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit12()} >10:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit13()} >10:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit14()} >10:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit15()} >10:00 am</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit16()} >11:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit17()} >11:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit18()} >11:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit19()} >11:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit20()} >11:00 am</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit21()} >12:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit22()} >12:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit23()} >12:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit24()} >12:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit25()} >12:00 pm</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit26()} >01:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit27()} >01:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit28()} >01:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit29()} >01:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit30()} >01:00 pm</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit31()} >02:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit32()} >02:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit33()} >02:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit34()} >02:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit35()} >02:00 pm</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit36()} >03:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit37()} >03:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit38()} >03:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit39()} >03:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit40()} >03:00 pm</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit41()} >04:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit42()} >04:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit43()} >04:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit44()} >04:00 pm</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit45()} >04:00 pm</Button>

            </div>
          </div>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className='calendarBody demo_mb25'>
        <div className='dateRow'>
          <div className="row">
            <div
              onClick={() => (this.handleLastWeek())}
              className="lastWeek"
            >
              <FontAwesomeIcon
                className='faCalendar arrowBtn'
                icon={faAngleLeft}
                style={{ color: this.state.arrowPastColor }}
              />
            </div>
            <div className='calendarColumn dateColumn'>
              <span className='day'>{this.state.day}</span>
              <span className='exactDate'>{this.state.date}</span>
            </div>
            <div className='calendarColumn dateColumn'>
              <span className='day'>{this.state.day1}</span>
              <span className='exactDate'>{this.state.date1}</span>
            </div>
            <div className='calendarColumn dateColumn'>
              <span className='day'>{this.state.day2}</span>
              <span className='exactDate'>{this.state.date2}</span>
            </div>
            <div className='calendarColumn dateColumn'>
              <span className='day'>{this.state.day3}</span>
              <span className='exactDate'>{this.state.date3}</span>
            </div>
            <div className='calendarColumn dateColumn'>
              <span className='day'>{this.state.day4}</span>
              <span className='exactDate'>{this.state.date4}</span>
            </div>
            <div
              onClick={() => (this.handleNextWeek())}
              className="nextWeek"
            >
              <FontAwesomeIcon
                className='faCalendar arrowBtn'
                icon={faAngleRight}
                style={{ color: this.state.arrowNextColor }}
              />
            </div>
          </div>
        </div>
        <hr/>
        {
          this.state.firstWeek === true ? this.renderFirstWeek() : this.renderSecondWeek()
        }
      </div>
    )
  }
}

export default withRouter(Calendar)