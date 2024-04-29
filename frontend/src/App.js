import React from 'react'
import OrgTable from './OrgTable'

export default function App() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Company Data</h1>

      <p>
        We want you to{' '}
        <strong>
          explore and create a chart or graph of any aspect of the data.
        </strong>{' '}
        Use any charting library you want or whip something up yourself if you
        prefer that. Points for creativity, both in aesthetics and in data
        analysis.
      </p>

      <OrgTable />
    </div>
  )
}
