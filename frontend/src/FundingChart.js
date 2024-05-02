import React from 'react'
import { Paper, Typography } from '@mui/material'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

// Register the required elements
ChartJS.register(ArcElement, Tooltip, Legend)

const FundingChart = ({ series }) => {
  console.log('series:', series)

  if (!Array.isArray(series)) {
    return <Typography>Loading...</Typography>
  }

  const generateColors = (numColors) => {
    const colors = []
    for (let i = 0; i < numColors; i++) {
      const hue = ((i * 360) / numColors) % 360
      const lightness = 50 + ((i * 20) % 50)
      colors.push(`hsl(${hue}, 70%, ${lightness}%)`)
    }
    return colors
  }

  const data = series.map((item) => ({
    label: item.name,
    value: item.value,
  }))

  // Prepare data for Chart.js
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: generateColors(data.length),
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
    },
    maintainAspectRatio: false,
  }

  return (
    <Paper sx={{ p: '1.25rem', flex: 1, width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Fundings
      </Typography>
      {series.length > 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ height: '30rem', width: '30rem' }}>
            <Pie data={chartData} options={options} />
          </div>
        </div>
      ) : (
        <Typography>No funding data available.</Typography>
      )}
    </Paper>
  )
}

export default FundingChart
