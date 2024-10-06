import {
  Button,
  Card,
  Row,
  Divider,
  Tooltip,
  Col,
  Menu,
  notification,
  Dropdown,
  Table,
} from "antd";
import {
  RadarChartOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
  CloseCircleFilled,
  CheckCircleFilled,
  StarOutlined,
  StarFilled,
  CloseCircleOutlined,
  FilterOutlined,
  DownOutlined,
} from "@ant-design/icons";
import DashboardLayout from "../../layout/dashboardLayout/DashboardLayout";
import React, { useEffect, useState } from "react";
import { controller } from "../../controller";
import moment from "moment";
import "./style.css";

function Review() {
  const [review, setReview] = useState({ data: { results: [] } });
  const [search, setSearch] = useState("pending");
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const getReview = async (searchData, page) => {
    try {
      const response = await controller.GetReview(searchData, page);
      setReview(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (item, number) => {
    setIsLoading(true);
    try {
      if (number === 1) {
        const response = await controller.UpdateReviewFeature(item);
        getReview(search, pageNumber);
      } else {
        const response = await controller.UpdateReviewState(
          item,
          number === 2 ? "approved" : "disapproved"
        );
        getReview(search, pageNumber);
      }
    } catch (error) {
      console.error(error);
      notification.success({
        message: "Error",
        description: "Something went wrong",
        placement: "Error",
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getReview("pending", 1);
  }, []);

  function handleMenuClick(e) {
    setSearch(e.key);
    getReview(e.key, 1);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="approved" className="review_menu-item">
        <CheckCircleOutlined /> Approved
      </Menu.Item>
      <Menu.Item key="disapproved" className="review_menu-item">
        <MinusCircleOutlined /> Rejected
      </Menu.Item>
      <Menu.Item key="pending" className="review_menu-item">
        <InfoCircleOutlined /> Pending
      </Menu.Item>
      <Menu.Item key="featured" className="menu_item">
        <RadarChartOutlined /> Featured
      </Menu.Item>
    </Menu>
  );

  const columns = [
    { title: "Patient Name", dataIndex: "patient_name", key: "patient_name" },
    {
      title: "Appointment Date Time",
      dataIndex: "",
      key: "appointment_datetime",
      render: (record) => (
        <>{moment(record.appointment_datetime).format("YYYY/MM/DD HH:MM")}</>
      ),
    },
    {
      title: "Provider Name",
      dataIndex: "provider_name",
      key: "provider_name",
    },
    { title: "Clinic Name", dataIndex: "office_name", key: "office_name" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <span>
          {record.state === "approved" && (
            <>
              <a onClick={() => handleSubmit(record, 1)}>
                <Tooltip title="Featured">
                  {record.featured ? (
                    <StarFilled
                      style={record.featured ? { color: "#A351FF" } : {}}
                    />
                  ) : (
                    <StarOutlined
                      style={record.featured ? { color: "#A351FF" } : {}}
                    />
                  )}
                </Tooltip>
              </a>

              <Divider type="vertical" />
            </>
          )}
          {record.state !== "approved" && (
            <>
              <a onClick={() => handleSubmit(record, 2)}>
                <Tooltip title="Approve">
                  {record.approved ? (
                    <CheckCircleFilled
                      style={record.approved ? { color: "#A351FF" } : {}}
                    />
                  ) : (
                    <CheckCircleOutlined
                      style={record.approved ? { color: "#A351FF" } : {}}
                    />
                  )}
                </Tooltip>
              </a>
              {record.state !== "disapproved" && <Divider type="vertical" />}
            </>
          )}
          {record.state !== "disapproved" && (
            <a onClick={() => handleSubmit(record, 3)}>
              <Tooltip title="Reject">
                {record.disapproved ? (
                  <CloseCircleOutlined
                    style={record.disapproved ? { color: "#A351FF" } : {}}
                  />
                ) : (
                  <CloseCircleFilled
                    style={record.disapproved ? { color: "#A351FF" } : {}}
                  />
                )}
              </Tooltip>
            </a>
          )}
        </span>
      ),
    },
  ];

  return (
    <DashboardLayout breadCrumb={false} logo={""} footerLogo={true}>
      <Card className="review_card" bodyStyle={{ padding: "32px 40px" }}>
        <Row>
          <Col span={12}>
            <p className="check_review">Check Reviews</p>
          </Col>
        </Row>
        <React.Fragment>
          <Dropdown overlay={menu}>
            <Button size="large" className="filter_btn">
              <span className="filter_span">
                <FilterOutlined style={{ marginRight: "5px" }} />
                {search}
              </span>
              <span className="filter_span2">
                <DownOutlined style={{ fontSize: "12px" }} />
              </span>
            </Button>
          </Dropdown>
          <Table
            loading={isLoading}
            columns={columns}
            expandable={{
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>
                   {record.note} 
                </p>
              ),
             }}
            pagination={{
              pageSize: 10,
              onChange: (page) => {
                setPageNumber(page);
                getReview(search, page);
              },
              style: {
                float: "none",
                display: "flex",
                justifyContent: "center",
              },
            }}
            dataSource={review.data.results}
          />
        </React.Fragment>
      </Card>
    </DashboardLayout>
  );
}

export default Review;
