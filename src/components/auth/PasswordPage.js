// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import "../app.local.css";

// const styles = {
//   root: {},
//   input: {},
// };
// class DateTimePicker extends Component {
//   handleDateTimeChange = (date) => {
//     if (this.props) {
//       this.props.onChange({
//         target: {
//           name: this._input.props.name,
//           value: date,
//         },
//       });
//     }
//   };

//   render() {
//     const { classes, onChange, ...other } = this.props;
//     return (
//       <InlineDateTimePicker
//         margin="dense"
//         variant="outlined"
//         {...other}
//         size="medium"
//         className={classes.root}
//         InputProps={{
//           className: classes.input,
//         }}
//         onChange={this.handleDateTimeChange}
//         ref={(c) => (this._input = c)}
//       />
//     );
//   }
// }

// DateTimePicker.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(DateTimePicker);
