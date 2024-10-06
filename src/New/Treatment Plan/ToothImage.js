import React, { useState } from 'react';
import LowerTooth from "../assets/img/upper-tooth.png";
import UpperTooth from "../assets/img/lower-tooth.png";
import toothIcon from "../assets/icon/teeth.png"
import {
    Row,
    Col
} from "antd";

const ToothImage = () => {
    const [toothInfo, setToothInfo] = useState({ x: 0, y: 0, toothNumber: null });
    const [toothInfo1, setToothInfo1] = useState({ x: 0, y: 0, toothNumber: null });

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

    const handleClick2 = (e) => {
        const boundingRect = e.target.getBoundingClientRect();
        const x = e.clientX - boundingRect.left;
        const y = e.clientY - boundingRect.top;
        let toothNumber = null;

        if (x >= 18 && x <= 78 && y >= 13 && y <= 78) toothNumber = 17;
        else if (x >= 31 && x <= 94 && y >= 68 && y <= 126) toothNumber = 18;
        else if (x >= 43 && x <= 106 && y >= 127 && y <= 185) toothNumber = 19;
        else if (x >= 70 && x <= 121 && y >= 186 && y <= 224) toothNumber = 20;
        else if (x >= 82 && x <= 133 && y >= 225 && y <= 263) toothNumber = 21;
        else if (x >= 101 && x <= 144 && y >= 268 && y <= 300) toothNumber = 22;
        else if (x >= 136 && x <= 169 && y >= 290 && y <= 336) toothNumber = 23;
        else if (x >= 171 && x <= 204 && y >= 296 && y <= 342) toothNumber = 24;
        else if (x >= 206 && x <= 239 && y >= 294 && y <= 340) toothNumber = 25;
        else if (x >= 243 && x <= 270 && y >= 294 && y <= 333) toothNumber = 26;
        else if (x >= 257 && x <= 295 && y >= 262 && y <= 304) toothNumber = 27;
        else if (x >= 273 && x <= 319 && y >= 224 && y <= 261) toothNumber = 28;
        else if (x >= 288 && x <= 336 && y >= 185 && y <= 226) toothNumber = 29;
        else if (x >= 297 && x <= 362 && y >= 127 && y <= 185) toothNumber = 30;
        else if (x >= 306 && x <= 371 && y >= 64 && y <= 122) toothNumber = 31;
        else if (x >= 316 && x <= 376 && y >= 15 && y <= 65) toothNumber = 32;

        setToothInfo1({ x, y, toothNumber });
    };

    return (
        <Row type="flex" justify={"center"} className='mt5p'>
            <div style={{ position: 'relative' }}>
                <img
                    src={LowerTooth}
                    alt="Lower Teeth"
                    onClick={handleClick}
                    style={{ maxWidth: '100%', display: 'block' }}
                />

                <span className='text-on-tooths'>
                    Upper
                </span>

                {toothInfo.toothNumber && (
                    <div style={{
                        position: 'absolute',
                        left: toothInfo.toothNumber < 8 ? `${toothInfo.x - 200}px` : toothInfo.toothNumber < 12 ? `${toothInfo.x - 300}px` : `${toothInfo.x - 400}px`,
                        top: `${toothInfo.y}px`,
                        width: toothInfo.toothNumber < 8 ? '200px' : toothInfo.toothNumber < 12 ? "300px" : "400px",
                        height: '2px',
                        background: "purple"
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
            <div style={{ position: 'relative' }}>
                <img
                    src={UpperTooth}
                    alt="Upper Teeth"
                    onClick={handleClick2}
                    style={{ maxWidth: '100%', display: 'block' }}
                />
                <span className='text-on-tooths2'>
                    Lower
                </span>
                {toothInfo1.toothNumber && (
                    <div style={{
                        position: 'absolute',
                        left: `${toothInfo1.x}px`,
                        top: `${toothInfo1.y}px`,
                        width: toothInfo1.toothNumber <= 18 ? "400px" : toothInfo1.toothNumber > 22 ? "150px" : "300px",
                        height: '2px',
                        background: "purple"
                    }} >
                        <div style={{
                            height: '40px',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'end',
                            alignItems: 'center',
                        }}>
                            <div>
                                <img src={toothIcon} alt="tooth" style={{ maxWidth: '100%', maxHeight: '100%', marginBottom: "35px" }} />
                                <span
                                    style={{
                                        position: "absolute",
                                        right: "-120px",
                                        top: "-10px",
                                        fontWeight: "bold",
                                        fontSize: "16px"
                                    }}
                                >Crown Tooth 15 </span>
                            </div>


                        </div>
                    </div>
                )}
            </div>

        </Row >
    );
};

export default ToothImage;