import React, { useState, useEffect } from "react";
import {
    Typography
} from "antd"
import "./style.css"
const DoctorNote = (props) => {
    return (
        <div>
            <p style={{fontSize: 20, fontWeight: 600}}>
                Your Treatment Plan
            </p>
            <br/>
            <p className="doctor-font" >
                Doctor’s Note
            </p>
            <Typography style={{ fontWeight: 400, fontSize: '14px', textAlign: "justify" }}>
                {props.doctor_note}
            </Typography>
            <br />
            {/* <Typography style={{ fontWeight: 400, fontSize: '14px', textAlign: "justify" }}>
                We have put together your treatment plan.
                Please take some time to review the proposed treatments. We've also provided educational
                videos to help you gain a better understanding of our discussion.
                If you have any questions, we are more than happy to schedule a call to go over your treatments again.
            </Typography> */}
        </div>
    )
}

export default DoctorNote;