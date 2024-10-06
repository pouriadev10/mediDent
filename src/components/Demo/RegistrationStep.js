// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { authenticationActions } from '../actions'
// import './app.local.css'
// import { Link } from 'react-router-dom'
// import Logo from '../assets/img/logo-bookc.png'
// import PoweredBy from './CommonUi/PoweredBy'
// import './style.css';

// class RegistrationStep extends Component {
//   constructor (props) {
//     super(props)

//     this.props.dispatch(authenticationActions.logout())

//     this.state = {
//       email: '',
//       firstName: '',
//       lastName: '',
//       birthDay: '',
//       phoneNumber: ''
//     }

//     this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
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

//   handleChange (e) {
//     const {name, value} = e.target
//     this.setState({[name]: value})
//   }

//   render () {
//     return (
//       <div>
//         <div className="dashboard-container">
//           <div className="pageBody">
//             <div className="page-header">
//               <div className="title pageHeader">
//                 <img className='bookcLogo' src={Logo} alt={Logo}/>
//               </div>
//               <span className='appointmentStep'>Patient information</span>
//             </div>
//             <div>
//               <div className='body'>
//                 <div className='summaryInfo'>
//                   <div className='summaryCard demo_mt10'>
//                     <div className="decorLine"></div>
//                     <div className='demo_registration-field demo_mt10'  >
//                       <TextField
//                         label="First Name"
//                         className="em"
//                         type="firstName"
//                         name="firstName"
//                         fullWidth
//                         autoComplete="firstName"
//                         onChange={this.handleChange}
//                       />
//                     </div>
//                     <div className='demo_registration-field'  >
//                       <TextField
//                         id="outlined-password-input"
//                         label="Last Name"
//                         className="pass"
//                         name="lastName"
//                         type="lastName"
//                         fullWidth
//                         autoComplete="lastName"
//                         onChange={this.handleChange}
//                       />
//                     </div>
//                     <div className='demo_registration-field'  >
//                       <TextField
//                         id="outlined-password-input"
//                         label="Date of Birth"
//                         className="pass"
//                         name="birthDay"
//                         type="birthDay"
//                         fullWidth
//                         autoComplete="birthDay"
//                         onChange={this.handleChange}
//                       />
//                     </div>
//                     <div className='demo_registration-field'  >
//                       <TextField
//                         id="outlined-password-input"
//                         label="Email"
//                         className="pass"
//                         name="email"
//                         type="email"
//                         fullWidth
//                         autoComplete="email"
//                         onChange={this.handleChange}
//                       />
//                     </div>
//                     <div className='demo_registration-field'  >
//                       <TextField
//                         id="outlined-password-input"
//                         label="Phone Number"
//                         className="pass"
//                         name="phoneNumber"
//                         type="phoneNumber"
//                         fullWidth
//                         autoComplete="phoneNumber"
//                         onChange={this.handleChange}
//                       />
//                     </div>
//                   </div>
//                   <Link
//                     className='backBtn'
//                     to={{
//                       pathname: '/booking-step-three',
//                       state: {
//                         appointmentType: this.props.location.state.appointmentType,
//                         doctorName: this.props.location.state.doctorName,
//                         day: this.props.location.state.day,
//                         date: this.props.location.state.date,
//                         time: this.props.location.state.time
//                       }
//                     }}
//                   >
//                     Back
//                   </Link>
//                   <Link
//                     className='stepBtn'
//                     to={{
//                       pathname: '/booking-summary',
//                       state: {
//                         appointmentType: this.props.location.state.appointmentType,
//                         doctorName: this.props.location.state.doctorName,
//                         day: this.props.location.state.day,
//                         date: this.props.location.state.date,
//                         time: this.props.location.state.time,
//                         firstName: this.state.firstName,
//                         lastName: this.state.lastName,
//                         birthDay: this.state.birthDay,
//                         email: this.state.email,
//                         phoneNumber: this.state.phoneNumber
//                       }
//                     }}
//                   >
//                     Next
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <PoweredBy/>
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

// export default connectedRegistrationStep