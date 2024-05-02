import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import OrgTable from './OrgTable'
import FundingChart from './FundingChart'
import FundingTable from './FundingTable'

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
        console.log('Orgs fetched:', orgData.results.hits.length)
        console.log('Fundings fetched:', fundingData.results.hits.length)
        setOrgs(orgData.results.hits)
        setFundings(fundingData.results.hits)
      })
      .catch((error) => console.error('📛Error fetching data📛:', error))
      .finally(() => setIsLoading(false))
  }, [])

  const fundingChartData = fundings.map((funding) => ({
    name: funding.company_name || 'Unknown',
    value: Number(funding.raised_amount_usd) || 0,
  }))

  const generateColumns = (rows) => {
    if (rows.length > 0) {
      const allowedKeys = [
        'uuid',
        'company_name',
        'homepage_url',
        'country_code',
        'city',
        'short_description',
        'description',
        'funding_rounds',
        'funding_total_usd',
        'employee_count',
      ]

      // Get the keys from the first object in rows
      const keys = Object.keys(rows[0]).filter((key) =>
        allowedKeys.includes(key),
      )

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
    return []
  }

  const columns = generateColumns(orgs)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        gap: 2,
        minHeight: '100vh',
        bgcolor: 'transparent',
        backgroundImage: 'linear-gradient(to right, #e0f7fa, #80d8ff)',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textShadow: '1px 1px 2px gray',
          textAlign: 'center',
          width: '100%',
        }}
      >
        Organizational Funding Dashboard
      </Typography>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <OrgTable rows={orgs} columns={columns} />
          <FundingChart series={fundingChartData} />
          <FundingTable data={fundings} />
        </>
      )}
    </Box>
  )
}
