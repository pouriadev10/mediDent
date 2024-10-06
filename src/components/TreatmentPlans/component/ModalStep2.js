import React, { useEffect, useState } from "react";
import {
  Form,
  Avatar,
  Button,
  Table,
  Space,
  Card,
  notification,
  Input,
} from "antd";
import ModalStep3 from "./ModalStep3";
import { controller } from "../controller";
import edit1 from "../../../assets/icons/edit.png";
import check from "../../../assets/icons/check.png";
import delete1 from '../../../assets/icons/trash.png';


const { Meta } = Card;


const ModalStep2 = ({ selectedMember }) => {
  const [tableData, setTableData] = useState([]);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [memberdata, setMemberData] = useState([]);


  const handleReadData = async () => {
    try {
      const response = await controller.getTreatmentModal(selectedMember.id);

      if (response.status < 250) {
        setData(response.json);
      }
    } catch (e) {
      notification.error({
        message: "Error",
        description: "Server error.",
        placement: 'bottomRight',
      });
    }
  };

  const showModal = () => {
    setIsModalVisible1(true);
    console.log(isModalVisible1);
  };

  const Tabledata = () => {
    if (
      data &&
      Array.isArray(data.results) &&
      data.results.length > 0 &&
      Array.isArray(data.results[0].treatment_plans)
    ) {
      const mappedData = data.results[0].treatment_plans.map((plan) => ({
        key: plan.id.toString(),
        treatment: plan.name ? plan.name : "-",
        estimatedCost: plan.estimated_cost || ' ',
        insuranceCoverage: plan.insurance_coverage || " ",
        notes: plan.description || "-",
        procedure: plan.procedure ? plan.procedure.name : "-"
      }));
      setTableData(mappedData);
      // Initialize the edit state with false for each row
      const initialEditState = {};
      mappedData.forEach((row) => {
        initialEditState[row.key] = false;
      });
      setEdit(initialEditState);
    } else {
      setTableData([]);
    }
  };

  const handleDelete = async (record) => {
    try {
        await controller.RemoveTreatmentPlans(record.key);
        const updatedTableData = tableData.filter(row => row.key !== record.key);
        setTableData(updatedTableData);
        window.location.reload()
    } catch (error) {
        console.error("Error deleting treatment plan:", error);
    }
};


  const renderEditCell = (record) => {
    const isEditing = edit[record.key];
    console.log(edit);
    return (
      <span>
        {isEditing ? (
          <Input.TextArea
            value={record.notes}
            onChange={(e) => handleNoteChange(e, record)}
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        ) : (
          <span>{record.notes}</span>
        )}
      </span>
    );
  };

  const renderEditCell1 = (record) => {
    const isEditing = edit[record.key];
    return (
      <span>
        {isEditing ? (
          <Input.TextArea
            style={{ border: "1px solid #C9C1F1" }}
            value={record.treatment}
            onChange={(e) => handleNameChange(e, record)}
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        ) : (
          <span>{record.treatment}</span>
        )}
      </span>
    );
  };
  const renderEditCell2 = (record) => {
    const isEditing = edit[record.key];
    return (
      <span>
        {isEditing ? (
          <Input.TextArea
            style={{ border: "1px solid #C9C1F1" }}
            value={record.estimatedCost}
            onChange={(e) => handleEstimateChange(e, record)}
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        ) : (
          <span>{record.estimatedCost}</span>
        )}
      </span>
    );
  };
  const renderEditCell3 = (record) => {
    const isEditing = edit[record.key];
    return (
      <span>
        {isEditing ? (
          <Input.TextArea
            style={{ border: "1px solid #C9C1F1" }}
            value={record.insuranceCoverage}
            onChange={(e) => handleInsuranceChange(e, record)}
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        ) : (
          <span>{record.insuranceCoverage}</span>
        )}
      </span>
    );
  };

  const handleNoteChange = (e, record) => {
    const updatedTableData = tableData.map((row) => {
      if (row.key === record.key) {
        return { ...row, notes: e.target.value };
      }
      return row;
    });
    setTableData(updatedTableData);
  };

  const handleNameChange = (e, record) => {
    const updatedTableData = tableData.map(row => {
      if (row.key === record.key) {
        return { ...row, treatment: e.target.value };
      }
      return row;
    });
    setTableData(updatedTableData);
  };

  const handleEstimateChange = (e, record) => {
    const updatedTableData = tableData.map(row => {
      if (row.key === record.key) {
        return { ...row, estimatedCost: e.target.value };
      }
      return row;
    });
    setTableData(updatedTableData);
  };

  const handleInsuranceChange = (e, record) => {
    const updatedTableData = tableData.map(row => {
      if (row.key === record.key) {
        return { ...row, insuranceCoverage: e.target.value };
      }
      return row;
    });
    setTableData(updatedTableData);
  };


  const handleEdit = (record) => {
    const updatedEditState = { ...edit, [record.key]: !edit[record.key] };
    setEdit(updatedEditState);
  };

  const cancelEdit = async (record) => {
    await saveNotesToServer(record); // Save notes to server when closing textarea
    setEdit(false);
  };

  const saveNotesToServer = async (record) => {
    try {
      await controller.UpdateTreatmentPlans(record.key, { description: record.notes, name: record.treatment, estimated_cost: record.estimatedCost, insurance_coverage: record.insuranceCoverage });
    } catch (error) {
      console.error("Error updating notes:", error);
    }
  };

  useEffect(() => {
    Tabledata();
  }, [data]);


  useEffect(() => {
    if (selectedMember) {
      setMemberData(selectedMember);
    }
  }, [selectedMember]);

  useEffect(() => {
    handleReadData();
    console.log(data);
  }, []);

  const columns3 = [
    {
      title: "Treatment Plan",
      dataIndex: "treatment",
      key: "treatment",
      width: '25%',
      render: (_, record) => renderEditCell1(record),

    },
    {
      title: "Description",
      dataIndex: "notes",
      key: "notes",
      width: "50%",
      render: (_, record) => renderEditCell(record),
    },
    {
      title: "Estimated Cost",
      dataIndex: "estimatedCost",
      key: "estimatedCost",
      width: '25%',
      render: (_, record) => renderEditCell2(record),

    },
    {
      title: "Insurance Coverage",
      dataIndex: "insuranceCoverage",
      key: "insuranceCoverage",
      width: '25%',
      render: (_, record) => renderEditCell3(record),

    },
    {
      title: "Action",
      key: "edit",
      width: "10%",
      render: (_, record) => (
        <span>
          <Space size="middle">
            {edit[record.key] ? (
              <Button
                type="text"
                icon={<img src={check} alt="" />}
                style={{ color: "#979797" }}
                onClick={() => cancelEdit(record)}
              />
            ) : (
              <Button
                type="text"
                icon={<img src={edit1} alt="" />}
                style={{ color: "#979797" }}
                onClick={() => handleEdit(record)}
              />
            )}
            <Button
              type="text"
              icon={<img src={delete1} alt="" />}
              style={{ color: "#979797" }}
              onClick={() => handleDelete(record)}
            />
          </Space>
        </span>
      ),
    },
  ];

  return (
    <>
      <ModalStep3
        isModalVisible={isModalVisible1}
        setIsModalVisible={setIsModalVisible1}
        selectedMember={memberdata}
        handleReadData={handleReadData}
      />
      <Form className="modal2-form">
        <div className="modal2-form-div">
          <div className="modal2-form-div2">
            {/* <Avatar
              size={70}
              shape="circle"
              src={
                memberdata.profile_picture
                  ? `${memberdata.profile_picture}`
                  : ""
              }
            /> */}
            <div>
              <Meta
                className="modal-op-meta"
                title={
                  memberdata.first_name && memberdata.last_name
                    ? `${memberdata.first_name} ${memberdata.last_name}`
                    : "-"
                }
              />
              {/* <div className="meta-text">john91</div> */}
            </div>
          </div>
          <div className="div-table">
            <Table
              dataSource={tableData}
              columns={columns3}
              pagination={false}
            />
            <Button
              className="step2-button2"
              type="default"
              onClick={() => {
                showModal();
              }}
            >
              + Add new Treatment
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default ModalStep2;
