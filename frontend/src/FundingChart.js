import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart'
import { Paper, Typography } from '@mui/material'

const FundingChart = ({ series, xAxis }) => {
  return (
    <Paper sx={{ p: 2, flex: 1 }}>
      <Typography variant="h6" gutterBottom>
        Fundings
      </Typography>
      {series[0].data.length > 0 ? (
        <BarChart
          series={series}
          height={290}
          xAxis={xAxis}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
      ) : (
        <Typography>No funding data available.</Typography>
      )}
    </Paper>
  )
}

export default FundingChart
