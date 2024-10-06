import React, { useEffect } from 'react';
import { Progress } from 'antd';

const StepWidthProgress = ({ percent, steps, stroke }) => {
  const widthMapping = {
    1: 515, 
    2: 249.5, 
    3: 163,
    4: 119.25,
    5: 92,
    6: 75, 
    7: 62,
    8: 53.6,
    9: 46.3,
    10: 40.5, 
    11: 25.7,
    12: 31.75  
  };

  const progressId = `progress-${Math.random().toString(36).substr(2, 9)}`;
  const stepWidth = widthMapping[steps]; 

  useEffect(() => {
    const styleSheet = document.createElement('style');
    document.head.appendChild(styleSheet);
    const cssRule = `
      #${progressId} .ant-progress-steps-item {
        flex-grow: 0 !important;
        flex-shrink: 0 !important;
        width : ${stepWidth}px !important;
        border-radius: 100px;
      }
    `;
    styleSheet.textContent = cssRule;

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, [stepWidth, progressId]);

  const containerStyle = {
    width: `${stepWidth}px`, 
  };

  return (
    <div id={progressId} style={containerStyle}>
      <Progress
        percent={Math.min(percent, 100)}
        steps={steps}
        size="large"
        strokeColor={stroke}
      />
    </div>
  );
};

export default StepWidthProgress;
