import { Calendar, Switch } from 'antd';
import React, { useState } from 'react';
import moment from 'moment';

const CustomCalendar = () => {
    const [showFirstHalf, setShowFirstHalf] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentView, setCurrentView] = useState({
        month: moment().month(),
        year: moment().year()
    });

    const handleSwitchChange = (checked) => {
        setShowFirstHalf(checked);
    };

    const dateFullCellRender = (value) => {
        const isCurrentMonth = value.month() === currentView.month && value.year() === currentView.year;
        const isSelectedDay = selectedDate && value.isSame(selectedDate, 'day');
        const isToday = value.isSame(moment(), 'day');

        let cellClassName = 'custom-date';
        if (!isCurrentMonth) {
            cellClassName += ' non-display';
        } else if (showFirstHalf ? value.date() > 14 : value.date() <= 14) {
            cellClassName += ' non-display';
        }
        if (isSelectedDay) {
            cellClassName += ' selected';
        }
        if (isToday) {
            cellClassName += ' today';
        }

        return (
            <div className='centerize-flex'>
                <div className={cellClassName}>
                    {value.date()}
                </div>
            </div>

        );
    };

    function onPanelChange(value, mode) {
        setCurrentView({
            month: value.month(),
            year: value.year()
        });
        console.log(value.format('MMMM YYYY'), mode);
    }

    const handleSelect = value => {
        console.log(value);
        setSelectedDate(value);
    };

    return (
        <>
            <Switch checkedChildren="1-14" unCheckedChildren="15-end" checked={showFirstHalf} onChange={handleSwitchChange} />
            <Calendar
                onSelect={handleSelect}
                dateFullCellRender={dateFullCellRender}
                fullscreen={false}
                onPanelChange={onPanelChange}
            />
            {selectedDate &&
                <div style={{ marginTop: 20 }}>
                    Selected Date: {selectedDate.format('MMMM Do, YYYY')}
                </div>
            }
        </>
    );
};

export default CustomCalendar;