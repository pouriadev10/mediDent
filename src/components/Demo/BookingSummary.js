// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { authenticationActions } from '../actions'
// import './app.local.css'
// import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'
// import Logo from '../assets/img/logo-bookc.png'
// import PoweredBy from './CommonUi/PoweredBy'
// import axios from 'axios'
// import { withRouter } from 'react-router-dom'
// import './style.css';

// class RegistrationStep extends Component {
//   constructor (props) {
//     super(props)

//     this.state = {
//       paymentType: '',
//       open: false,
//       appointmentType: '',
//       doctorName: '',
//       day: '',
//       date: '',
//       time: '',
//       firstName: '',
//       lastName: '',
//       birthDay: '',
//       email: '',
//       phoneNumber: '',
//       comment: '',
//       labelWidth: 120
//     }
//     this.handleRequest = this.handleRequest.bind(this)
//     this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }

//   handleChangeDropDown = event => {
//     this.setState({[event.target.name]: event.target.value})
//   }

//   handleClose = () => {
//     this.setState({open: false})
//   }

//   handleOpen = () => {
//     this.setState({open: true})
//   }

//   handleSubmit (e) {
//     e.preventDefault()

//     this.setState({submitted: true})

//     if (this.state.auth_nonce) {
//       const {email, password, auth_nonce} = this.state

//       if (email && password && auth_nonce) {
//         this.props.dispatch(authenticationActions.login(email, password, auth_nonce))
//       } else {
//         console.error('incomplete form')
//       }
//     } else {
//       const {email, password} = this.state

//       if (email && password) {
//         this.props.dispatch(authenticationActions.sendLoginEmail(email, password))
//       }
//     }
//   }

//   handleRequest () {
//     axios.post('http://demo.bookc.com:8000/clinics/appointment/', {
//       firstName: this.state.firstName,
//       lastName: this.state.lastName,
//       email: this.state.email,
//       appointmentType: this.state.appointmentType,
//       dentist: this.state.doctorName,
//       time: this.state.time,
//       day: this.state.day,
//       date: this.state.date,
//       paymentMethod: this.state.paymentType,
//       phoneNumber: this.state.phoneNumber
//     })
//       .then(function (response) {
//         this.props.history.push({
//           pathname: '/done'
//         })
//       })
//   }

//   componentDidMount () {
//     let type = ''
//     if (this.props.location.state !== undefined) {
//       if (this.props.location.state.appointmentType === 'implant') {
//         type = 'Dental implant consult (30 min)'
//       } else if (this.props.location.state.appointmentType === 'Invisalign') {
//         type = 'Invisalign consult (30 min)'
//       } else if (this.props.location.state.appointmentType === 'adult-cleaning') {
//         type = 'New patient cleaning - Adult (60 min)'
//       } else if (this.props.location.state.appointmentType === 'child-cleaning') {
//         type = 'New patient cleaning – Child (60 min)'
//       } else if (this.props.location.state.appointmentType === 'adult-exam') {
//         type = 'New patient exam- Adult (30 min)'
//       } else if (this.props.location.state.appointmentType === 'child-exam') {
//         type = 'New patient exam- Child (30 min)'
//       } else if (this.props.location.state.appointmentType === 'emergency') {
//         type = 'Emergency/Tooth pain (30 min)'
//       }
//     }

//     this.setState({
//       appointmentType: type,
//       doctorName: this.props.location.state.doctorName,
//       day: this.props.location.state.day,
//       date: this.props.location.state.date,
//       time: this.props.location.state.time,
//       firstName: this.props.location.state.firstName,
//       lastName: this.props.location.state.lastName,
//       birthDay: this.props.location.state.birthDay,
//       email: this.props.location.state.email,
//       phoneNumber: this.props.location.state.phoneNumber
//     })
//   }

//   handleChange (e) {
//     const {name, value} = e.target
//     this.setState({[name]: value})
//   }

//   render () {
//     const {classes} = this.props
//     return (
//       <div className="dashboard-container">
//         <div className="pageBody">
//           <div className="page-header">
//             <div className="title pageHeader">
//               <img className='bookcLogo' src={Logo} alt={Logo}/>
//             </div>
//             <span className='appointmentStep'>Book Your Appointment</span>
//           </div>
//           <div className='body'>
//             <div className='summaryInfo'>
//               <div className='summaryCard demo_mt10'>
//                 <div className="decorLine"></div>
//                 <span className='summaryDetails pt16'>{this.state.doctorName}</span>
//                 <span className='appInfo'>Appointment</span>
//                 <span className='summaryDetails'>{this.state.day}{', '}{this.state.date}{' - '}{this.state.time}</span>
//                 <span className='appInfo'>Reason for Visit</span>
//                 <span className='summaryDetails'>{this.state.appointmentType}</span>
//               </div>
//             </div>
//           </div>
//           <div className='body'>
//             <div className='summaryInfo mw300'>
//               <div className='summaryCard'>
//                 <span className='appInfo'>Name</span>
//                 <span className='summaryDetails'>{this.state.firstName}{' '}{this.state.lastName}</span>
//                 <span className='appInfo'>Date of Birth</span>
//                 <span className='summaryDetails'>{this.state.birthDay}</span>
//                 <span className='appInfo'>Email</span>
//                 <span className='summaryDetails'>{this.state.email}</span>
//                 <span className='appInfo'>Phone Number</span>
//                 <span className='summaryDetails'>{this.state.phoneNumber}</span>
//               </div>
//             </div>
//           </div>
//           <div className='body'>
//             <div className='summaryInfo mw300'>
//               <div className='summaryCard'>
//                 <form autoComplete="off">
//                   <FormControl variant="outlined" className='dropDown'>
//                     <InputLabel
//                       htmlFor="outlined-age-simple"
//                     >
//                       Payment Method
//                     </InputLabel>
//                     <Select
//                       value={this.state.paymentType}
//                       onChange={this.handleChangeDropDown}
//                       input={
//                         <OutlinedInput
//                           labelWidth={this.state.labelWidth}
//                           name="paymentType"
//                           id="outlined-age-simple"
//                         />
//                       }
//                     >
//                       <MenuItem value='myself'>I will pay myself</MenuItem>
//                       <MenuItem value='creditCard'>Visa/Credit</MenuItem>
//                       <MenuItem value='insurance'>Insurance</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </form>
//                 <div className='demo_pass'>
//                   <TextField
//                     id="outlined-password-input"
//                     label="Optional Message"
//                     className="pass"
//                     name="Optional Message"
//                     type="Optional Message"
//                     fullWidth
//                     autoComplete="Optional Message"
//                   />
//                 </div>
//               </div>
//               <Link
//                 className='backBtn'
//                 to={{
//                   pathname: '/booking-step-four',
//                   state: {
//                     appointmentType: this.props.location.state.appointmentType,
//                     doctorName: this.state.doctorName,
//                     day: this.state.day,
//                     date: this.state.date,
//                     time: this.state.time,
//                     firstName: this.state.firstName,
//                     lastName: this.state.lastName,
//                     birthDay: this.state.birthDay,
//                     email: this.state.email,
//                     phoneNumber: this.state.phoneNumber
//                   }
//                 }}
//               >
//                 Back
//               </Link>
//               <Link
//                 className='stepBtn'
//                 to={{pathname: '/done',
//                   state: {
//                     email: this.state.email
//                   }}}
//                 onClick={() => (this.handleRequest())}
//               >
//                 Book Appointment
//               </Link>
//             </div>
//           </div>
//           <PoweredBy/>
//         </div>
//       </div>
//     )
//   }
// }

// function mapStateToProps (state) {
//   const {sendingLoginEmail, loginEmailSent, loggingIn, error} = state.authentication
//   return {
//     sendingLoginEmail,
//     loginEmailSent,
//     loggingIn,
//     error
//   }
// }

// const connectedRegistrationStep = connect(mapStateToProps)(RegistrationStep)

// export default withRouter(connectedRegistrationStep)