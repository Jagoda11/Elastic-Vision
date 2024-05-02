import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Paper, Typography, Button } from '@mui/material'
import CountUp from 'react-countup'

const OrgTable = ({ rows, columns }) => {
  const [showCalculations, setShowCalculations] = useState(false)

  const totalOrganizations = rows.length

  // Calculate the number of organizations with known and unknown employee counts
  const knownEmployeeCount = rows.filter(
    (row) => row.employee_count !== 'unknown',
  ).length
  const unknownEmployeeCount = rows.filter(
    (row) => row.employee_count === 'unknown',
  ).length
  // Calculate the total number of funding rounds
  const totalFundingRounds = rows.reduce(
    (sum, row) => sum + Number(row.funding_rounds),
    0,
  )
  return (
    <Paper sx={{ p: 2, mb: 2, flex: 1 }}>
      <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
        Organizations
      </Typography>

      <Button onClick={() => setShowCalculations(!showCalculations)}>
        {showCalculations ? 'Hide Calculations' : 'Show Calculations'}
      </Button>
      {showCalculations && (
        <>
          <Typography variant="body1" gutterBottom>
            Total Organizations:{' '}
            <CountUp end={totalOrganizations} duration={2.75} />
          </Typography>
          <Typography variant="body1" gutterBottom>
            Organizations with Known Employee Count:{' '}
            <CountUp end={knownEmployeeCount} duration={2.75} />
          </Typography>
          <Typography variant="body1" gutterBottom>
            Organizations with Unknown Employee Count:{' '}
            <CountUp end={unknownEmployeeCount} duration={2.75} />
          </Typography>
          <Typography variant="body1" gutterBottom>
            Total Funding Rounds:{' '}
            <CountUp end={totalFundingRounds} duration={2.75} />
          </Typography>
        </>
      )}
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        pagination
        getRowId={(row) => row.uuid}
        sx={{
          backgroundColor: 'white',
          color: '#1e1e1e',
          fontFamily:
            'Univers, HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif',
          fontSize: '1rem',
          fontStyle: 'normal',
          fontWeight: '300',
          lineHeight: '1.375',
          boxSizing: 'border-box',
          padding: '0 0.75rem',
          height: '25rem',
        }}
      />
    </Paper>
  )
}

export default OrgTable
