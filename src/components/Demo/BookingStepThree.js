// import React, { Component } from 'react'
// import { Scrollbars } from 'react-custom-scrollbars'
// import { Link } from 'react-router-dom'
// import Logo from '../assets/img/logo-bookc.png'
// import Calendar from './Calendar'
// import CalendarThirtyMin from './CalendarThirtyMin'
// import PoweredBy from './CommonUi/PoweredBy'
// import './app.local.css'
// import './style.css'

// const styles = theme => ({
//   root: {
//     width: '90%',
//   },
//   iconContainer: {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     borderRadius: 3,
//     border: 0,
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//   },
//   button: {
//     marginRight: theme.spacing.unit,
//   },
//   instructions: {
//     marginTop: theme.spacing.unit,
//     marginBottom: theme.spacing.unit,
//   },
//   connectorActive: {
//     '& $connectorLine': {
//       borderColor: theme.palette.secondary.main,
//     },
//   },
//   connectorCompleted: {
//     '& $connectorLine': {
//       borderColor: theme.palette.primary.main,
//     },
//   },
//   connectorDisabled: {
//     '& $connectorLine': {
//       borderColor: theme.palette.grey[100],
//     },
//   },
//   connectorLine: {
//     transition: theme.transitions.create('border-color'),
//   },
// })

// class BookingStepOne extends Component {
//   state = {
//     activeStep: 0,
//     value: 'implant',
//     action: true
//   }

//   render () {
//     const value = this.state.value
//     let calendar
//     if (this.props.location.state.appointmentType === 'adult-cleaning' || this.props.location.state.appointmentType === 'child-cleaning') {
//       calendar = <Calendar style={{marginBottom: '25px'}}/>
//     } else {
//       calendar = <CalendarThirtyMin style={{marginBottom: '25px'}}/>
//     }
//     return (
//       <div>
//         <div className='dashboard-container'>
//           <div className="pageBody">
//             <div className="page-header">
//               <div className="title pageHeader">
//                 <img className='bookcLogo' src={Logo} alt={Logo}/>
//               </div>
//               <span className='appointmentStep'>Pick your appointment date</span>
//             </div>
//             <div>
//               <div className='body'>
//                 <div className='summaryInfo'>
//                   <div className='summaryCard demo_mt10'>
//                     <div className="decorLine"></div>
//                     <Scrollbars
//                       autoHide
//                       autoHideDuration={500}
//                       autoHeight
//                       autoHeightMin={100}
//                       autoHeightMax={2000}
//                     >
//                       <div className="stepCards scrollBox demo_mt15"  >
//                         {calendar}
//                       </div>
//                     </Scrollbars>
//                   </div>
//                 </div>
//               </div>
//               <Link
//                 className='backBtn'
//                 to={{
//                   pathname: '/booking-step-two',
//                   status: {
//                     appointmentType: this.props.location.state !== undefined ? this.props.location.state.appointmentType : '',
//                     doctorName: this.props.location.state !== undefined ? this.props.location.state.doctorName : ''
//                   }
//                 }}
//               >
//                 Back
//               </Link>
//             </div>
//           </div>
//         </div>
//         <PoweredBy/>
//       </div>
//     )
//   }
// }

// export default withStyles(styles)(BookingStepOne)
