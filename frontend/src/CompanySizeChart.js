import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Paper, Typography } from '@mui/material'

ChartJS.register(BarElement, Tooltip, Legend, LinearScale, CategoryScale)

const CompanySizeChart = ({ data }) => {
  // Count the number of companies in each employee count category
  const counts = data.reduce((acc, company) => {
    const category = company.employee_count
    acc[category] = (acc[category] || 0) + 1
    return acc
  }, {})

  // Prepare data for Chart.js
  const chartData = {
    labels: Object.keys(counts),
    datasets: [
      {
        label: 'Number of Companies',
        data: Object.values(counts),
        backgroundColor: Object.keys(counts).map(
          () =>
            `rgba(${100 + Math.floor(Math.random() * 156)}, ${100 + Math.floor(Math.random() * 156)}, ${100 + Math.floor(Math.random() * 156)}, 0.8)`,
        ),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <Paper sx={{ p: '1.25rem', height: '50vh' }}>
      <Typography variant="h6" gutterBottom>
        Company Size Chart
      </Typography>
      <div style={{ height: '100%', width: '100%' }}>
        <Bar data={chartData} options={options} />
      </div>
    </Paper>
  )
}

export default CompanySizeChart
