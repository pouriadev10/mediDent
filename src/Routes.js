import React from 'react'
import { Route, Switch } from 'react-router'
import AddAccount from './components/addAccount/AddAccount'
import AddProvider from './components/addProvider/AddProvider'
import BookingHandler from './components/booking/BookingHandler'
import BookingStepOne from './components/booking/BookingStepOne'
import BookingStepThree from './components/booking/BookingStepThree'
import BookingStepTwo from './components/booking/BookingStepTwo'
import BookingSummary from './components/booking/BookingSummary'
import Checkout from './components/checkOut/Checkout'
import CompleteRegistrationPage from './components/auth/CompleteRegistrationPage'
import DashboardPage from './components/dashboardPayment/DashboardPage'
import DoneWizardPayment from "./components/Payment/DoneWizardPayment"
import Login from './components/auth/Login'
import PaymentFirstPage from "./components/Payment/PaymentFirstPage"
import Payment from "./components/Payment/Payment"
import PaymentDone from './components/Payment/PaymentDone'
import PaymentDoneMulti from './components/Payment/PaymentDoneMulti'
import PaymentRequestPage from './components/Payment/PaymentRequestPage'
import PaymentWizardHandler from './components/Payment/PaymentWizardHandler'
import PaymentWizardStep2 from "./components/Payment/PaymentWizardStep2"
import ProviderScheduling from './components/ProviderScheduling'
import ResetConfirm from './components/auth/ResetConfirm'
import SelectPaymentMethod from './components/Payment/SelectPaymentMethod'
import UploadPdfPage from './components/UploadPdfPage'
import routes from './constants/routes'
import App from './containers/App'
import Error404 from './Error404'
import Error500 from './Error500'
import Appointment from './components/appointment/Appointment'
import Finanace from './components/FinanceFlow/Finanace'
import PracticeAdminMenu from "./components/PracticeAdminMenu/PracticeAdminMenu"
import Ar from "./components/Ar/Ar";
import Transaction from "./components/Transaction/Transaction";
import ArDetail from "./components/Ar/ArDetail";
import DiscountOptions from "./components/DiscountOptions"
import HomeNew from "./New/HomeNew";
import TreatmentPlan from "./New/Treatment Plan/TreatmentPlan";
import Oral from "./New/Oral/Oral";
import Review from "./components/Office/Review"
import Profile from "./components/Office/Profile"
import Members from './components/Membership/Members'
import Subscriptions from './components/Membership/Subscriptions'
import FailedPayments from './components/Payment/FailedPayments'
import Plans from './components/Membership/Plans'
import PlansDetail from './components/Membership/PlansDetail'
import Dashboard from './components/Membership/Dashboard'
import Visit from './components/Membership/Visit'
import CreateOfficeDashboard from './components/Membership/CreateOfficeDashboard'
import Service from './components/Service/Service'
import PlanManagement from './components/Plan/PlanManagement';
import AppointmentType from './components/appointmentTypes/AppointmentType';
import Home from './Home/Home'
import ClinicProfile from './Home/ClinicProfile'
import LandingPage from './Home/LandingPage'
import SetReview from './Home/SetReview'
import Provider from "./Home/Provider"
import HealthCategories from "./components/Data/HealthCategories"
import Procedures from "./components/Data/Procedures"
import Helcim from "./Helcim"
import LoginPage from './Login/LoginPage'
import { controller } from './Login/controller'
import TreatmentPlans from '../src/components/TreatmentPlans/TreatmentPlans'
import Campaigns from '../src/components/Marketing/Campaigns'
import CreateCampaigns from './components/Marketing/CreateCampaigns'
import EmailPayment from './components/Payment/EmailPayment'
export default class AppParent extends React.Component {

  checkOnboarding = async () => {
    console.log("1")
    if (localStorage.getItem("onBoardingStep") == "completed") {
      console.log("10")
      this.setState({
        onBoardingCompleted: "true"
      })
    }
    else if (localStorage.getItem("user")) {
      const response = await controller.getOnboardingSteps();
      const onboarding_name = response.result && response.result.length == 0 ? "completed" : response.result && response.result[0] && response.result[0].onboarding_step_name;


      if (onboarding_name == "completed") {
        localStorage.setItem("onBoardingStep", "completed")
        this.setState({
          onBoardingCompleted: "true"
        })
      } else {
        console.log("100")
        this.setState({
          onBoardingCompleted: "false"
        })
      }

    } else {
      console.log("100")
      this.setState({
        onBoardingCompleted: "false"
      })
    }
  }

  async componentDidMount() {
    await this.checkOnboarding();
  }


  constructor(props) {
    super(props)
    this.state = {
      onBoardingCompleted: "loading"
    }

  }
  render() {
    const { store, history } = this.props
    return (
      <App>
        {
          localStorage.getItem("user") ?
            this.state.onBoardingCompleted == "loading" ?
              <></>
              :
              this.state.onBoardingCompleted == "true" ?
                <Switch>
                  <Route path={"/test-helcim"} component={Helcim} />
                  <Route path={routes.ORAL} component={Oral} />
                  <Route path={routes.TREATMENTPLAN} component={TreatmentPlan} />
                  <Route path={routes.TreatmentPlans} component={TreatmentPlans} />
                  <Route path={routes.Campaigns} component={Campaigns} />
                  <Route path={routes.CreateCampaigns} component={CreateCampaigns} />
                  <Route path={routes.NEWHOME} component={HomeNew} />
                  <Route path={routes.PROCEDURES} component={Procedures} />
                  <Route path={routes.HEALTHCATEGORY} component={HealthCategories} />
                  <Route path={routes.APPOINTMENTTYPE} component={AppointmentType} />
                  <Route path={routes.DISCOUNTOPTIONS} component={DiscountOptions} />
                  <Route path={routes.PLANMANAGEMENT} component={PlanManagement} />
                  <Route path={routes.SERVICEMANAGEMENT} component={Service} />
                  <Route path={routes.FAILEDPAYMENTS} component={FailedPayments} />
                  <Route path={routes.BOOKINGMAIN} component={BookingHandler} />
                  <Route path={routes.CREATEOFFICE} component={CreateOfficeDashboard} />
                  <Route path={routes.CREATEOFFICE} component={CreateOfficeDashboard} />
                  <Route path={routes.MEMBERS} component={Members} />
                  <Route path={routes.PROFILE} component={Profile} />
                  <Route path={routes.REVIEW} component={Review} />
                  <Route path={routes.SUBSCRIPTIONS} component={Subscriptions} />
                  <Route path={routes.PLANS} component={Plans} />
                  <Route path={routes.PLANDETAIL} component={PlansDetail} />
                  <Route path={routes.VISIT} component={Visit} />
                  <Route path={routes.DASHBOARD} component={Dashboard} />
                  <Route path={routes.ARDETAIL} component={ArDetail} />
                  <Route path={routes.AR} component={Ar} />
                  <Route path={routes.TRAMSACTIONS} component={Transaction} />
                  <Route path={routes.OFFICES} component={PracticeAdminMenu} />
                  <Route path={routes.FINANACE} component={Finanace} />
                  <Route path={routes.ACCOUNTSRECEIVABLE} component={DashboardPage} />
                  <Route path={routes.APPOINTMENTS} component={Appointment} />
                  <Route path={routes.PAYMENTDONE} component={PaymentDone} />
                  <Route path={routes.PAYMENTDONEMULTI} component={PaymentDoneMulti} />
                  <Route path={routes.PAYMENTFLOW} component={SelectPaymentMethod} />
                  <Route path={routes.PAYMENT} component={EmailPayment} />
                  <Route path={routes.SINGLEPAYMENT} component={Payment} />
                  <Route path={routes.PAYMENTWIZARD} component={(routeProps, props) => <PaymentWizardHandler {...routeProps} {...props} />} />
                  <Route path={routes.UPLOADPDF} component={UploadPdfPage} />
                  <Route path={routes.PROVIDERSCHEDULING} component={ProviderScheduling} />
                  <Route path={routes.ERRORNOTFOUND} component={Error404} />
                  <Route path={routes.ERRORSERVER} component={Error500} />
                  <Route path={routes.ADD_PROVIDER} component={AddProvider} />
                  <Route path={routes.ADDACCOUNT} component={AddAccount} />
                  <Route path={routes.CHECKOUT} component={Checkout} />
                  <Route path={routes.RESETCONFIRM} component={ResetConfirm} />
                  <Route path={routes.PASSWORD} component={CompleteRegistrationPage} />
                  <Route path={routes.PAYMENTREQUEST} component={PaymentRequestPage} />
                  <Route path={routes.LOGOUT} component={Login} />
                  <Route path={routes.LOGINPAGE} component={Login} />
                  <Route path={routes.LOGIN} component={Login} />

                  <Route path={routes.BOOKINGSTEPONE} component={BookingStepOne} />
                  <Route path={routes.BOOKINGSTEPTWO} component={BookingStepTwo} />
                  <Route path={routes.BOOKINGSTEPTHREE} component={BookingStepThree} />
                  <Route path={routes.BOOKINGSUMMARY} component={BookingSummary} />
                </Switch>
                :
                <LoginPage />
            :
            <Switch>
              <Route path={routes.TREATMENTPLAN} component={TreatmentPlan} />
              <Route path={routes.NEWHOME} component={HomeNew} />
              <Route path={"/test-helcim"} component={Helcim} />
              <Route path={routes.PROVIDER} component={Provider} />
              <Route path={routes.SETREVIEW} component={SetReview} />
              <Route path={routes.HOMEPAGE} component={LandingPage} />
              <Route path={routes.SEARCHRESULT} component={Home} />
              <Route path={routes.CLINICPROFILE} component={ClinicProfile} />
              <Route path={routes.FINANACE} component={Finanace} />
              <Route path={routes.BOOKINGMAIN} component={BookingHandler} />
              <Route path={routes.ERRORNOTFOUND} component={Error404} />
              <Route path={routes.ERRORSERVER} component={Error500} />
              <Route path={routes.PAYMENTFLOW} component={SelectPaymentMethod} />
              <Route path={routes.PAYMENT} component={EmailPayment} />
              <Route path={routes.SINGLEPAYMENT} component={Payment} />
              <Route path={routes.PAYMENTWIZARD} component={(routeProps, props) => <PaymentWizardHandler {...routeProps} {...props} />} />
              <Route path={routes.PAYMENTWIZARDSTEP2} component={PaymentWizardStep2} />
              <Route path={"/main-handle/:uuid"} component={PaymentWizardHandler} />
              <Route path={routes.PAYMENTWIZARDSTEPDONE} component={DoneWizardPayment} />
              <Route path={routes.PAYMENTDONE} component={PaymentDone} />
              <Route path={routes.PAYMENTDONEMULTI} component={PaymentDoneMulti} />
              <Route path={routes.RESETCONFIRM} component={LoginPage} />
              {/* <Route path={routes.RESETCONFIRM} component={ResetConfirm} /> */}
              <Route path={routes.PASSWORD} component={CompleteRegistrationPage} />
              <Route path={routes.LOGOUT} component={LoginPage} />
              <Route path={routes.LOGINPAGE} component={LoginPage} />
              <Route path={routes.LOGIN} component={LoginPage} />
              <Route path={routes.LOGINNEW} component={LoginPage} />
            </Switch>
        }
      </App>
    )
  }
}
