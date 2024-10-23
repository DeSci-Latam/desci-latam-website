import React from 'react';
import ReactECharts from 'echarts-for-react';

interface EChartsProps {
  option?: any;
  style?: React.CSSProperties;
}

export const EChartsComponent: React.FC<EChartsProps> = (props) => {
  const { style = { height: '400px', width: '100%' } } = props || {};
  const option = props?.option ?? {};

  if (typeof option !== 'object' || Object.keys(option).length === 0) {
    return <p>No se proporcionaron opciones válidas para el gráfico.</p>;
  }

  return <ReactECharts option={option} style={style} />;
};