import React from "react";
import { Pagination, List, Avatar, Table, Typography, Button } from "antd";
import Pic1 from "../../../assets/img/imgo4.jpg";
import eye from '../../../assets/icons/eye.png';
import "./componentStyle.css";

const { Text } = Typography
const CustomTable = ({
  type,
  rows,
  columns,
  changeCurrentStateToShowMemberDetail,
  count,
  page,
  page_size,
  handleChangePage,
}) => {
  const handleChangePageLocal = (e) => {
    handleChangePage(e);
  };
  const ColumnsMem = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (avatar, item) => <Avatar size={41} className="square-avatar" shape="square" src={item.profile_picture ? item.profile_picture : Pic1} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, item) => <p> {item.first_name || item.last_name
        ? item.first_name + " " + item.last_name
        : item.customer_name
          ? item.customer_name
          : "-"}</p>
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Subscription",
      dataIndex: "subscription",
      key: "subscription",
      render: (subscription, item) => <p></p>
    },
    {
      title: "Insurance",
      dataIndex: "insurance",
      key: "insurance",
    },
    {
      title: "Treatment Plans",
      dataIndex: "treatmentPlans",
      key: "treatmentPlans",
      render: (treatmentPlans, record) => {
        // Check if treatmentPlans exists and has the necessary sub-properties
        if (!treatmentPlans || !treatmentPlans.plans || treatmentPlans.approved === undefined || treatmentPlans.unapproved === undefined) {
          return <span>No treatment plans available</span>;
        }

        return (
          <span>
            <Text>{treatmentPlans.plans} :</Text>
            <Text style={{ marginLeft: 2 }}>
              {treatmentPlans.approved} Approved
            </Text>
            <Text style={{ marginLeft: 2, marginRight: 2 }}> + </Text>
            <Text style={{ marginLeft: 2 }}>
              {treatmentPlans.unapproved} Unapproved
            </Text>
          </span>
        );
      },
    },
    {
      title: "Action",
      align: 'center',
      key: "action",
      render: (text, item) => (

        <Button
          type="text"
          icon={<img src={eye} alt="" />}
          style={{ color: "#979797" }}
          onClick={() => {
            changeCurrentStateToShowMemberDetail(item);
          }}
        />

      ),
    },
  ];

  return (
    <>
      {"memberList" === type ? (
        <Table
          columns={ColumnsMem}
          dataSource={rows}
          pagination={false}
          style={{
            width: "99%",
            marginTop: 30,
            borderRadius: "8px",
            boxShadow: "0px 0px 10px 0px #00000026",
          }}
        />
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </>
    // <React.Fragment>
    //   {"memberList" == type ? (
    //     <React.Fragment>
    //       <List
    //         bordered
    //         itemLayout="horizontal"
    //         dataSource={rows}
    //         renderItem={(item, index) => (
    //           <List.Item
    //             extra={
    //               <a
    //                 className="view"
    //                 onClick={() => {
    //                   changeCurrentStateToShowMemberDetail(item);
    //                 }}
    //               >
    //                 View
    //               </a>
    //             }
    //           >
    //             <List.Item.Meta
    //               avatar={
    //                 <Avatar
    //                   src={item.profile_picture ? item.profile_picture : Pic1}
    //                 />
    //               }
    //               title={
    //                 <a
    //                   onClick={() => {
    //                     changeCurrentStateToShowMemberDetail(item);
    //                   }}
    //                 >
    //                   {item.first_name || item.last_name
    //                     ? item.first_name + " " + item.last_name
    //                     : item.customer_name
    //                     ? item.customer_name
    //                     : "-"}
    //                 </a>
    //               }
    //               description={
    //                 item.patient_plan && item.patient_plan.plan_name
    //                   ? item.patient_plan.plan_name
    //                   : "-"
    //               }
    //             />
    //           </List.Item>
    //         )}
    //       />
    //     </React.Fragment>
    //   ) : (
    //     <React.Fragment></React.Fragment>
    //   )}

    //   <div className="paginationSubTable">
    //     <Pagination
    //       total={page_size}
    //       current={page}
    //       className="paginator"
    //       size="small"
    //       showSizeChanger={false}
    //       hideOnSinglePage={true}
    //       onChange={handleChangePageLocal}
    //     />
    //   </div>
    // </React.Fragment>
  );
};
export default CustomTable;
