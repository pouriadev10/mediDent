import React from 'react';
import { Dropdown, Menu, Button, Tag } from 'antd';
import { DownOutlined } from '@ant-design/icons';


// ${item.selected_criteria_type.name}:

const PatientDetailsDropdown = ({ identification, location, treatmentPlans, healthScore, number }) => {
    const types = {
        identification: ['first_name', 'last_name', 'date_joined', 'age_range', 'date_of_birth', 'gender'],
        location: ['country', 'city', 'zip_code'],
        treatmentPlans: ['treatment_plan'],
        healthScore: ['health_score']
    };

    const createDropdown = (data, title, types, color) => {
        const menu = (
            <Menu style={{width: 350}}>
                <Menu.Item>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10  }}>
                        {data.filter(item => item.selected_criteria_type && types.includes(item.selected_criteria_type.name))
                            .map((item, index) => (
                                <Tag key={`${title}-${index}`} color={color} style={{background: '#EEEDFA', color: '#6B43B5', borderRadius: 50}}>
                                    {item.extractedValues}
                                </Tag>
                            ))
                        }
                    </div>
                </Menu.Item>
            </Menu>
        );

        return (
            <Dropdown overlay={menu} trigger={['click']}>
                <Button style={{height: 25, display: 'flex', alignItems: 'center', background: '#EEEDFA', color: '#6B43B5'}}>
                 {number} Filters<DownOutlined />
                </Button>
            </Dropdown>
        );
    };

    return (
        <div>
            {identification && (
                <div style={{ marginBottom: '10px' }}>
                    {createDropdown(identification, 'Identification', types.identification, '#EEEDFA')}
                </div>
            )}
            {location && (
                <div style={{ marginBottom: '10px' }}>
                    {createDropdown(location, 'Location', types.location, '#EEEDFA')}
                </div>
            )}
            {treatmentPlans && (
                <div style={{ marginBottom: '10px' }}>
                    {createDropdown(treatmentPlans, 'Treatment Plans', types.treatmentPlans, '#EEEDFA')}
                </div>
            )}
            {healthScore && (
                <div>
                    {createDropdown(healthScore, 'Health Score', types.healthScore, '#EEEDFA')}
                </div>
            )}
        </div>
    );
};

export default PatientDetailsDropdown;
