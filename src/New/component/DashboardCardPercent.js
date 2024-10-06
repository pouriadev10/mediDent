import React from "react";
import "./style.css";
import DonutChart from "./DonutChart";
const DashboardCardPercent = (props) => {
    return (
        <div className="dashboard-card">
            <DonutChart
                title={props.title}
                subTitle={props.subTitle}
            />
        </div>
    )
}

export default DashboardCardPercent;