import React from 'react'
import { TWinLossesDrawsChart } from './types/TWinLossesDrawsChart'
import { PieChart } from 'react-minimal-pie-chart'
import { PieChartData } from './types/PieChartData'

export function WinLossesDrawsChart({ label, values }: TWinLossesDrawsChart): JSX.Element {
  const hasPositiveValue = values.some((dataEntry: PieChartData) => dataEntry.value > 0)
  return (
    <div className={'chart-container'} style={{ display: hasPositiveValue ? 'flex' : 'none' }}>
      <div>
        <h3 className={'chart-container-title'}>{label}</h3>
        <PieChart
          data={values}
          animate={true}
          animationDuration={500}
          animationEasing='ease-out'
          label={({ dataEntry }: { dataEntry: PieChartData }) => `${dataEntry.title}: ${dataEntry.value}`}
          labelPosition={50}
          lengthAngle={360}
          lineWidth={50}
          paddingAngle={0}
          radius={50}
          rounded={false}
          startAngle={0}
          viewBoxSize={[100, 100]}
          labelStyle={{ fontSize: '5px' }}
        /></div>
    </div>
  )
}
