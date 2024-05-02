import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Typography, Button } from '@mui/material'
import { Paper, Box } from '@mui/material'
import CountUp from 'react-countup'

const columns = [
  { field: 'company_name', headerName: 'Company Name', width: 200 },
  { field: 'investment_type', headerName: 'Investment Type', width: 200 },
  { field: 'announced_on', headerName: 'Announced On', width: 200 },
  { field: 'raised_amount_usd', headerName: 'Raised Amount (USD)', width: 200 },
]
const FundingTable = ({ data }) => {
  const [showCalculations, setShowCalculations] = useState(false)

  const totalFundingRounds = data.length

  const totalRaised = data.reduce(
    (sum, row) => sum + Number(row.raised_amount_usd),
    0,
  )
  const averageRaised = totalRaised / totalFundingRounds
  return (
    <Paper sx={{ p: 2, mb: 2, flex: 1 }}>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
          Funding Rounds
        </Typography>
        <Button onClick={() => setShowCalculations(!showCalculations)}>
          {showCalculations ? 'Hide Calculations' : 'Show Calculations'}
        </Button>
        {showCalculations && (
          <>
            <Typography variant="body1" gutterBottom>
              Total Funding Rounds:{' '}
              <CountUp end={totalFundingRounds} duration={2.75} />
            </Typography>
            <Typography variant="body1" gutterBottom>
              Total Raised (USD): <CountUp end={totalRaised} duration={2.75} />
            </Typography>
            <Typography variant="body1" gutterBottom>
              Average Raised per Round (USD):{' '}
              <CountUp end={averageRaised} duration={2.75} />
            </Typography>
          </>
        )}
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.funding_round_uuid}
          pagination
          disableColumnFilter={false}
          disableColumnMenu={false}
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
      </Box>
    </Paper>
  )
}

export default FundingTable
