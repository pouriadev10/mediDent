import React, { useState, useEffect, useRef } from "react";
import {
  notification,
  Button,
  Card,
  Row,
  Input,
  Typography,
  Col,
  Modal,
  Upload,
  Spin,
  Rate,
} from "antd";
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'; // Using Map instead of MapContainer
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Dropzone from 'react-dropzone'
import { controller } from "../../controller";
import config from "../../config";
import DashboardLayout from "../../layout/dashboardLayout/DashboardLayout";
import "./style.css";

import back from '../../assets/img/AdobeStock_428089463-1-scaled 3.png';
import edit from '../../assets/icons/edit.png';
import add from '../../assets/icons/add-circle20.png';

const { Title, Text } = Typography;

const EditOffice = () => {
  const [office, setOffice] = useState({
    name: "",
    state: "",
    city: "",
    address: "",
    email: "",
    latitude: "",
    longitude: "",
    phone: "",
    zip_code: "",
    featured_images: [],
    delete_images: [],
  });
  const [officedf, setOfficedf] = useState({
    name: "",
    state: "",
    city: "",
    address: "",
    email: "",
    latitude: "",
    longitude: "",
    phone: "",
    zip_code: "",
    featured_images: [],
    delete_images: [],
  });
  const [logoFile, setLogoFile] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [previewImage, sePreviewImage] = useState("");
  const [editOfficeMode, setEditOfficeMode] = useState(false);
  const [editLocationMode, setEditLocationMode] = useState(false);
  const [editNameMode, setEditNameMode] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    state: "",
    city: "",
    address: "",
    email: "",
    latitude: "",
    longitude: "",
    phone: "",
    zip_code: "",
    featured_images: "",
  });
  const [locationValue, setLocationValue] = useState();
  const [fileList, setFileList] = useState([]);
  const [officeFileList, setOfficeFileList] = useState([]);
  const inputRef = useRef();
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );



  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleChangeFeaturedImage = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleChangeOfficeImage = ({ fileList }) => {
    setOfficeFileList(fileList);
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewVisible(true);
    sePreviewImage(file.url || file.preview);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOffice({
      ...office,
      [name]: value,
    });
  };
  const handleDeleteImage = (e) => {
    if (office.delete_images) {
      setOffice({
        ...office,
        delete_images: [...office.delete_images, e.uid],
      });
    } else {
      setOffice({
        ...office,
        delete_images: [e.uid],
      });
    }
  };

  const getOfficeDetail = async () => {
    const response = await controller.getOfficeDetail(office);
    if (response.data) {
      if (response.data.featured_images.length != 0) {
        const updatedData = {
          featured_images: response.data.featured_images.map((imageObj) => ({
            url: config.apiGateway.URL + `${imageObj.image}`,
            uid: imageObj.id,
            name: "",
            status: "done",
          })),
        };
        setFileList(updatedData.featured_images);
      }
      if (response.data.office_images.length != 0) {
        const updatedData = {
          office_images: response.data.office_images.map((imageObj) => ({
            url: config.apiGateway.URL + `${imageObj.image}`,
            uid: imageObj.id,
            name: "",
            status: "done",
          })),
        };
        setOfficeFileList(updatedData.office_images);
      }
    }
  };
  const getOfficeProfile = async () => {
    try {
      const response = await controller.getOfficeProfile();
      if (response && response.data) {
        setLogoFile(response.data.logo);
        setOffice({
          ...office,
          ...response.data,
          latitude: response.data.latitude,
          longitude: response.data.longitude,
        });
      }
    } catch (error) {
      // Handle your error here
      console.error("Error fetching office profile:", error);
    }
  };



  const handleEditOffice = async (payload, alert) => {
    setErrors({
      name: "",
      state: "",
      city: "",
      address: "",
      email: "",
      latitude: "",
      longitude: "",
      phone: "",
      zip_code: "",
      featured_images: "",
    });

    try {
      const response = await controller.EditOfficeProfile({
        ...payload,
        id: office.id, // assuming the ID is necessary for the endpoint
      });

      if (response.status === 400) {
        setErrors(response.json); // assuming your API returns errors in a json object
        setOffice({ ...office, delete_images: [] }); // Reset delete images array
      } else {
        setOffice({ ...office, delete_images: [] }); // Reset delete images array
        if (alert) {
          notification.success({
            message: "Success",
            description: "Office information updated successfully",
            placement: "topRight",
          });
        }
      }
    } catch (error) {
      console.error('Error updating office info:', error);
      // You might want to show an error notification here
    }
  };

  const updateName = () => {
    const namePayload = { name: office.name };
    handleEditOffice(namePayload, true);
    setEditNameMode(false);
  };


  const updateContactInfo = () => {
    const contactInfo = {
      email: office.email,
      phone: office.phone,
    };
    handleEditOffice(contactInfo, true);
    setEditOfficeMode(false)
  };

  const updateLocationInfo = () => {
    const locationInfo = {
      city: office.city,
      state: office.state,
      address: office.address,
      zip_code: office.zip_code,
    };
    handleEditOffice(locationInfo, true);
    setEditLocationMode(false)
  };




  const getGoogleLocation = async (
    latitude,
    longitude,
    officeData,
    changeValue
  ) => {
    const apiKey = "AIzaSyD656YHmwQkieoKwzJopN31fZmr9Vly7w0";
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const name = data.results[0].formatted_address;
      if (data.results.length > 0) {
        setOffice({
          ...officeData,
          longitude: `${longitude}`,
          latitude: `${latitude}`,
        });
        if (changeValue) {
          setLocationValue(name);
        }
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };



  useEffect(() => {
    getOfficeProfile();
    getOfficeDetail();
  }, []);

  useEffect(() => {
    if (locationValue) handleChangeLocation();
  }, [locationValue]);

  const handleChangeLocation = () => {
    if (
      window.google &&
      window.google.maps &&
      window.google.maps.places &&
      window.google.maps.places.Autocomplete
    ) {
      const autoCompleteOptions = {
        types: ["geocode"],
      };

      const autoComplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        autoCompleteOptions
      );

      autoComplete.addListener("place_changed", async () => {
        const place = autoComplete.getPlace();

        if (place && place.geometry && place.geometry.location) {
          const latitude = place.geometry.location.lat();
          const longitude = place.geometry.location.lng();
          const locationName = place.name;
          getGoogleLocation(latitude, longitude, office, false);

          setLocationValue(locationName);
        }
      });
    } else {
      console.error("Google Maps objects are not available.");
    }
  };

  const updateOfficeImage = async (e) => {
    setUploading(true);
    try {
      await handleEditOffice(false);
      const formData = new FormData();
      formData.append("office_images", e);

      const myHeaders = Object.assign(controller.authHeader());
      const req = new Request(
        config.apiGateway.URL + `/clinics/update-office-profile/${office.id}/`,
        {
          body: formData,
          method: "PATCH",
          headers: myHeaders,
        }
      );
      const response = await fetch(req);
      setUploading(false);
      getOfficeDetail();
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const updateFeaturedImage = async (e) => {
    setUploading(true);
    try {
      await handleEditOffice(false);
      const formData = new FormData();
      formData.append("featured_images", e);

      const myHeaders = Object.assign(controller.authHeader());
      const req = new Request(
        config.apiGateway.URL + `/clinics/update-office-profile/${office.id}/`,
        {
          body: formData,
          method: "PATCH",
          headers: myHeaders,
        }
      );
      const response = await fetch(req);
      setUploading(false);
      getOfficeDetail();
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const updateAvatar = async (e) => {
    setLogoFile(URL.createObjectURL(e));
    const formData = new FormData();
    formData.append("logo", e);
    try {
      setUploadingLogo(true);
      const myHeaders = Object.assign(controller.authHeader());
      const req = new Request(
        config.apiGateway.URL + `/clinics/update-office-profile/${office.id}/`,
        {
          body: formData,
          method: "PATCH",
          headers: myHeaders,
        }
      );
      const response = await fetch(req);
      setUploadingLogo(false);
    } catch (error) {
      setUploadingLogo(false);
    }
  };



  const inputStyle = {
    paddingTop: "2px",
    width: "300px",
    padding: "12px 22px",
    fontSize: "16px",
    border: "1px solid #d9d9d9",
    borderRadius: "4px",
    outline: "none",
    transition: "border-color 0.3s",
    borderColor: "#d9d9d9",
  };

  

  const inputFocusStyle = {
    borderColor: "#1890ff",
  };
  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100px",
    height: "100px",
    border: "1px dashed gray",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
  };
  return (
    <DashboardLayout breadCrumb={false} logo={""} footerLogo={true}>
      <React.Fragment>
        <p style={{marginTop: 56, marginLeft: 45, fontSize: 20, fontWeight: '600'}}>Profile</p>
        <Card style={{
          minHeight: "300px",
          margin: "40px",
          marginBottom: 10,
          border: "none",
          borderRadius: "8px",
        }}
          bodyStyle={{ padding: 0 }}
        >
          <div style={{ width: '100%' }}>
            <img src={back} alt="" style={{ width: "100%" }} />
          </div>

          <Row>
            <Col span={4} className="profile_upload">
              <Upload
                showUploadList={false}
                beforeUpload={(e) => {
                  updateAvatar(e);
                  return false;
                }}
                className="profile_upload-btn"
                accept="image/*"
                disabled={uploadingLogo}
              >
                {uploadingLogo ? (
                  <Row>
                    <Col
                      span={24}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Spin />
                    </Col>
                    <Col
                      span={24}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      Uploading
                    </Col>
                  </Row>

                ) : (
                  <>
                    {logoFile ? (
                      <img
                        src={logoFile}
                        alt="Logo"
                        className="profile_upload-img"
                        onMouseEnter={(e) => {
                          e.target.style.opacity = 0.5;
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.opacity = 1;
                        }}
                        style={{border: "4px solid #C9C1F1"}}
                      />
                    ) : (
                      <div style={buttonStyle}>
                        <PlusOutlined style={{ marginRight: "5px" }} />
                        <div>Upload</div>
                      </div>
                    )}
                  </>
                )}
              </Upload>
            </Col>
            <Col span={20} style={{ marginTop: 15, display: 'flex', flexDirection: 'row' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                {editNameMode ? (
                  <>
                    <Input
                      value={office.name}
                      onChange={e => setOffice({ ...office, name: e.target.value })}
                      style={{ width: '200px', height: 36, marginRight: '8px' }}
                    />
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: 24, fontWeight: '600', marginRight: 35 }}>{office.name}</span>
                  </>
                )}
                {editNameMode ? (
                  <Button
                    type="text"
                    icon={<img src={edit} alt="" />}
                    onClick={updateName}
                    style={{ color: "#979797" }}
                  />
                ) : (
                  <Button
                    type="text"
                    onClick={() => setEditNameMode(true)}
                    icon={<img src={edit} alt="" />}
                    style={{ color: "#979797" }}
                  />
                )}

              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'row' }}>
                <p style={{ marginRight: 3 }}><span style={{ fontSize: 16, fontWeight: '500' }}>4.7 </span><span style={{ fontSize: 10, fontWeight: '500', color: 'rgba(151, 151, 151, 1)' }}>/5</span></p>
                <Rate
                  disabled
                  defaultValue={4.7}
                  className="custom-rate"
                />
              </div>
            </Col>
          </Row>
          <Row gutter={[60, 60]} style={{ marginBottom: 30 }}>
            <Col span={16} style={{ marginLeft: 46 }}>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                <p style={{ fontSize: 18, fontWeight: '600', width: '100%' }}>Office Information</p>
                <div style={{ marginLeft: 'auto' }}>
                  {editOfficeMode ? (
                    <Button
                      type="text"
                      icon={<img src={edit} alt="" />}
                      onClick={
                        updateContactInfo
                      }
                      style={{ color: "#979797" }}
                    />
                  ) : (
                    <Button
                      type="text"
                      icon={<img src={edit} alt="" />}
                      onClick={() => setEditOfficeMode(true)}
                      style={{ color: "#979797" }}
                    />
                  )}

                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', marginTop: 18, justifyContent: "space-between" }}>
                {
                  editOfficeMode ? (
                    <>
                      <Input
                        name="phone"
                        placeholder="Phone number"
                        value={office.phone}
                        onChange={handleChange}
                        style={inputStyle}
                      />
                      <Input
                        name="email"
                        placeholder="Email"
                        value={office.email}
                        onChange={handleChange}
                        style={inputStyle}
                      />
                    </>
                  ) : (
                    <>
                      <p><span style={{ fontSize: 16 }}>Phone:</span> <span style={{ fontSize: 16, color: 'rgba(151, 151, 151, 1)' }}>{office.phone}</span></p>
                      <p><span style={{ fontSize: 16 }}>Email:</span> <span style={{ fontSize: 16, color: 'rgba(151, 151, 151, 1)' }}>{office.email}</span></p>
                    </>
                  )
                }

              </div>

              <Col xs={24} md={24} style={{ padding: 0 }}>
                <label className="inputLabel" style={{ fontSize: 18, fontWeight: '600', marginBottom: 20 }}>
                  Office
                </label>
                <div className="clearfix">
                  <Upload
                    listType="picture-card"
                    fileList={officeFileList}
                    onPreview={handlePreview}
                    onChange={handleChangeOfficeImage}
                    beforeUpload={(e) => {
                      updateOfficeImage(e);
                      return false;
                    }}
                    onRemove={handleDeleteImage}
                    lassName="custom-upload-list"
                    accept="image/*"
                    disabled={uploading}
                  >
                    <label className='formLabel '
                      style={{
                        color: "gray",
                        backgroundColor: "none",
                        display: "flex",
                        height: "81px",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: '8px',
                        cursor: "pointer",
                        maxWidth: "360px",
                        minWidth: "unset",
                        padding: "15px",
                        flexDirection: 'column',
                        fontSize: 10
                      }
                      }
                    >
                      <div style={{ top: -15, position: 'relative' }}>
                        <img src={add} alt='' style={{}} />
                      </div>
                      <div style={{ color: '#B7B7B7', fontSize: 12, marginBottom: 5 }}>Drag and drop or Browse your files</div>
                    </label>

                  </Upload>
                  <Modal
                    visible={previewVisible}
                    footer={null}
                    onCancel={handleCancel}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImage}
                    />
                  </Modal>
                </div>
                {errors.office_images && (
                  <p className="red">{errors.office_images}</p>
                )}
              </Col>
              <Col xs={24} md={24} style={{ padding: 0 }}>
                <label className="inputLabel" style={{ fontSize: 18, fontWeight: '600', marginBottom: 20 }}>
                  Featured
                </label>
                <div className="clearfix">
                  <Upload
                    fileList={fileList}
                    listType="picture-card"
                    onPreview={handlePreview}
                    onChange={handleChangeFeaturedImage}
                    beforeUpload={(e) => {
                      updateFeaturedImage(e);
                      return false;
                    }}
                    onRemove={handleDeleteImage}
                    className="profile_upload-btn"
                    accept="image/*"
                    disabled={uploading}
                  >
                    <label className='formLabel '
                      style={{
                        color: "gray",
                        backgroundColor: "none",
                        display: "flex",
                        height: "81px",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: '8px',
                        cursor: "pointer",
                        maxWidth: "360px",
                        minWidth: "unset",
                        padding: "15px",
                        flexDirection: 'column',
                        fontSize: 10
                      }
                      }
                    >
                      <div style={{ top: -15, position: 'relative' }}>
                        <img src={add} alt='' style={{}} />
                      </div>
                      <div style={{ color: '#B7B7B7', fontSize: 12, marginBottom: 5 }}>Drag and drop or Browse your files</div>
                    </label>
                  </Upload>
                  <Modal
                    visible={previewVisible}
                    footer={null}
                    onCancel={handleCancel}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImage}
                    />
                  </Modal>
                </div>
                {errors.featured_images && (
                  <p className="red">{errors.featured_images}</p>
                )}
              </Col>
            </Col>
            <Col span={7}>
              <div style={{ maxWidth: '400px', margin: 'auto' }}>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                  <Title level={4}>Location Information</Title>
                  <div style={{ marginLeft: 'auto' }}>
                    {editLocationMode ? (
                      <Button
                        type="text"
                        icon={<img src={edit} alt="" />}
                        onClick={
                          updateLocationInfo
                        }
                        style={{ color: "#979797" }}
                      />
                    ) : (
                      <Button
                        type="text"
                        icon={<img src={edit} alt="" />}
                        onClick={() => setEditLocationMode(true)}
                        style={{ color: "#979797" }}
                      />
                    )}

                  </div>
                </div>
                <Map
                  center={[office.latitude || 0, office.longitude || 0]} // Provide default values if latitude or longitude is null
                  zoom={15}
                  scrollWheelZoom={true}
                  style={{ height: '208px', width: '310px', marginTop: '30px', marginBottom: 30 }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {office.latitude && office.longitude && ( // Render Marker only if latitude and longitude are available
                    <Marker position={[office.latitude, office.longitude]}>
                      <Popup>Dental Clinic</Popup>
                    </Marker>
                  )}
                </Map>

                <div style={{ marginTop: '16px', maxWidth: 310 }}>
                  {
                    editLocationMode ? (
                      <>
                      <div style={{display: 'flex', flexDirection: 'row', gap: '30px', marginBottom: 25}}>
                      <Input
                          name="state"
                          placeholder="State"
                          value={office.state}
                          onChange={handleChange}
                          style={inputStyle}
                        />
                        <Input
                          name="city"
                          placeholder="City"
                          value={office.city}
                          onChange={handleChange}
                          style={inputStyle}
                        />
                      </div>
                      <div style={{marginBottom: 25}}>
                        <Input
                          name="address"
                          placeholder="Address"
                          value={office.address}
                          onChange={handleChange}
                          style={inputStyle}
                        />
                        </div>
                        <div style={{marginBottom: 25}}>
                        <Input
                          name="zip_code"
                          placeholder="Zip Code"
                          value={office.zip_code}
                          onChange={handleChange}
                          style={inputStyle}
                        />
                        </div>
                      </>
                    ) : (
                      <>
                        <p><Text strong>State: </Text> <Text style={{ color: '#979797' }}>{office.state}</Text></p>
                        <p><Text strong>City: </Text> <Text style={{ color: '#979797' }}>{office.city}</Text></p>
                        <p><Text strong>Address: </Text> <Text style={{ color: '#979797' }}>{office.address}</Text></p>
                        <p><Text strong>Zip Code: </Text> <Text style={{ color: '#979797' }}>{office.zip_code}</Text></p>
                      </>
                    )
                  }
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </React.Fragment>
    </DashboardLayout>
  );
};

export default EditOffice;
