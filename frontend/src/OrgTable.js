import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Paper, Typography } from '@mui/material'

const OrgTable = ({ rows, columns }) => {
  return (
    <Paper sx={{ p: 2, mb: 2, flex: 1 }}>
      <Typography variant="h6" gutterBottom>
        Organizations
      </Typography>
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
