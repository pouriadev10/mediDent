import React, { useEffect, useState } from "react";
import { Form, Select, Typography, Avatar, Card, Row, Button, DatePicker, Input, Modal, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
// import Error from '../../../Error'; 
import { controller } from '../../../controller'; // Assuming controller module is imported correctly
import { Error } from '../../../ErrorHandeling'
import image from "../../../assets/img/imgo2.jpg"; // Ensure this image path is correct
import calendar from '../../../assets/icons/calendar.png';
import sms from '../../../assets/icons/sms1.png';
import call from '../../../assets/icons/call2.png';


const { Meta } = Card;
const { Text } = Typography;
const { Option } = Select;

function ModalStep1({ item, handleMemberSelect }) {
  const [member, setMembers] = useState({ results: [] });
  const [patientFirstName, setPatientFirstName] = useState("");
  const [patientLastName, setPatientLastName] = useState("");
  const [patientEmailAddress, setPatientEmailAddress] = useState("");
  const [patientPhoneNumber, setPatientPhoneNumber] = useState("");
  const [patientCity, setPatientCity] = useState("");
  // const [patientBirthDate, setPatientBirthDate] = useState(null);
  const [patientAddress, setPatientAddress] = useState("");
  const [patientState, setPatientState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [formErrorsPatient, setFormErrorsPatient] = useState({});
  const [patientId, setPatientId] = useState(null);
  const [modalAddPatient, setModalAddPatient] = useState(false);
  const [patientInformation, setPatientInformation] = useState([]);
  const [newPatientID, setNewPatientID] = useState("");
  const [birthDayPreview, setBirthDayPreview] = useState(null);
  const [patientBirthDate, setPatientBirthDate] = useState('');
  const [searchQuery2, setSearchQuery2] = useState("");
  // const [formErrorsPatient, setFormErrorsPatient] = useState({
  //     BirthDate: {
  //         status: true,  // Assume default validation status
  //         message: ''   // Default error message
  //     }
  // });

  const openNotification = (position, message, type) => {
    // Assuming there's a notification function
    console.log(position, message, type);
  };

  const createNewPatient = async () => {
    try {
      const patientFirstNameValidation = await Error.NameHandling(patientFirstName);
      const patientLastNameValidation = await Error.NameHandling(patientLastName);
      const patientCityValidation = await Error.NameHandling(patientCity);
      const patientAddressValidation = await Error.SelectItem(patientAddress);
      const zipcodeValidation = await Error.SelectItem(zipcode);
      const pstateValidation = await Error.SelectItem(patientState);
      const emailOrPhoneValidation = await Error.EmailOrPhoneHandling(patientEmailAddress, patientPhoneNumber.replace(/ /g, ""));

      if (
        patientFirstNameValidation.status &&
        patientLastNameValidation.status &&
        emailOrPhoneValidation.status &&
        patientAddressValidation.status &&
        zipcodeValidation.status &&
        pstateValidation.status &&
        patientCityValidation.status
      ) {
        const response = await controller.createGuarantor(
          patientFirstName,
          patientLastName,
          patientEmailAddress,
          patientPhoneNumber.replace(/ /g, ""),
          patientCity,
          patientBirthDate,
          patientAddress,
          patientState,
          zipcode
        );
        if (response.status < 250) {
          setPatientId(response.id);
          setFormErrorsPatient({
            Zipcode: { massage: "", status: true },
            pState: { massage: "", status: true },
            Address: { massage: "", status: true },
            BirthDate: { massage: "", status: true },
            SelectProvider: { massage: "", status: true },
            FirstName: { massage: "", status: true },
            LastName: { massage: "", status: true },
            Email: { massage: "", status: true },
            Phone: { massage: "", status: true },
            City: { massage: "", status: true },
          });
          openNotification('bottom', response.message, "Successful");
          setPatientFirstName("");
          setPatientLastName("");
          setPatientEmailAddress("");
          setPatientPhoneNumber("");
          setPatientCity("");
          setPatientBirthDate(null);
          setPatientAddress("");
          setPatientState("");
          setZipcode("");
          setModalAddPatient(false);

          const responseGetPatient = await controller.getPatient();
          setPatientInformation(responseGetPatient);
          setMembers({ results: responseGetPatient }); // Update the members state
          getPatients()
          setNewPatientID(response.id + "");
        } else {
          openNotification('bottom', "Invalid Data", "Error");
          setFormErrorsPatient({
            pState: { massage: response.state ? response.state[0] : "", status: response.state ? false : true },
            Zipcode: { massage: response.zipcode ? response.zipcode[0] : "", status: response.zipcode ? false : true },
            Address: { massage: response.address ? response.address[0] : "", status: response.address ? false : true },
            BirthDate: { massage: response.birth_date ? response.birth_date[0] : "", status: response.birth_date ? false : true },
            FirstName: { massage: response.first_name ? response.first_name[0] : "", status: response.first_name ? false : true },
            LastName: { massage: response.last_name ? response.last_name[0] : "", status: response.last_name ? false : true },
            Email: { massage: response.email ? response.email[0] : "", status: response.email ? false : true },
            Phone: { massage: response.phone ? response.phone[0] : "", status: response.phone ? false : true },
            City: { massage: response.city ? response.city[0] : "", status: response.city ? false : true },
          });
        }
      } else {
        setFormErrorsPatient({
          Email: emailOrPhoneValidation.type === "email" ? emailOrPhoneValidation : { massage: '', status: true },
          FirstName: patientFirstNameValidation,
          LastName: patientLastNameValidation,
          Phone: emailOrPhoneValidation.type === "phone" ? emailOrPhoneValidation : { massage: '', status: true },
          City: patientCityValidation,
          Address: patientAddressValidation,
          Zipcode: zipcodeValidation,
          pState: pstateValidation,
        });
      }
    } catch (error) {
      console.error("Error creating new patient:", error);
      openNotification('bottom', "An error occurred while creating a new patient", "Error");
    }
  };

  const getPatients = async () => {
    try {
      const responseGetPatient = await controller.getPatient(searchQuery2);
      setPatientInformation(responseGetPatient);
      setMembers({ results: responseGetPatient }); // Update the members state
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'patient_first_name':
        setPatientFirstName(value);
        break;
      case 'patient_last_name':
        setPatientLastName(value);
        break;
      case 'patient_email_address':
        setPatientEmailAddress(value);
        break;
      case 'patient_phone_number':
        setPatientPhoneNumber(value);
        break;
      case 'patient_city':
        setPatientCity(value);
        break;
      case 'patient_address':
        setPatientAddress(value);
        break;
      case 'patient_state':
        setPatientState(value);
        break;
      case 'Zipcode':
        setZipcode(value);
        break;
      default:
        break;
    }
  };

  const handleBirthDateChange = (value, dateString) => {
    setBirthDayPreview(value);
    setPatientBirthDate(dateString);
  };

  const handleCloseModalAddPatient = () => {
    setModalAddPatient(false);
  };

  const handleChange2 = (value, option) => {
    if (!value) {
      handleMemberSelect(null);
      return;
    }

    const selectedMember = member.results.find((mem) => mem.id.toString() === value);
    if (selectedMember) {
      handleMemberSelect(selectedMember);
    } else if (option && option.key === "search") {
      const searchValue = option.props.children;
      const searchedMembers = member.results.filter(mem =>
        mem.first_name && mem.first_name.toLowerCase().includes(searchValue.toLowerCase())
      );
      console.log("Search results:", searchedMembers);
    }
  };

  useEffect(() => {
    if (item) {
      setMembers(item);
      getPatients()
    }
  }, [item, searchQuery2]);

  return (
    <div className="modal2-form">
      <div className="modal-step1">
        <Form.Item className="modal1-form1" name="treatment">
          <Text className="modal1-text1">Patient</Text>
          <Select
            dropdownRender={(menu) => (
              <>
                {menu}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    type="primary"
                    style={{
                      background: 'white',
                      color: '#6B43B5',
                      width: '100%',
                      border: '1px solid #6B43B5',
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                      borderBottomLeftRadius: 8,
                      borderBottomRightRadius: 8,
                      height: 52,
                    }}
                    onClick={() => setModalAddPatient(true)}
                  >
                    Add new Patient
                  </Button>
                </div>
              </>
            )}
            className="modal1-select"
            placeholder="Select Patient"
            onChange={handleChange2}
            showSearch
            onSearch={setSearchQuery2}
            optionFilterProp="data-label"
            // filterOption={(input, option) => option.props['data-label'].toLowerCase().includes(input.toLowerCase())}
          >
            {member.results && member.results.map((mem) => (
              <Option
                value={mem.id.toString()}
                key={mem.id}
                data-label={mem.first_name + " " + mem.last_name}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <div style={{ marginBottom: 10 }}>
                        {mem.first_name + ' ' + mem.last_name}
                      </div>
                    </div>
                    <span
                      style={{
                        marginRight: '8px',
                        fontSize: 12,
                      }}
                    >
                      <img src={call} alt="" /> {mem.phone}
                    </span>
                    <div style={{ color: '#848696', fontSize: '12px' }}>
                      <span style={{ fontSize: 12 }}>
                        <img src={sms} alt="" style={{ width: 13, height: 13 }} /> {mem.email}
                      </span>
                    </div>
                  </div>
                </div>
              </Option>
            ))}
          </Select>

        </Form.Item>
      </div>
      <Modal
        title="Add Patient"
        open={modalAddPatient}
        okText="Create"
        onCancel={handleCloseModalAddPatient}
        onOk={createNewPatient}
        className="modal-size1"
        footer={[
          <Button
            style={{ width: 139, height: 38 }}
            key="submit"
            type="primary"
            onClick={createNewPatient}
          >
            Create
          </Button>,
        ]}
      >
        <Row gutter={[20, 20]} style={{ display: "flex", flexDirection: "row" }}>
          <Col span={12}>
            <label className="formLabel">First Name</label>
            <Input
              style={{
                width: 230,
                height: 39,
                borderRadius: "8px",
                border: "1px solid #6B43B5",
              }}
              onChange={handleChange}
              className={formErrorsPatient.FirstName && formErrorsPatient.FirstName.massage !== ""
                ? "inputs-error"
                : ""}
              type="text"
              name="patient_first_name"
              placeholder="Enter Full Name"
              value={patientFirstName}
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />} />
            {formErrorsPatient.FirstName && !formErrorsPatient.FirstName.status ? (
              <div className="error-text">
                {formErrorsPatient.FirstName.massage}
              </div>
            ) : null}
          </Col>
          <Col span={12}>
            <label className="formLabel">Last Name</label>
            <Input
              style={{
                width: 230,
                height: 39,
                borderRadius: "8px",
                border: "1px solid #6B43B5",
              }}
              onChange={handleChange}
              className={formErrorsPatient.LastName && formErrorsPatient.LastName.massage !== ""
                ? "inputs-error"
                : ""}
              type="text"
              name="patient_last_name"
              placeholder="Doe"
              value={patientLastName}
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />} />
            {formErrorsPatient.LastName && !formErrorsPatient.LastName.status ? (
              <div className="error-text">
                {formErrorsPatient.LastName.massage}
              </div>
            ) : null}
          </Col>
        </Row>
        <Row gutter={[25, 25]} style={{ display: "flex", flexDirection: "row" }}>
          <Col span={24}>
            <label className="formLabel">Birth Date</label>
            <DatePicker
              style={{
                height: 39,
                borderRadius: "8px",
                border: "1px solid #6B43B5",
                width: '100%'
              }}
              name="birth_date"
              placeholder="Enter Birth Date"
              className={
                formErrorsPatient && formErrorsPatient.BirthDate && formErrorsPatient.BirthDate.status
                  ? "inputs-error"
                  : "inputs"
              }
              htmlType="submit"
              onChange={handleBirthDateChange}
              value={birthDayPreview}
              suffixIcon={<img src={calendar} alt="" />}
            />
            {formErrorsPatient && formErrorsPatient.BirthDate && !formErrorsPatient.BirthDate.status && (
              <div className="error-text">
                {formErrorsPatient.BirthDate.message}
              </div>
            )}
          </Col>
        </Row>
        <Row gutter={[25, 25]} style={{ display: "flex", flexDirection: "row" }}>
          <Col span={12}>
            <label className="formLabel">Email</label>
            <Input
              style={{
                width: 230,
                height: 39,
                borderRadius: "8px",
                border: "1px solid #6B43B5",
              }}
              onChange={handleChange}
              className={formErrorsPatient.Email && formErrorsPatient.Email.massage !== ""
                ? "inputs-error"
                : ""}
              name="patient_email_address"
              type="email"
              autoComplete="email"
              placeholder="Enter Email"
              value={patientEmailAddress} />
            {formErrorsPatient.Email && !formErrorsPatient.Email.status ? (
              <div className="error-text">
                {formErrorsPatient.Email.massage}
              </div>
            ) : null}
          </Col>
          <Col span={12}>
            <label className="formLabel">Phone</label>
            <Input
              style={{
                width: 230,
                height: 39,
                borderRadius: "8px",
                border: "1px solid #6B43B5",
              }}
              onChange={handleChange}
              className={formErrorsPatient.Phone && formErrorsPatient.Phone.massage !== ""
                ? "inputs-error"
                : ""}
              type="text"
              name="patient_phone_number"
              placeholder="Enter Phone Number"
              value={patientPhoneNumber} />
            {formErrorsPatient.Phone && !formErrorsPatient.Phone.status ? (
              <div className="error-text">
                {formErrorsPatient.Phone.massage}
              </div>
            ) : null}
          </Col>
        </Row>
        <Row gutter={[25, 25]} style={{ display: "flex", flexDirection: "row" }}>
          <Col span={8}>
            <label className="formLabel">State</label>
            <Input
              style={{
                width: 145,
                height: 39,
                borderRadius: "8px",
                border: "1px solid #6B43B5",
              }}
              className={formErrorsPatient.pState && formErrorsPatient.pState.massage !== ""
                ? "inputs-error"
                : ""}
              onChange={handleChange}
              type="text"
              name="patient_state"
              placeholder="Enter State"
              value={patientState} />
            {formErrorsPatient.pState && !formErrorsPatient.pState.status ? (
              <div className="error-text">
                {formErrorsPatient.pState.massage}
              </div>
            ) : null}
          </Col>
          <Col span={8}>
            <label className="formLabel">City</label>
            <Input
              style={{
                width: 145,
                height: 39,
                borderRadius: "8px",
                border: "1px solid #6B43B5",
              }}
              className={formErrorsPatient.City && formErrorsPatient.City.massage !== ""
                ? "inputs-error"
                : ""}
              onChange={handleChange}
              type="text"
              name="patient_city"
              placeholder="Enter City"
              value={patientCity} />
            {formErrorsPatient.City && !formErrorsPatient.City.status ? (
              <div className="error-text">
                {formErrorsPatient.City.massage}
              </div>
            ) : null}
          </Col>
          <Col span={8}>
            <label className="formLabel">Postal Code</label>
            <Input
              style={{
                width: 145,
                height: 39,
                borderRadius: "8px",
                border: "1px solid #6B43B5",
              }}
              className={formErrorsPatient.Zipcode && formErrorsPatient.Zipcode.massage !== ""
                ? "inputs-error"
                : ""}
              onChange={handleChange}
              type="text"
              name="Zipcode"
              placeholder="Enter Postal Code"
              value={zipcode} />
            {formErrorsPatient.Zipcode && !formErrorsPatient.Zipcode.status ? (
              <div className="error-text">
                {formErrorsPatient.Zipcode.massage}
              </div>
            ) : null}
          </Col>
        </Row>
        <div style={{ marginBottom: 35 }}>
          <label className="formLabel">Address</label>
          <Input
            style={{
              height: 39,
              borderRadius: "8px",
              border: "1px solid #6B43B5",
            }}
            onChange={handleChange}
            className={formErrorsPatient.Address && formErrorsPatient.Address.massage !== ""
              ? "inputs-error"
              : ""}
            type="text"
            name="patient_address"
            placeholder="Enter Address"
            value={patientAddress} />
        </div>
        {formErrorsPatient.Address && !formErrorsPatient.Address.status ? (
          <div className="error-text">
            {formErrorsPatient.Address.massage}
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

export default ModalStep1;
