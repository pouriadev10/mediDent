import React from 'react';
import "./componentStyle.css";

const BlueCard = ({ name, value, icon }) => {

    return (
        <React.Fragment>
            <div className='blueCardMain'>
                <div className='circle'>
                    <img className='icon-center' src={icon} alt=''/>    
                </div>
                <div style={{marginLeft: 10}}>
                    <div className='blueCardMainName'>{name}</div>
                    <div className='blueCardMainValue'>{value}</div>
                </div>
            </div>

        </React.Fragment>
    )
}
export default BlueCard;