import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Paper, Typography } from '@mui/material'

const OrgTable = ({ rows, columns }) => {
  console.log('OrgTable rows:', rows)
  return (
    <Paper sx={{ p: 2, mb: 2, flex: 1 }}>
      <Typography variant="h6" gutterBottom>
        Organizations
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        getRowId={(row) => row.uuid}
        style={{ height: 400 }}
      />
    </Paper>
  )
}

export default OrgTable
