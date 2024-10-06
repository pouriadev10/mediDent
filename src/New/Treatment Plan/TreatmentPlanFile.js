import { Table, Typography, ConfigProvider } from 'antd';
import React, { useState, useEffect } from 'react';
import {
    Row
} from "antd"
import mkv from '../../assets/icons/mkv.svg'
import mp4 from '../../assets/icons/mp4.svg'
import power from '../../assets/icons/power.svg'
import pdf from '../../assets/icons/pdf.svg'
import excel from '../../assets/icons/excel.svg'
import word from '../../assets/icons/word.svg'
import downloadIcon from "../assets/icon/download-icon.png"
import folder from '../assets/icon/folder-open.svg'
import config from '../../config';

const { Text } = Typography;

const DownloadImage = (props) => {

    const getImageSrc = (url) => {
        const extension = url.split('.').pop().toLowerCase(); // Extract the file extension from the URL
        switch (extension) {
            case 'pdf':
                return pdf; 
            case 'doc':
                return word; 
            case 'docx':
                return word; 
            case 'xlsx':
                return excel; 
            case 'ppt':
                return power;
            case 'pptx':
                return power;
            case 'rar':
            case 'aspx':
            case 'mp4':
                return mp4;
            case 'mkv':
                return mkv;
            case 'zip':
                return folder; // Provide path to the PowerPoint icon
            default:
                return url; // Return the original URL for other file types
        }
    };
    return (
        <div className='imageFileContainer' >
            <img
                width={200}
                height={130}
                style={{ borderRadius: "8px", border: "1px solid #6B43B5" }}
                alt="file"
                src={getImageSrc(props.src)}

                className={"mt10 mr10"}
            />
            <div className='downloadIconContainer'
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: "5"
                }}
            >
                <a href={props.src} download>
                    <img
                        width={15}
                        height={15}
                        src={downloadIcon}
                        alt="download"
                    />
                </a>
            </div>

        </div>
    )
}

const TreatmentPlanFile = (props) => {

    const [data, setData] = useState(null)

    useEffect(() => {
        if (props.data) {
            setData(props.data)
        }
    }, [props])

    return (
        <ConfigProvider

            theme={{
                token: {
                    colorPrimary: "#983cfc",
                    controlItemBgHover: "#c293ff",
                    colorLink: '#983cfc',
                    borderRadius: "4px"
                },
                components: {

                    Table: {
                        borderRadius: "8px",
                        borderColor: "#eee",
                    },
                },
            }}
        >
            <Typography style={{ fontWeight: 600, fontSize: '16px' }}>
                Files
            </Typography>
            <br />
            <Row>
                {data && data.length > 0 && data.map((item) => (
                    item.image_files && item.image_files.length > 0 && item.image_files.map((img, index) => (
                        <DownloadImage key={index} src={img.image} />
                    ))
                ))}
            </Row>
        </ConfigProvider>
    );
}

export default TreatmentPlanFile;