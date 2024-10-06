import React from 'react';
import { Card, Checkbox } from 'antd';
import '../style.css'; // Make sure to import your custom CSS
import rec from '../../../assets/img/Rectangle 773.png';

const CustomCard = () => {
    return (
        <Card
        // className={`custom-card ${isChecked ? 'selected-card' : 'not-selected-card'}`}
            bordered={false}>
            <img src={rec} alt='' className='image-pay' />
            <Checkbox className="custom-checkbox" />
            <div className="card-content">
                <div className="card-header">
                    <span className="card-title">Single</span>
                </div>
                <div className="card-amount">
                    <p>Amount $255.00</p>
                </div>
                <div className="card-total">
                    <p>Total $255.00</p>
                </div>
            </div>
        </Card>
    );
};

export default CustomCard;