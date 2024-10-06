import { Table, Typography, ConfigProvider, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import {
    Row,
    Modal,
    Card,
    Button,
    Col,
    Popover,
    Divider
} from "antd"

import { controller } from "../controller";

import arrowLeft from '../../assets/icons/arrow-circle-left.svg';
import arrowRight from '../../assets/icons/arrow-circle-right.svg';

import './style.css'



const { Text } = Typography;


const TreatmentPlanTable = (props) => {
    const [showModal, setShowModal] = useState(false)
    const [showModalID, setShowModalID] = useState(false)
    const [data, setData] = useState([])
    const [edulist, setEduList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);


    const contentExists = edulist && edulist.educational_content && edulist.educational_content.length > 0;

    // Get total number of descriptions if educational_content exists
    const totalPages = contentExists ? edulist.educational_content.length : 0;

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Handle "Previous" button click
    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleShowModal = (record) => {
        console.log(record.key)
        setShowModalID(record.key)
        setShowModal(true)
    }

    const handleEduList = async () => {
        var url = window.location.href;
        const urlParams = new URLSearchParams(url.slice(url.indexOf('?')));
        const patientId = urlParams.get('patient_id');
        try {
            const response = await controller.getTreatmentPlanDetail(showModalID, patientId);

            if (response.status < 250) {
                const data = await response.json;
                setEduList(data); // Set state with fetched data
            } else {
                console.log("Response status not OK:", response.status);
            }
        } catch (e) {
            console.error("Error fetching data:", e);
        }
    };

    useEffect(() => {
        if (showModalID) {
            handleEduList()
        }
    }, [showModalID])

    useEffect(() => {
        if (props.data) {
            // Flatten the data to include each treatment plan as a separate row
            const flattenedData = props.data.flatMap(item =>
                item.treatment_plans.map(tp => ({
                    key: tp.id,
                    patient: item.patient,
                    note: item.note,
                    status: item.status,
                    created_date: item.created_date,
                    updated_date: item.updated_date,
                    name: tp.name,
                    tooth: tp.tooth_from,
                    estimated_cost: tp.estimated_cost,
                    priority: tp.priority,
                    insurance_coverage: tp.insurance_coverage,
                    discount: tp.discount || '-', // Default value if `discount` is not available
                    patient_responsibility: tp.patient_responsibility || '-', // Default value if `patient_responsibility` is not available
                    video_link: tp.video_link,
                    treatment_procedures: tp.treatment_procedures,
                }))
            );
            setData(flattenedData);
            console.log(flattenedData); // Log the flattened data to verify its structure
        }
    }, [props.data]);



    const rowClassName = (record, index) => {
        return index === 0 ? 'hide-first-row' : '';
    };


    const columns = [
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            sorter: (a, b) => a.priority - b.priority,
            defaultSortOrder: 'ascend',
            width: '5%',
            render: (priority) => (
                <Row justify={"center"} align="bottom">
                    {priority !== null ? priority : "-"}
                </Row>
            ),
        },
        {
            title: 'Treatment',
            dataIndex: 'name',
            key: 'name',
            width: '15%',
            render: (name) => (
                <Row justify={name ? "" : "center"} align="bottom">
                    {name ? name : "-"}
                </Row>
            ),
        },
        {
            title: 'Tooth / Quadrant',
            dataIndex: 'tooth',
            key: 'tooth',
            width: '10%',
            render: (tooth) => (
                <Row justify={tooth ? "" : "center"} align="bottom">
                    {tooth ? tooth : "-"}
                </Row>
            ),
        },
        {
            title: "Estimated Cost",
            dataIndex: "estimated_cost",
            key: "estimated_cost",
            width: '17.5%',
            ellipsis: true,
            render: (estimated_cost) => (
                <Row justify={estimated_cost ? "" : "center"} align="bottom">
                    {estimated_cost ? parseFloat(estimated_cost).toFixed(2) : "-"}
                </Row>
            )
        },
        {
            title: "Insurance Coverage",
            dataIndex: "insurance_coverage",
            key: "insurance_coverage",
            width: '17.5%',
            ellipsis: true,
            render: (insurance_coverage) => (
                <Row justify={insurance_coverage ? "" : "center"} align="bottom">
                    {insurance_coverage ? insurance_coverage : "-"}
                </Row>
            )
        },
        {
            title: "Your Responsibility",
            dataIndex: "patient_responsibility",
            key: "patient_responsibility",
            width: '17.5%',
            ellipsis: true,
            render: (patient_responsibility) => (
                <Row justify={patient_responsibility ? "" : "center"} align="bottom">
                    {patient_responsibility ? patient_responsibility : "-"}
                </Row>
            )
        },
        {
            title: "Discount",
            dataIndex: "discount",
            key: "discount",
            width: '17.5%',
            ellipsis: true,
            render: (discount) => (
                <Row justify={discount ? "" : "center"} align="bottom">
                    {discount ? discount : "-"}
                </Row>
            )
        },
        {
            title: 'Patient Education',
            dataIndex: 'video_link',
            key: 'video_link',
            width: '10%',
            ellipsis: true,
            render: (video_link, record) => (
                <Row justify={video_link ? "" : "center"} align="bottom">
                    <Popover
                        showArrow={false}
                        placement='bottomRight'
                        content={() => (
                            <div className='card-in-modal'>
                                <div className='insideCardModal'>

                                    {edulist && edulist.educational_content && edulist.educational_content.length > 0 ? (
                                        <div>
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                <p style={{ fontSize: 16, marginTop: 25 }}>Treatment Description</p>

                                            </div>
                                            <div style={{ marginBottom: '20px' }}>

                                                <p style={{ fontSize: 12, color: '#848696' }}>{edulist.educational_content[currentPage].description || '-'}</p>
                                            </div>
                                            <div style={{ marginBottom: 15, display: 'flex', flexDirection: 'row' }}>
                                                <p style={{ fontSize: 16 }}>Educational Content</p>

                                            </div>
                                            <Card>

                                                {edulist.educational_content[currentPage].video_file && edulist.educational_content[currentPage].video_file.length > 0 ? (
                                                    // Check if the link contains a YouTube URL and use an iframe if it does
                                                    edulist.educational_content[currentPage].video_file.link && edulist.educational_content[currentPage].video_file.link.includes('youtube.com') ? (
                                                        <iframe
                                                            width="100%"
                                                            height="246px"
                                                            src={edulist.educational_content[currentPage].video_file.link.replace("watch?v=", "embed/")}
                                                            frameBorder="0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                            title="Educational Video"
                                                        ></iframe>
                                                    ) : (
                                                        // Use video tag for non-YouTube videos
                                                        <video width="100%" height="246px" controls>
                                                            <source src={edulist.educational_content[currentPage].video_file.link} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    )
                                                ) : (
                                                    <p>No video available</p>
                                                )}
                                            </Card>
                                            <Row justify="center" style={{ marginTop: 20, display: 'flex', alignItems: 'center' }}>
                                                <Button
                                                    type="text"
                                                    icon={<img src={arrowLeft} alt="Open" />}
                                                    style={{ marginTop: 25 }}
                                                    disabled={currentPage === 0}
                                                    onClick={handlePrevious}
                                                />
                                                <span style={{ margin: '0 10px', lineHeight: '1.5', marginTop: 25 }}> {currentPage + 1} </span>
                                                <Button
                                                    type="text"
                                                    icon={<img src={arrowRight} alt="Open" />}
                                                    style={{ marginTop: 25 }}
                                                    disabled={currentPage === totalPages - 1}
                                                    onClick={handleNext}
                                                />
                                            </Row>
                                        </div>

                                    ) : (
                                        <>
                                            <p>No educational content available</p>

                                            {/* <Row justify='end' style={{ marginTop: 35 }}>
                                            <Button type="primary" onClick={() => { updateEducational(); }}>
                                                Done
                                            </Button>
                                        </Row> */}
                                        </>
                                    )}
                                </div>
                            </div>
                        )} trigger="click">
                        <Text onClick={() => { handleShowModal(record) }} underline style={{ color: '#6B43B5', textDecoration: "underline", cursor: "pointer" }}>Learn More</Text>
                    </Popover>
                </Row>
            ),
        },
    ];




    // const columns = [
    //     {
    //         title: 'Priority',
    //         dataIndex: 'priority',
    //         key: 'priority',
    //         sorter: (a, b) => a.priority - b.priority,
    //         defaultSortOrder: 'ascend',
    //         width: '5%',
    //         render: (priority) => (
    //             <Row justify={"center"}>
    //                 {priority !== null ? priority : "-"}
    //             </Row>
    //         ),
    //     },
    //     {
    //         title: 'Treatment',
    //         dataIndex: 'name',
    //         key: 'name',
    //         width: '15%',
    //         render: (name) => (
    //             <Row justify={name ? "" : "center"}>
    //                 {name ? name : "-"}
    //             </Row>
    //         ),
    //     },
    //     {
    //         title: 'Tooth / Quadrant',
    //         dataIndex: 'tooth',
    //         key: 'tooth',
    //         width: '10%',
    //         render: (tooth) => (
    //             <Row justify={tooth ? "" : "center"}>
    //                 {tooth ? tooth : "-"}
    //             </Row>
    //         ),
    //     },
    //     {
    //         title: "Estimated Cost",
    //         dataIndex: "estimated_cost",
    //         key: "estimated_cost",
    //         width: '17.5%',
    //         ellipsis: true,
    //         render: (estimated_cost) => (
    //             <Row justify={estimated_cost ? "" : "center"}>
    //                 {estimated_cost ? parseFloat(estimated_cost).toFixed(2) : "-"}
    //             </Row>
    //         )
    //     },
    //     {
    //         title: "Insurance Coverage",
    //         dataIndex: "insurance_coverage",
    //         key: "insurance_coverage",
    //         width: '17.5%',
    //         ellipsis: true,
    //         render: (insurance_coverage) => (
    //             <Row justify={insurance_coverage ? "" : "center"}>
    //                 {insurance_coverage ? insurance_coverage : "-"}
    //             </Row>
    //         )
    //     },
    //     {
    //         title: "Your Responsibility",
    //         dataIndex: "patient_responsibility",
    //         key: "patient_responsibility",
    //         width: '17.5%',
    //         ellipsis: true,
    //         render: (patient_responsibility) => (
    //             <Row justify={patient_responsibility ? "" : "center"}>
    //                 {patient_responsibility ? patient_responsibility : "-"}
    //             </Row>
    //         )
    //     },
    //     {
    //         title: "Discount",
    //         dataIndex: "discount",
    //         key: "discount",
    //         width: '17.5%',
    //         ellipsis: true,
    //         render: (discount) => (
    //             <Row justify={discount ? "" : "center"}>
    //                 {discount ? discount : "-"}
    //             </Row>
    //         )
    //     },
    //     {
    //         title: 'Patient Education',
    //         dataIndex: 'video_link',
    //         key: 'video_link',
    //         width: '10%',
    //         ellipsis: true,
    //         render: (video_link, record) =>
    //             <Popover
    //                 showArrow={false}
    //                 placement='bottomRight'
    //                 content={() => (
    //                     <div className='card-in-modal'>
    //                         <div className='insideCardModal'>

    //                             {edulist && edulist.educational_content && edulist.educational_content.length > 0 ? (
    //                                 <div>
    //                                     <div style={{ display: 'flex', flexDirection: 'row' }}>
    //                                         <p style={{ fontSize: 16, marginTop: 25 }}>Treatment Description</p>

    //                                     </div>
    //                                     <div style={{ marginBottom: '20px' }}>

    //                                         <p style={{ fontSize: 12, color: '#848696' }}>{edulist.educational_content[currentPage].description || '-'}</p>
    //                                     </div>
    //                                     <div style={{ marginBottom: 15, display: 'flex', flexDirection: 'row' }}>
    //                                         <p style={{ fontSize: 16 }}>Educational Content</p>

    //                                     </div>
    //                                     <Card>

    //                                         {edulist.educational_content[currentPage].link && (

    //                                             edulist.educational_content[currentPage].link ? (
    //                                                 // Check if the link contains a YouTube URL and use an iframe if it does
    //                                                 edulist.educational_content[currentPage].link.includes('youtube.com') ? (
    //                                                     <iframe
    //                                                         width="100%"
    //                                                         height="246px"
    //                                                         src={edulist.educational_content[currentPage].link.replace("watch?v=", "embed/")}
    //                                                         frameBorder="0"
    //                                                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //                                                         allowFullScreen
    //                                                         title="Educational Video"
    //                                                     ></iframe>
    //                                                 ) : (
    //                                                     // Use video tag for non-YouTube videos
    //                                                     <video width="100%" height="246px" controls>
    //                                                         <source src={edulist.educational_content[currentPage].link} type="video/mp4" />
    //                                                         Your browser does not support the video tag.
    //                                                     </video>
    //                                                 )
    //                                             ) : (
    //                                                 <p>No video available</p>
    //                                             )
    //                                         )}
    //                                     </Card>
    //                                     <Row justify="center" style={{ marginTop: 20, display: 'flex', alignItems: 'center' }}>
    //                                         <Button
    //                                             type="text"
    //                                             icon={<img src={arrowLeft} alt="Open" />}
    //                                             style={{ marginTop: 25 }}
    //                                             disabled={currentPage === 0}
    //                                             onClick={handlePrevious}
    //                                         />
    //                                         <span style={{ margin: '0 10px', lineHeight: '1.5', marginTop: 25 }}> {currentPage + 1} </span>
    //                                         <Button
    //                                             type="text"
    //                                             icon={<img src={arrowRight} alt="Open" />}
    //                                             style={{ marginTop: 25 }}
    //                                             disabled={currentPage === totalPages - 1}
    //                                             onClick={handleNext}
    //                                         />
    //                                     </Row>
    //                                 </div>

    //                             ) : (
    //                                 <>
    //                                     <p>No educational content available</p>

    //                                     {/* <Row justify='end' style={{ marginTop: 35 }}>
    //                                         <Button type="primary" onClick={() => { updateEducational(); }}>
    //                                             Done
    //                                         </Button>
    //                                     </Row> */}
    //                                 </>
    //                             )}
    //                         </div>
    //                     </div>
    //                 )} trigger="click">
    //                 <Text onClick={() => { handleShowModal(record) }} underline style={{ color: '#6B43B5', textDecoration: "underline", cursor: "pointer" }}>Learn More</Text>
    //             </Popover>
    //     },
    // ];


    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#983cfc",
                    controlItemBgHover: "#c293ff",
                    colorLink: '#983cfc',
                },
                components: {
                    Table: {
                        borderRadius: "8px",
                        borderColor: "#eee",
                    },
                },
            }}
        >
            <Table
                dataSource={data}
                columns={columns}
                // bordered
                pagination={false}
                rowClassName={rowClassName}
                scroll={{ x: 'max-content' }}
                expandable={{
                    expandedRowRender: (record) => {
                        // Find the treatment plan
                        const treatmentPlan = props.data[0] && props.data[0].treatment_plans && props.data[0].treatment_plans.find(
                            (plan) => plan.id === record.key
                        );

                        if (!treatmentPlan) {
                            return <p>No treatment plans available</p>;
                        }

                        if (!treatmentPlan.treatment_procedures || treatmentPlan.treatment_procedures.length === 0) {
                            return <p>No treatment found</p>;
                        }

                        const expandedColumns = [
                            {
                                title: 'Priority',
                                dataIndex: 'priority',
                                key: 'priority',
                                width: '6%',
                                // ...other properties
                            },
                            {
                                title: 'Treatment',
                                dataIndex: 'description',
                                key: 'description',
                                width: '13%',
                                // ...other properties
                            },
                            {
                                title: 'Tooth / Quadrant',
                                dataIndex: 'tooth',
                                key: 'tooth',
                                width: '9%',
                                // ...other properties
                            },
                            {
                                title: 'Estimated Cost',
                                dataIndex: 'estimated_cost',
                                key: 'estimated_cost',
                                width: '15.5%',
                                // ...other properties
                            },
                            {
                                title: 'Insurance Coverage',
                                dataIndex: 'insurance_estimate',
                                key: 'insurance_estimate',
                                width: '16.5%',
                                // ...other properties
                            },
                            {
                                title: 'Your Responsibility',
                                dataIndex: 'patient_responsibility',
                                key: 'patient_responsibility',
                                width: '15.5%',
                                // ...other properties
                            },
                            {
                                title: 'Discount',
                                dataIndex: 'discount',
                                key: 'discount',
                                width: '17.5%',
                                // ...other properties
                            },
                            {
                                title: 'Patient Education',
                                dataIndex: 'video_link',
                                key: 'video_link',
                                width: '13%',
                                // ...other properties
                            },
                        ];

                        const expandedData = treatmentPlan.treatment_procedures.map((procedure, index) => ({
                            key: index,
                            description: procedure.procedure_code.procedure_code_description || '-',
                            tooth: procedure.tooth || '-',
                            estimated_cost: procedure.estimated_cost || '-',
                            insurance_estimate: procedure.insurance_estimate || '-',
                            patient_responsibility: procedure.patient_responsibility || '-',
                            discount: procedure.discount || '-',
                        }));

                        return (
                            <Table
                                // style={{marginLeft: '100px'}}
                                columns={expandedColumns}
                                dataSource={expandedData}
                                className="nested-table-no-header"
                                pagination={false}
                                // bordered
                                showHeader={false}
                            />
                        );
                    },
                }}
            />


        </ConfigProvider>

    );
}

export default TreatmentPlanTable;
