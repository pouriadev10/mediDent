import React from 'react';
import Chart from 'react-apexcharts';

const options = {
    chart: {
        type: 'radialBar',
        height: 350,
    },
    plotOptions: {
        radialBar: {
            hollow: {
                size: '70%',
            },
            dataLabels: {
                name: {
                    offsetY: -10,
                    fontSize: '22px',
                },
                value: {
                    fontSize: '16px',
                    offsetY: 10,
                },
                total: {
                    show: true,
                    label: 'Total',
                    formatter: function (w) {
                        return 249;
                    },
                },
            },
        },
    },
    series: [44, 55, 67, 83],
    labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
};

const data = {
    series: [44, 55, 67, 83],
};

const RadialChart = () => {
    return (
        <Chart
            options={options}
            series={data.series}
            type="radialBar"
            height={350}
        />
    );
};

export default RadialChart;