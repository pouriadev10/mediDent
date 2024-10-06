import React, { useEffect, useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "../app.local.css";
import { Menu, Dropdown, Select, Spin, Modal } from 'antd'
import { SettingOutlined, CloudUploadOutlined, LogoutOutlined } from "@ant-design/icons";

import './style.css';
import Axios from 'axios'
import config from '../../config';
import { controller } from '../../controller';
import Logo from '../../assets/img/mylogopdf.png'
import logout from '../../assets/icons/Frame 46218.png'
import setting from '../../assets/icons/Frame 3.png'
import notif from '../../assets/icons/frame2.png'

const { Option } = Select;

const mapStateToProps = state => {
  return { authentication: state.authentication };
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function TopBar(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [officeData, setOfficeData] = useState({});
  const [officeLogo, setOfficeLogo] = useState(
    localStorage.getItem("officeLogo") ?
      JSON.parse(localStorage.getItem("officeLogo")).logo
      :
      ""
  )
  const [serverLogo, setServerLogo] = useState()
  const [modalOfficeId, setModalOfficeId] = useState()
  const [uploadingImage, setUploadingImage] = useState(false)
  const [modalChangeOffice, setmodalChangeOffice] = useState(false)
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());


  const getLogo = async () => {
    const response = await controller.getLogo()
    setServerLogo(response.data.logo_url)
  }
  useEffect(() => {
    getLogo()
    getOfficeLogo()
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getOfficeLogo = async () => {
    const officeIdDefualt = JSON.parse(localStorage.getItem("office_ids"));
    setModalOfficeId(officeIdDefualt[0].office_id)
    const response = await controller.officeprofile(officeIdDefualt[0].office_id);
    setOfficeLogo(response.logo)
  }

  const showModal = async () => {

    const officeIdDefualt = JSON.parse(localStorage.getItem("office_ids"));
    setModalOfficeId(officeIdDefualt[0].office_id)
    const response = await controller.officeprofile(officeIdDefualt[0].office_id);
    setOfficeData(response)
    setIsModalVisible(true);
  };

  const handleopenModalChangeOffice = () => {
    if (officeID && officeID.length > 1)
      setmodalChangeOffice(true)
  }
  const handleCloseModalChangeOffice = () => {
    setmodalChangeOffice(false)
  }

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const changeProfileImage = async (event) => {
    setUploadingImage(true)
    let formData = new FormData();
    formData.append('office', modalOfficeId);
    if (event)
      formData.append('logo', event.target.files[0]);
    const response = await controller.changeOfficeLog(formData, modalOfficeId)

    const responseGeyOfficeprofile = await controller.officeprofile(modalOfficeId);
    setOfficeData(responseGeyOfficeprofile)
    setUploadingImage(false)
  }

  const handleSelectOfficeID = async (event) => {
    setOfficeData({})
    const response = await controller.officeprofile(event);
    setOfficeData(response)
    setModalOfficeId(event)
  }

  const handleSelectDefualtOfficeID = (event) => {
    localStorage.setItem("selectedOffice", event + "")
    var a = JSON.parse(localStorage.getItem("office_ids"))
    for (var i = 0; i < a.length; i++) {
      if (a[i].id == event + "") {
        localStorage.setItem("selectedOfficeName", a[i].office_name)
      }
    }

    window.location.reload();
  }
  const path = props.location.pathname.slice(1);

  const hideBar = ["payment"].includes(path)
  if (hideBar) {
    return (
      <div></div>
    )
  }
  const [officeID, setOfficeID] = useState(JSON.parse(localStorage.getItem("office_ids")))

  const hasMenu = !path.includes("completeregistration")
  const menu = hasMenu ? (
    <div style={{display: 'flex', alignItems: 'center'}}>


      <div className="seperator commonui_mt10">


      </div>
      {props.authentication.loggedIn ?
        <ul className="menu logged-in">
          <li>
            <img src={notif} alt="" style={

              windowDimensions ?
                windowDimensions.width > "700" ?
                  { fontSize: '20px', color: '#7A08FA' }
                  :
                  windowDimensions.width > "450" ?
                    { fontSize: '15px', color: '#7A08FA' }

                    :
                    { fontSize: '10px', color: '#7A08FA' }
                :
                { fontSize: '20px', color: '#7A08FA' }


            } />
          </li>
          <li >
            <Dropdown overlay={
              <Menu>
                <Menu.Item key="3" disabled>

                  {
                    localStorage.getItem("selectedOfficeName")
                  }
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="1" disabled={officeID && officeID.length > 1 ? false : true}>
                  <a onClick={handleopenModalChangeOffice}>
                    Select office
                  </a>
                </Menu.Item>
                <Menu.Item key="0">
                  <a onClick={showModal}>
                    Office information
                  </a>
                </Menu.Item>

              </Menu>
            }>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <img src={setting} alt="" style={

                  windowDimensions ?
                    windowDimensions.width > "700" ?
                      { fontSize: '20px', color: '#7A08FA' }
                      :
                      windowDimensions.width > "450" ?
                        { fontSize: '15px', color: '#7A08FA' }

                        :
                        { fontSize: '10px', color: '#7A08FA' }
                    :
                    { fontSize: '20px', color: '#7A08FA' }


                } />
              </a>
            </Dropdown>
          </li>

          <li>
            <NavLink to="/" onClick={async () => {

              const Config = {
                headers: {
                  Authorization: localStorage.getItem("user") ? "Token " + JSON.parse(localStorage.getItem("user")).key : "",
                }
              }

              const response = await Axios.get(config.apiGateway.URL + `/dj-rest-auth/logout/`, Config);
              localStorage.clear();
              localStorage.removeItem("office_ids")
              localStorage.removeItem("selectedOffice")
              window.location.href = "/"
              return response


            }}>
              <img src={logout} alt="" style={windowDimensions ?
                windowDimensions.width > "700" ?
                  { fontSize: '20px', color: '#7A08FA' }
                  :
                  windowDimensions.width > "450" ?
                    { fontSize: '15px', color: '#7A08FA' }

                    :
                    { fontSize: '10px', color: '#7A08FA' }
                :
                { fontSize: '20px', color: '#7A08FA' }} />
            </NavLink>
          </li>
        </ul>
        :
        <ul className="menu">
          <li><NavLink to="/login">Login</NavLink></li>
        </ul>
      }
      <Modal title="Select Office" visible={modalChangeOffice} footer={null} onCancel={handleCloseModalChangeOffice}>
        <div className="seperator commonui_mt10">

          {
            officeID ?
              officeID.length > 1 ?
                <>

                  <p className="text-muted text-center">Select an item from the list below</p>

                  <Select

                    className="commonui_w100" showSearch
                    defaultValue={localStorage.getItem("selectedOffice") ? eval(localStorage.getItem("selectedOffice")) : eval(officeID[0].office_id)}
                    optionFilterProp="children"
                    onSelect={(event) => handleSelectDefualtOfficeID(event)}
                  >
                    {
                      officeID.map((key) =>
                        <Option value={key.office_id}>{key.office_name}</Option>
                      )
                    }
                  </Select>
                </>
                :
                <>  Office ID: {" "} {officeID ? officeID[0].office_id : ""}</>
              :
              <p>
                Office ID: {" "} {officeID ? officeID[0].office_id : ""}
              </p>
          }

        </div>
      </Modal>
      <Modal footer={null} title="Office Information" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        Office : {" "}
        <Select
          className="commonui_w100" showSearch
          defaultValue={officeID[0].office_id}
          optionFilterProp="children"
          onSelect={(event) => handleSelectOfficeID(event)}
        >
          {
            officeID.map((key) =>
              <Option value={key.office_id}>{key.office_name}</Option>
            )
          }
        </Select>
        <hr />
        <div>
          <div className="commonui_mb0">
            <div className="commonui_uploadcontainer">
              {

                !uploadingImage ?
                  officeData && officeData.logo ?
                    <div className="commonui_tac" >
                      <label>Click on the logo image and upload the new logo image</label><br />

                      <label for="fileUpload" class="custom-file-upload">
                        <img alt="logo" className="large-logo commonui_img"
                          src={officeData.logo} />
                      </label>
                      <input
                        className="commonui_dn" type="file"
                        id="fileUpload"
                        title="profile_photo"
                        required={true}
                        onChange={
                          e => changeProfileImage(e)
                        }
                        accept="image/png, image/jpeg"
                      />
                      <br /><span className="commonui_fs12">(recommendation size = 150*50px)</span><br />
                    </div>
                    :
                    <div className="commonui_tac">

                      <label for="fileUpload" className='formLabel commonui_upload'

                      >
                        <div className="commonui_mr8" ><CloudUploadOutlined style={{ fontSize: "25px" }} />
                        </div>
                        <div>Click here to uploading new Logo</div>
                        <div className="upload-peyment-pdf commonui_mb5">

                        </div>
                      </label>
                      <input
                        className="commonui_dn"
                        type="file"
                        id="fileUpload"
                        title="profile_photo"
                        required={true}
                        onChange={
                          e => changeProfileImage(e)
                        }
                        accept="image/png, image/jpeg"
                      />
                      <br /><span className="commonui_fs12">(recommendation size = 150*50px)</span><br />
                    </div>

                  :
                  <div className="commonui_spin" >
                    <Spin />
                  </div>

              }

            </div>
          </div>
          <hr />
          <div className="commonui_df" >

            <p className="commonui_w50">Office ID : <b>{officeData && officeData.office_id ? officeData.office_id : "-"}</b></p>
            <p>Website : <b>{officeData && officeData.domain ? officeData.domain : "-"}</b></p>
          </div>
          <div className="commonui_df"  >

            <p className="commonui_w50">PMS : <b>{officeData && officeData.practice_management_system ? officeData.practice_management_system : "-"}</b></p>
            <p>Address : <b>{officeData && officeData.address ? officeData.address : "-"}</b></p>
          </div>
        </div>


      </Modal>
    </div>
  ) : null
  return (
    <div className="top-bar">

      {menu}
    </div>
  );
}

const connected_TopBar = connect(mapStateToProps)(TopBar)
export default withRouter(connected_TopBar);