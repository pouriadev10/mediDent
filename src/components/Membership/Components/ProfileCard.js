import React from "react";
import { Avatar, Row, Col, Typography, Card } from "antd";
import "./componentStyle.css";

const { Meta } = Card;
const { Text } = Typography;

const ProfileCard = ({ data }) => {
  return (
    <React.Fragment>
      <Card>
        <Col>
          <Row type="flex" justify="center">
            <Row className="db">
              <Col className="tac">
                <Avatar
                  size={200}
                  src={data.profile_picture}
                  style={{ margin: "0 auto", marginTop: 20 }}
                />
                <Meta
                  title={
                    data.fullname
                      ? data.fullname
                      : data.first_name + " " + data.last_name
                  }
                  description={data.id}
                  style={{ textAlign: "center", marginTop: 25 }}
                />
              </Col>
            </Row>
          </Row>
          <br />
          <div style={{ marginTop: 18, marginLeft: "3px", fontWeight: 400 }}>
            <Row type="flex" justify="space-between">

              <Text style={{ lineHeight: "2" }}>
                <span style={{ color: "#979797", fontSize: '20px' }}>Email:</span>
                <Text style={{ marginLeft: 5 }}>{data.email}</Text>
              </Text>
            </Row>
            <Row type="flex" justify="space-between" className="mt5">

              <Text style={{ lineHeight: '2.2' }}>
                <span style={{ color: "#979797", fontSize: '20px' }}>Phone:</span> {data.phone}
              </Text>
            </Row>
            <Row type="flex" justify="space-between" className="mt5">

              <Text style={{ lineHeight: '2.2' }}>
                <span style={{ color: "#979797", fontSize: '20px' }}>Birth Date:</span>{" "}
                {data.birth_date}
              </Text>
            </Row>

            <Row type="flex" justify="space-between" className="mt5">

              <Text style={{ lineHeight: '2.2' }}>
                <span style={{ color: "#979797", fontSize: '20px' }}>State:</span> {data.state}
              </Text>
            </Row>
            <Row type="flex" justify="space-between" className="mt5">

              <Text style={{ lineHeight: '2.2' }}>
                <span style={{ color: "#979797", fontSize: '20px' }}>City:</span> {data.city}
              </Text>
            </Row>
            <Row type="flex" justify="space-between" className="mt5">

              <Text style={{ lineHeight: '2.2' }}>
                <span style={{ color: "#979797", fontSize: '20px' }}>Address:</span>{" "}
                {data.address}
              </Text>
            </Row>
            <Row type="flex" justify="space-between" className="mt5">

              <Text style={{ lineHeight: '2.2' }}>
                <span style={{ color: "#979797", fontSize: '20px' }}>Zip Code:</span>{" "}
                {data.zip_code}
              </Text>
            </Row>
          </div>
        </Col>
      </Card>
    </React.Fragment>
  );
};

export default ProfileCard;
