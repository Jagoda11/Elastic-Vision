import React from 'react'
import OrgTable from './OrgTable'

export default function App() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <ul>
        <li>
          <code>org</code> – A collection of organizations. Accessed via{' '}
          <a href="http://localhost:8080/orgs">http://localhost:8080/orgs</a>.
        </li>
        <li>
          <code>funding</code> – A collection of{' '}
          <a href="https://techcrunch.com/2017/01/08/wtf-is-a-funding-round/">
            funding rounds
          </a>
          . Accessed via{' '}
          <a href="http://localhost:8080/fundings">
            http://localhost:8080/fundings
          </a>
          .
        </li>
      </ul>

      <p>
        The code for these endpoints can be found in{' '}
        <code>backend/src/index.js</code>.
      </p>

      <p>
        We want you to{' '}
        <strong>
          explore and create a chart or graph of any aspect of the data.
        </strong>{' '}
        Use any charting library you want or whip something up yourself if you
        prefer that. Points for creativity, both in aesthetics and in data
        analysis.
      </p>
      <br />
      <p>
        Here is a simple table version of the data. How will <em>you</em> make
        it more fun?
      </p>

      <OrgTable />
    </div>
  )
}
