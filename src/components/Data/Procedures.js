import {
    Button,
    Divider,
    Modal,
    Pagination,
    Popconfirm,
    Row,
    Table,
    Typography,
    message,
    notification,
    Form,
    Input
} from "antd";
import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { dashboardActions } from "../../actions";
import { controller } from "../../controller";
import DashboardLayout from "../../layout/dashboardLayout/DashboardLayout";
import CreateNewProcedure from "./CreateNewProcedure";
import "./style.css";
import EditProcedure from "./EditProcedure";
import VideoPlayer from "./VideoPlayer";
import CreateNewProcedureMain from "./CreateNewProcedureMain";
import { Popover, Space } from 'antd';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Text, Link } = Typography;
const EditForm = (props) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        console.log('Form values:', values);
        var my_id = props.editedData && props.editedData.id ? props.editedData.id : "-1"
        const response = await controller.editProcedureRUD(values, my_id);

        if (response.status < 250) {
            props.getData();
            message.success("Procedure Edited Successfully!");
            props.handleCloseEditModal();
            form.resetFields();
        } else {
            message.error("Error!");
        }
        setLoading(false);
    };

    const handleCloseModal = () => {
        form.resetFields();
        props.handleCloseEditModal();
    }

    useEffect(() => {
        console.log(props.editedData)
        if (props.editedData) {
            form.setFieldsValue(props.editedData);
        }
    }, [props.editedData, form]);

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={props.editedData} // Use this to prefill the form fields initially
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input the name!' }]}
            >
                <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
                label="Procedure Code"
                name="procedure_code"
                rules={[{ required: true, message: 'Please input the procedure code!' }]}
            >
                <Input placeholder="Procedure Code" />
            </Form.Item>
            <Form.Item
                label="Procedure Code Description"
                name="procedure_code_description"
                rules={[{ required: true, message: 'Please input the procedure code description!' }]}
            >
                <Input placeholder="Procedure Code Description" />
            </Form.Item>
            <Form.Item
                label="Link"
                name="link"
                rules={[{ required: true, message: 'Please input the link!' }, { type: 'url', message: 'Please enter a valid URL!' }]}
            >
                <Input placeholder="Video Link" />
            </Form.Item>
            <Row justify={"end"}>
                <Form.Item>
                    <Button htmlType="submit" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Row>

        </Form>
    );
};


const openNotification = (placement, message, status) => {
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


class Procedures extends Component {
    state = {
        deleteLoading: false,
        editedRecord: {},
        currentPage: 1,
        page_size: 1,
        page: 1,
        data: [],
        loading: false,
        expandedRowKeys: [],
        visibleNewProcedure: false,
        visibleEditProcedure: false,
        visiblePopover: null,
        editedData: {},
        openEditModalProcedure: false
    };
    handleOpenModalEditProcedure = (record) => {
        // Handle open modal logic
        console.log(record)
        this.setState({
            editedData: record,
            openEditModalProcedure: true
        })
    };

    handleDelete = async (record) => {
        // Handle delete logic
        console.log(record)
        this.setState({
            deleteLoading: true
        })
        const response = await controller.deleteProcedureRUD(record.id)
        if (response.status < 250) {
            message.success("Procedure deleted succesfully!")
            this.getData()
        } else {
            message.error("Error")
        }
        this.setState({ visiblePopover: null });
        this.setState({
            deleteLoading: false
        })
    };

    handleVisibleChange = (key, visible) => {
        this.setState({ visiblePopover: visible ? key : null });
    };
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

    constructor(props) {
        super(props);
        this.getLogo();
        this.getData();
        this.getLogo = this.getLogo.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleOpenEditModalProcedure = this.handleOpenEditModalProcedure.bind(this);
        this.getData = this.getData.bind(this);
        this.props.dispatch(dashboardActions.fetchProfileSummary());
    }

    handleOpenEditModalProcedure = (record) => {
        console.log(record)
        this.setState({
            editedRecord: record,
            visibleEditProcedure: true
        })
    }

    handleRemove = async (id) => {

        const response = await controller.removeProcedure(id);
        if (response.status < 250) {
            openNotification("bottom", "Removed", "Successful")
            this.setState({

                loading: true
            })
            const response = await controller.getProcedureList(this.state.currentPage);

            for (var i in response.json.results) {
                response.json.results[i]["key"] = response.json.results[i]["id"]
            }
            if (response.status < 250) {
                this.setState({
                    page_size: response.json.count,
                    data: response.json.results,
                    loading: false
                });
            }
        } else {
            openNotification("bottom", "Error", "Error");
        }

    }

    getData = async () => {
        this.setState({
            loading: true,
        });
        const response = await controller.getProcedureList(1);
        console.log(response.json);

        for (var i in response.json.results) {
            response.json.results[i]["key"] = response.json.results[i]["id"]
        }

        this.setState({
            data: response.json.results,
            page: 1,
            currentPage: 1,
            loading: false,
            page_size: response.json.count,
            createProcedureRecord: {}
        });
    };

    handleOpenModalNewProcedure = (record) => {
        this.setState({
            visibleNewProcedure: true,
            createProcedureRecord: record
        })
    }

    handlePageChange = async (page) => {
        this.setState({
            currentPage: page,
        });

        const response = await controller.unApprovedAppointment(page);
        if (response.status < 250) {
            this.setState({
                page: 1,
                page_size: response.data.count,
                AppointmentList: response.data.results,
            });
        }
    };

    getLogo = async () => {
        const response = await controller.getLogo();
        this.setState({ serverLogo: response.data.dark });
    };

    handleRowExpand = (record) => {
        const { expandedRowKeys } = this.state;
        const key = record.key; // Assuming record.key is the unique identifier for the row
        const newExpandedRowKeys = expandedRowKeys.includes(key)
            ? expandedRowKeys.filter((k) => k !== key)
            : [...expandedRowKeys, key];
        this.setState({ expandedRowKeys: newExpandedRowKeys });
    };

    handleCloseEditModal = async () => {
        this.setState({
            openEditModalProcedure: false,
        });
    }

    handleEditProcedure = async () => {
        this.setState({
            visibleEditProcedure: false,
            loading: true
        })
        const response = await controller.getProcedureList(this.state.currentPage);
        for (var i in response.json.results) {
            response.json.results[i]["key"] = response.json.results[i]["id"]
        }
        this.setState({
            page_size: response.json.count,
            data: response.json.results,
            loading: false
        });
    }

    handleCreateNewProcedure = async () => {
        this.setState({
            visibleNewProcedure: false,
            loading: true
        })
        const response = await controller.getProcedureList(this.state.currentPage);
        for (var i in response.json.results) {
            response.json.results[i]["key"] = response.json.results[i]["id"]
        }
        this.setState({
            page_size: response.json.count,
            data: response.json.results,
            loading: false
        });
    }

    render() {

        const { visiblePopover } = this.state;
        const { profileSummary } = this.props;
        const columns = [
            {
                title: "ID",
                dataIndex: "id",
                key: "id",
            },
            {
                title: "Name",
                dataIndex: "name",
                key: "name",
            },
            {
                title: "Procedure Code",
                dataIndex: "procedure_code",
                key: "procedure_code",
            },
            {
                title: "Procedure Code Description",
                dataIndex: "procedure_code_description",
                key: "procedure_code_description",
            },
            {
                title: "Educational Content",
                dataIndex: "procedure_code_description",
                key: "procedure_code_description",
                render: (_, record) => {
                    return (
                        <VideoPlayer videoUrl={record.link} />
                    )
                }
            },
            {
                title: "Action",
                key: "action",
                render: (_, record) => {
                    return (
                        <>

                            <Space size="middle">
                                <Link onClick={() => this.handleOpenModalEditProcedure(record)}>
                                    <EditOutlined style={{ color: 'green' }} />
                                </Link>

                                <Popover
                                    content={
                                        <div>
                                            <p>Are you sure you want to delete this item?</p>
                                            <Row justify={"end"}>

                                                <Button

                                                    onClick={() => this.setState({ visiblePopover: null })}
                                                >
                                                    No
                                                </Button>
                                                <Button
                                                    loading={this.state.deleteLoading}
                                                    style={{ marginLeft: 8 }}
                                                    type="primary"
                                                    onClick={() => this.handleDelete(record)}
                                                >
                                                    Yes
                                                </Button>
                                            </Row>

                                        </div>
                                    }
                                    title="Confirm Delete"
                                    trigger="click"
                                    visible={visiblePopover === record.key}
                                    onVisibleChange={(visible) =>
                                        this.handleVisibleChange(record.key, visible)
                                    }
                                >
                                    <Link>
                                        <DeleteOutlined style={{ color: 'red' }} />
                                    </Link>
                                </Popover>
                                <Link onClick={() => this.handleOpenModalNewProcedure(record)}>
                                    <PlusOutlined />
                                </Link>
                            </Space>
                        </>
                    );
                },
            },
        ];

        const expandedRowRender = (record) => {
            const impactsColumns = [
                {
                    title: "ID",
                    dataIndex: "id",
                    key: "id",
                },
                {
                    title: "Health Category",
                    dataIndex: "health_category.name",
                    key: "health_category",
                    render: (text, record) =>
                        record.health_category && record.health_category.name,
                },
                {
                    title: "Health Score",
                    dataIndex: "health_score",
                    key: "health_score",
                },
                {
                    title: "Recovery Percent",
                    dataIndex: "recovery_percent",
                    key: "recovery_percent",
                },
                {
                    title: "Recovery Time",
                    dataIndex: "recovery_time",
                    key: "recovery_time",
                },
                {
                    title: "Action",
                    key: "action",
                    render: (_, record) => {
                        return (
                            <>
                                <Typography.Text
                                    className="appointment_edit"
                                    onClick={() => {
                                        this.handleOpenEditModalProcedure(
                                            record
                                        );
                                    }}
                                >
                                    Edit
                                </Typography.Text>
                                <Divider type="vertical" />
                                <Popconfirm
                                    title="Are you sure to remove this procedure impact?"
                                    onConfirm={() => {
                                        this.handleRemove(record.id);
                                    }}
                                >
                                    <Typography.Text className="delete-row">
                                        Delete
                                    </Typography.Text>
                                </Popconfirm>
                            </>
                        );
                    },
                },
            ];

            return (
                <Table
                    columns={impactsColumns}
                    dataSource={record.procedure_impacts}
                    pagination={false}
                />
            );
        };

        return (
            <DashboardLayout
                breadCrumb={"Procedures"}
                logo={profileSummary && profileSummary.logo ? profileSummary.logo : ""}
                footerLogo={this.state.serverLogo}
            >

                <div className="paymentRequestContent">
                    <Row justify={"end"}>
                        <CreateNewProcedureMain getData={this.getData} />
                    </Row>
                    <Table
                        style={{ marginTop: "20px" }}
                        loading={this.state.loading}
                        columns={columns}
                        dataSource={this.state.data}
                        expandable={{
                            expandedRowRender,
                            expandedRowKeys: this.state.expandedRowKeys,
                            onExpand: (expanded, record) => this.handleRowExpand(record),
                        }}
                    />
                    <Row type="flex" justify="end" className="mt15">
                        <Pagination
                            showSizeChanger={false}
                            hideOnSinglePage={true}
                            current={this.state.currentPage}
                            total={this.state.page_size}
                            onChange={this.handlePageChange}
                            className="paginator"
                            size="small"
                        />
                    </Row>
                </div>

                <Modal
                    footer={null}
                    title="Create New Procedure"
                    open={this.state.visibleNewProcedure}
                    onCancel={() => {
                        this.setState({
                            visibleNewProcedure: false,
                        });
                    }}
                >
                    <CreateNewProcedure
                        procedure={this.state.createProcedureRecord}
                        createSuccessFully={this.handleCreateNewProcedure}
                        closeModal={() => {
                            this.setState({
                                visibleNewProcedure: false,
                            });
                        }} />
                </Modal>

                <Modal
                    footer={null}
                    title={
                        this.state.editedData.procedure_code ?
                            <span>Edit {this.state.editedData.name}	  <b>(Code: {this.state.editedData.procedure_code})</b></span>
                            : "Edit "
                    }
                    open={this.state.openEditModalProcedure}
                    onCancel={() => {
                        this.setState({
                            openEditModalProcedure: false,
                        });
                    }}
                >
                    <EditForm getData={this.getData} editedData={this.state.editedData} handleCloseEditModal={this.handleCloseEditModal} />
                </Modal>
                <Modal
                    footer={null}
                    title={
                        this.state.editedRecord.name ?
                            <span>Edit <b>{this.state.editedRecord.name}</b></span>
                            : "Edit "
                    }
                    open={this.state.visibleEditProcedure}
                    onCancel={() => {
                        this.setState({
                            visibleEditProcedure: false,
                        });
                    }}
                >
                    <EditProcedure
                        data={this.state.editedRecord}
                        procedure={this.state.createProcedureRecord}
                        createSuccessFully={this.handleEditProcedure}
                        closeModal={() => {
                            this.setState({
                                visibleEditProcedure: false,
                            });
                        }} />
                </Modal>

            </DashboardLayout>
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

const connectedProcedures = connect(mapStateToProps)(Procedures);

export default connectedProcedures;