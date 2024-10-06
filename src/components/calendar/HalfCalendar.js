// import React from 'react';
// import PropTypes from 'prop-types';
// import CalendarThirtyMin from './CalendarThirtyMin'

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



// function RegistrationForm(props) {
//   const { classes } = props;
//   return (
//     <Card className={classes.card} style={{ marginBottom: '25px' }}>
//       <CardContent>
//         <CalendarThirtyMin />
//       </CardContent>
//     </Card>
//   );
// }

RegistrationForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegistrationForm);