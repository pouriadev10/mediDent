import React, { useState } from 'react'
import "./componentStyle.css";
import { Card } from "antd"
const DashboardCard = ({ name, value, color, NotwidthChange }) => {
  const [cardName, setCardName] = useState(name)

  return (
    <React.Fragment>
      <Card style={
        cardName == "Treatment Plan Execution Score" && !NotwidthChange ?
          {
            textAlign: "center", padding: "0px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around"
          }
          :
          cardName == "Preventative Care Score" && !NotwidthChange ?
            {
              textAlign: "center", padding: "0px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around"
            }
            :
            { width: "33%", textAlign: "center", padding: "0px", height: "100%" }
      }>
        <p className='fwb'>{name}</p>
        <p></p>
        <p style={color ? { color: color, fontWeight: "bold" } : { color: "#0981C8" }}>{value}</p>

        <div className='triangle'>
          <div className='triangle-bottom-right'> </div>
        </div>


      </Card>

    </React.Fragment>
  )
}
export default DashboardCard;