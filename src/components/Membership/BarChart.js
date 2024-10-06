import React from 'react';
import ReactApexChart from 'react-apexcharts';
const BarChart = () => {
  const series = [
    {
      data: [63, 72, 50, 40, 80, 42, 53, 45, 90, 30, 67, 73, 69]
    }
  ];

  const options = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false
      },
      foreColor: '#8C8C8C'
    },
    grid: {
      yaxis: {
        lines: {
          show: false
        }
      },
      padding: {
        right: -15
      }
    },
    axisTicks: {
      show: false,
     
  },
  axisBorder: {
    show: false,
  },
  xaxis: {
    labels:{
      show: false
    },
    axisBorder: {
      show: false
    },
  },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadiusApplication: 'around',
        borderRadiusWhenStacked: 'last',
        columnWidth: 10,
        borderRadius: 4,

      }
    },
    colors: ['#6B43B5'],
    dataLabels: {
      enabled: false,
    },

    stroke: {
      width: 0
    },

    yaxis: {
      show: true
    },
    fill: {
      opacity: 1
    },
    legend: {
      show: false,
      floating: false,
      position: 'top',
      labels: {
        colors: ['#040404', '#8C8C8C']
      },
      markers: {
        width: 12,
        height: 12,
        radius: 12
      }
    }
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={200} />
    </div>
  );
};

export default BarChart;
