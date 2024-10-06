// import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import './app.local.css'
// import ChooseDentist from './ChooseDentist'
// import { Link } from 'react-router-dom'
// import Logo from '../assets/img/logo-bookc.png'
// import PoweredBy from './CommonUi/PoweredBy'
// import './style.css';

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

//   handleSelectedButton = (value) => {
//     this.setState({value})
//   }

//   render () {
//     const appointmentType = this.state.value
//     return (
//       <div>
//         <div className='dashboard-container'>
//           <div className="pageBody">
//             <div className="page-header">
//               <div className="title pageHeader">
//                 <img className='bookcLogo' src={Logo} alt={Logo}/>
//               </div>
//               <span className='appointmentStep'>Appointment type</span>
//             </div>
//             <div>
//               <div className="decorLine demo_mt15"></div>
//               <div className='body'>
//                 <div className="stepCards">
//                   <ChooseDentist onSelect={this.handleSelectedButton}/>
//                   <Link
//                     className='stepBtn'
//                     to={{pathname: '/booking-step-two', state: {appointmentType}}}
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

// BookingStepOne.propTypes = {
//   classes: PropTypes.object,
// }

// export default withStyles(styles)(BookingStepOne)
