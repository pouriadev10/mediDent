// import React from 'react';
// import PropTypes from 'prop-types';
// import "./app.local.css";
// import avatarOne from '../assets/img/imgo.jpg'
// import avatarTwo from '../assets/img/imgo3.jpg'
// import avatarThree from '../assets/img/imgo4.jpg'
// import { Link } from 'react-router-dom'

// const styles = { 
//   bullet: {
//     display: 'inline-block',
//     margin: '0 2px',
//     transform: 'scale(0.8)',
//   },
//   title: {
//     fontSize: 14,
//   },
//   pos: {
//     marginBottom: 12,
//   },
// };

// function HygienistCard(props) {
//   const { classes } = props;
//   return (
//     <div>
//       <Card   className='hygienist_card '>
//         <Link
//           className='cardChoose'
//           to={{
//             pathname: '/booking-step-three',
//             state: {
//               appointmentType: props.props.appointmentType,
//               doctorName: '‌Danny darko'
//             }
//           }}
//         >
//           <CardContent className='parent'>
//             <Grid container justify="left" alignItems="left">
//               <img alt="Remy Sharp" src={avatarOne} className='avatar' />
//               <div className='doctorInfo'>
//                 <span className='doctorName'>‌Bryan Robertson</span>
//                 <span className='doctorGrade'>Hygienist </span>
//                 <span className='doctorGrade'>RDH </span>
//               </div>
//             </Grid>
//           </CardContent>
//         </Link>
//       </Card>
//       <Card className='hygienist_card'  >
//         <Link
//           className='cardChoose'
//           to={{
//             pathname: '/booking-step-three',
//             state: {
//               appointmentType: props.props.appointmentType,
//               doctorName: 'Daniel Adams'
//             }
//           }}
//         >
//           <CardContent className='parent'>
//             <Grid container justify="left" alignItems="left">
//               <img alt="Remy Sharp" src={avatarTwo} className='avatar' />
//               <div className='doctorInfo'>
//                 <span className='doctorName'>Martha Adams</span>
//                 <span className='doctorGrade'>Hygienist </span>
//                 <span className='doctorGrade'>RDH </span>
//               </div>
//             </Grid>
//           </CardContent>
//         </Link>
//       </Card>
//       <Card className="hygienist_card">
//         <Link
//           className='cardChoose'
//           to={{
//             pathname: '/booking-step-three',
//             state: {
//               appointmentType: props.props.appointmentType,
//               doctorName: '‌Steven Gerrard'
//             }
//           }}
//         >
//           <CardContent className='parent'>
//             <Grid container justify="left" alignItems="left">
//               <img alt="Remy Sharp" src={avatarThree} className='avatar' />
//               <div className='doctorInfo'>
//                 <span className='doctorName'>Maria Wayne</span>
//                 <span className='doctorGrade'>Hygienist </span>
//                 <span className='doctorGrade'>RDH </span>
//               </div>
//             </Grid>
//           </CardContent>
//         </Link>
//       </Card>
//     </div>
//   );
// }

// HygienistCard.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(HygienistCard);