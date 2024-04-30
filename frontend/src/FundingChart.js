import React from 'react'
import { Paper, Typography } from '@mui/material'
import { PieChart } from '@mui/x-charts'

const FundingChart = ({ series }) => {
  console.log('series:', series)

  if (!Array.isArray(series)) {
    return <Typography>Loading...</Typography>
  }

  const data = series.map((item) => ({
    label: item.name,
    value: item.value,
  }))

  return (
    <Paper sx={{ p: '1.25rem', flex: 1, width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Fundings
      </Typography>
      {series.length > 0 ? (
        <PieChart
          height={300}
          sx={{
            fontFamily:
              'Univers, HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif',
            fontSize: '1rem',
            fontStyle: 'normal',
            fontWeight: '300',
          }}
          series={[
            {
              arcLabel: (item) => `${item.label} (${item.value})`,
              arcLabelMinAngle: 45,
              data,
            },
          ]}
        />
      ) : (
        <Typography>No funding data available.</Typography>
      )}
    </Paper>
  )
}

export default FundingChart
