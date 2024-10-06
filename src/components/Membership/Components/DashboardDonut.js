import React from 'react';
import Chart from 'react-apexcharts';

const MembershipChart = ({ series = [], labels = [] }) => {
  if (!Array.isArray(series) || series.length === 0 || !Array.isArray(labels) || labels.length === 0) {
    return <div>No data available for the chart</div>;
  }

  const chartOptions = {
    chart: {
      type: 'donut',
    },
    labels: labels,
    legend: {
      show: false, 
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "%";
        }
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '85%', 
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '22px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              color: undefined,
              offsetY: -10
            },
            value: {
              show: false,
              fontSize: '16px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              color: undefined,
              offsetY: 16,
          
            },
            total: {
              show: true,
              showAlways: false,
              label: 'Membership Plans',
              fontSize: '18px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              color: '#979797',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => {
                  return a + b;
                }, 0) +  '\nMembership\nPlans'}
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#4D3280', '#9176DC', '#C9C1F1', '#EEEDFA'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };


  return (
    <div>
      <Chart options={chartOptions} series={series} type="donut" height={333} />
    </div>
  );
};

export default MembershipChart;
