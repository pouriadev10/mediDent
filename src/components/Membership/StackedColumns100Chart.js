import React from 'react';
import Chart from 'react-apexcharts';

const options = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      stackType: '100%',
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 1,
      colors: ['#fff'],
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yaxis: {
      title: {
        text: 'Percent',
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + '%';
        },
      },
    },
  };
  
  const data = {
    series: [
        {
          name: 'Preventative',
          data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)),
        },
        {
          name: 'Other',
          data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)),
        },
      ],
  };

  const StackedColumns100Chart = () => {
    return (
      <Chart
        options={options}
        series={data.series}
        type="bar"
        height={350}
      />
    );
  };
  
  export default StackedColumns100Chart;