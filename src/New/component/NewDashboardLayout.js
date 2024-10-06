import React from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import "./style.css";

const NewDashboardLayout = ({ children }) => {
    return (
        <Layout className="mh100v">
            <Sidebar />
            <Layout>
                <TopBar />
                <div className="new-dashboard-content">
                    {children}
                </div>

            </Layout>
        </Layout>
    )
}

export default NewDashboardLayout;