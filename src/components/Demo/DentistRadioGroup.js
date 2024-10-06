
// import PropTypes from 'prop-types';
// import React from 'react';
// import './app.local.css';

// const styles = theme => ({
//   root: {
//     display: 'flex',
//   },
//   formControl: {
//     margin: theme.spacing.unit * 3,
//   },
//   group: {
//     margin: `${theme.spacing.unit}px 0`,
//   },
//   avatar: {
//     margin: 10,
//   },
//   bigAvatar: {
//     margin: 10,
//     width: 60,
//     height: 60,
//   }
// });

// class DentistRadioGroup extends React.Component {
//   state = {
//     value: '',
//   };

//   handleChange = event => {
//     this.setState({ value: event.target.value });
//     this.props.onSelect(event.target.value);
//   };

//   render() {
//     const { classes } = this.props;

//     return (
//       <div>
//         <div className={classes.root}>
//           <FormControl component="fieldset" className={classes.formControl + ' formGroup'}>
//             <RadioGroup
//               aria-label="Gender"
//               name="gender1"
//               className={classes.group}
//               value={this.state.value}
//               onChange={this.handleChange}
//             >
//               <FormControlLabel value="implant" control={<Radio color='#54c5d6' />} label="Dental implant consult (30 min)" />
//               <FormControlLabel value="Invisalign" control={<Radio color='#54c5d6' />} label="Invisalign consult (30 min)" />
//               <FormControlLabel value="adult-cleaning" control={<Radio color='#54c5d6' />} label="New patient cleaning - Adult (60 min)" />
//               <FormControlLabel value="child-cleaning" control={<Radio color='#54c5d6' />} label="New patient cleaning – Child (60 min)" />
//               <FormControlLabel value="adult-exam" control={<Radio color='#54c5d6' />} label="New patient exam- Adult (30 min)" />
//               <FormControlLabel value="child-exam" control={<Radio color='#54c5d6' />} label="New patient exam- Child (30 min)" />
//               <FormControlLabel value="emergency" control={<Radio color='#54c5d6' />} label="Emergency/Tooth pain (30 min)" />
//             </RadioGroup>
//           </FormControl>
//         </div>
//       </div>
//     );
//   }
// }

// DentistRadioGroup.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(DentistRadioGroup);