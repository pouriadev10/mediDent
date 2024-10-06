// import PropTypes from 'prop-types';
// import React from 'react';
// import { Link } from 'react-router-dom';
// import avatarTwo from '../assets/img/imgo1.jpg';
// import avatarThree from '../assets/img/imgo2.jpg';
// import avatarOne from '../assets/img/imgpsh_mobile_save.jpg';
// import './style.css';

// const styles = {
//   card: {
//     minWidth: 275,
//   },
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

// function DentistCard(props) {
//   const { classes } = props;
//   return (
//     <div>
//       <Card className={classes.card} style={ {marginBottom: '25px'} }>
//         <Link
//           className='cardChoose'
//           to={{
//             pathname: '/booking-step-three',
//             state: {
//               appointmentType: props.props.appointmentType,
//               doctorName: 'Dr. Leonard Owen'
//             }
//           }}
//         >
//           <CardContent>
//             <Grid container justify="left" alignItems="left">
//               <img alt="Remy Sharp" src={avatarOne} className='avatar' />
//               <div className='doctorInfo'>
//                 <span className='doctorName'>Dr. Leonard Owen</span>
//                 <span className='doctorGrade'>Dentist </span>
//                 <span className='doctorGrade'>DDS </span>
//               </div>
//             </Grid>
//           </CardContent>
//         </Link>
//       </Card>
//       <Card className={classes.card} style={ {marginBottom: '25px'} }>
//         <Link
//           className='cardChoose'
//           to={{
//             pathname: '/booking-step-three',
//             state: {
//               appointmentType: props.props.appointmentType,
//               doctorName: 'Dr. Jack Richards'
//             }
//           }}
//         >
//           <CardContent>
//             <Grid container justify="left" alignItems="left">
//               <img alt="Remy Sharp" src={avatarTwo} className='avatar' />
//               <div className='doctorInfo'>
//                 <span className='doctorName'>Dr. Rita Richards</span>
//                 <span className='doctorGrade'>Dentist </span>
//                 <span className='doctorGrade'>DMD </span>
//               </div>
//             </Grid>
//           </CardContent>
//         </Link>
//       </Card>
//       <Card className={classes.card} style={ {marginBottom: '25px'} }>
//         <Link
//           className='cardChoose'
//           to={{
//             pathname: '/booking-step-three',
//             state: {
//               appointmentType: props.props.appointmentType,
//               doctorName: 'Dr. Rafael Rocco'
//             }
//           }}
//         >
//           <CardContent>
//             <Grid container justify="left" alignItems="left">
//               <img alt="Remy Sharp" src={avatarThree} className='avatar' />
//               <div className='doctorInfo'>
//                 <span className='doctorName'>Dr. Rafael Rocco</span>
//                 <span className='doctorGrade'>Dentist </span>
//                 <span className='doctorGrade'>DDS </span>
//               </div>
//             </Grid>
//           </CardContent>
//         </Link>
//       </Card>
//     </div>
//   );
// }

// DentistCard.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(DentistCard);