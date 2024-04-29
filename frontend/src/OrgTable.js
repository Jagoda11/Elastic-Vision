import React, { useState, useEffect } from 'react'
import { BarChart } from '@mui/x-charts/BarChart'
import { DataGrid } from '@mui/x-data-grid'

export default function OrgTable() {
  const [isLoading, setIsLoading] = useState(true)
  // eslint-disable-next-line no-unused-vars
  const [orgs, setOrgs] = useState([])
  const [fundings, setFundings] = useState([])

  useEffect(() => {
    const urlOrgs = new URL('http://localhost:8080/orgs')
    urlOrgs.search = new URLSearchParams({ limit: 20, offset: 0 })
    const fetchOrgs = fetch(urlOrgs).then((res) => res.json())

    const urlFunding = new URL('http://localhost:8080/fundings')
    urlFunding.search = new URLSearchParams({ limit: 20, offset: 0 })
    const fetchFunding = fetch(urlFunding).then((res) => res.json())

    Promise.all([fetchOrgs, fetchFunding])
      .then(([orgData, fundingData]) => {
        setOrgs(orgData.results.hits)
        setFundings(fundingData.results.hits)
      })
      .catch((error) => {
        console.error('📛Error fetching data📛:', error)
      })
      .finally(() => setIsLoading(false))
  }, [])

  console.log('🔵🔵🔵', orgs, '🔵🔵🔵')

  const orgChartData = orgs.map((org) => ({
    label: org?.company_name || 'Unknown',
    value: isNaN(org?.employee_count) ? 0 : org?.employee_count, // Use employee_count for value
  }))

  const fundingChartData = fundings.map((funding) => ({
    label: funding?.company_name || 'Unknown',
    value: isNaN(parseFloat(funding?.raised_amount_usd))
      ? 0
      : parseFloat(funding?.raised_amount_usd), // Use raised_amount_usd for value
  }))

  const fundingSeries = [{ data: fundingChartData.map((item) => item.value) }]

  const fundingXAxis = [
    { data: fundingChartData.map((item) => item.label), scaleType: 'band' },
  ]

  // Define the columns for the DataGrid
  const columns = [
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

  return (
    <div style={{ height: 400, width: '100%' }}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <DataGrid
            rows={orgs}
            columns={columns}
            pageSize={5}
            getRowId={(row) => row.uuid}
          />
          <BarChart
            series={fundingSeries}
            height={290}
            xAxis={fundingXAxis}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
        </>
      )}
    </div>
  )
}
