// import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import Logo from '../assets/img/logo-bookc.png'
// import PoweredBy from './CommonUi/PoweredBy'
// import ViewOpenings from './ViewOpenings'
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

//     return (
//       <div>
//         <div className='dashboard-container'>
//           <div className="pageBody">
//             <div className="page-header">
//               <div className="title pageHeader">
//                 <img className='bookcLogo' src={Logo} alt={Logo}/>
//               </div>
//               <span className='appointmentStep'>Select Your Dentist</span>
//             </div>
//             <div>
//               <div className='body'>
//                 <div className="stepCards demo_mt15">
//                   <ViewOpenings
//                     appointmentType={this.props.location.state !== undefined ? this.props.location.state.appointmentType : 'implant'}/>
//                   <Link
//                     className='backBtn'
//                     to={{pathname: '/booking-step-one'}}
//                   >
//                     Back
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

// export default withStyles(styles)(BookingStepOne)
