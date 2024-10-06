import React, { useEffect, useState } from "react";
import {
    Button,
    Col,
    Table,
    Input,
    Upload,
    Typography,
    Space,
    notification,
    Spin,
    Card,
    Row,
    Select,
    Divider,
    message,
    Modal,
    Form,
    InputNumber

} from "antd";

// icons
import check from '../../../assets/icons/check.png';
import edit1 from '../../../assets/icons/edit.png';
import up2 from '../../../assets/icons/Polygon 1.png';
import down2 from '../../../assets/icons/Polygon 2.png';
import delete1 from '../../../assets/icons/trash.png';
import add from '../../../assets/icons/add-button.svg';
import folder from '../../../assets/icons/folder-open.svg';
import downloadIcon from '../../../assets/icons/download-icon.png'
import circle from '../../../assets/icons/add2.svg'
import book from '../../../assets/icons/book.svg'
import edit2 from '../../../assets/icons/edit-2.svg'
import tick from '../../../assets/icons/tick-circle-gray.svg'
import arrowRight from '../../../assets/icons/arrow-circle-right.svg'
import arrowLeft from '../../../assets/icons/arrow-circle-left.svg'
import mkvIcon from '../../../assets/icons/mkv.svg';
import mp4Icon from '../../../assets/icons/mp4.svg';
import powerIcon from '../../../assets/icons/power.svg';
import pdfIcon from '../../../assets/icons/pdf.svg';
import excelIcon from '../../../assets/icons/excel.svg';
import wordIcon from '../../../assets/icons/word.svg';


import ModalStep3 from './ModalStep3';
import "../style.css";
import { controller } from "../controller";

const { Title } = Typography;



const TreatmentCardStep2 = (props) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [data1, setData1] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [currentStep, setCurrentStep] = useState(1);
    const [item, setItems] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [note, setNote] = useState("");
    const [imageFile, setImageFile] = useState([]);
    const [videoFile, setVideoFile] = useState([]);
    const [selectedTreatmentIds, setSelectedTreatmentIds] = useState([]);
    const [edit, setEdit] = useState({});
    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [updatingPriority, setUpdatingPriority] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading1, setIsLoading1] = useState(false);
    const [visible, setVisible] = useState(true);
    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [data, setData] = useState([]);
    const [save, setSave] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [editState, setEditState] = useState({});
    const [expandedRowInputValues, setExpandedRowInputValues] = useState({});
    const [id, setId] = useState(null);
    const [eduid, setEduId] = useState(null);
    const [edu, setEdu] = useState([]);
    const [eduvalue, setEduValue] = useState([]);
    const [text, setText] = useState("");
    const [url, setUrl] = useState("");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [desc2, setDesc2] = useState("");
    const [procedures, setProcedures] = useState([]);
    const [disableadd, setDisableAdd] = useState(false);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [selectedprocedure, setSelectedProcedure] = useState("");
    const [startDates, setStartDates] = useState("");
    const [endDates, setEndDates] = useState("");
    const [mode, setMode] = useState("");
    const [searchQuery2, setSearchQuery2] = useState("");
    const [current, setCurrent] = useState(1)
    const [itemlist, setItemList] = useState([]);
    const [edulist, setEduList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [modaledit, setModalEdit] = useState(false);
    const [modaledit2, setModalEdit2] = useState(false);
    const [editpro, setEditPro] = useState({})
    const [expandedRowKeys2, setExpandedRowKeys2] = useState([]);
    const [editingProcedureIndex, setEditingProcedureIndex] = useState(null);
    const [editedProcedures, setEditedProcedures] = useState({});
    const [itemlist2, setItemlist2] = useState([]); // Assuming you set the `itemlist` through data fetching



    const handleProcedureInputChange = (value, procIndex, fieldName) => {
        setEditedProcedures({
            ...editedProcedures,
            [procIndex]: {
                ...editedProcedures[procIndex],
                [fieldName]: value,
            },
        });
    };

    const getFileIcon = (fileType) => {
        switch (fileType) {
            case 'pdf':
                return pdfIcon;
            case 'msword':
            case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
            case 'docx':
                return wordIcon;
            case 'xlsx':
                return excelIcon;
            case 'pptx':
                return powerIcon;
            case 'zip':
            case 'rar':
                return folder; // Default folder icon for compressed files
            case 'mp4':
                return mp4Icon;
            case 'mkv':
                return mkvIcon;
            case 'aspx':
                return folder; // Assuming folder icon for this type
            default:
                return folder; // Default folder icon for unknown types
        }
    };

    // Get the file type (assuming `file.file_type` contains the file type)



    // Function to save the edited procedure
    // Function to save the edited procedure
    const saveEditedProcedure = async (procIndex, record, procedureId) => {
        const expandedRowData = editedProcedures[procIndex]; // Get the edited data for the current procedure

        try {
            // Create the object with only the fields that have a value
            const dataToSend = {};

            if (expandedRowData.procedure_code_description) {
                dataToSend.procedure_code = expandedRowData.procedure_code_description;
            }
            if (expandedRowData.tooth) {
                dataToSend.tooth = expandedRowData.tooth;
            }
            if (expandedRowData.discount) {
                dataToSend.discount = expandedRowData.discount;
            }
            if (expandedRowData.insurance_estimate) {
                dataToSend.insurance_estimate = expandedRowData.insurance_estimate;
            }
            if (expandedRowData.estimated_cost) {
                dataToSend.estimated_cost = expandedRowData.estimated_cost;
            }

            // Send data to the server only with the existing fields
            const response = await controller.UpdateProcedures(procedureId, dataToSend);

            if (response.status === 200) {
                // Update local table state after successful response
                setItemlist2(prevItemList =>
                    prevItemList.map(item =>
                        item.key === record.key // Update the specific row that matches the current record
                            ? {
                                ...item,
                                treatment_plans: item.treatment_plans.map(plan => ({
                                    ...plan,
                                    treatment_procedures: plan.treatment_procedures.map((procedure, index) =>
                                        index === procIndex
                                            ? {
                                                ...procedure,
                                                ...dataToSend // Only update the fields that were sent
                                            }
                                            : procedure
                                    )
                                }))
                            }
                            : item
                    )
                );
                message.success("Procedure Saved successfully!");

                // Exit edit mode
                setEditingProcedureIndex(null);
                setEditedProcedures({});
                handleReadData2();
            } else {
                console.error('Error updating procedure:', response.message);
                // Optionally, handle server errors here (e.g., display an error message)
                setEditingProcedureIndex(null);
                setEditedProcedures({});
            }
        } catch (error) {
            console.error('Error saving procedure:', error);
            // Handle network or unexpected errors
        }
        setEditingProcedureIndex(null);
        setEditedProcedures({});
    };


    // Function to cancel the edit mode
    const cancelEditProcedure = () => {
        setEditingProcedureIndex(null);
        setEditedProcedures({});
    };

    // Function to delete a procedure
    const deleteProcedures2 = (procedureId) => {
        // Assuming the procedure ID is unique, and we can delete based on ID
        const updatedTreatmentPlans = itemlist[0].treatment_plans.map(plan => ({
            ...plan,
            treatment_procedures: plan.treatment_procedures.filter(proc => proc.id !== procedureId),
        }));

        const updatedItemlist = [...itemlist];
        updatedItemlist[0].treatment_plans = updatedTreatmentPlans;

        setItemlist2(updatedItemlist);
    };





    const [form] = Form.useForm();

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


    const handleEditModal = (id) => {
        setModalEdit(true);
        setEduId(id);
    };



    const handleEditModal2 = (id) => {
        setModalEdit2(true);
        setEduId(id);
    };

    const handleEditPro = () => {
        setEditPro(true);
    };


    const updateEducational2 = async () => {
        try {
            const formData = new FormData();
            if (desc2) {
                formData.append('description', desc2);
            }


            await controller.UpdateEducational2(eduid, formData);
            handleCancel()
            handleReadEdu();
            handleEduList();
            setModalEdit(false);
            message.success("Educational Content updated successfully!");
        } catch (error) {
            console.error("Error updating educational:", error);
            message.error("Failed to update educational Content. Please try again.");
        }
    };

    const updateEducational3 = async () => {
        try {
            const formData = new FormData();
            if (desc2) {
                formData.append('description', desc2);
            }

            if (eduvalue && eduvalue.length > 0) {
                eduvalue.forEach((file) => {
                    formData.append('video_file', file);
                });
            }

            await controller.UpdateEducational2(eduid, formData);
            handleCancel()
            handleReadEdu();
            handleEduList();
            setModalEdit2(false);
            message.success("Educational Content updated successfully!");
        } catch (error) {
            console.error("Error updating educational:", error);
            message.error("Failed to update educational Content. Please try again.");
        }
    };









    const getImageUrl = file => {
        if (file instanceof File) {
            return URL.createObjectURL(file);
        }
        return file.image_path || URL.createObjectURL(file);
    };


    const onFinish = (values) => {
        console.log('Form values: ', values);
    };

    const handleTextAreaChange = (e) => {
        setNote(e.target.value);
    };


    const handleCancel = () => {
        setIsModalVisible(false);
        setDesc("");
        setEduValue([]);
        setDesc2("");
        setModalEdit2(false)
        console.log("Input c;leared:", desc === "");

    };


    const handleCancel2 = () => {
        setIsModalVisible2(false);
        setText("");
        setUrl("");
        setName("");
        setVideoFile([]);
        form.resetFields();
    };


    const handleOpen = (record) => {
        setIsModalVisible(true);
        setId(record.key);
        console.log(record.key)
    };


    const handleOpen2 = (record) => {
        setIsModalVisible2(true);
    };


    const handleExpandedInputChange = (value, key, field) => {
        // value will be item.id here
        const updatedData = { ...expandedRowInputValues[key], [field]: value };  // Store item.id in 'procedure_code'
        setExpandedRowInputValues({
            ...expandedRowInputValues,
            [key]: updatedData,
        });

        // Send updatedData to the server, and it will contain the correct item.id
    };






    const showModal = () => {
        setSelectedPatientId(props.data.id);
        setIsModalVisible1(true);
        console.log(isModalVisible1);
    };

    useEffect(() => {
        if (!isExpanded) {
            setNote("");
            setImageFile([]);
        }
    }, [isExpanded]);

    const Priority = ({ loading, initialPriority, onUpdate, record }) => {
        const [count, setCount] = useState(Number(initialPriority));

        const increasePriority = async () => {
            const newPriority = Number(count) + 1;
            setCount(newPriority);
            onUpdate(newPriority, record);
        };

        const decreasePriority = async () => {
            const newPriority = Math.max(Number(count) - 1, 0);
            setCount(newPriority);
            onUpdate(newPriority, record);
        };

        useEffect(() => {
            setCount(initialPriority);
        }, [initialPriority]);

        return (
            <div className="div-prority">
                <Button type="text" icon={<img src={down2} alt="" />} onClick={decreasePriority} />
                {
                    loading ? <Spin size="small" /> :
                        <p className="p-fontSize"> {count} </p>
                }
                <Button type="text" icon={<img src={up2} alt="" />} onClick={increasePriority} />
            </div>
        );
    };


    const handleDelete2 = async (imageId, index) => {
        try {
            if (imageId) {
                await controller.removeImages(imageId);
                setImageFile(prevFiles => prevFiles.filter(file => file.id !== imageId));
            } else {

                setImageFile(prevFiles => {
                    const updatedFiles = prevFiles.filter(file => file.id !== imageId);
                    console.log("Updated files after deletion:", updatedFiles);
                    return updatedFiles;
                });
                console.log(imageFile)
                window.location.reload()
            }
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    useEffect(() => {
        console.log("Current image files in state:", imageFile);
        // Any other operations that depend on updated imageFile
    }, [imageFile]); // Dependency array to re-run this effect when imageFile changes





    const handleUploadChange = (info) => {
        setImageFile(prevFiles => {
            const newFiles = info.fileList.map(file => file.originFileObj);

            const combinedFiles = [...prevFiles, ...newFiles.filter(newFile => !prevFiles.some(prevFile => prevFile.name === newFile.name && prevFile.lastModified === newFile.lastModified))];

            return combinedFiles;
        });
    };



    const handleUploadChange2 = (info) => {
        setVideoFile(prevFiles => {
            const newFiles = info.fileList.map(file => file.originFileObj);

            const combinedFiles = [...prevFiles, ...newFiles.filter(newFile => !prevFiles.some(prevFile => prevFile.name === newFile.name && prevFile.lastModified === newFile.lastModified))];
            console.log(videoFile)

            return combinedFiles;
        });
    };






    const handleReadData = async () => {
        var id = localStorage.getItem('patient_id');
        try {
            const response = await controller.getDoctorNote(id);

            if (response.status < 250) {
                const jsonData = await response.json;


                if (jsonData.results && jsonData.results.length > 0) {
                    // Extract the IDs
                    const ids = jsonData.results.map(result => result.id);

                    const largestId = Math.max(...ids);
                    const largestIdData = jsonData.results.find(result => result.id === largestId);

                    setData(largestIdData);
                    setNote(largestIdData.note);


                    if (largestIdData.image_files && largestIdData.image_files.length > 0) {

                        const imageData = largestIdData.image_files.map(file => ({
                            path: file.image_path,
                            id: file.id,
                            name: file.file_name
                        }));
                        setImageFile(imageData);
                        console.log("Image data:", imageData);
                    } else {
                        console.error('No image file found in the response');
                        setImageFile([]);
                    }


                    const treatmentIDs = largestIdData.treatment_plans.map(plan => plan.id);
                    setSelectedTreatmentIds(treatmentIDs);
                    setSelectedRowKeys(treatmentIDs.map(id => id.toString()));
                } else {
                    console.error('No note found in the response');
                    setSave(true);
                    setImageFile([]);
                }
            }
        } catch (e) {
            console.error('Error fetching the note:', e);
            // Optionally handle the error, e.g., display a notification
            setImageFile([]); // Ensure imageFile is an empty array if an error occurs
        }
    };








    useEffect(() => {
        handleReadData();
    }, []);

    useEffect(() => {
        setSelectedRowKeys(selectedTreatmentIds.map(id => id.toString()));
    }, [selectedTreatmentIds]);




    const handleReadEdu = async () => {
        try {
            const response = await controller.getEducatinal();
            if (response.status < 250) {
                const data = await response.json;
                const results = data.results;
                setEdu(results);
                console.log(results);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleReadData2 = async () => {
        var id = localStorage.getItem("patient_id");
        try {
            const response = await controller.getTreatmentPlans2("", searchQuery2, current, startDates, endDates, selectedprocedure, id);

            if (response.status < 250) {
                const data = await response.json;
                console.log("Fetched data:", data.results); // Check if data.results is correct
                setItemList(data.results); // Set state with fetched data
            } else {
                console.log("Response status not OK:", response.status);
            }
        } catch (e) {
            console.error("Error fetching data:", e);
        }
    };


    const handleEduList = async () => {
        try {
            const response = await controller.getEduByPatient(id);

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
        handleReadData2();
    }, []);

    useEffect(() => {

        if (id) {
            handleEduList();
        }
    }, [id]);

    useEffect(() => {
        console.log(itemlist);
        processTreatmentPlans() // This will log the updated itemlist when it changes
    }, [itemlist]);


    const handleReadProcuders = async () => {
        try {
            const response = await controller.getProcedure(0, "");
            if (response.status < 250) {
                const data = await response.json;
                const results = data;
                setProcedures(results);
                console.log(results);
            }
        } catch (e) {
            console.log(e);
        }
    };


    useEffect(() => {
        handleReadProcuders();
    }, []);


    useEffect(() => {
        handleReadEdu();
    }, []);

    const handleSuccessAddToServer = () => {
        props.updateData();
    }


    const processTreatmentPlans = () => {
        console.log("Itemlist received:", itemlist);

        // Check if itemlist has at least one object and then access its treatment_plans
        if (itemlist.length > 0 && itemlist[0].treatment_plans && Array.isArray(itemlist[0].treatment_plans) && itemlist[0].treatment_plans.length > 0) {
            const treatmentPlans = itemlist[0].treatment_plans.map(plan => ({
                key: plan.id.toString(),  // Assuming each plan has a unique 'id'
                treatment: plan.name || "-",  // Assuming each plan has a 'name' field
                estimatedCost: plan.estimated_cost || '',  // Optional field
                insuranceCoverage: plan.insurance_coverage || '',  // Optional field
                tooth_from: plan.tooth_from || "-",  // Optional field
                priority: plan.priority || 0,  // Optional field
                procedure: plan.procedure ? plan.procedure.name : "-",  // Optional nested field
                discount: plan.discount || "-",  // Optional field
                patientResponsibility: plan.patient_responsibility || "-",  // Optional field
            }));

            console.log("Transformed treatment plans:", treatmentPlans);

            // Set the transformed treatment plans to your table
            setTableData(treatmentPlans);

            // Initialize the edit state based on the keys of the treatment plans
            const initialEditState = {};
            treatmentPlans.forEach(row => {
                initialEditState[row.key] = false;
            });
            setEditState(initialEditState);
        } else {
            console.log("No treatment plans available. Debugging info:");
            console.log("Itemlist:", itemlist);
            console.log("Treatment Plans:", itemlist[0] ? itemlist[0].treatment_plans : "None");
            setTableData([]);
        }
    };






    useEffect(() => {
        console.log("useEffect triggered");
        if (itemlist) {
            processTreatmentPlans();
        }
    }, [itemlist]);



    // Handle input change for editable fields
    const addTreatmentPlan = () => {
        const newRow = {
            key: Date.now().toString(),
            treatment: '',
            estimatedCost: '',
            insuranceCoverage: '',
            notes: '',
            priority: '',
            procedure: '',
            isNew: true, // Flag new rows
        };

        setDisableAdd(true);

        // Append the new row to the end of the tableData array
        setTableData(prevTableData => [...prevTableData, newRow]);
        setEditState(prevEditState => ({ ...prevEditState, [newRow.key]: true }));
        setExpandedRowKeys(prevExpandedRowKeys => [...prevExpandedRowKeys, newRow.key]);
    };



    // Handle input change for editable fields
    const handleInputChange = (e, key, field) => {
        const newValue = e.target.value;
        const newData = [...tableData];
        const index = newData.findIndex(item => item.key === key);
        if (index > -1) {
            const item = newData[index];
            item[field] = newValue; // Update the specific field
            setTableData(newData);
        }
    };

    const getAllInputValues = () => {
        const updatedRecords = data.map(record => ({
            ...record,
            ...editState[record.key] // Override with the edited values
        }));

        console.log('Updated Records:', updatedRecords);
        return updatedRecords;
    };

    const handleNoteChange = (e, record) => {
        const updatedTableData = tableData.map(row => {
            if (row.key === record.key) {
                return { ...row, tooth_from: e.target.value };
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
        await saveNotesToServer(record);
        setEdit(false);
    };

    const saveNotesToServer = async (record) => {
        try {
            // if (!record.notes || record.notes.trim() === '') {
            //     return;
            // }
            await controller.UpdateTreatmentPlans(record.key, { tooth_from: record.tooth_from, name: record.treatment, estimated_cost: record.estimatedCost, insurance_coverage: record.insuranceCoverage });
            props.updateDataUpdatePriority();
        } catch (error) {
            console.error("Error updating notes:", error);
        }
    };



    const savePriorityToServer = async (record) => {
        setUpdatingPriority(record.key);
        try {
            await controller.UpdateTreatmentPlans(record.key, {
                priority: record.priority
            });
            setTableData(prevTableData =>
                prevTableData.map(row =>
                    row.key === record.key ? { ...row, priority: record.priority } : row
                )
            );
            props.updateDataUpdatePriority();
        } catch (error) {
            console.error("Error updating priority:", error);
        }
        setTimeout(() => {
            setUpdatingPriority(null);
        }, 800);
    };

    // const saveTreatmentPlanToServer = async (record, recordKey) => {
    //     try {
    //         await controller.createTreatmentPlans2({
    //             name: record.treatment,
    //             patient: props.data.id,
    //             tooth_from: record.tooth_from,
    //         });

    //         // Update table state to reflect changes after successful API call
    //         setTableData(prevTableData =>
    //             prevTableData.map(row =>
    //                 row.key === record.key ? { ...row, ...record } : row
    //             )
    //         );

    //         processTreatmentPlans();

    //         message.success("Treatment plan create successfully!");
    //         window.location.reload();


    //     } catch (error) {
    //         console.error("Error saving treatment plan:", error);

    //         // Display error message
    //         message.error("Failed to create treatment plan. Please try again.");
    //     }

    // };

    const saveTreatmentPlanToServer = async (record, recordKey) => {
        const expandedRowData = expandedRowInputValues[recordKey];
        if (!record.treatment) {
            notification.error({
                message: 'Error',
                description: ' Please Fill Treatment Name.',
                placement: 'bottomRight',
            });
            return;
        }
        if (!record.tooth_from) {
            notification.error({
                message: 'Error',
                description: ' Please Fill Tooth/ Quad.',
                placement: 'bottomRight',
            });
            return;
        }
        if (!expandedRowData.procedure_code) {
            notification.error({
                message: 'Error',
                description: 'Please select Procedure Code',
                placement: 'bottomRight',
            });
            return;
        }
        if (!expandedRowData.tooth_quad) {
            notification.error({
                message: 'Error',
                description: 'Please Fill Tooth/Quad',
                placement: 'bottomRight',
            });
            return;
        }
        if (!expandedRowData.discount) {
            notification.error({
                message: 'Error',
                description: 'Please Fill Discount',
                placement: 'bottomRight',
            });
            return;
        }
        if (!expandedRowData.insurance_estimate) {
            notification.error({
                message: 'Error',
                description: 'Please Fill Insurance Estimate',
                placement: 'bottomRight',
            });
            return;
        }
        if (!expandedRowData.estimated_cost) {
            notification.error({
                message: 'Error',
                description: 'Please Fill Estimated Cost',
                placement: 'bottomRight',
            });
            return;
        }

        try {
            const response = await controller.createTreatmentPlans2({
                name: record.treatment,
                patient: props.data.id,
                tooth_from: record.tooth_from,
                treatment_procedure_data: {
                    procedure_code: expandedRowData.procedure_code || "",
                    tooth: expandedRowData.tooth_quad || "",
                    discount: expandedRowData.discount || "",
                    insurance_estimate: expandedRowData.insurance_estimate || "",
                    estimated_cost: expandedRowData.estimated_cost || ""
                }
            });

            if (response.status < 250) {
                message.success("Treatment plan create successfully!");
            }

            // Update table state to reflect changes after successful API call
            setTableData(prevTableData =>
                prevTableData.map(row =>
                    row.key === record.key ? { ...row, ...record } : row
                )
            );

            processTreatmentPlans();
            setDisableAdd(false);
            handleReadData2();

            setExpandedRowInputValues(prevValues => ({
                ...prevValues,
                [recordKey]: {
                    procedure_code: "",
                    tooth_quad: "",
                    discount: "",
                    insurance_estimate: "",
                    estimated_cost: ""
                }
            }));


            props.handleReadData2();
            processTreatmentPlans();
            // window.location.reload();


        } catch (error) {
            console.error("Error saving treatment plan:", error);

            // Display error message
            // message.error("Failed to create treatment plan. Please try again.");
        }

    };



    const postProcedure = async (record, recordKey) => {
        const treatmentId = Number(recordKey);
        const expandedRowData = expandedRowInputValues[treatmentId];
        console.log('Expanded row data:', expandedRowData);
        if (!expandedRowData) {
            notification.error({
                message: 'Error',
                description: ' Please Fill Inputs.',
                placement: 'bottomRight',
            });
            return;
        }

        if (!expandedRowData.procedure_code) {
            notification.error({
                message: 'Error',
                description: 'Please select Procedure Code',
                placement: 'bottomRight',
            });
            return;
        }
        if (!expandedRowData.tooth_quad) {
            notification.error({
                message: 'Error',
                description: 'Please Fill Tooth/Quad',
                placement: 'bottomRight',
            });
            return;
        }
        if (!expandedRowData.discount) {
            notification.error({
                message: 'Error',
                description: 'Please Fill Discount',
                placement: 'bottomRight',
            });
            return;
        }
        if (!expandedRowData.insurance_estimate) {
            notification.error({
                message: 'Error',
                description: 'Please Fill Insurance Estimate',
                placement: 'bottomRight',
            });
            return;
        }
        if (!expandedRowData.estimated_cost) {
            notification.error({
                message: 'Error',
                description: 'Please Fill Estimated Cost',
                placement: 'bottomRight',
            });
            return;
        }
        console.log(typeof (treatmentId));


        try {
            await controller.createProcedures({
                procedure_code: expandedRowData.procedure_code || "",
                treatment: treatmentId,
                tooth: expandedRowData.tooth_quad || "",
                discount: expandedRowData.discount || "",
                insurance_estimate: expandedRowData.insurance_estimate || "",
                estimated_cost: expandedRowData.estimated_cost || ""
            });

            setTableData(prevTableData =>
                prevTableData.map(row =>
                    row.key === record.key ? {
                        ...row,
                        procedure_code: expandedRowData.procedure_code,
                        tooth_quad: expandedRowData.tooth_quad,
                        discount: expandedRowData.discount,
                        insurance_estimate: expandedRowData.insurance_estimate,
                        estimated_cost: expandedRowData.estimated_cost
                    } : row
                )
            );


            message.success("Procedure create successfully!");
            handleReadData2();
            processTreatmentPlans();
            setDisableAdd(false);

            // window.location.reload();

            setExpandedRowInputValues(prevValues => ({
                ...prevValues,
                [treatmentId]: {
                    procedure_code: "",
                    tooth_quad: "",
                    discount: "",
                    insurance_estimate: "",
                    estimated_cost: ""
                }
            }));

        } catch (error) {
            console.error("Error saving procedure:", error);

            message.error("Failed to create procedure. Please try again.");
        }
    };

    const postEducational = async () => {
        const formData = new FormData();

        try {
            if (videoFile && videoFile.length > 0) {
                videoFile.forEach((file) => {
                    formData.append('video', file);
                });
            }
            formData.append('name', name);
            formData.append('link', url);
            formData.append('description', text);

            await controller.createEducational(formData);

            handleReadEdu();
            message.success("Educational created successfully!");
            handleCancel2();
        } catch (error) {
            console.error("Error saving educational:", error);
            message.error("Failed to create educational. Please try again.");
        }
    };




    const handleDelete = async (record) => {
        try {
            await controller.RemoveTreatmentPlans(record.key);
            const updatedTableData = tableData.filter(row => row.key !== record.key);
            setTableData(updatedTableData);

            // Use functional update and log inside
            setSelectedTreatmentIds(prevIds => {
                const updatedIds = prevIds.filter(id => id !== record.key);
                console.log("Selected Treatment IDs after deletion:", updatedIds);
                return updatedIds;
            });

            handleReadData2();
            processTreatmentPlans();
        } catch (error) {
            console.error("Error deleting treatment plan:", error);
        }
    };




    const deleteProcedures = async (id) => {
        try {
            await controller.RemoveProcedures(id);
            const updatedTableData = tableData.filter(row => row.key !== id);
            setTableData(updatedTableData);
            handleReadData2();
            processTreatmentPlans();
        } catch (error) {
            console.error("Error deleting treatment plan:", error);
        }
    };

    const handleVisible = async (record, visibility) => {
        try {
            await controller.visibleTreatmentPlans(record.key, { visible_to_patient: visibility });

            const updatedTableData = tableData.map(row => {
                if (row.key === record.key) {
                    return { ...row, visible: visibility };
                }
                return row;
            });

            setTableData(updatedTableData);

            notification.success({
                message: 'Success',
                description: `Visibility for ${record.treatment} updated successfully.`,
                placement: 'bottomRight',
            });
        } catch (error) {
            console.error("Error updating visibility:", error);
            notification.error({
                message: 'Error',
                description: `Error updating visibility for ${record.treatment}.`,
                placement: 'bottomRight',
            });
        }
    };

    const renderEditCell = (record) => {
        const isEditing = edit[record.key];
        return (
            <span>
                {isEditing ? (
                    <Input.TextArea
                        style={{ border: "1px solid #C9C1F1" }}
                        value={record.tooth_from}
                        onChange={(e) => handleNoteChange(e, record)}
                        autoSize={{ minRows: 2, maxRows: 6 }}
                    />
                ) : (
                    <span>{record.tooth_from}</span>
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

    // const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {
    //     setSelectedRowKeys(newSelectedRowKeys);
    //     const ids = newSelectedRows.map(row => row.key);
    //     setSelectedTreatmentIds(ids);
    //     console.log('Selected Treatment IDs:', ids);
    // };

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys) => {
            setSelectedRowKeys(newSelectedRowKeys);
            const ids = newSelectedRowKeys.map(key => parseInt(key, 10));
            setSelectedTreatmentIds(ids);
            console.log('Selected Treatment IDs:', ids);
        },
    };



    // const handleApprove = async () => {
    //     if (selectedTreatmentIds.length === 0) {
    //         notification.error({
    //             message: 'Error',
    //             description: 'Please select at least one treatment plan.',
    //             placement: 'bottomRight',
    //         });
    //         return; 
    //     }

    //     setIsLoading(true);
    //     try {
    //         const formData = new FormData();
    //         for (var i in selectedTreatmentIds) {
    //             formData.append('treatment_plans', selectedTreatmentIds[i]);
    //         }
    //         formData.append('note', note);
    //         formData.append("patient", props.data.id);
    //         imageFile.forEach((file, index) => {
    //             if (file instanceof File || file instanceof Blob) {
    //                 formData.append(`image_files`, file);
    //             }
    //         });
    //         const response = await controller.postNoteAndImage(formData, 'sent');
    //         if (response.status < 250) {
    //             notification.success({
    //                 message: 'Success',
    //                 description: 'Your Files Successfully Sent.',
    //                 placement: 'bottomRight',
    //             });
    //             setIsExpanded(false);
    //             setIsLoading(false);
    //             props.setCurrentStep(1);
    //         }
    //     } catch (error) {
    //         console.error("Error occurred during upload:", error);
    //         setIsLoading(false); 
    //     }
    // };


    const handleApprove2 = async (status) => {
        if (selectedTreatmentIds.length === 0) {
            notification.error({
                message: 'Error',
                description: 'Please select at least one treatment plan.',
                placement: 'bottomRight',
            });
            return;
        }

        if (note === '') {
            notification.error({
                message: 'Error',
                description: 'Please Write Note',
                placement: 'bottomRight',
            });
            return;
        }

        try {
            if (save) {
                setIsLoading1(true);
                const formData = new FormData();
                for (var i in selectedTreatmentIds) {
                    formData.append('treatment_plans', selectedTreatmentIds[i]);
                }
                formData.append('note', note);
                formData.append("patient", props.data.id);
                imageFile.forEach((file, index) => {
                    if (file instanceof File || file instanceof Blob) {
                        formData.append(`image_files`, file);
                    }
                });
                const response = await controller.postNoteAndImage(formData, status);
                if (response.status < 250) {
                    notification.success({
                        message: 'Success',
                        description: 'Data Updated Successfully.',
                        placement: 'bottomRight',
                    });
                    setIsExpanded(false);
                    setIsLoading1(false);
                    props.setCurrentStep(1);
                }
            } else {
                setIsLoading(true);
                const formData = new FormData();
                for (var j in selectedTreatmentIds) {
                    formData.append('treatment_plans', selectedTreatmentIds[j]);
                }
                formData.append('note', note);
                // formData.append("patient", props.data.id);
                imageFile.forEach((file, index) => {
                    if (file instanceof File || file instanceof Blob) {
                        formData.append(`image_files`, file);
                    }
                });
                formData.append('status', status)
                const response = await controller.UpdateDoctorNote(formData, data.id);
                if (response.status < 250) {
                    const jsonData = await response.json;

                    console.log('Data from another endpoint:', jsonData);
                    notification.success({
                        message: 'Success',
                        description: 'Data Updated Successfully.',
                        placement: 'bottomRight',
                    });
                    setIsExpanded(false);
                    setIsLoading1(false);
                    // props.setCurrentStep(1);
                    if(status == "sent") {
                        window.location.reload();
                    }
                }
                setIsLoading1(false);
                setIsLoading(false)
            }
        } catch (error) {
            console.error("Error occurred during operation:", error);
            setIsLoading1(false);
            setIsLoading(false)
        }
    };

    const updateEducational = async () => {
        try {
            const formData = new FormData();
            formData.append('description', desc);

            formData.append('treatment', id)

            eduvalue.forEach(value => {
                const pk = parseInt(value, 10);
                if (!isNaN(pk)) {
                    formData.append('video_file', pk);
                } else {
                    console.error(`Invalid PK value: ${value}`);
                }
            });

            await controller.UpdateEducational(formData);
            handleCancel()
            handleReadEdu();
            message.success("Educational Content updated successfully!");
        } catch (error) {
            console.error("Error updating educational:", error);
            message.error("Failed to update educational Content. Please try again.");
        }
    };







    const columns3 = [
        {
            title: "Priority",
            dataIndex: "priority",
            key: "priority",
            width: '8%',
            sorter: (a, b) => a.priority - b.priority,
            defaultSortOrder: 'ascend',
            render: (priority, record) => (
                record.key !== updatingPriority ?
                    <>
                        <Priority
                            loading={false}
                            initialPriority={priority}
                            onUpdate={(newPriority, record) => {
                                savePriorityToServer({ ...record, priority: newPriority });
                            }}
                            record={record}
                        />
                    </>
                    :
                    <Priority
                        loading={true}
                        initialPriority={priority}
                        onUpdate={(newPriority, record) => {
                            savePriorityToServer({ ...record, priority: newPriority });
                        }}
                        record={record}
                    />
            ),
        },


        {
            title: "Treatment",
            dataIndex: "treatment",
            key: "treatment",
            width: '20%',
            render: (text, record) =>
                editState[record.key] ? (
                    <Input
                        value={record.treatment}
                        onChange={(e) => handleInputChange(e, record.key, 'treatment')}
                        placeholder="Enter Treatment"
                    />
                ) : (
                    edit[record.key] ? renderEditCell1(record) : text
                ),
        },
        // {
        //     title: "Description",
        //     dataIndex: "notes",
        //     key: "notes",
        //     width: '40%',
        //     render: (_, record) => renderEditCell(record),
        // },
        {
            title: "Tooth/Quad",
            dataIndex: "tooth_from",
            key: "tooth_from",
            width: '11%',
            render: (text, record) =>
                editState[record.key] ? (
                    <Input
                        value={record.tooth_from}
                        onChange={(e) => handleInputChange(e, record.key, 'tooth_from')}
                        placeholder="Enter Tooth/Quad"
                    />
                ) : (
                    edit[record.key] ? renderEditCell(record) : text
                ),
        },
        {
            title: "Estimated Cost",
            dataIndex: "estimatedCost",
            key: "estimatedCost",
            width: '11%',
            render: (text, record) => text ? "$" + text : "-"



        },
        {
            title: "Insurance Estimate",
            dataIndex: "insuranceCoverage",
            key: "insuranceCoverage",
            width: '11%',
            render: (text, record) => text ? "$" + text : "-"

        },
        {
            title: "Discount",
            dataIndex: "discount",
            key: "discount",
            width: '9%',
            render: (text, record) => text ? "%" + text : "-"

        },
        {
            title: "Patient Responsibility",
            dataIndex: "patientResponsibility",
            key: "patientResponsibility",
            width: '130px',
            render: (text, record) => text ? "$" + text : "-"

        },
        {
            title: "Action",
            key: "action",
            width: '10%',
            render: (_, record) => (
                <span>
                    <Space size="middle">
                        {record.isNew ? null : (
                            <>
                                {edit[record.key] ? (
                                    <Button
                                        type="text"
                                        icon={<img src={check} alt="Cancel" />}
                                        style={{ color: "#979797" }}
                                        onClick={() => cancelEdit(record)}
                                    />
                                ) : (
                                    <Button
                                        type="text"
                                        icon={<img src={edit1} alt="Edit" />}
                                        style={{ color: "#979797" }}
                                        onClick={() => handleEdit(record)}
                                    />
                                )}
                                <Button
                                    type="text"
                                    icon={<img src={delete1} alt="Delete" />}
                                    style={{ color: "#979797" }}
                                    onClick={() => handleDelete(record)}
                                />
                                <Button
                                    type="text"
                                    icon={<img src={book} alt="Open" />}
                                    style={{ color: "#979797" }}
                                    onClick={() => handleOpen(record)}
                                />
                            </>
                        )}
                    </Space>
                </span>
            ),
        },
    ];

    const treatment = itemlist.length > 0 && itemlist[0].treatment_plans && Array.isArray(itemlist[0].treatment_plans) && itemlist[0].treatment_plans.length > 0 && itemlist[0].treatment_plans.find(
        (plan) => plan.id == id
    );



    return (
        <>
            <ModalStep3
                isModalVisible={isModalVisible1}
                setIsModalVisible={setIsModalVisible1}
                selectedMember={item}
                handleSuccessAddToServer={handleSuccessAddToServer}
                patientId={selectedPatientId}
                handleReadData={handleReadData}
                processTreatmentPlans={() => processTreatmentPlans(props.data)}
            />


            <Title level={4} style={{ marginBottom: 25 }}>{props.data.first_name}'s Treatment Plans</Title>

            <Card>
                <>
                    <Title className="step-title" level={5}>
                        Doctor's Note
                    </Title>
                    <Input.TextArea
                        className="textarea-shadow-border2"
                        value={note}
                        onChange={handleTextAreaChange}
                        placeholder="Write Doctor’s Note..."
                    />
                </>
                <>
                    <Card>
                        <Title className="step-title" level={5}>
                            Recommended Treatments
                        </Title>
                        <div className="div-table1">
                            <Table
                                dataSource={tableData}
                                columns={columns3}
                                scroll={{ x: 'max-content' }}
                                pagination={false}
                                expandedRowKeys={expandedRowKeys}
                                rowSelection={rowSelection}
                                onExpand={(expanded, record) => {
                                    if (expanded) {
                                        setExpandedRowKeys([...expandedRowKeys, record.key]);
                                    } else {
                                        setExpandedRowKeys(expandedRowKeys.filter(key => key !== record.key));
                                    }
                                }}
                                expandable={{
                                    expandedRowRender: (record) => {
                                        if (record.isNew) {
                                            // Render inputs for new rows only
                                            return (
                                                <div style={{ marginLeft: 200 }}>
                                                    <Row gutter={20} style={{ display: 'flex', alignItems: 'center' }}>
                                                        <Col span={6}>
                                                            <Select
                                                                placeholder="Select Procedure Code"
                                                                style={{ width: '226px', height: 42 }}
                                                                onChange={(value) => handleExpandedInputChange(value, record.key, 'procedure_code')}
                                                                value={
                                                                    expandedRowInputValues[record.key]
                                                                        ? expandedRowInputValues[record.key].procedure_code
                                                                        : undefined
                                                                }
                                                                filterOption={(input, option) =>
                                                                    option.props.children.toLowerCase().includes(input.toLowerCase())
                                                                }
                                                                showSearch={true}
                                                            >
                                                                {procedures && procedures.length > 0 ? (
                                                                    procedures.map((item) => (
                                                                        item && item.id ? ( // Check if item and item.id are valid
                                                                            <Select.Option key={item.id} value={item.id}>
                                                                                {item.procedure_code + "-" + item.procedure_code_description}
                                                                            </Select.Option>
                                                                        ) : null // If item is null or doesn't have an id, don't render
                                                                    ))
                                                                ) : (
                                                                    <Select.Option disabled key={-2} value="">
                                                                        empty
                                                                    </Select.Option>
                                                                )}
                                                            </Select>
                                                        </Col>
                                                        <Col span={2} style={{ marginRight: 60 }}>
                                                            <Input
                                                                placeholder="Enter Tooth/Quad"
                                                                style={{ width: '110px' }}
                                                                onChange={(e) => handleExpandedInputChange(e.target.value, record.key, 'tooth_quad')}
                                                                value={
                                                                    expandedRowInputValues[record.key]
                                                                        ? expandedRowInputValues[record.key].tooth_quad
                                                                        : ''
                                                                }
                                                            />
                                                        </Col>
                                                        <Col span={2} style={{ marginRight: 50 }}>
                                                            <Input
                                                                placeholder="Enter Cost"
                                                                style={{ width: '110px' }}
                                                                onChange={(e) => handleExpandedInputChange(e.target.value, record.key, 'estimated_cost')}
                                                                value={
                                                                    expandedRowInputValues[record.key]
                                                                        ? expandedRowInputValues[record.key].estimated_cost
                                                                        : ''
                                                                }
                                                            />
                                                        </Col>
                                                        <Col span={2} style={{ marginRight: 45 }}>
                                                            <Input
                                                                placeholder="Enter Estimate"
                                                                style={{ width: '110px' }}
                                                                onChange={(e) => handleExpandedInputChange(e.target.value, record.key, 'insurance_estimate')}
                                                                value={
                                                                    expandedRowInputValues[record.key]
                                                                        ? expandedRowInputValues[record.key].insurance_estimate
                                                                        : ''
                                                                }
                                                            />
                                                        </Col>
                                                        <Col span={4}>
                                                            <Input
                                                                placeholder="Enter %"
                                                                style={{ width: '90px' }}
                                                                onChange={(e) => handleExpandedInputChange(e.target.value, record.key, 'discount')}
                                                                value={
                                                                    expandedRowInputValues[record.key]
                                                                        ? expandedRowInputValues[record.key].discount
                                                                        : ''
                                                                }
                                                            />
                                                        </Col>
                                                        <Col span={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                            <Button
                                                                type="primary"
                                                                style={{ width: '57px', fontSize: 10 }}
                                                                onClick={() => saveTreatmentPlanToServer(record, record.key)}
                                                            >
                                                                Save
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            );
                                        }

                                        const treatmentPlan = itemlist.length > 0 &&
                                            itemlist[0].treatment_plans &&
                                            Array.isArray(itemlist[0].treatment_plans) &&
                                            itemlist[0].treatment_plans.length > 0 &&
                                            itemlist[0].treatment_plans.find((plan) => plan.id == record.key);

                                        if (!treatmentPlan) {
                                            return <p>No treatment plans available</p>;
                                        }

                                        // Define columns for the inner table
                                        const innerColumns = [
                                            {
                                                title: 'Tooth/Quad',
                                                dataIndex: 'tooth1',
                                                key: 'tooth1',
                                                width: '7%',
                                                render: (text, procedure, index) => {
                                                    const isEditing = editingProcedureIndex === procedure.id;
                                                    return (
                                                        <span></span>
                                                    );
                                                },
                                            },
                                            {
                                                title: 'Tooth/Quad',
                                                dataIndex: 'tooth2',
                                                key: 'tooth2',
                                                width: '7.5%',
                                                render: (text, procedure, index) => {
                                                    const isEditing = editingProcedureIndex === procedure.id;
                                                    return (
                                                        <span></span>
                                                    );
                                                },
                                            },
                                            {
                                                title: 'Procedure Code Description',
                                                dataIndex: ['procedure_code', 'procedure_code_description'],
                                                key: 'procedure_code_description',
                                                width: '20.5%',
                                                render: (text, procedure, index) => {
                                                    const isEditing = editingProcedureIndex === procedure.id;
                                                    return isEditing ? (
                                                        <Select
                                                            placeholder="Select Procedure Code"
                                                            style={{ width: '145px', height: 42 }}
                                                            onChange={(value) => handleProcedureInputChange(value, index, 'procedure_code_description')}
                                                            value={
                                                                editedProcedures[index] && editedProcedures[index].procedure_code_description !== undefined
                                                                    ? editedProcedures[index].procedure_code_description
                                                                    : procedure && procedure.procedure_code && procedure.procedure_code.procedure_code_description !== undefined
                                                                        ? procedure.procedure_code.procedure_code_description
                                                                        : ''
                                                            }



                                                            filterOption={(input, option) =>
                                                                option.children.toLowerCase().includes(input.toLowerCase())
                                                            }
                                                            showSearch
                                                        >
                                                            {procedures.map((item) => (
                                                                <Select.Option key={item.id} value={item.id}>
                                                                    {item.procedure_code} - {item.procedure_code_description}
                                                                </Select.Option>
                                                            ))}
                                                        </Select>
                                                    ) : (
                                                        <span>{procedure.procedure_code.procedure_code_description || '-'}</span>
                                                    );
                                                },
                                            },
                                            {
                                                title: 'Tooth/Quad',
                                                dataIndex: 'tooth',
                                                key: 'tooth',
                                                width: '11%',
                                                render: (text, procedure, index) => {
                                                    const isEditing = editingProcedureIndex === procedure.id;
                                                    return isEditing ? (
                                                        <Input
                                                            value={
                                                                (editedProcedures[index] && editedProcedures[index].tooth !== undefined)
                                                                    ? editedProcedures[index].tooth
                                                                    : (procedure.tooth !== undefined ? procedure.tooth : '')
                                                            }



                                                            onChange={(e) => handleProcedureInputChange(e.target.value, index, 'tooth')}
                                                        />
                                                    ) : (
                                                        <span>{procedure.tooth || '-'}</span>
                                                    );
                                                },
                                            },
                                            {
                                                title: 'Estimated Cost',
                                                dataIndex: 'estimated_cost',
                                                key: 'estimated_cost',
                                                width: '12%',
                                                render: (text, procedure, index) => {
                                                    const isEditing = editingProcedureIndex === procedure.id;
                                                    return isEditing ? (
                                                        <InputNumber
                                                            value={
                                                                (editedProcedures[index] && editedProcedures[index].estimated_cost !== undefined)
                                                                    ? editedProcedures[index].estimated_cost
                                                                    : (procedure.estimated_cost !== undefined ? procedure.estimated_cost : 0)
                                                            }

                                                            onChange={(value) => handleProcedureInputChange(value, index, 'estimated_cost')}
                                                        />
                                                    ) : (
                                                        <span>${procedure.estimated_cost || '-'}</span>
                                                    );
                                                },
                                            },
                                            {
                                                title: 'Insurance Estimate',
                                                dataIndex: 'insurance_estimate',
                                                key: 'insurance_estimate',
                                                width: '11%',
                                                render: (text, procedure, index) => {
                                                    const isEditing = editingProcedureIndex === procedure.id;
                                                    return isEditing ? (
                                                        <InputNumber
                                                            value={
                                                                (editedProcedures[index] && editedProcedures[index].insurance_estimate !== undefined)
                                                                    ? editedProcedures[index].insurance_estimate
                                                                    : (procedure.insurance_estimate !== undefined ? procedure.insurance_estimate : 0)
                                                            }



                                                            onChange={(value) =>
                                                                handleProcedureInputChange(value, index, 'insurance_estimate')
                                                            }
                                                        />
                                                    ) : (
                                                        <span>${procedure.insurance_estimate || '-'}</span>
                                                    );
                                                },
                                            },
                                            {
                                                title: 'Discount',
                                                dataIndex: 'discount',
                                                key: 'discount',
                                                width: '9%',
                                                render: (text, procedure, index) => {
                                                    const isEditing = editingProcedureIndex === procedure.id;
                                                    return isEditing ? (
                                                        <InputNumber
                                                            value={
                                                                editedProcedures[index] && editedProcedures[index].discount !== undefined && editedProcedures[index].discount !== null
                                                                    ? editedProcedures[index].discount
                                                                    : procedure && procedure.discount !== undefined && procedure.discount !== null
                                                                        ? procedure.discount
                                                                        : 0
                                                            }

                                                            formatter={(value) => `${value}%`}
                                                            parser={(value) => value.replace('%', '')}
                                                            onChange={(value) => handleProcedureInputChange(value, index, 'discount')}
                                                        />
                                                    ) : (
                                                        <span>{procedure.discount ? `%${procedure.discount}` : '-'}</span>
                                                    );
                                                },
                                            },
                                            {
                                                title: 'Patient Responsibility',
                                                dataIndex: 'patient_responsibility',
                                                key: 'patient_responsibility',
                                                width: '130px',
                                                render: (text, procedure) => <span>${procedure.patient_responsibility || '-'}</span>,
                                            },
                                            {
                                                title: 'Actions',
                                                key: 'actions',
                                                width: '10%',
                                                render: (text, procedure, index) => {
                                                    const isEditing = editingProcedureIndex === procedure.id;
                                                    return isEditing ? (
                                                        <>
                                                            <Button
                                                                type="text"
                                                                onClick={() => saveEditedProcedure(index, record, procedure.id)}
                                                                icon={<img src={check} alt="Save" />}
                                                            />
                                                            {/* <Button
                                                                type="text"
                                                                onClick={() => setEditingProcedureIndex(null)}
                                                                icon={<img src={cancelIcon} alt="Cancel" />}
                                                            /> */}
                                                        </>
                                                    ) : (
                                                        <Row justify='center'>
                                                            <Button
                                                                type="text"
                                                                onClick={() => setEditingProcedureIndex(procedure.id)}
                                                                icon={<img src={edit1} alt="Edit" />}
                                                                style={{ marginRight: 20 }}
                                                            />
                                                            <Button
                                                                type="text"
                                                                icon={<img src={delete1} alt="Delete" />}
                                                                onClick={() => deleteProcedures(procedure.id)}
                                                                disabled={treatmentPlan.treatment_procedures.length === 1}
                                                            />
                                                        </Row>
                                                    );
                                                },
                                            },
                                        ];

                                        // Prepare data for the inner table
                                        const data = treatmentPlan.treatment_procedures.map((procedure, index) => ({
                                            key: procedure.id,
                                            ...procedure,
                                            index,
                                        }));

                                        return (
                                            <div>
                                                <Table
                                                    columns={innerColumns}
                                                    dataSource={data}
                                                    pagination={false}
                                                    rowKey="key"
                                                    showHeader={false}
                                                />
                                                {/* Form for adding new procedures */}
                                                <div style={{ marginTop: 20, marginLeft: 180 }}>
                                                    <Row gutter={20} style={{ display: 'flex', alignItems: 'center' }}>
                                                        <Col span={6}>
                                                            <Select
                                                                placeholder="Select Procedure Code"
                                                                style={{
                                                                    width: '226px',
                                                                    height: 42,
                                                                    border: '1px solid #6B43B5',
                                                                    borderRadius: 7,
                                                                }}
                                                                onChange={(value) => handleExpandedInputChange(value, record.key, 'procedure_code')}
                                                                value={expandedRowInputValues[record.key] ? expandedRowInputValues[record.key].procedure_code : undefined}
                                                                filterOption={(input, option) =>
                                                                    String(option.children).toLowerCase().includes(input.toLowerCase())
                                                                }
                                                                showSearch
                                                            >

                                                                {procedures.map((item) => (
                                                                    <Select.Option key={item.id} value={item.id}>
                                                                        {item.procedure_code} - {item.procedure_code_description}
                                                                    </Select.Option>
                                                                ))}
                                                            </Select>
                                                        </Col>
                                                        <Col span={2} style={{ marginRight: 60 }}>
                                                            <Input
                                                                placeholder="Enter Tooth/Quad"
                                                                style={{ width: '110px' }}
                                                                onChange={(e) =>
                                                                    handleExpandedInputChange(e.target.value, record.key, 'tooth_quad')
                                                                }
                                                                value={expandedRowInputValues[record.key] ? expandedRowInputValues[record.key].tooth_quad : ''}
                                                            />
                                                        </Col>
                                                        <Col span={2} style={{ marginRight: 50 }}>
                                                            <Input
                                                                placeholder="Enter Cost"
                                                                style={{ width: '110px' }}
                                                                onChange={(e) =>
                                                                    handleExpandedInputChange(e.target.value, record.key, 'estimated_cost')
                                                                }
                                                                value={expandedRowInputValues[record.key] ? expandedRowInputValues[record.key].estimated_cost : ''}
                                                            />
                                                        </Col>
                                                        <Col span={2} style={{ marginRight: 45 }}>
                                                            <Input
                                                                placeholder="Enter Estimate"
                                                                style={{ width: '110px' }}
                                                                onChange={(e) =>
                                                                    handleExpandedInputChange(e.target.value, record.key, 'insurance_estimate')
                                                                }
                                                                value={expandedRowInputValues[record.key] ? expandedRowInputValues[record.key].insurance_estimate : ''}
                                                            />
                                                        </Col>
                                                        <Col span={4}>
                                                            <Input
                                                                placeholder="Enter %"
                                                                style={{ width: '90px' }}
                                                                onChange={(e) =>
                                                                    handleExpandedInputChange(e.target.value, record.key, 'discount')
                                                                }
                                                                value={expandedRowInputValues[record.key] ? expandedRowInputValues[record.key].discount : ''}
                                                            />
                                                        </Col>
                                                        <Col
                                                            span={4}
                                                            style={{ display: 'flex', justifyContent: 'flex-end' }}
                                                        >
                                                            <Button
                                                                type="primary"
                                                                style={{ width: '57px', fontSize: 10 }}
                                                                onClick={() => postProcedure(record, record.key)}
                                                            >
                                                                Save
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        );
                                    },
                                }}
                            />


                            {/* <ExpandableTable
                                data={tableData}
                                columns={columns3}
                                rowSelection={rowSelection} /> */}
                        </div>
                        {disableadd ? (
                            <Button
                                className="step1-button-disabled"
                                type="default"
                                style={{ color: 'gray' }}
                                // onClick={showModal}
                                onClick={addTreatmentPlan}
                                disabled={true}
                            >
                                Add Treatment
                                <img src={circle} alt="" />
                            </Button>
                        ) : (
                            <Button
                                className="step1-button"
                                type="default"
                                // onClick={showModal}
                                onClick={addTreatmentPlan}
                            >
                                Add Treatment
                                <img src={circle} alt="" />
                            </Button>
                        )}

                    </Card>
                    <label className="inputLabel" style={{ fontSize: 18, fontWeight: '600', marginBottom: 20 }}>
                        Files
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        {imageFile.map((file, index) => {
                            let urlObject;
                            let pathname = '';
                            let fileType = '';

                            try {
                                urlObject = new URL(file.path);
                                pathname = urlObject.pathname;
                                fileType = pathname.split('.').pop();
                            } catch (e) {
                                pathname = file.name || '';
                                fileType = pathname.split('.').pop();
                            }

                            const fileType2 = file.file_type;

                            // Get the appropriate icon based on file type
                            const fileIcon = getFileIcon(fileType);

                            return (
                                <div key={file.name} className="uploaded-file-preview" style={{ display: 'inline-block', marginRight: 10, position: 'relative' }}>
                                    {file.type && file.type.startsWith('image') ? (
                                        <>
                                            <img
                                                src={getImageUrl(file)}
                                                alt={folder}
                                                style={{ objectFit: 'cover', borderRadius: 8, border: '1px solid #6B43B5', width: 200, height: 133, position: 'relative' }}
                                            />

                                            {/* Download Icon */}
                                            <div className='downloadIconContainer'
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    zIndex: "5"
                                                }}
                                            >
                                                <a href={getImageUrl(file)} download>
                                                    <img
                                                        width={15}
                                                        height={15}
                                                        src={downloadIcon}
                                                        alt="download"
                                                    />
                                                </a>
                                            </div>

                                        </>
                                    ) : (
                                        <div style={{ width: 200, height: 133, marginBottom: 35 }}>
                                            <div style={{ border: '1px solid #6B43B5', borderRadius: 8, width: 200, height: 133, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                <div style={{ fontSize: 50, color: '#6B43B5' }}>
                                                    {fileType === 'pdf' || fileType === 'msword' || fileType === 'vnd.openxmlformats-officedocument.wordprocessingml.document' || fileType === 'xlsx' || fileType === 'pptx' || fileType === 'zip' || fileType === 'rar' || fileType === 'docx' || fileType === 'aspx' || fileType === 'mp4' || fileType === 'mkv' ?
                                                        <>
                                                            <img src={fileIcon} alt={`${fileType2} icon`} />
                                                            <div className='downloadIconContainer'
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: '40%',
                                                                    left: '50%',
                                                                    transform: 'translate(-50%, -50%)',
                                                                    zIndex: "5",
                                                                    width: 30,
                                                                    height: 35
                                                                }}
                                                            >
                                                                <a href={file.path ? file.path : getImageUrl(file)} download style={{ position: 'absolute', bottom: -17 }}>
                                                                    <img
                                                                        width={15}
                                                                        height={15}
                                                                        src={downloadIcon}
                                                                        alt="download" />
                                                                </a>
                                                            </div>
                                                            <p>{file.file_name}</p>
                                                        </>
                                                        :
                                                        <>
                                                            <img
                                                                src={file.path}
                                                                alt={folder}
                                                                style={{ objectFit: 'cover', width: 200, height: 133, borderRadius: 8, display: 'flex', alignItems: 'center', marginTop: 10 }} />
                                                            <div className='downloadIconContainer'
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: '40%',
                                                                    left: '50%',
                                                                    transform: 'translate(-50%, -50%)',
                                                                    zIndex: "5",
                                                                    width: 30,
                                                                    height: 35
                                                                }}
                                                            >
                                                                <a href={file.path} download style={{ position: 'absolute', bottom: -17 }}>
                                                                    <img
                                                                        width={15}
                                                                        height={15}
                                                                        src={downloadIcon}
                                                                        alt="download" />
                                                                </a>
                                                            </div>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                            <div style={{ fontSize: 12, color: '#6B43B5', marginTop: 10, textAlign: 'center', marginBottom: 25 }}>{file.name}</div>
                                        </div>
                                    )}
                                    <button
                                        onClick={() => handleDelete2(file.id, index)}
                                        style={{
                                            position: 'absolute',
                                            top: 5,
                                            right: 5,
                                            background: 'transparent',
                                            color: '#B7B7B7',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: 23,
                                            height: 20,
                                            textAlign: 'center',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        x
                                    </button>
                                </div>
                            );
                        })}
                        <Col
                            xs={4}
                            md={4}
                            style={{ padding: 0, border: '1px dashed #B7B7B7', borderWidth: 3, borderRadius: 8, display: 'inline-block', verticalAlign: 'top', marginLeft: 15, height: 137 }}
                        >
                            <div className="clearfix" style={{ width: 200 }}>
                                <Upload
                                    beforeUpload={() => false}
                                    showUploadList={false}
                                    // fileList={toFileList(imageFile)}
                                    onChange={handleUploadChange}
                                >
                                    <label
                                        className='formLabel'
                                        style={{
                                            color: "gray",
                                            backgroundColor: "none",
                                            display: "flex",
                                            // height: "61px",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: '8px',
                                            cursor: "pointer",
                                            maxWidth: "150px",
                                            minWidth: "unset",
                                            padding: "15px",
                                            flexDirection: 'column',
                                            fontSize: 14,
                                            marginLeft: 35
                                        }}
                                    >
                                        <div style={{ top: -15, position: 'relative' }}>
                                            <img src={add} alt='' style={{}} />
                                        </div>
                                        <div style={{ color: '#B7B7B7', fontSize: 12, marginBottom: 5 }}>
                                            Drag and drop or <span style={{ color: '#6B43B5' }}>Browse</span> your files
                                        </div>
                                    </label>
                                </Upload>
                            </div>
                        </Col>
                    </div>

                </>
            </Card>
            <div className="step2-div" style={{ marginBottom: 100 }}>
                <Row style={{ marginLeft: 'auto' }}>
                    <Button
                        className="render-btn2"
                        onClick={() => handleApprove2("draft")}
                        // loading={isLoading1}
                        style={{ marginRight: 10, border: '1px solid #6B43B5', color: '#6B43B5' }}
                    // disabled={!selectedTreatmentIds || selectedTreatmentIds.length === 0}
                    >
                        Save
                    </Button>
                    <Button
                        className="render-btn2"
                        type="primary"
                        onClick={() => handleApprove2("sent")}
                    // loading={isLoading}
                    // disabled={!selectedTreatmentIds || selectedTreatmentIds.length === 0}
                    >
                        Send
                    </Button>
                </Row>

            </div>
            <Modal
                title="Educational Content"
                open={isModalVisible}
                style={{
                    minWidth: 300,
                    minHeight: 800,
                }}
                footer={null}
                onCancel={handleCancel}
            >
                {edulist && edulist.educational_content && edulist.educational_content.length > 0 ? (
                    <div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <p style={{ fontSize: 16, marginTop: 25 }}>Treatment Description</p>
                            {modaledit ? (
                                <Button
                                    type="text"
                                    icon={<img src={tick} alt="Open" />}
                                    style={{ color: "#979797", marginLeft: 'auto', marginTop: 25 }}
                                    onClick={() => updateEducational2()}
                                />
                            ) : (
                                <Button
                                    type="text"
                                    icon={<img src={edit2} alt="Open" />}
                                    style={{ color: "#979797", marginLeft: 'auto', marginTop: 25 }}
                                    onClick={() => {
                                        if (edulist && edulist.educational_content && edulist.educational_content[currentPage]) {
                                            handleEditModal(edulist.educational_content[currentPage].id);
                                        } else {
                                            console.error("Educational content or current page is undefined");
                                        }
                                    }}
                                />

                            )}
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            {modaledit ? (
                                <div>
                                    <Input
                                        style={{ width: '100%', height: 74, borderRadius: 7 }}
                                        placeholder="Write Treatment Description..."
                                        onChange={(e) => setDesc2(e.target.value)}
                                        value={desc2 || edulist.educational_content[0].description || '-'}  // Default value from <p>
                                    />
                                </div>
                            ) : (
                                <p style={{ fontSize: 12, color: '#848696' }}>
                                    {edulist.educational_content[0].description || '-'}
                                </p>
                            )}

                        </div>
                        <div style={{ marginBottom: 15, display: 'flex', flexDirection: 'row' }}>
                            <p style={{ fontSize: 16 }}>Educational Content</p>
                            {modaledit2 ? (
                                <Button
                                    type="text"
                                    icon={<img src={tick} alt="Open" />}
                                    style={{ color: "#979797", marginLeft: 'auto', marginTop: 25 }}
                                    onClick={() => updateEducational3()}
                                />
                            ) : (
                                <Button
                                    type="text"
                                    icon={<img src={edit2} alt="Open" />}
                                    style={{ color: "#979797", marginLeft: 'auto', marginTop: 25 }}
                                    onClick={() => {
                                        if (edulist && edulist.educational_content && edulist.educational_content[currentPage]) {
                                            handleEditModal2(edulist.educational_content[currentPage].id);
                                        } else {
                                            console.error("Educational content or current page is undefined");
                                        }
                                    }}
                                />

                            )}
                        </div>
                        <Card>
                            {modaledit2 ? (
                                <Select
                                    mode="multiple"
                                    value={eduvalue}
                                    maxTagCount={1}
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
                                                    onClick={() => handleOpen2()}
                                                >
                                                    Add Yours
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                    onChange={(selectedItems) => {

                                        setEduValue(selectedItems); // Limit selection to 1

                                    }}
                                    style={{ width: '100%', height: 42, borderRadius: 7, border: '1px solid #6B43B5' }}
                                    placeholder="Search Content"
                                >
                                    {edu && edu.length > 0 ? (
                                        edu.map((item) => (
                                            item && item.id ? ( // Check if item and item.id are valid
                                                <Select.Option key={item.id} value={item.id}>
                                                    {item.name}
                                                </Select.Option>
                                            ) : null // If item is null or doesn't have an id, don't render
                                        ))
                                    ) : (
                                        <Select.Option disabled key={-2} value="">
                                            empty
                                        </Select.Option>
                                    )}
                                </Select>
                            ) : (

                                edulist.educational_content[currentPage].video_file && edulist.educational_content[currentPage].video_file.length > 0 ? (
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
                                )
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
                    <><div>
                        <div style={{ marginBottom: '20px' }}>
                            <p>Treatment Description</p>
                            <Input
                                style={{ width: '100%', height: 74, borderRadius: 7 }}
                                placeholder="Write Treatment Description..."
                                onChange={(e) => setDesc(e.target.value)}
                                value={desc} />
                        </div>

                        <div onClick={console.log("abfd", edulist)}>
                            <p>Educational Contents</p>
                            <Select
                                mode="multiple"
                                value={eduvalue}
                                maxTagCount={1}
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
                                                onClick={() => handleOpen2()}
                                            >
                                                Add Yours
                                            </Button>
                                        </div>
                                    </>
                                )}
                                onChange={(selectedItems) => {

                                    setEduValue(selectedItems); // Limit selection to 1

                                }}
                                style={{ width: '100%', height: 42, borderRadius: 7, border: '1px solid #6B43B5' }}
                                placeholder="Search Content"
                            >
                                {edu && edu.length > 0 ? (
                                    edu.map((item) => (
                                        item && item.id ? (
                                            <Select.Option key={item.id} value={item.id}>
                                                {item.name}
                                            </Select.Option>
                                        ) : null
                                    ))
                                ) : (
                                    <Select.Option disabled key={-2} value="">
                                        empty
                                    </Select.Option>
                                )}
                            </Select>



                        </div>
                    </div>
                        <Row justify='end' style={{ marginTop: 35 }}>
                            <Button type="primary" onClick={() => { updateEducational(); }}>
                                Done
                            </Button>
                        </Row>
                    </>
                )}
            </Modal >
            <Modal
                open={isModalVisible2}
                style={{
                    minWidth: 300,
                    minHeight: 800,
                }}
                footer={null}
                onCancel={handleCancel2}
            >
                <Form layout="vertical" onFinish={onFinish} form={form} >
                    <p style={{ fontSize: 16, fontWeight: 600, marginTop: 30 }}>Add Educational Content for Invisalign</p>

                    <Form.Item
                        label="Content Name"
                        name="contentName"
                        rules={[{ required: true, message: 'Please enter the content name!' }]}
                    >
                        <Input
                            style={{ height: 39, borderRadius: 8, border: '1px solid #6B43B5' }}
                            placeholder="Enter Name for Content"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Content Description"
                        name="contentDescription"
                        rules={[{ required: true, message: 'Please enter the content description!' }]}
                    >
                        <Input
                            style={{ height: 74, borderRadius: 8 }}
                            placeholder="Write Content Description..."
                            rows={4}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Content"
                        name="contentUrl"
                        rules={[{ required: false, message: 'Please enter the content URL!' }]}
                    >
                        <Input
                            style={{ height: 39, borderRadius: 8, border: '1px solid #6B43B5' }}
                            placeholder="Enter Content URL"
                            onChange={(e) => setUrl(e.target.value)}
                            disabled={videoFile.length > 0}

                        />
                    </Form.Item>

                    <Form.Item>
                        <Col

                            style={{ padding: 0, border: '1px dashed #B7B7B7', borderWidth: 3, borderRadius: 8, display: 'inline-block', verticalAlign: 'top', marginLeft: 15, width: '95%' }}
                        >
                            <div className="clearfix" style={{ width: "100%" }}>
                                <Upload
                                    beforeUpload={() => false}
                                    showUploadList={false}
                                    // fileList={toFileList(imageFile)}
                                    onChange={handleUploadChange2}
                                    disabled={!!url}
                                >
                                    <label
                                        className='formLabel'
                                        style={{
                                            color: "gray",
                                            backgroundColor: "none",
                                            display: "flex",
                                            height: "81px",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: '8px',
                                            cursor: "pointer",
                                            maxWidth: "250px",
                                            minWidth: "unset",
                                            padding: "15px",
                                            flexDirection: 'column',
                                            fontSize: 14,
                                            marginLeft: "40%"
                                        }}
                                    >
                                        <div style={{ top: -15, position: 'relative' }}>
                                            <img src={add} alt='' style={{}} />
                                        </div>
                                        <div style={{ color: '#B7B7B7', fontSize: 12, marginBottom: 5, width: '100%' }}>
                                            Drag and drop or <span style={{ color: '#6B43B5' }}>Browse</span> your files
                                        </div>
                                    </label>
                                </Upload>
                            </div>
                        </Col>
                    </Form.Item>
                    <Row justify='end' style={{ marginTop: 35 }}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" onClick={() => { postEducational() }} style={{ width: 139, height: 38, fontSize: 16 }}>
                                Add
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </Modal>

        </>
    );
};

export default TreatmentCardStep2;
