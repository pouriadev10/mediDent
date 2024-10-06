import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import './style.css';

class CalendarThirtyMin extends Component {
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
        time: '08:30 am'
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
        time: '08:30 am'
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
        time: '08:30 am'
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
        time: '08:30 am'
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
        time: '08:30 am'
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
        time: '09:00 am'
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
        time: '09:00 am'
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
        time: '09:00 am'
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
        time: '09:00 am'
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
        time: '09:00 am'
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
        time: '09:30 am'
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
        time: '09:30 am'
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
        time: '09:30 am'
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
        time: '09:30 am'
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
        time: '09:30 am'
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
        time: '10:00 am'
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
        time: '10:00 am'
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
        time: '10:00 am'
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
        time: '10:00 am'
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
        time: '10:00 am'
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
        time: '10:30 am'
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
        time: '10:30 am'
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
        time: '10:30 am'
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
        time: '10:30 am'
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
        time: '10:30 am'
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
        time: '11:00 am'
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
        time: '11:00 am'
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
        time: '11:00 am'
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
        time: '11:00 am'
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
        time: '11:00 am'
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
        time: '11:30 am'
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
        time: '11:30 am'
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
        time: '11:30 am'
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
        time: '11:30 am'
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
        time: '11:30 am'
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
        time: '12:00 pm'
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
        time: '12:00 pm'
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
        time: '12:00 pm'
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
        time: '12:00 pm'
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
        time: '12:00 pm'
      }
    })

  }

  handleSubmit46 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day,
        date: this.state.date,
        time: '12:30 pm'
      }
    })

  }



  handleSubmit47 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day1,
        date: this.state.date1,
        time: '12:30 pm'
      }
    })

  }



  handleSubmit48 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day2,
        date: this.state.date2,
        time: '12:30 pm'
      }
    })

  }



  handleSubmit49 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day3,
        date: this.state.date3,
        time: '12:30 pm'
      }
    })

  }



  handleSubmit50 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day4,
        date: this.state.date4,
        time: '12:30 pm'
      }
    })

  }
  handleSubmit51 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day,
        date: this.state.date,
        time: '13:00 pm'
      }
    })

  }



  handleSubmit52 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day1,
        date: this.state.date1,
        time: '13:00 pm'
      }
    })

  }



  handleSubmit53 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day2,
        date: this.state.date2,
        time: '13:00 pm'
      }
    })

  }



  handleSubmit54 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day3,
        date: this.state.date3,
        time: '13:00 pm'
      }
    })

  }



  handleSubmit55 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day4,
        date: this.state.date4,
        time: '13:00 pm'
      }
    })

  }

  handleSubmit56 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day,
        date: this.state.date,
        time: '13:30 pm'
      }
    })

  }



  handleSubmit57 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day1,
        date: this.state.date1,
        time: '13:30 pm'
      }
    })

  }



  handleSubmit58 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day2,
        date: this.state.date2,
        time: '13:30 pm'
      }
    })

  }



  handleSubmit59 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day3,
        date: this.state.date3,
        time: '13:30 pm'
      }
    })

  }



  handleSubmit60 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day4,
        date: this.state.date4,
        time: '13:30 pm'
      }
    })

  }

  handleSubmit61 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day,
        date: this.state.date,
        time: '14:00 pm'
      }
    })

  }



  handleSubmit62 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day1,
        date: this.state.date1,
        time: '14:00 pm'
      }
    })

  }



  handleSubmit63 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day2,
        date: this.state.date2,
        time: '14:00 pm'
      }
    })

  }



  handleSubmit64 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day3,
        date: this.state.date3,
        time: '14:00 pm'
      }
    })

  }



  handleSubmit65 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day4,
        date: this.state.date4,
        time: '14:00 pm'
      }
    })

  }

  handleSubmit66 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day,
        date: this.state.date,
        time: '14:30 pm'
      }
    })

  }



  handleSubmit67 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day1,
        date: this.state.date1,
        time: '14:30 pm'
      }
    })

  }



  handleSubmit68 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day2,
        date: this.state.date2,
        time: '14:30 pm'
      }
    })

  }



  handleSubmit69 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day3,
        date: this.state.date3,
        time: '14:30 pm'
      }
    })

  }



  handleSubmit70 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day4,
        date: this.state.date4,
        time: '14:30 pm'
      }
    })

  }

  handleSubmit71 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day,
        date: this.state.date,
        time: '15:00 pm'
      }
    })

  }



  handleSubmit72 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day1,
        date: this.state.date1,
        time: '15:00 pm'
      }
    })

  }



  handleSubmit73 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day2,
        date: this.state.date2,
        time: '15:00 pm'
      }
    })

  }



  handleSubmit74 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day3,
        date: this.state.date3,
        time: '15:00 pm'
      }
    })

  }



  handleSubmit75 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day4,
        date: this.state.date4,
        time: '15:00 pm'
      }
    })

  }

  handleSubmit76 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day,
        date: this.state.date,
        time: '15:30 pm'
      }
    })

  }



  handleSubmit77 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day1,
        date: this.state.date1,
        time: '15:30 pm'
      }
    })

  }



  handleSubmit78 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day2,
        date: this.state.date2,
        time: '15:30 pm'
      }
    })

  }



  handleSubmit79 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day3,
        date: this.state.date3,
        time: '15:30 pm'
      }
    })

  }



  handleSubmit80 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day4,
        date: this.state.date4,
        time: '15:30 pm'
      }
    })

  }

  handleSubmit81 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day,
        date: this.state.date,
        time: '16:00 pm'
      }
    })

  }



  handleSubmit82 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day1,
        date: this.state.date1,
        time: '16:00 pm'
      }
    })

  }



  handleSubmit83 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day2,
        date: this.state.date2,
        time: '16:00 pm'
      }
    })

  }



  handleSubmit84 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day3,
        date: this.state.date3,
        time: '16:00 pm'
      }
    })

  }



  handleSubmit85 () {
    this.props.history.push({
      pathname: '/booking-step-four',
      state: {
        appointmentType: this.props.location.state.appointmentType,
        doctorName: this.props.location.state.doctorName,
        day: this.state.day4,
        date: this.state.date4,
        time: '16:00 pm'
      }
    })

  }

  renderFirstWeek () {
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
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit3()} >08:00 am</Button>
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
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit6()} >08:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit7()} >08:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit8()} >08:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit9()} >08:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit10()} >08:30 am</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit11()} >09:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit12()} >09:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit13()} >09:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit14()} >09:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit15()} >09:00 am</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit16()} >09:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit17()} >09:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit18()} >09:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit19()} >09:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit20()} >09:30 am</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit21()} >10:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit22()} >10:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit23()} >10:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit24()} >10:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit25()} >10:00 am</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit26()} >10:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit27()} >10:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit28()} >10:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit29()} >10:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit30()} >10:30 am</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit31()} >11:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit32()} >11:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit33()} >11:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit34()} >11:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit35()} >11:00 am</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} disabled={true} onClick={() => this.handleSubmit36()} >11:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit37()} >11:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit38()} >11:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} disabled={true} onClick={() => this.handleSubmit39()} >11:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit40()} >11:30 am</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit41()} >12:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit42()} >12:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit43()} >12:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit44()} >12:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit45()} >12:00 pm</Button>
            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit46()} >12:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit47()} >12:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit48()} >12:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit49()} >12:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit50()} >12:30 pm</Button>
            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit51()} >13:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit52()} >13:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit53()} >13:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit54()} >13:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit55()} >13:00 pm</Button>
            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit56()} >13:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit57()} >13:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit58()} >13:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit59()} >13:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit60()} >13:30 pm</Button>
            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit61()} >14:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit62()} >14:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit63()} >14:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit64()} >14:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit65()} >14:00 pm</Button>
            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit66()} >14:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit67()} >14:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit68()} >14:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit69()} >14:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit70()} >14:30 pm</Button>
            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit71()} >15:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit72()} >15:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit73()} >15:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit74()} >15:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit75()} >15:00 pm</Button>
            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit76()} >15:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit77()} >15:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit78()} >15:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit79()} >15:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit80()} >15:30 pm</Button>
            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit81()} >16:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit82()} >16:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit83()} >16:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit84()} >16:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit85()} >16:00 pm</Button>
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
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit2()} >08:00 am</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit3()} >08:00 am</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit4()} >08:00 am</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit5()} >08:00 am</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit6()} >08:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit7()} >08:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit8()} >08:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit9()} >08:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit10()} >08:30 am</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit11()} >09:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit12()} >09:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit13()} >09:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit14()} >09:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit15()} >09:00 am</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit16()} >09:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit17()} >09:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit18()} >09:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit19()} >09:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit20()} >09:30 am</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit21()} >10:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit22()} >10:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit23()} >10:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit24()} >10:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit25()} >10:00 am</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit26()} >10:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit27()} >10:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit28()} >10:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit29()} >10:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit30()} >10:30 am</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit31()} >11:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit32()} >11:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit33()} >11:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit34()} >11:00 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit35()} >11:00 am</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit36()} >11:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit37()} >11:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit38()} >11:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit39()} >11:30 am</Button>

            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit40()} >11:30 am</Button>

            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit41()} >12:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit42()} >12:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit43()} >12:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit44()} >12:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit45()} >12:00 pm</Button>
            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit46()} >12:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit47()} >12:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit48()} >12:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit49()} >12:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit50()} >12:30 pm</Button>
            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit51()} >13:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit52()} >13:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit53()} >13:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit54()} >13:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit55()} >13:00 pm</Button>
            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit56()} >13:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit57()} >13:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit58()} >13:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit59()} >13:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit60()} >13:30 pm</Button>
            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit61()} >14:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit62()} >14:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit63()} >14:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit64()} >14:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit65()} >14:00 pm</Button>
            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit66()} >14:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit67()} >14:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit68()} >14:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit69()} >14:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit70()} >14:30 pm</Button>
            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit71()} >15:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit72()} >15:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit73()} >15:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit74()} >15:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit75()} >15:00 pm</Button>
            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit76()} >15:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit77()} >15:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit78()} >15:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit79()} >15:30 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit80()} >15:30 pm</Button>
            </div>
          </div>
        </div>
        <div className='calendarRow'>
          <div className="row">
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit81()} >16:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit82()} >16:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit83()} >16:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' disabled={true} onClick={() => this.handleSubmit84()} >16:00 pm</Button>
            </div>
            <div className='calendarColumn'>
              <Button className='btn timeBtn' onClick={() => this.handleSubmit85()} >16:00 pm</Button>
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
            <div className='calendarColumn dateColumn demo_ml0'>
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

export default withRouter(CalendarThirtyMin)