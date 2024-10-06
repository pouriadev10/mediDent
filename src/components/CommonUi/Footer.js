import React, { Component } from "react";
import {NavLink} from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <ul className="menu">
          <li><NavLink to="/contactus">Contact Us</NavLink></li>
          <li><NavLink to="/aboutus">About Us</NavLink></li>
          <li><NavLink to="/privacypolicy">Privacy Policy</NavLink></li>
        </ul>
      </div>
    );
  }
}

export default Footer;