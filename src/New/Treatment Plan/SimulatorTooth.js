import React, { useState } from 'react';
import LowerTooth from "../assets/img/upper-tooth.png";
import UpperTooth from "../assets/img/lower-tooth.png";
import NewToothImage from "../assets/img/NewToothImage.png";
import toothIcon from "../assets/icon/teeth.png"
import {
    Row,
    Col,
    Typography
} from "antd";


const ToothImage = () => {
    const [toothInfo, setToothInfo] = useState({ x: 0, y: 0, toothNumber: null });

    const handleClick = (e) => {
        const boundingRect = e.target.getBoundingClientRect();
        const x = e.clientX - boundingRect.left;
        const y = e.clientY - boundingRect.top;
        let toothNumber = null;

        if (x >= 17 && x <= 80 && y >= 292 && y <= 345) toothNumber = 1;
        else if (x >= 22 && x <= 95 && y >= 243 && y <= 296) toothNumber = 2;
        else if (x >= 34 && x <= 109 && y >= 194 && y <= 241) toothNumber = 3;
        else if (x >= 50 && x <= 110 && y >= 157 && y <= 196) toothNumber = 4;
        else if (x >= 74 && x <= 127 && y >= 117 && y <= 158) toothNumber = 5;
        else if (x >= 96 && x <= 139 && y >= 79 && y <= 121) toothNumber = 6;
        else if (x >= 130 && x <= 166 && y >= 53 && y <= 93) toothNumber = 7;
        else if (x >= 162 && x <= 210 && y >= 32 && y <= 82) toothNumber = 8;
        else if (x >= 209 && x <= 257 && y >= 34 && y <= 84) toothNumber = 9;
        else if (x >= 258 && x <= 289 && y >= 51 && y <= 91) toothNumber = 10;
        else if (x >= 273 && x <= 320 && y >= 77 && y <= 123) toothNumber = 11;
        else if (x >= 292 && x <= 346 && y >= 114 && y <= 155) toothNumber = 12;
        else if (x >= 307 && x <= 361 && y >= 155 && y <= 196) toothNumber = 13;
        else if (x >= 322 && x <= 377 && y >= 197 && y <= 248) toothNumber = 14;
        else if (x >= 335 && x <= 395 && y >= 243 && y <= 298) toothNumber = 15;
        else if (x >= 342 && x <= 401 && y >= 298 && y <= 341) toothNumber = 16;

        setToothInfo({ x, y, toothNumber });
    };


    return (
        <>
            {/* <Typography style={{ fontWeight: 500, fontSize: '16px' }}>
                Treatment Simulator
            </Typography> */}
            <Row type="flex" justify={"center"} className='mt5'>

                <div style={{ position: 'relative' }}>
                    <img
                        src={NewToothImage}
                        alt="Teeth"
                        onClick={handleClick}
                        style={{ width: '300px', height: '360px' }}
                    />
                    {toothInfo.toothNumber && (
                        <div style={{
                            position: 'absolute',
                            left: toothInfo.toothNumber < 8 ? `${toothInfo.x - 200}px` : toothInfo.toothNumber < 12 ? `${toothInfo.x - 300}px` : `${toothInfo.x - 400}px`,
                            top: `${toothInfo.y}px`,
                            width: toothInfo.toothNumber < 8 ? '200px' : toothInfo.toothNumber < 12 ? "300px" : "400px",
                            height: '2px',
                            background: "#6B43B5"
                        }} >
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <img src={toothIcon} alt="tooth" style={{ maxWidth: '100%', maxHeight: '100%', marginBottom: "35px" }} />
                            </div>
                        </div>
                    )}
                </div>



            </Row >
        </>

    );
};

export default ToothImage;