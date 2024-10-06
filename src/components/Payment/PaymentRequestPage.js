import { Row, Button, DatePicker, Input, Modal, Radio, Select, Spin, notification, message, Card, Col, Typography, Form } from 'antd'
import { QuestionCircleOutlined, DollarOutlined, CloudUploadOutlined, CloseOutlined, UserOutlined, EnvironmentOutlined, HomeOutlined, MailOutlined } from "@ant-design/icons";
import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Error } from '../../ErrorHandeling'
import { dashboardActions } from '../../actions'
import { controller } from '../../controller'
import DashboardLayout from '../../layout/dashboardLayout/DashboardLayout'
import PayByAdmin from "./PayByAdmin"
import CreateGurantorBillingForm from './PaymentByAdmin/CreateGurantorBillingForm';
import "./style.css"
import { Paymentcontroller } from '../../Paymentcontroller';


//Icons
import add2 from '../../assets/icons/add-circle2.png';
import export1 from '../../assets/icons/export1.png';
import calendar from '../../assets/icons/calendar.png';
import arrow from '../../assets/icons/arrow-left.png';
import sms from '../../assets/icons/sms1.png';
import call from '../../assets/icons/call2.png';
import { error } from 'pdf-lib';



const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography
const { Item } = Form

class PaymentRequestPage extends Component {


  // check submited helcim form
  componentDidMount() {


    localStorage.removeItem("inter")
    // Retrieve the value from localStorage
    const storedValue = localStorage.getItem('pat_name');
    this.setState({ value: storedValue });

    const storedValue2 = localStorage.getItem('gurantor.name');
    this.setState({ value2: storedValue2 });

    const storedValue3 = localStorage.getItem('guarantor.id');
    this.setState({ value3: storedValue3 });


    const preselectedId = localStorage.getItem("pat_id");
    this.setState({ patientId: preselectedId })

    localStorage.removeItem("pat_id")
    localStorage.removeItem("pat_name")
    localStorage.removeItem("gurantor.name")
    localStorage.removeItem('guarantor.id')
    localStorage.removeItem('payAdminId')
    const { paymentId } = this.props;
    localStorage.setItem("singlePaymentId", paymentId);
    var type = localStorage.getItem('type');

    // Function to parse URL parameters
    const getUrlParameter = (name) => {
      const urlParams = new URLSearchParams(window.location.search);
      if (name) {
        return urlParams.get(name) ? decodeURIComponent(urlParams.get(name).replace(/\+/g, ' ')) : '';
      }
      return window.location.href; // Return the complete URL if no parameter name is provided
    };

    // Get the value of responseMessage and cardToken from URL parameters
    const responseMessage = getUrlParameter('responseMessage');
    const responseMessage2 = getUrlParameter();
    const cardToken = getUrlParameter('cardToken');

    // Check if responseMessage is "APPROVED" and log cardToken
    if (responseMessage === 'APPROVED' || responseMessage === 'APPROVAL' || window.location.href.includes("/?")) {
      const userIp = this.handleReadDataIP();

      if (type === 'single') {
        this.handleApprovedCardByHelcim(cardToken, responseMessage2);
      } else if (type === 'wizard') {
        this.handleApprovedCardByHelcim2(cardToken, responseMessage2);
      }

      console.log('user ip:', userIp);
      console.log('Card Token:', cardToken);
    } else {
      this.setState({
        loadingHelcimResultCheck: false
      });
    }
  }

  formRef = React.createRef();



  setMembers = (item) => {
    this.setState({ patient_information: item });
  };


  handleApprovedCardByHelcim2 = async (cardToken, responseMessage2) => {
    const paymentId = localStorage.getItem('paymentId')
    const userIP = ""
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const userIp0 = ipData.ip;
      const response = await Paymentcontroller.helcimPayMulti(
        paymentId,
        cardToken,
        userIp0,
        responseMessage2

      )

      if (response.status < 250) {
        message.success("Payment successful");
        setTimeout(() => {
          window.location.href = window.location.origin + window.location.pathname + "#/payment-requests";
        }, 2000); // delay of 2 seconds
      } else {
        Object.keys(response).forEach(resp => {
          if (resp !== "status") {
            message.error(response[resp])
            this.setState({
              response: response
            })
          };
        });
        this.setState({
          loadingHelcimResultCheck: false
        })
        this.setState({
          loadingHelcimResultCheck: false
        })
        setTimeout(() => {
          window.location.href = window.location.origin + window.location.pathname + "#/payment-requests";
        }, 2000); // delay of 4 seconds
      }
    } catch (error) {
      console.error('Error fetching IP address:', error);
    }
  }



  handleApprovedCardByHelcim = async (cardToken, responseMessage2) => {
    console.log(cardToken)
    var paymentId = ""
    if (localStorage.getItem("paymentId")) {
      paymentId = localStorage.getItem("paymentId")

      const userIP = ""
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const userIp0 = ipData.ip;
        const response = await Paymentcontroller.helcimPay(
          paymentId,
          cardToken,
          userIp0,
          responseMessage2
        )

        if (response.status < 250) {
          message.success("Payment successful");
          setTimeout(() => {
            window.location.href = window.location.origin + window.location.pathname + "#/payment-requests";
          }, 2000); // delay of 2 seconds
        } else {
          var errors = Object.keys(response)

          Object.keys(response).forEach(resp => {
            if (resp !== "status") {
              message.error(response[resp])
              this.setState({
                response: response
              })
            };
          });
          this.setState({
            loadingHelcimResultCheck: false
          })
          setTimeout(() => {
            window.location.href = window.location.origin + window.location.pathname + "#/payment-requests";
          }, 2000); // delay of 2 seconds
        }
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    }
    else if (localStorage.getItem("multiPaymentId")) {
      paymentId = localStorage.getItem("multiPaymentId")

      const userIP = ""
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const userIp0 = ipData.ip;
        const response = await Paymentcontroller.helcimPayMulti(
          paymentId,
          cardToken,
          userIp0
        )

        if (response.status < 250) {
          message.success("Payment successful");
          setTimeout(() => {
            window.location.href = window.location.origin + window.location.pathname + "#/payment-requests";
          }, 2000); // delay of 2 seconds
        } else {
          var errors = Object.keys(response)

          errors.map((resp) =>
            resp != "status" ? message.error(response[resp]) : ""
          )
          this.setState({
            loadingHelcimResultCheck: false
          })
          setTimeout(() => {
            window.location.href = window.location.origin + window.location.pathname + "#/payment-requests";
          }, 2000); // delay of 2 seconds
        }
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    }
    else {
      return
    }

    localStorage.removeItem("singlePaymentId")
    localStorage.removeItem("multiPaymentId")

  }

  get_patient_data = async () => {
    this.setState({ loadingPatient: true });
    try {
      const response = await controller.getPatient2();
      console.log("Response received:", response); // Log the response for debugging
      if (response) {
        this.setState({
          patient_information: response,
          loadingPatient: false
        });
      } else {
        this.setState({
          patient_information: [], // Handle no data scenario
          loadingPatient: false
        });
      }
    } catch (error) {
      console.error('Error fetching patient data:', error);
      this.setState({
        patient_information: [], // Reset or handle error states
        loadingPatient: false
      });
    }
  };



  // Function to fetch guarantor data
  get_gar_data = async () => {
    const id = localStorage.getItem("pat_id") || this.state.patientId;
    try {
      const response = await controller.getGuarantor2(id);
      if (response && response.results) {
        this.setState({ gar_info: response.results });
      } else {
        console.error("No results found in response:", response);
      }
    } catch (error) {
      console.error("Error fetching guarantor data:", error);
    }
  };

  // Detect changes in searchQuery and fetch new data accordingly
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.get_patient_data();
    }
  }


  handleChangeSelectPatient = (value) => {
    this.setState({ patientId: value }, () => {
      this.get_gar_data();
    });
  };


  handleChangeSelectGar = (value) => {
    this.setState({ garId: value }, () => {
    });
  };

  handleChangeSelectProvider = (event) => {
    this.setState({ SelectedProvider: event })
  }

  handleShowModalAddPatient = async () => {
    this.setState({ modal_add_patient: true })
    const responseGetProvider = await controller.get_provider(
      localStorage.getItem("selectedOffice"),
      null
    )
    if (responseGetProvider.status < 250) {
      this.setState({ providerList: responseGetProvider.data })
    }
  }

  handleShowModalAddGar = async () => {
    this.setState({ modal_add_gar: true })
  }

  disabledDate = (current) => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 9999999);
    const previousDate = new Date(today);
    previousDate.setDate(today.getDate() - 1);
    return current && (current < today || current > futureDate);
  };
  handleDateChange = (date, e) => {
    this.setState({ inputDate: date, inputDateValue: e });
  };
  handleDateChangeDueDate = (date, e) => {
    this.setState({ inputDateDueDate: date, inputDateValueDueDate: e });
  };

  handleCloseModalAddPatient = () => {
    this.setState({
      other_reason: "",
      showReasonTextBox: false,
      SelectedProvider: null,
      patient_birth_Date: null,
      birth_day_preview: "",
      patient_address: "",
      patient_first_name: "",
      patient_last_name: "",
      patient_email_address: "",
      patient_phone_number: "",
      patient_city: "",
      patient_state: "",
      Zipcode: "",
      formErrorsPatient: {
        pState: {
          massage: "",
          status: true
        },
        Zipcode: {
          massage: "",
          status: true
        },
        Address: {
          massage: "",
          status: true
        },
        BirthDate: {
          massage: "",
          status: true
        },
        SelectProvider: {
          massage: "",
          status: true
        },

        FirstName: {
          massage: "",
          status: true
        },
        LastName: {
          massage: "",
          status: true
        },
        Email: {
          massage: "",
          status: true
        },
        Phone: {
          massage: "",
          status: true
        },
        City: {
          massage: "",
          status: true
        },
      },

    })
    this.setState({ modal_add_patient: false })
  }

  handleCloseModalAddGar = () => {
    this.setState({
      modal_add_gar: false,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      state: '',
      address: '',
      zipcode: '',
    });

    if (this.formRef.current) {
      this.formRef.current.resetFields();
    }
  };


  constructor(props) {

    super(props);
    const patientId = window.location.href.split("?ARid=")[1]
      ? localStorage.getItem("patientId") + ""
      : null;
    // const selectedPatient = this.getSelectedPatient(patientId);

    this.state = {
      statement_descriptor: "smilepass",
      payAdminId: -1,
      payStateAdmin: false,
      // payStateAdmin: false,
      payByAdmin: "true",
      inputDate: null,
      selectedPatient: null, // To store selected patient's ID and name
      inputDateValue: null,
      inputDateDueDate: null,
      inputDateValueDueDate: null,
      loadingPatient: true,
      loadingHelcimResultCheck: null,
      reasons: [],
      available_interval: [],
      birth_day_preview: "",
      loaddingsendPayReq: false,
      patient_id: window.location.href.split("?id=")[1] ? localStorage.getItem("patientId") + "" : "",
      patient_name: '',
      patient_email: '',
      patient_phone: '',
      stripe_complete: true,
      reason: [],
      appointment_datetime: null,
      amount: window.location.href.split("?id=")[1] ?
        eval(localStorage.getItem("totalAmount.id")) : null,
      receipt_file: [],
      supporting_document: [],
      submitted: false,
      collapsed: false,
      patient_information: [],
      gar_info: [],
      modal_add_patient: false,
      modal_add_gar: false,
      newPatientID: window.location.href.split("?id=")[1] ? window.location.href.split("?id=")[1] + "" : "",
      patientId: "",
      selectedPatientID: null,
      selectedPatientFirstName: undefined,
      garId: null,
      availableIntervals: [],
      providerList: [],
      temp_patient: {},
      temp_flag: false,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      state: "",
      address: "",
      zipcode: "",
      patient_first_name: "",
      searchQuery: "",
      value: '',
      value2: '',
      value3: '',
      patient_last_name: "",
      patient_email_address: "",
      patient_phone_number: "",
      patient_city: "",
      SelectedProvider: "",
      patient_birth_Date: "",
      patient_address: "",
      patient_state: "",
      Zipcode: "",
      formErrorsPayReq: {

        SelectPatient: {
          massage: "",
          status: true
        },
        Reason: {
          massage: "",
          status: true
        },
        AppointmentDate: {
          massage: "",
          status: true
        },
        Amount: {
          massage: "",
          status: true
        },
        PaymentOption: {
          massage: "",
          status: true
        },
        StatementDescriptor: {
          massage: "",
          status: true
        },
        InvoicePDF: {
          massage: "",
          status: true
        },
        SupportingPDF: {
          massage: "",
          status: true
        },

      },

      formErrorsGar: {
        firstName: {
          message: '',
          status: true
        },
        lastName: {
          message: '',
          status: true
        },
        email: {
          message: '',
          status: true
        },
        phone: {
          message: '',
          status: true
        },
        state: {
          message: '',
          status: true
        },
        address: {
          message: '',
          status: true
        },
        zipcode: {
          message: '',
          status: true
        }
      },


      formErrorsPatient: {
        pState: {
          massage: "",
          status: true
        },
        Zipcode: {
          massage: "",
          status: true
        },
        Address: {
          massage: "",
          status: true
        },
        BirthDate: {
          massage: "",
          status: true
        },
        SelectProvider: {
          massage: "",
          status: true
        },
        FirstName: {
          massage: "",
          status: true
        },
        LastName: {
          massage: "",
          status: true
        },
        Email: {
          massage: "",
          status: true
        },
        Phone: {
          massage: "",
          status: true
        },
        City: {
          massage: "",
          status: true
        }
      }


    }

    this.handleChangePaymentTypeAdmin();
    this.getReasons();
    this.handleReadDataIP = this.handleReadDataIP.bind(this);
    this.handleApprovedCardByHelcim = this.handleApprovedCardByHelcim.bind(this)
    this.handleSearchPatient = this.handleSearchPatient.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleDateChangeDueDate = this.handleDateChangeDueDate.bind(this)
    this.getIntervals = this.getIntervals.bind(this)

    this.handleBirthDateChange = this.handleBirthDateChange.bind(this)
    this.handleMenuClick = this.handleMenuClick.bind(this)
    this.handleUpload = this.handleUpload.bind(this)

    this.props.dispatch(dashboardActions.fetchProfileSummary())
    this.get_patient_data();
    this.getIntervals();

  }






  handleReadDataIP = async () => {

    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const userIp0 = ipData.ip;
      return userIp0.ip


    } catch (error) {
      console.error('Error fetching IP address:', error);
    }
    return null;
  };

  handleChangePaymentTypeAdmin = (e) => {
    if (localStorage.getItem("wizard_recurring_interval_count_name")) {
      localStorage.removeItem("wizard_recurring_interval_count_name")
    }
    if (e && e.target && e.target.value) {
      console.log(e.target.value)
      this.setState({
        payByAdmin: e.target.value == "true" ? "true" : "false"
      })
    }
  }

  handleUpload = e => {
    var files = this.state.receipt_file
    for (var i in e) {
      if (e[i] && e[i].name) {
        files.push(e[i])
        this.setState({ receipt_file: files })
      } else {
        files.push(e.target.files[i])
        this.setState({ receipt_file: files })
      }
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getReasons = async () => {
    const response = await controller.getReasonsList();
    this.setState({
      reasons: response
    })

  }

  getPaymentData = async () => {
    this.setState({
      loading: true,
    });


    const response = await Paymentcontroller.get_payment_data(
      this.state.payAdminId
    );
    if (response.paid || response.status == "subscription") {
      localStorage.setItem("Payment-Receipt", true);
      this.setState({
        paymentDoneState: true
      })
    } else {
      localStorage.setItem("Payment-Receipt", false);
      if (!response.billing_complete) {
        this.setState({
          stripe_complete: false,
        });
      }
    }
    this.setState({
      payment_data: response,
      loading: false,
    });

  };

  handleSearchChange = (value) => {
    this.setState({ searchQuery: value });
  };

  getIntervals = async () => {
    const response = await controller.getAvailableIntervals();
    this.setState({
      availableIntervals: response
    })

  }



  goToDashboard = () => {
    this.props.dispatch(push(`/payment-requests`))
  }



  handleSubmitPayAdmin = async (e) => {
    e.preventDefault();
    this.setState({ submitted: true, loaddingsendPayReq: true, payByAdmin: true });

    console.log(this.state.payByAdmin);


    const availableIntervalValidation = this.state.available_interval && this.state.available_interval.length > 0;
    if (!availableIntervalValidation) {
      this.setState({
        formErrorsPayReq: {
          ...this.state.formErrorsPayReq,
          available_interval: {
            message: "Please select at least one payment option.",
            status: false
          }
        },
        loaddingsendPayReq: false,
      });
      return; // Stop the submission if no payment option is selected
    }

    // Continue with other validations
    const Reason_validation = await Error.SelectItem(this.state.reason);
    const Amount_validation = await Error.AmountHandling(this.state.amount);
    const Payment_validation = this.state.available_interval && this.state.available_interval.length > 0;
    console.log(Reason_validation, Amount_validation);
    this.setState({
      formErrorsPayReq: {
        Reason: Reason_validation,
        Amount: Amount_validation,
        PaymentOption: Payment_validation ? { message: "", status: true } : { message: "Please select at least one payment option.", status: false },
      }
    });

    if (Amount_validation.status) {
      let phone_number = this.state.patient_phone;
      if (phone_number.indexOf("+1") != 0) {
        if (phone_number.indexOf("1") == 0) {
          phone_number = "+" + phone_number;
        } else {
          phone_number = "+1" + phone_number;
        }
      }



      // var allIntervals = [];
      // this.state.availableIntervals.map((interval) => (
      //   allIntervals.push(interval.id)
      // ));

      const data = {
        available_interval: this.state.available_interval,
        garId: this.state.value3 ? this.state.value3 : this.state.garId,
        office_id: localStorage.getItem("selectedOffice"),
        reason: this.state.reason ? this.state.reason : [],
        other_reason: this.state.other_reason ? this.state.other_reason : "",
        amount: this.state.amount,
        receipt_file: this.state.receipt_file,
        supporting_document: this.state.supporting_document,
        patient_id: this.state.patientId,
      };

      console.log(data);

      let formData = new FormData();
      data.available_interval.forEach(item => {
        formData.append('available_interval', item);
      });
      // formData.append('available_interval', 1); // Append '1' as the last 'available_interval' entry

      if (data.reason && data.reason.length > 0) {
        data.reason.forEach(reason => {
          formData.append('reason_text', reason);
        });
      } else {
        formData.append('other_reason', data.other_reason);
      }

      if (data.garId) {
        formData.append('guarantor', data.garId);
      }
      formData.append('patient', data.patient_id);
      formData.append('office', data.office_id);
      formData.append('amount', data.amount);

      if (data.receipt_file) {
        data.receipt_file.forEach(item => {
          formData.append('invoices', item);
        });
      }

      if (data.supporting_document) {
        data.supporting_document.forEach(item => {
          formData.append('supporting_documents', item);
        });
      }

      if (window.location.href.split("?id=")[1]) {
        formData.append('accounts_receivable', window.location.href.split("?id=")[1]);
        localStorage.removeItem("guarantor.id");
      }

      if (this.state.inputDate) {
        formData.append('start_date', this.state.inputDateValue);
      }

      if (this.state.inputDateValueDueDate) {
        formData.append('due_date', this.state.inputDateValueDueDate);
      }

      if (this.state.payByAdmin) {
        formData.append('is_by_admin', true);
      }

      console.log(Array.from(formData.entries()));

      try {
        const response = window.location.href.split("?id=")[1] ?
          await controller.createPayReqAR(formData) :
          await controller.createPayReq(formData);

        console.log(response);

        if (response.status < 250) {
          this.openNotification('bottom', response.message ? response.message : "", "Successful");
          localStorage.removeItem("pat_name")
          localStorage.removeItem("pat_id")
          if (this.state.payByAdmin) {
            localStorage.setItem("payAdminId", response.id);
            this.setState({
              payAdminId: response.id,
              payStateAdmin: true,
              payadminid: response.id
            });
          }
          this.getPaymentData()
        } else {
          this.openNotification('bottom', response.detail ? response.detail : response.massage, "Error");
          this.setState({
            formErrorsPayReq: {
              SelectPatient: {
                massage: response.patient ? response.patient[0] : "",
                status: response.patient ? false : true
              },
              SupportingPDF: {
                massage: response.supporting_document ? response.supporting_document[0] : "",
                status: response.supporting_document ? false : true
              },
              InvoicePDF: {
                massage: response.invoice ? response.invoice[0] : "",
                status: response.invoice ? false : true
              },
              Amount: {
                massage: response.amount ? response.amount[0] : "",
                status: response.amount ? false : true
              },
              Reason: {
                massage: response.reason_text ? response.reason_text[0] : "",
                status: response.reason_text ? false : true
              },
            }
          });
        }
      } catch (error) {
        console.error('Request failed', error);
      }
    }

    this.setState({ loaddingsendPayReq: false });
  };



  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ submitted: true, loaddingsendPayReq: true, payByAdmin: false });
    

    // Validation checks
    const Reason_validation = await Error.SelectItem(this.state.reason);
    const Amount_validation = await Error.AmountHandling(this.state.amount);
    const Payment_validation = this.state.available_interval && this.state.available_interval.length > 0;

    this.setState({
      formErrorsPayReq: {
        Reason: Reason_validation,
        Amount: Amount_validation,
        available_interval: Payment_validation ? { message: "", status: true } : { message: "Please select at least one payment option.", status: false },
      }
    });

    // If all validations pass, proceed with form submission
    if (Amount_validation.status && Payment_validation) {
      let phone_number = this.state.patient_phone;
      if (phone_number.indexOf("+1") != 0) {
        if (phone_number.indexOf("1") == 0) {
          phone_number = "+" + phone_number;
        } else {
          phone_number = "+1" + phone_number;
        }
      }

      const data = {
        available_interval: this.state.available_interval,
        garId: this.state.value3 ? this.state.value3 : this.state.garId,
        office_id: localStorage.getItem("selectedOffice"),
        reason: this.state.reason ? this.state.reason : [],
        other_reason: this.state.other_reason ? this.state.other_reason : "",
        amount: this.state.amount,
        receipt_file: this.state.receipt_file,
        supporting_document: this.state.supporting_document,
        patient_id: this.state.patientId,
      };

      let formData = new FormData();
      data.available_interval.forEach(item => {
        formData.append('available_interval', item);
      });

      if (data.reason && data.reason.length > 0) {
        data.reason.forEach(reason => {
          formData.append('reason_text', reason);
        });
      } else {
        formData.append('other_reason', data.other_reason);
      }

      if (data.garId) {
        formData.append('guarantor', data.garId);
      }
      formData.append('patient', data.patient_id);
      formData.append('office', data.office_id);
      formData.append('amount', data.amount);

      if (data.receipt_file) {
        data.receipt_file.forEach(item => {
          formData.append('invoices', item);
        });
      }

      if (data.supporting_document) {
        data.supporting_document.forEach(item => {
          formData.append('supporting_documents', item);
        });
      }

      if (window.location.href.split("?id=")[1]) {
        formData.append('accounts_receivable', window.location.href.split("?id=")[1]);
        localStorage.removeItem("guarantor.id");
      }

      if (this.state.inputDate) {
        formData.append('start_date', this.state.inputDateValue);
      }

      if (this.state.inputDateValueDueDate) {
        formData.append('due_date', this.state.inputDateValueDueDate);
      }

      try {
        const response = window.location.href.split("?id=")[1] ?
          await controller.createPayReqAR(formData) :
          await controller.createPayReq(formData);

        if (response.status < 250) {
          this.openNotification('bottom', response.message ? response.message : "", "Successful");
          if (this.state.payByAdmin === "true") {
            window.location.href = "#/payment/" + response.id;
            localStorage.removeItem("pat_name");
            localStorage.removeItem("pat_id");
          } else {
            window.location.href = "#/payment-requests";
          }
        } else {
          this.openNotification('bottom', response.detail ? response.detail : response.massage, "Error");
          this.setState({
            formErrorsPayReq: {
              SelectPatient: {
                message: response.patient ? response.patient[0] : "",
                status: response.patient ? false : true
              },
              SupportingPDF: {
                message: response.supporting_document ? response.supporting_document[0] : "",
                status: response.supporting_document ? false : true
              },
              InvoicePDF: {
                message: response.invoice ? response.invoice[0] : "",
                status: response.invoice ? false : true
              },
              Amount: {
                message: response.amount ? response.amount[0] : "",
                status: response.amount ? false : true
              },
              Reason: {
                message: response.reason_text ? response.reason_text[0] : "",
                status: response.reason_text ? false : true
              },
            }
          });
        }
      } catch (error) {
        console.error('Request failed', error);
      }
    }

    this.setState({ loaddingsendPayReq: false });
  };


  onCollapse = collapsed => {
    this.setState({ collapsed })
  }



  handleSearchPatient = async (e) => {
    const response = await controller.get_guarantor_search(localStorage.getItem("selectedOffice"), e)
    if (response)
      this.setState({ patient_information: response })
  }

  handleChange(e) {
    let { name, value } = e.target


    if (name == "patient_phone_number") {
      value = value.replace(/ /g, "")
      if (value.length < 10) {
        if (value.length == 8) {
          value = value.replace(/ /g, "")
          this.setState({ "patient_phone_number": value.slice(0, 3) + " " + value.slice(3, 6) + " " + value.slice(6,) })
        }
        else {
          value = value.replace(/[^\dA-Z]/g, '').replace(/(.{3})/g, '$1 ').trim();
          this.setState({ [name]: value })
        }
      }
      if (value.length == 10) {


        value = value.slice(0, 3) + " " + value.slice(3, 6) + " " + value.slice(6,)
        this.setState({ [name]: value })
      }
    }

    else {

      this.setState({ [name]: value })
    }
  }
  handleUploadSupportingDocument = e => {
    console.log(e)
    var files = this.state.supporting_document
    for (var i in e) {
      if (e[i] && e[i].name) {
        files.push(e[i])
        this.setState({ supporting_document: files })
      } else {
        files.push(e.target.files[i])
        this.setState({ supporting_document: files })
      }
    }

  }

  handleDateChange(value, dateString) {
    this.setState({
      ...this.state,
      appointment_datetime: dateString
    })
  }
  handleBirthDateChange(value, dateString) {
    this.setState({
      ...this.state,
      birth_day_preview: value,
      patient_birth_Date: dateString
    })

  }

  handleMenuClick(e) {
    this.setState({
      ...this.state,
      reason: e.item.props.children[1]
    })
  }

  openNotification = (placement, message, status) => {
    if (status && status.toLowerCase().search("success") != -1) {
      notification.success({
        message: status,
        description: message,
        placement,
      });
    } else if (status && status.toLowerCase().search("error") != -1) {
      notification.error({
        message: status,
        description: message,
        placement,
      });
    } else {
      notification.info({
        message: status,
        description: message,
        placement,
      });
    }
  };
  handleSearchOfficeID = (event) => {
  }
  createNewPatient = async () => {
    const patient_first_name_validation = await Error.NameHandling(this.state.patient_first_name)
    const patient_last_name_validation = await Error.NameHandling(this.state.patient_last_name)
    //const patient_email_address_validation = await Error.EmailHandling(this.state.patient_email_address)
    //const patient_phone_number_validation = await Error.PhoneHandling(this.state.patient_phone_number.replace(/ /g, ""))
    const patient_city_validation = await Error.NameHandling(this.state.patient_city)
    //const patient_birth_Date_validation = await Error.BirthDateHandling(this.state.patient_birth_Date)
    const patient_address_validation = await Error.SelectItem(this.state.patient_address)
    const zipcode_validation = await Error.SelectItem(this.state.Zipcode)
    const pstate_validation = await Error.SelectItem(this.state.patient_state)

    const email_or_phone_validation = await Error.EmailOrPhoneHandling(this.state.patient_email_address, this.state.patient_phone_number.replace(/ /g, ""))

    console.log("email_or_phone_validation", email_or_phone_validation)
    if (
      patient_first_name_validation.status &&
      patient_last_name_validation.status &&
      //patient_email_address_validation.status &&
      //patient_phone_number_validation.status &&
      //patient_birth_Date_validation.status &&
      email_or_phone_validation.status &&
      patient_address_validation.status &&
      zipcode_validation.status &&
      pstate_validation.status &&
      patient_city_validation.status
    ) {
      const response = await controller.createGuarantor(
        this.state.patient_first_name,
        this.state.patient_last_name,
        this.state.patient_email_address,
        this.state.patient_phone_number.replace(/ /g, ""),
        this.state.patient_city,
        this.state.patient_birth_Date,
        this.state.patient_address,
        this.state.patient_state,
        this.state.Zipcode,
      )
      if (response.status < 250) {
        this.setState({
          patient_id: response.id,

          formErrorsPatient: {
            Zipcode: {
              massage: "",
              status: true
            },
            pState: {
              massage: "",
              status: true
            },
            Address: {
              massage: "",
              status: true
            },
            BirthDate: {
              massage: "",
              status: true
            },
            SelectProvider: {
              massage: "",
              status: true
            },
            FirstName: {
              massage: "",
              status: true
            },
            LastName: {
              massage: "",
              status: true
            },
            Email: {
              massage: "",
              status: true
            },
            Phone: {
              massage: "",
              status: true
            },
            City: {
              massage: "",
              status: true
            },
          }
        })
        this.openNotification('bottom', response.message, "Successful");

        this.get_patient_data()

        this.setState({
          patient_first_name: "",
          patient_last_name: "",
          patient_email_address: "",
          patient_phone_number: "",
          patient_city: "",
          SelectedProvider: null,
          patient_birth_Date: null,
          birth_day_preview: "",
          patient_address: "",
          patient_state: "",
          Zipcode: "",

        })
        this.setState({
          modal_add_patient: false,

        })
        const response_get_patient = await controller.getPatient2()
        this.setState({
          patient_information: response_get_patient,
          newPatientID: response.id + ""
        })
      } else {
        this.openNotification('bottom', "Invalid Data", "Error");
        this.setState({
          formErrorsPatient: {
            pState: {
              massage: response.state ? response.state[0] : "",
              status: response.state ? false : true
            },
            Zipcode: {
              massage: response.zipcode ? response.zipcode[0] : "",
              status: response.zipcode ? false : true
            },
            Address: {
              massage: response.address ? response.address[0] : "",
              status: response.address ? false : true
            },
            BirthDate: {
              massage: response.birth_date ? response.birth_date[0] : "",
              status: response.birth_date ? false : true
            },
            FirstName: {
              massage: response.first_name ? response.first_name[0] : "",
              status: response.first_name ? false : true
            },
            LastName: {
              massage: response.last_name ? response.last_name[0] : "",
              status: response.last_name ? false : true
            },
            Email: {
              massage: response.email ? response.email[0] : "",
              status: response.email ? false : true
            },
            Phone: {
              massage: response.phone ? response.phone[0] : "",
              status: response.phone ? false : true
            },
            City: {
              massage: response.city ? response.city[0] : "",
              status: response.city ? false : true
            },


          }
        })
      }
    } else {
      this.setState({
        formErrorsPatient: {
          Email: email_or_phone_validation.type == "email" ?
            email_or_phone_validation
            :
            {
              massage: '',
              status: true,
            },
          FirstName: patient_first_name_validation,
          LastName: patient_last_name_validation,
          Phone: email_or_phone_validation.type == "phone" ?
            email_or_phone_validation
            :
            {
              massage: '',
              status: true,
            },
          City: patient_city_validation,
          Address: patient_address_validation,
          //BirthDate: patient_birth_Date_validation,
          Zipcode: zipcode_validation,
          pState: pstate_validation,
        }

      })
    }
  }
  createNewGar = async () => {
    const { firstName, lastName, email, phone, patientId, address, zipcode, state } = this.state;

    console.log(patientId);

    try {
      const response = await controller.createGuarantor2(patientId, firstName, lastName, email, phone, address, state, zipcode);
      console.log('New guarantor created:', response.data);

      if (response.status < 250) {
        message.success('Guarantor created successfully!');
        await this.get_gar_data();
        this.handleCloseModalAddGar();
      } else {
        message.error('Failed to create guarantor. Please try again.');
        this.handleCloseModalAddGar();
      }
    } catch (error) {
      console.error('There was an error creating the guarantor:', error);
      if (error.response && error.response.data && error.response.data.message) {
        message.error(`Failed to create guarantor: ${error.response.data.message}`);
      } else {
        message.error('Failed to create guarantor. Please try again later.');
      }
      this.handleCloseModalAddGar();
    }
  };


  handleChange2 = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSearch = (value) => {
    console.log('search:', value);  // For debugging: logs every search input
    this.setState({ searchQuery: value });
  };

  handleSubmit2 = () => {
    this.setState({
      stripe_complete: true
    })
  };




  render() {

    const { creating, error, profileSummary } = this.props

    const patient_name_error = this.state.submitted && error && error.data && error.data.patient_name
    const patient_phone_error = this.state.submitted && error && error.data && error.data.patient_phone
    const patient_email_error = this.state.submitted && error && error.data && error.data.patient_email
    const datetime_error = this.state.submitted && error && error.data && error.data.appointment_datetime
    const amount_error = this.state.submitted && error && error.data && error.data.amount

    const button_text = this.state.loaddingsendPayReq ? 'Sending ...' : 'Send'
    const name = this.state.value
    const name2 = this.state.value2

    return (
      this.state.loadingHelcimResultCheck ? (
        <>
          <Row justify={"center"} className="mt5p">
            <br />
            <br />
            <br />
            <Spin size="large" />
          </Row>
          <Row justify={"center"}>
            <p
              style={{
                marginTop: "15px",
                color: " #722ed1",
                fontWeight: "600",
                fontSize: "15px",
              }}
            >
              Processing Payment
            </p>
          </Row>
        </>
      ) : (
        <DashboardLayout
          breadCrumb={"Send Payment Request"}
          logo={profileSummary && profileSummary.logo ? profileSummary.logo : ""}
          footerLogo={true}
        >
          <div>
            <div className="payreq-container">
              {this.state.payStateAdmin === true && this.state.stripe_complete ? (
                <div className="content-payreq">
                  <PayByAdmin id={this.state.payAdminId} interval={this.state.available_interval} />
                </div>
              ) : !this.state.stripe_complete ? (
                <>
                  <hr className="endline_payment" />

                  <CreateGurantorBillingForm
                    handleSubmit2={this.handleSubmit2} />
                  <div style={{ height: "15px" }}></div>
                </>
              ) : (
                <div>
                  {this.state.submitted &&
                    !creating &&
                    error &&
                    error.message && <div className="alert">{error.message}</div>}
                  <Title level={3} style={{ marginBottom: 25, marginLeft: 32 }}>
                    Payment Request
                  </Title>
                  <Card className="card-provider1">
                    <Row gutter={[45, 45]} style={{ marginBottom: 20 }}>
                      <Col span={16}>
                        <Row gutter={[45, 45]} style={{ marginBottom: 20 }}>
                          <Col span={12}>
                            <label className="formLabel">Patient</label>
                            {name ? (
                              <Input value={this.state.value} readOnly
                                style={{
                                  width: '100%',
                                  height: 42,
                                  borderRadius: '7px',
                                  border: '1px solid #6B43B5',
                                }} />
                            ) : (
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
                                        onClick={this.handleShowModalAddPatient}
                                      >
                                        Add new Patient
                                      </Button>
                                    </div>
                                  </>
                                )}
                                suffixIcon={<img src={arrow} alt="" />}
                                allowClear={true}
                                style={{
                                  width: '100%',
                                  height: 42,
                                  borderRadius: '7px',
                                  border: '1px solid #6B43B5',
                                }}
                                className={
                                  this.state.formErrorsPayReq &&
                                    this.state.formErrorsPayReq.SelectPatient &&
                                    this.state.formErrorsPayReq.SelectPatient.status
                                    ? 'inputs'
                                    : 'inputs-error'
                                }
                                value={this.state.selectedPatientFirstName || undefined}
                                showSearch
                                // onSearch={this.handleSearchChange}
                                mode="single"
                                optionLabelProp="label"
                                placeholder="Select Patient"
                                onChange={(value, option) => {
                                  this.setState({ selectedPatientFirstName: option ? option.label : '' });
                                  this.handleChangeSelectPatient(value);
                                }}
                                filterOption={(input, option) => {
                                  if (!input) return true;
                                  if (!option.label) return false;
                                  return option.label.toLowerCase().includes(input.toLowerCase());
                                }}
                              >
                                {this.state.loadingPatient ? (
                                  <Option key="loading...">
                                    Loading <Spin />
                                  </Option>
                                ) : this.state.patient_information && this.state.patient_information.length > 0 ? (
                                  this.state.patient_information.map((patient) => (
                                    <Option
                                      value={patient.id}
                                      key={patient.id}
                                      label={patient.first_name + ' ' + patient.last_name}
                                    >
                                      <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div>
                                          <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <div style={{ marginBottom: 10 }}>
                                              {patient.first_name + ' ' + patient.last_name}
                                            </div>
                                          </div>
                                          <span
                                            style={{
                                              marginRight: '8px',
                                              fontSize: 12,
                                            }}
                                          >
                                            <img src={call} alt="" /> {patient.phone}
                                          </span>
                                          <div style={{ color: '#848696', fontSize: '12px' }}>
                                            <span style={{ fontSize: 12 }}>
                                              <img src={sms} alt="" style={{ width: 13, height: 13 }} /> {patient.email}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </Option>
                                  ))
                                ) : (
                                  <Option disabled key={-2}>
                                    empty
                                  </Option>
                                )}
                              </Select>
                            )}
                          </Col>
                          <Col span={12}>
                            <label className="formLabel">Account Holder</label>
                            {name2 ? (
                              <Input value={this.state.value2} readOnly
                                style={{
                                  width: '100%',
                                  height: 42,
                                  borderRadius: '7px',
                                  border: '1px solid #6B43B5',
                                }} />
                            ) : (
                              <Select
                                disabled={!this.state.patientId}
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
                                        onClick={() => this.handleShowModalAddGar()}
                                      >
                                        Add new Guarantor
                                      </Button>
                                    </div>
                                  </>
                                )}
                                suffixIcon={<img src={arrow} alt="" />}
                                style={{
                                  width: '100%',
                                  height: 42,
                                  borderRadius: '7px',
                                  border: '1px solid #6B43B5',
                                }}
                                showSearch={true}
                                allowClear={true} // Added to allow clearing the selection
                                className={
                                  this.state.formErrorsPayReq &&
                                    this.state.formErrorsPayReq.SelectPatient &&
                                    this.state.formErrorsPayReq.SelectPatient.status
                                    ? 'inputs'
                                    : 'inputs-error'
                                }
                                value={this.state.selectedGarFirstName || undefined}
                                placeholder="Select if different than patient"
                                filterOption={(input, option) =>
                                  option.props.label.toLowerCase().includes(input.toLowerCase())
                                }
                                onChange={(value, option) => {
                                  if (value === undefined) {
                                    // Handle clearing the selection
                                    this.setState({ selectedGarFirstName: undefined });
                                  } else {
                                    this.setState({ selectedGarFirstName: option.label });
                                    this.handleChangeSelectGar(value);
                                  }
                                }}
                              >
                                {this.state.loadingPatient ? (
                                  <Option key="loading">
                                    Loading <Spin />
                                  </Option>
                                ) : (
                                  this.state.gar_info &&
                                  this.state.gar_info.map((patient) => (
                                    <Option
                                      value={patient.id.toString()}
                                      key={patient.id}
                                      label={patient.firstname + " " + patient.lastname}
                                    >
                                      <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div>
                                          <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <div style={{ marginBottom: 10 }}>
                                              {patient.firstname + ' ' + patient.lastname}
                                            </div>
                                          </div>
                                          <span style={{ fontSize: 12 }}>
                                            <img src={call} alt="" /> {patient.cell}
                                          </span>
                                          <div style={{ color: '#848696', fontSize: '12px' }}>
                                            <span style={{ fontSize: 12 }}>
                                              <img src={sms} alt="" style={{ width: 13, height: 13 }} /> {patient.email}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </Option>
                                  ))
                                )}
                              </Select>
                            )}


                          </Col>
                        </Row>
                        <Row gutter={[45, 45]} style={{ marginBottom: 20 }}>
                          <Col span={12}>
                            <label className="formLabel">Amount</label>
                            <Input
                              style={{
                                width: '100%',
                                height: 42,
                                borderRadius: '8px',
                                border: '1px solid #6B43B5',
                              }}
                              onChange={this.handleChange}
                              className={
                                this.state.formErrorsPayReq && this.state.formErrorsPayReq.Amount && this.state.formErrorsPayReq.Amount.status
                                  ? ''
                                  : 'inputs-error'
                              }
                              name="amount"
                              type="decimal"
                              placeholder="Enter Amount"
                              value={this.state.amount}
                            />
                            {this.state.formErrorsPayReq && this.state.formErrorsPayReq.Amount && this.state.formErrorsPayReq.Amount.status ? (
                              <></>
                            ) : (
                              <div className="error-text">{this.state.formErrorsPayReq.Amount.massage}</div>
                            )}
                          </Col>
                          <Col span={12}>
                            <label className="formLabel">Payment Options</label>
                            <Select
                              className={
                                this.state.formErrorsPayReq && this.state.formErrorsPayReq.PaymentOption && this.state.formErrorsPayReq.PaymentOption.status
                                  ? ''
                                  : 'inputs-error'
                              }
                              suffixIcon={<img src={arrow} alt="" />}
                              style={{
                                width: '100%',
                                height: 42,
                                borderRadius: '7px',
                                border: '1px solid #6B43B5',
                              }}

                              mode="multiple"
                              placeholder="Select Payment Options"
                              name="intervals"
                              maxTagCount={1}
                              showSearch={true}  // Enable the search option
                              filterOption={(input, option) =>
                                option.props.children.toLowerCase().includes(input.toLowerCase())
                              }
                              onChange={(e) => {
                                this.setState({
                                  available_interval: e,
                                });
                                localStorage.setItem("inter", e)
                                console.log(this.state.available_interval)
                              }}
                              optionLabelProp="label"
                            >
                              {this.state.availableIntervals
                                .filter(interval => interval.name !== '4 Days for Testing') // Filter out 'Single Payment'
                                .map((interval) => (
                                  <Option key={interval.id} value={interval.id} label={interval.name}>
                                    {interval.name}
                                  </Option>
                                ))}
                            </Select>
                            {this.state.formErrorsPayReq && this.state.formErrorsPayReq.PaymentOption && this.state.formErrorsPayReq.PaymentOption.status ? (
                              <></>
                            ) : (
                              <></>
                            )}

                          </Col>
                        </Row>
                        <Row gutter={[45, 45]} style={{ marginBottom: 20 }}>
                          <Col span={24}>
                            <label className="formLabel">Reason</label>
                            <Select
                              className="custom-select3"
                              suffixIcon={<img src={arrow} alt="" />}
                              mode={this.state.showReasonTextBox ? 'single' : 'multiple'}
                              style={{
                                width: '100%',
                                height: 42,
                                borderRadius: '7px',
                                border: '1px solid #6B43B5',
                              }}
                              placeholder="Select Reasons"
                              name="intervals"
                              maxTagCount={1}
                              value={!this.state.showReasonTextBox ? this.state.reason : 'Other'}
                              onChange={(e) => {
                                if (e && e.length > 0 && e.lastIndexOf('Other') !== -1) {
                                  this.setState({
                                    showReasonTextBox: true,
                                    reason: [],
                                  });
                                } else {
                                  this.setState({
                                    reason: e,
                                    other_reason: '',
                                    showReasonTextBox: false,
                                  });
                                }
                              }}
                              optionLabelProp="label"
                            >
                              {this.state.reasons.map((reason) => (
                                <Option value={reason.id} label={reason.reason}>
                                  {reason.reason}
                                </Option>
                              ))}
                              <Option value={'Other'} label={'Other'}>
                                Other
                              </Option>
                            </Select>
                            {this.state.showReasonTextBox ? (
                              <div className="formInputs">
                                <TextArea
                                  style={{
                                    width: '100%',
                                    height: 42,
                                    borderRadius: '7px',
                                    border: '1px solid #6B43B5',
                                    marginTop: 25
                                  }}
                                  rows={4}
                                  onChange={this.handleChange}
                                  name="other_reason"
                                  type="text"
                                  placeholder="Write Reason"
                                  value={this.state.other_reason}
                                  prefix={
                                    <QuestionCircleOutlined
                                      style={{ color: 'rgba(0,0,0,.25)' }}
                                    />
                                  }
                                />
                              </div>
                            ) : (
                              <></>
                            )}
                          </Col>
                          {/* <Col span={12}>
                            <label className="formLabel">Statement Descriptor</label>
                            <Input
                              style={{
                                width: '100%',
                                height: 42,
                                borderRadius: '8px',
                                border: '1px solid #6B43B5',
                              }}
                              onChange={this.handleChange}
                              className={
                                this.state.formErrorsPayReq &&
                                  this.state.formErrorsPayReq.StatementDescriptor &&
                                  this.state.formErrorsPayReq.StatementDescriptor.status
                                  ? 'inputs'
                                  : 'inputs-error'
                              }
                              name="statement_descriptor"
                              type="decimal"
                              disabled
                              placeholder="Enter Statement Descriptor"
                              value={this.state.statement_descriptor}
                            /> */}
                          {/* {this.state.formErrorsPayReq &&
                              this.state.formErrorsPayReq.StatementDescriptor &&
                              this.state.formErrorsPayReq.StatementDescriptor.status ? (
                              <></>
                            ) : (
                              <div className="error-text">
                                {this.state.formErrorsPayReq.StatementDescriptor.massage}
                              </div>
                            )} */}
                          {/* </Col> */}
                        </Row>
                        <Row gutter={[45, 45]} style={{ marginBottom: 20 }}>
                          <Col span={12}>
                            <label className="formLabel">Start Date</label>
                            <DatePicker
                              suffixIcon={<img src={calendar} alt="" />}
                              style={{
                                width: '100%',
                                height: 42,
                                borderRadius: '8px',
                                border: '1px solid #6B43B5',
                              }}
                              disabledDate={this.disabledDate}
                              onChange={this.handleDateChange}
                              value={this.state.inputDate}
                              placeholder="Select Start Date"
                              className="w100p"
                            />
                          </Col>
                          <Col span={12}>
                            <label className="formLabel">Due Date</label>
                            <DatePicker
                              suffixIcon={<img src={calendar} alt="" />}
                              style={{
                                width: '100%',
                                height: 42,
                                borderRadius: '8px',
                                border: '1px solid #6B43B5',
                              }}
                              onChange={this.handleDateChangeDueDate}
                              value={this.state.inputDateDueDate}
                              placeholder="Select Due Date"
                              className="w100p"
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col span={8}>
                        <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
                          <Col span={24}>
                            <label style={{ marginBottom: 0, marginTop: 25 }}>Invoice PDF File</label>
                            <Dropzone
                              style={{ width: '100%' }}
                              multiple={true}
                              accept={{
                                'file/pdf': ['.pdf'],
                              }}
                              showUploadList={false} // Hide the default file list
                              onDrop={(e) => this.handleUpload(e)}
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            >
                              {({ getRootProps, getInputProps }) => (
                                <section className="container">
                                  <div {...getRootProps({ className: 'dropzone' })}>
                                    <input {...getInputProps()} />
                                    <label
                                      // className="formLabel"
                                      style={{
                                        color: 'gray',
                                        backgroundColor: 'none',
                                        display: 'flex',
                                        height: '173px',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '1px dashed #B7B7B7',
                                        borderWidth: 2,
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        minWidth: '40%',
                                        padding: '15px',
                                        flexDirection: 'column',
                                        marginTop: 15
                                      }}
                                    >
                                      <div>
                                        <img src={export1} alt="" style={{ marginBottom: 5 }} />
                                      </div>
                                      <div style={{ color: '#B7B7B7' }}>
                                        Drag and drop or Browse your files
                                      </div>
                                    </label>
                                  </div>
                                </section>
                              )}
                            </Dropzone>
                          </Col>
                        </Row>
                        <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
                          <Col span={24}>
                            <p style={{ marginBottom: 0, marginTop: 10 }}>Supporting Document</p>
                            <Dropzone
                              multiple={true}
                              accept={{
                                'file/pdf': ['.pdf'],
                              }}
                              showUploadList={false} // Hide the default file list
                              onDrop={(e) => this.handleUploadSupportingDocument(e)}
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            >
                              {({ getRootProps, getInputProps }) => (
                                <section className="container">
                                  <div {...getRootProps({ className: 'dropzone' })}>
                                    <input {...getInputProps()} />
                                    <label
                                      // className="formLabel"
                                      style={{
                                        color: 'gray',
                                        backgroundColor: 'none',
                                        display: 'flex',
                                        height: '170px',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '1px dashed #B7B7B7',
                                        borderWidth: 2,
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        minWidth: '40%',
                                        padding: '15px',
                                        flexDirection: 'column',
                                        marginTop: 15
                                      }}
                                    >
                                      <div>
                                        <img src={export1} alt="" style={{ marginBottom: 5 }} />
                                      </div>
                                      <div style={{ color: '#B7B7B7' }}>
                                        Drag and drop or Browse your files
                                      </div>
                                    </label>
                                  </div>
                                </section>
                              )}
                            </Dropzone>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    {this.state.receipt_file && this.state.receipt_file.length > 0
                      ? this.state.receipt_file.map((file) =>
                        file.name ? (
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                              <span style={{ fontWeight: 'bold' }}> {file.name + ' '} </span>
                              selected
                            </div>
                            <div
                              onClick={() => {
                                var myfiles = this.state.receipt_file;
                                const newArray = myfiles.filter((item) => item.name !== file.name);
                                this.setState({
                                  receipt_file: newArray,
                                });
                              }}
                              style={{ cursor: 'pointer', fontSize: '10px' }}
                            >
                              <CloseOutlined />
                            </div>
                          </div>
                        ) : null
                      )
                      : null}
                    {this.state.supporting_document && this.state.supporting_document.length > 0
                      ? this.state.supporting_document.map((file) =>
                        file.name ? (
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                              <span style={{ fontWeight: 'bold' }}> {file.name + ' '} </span>
                              selected
                            </div>
                            <div
                              onClick={() => {
                                var myfiles = this.state.supporting_document;
                                const newArray = myfiles.filter((item) => item.name !== file.name);
                                this.setState({
                                  supporting_document: newArray,
                                });
                              }}
                              style={{ cursor: 'pointer', fontSize: '10px' }}
                            >
                              <CloseOutlined />
                            </div>
                          </div>
                        ) : null
                      )
                      : null}
                  </Card>
                  {/* <div className="btnBox" style={{ display: "flex", width: "95%" }}>
                    <Button
                      onClick={this.goToDashboard}
                      style={{
                        width: 131,
                        height: 45,
                        border: " 2px solid #6B43B5",
                        borderRadius: "5000px",
                        color: "#6B43B5",
                      }}
                    >
                      Back
                    </Button>

                    <Button
                      onClick={
                        this.state.payByAdmin === "true"
                          ? this.handleSubmitPayAdmin
                          : this.handleSubmit
                      }
                      type="submit"
                      disabled={this.state.loaddingsendPayReq}
                      style={{
                        marginLeft: "auto",
                        width: 131,
                        height: 45,
                        background: "#6B43B5",
                        color: "white",
                        borderRadius: "5000px",
                        fontSize: "16px",
                      }}
                    >
                      {this.state.payByAdmin === "true"
                        ? this.state.loaddingsendPayReq
                          ? "Go to Payment Flow..."
                          : "Pay"
                        : this.state.loaddingsendPayReq
                          ? "Sending..."
                          : "Send"}
                    </Button>
                  </div> */}
                  <Row justify="end" gutter={16} style={{ marginTop: 20, width: '98%' }}>
                    <Col>
                      <Button
                        onClick={this.handleSubmitPayAdmin}
                        type="submit"
                        // disabled={this.state.loaddingsendPayReq}
                        style={{
                          width: 131,
                          height: 45,
                          background: "white",
                          color: "#6B43B5",
                          borderRadius: "5000px",
                          border: '2px solid #6B43B5',
                          fontSize: "16px",
                          marginRight: 8,
                        }}
                      >
                        Pay In-Office
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        onClick={this.handleSubmit}
                        type="submit"
                        disabled={this.state.loaddingsendPayReq}
                        style={{
                          width: 218,
                          height: 45,
                          background: "#6B43B5",
                          color: "white",
                          borderRadius: "5000px",
                          fontSize: "16px",
                        }}
                      >
                        Text/Email Payment
                      </Button>
                    </Col>
                  </Row>


                </div>
              )}
            </div>
          </div>
          <Modal
            title="Add Guarantor"
            open={this.state.modal_add_gar}
            onCancel={this.handleCloseModalAddGar}
            footer={[
              <Button
                style={{ width: 139, height: 38 }}
                key="submit"
                type="primary"
                onClick={this.createNewGar}
              >
                Create
              </Button>,
            ]}
          >
            <Form layout="vertical" ref={this.formRef} style={{ maxWidth: '600px', margin: '0 auto' }}>
              <Row gutter={16} style={{ marginBottom: 25 }}>
                <Col span={12}>
                  <Item
                    label="First Name"
                    name="firstName"
                    rules={[{ required: true, message: 'Please enter your first name' }]}
                  >
                    <Input
                      name="firstName"
                      placeholder="Enter First Name"
                      style={{
                        width: 230,
                        height: 39,
                        borderRadius: "8px",
                        border: "1px solid #6B43B5",
                      }}
                      value={this.state.firstName}
                      onChange={this.handleChange2}
                    />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item
                    label="Last Name"
                    name="lastName"
                    rules={[{ required: true, message: 'Please enter your last name' }]}
                  >
                    <Input
                      name="lastName"
                      placeholder="Enter Last Name"
                      style={{
                        width: 230,
                        height: 39,
                        borderRadius: "8px",
                        border: "1px solid #6B43B5",
                      }}
                      value={this.state.lastName}
                      onChange={this.handleChange2}
                    />
                  </Item>
                </Col>
              </Row>
              <Row gutter={16} style={{ marginBottom: 40 }}>
                <Col span={12}>
                  <Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please enter your email', type: 'email' }]}
                  >
                    <Input
                      name="email"
                      placeholder="Enter Email"
                      style={{
                        width: 230,
                        height: 39,
                        borderRadius: "8px",
                        border: "1px solid #6B43B5",
                      }}
                      value={this.state.email}
                      onChange={this.handleChange2}
                    />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item
                    label="Phone"
                    name="phone"
                    rules={[{ required: true, message: 'Please enter your phone number' }]}
                  >
                    <Input
                      name="phone"
                      placeholder="Enter Phone Number"
                      style={{
                        width: 230,
                        height: 39,
                        borderRadius: "8px",
                        border: "1px solid #6B43B5",
                      }}
                      value={this.state.phone}
                      onChange={this.handleChange2}
                    />
                  </Item>
                </Col>
              </Row>
              <Row gutter={16} style={{ marginBottom: 25 }}>
                <Col span={12}>
                  <Item
                    label="State"
                    name="state"
                    rules={[{ required: true, message: 'Please enter your state' }]}
                  >
                    <Input
                      name="state"
                      placeholder="Enter state"
                      style={{
                        width: 230,
                        height: 39,
                        borderRadius: "8px",
                        border: "1px solid #6B43B5",
                      }}
                      value={this.state.state}
                      onChange={this.handleChange2}
                    />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item
                    label="ZipCode"
                    name="zipcode"
                    rules={[{ required: true, message: 'Please enter your ZipCode' }]}
                  >
                    <Input
                      name="zipcode"
                      placeholder="Enter ZipCode"
                      style={{
                        width: 230,
                        height: 39,
                        borderRadius: "8px",
                        border: "1px solid #6B43B5",
                      }}
                      value={this.state.zipcode}
                      onChange={this.handleChange2}
                    />
                  </Item>
                </Col>
              </Row>
              <Row style={{ marginBottom: 40 }}>
                <Col span={24}>
                  <Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Please enter your Address' }]}
                  >
                    <Input
                      name="address"
                      placeholder="Enter Address"
                      style={{
                        height: 39,
                        borderRadius: "8px",
                        border: "1px solid #6B43B5",
                      }}
                      value={this.state.address}
                      onChange={this.handleChange2}
                    />
                  </Item>
                </Col>
              </Row>
            </Form>
          </Modal>

          <Modal
            title="Add Patient"
            open={this.state.modal_add_patient}
            okText="Create"
            onCancel={() => this.handleCloseModalAddPatient()}
            onOk={() => this.createNewPatient()}
            className="modal-size1"
            footer={[
              <Button
                style={{ width: 139, height: 38 }}
                key="submit"
                type="primary"
                onClick={() => this.createNewPatient()}
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
                  onChange={this.handleChange}
                  className={
                    this.state.formErrorsPatient &&
                      this.state.formErrorsPatient.FirstName &&
                      this.state.formErrorsPatient.FirstName.massage === ""
                      ? ""
                      : "inputs-error"
                  }
                  type="text"
                  name="patient_first_name"
                  placeholder="Enter Full Name"
                  value={this.state.patient_first_name}
                  prefix={
                    <UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                />
                {this.state.formErrorsPatient &&
                  this.state.formErrorsPatient.FirstName &&
                  !this.state.formErrorsPatient.FirstName.status ? (
                  <div className="error-text">
                    {this.state.formErrorsPatient.FirstName.massage}
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
                  onChange={this.handleChange}
                  className={
                    this.state.formErrorsPatient &&
                      this.state.formErrorsPatient.LastName &&
                      this.state.formErrorsPatient.LastName.massage === ""
                      ? ""
                      : "inputs-error"
                  }
                  type="text"
                  name="patient_last_name"
                  placeholder="Doe"
                  value={this.state.patient_last_name}
                  prefix={
                    <UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                />
                {this.state.formErrorsPatient &&
                  this.state.formErrorsPatient.LastName &&
                  !this.state.formErrorsPatient.LastName.status ? (
                  <div className="error-text">
                    {this.state.formErrorsPatient.LastName.massage}
                  </div>
                ) : null}
              </Col>

              <Col span={24}>
                <label className="formLabel">Birth Date</label>
                <DatePicker
                  style={{
                    height: 39,
                    borderRadius: "8px",
                    border: "1px solid #6B43B5",
                  }}
                  name="birth_date"
                  placeholder="Enter Birth Date"
                  className={
                    this.state.formErrorsPatient &&
                      this.state.formErrorsPatient.BirthDate &&
                      this.state.formErrorsPatient.BirthDate.status
                      ? "inputs"
                      : "inputs-error"
                  }
                  htmlType="submit"
                  onChange={this.handleBirthDateChange}
                  value={this.state.birth_day_preview}
                  suffixIcon={<img src={calendar} alt="" />}
                />
                {this.state.formErrorsPatient &&
                  this.state.formErrorsPatient.BirthDate &&
                  !this.state.formErrorsPatient.BirthDate.status ? (
                  <div className="error-text">
                    {this.state.formErrorsPatient.BirthDate
                      ? this.state.formErrorsPatient.BirthDate.massage
                      : ""}
                  </div>
                ) : null}
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
                  onChange={this.handleChange}
                  className={
                    this.state.formErrorsPatient &&
                      this.state.formErrorsPatient.Email &&
                      this.state.formErrorsPatient.Email.massage === ""
                      ? ""
                      : "inputs-error"
                  }
                  name="patient_email_address"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter Email"
                  value={this.state.patient_email_address}
                />
                {this.state.formErrorsPatient &&
                  this.state.formErrorsPatient.Email &&
                  !this.state.formErrorsPatient.Email.status ? (
                  <div className="error-text">
                    {this.state.formErrorsPatient.Email.massage}
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
                  onChange={this.handleChange}
                  className={
                    this.state.formErrorsPatient &&
                      this.state.formErrorsPatient.Phone &&
                      this.state.formErrorsPatient.Phone.massage === ""
                      ? ""
                      : "inputs-error"
                  }
                  type="text"
                  name="patient_phone_number"
                  placeholder="Enter Phone Number"
                  value={this.state.patient_phone_number}
                />
                {this.state.formErrorsPatient &&
                  this.state.formErrorsPatient.Phone &&
                  !this.state.formErrorsPatient.Phone.status ? (
                  <div className="error-text">
                    {this.state.formErrorsPatient.Phone.massage}
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
                  className={
                    this.state.formErrorsPatient &&
                      this.state.formErrorsPatient.pState &&
                      this.state.formErrorsPatient.pState.massage === ""
                      ? ""
                      : "inputs-error"
                  }
                  onChange={this.handleChange}
                  type="text"
                  name="patient_state"
                  placeholder="Enter State"
                  value={this.state.patient_state}
                />
                {this.state.formErrorsPatient &&
                  this.state.formErrorsPatient.pState &&
                  !this.state.formErrorsPatient.pState.status ? (
                  <div className="error-text">
                    {this.state.formErrorsPatient.pState
                      ? this.state.formErrorsPatient.pState.massage
                      : ""}
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
                  className={
                    this.state.formErrorsPatient &&
                      this.state.formErrorsPatient.City &&
                      this.state.formErrorsPatient.City.massage === ""
                      ? ""
                      : "inputs-error"
                  }
                  onChange={this.handleChange}
                  type="text"
                  name="patient_city"
                  placeholder="Enter City"
                  value={this.state.patient_city}
                />
                {this.state.formErrorsPatient &&
                  this.state.formErrorsPatient.City &&
                  !this.state.formErrorsPatient.City.status ? (
                  <div className="error-text">
                    {this.state.formErrorsPatient.City.massage}
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
                  className={
                    this.state.formErrorsPatient &&
                      this.state.formErrorsPatient.Zipcode &&
                      this.state.formErrorsPatient.Zipcode.massage === ""
                      ? ""
                      : "inputs-error"
                  }
                  onChange={this.handleChange}
                  type="text"
                  name="Zipcode"
                  placeholder="Enter Postal Code"
                  value={this.state.Zipcode}
                />
                {this.state.formErrorsPatient &&
                  this.state.formErrorsPatient.Zipcode &&
                  !this.state.formErrorsPatient.Zipcode.status ? (
                  <div className="error-text">
                    {this.state.formErrorsPatient.Zipcode
                      ? this.state.formErrorsPatient.Zipcode.massage
                      : ""}
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
                onChange={this.handleChange}
                className={
                  this.state.formErrorsPatient &&
                    this.state.formErrorsPatient.Address &&
                    this.state.formErrorsPatient.Address.massage === ""
                    ? ""
                    : "inputs-error"
                }
                type="text"
                name="patient_address"
                placeholder="Enter Address"
                value={this.state.patient_address}
              />
            </div>
            {this.state.formErrorsPatient &&
              this.state.formErrorsPatient.Address &&
              !this.state.formErrorsPatient.Address.status ? (
              <div className="error-text">
                {this.state.formErrorsPatient.Address
                  ? this.state.formErrorsPatient.Address.massage
                  : ""}
              </div>
            ) : null}
          </Modal>
        </DashboardLayout>
      )
    );

  }
}

function mapStateToProps(state) {
  const { creating, error } = state.paymentRequest
  const { profileSummary } = state.dashboard
  return {
    creating,
    error,
    profileSummary
  }
}

const connectedPaymentRequestPage = connect(mapStateToProps)(PaymentRequestPage)

export default connectedPaymentRequestPage