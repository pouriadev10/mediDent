
import React from 'react';
import Chart from 'react-apexcharts';

const BarChart = ({ chartdata = [], categories = [], rotate, height }) => {
  if (!chartdata || !categories || chartdata.length === 0 || categories.length === 0) {
    return <div>No data available for the chart</div>;
  }

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
    },
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    xaxis: {
      categories: categories,
      labels: {
        show: true,
        rotate: rotate,
        rotateAlways: true,
        offsetX: 5,
        offsetY: 15,
        style: {
          fontSize: '13px',  // Adjust this value as needed
        },
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
      <Chart options={options} series={[{ data: chartdata }]} type="bar" height={height} />
    </div>
  );
};

export default BarChart;
