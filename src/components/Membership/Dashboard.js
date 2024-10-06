import {
  Col,
  Row,
  // message,
  notification,
  Card,
  Button,
  Avatar,
  Table,
  Tag
} from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import DashboardLayout from "../../layout/dashboardLayout/DashboardLayout";
import { Controller } from "./Controller/Controller";
import "./style.css";
import BlueCard from "./Components/BlueCard";
import BarChartWithLabel from './Components/BarCharWithtLabel';
import DashboardDonut from "./Components/DashboardDonut";
import DonutChart from "../../New/component/DonutChart";
import people from "../../assets/icons/people.no-white.png";
import cards from "../../assets/icons/cards.white.png";
import strongbox from "../../assets/icons/strong-box-white.png";
const { Meta } = Card



const columns = [
  {
    title: "User Name",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Subscription Plan",
    dataIndex: "subscription",
    key: "subscription",
  },
  {
    title: "Start Date",
    dataIndex: "startdate",
    key: "startdate",
  },
  {
    title: "Expiry Date",
    dataIndex: "expirydate",
    key: "expirydate",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <span>
        <Button type="link" >
          Notify
        </Button>
      </span>
    ),
  },
];



const columns1 = [
  {
    title: "User Name",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Last Visit",
    dataIndex: "lastvisit",
    key: "lastvisit",
  },
  {
    title: "Subscription",
    dataIndex: "subscription",
    key: "subscription",
    render: (subscription) => (
      <Tag
        color={subscription === "active" ? "rgba(35, 208, 32, 0.2)" : "volcano"}
        style={{ borderRadius: "20px", color: "#23D020", width: 87, textAlign: 'center' }}
      >
        {subscription ? subscription.charAt(0).toUpperCase() + subscription.slice(1) : ''}    </Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <span>
        <Button type="link">
          <u>View</u>
        </Button>
      </span>
    ),
  },
];




// const Config = {
//   headers: {
//     Authorization: localStorage.getItem("user")
//       ? "Token " + JSON.parse(localStorage.getItem("user")).key
//       : "",
//   },
// };

// const props = {
//   name: "file",
//   action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
//   headers: {
//     authorization: "authorization-text",
//   },
//   onChange(info) {
//     if (info.file.status === "done") {
//       message.success(`${info.file.name} file uploaded successfully`);
//     } else if (info.file.status === "error") {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
// };

class Dashboard extends Component {
  openNotification = (placement, message, status) => {
    if (status && status.toLowerCase().search("success") !== -1) {
      notification.success({
        message: status,
        description: message,
        placement,
      });
    } else if (status && status.toLowerCase().search("error") !== -1) {
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




  getTreatmentplans = async () => {
    try {
      const response = await Controller.getTreatmentPlans();
      console.log(response.json);

      if (response && response.json) {
        this.setState({
          treatmentplans: response.json,
          treatmentplansdesc: response.json.treatment_plans,
        });
      } else {
        console.error("Unexpected response structure:", response);
        this.setState({
          treatmentplans: []
        });
      }
    } catch (error) {
      console.error("Error while fetching treatment plans:", error);
      this.setState({
        treatmentplans: []
      });
    }
  };

  getRecentActiveMember = async () => {
    const response = await Controller.RecentlyActiveMembers();
    this.setState({
      recentActiveMembers: response.json.results,
      recentActiveMembersCount: response.json.count,
    });
  };

  MembershipExpire = async () => {
    const response = await Controller.MembershipExpire();
    this.setState({
      expireSubMembers: response.json.results,
      expireSubMembersCount: response.json.count,
    });
  };


  getMrr = async () => {
    const response = await Controller.GetMRR();
    this.setState({
      mrr: response.json.results,
    });
  };

  getScore = async () => {
    const response = await Controller.getScore(0);
    this.setState({
      score: response.json,
    });
  };


  getMember = async () => {
    try {
      const response = await Controller.TotalMembers();
      const totalMembers = response.json.Total_Members;
      this.setState({ totalMember: totalMembers });
    } catch (error) {
      console.error("Error fetching total members:", error);
    }
  };

  getMOM = async () => {
    const response = await Controller.GetMOM();
    this.setState({
      mom: response.json.mom,
    });

  };
  state = {
    bar: [],
    bar1: []
  };

  BarChart = async () => {
    try {
      const response = await Controller.getBarTreatment();

      if (!response || !response.json) {
        throw new Error('Invalid response or missing JSON data');
      }

      const data = response.json;

      console.log('Data from server:', data);

      const dataChart = data.plans ? data.plans.map(plan => plan.count) : [];
      const categories = data.plans ? data.plans.map(plan => plan.name) : [];
      const dataChart1 = data.preventive_plans ? data.preventive_plans.map(preventive => preventive.count) : [];
      const categories1 = data.preventive_plans ? data.preventive_plans.map(preventive => preventive.name) : [];

      this.setState({ bar: dataChart, categories: categories, bar1: dataChart1, categories1: categories1 });
    } catch (error) {
      console.error('Error fetching or processing data:', error);
      // Handle error, show a message to the user, or perform appropriate action
    }
  };

  state = {
    impact: []
  }

  BarChart2 = async (page) => {
    try {
      const response = await Controller.getImpact(page);

      const data = response.json.results;

      console.log('pou', data)

      const dataChart = data.map(plan => plan.impact);
      const categories = data.map(plan => plan.name);

      this.setState({ impact: dataChart, categories10: categories });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  state = {
    chartDate: [],
    dateCategories: []
  };

  fetchDataForBarChart = async () => {
    try {
      const response = await Controller.GetDashboardBarChart();
      const data = await response.json;

      const categories = Object.keys(data);
      const counts = Object.values(data);

      this.setState({ chartDate: counts, dateCategories: categories });
    } catch (error) {
      console.error('Error fetching data for bar chart:', error);
    }
  };




  state = {
    series: [],
  };
  fetchData = async (type) => {
    try {
      const response = await Controller.GetDashboardPyChart(type);
      console.log('Raw API Response:', response);

      const data = response.json;

      const seriesData = Object.values(data);

      this.setState({ series: seriesData });

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  constructor(props) {
    super(props);

    this.getData();

    this.state = {
      width: 0,
      height: 0,
      pieChartType: "year",
      recentActiveMembers: [],
      recentActiveMembersCount: "0",
      recentActiveMembersPage: "0",

      expireSubMembers: [],
      expireSubMembersCount: "0",
      expireSubMembersPage: "0",

      bar: {
        options: {
          chart: {
            id: "apexchart-example",
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
          },
        },
        series: [
          {
            name: "series-1",
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
          },
        ],
      },
      totalMember: "",
      mrr: "",
      mom: 0,
      pie: {
        series: [],
        options: {
          labels: [],
          chart: {
            type: "donut",
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        },
      },
    };
    this.handleChangePieChartType = this.handleChangePieChartType.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }


  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  handleChangePieChartType = async (e, value) => {
    this.setState({
      pieChartType: e.target.value,
    });
    this.PyChartType(e.target.value);
  };

  handleChangeCurrentState = (e) => {
    this.setState({ currentState: e.target.value });
  };

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    this.getData();
  }

  async getData() {
    await Promise.all([
      this.getMrr(),
      this.getMember(),
      this.getMOM(),
      this.getRecentActiveMember(),
      this.MembershipExpire(),
      this.BarChart(),
      this.getTreatmentplans(),
      this.getScore(),
      this.fetchData("year"),
      this.BarChart2(1),
      this.fetchDataForBarChart()
    ]);
  }




  render() {
    const { profileSummary } = this.props;
    const { totalMember } = this.state;
    const { mrr } = this.state;
    const { score } = this.state;
    const { mom } = this.state;
    const { recentActiveMembers } = this.state;
    const { expireSubMembers } = this.state;
    const data = expireSubMembers.map(plan => ({
      key: plan.customer_id.toString(),
      username: plan.customer_name ? plan.customer_name : "-",
      subscription: plan.plan_name || "-",
      startdate: plan.start_date ? plan.start_date : 0,
      expirydate: plan.expiration_date ? plan.expiration_date : "-",

    }))
    const data1 = recentActiveMembers.map(plan => ({
      key: plan.customer_id.toString(),
      username: plan.customer_name ? plan.customer_name : "-",
      lastvisit: plan.last_visit || "-",
      subscription: plan.status ? plan.status : "-",
    }))





    return (
      <DashboardLayout
        breadCrumb={false}
        logo={profileSummary && profileSummary.logo ? profileSummary.logo : ""}
        footerLogo={true}
      >
        <Row
          type="flex"
          justify="space-between"
          style={{
            margin: "0px 7px 0px 7px",
            paddingTop: "20px",
            paddingBottom: "10px",
          }}
          gutter={[30, 45]}
        >
          <Col xs={24} >
            <Card>
              <Row gutter={[16, 16]} justify="center">
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div style={{ height: 108, display: 'flex', alignItems: 'center', flexDirection: 'row', background: 'rgba(223, 218, 255, 0.7)', borderRadius: '8px' }}>
                    <div className='circle' style={{ marginLeft: 15 }}>
                      <img className='icon-center' src={people} alt='' />
                    </div>
                    <div style={{ marginLeft: 20 }}>
                      <div style={{ fontSize: 20, fontWeight: 400, color: '#4D3280', marginBottom: 5 }}>Total Member</div>
                      <div style={{ fontSize: 24, color: "#5D3B9C", fontWeight: 700 }}>{totalMember}</div>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div style={{ height: 108, display: 'flex', alignItems: 'center', flexDirection: 'row', background: 'rgba(223, 218, 255, 0.7)', borderRadius: '8px' }}>
                    <div className='circle' style={{ marginLeft: 15 }}>
                      <img className='icon-center' src={strongbox} alt='' />
                    </div>
                    <div style={{ marginLeft: 20 }}>
                      <div style={{ fontSize: 20, fontWeight: 400, color: '#4D3280', marginBottom: 5 }}>MRR</div>
                      <div style={{ fontSize: 24, color: "#5D3B9C", fontWeight: 700 }}>{mrr}</div>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <div style={{ height: 108, display: 'flex', alignItems: 'center', flexDirection: 'row', background: 'rgba(223, 218, 255, 0.7)', borderRadius: '8px' }}>
                    <div className='circle' style={{ marginLeft: 15 }}>
                      <img className='icon-center' src={cards} alt='' />
                    </div>
                    <div style={{ marginLeft: 20 }}>
                      <div style={{ fontSize: 20, fontWeight: 400, color: '#4D3280', marginBottom: 5 }}>MoM Growth</div>
                      <div style={{ fontSize: 24, color: "#5D3B9C", fontWeight: 700 }}>{mom}</div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} md={8} lg={8}>
            <Card className="card-dounat">
              <p className="card-title" style={{ textAlign: 'left', width: '100%' }}>
                Memberships
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <div style={{ width: '100%' }}> {/* Wraps the chart and allows it to maintain its intrinsic width while being centered */}
                  <DashboardDonut series={this.state.series} labels={['Plan 1', 'Plan 2']} />
                </div>
              </div>
            </Card>
          </Col>


          <Col xs={24} md={8} lg={8}>
            <Card className="card-bar">
              <p className="card-title1">
                Most Common Treatments
              </p>
              {this.state.bar ? (
                <div style={{ width: '100%' }}>
                  <BarChartWithLabel chartdata={this.state.bar} categories={this.state.categories} rotate={-45} height={300} />
                </div>

              ) : (
                <BarChartWithLabel categories={this.state.categories} rotate={-45} height={300} />
              )}
            </Card>
          </Col>
          <Col xs={24} md={8} lg={8}>
            <Card className="card-bar">
              <p className="card-title1">
                Most Common Preventive Treatments
              </p>
              {this.state.bar1 ? (
                <BarChartWithLabel chartdata={this.state.bar1} categories={this.state.categories1} rotate={-45} height={300} />
              ) : (
                <BarChartWithLabel categories={this.state.categories1} rotate={-45} height={300} />
              )}
            </Card>
          </Col>
          <Col xs={24} md={16} lg={16} >
            <p className="card-title3">
              Impact of Preventive Treatments
            </p>
            <Card style={{ height: 480 }}>
              {this.state.impact ? (
                <div className="border-padding">
                  <BarChartWithLabel chartdata={this.state.impact} categories={this.state.categories10} rotate={-45} height={375} />
                </div>
              ) : (
                <div className="border-padding">
                  <BarChartWithLabel categories={this.state.categories10} rotate={-45} height={330} />
                </div>
              )}

            </Card>
          </Col>
          <Col xs={24} md={8} lg={8} className="col-margin" >
            <Card style={{ marginTop: 10, height: 480 }}>
              <p className="card-title1">
                Preventive Care Score
              </p>
              {this.state.score && (
                <DonutChart
                  fillPercentage={this.state.score.preventive_care_score}
                  label="Preventive Care Score"
                  Value={this.state.score.preventive_care_score}
                  height='330px'
                  fontSize="22px"
                />
              )}
            </Card>
          </Col>
          <div style={{ width: '66%' }}>
            <Col span={24}>
              <div>
                <div className="row-flex-space13" style={{ width: '100%' }}>
                  <p className="card-title3" onClick={() => { console.log(this.state.treatmentplans) }}> Updated Treatment Plans</p>
                  <Button className="button-primary" style={{ marginLeft: "auto" }}>Details</Button>
                </div>

                {this.state.treatmentplans && this.state.treatmentplans.results.map((plan) => (
                  <Row gutter={[20, 20]}>
                    <Col xs={24} md={24} lg={24} style={{ marginBottom: 8 }}>
                      <div key={plan.id}>
                        <Card className="radius-card">
                          {/* Changed the layout to use flexDirection: 'column' to stack children vertically */}
                          <div className="space-between" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className="avatar">
                              <Avatar
                                className="align-self"
                                size={85}
                                shape="circle"
                                src={plan.profile_picture}
                                style={{ alignSelf: 'center', marginBottom: 8 }}  // Center the avatar and add margin below
                              />
                              <Meta
                                className="align-left"
                                style={{ width: 150, marginLeft: 30 }}  // Center the text of Meta component
                                title={plan.first_name + " " + plan.last_name}
                                description='john91'
                              />
                            </div>
                            <Meta
                              className="card2"
                              title={`${plan.updated_plans ? plan.updated_plans : ''} updated Treatment Plans`}
                              description={plan.treatment_plans.description ? this.state.treatmentplansdesc.description : "-"}
                              style={{ marginTop: 16 }}  // Add space between Meta components
                            />
                          </div>
                        </Card>
                      </div>
                    </Col>

                  </Row>
                ))}

              </div>
            </Col>
          </div>
          < Col span={8}  >
            <Card style={{ height: 480, marginTop: 10, }}>
              <p className="card-title1">
                Treatment Plan Execution Score
              </p>
              {score && (
                <DonutChart
                  fillPercentage={this.state.score.executaion_score * 10}
                  label="Treatment Plan Execution Score"
                  Value={this.state.score.executaion_score}
                  height='360px'
                  fontSize="22px" />
              )}

            </Card>
          </Col><Col xs={24} md={14} lg={14}>
            <p className="card-title3">Subscription about to expire </p>
            <Table
              className="dashboard-table"
              columns={columns}
              dataSource={data}
              pagination={false} />
          </Col><Col xs={24} md={10} lg={10}>
            <p className="card-title3">Recently Active Members</p>
            <Table
              className="dashboard-table"
              columns={columns1}
              dataSource={data1}
              pagination={false} />
          </Col><Col xs={24} md={24} lg={24}>
            <p className="card-title3">New Members</p>
            <Card>
              {this.state.chartDate ? (
                <div className="border-padding">
                  <BarChartWithLabel chartdata={this.state.chartDate} categories={this.state.dateCategories} rotate={0} height={300} />
                </div>
              ) : (
                <div className="border-padding">
                  <BarChartWithLabel categories={this.state.dateCategories} rotate={0} />
                </div>
              )}
            </Card>
          </Col>
        </Row>

      </DashboardLayout >
    );
  }
}

function mapStateToProps(state) {
  const { creating, error } = state.paymentRequest;
  const { profileSummary } = state.dashboard;
  return {
    creating,
    error,
    profileSummary,
  };
}

const connectedDashboard = connect(mapStateToProps)(Dashboard);

export default connectedDashboard;
