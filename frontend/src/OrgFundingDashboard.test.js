import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import OrgFundingDashboard from './OrgFundingDashboard'

jest.mock('./OrgTable', () => () => null)
jest.mock('./FundingTable', () => () => null)
jest.mock('./FundingChart', () => () => null)
jest.mock('./CompanySizeChart', () => () => null)

test('renders OrgFundingDashboard without crashing', () => {
  render(<OrgFundingDashboard />)
  const linkElement = screen.getByText(/Organizational Funding Dashboard/i)
  expect(linkElement).toBeInTheDocument()
})
test('displays loading message while fetching data', () => {
  render(<OrgFundingDashboard />)
  const loadingMessage = screen.getByText(/Loading.../i)
  expect(loadingMessage).toBeInTheDocument()
})
test('displays the correct title', () => {
  render(<OrgFundingDashboard />)

  // Check for the title
  const title = screen.getByText(/Organizational Funding Dashboard/i)
  expect(title).toBeInTheDocument()
})
