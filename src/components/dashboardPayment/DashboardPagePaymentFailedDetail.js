import React from "react";
import { Row, Pagination, Table } from "antd";
import { Paymentcontroller } from "../../Paymentcontroller";
import { useEffect } from "react";
import { useState } from "react";
import "./style.css";

const DashboardPagePaymentFailedDetail = (props) => {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [page_size, setPage_size] = useState(0);

  const columns = [
    {
      title: "Create Date",
      render: (_, record) => (
        <>
          {record.date
            ? new Date(record.date)
                .toISOString()
                .replace(/T/, " ")
                .replace(/\.\d+Z$/, "")
            : "-"}
        </>
      ),
    },
    {
      title: "Status",
      render: (_, record) => (
        <> {record.payment_status ? record.payment_status : "-"}</>
      ),
    },
    {
      title: "Amount",
      render: (_, record) => (
        <>{record.amount_total ? "$" + record.amount_total : "-"}</>
      ),
    },
  ];

  const getListOfTransaction = async () => {
    const response = await Paymentcontroller.failedPaymentOfPaymentNew2(
      props.selectediD,
      current
    );
    setData(response.results);
    setPage_size(response.count);
  };

  const handlePageChange = async (page) => {
    setCurrent(page);
  };

  useEffect(() => {
    getListOfTransaction();
  }, [current]);

  useEffect(() => {
    setCurrent(1);
    setPage_size(0);
    getListOfTransaction();
  }, [props]);

  return (
    <div className="main_container_card fullWidth100p" style={{ justifyContent: "center" }}>
      <div className="fullWidth100p">
        <Table columns={columns} dataSource={data} pagination={false} />
        <Row type="flex" justify="end" className="mt15">
          <Pagination
            showSizeChanger={false}
            hideOnSinglePage={true}
            current={current}
            total={page_size}
            onChange={handlePageChange}
            className="paginator"
            size="small"
          />
        </Row>
      </div>
    </div>
  );
};

export default DashboardPagePaymentFailedDetail;
