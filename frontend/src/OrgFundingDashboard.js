import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import OrgTable from './OrgTable'
import FundingChart from './FundingChart'

export default function OrgFundingDashboard() {
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

  const generateColumns = (rows) => {
    // Check if rows is not empty
    if (rows.length > 0) {
      // Get the keys from the first object in rows
      const keys = Object.keys(rows[0])

      // Map the keys to an array of column objects
      const columns = keys.map((key) => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        width: 200,
      }))

      // Filter out columns that don't have any non-empty values
      return columns.filter((column) =>
        rows.some(
          (row) => row[column.field] && row[column.field].trim() !== '',
        ),
      )
    }
    // If rows is empty, return an empty array
    return []
  }

  const columns = generateColumns(orgs)

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
          <OrgTable rows={orgs} columns={columns} />
          <FundingChart series={fundingSeries} xAxis={fundingXAxis} />
        </>
      )}
    </Box>
  )
}
