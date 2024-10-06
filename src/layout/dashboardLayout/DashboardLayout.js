import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/CommonUi/TopBar";
import { Layout } from "antd";
import "./style.css";
import { controller } from "../../controller";

const DashboardLayout = ({ children, breadCrumb, logo, footerLogo }) => {
  const [footerLogoData, setFooterLogoData] = useState("");

  const getLogo = async () => {
    const response = await controller.getLogo();
    setFooterLogoData(response.data.dark);
  };

  useEffect(() => {
    if (footerLogo) {
      getLogo();
    }
  }, [footerLogo]);
  return (
    <div>
      <div className="mainPart">
        <Layout className="mh100v">
          <Sidebar />
          <Layout>
            <TopBar clinicLogo={logo ? logo : ""} />
            {/* {breadCrumb ? (
              <div className="page-breadcrumb">
                <span className="breadcrumb-part">{breadCrumb}</span>
              </div>
            ) : (
              ""
            )} */}
            {children}
            {footerLogoData ? (
              <>
                <div className="text-muted poweredby">
                  &copy; powered by{" "}
                  <img
                    alt="img"
                    className="large-logo smilinLogoPowerdBy w52"
                    src={footerLogoData}
                  />
                </div>
                <div className="layout_flex_end"></div>
              </>
            ) : (
              ""
            )}
          </Layout>
        </Layout>
      </div>
    </div>
  );
};

export default DashboardLayout;
