// the starting point, before splitting up the components
import React, { useState, useEffect } from 'react'
import { BarChart } from '@mui/x-charts/BarChart'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Paper, Typography } from '@mui/material'

export default function OrgTable() {
  const [isLoading, setIsLoading] = useState(true)
  const [orgs, setOrgs] = useState([])
  const [fundings, setFundings] = useState([])

  useEffect(() => {
    const urlOrgs = new URL('http://localhost:8080/orgs')
    urlOrgs.search = new URLSearchParams({ limit: 20, offset: 0 })
    const urlFunding = new URL('http://localhost:8080/fundings')
    urlFunding.search = new URLSearchParams({ limit: 20, offset: 0 })

    Promise.all([
      fetch(urlOrgs).then((res) => res.json()),
      fetch(urlFunding).then((res) => res.json()),
    ])
      .then(([orgData, fundingData]) => {
        setOrgs(orgData.results.hits)
        setFundings(fundingData.results.hits)
      })
      .catch((error) => console.error('📛Error fetching data📛:', error))
      .finally(() => setIsLoading(false))
  }, [])

  const fundingChartData = fundings.map((funding) => ({
    label: funding.company_name || 'Unknown',
    value: parseFloat(funding.raised_amount_usd) || 0,
  }))

  const fundingSeries = [{ data: fundingChartData.map((item) => item.value) }]
  const fundingXAxis = [
    { data: fundingChartData.map((item) => item.label), scaleType: 'band' },
  ]

  const columnDefinitions = [
    { field: 'uuid', headerName: 'UUID', width: 200 },
    { field: 'company_name', headerName: 'Company Name', width: 200 },
    { field: 'homepage_url', headerName: 'Homepage URL', width: 200 },
    { field: 'country_code', headerName: 'Country Code', width: 150 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'short_description', headerName: 'Short Description', width: 300 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'funding_rounds', headerName: 'Funding Rounds', width: 150 },
    {
      field: 'funding_total_usd',
      headerName: 'Total Funding (USD)',
      width: 200,
    },
    { field: 'employee_count', headerName: 'Employee Count', width: 150 },
  ]
  const columns = columnDefinitions.filter((column) =>
    orgs.some((org) => org[column.field]),
  )

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        height: '100vh',
        bgcolor: 'background.default',
      }}
    >
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            Organizations
          </Typography>
          <Paper sx={{ p: 2, mb: 2, flex: 1 }}>
            <DataGrid
              rows={orgs}
              columns={columns}
              pageSize={5}
              getRowId={(row) => row.uuid}
            />
          </Paper>
          <Typography variant="h6" gutterBottom>
            Fundings
          </Typography>
          <Paper sx={{ p: 2, flex: 1 }}>
            {fundingSeries[0].data.length > 0 && (
              <BarChart
                series={fundingSeries}
                height={290}
                xAxis={fundingXAxis}
                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
              />
            )}
          </Paper>
        </>
      )}
    </Box>
  )
}
