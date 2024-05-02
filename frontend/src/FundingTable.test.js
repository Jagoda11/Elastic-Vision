import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import FundingTable from './FundingTable'

test('👀renders FundingTable without crashing', () => {
  render(<FundingTable data={[]} />)
  const linkElement = screen.getByText(/Funding Rounds/i)
  expect(linkElement).toBeInTheDocument()
})

test('🔢displays calculations on button click', async () => {
  const data = [
    {
      funding_round_uuid: '1',
      company_name: 'Company 1',
      investment_type: 'Seed',
      announced_on: '2020-01-01',
      raised_amount_usd: '1000000',
    },
    {
      funding_round_uuid: '2',
      company_name: 'Company 2',
      investment_type: 'Series A',
      announced_on: '2020-02-01',
      raised_amount_usd: '2000000',
    },
  ]

  render(<FundingTable data={data} />)
  const button = screen.getByText(/Show Calculations/i)
  fireEvent.click(button)

  await waitFor(() => {
    const totalFundingRounds = screen.getByText(/^Total Funding Rounds:/i)
    const totalRaised = screen.getByText(/^Total Raised \(USD\):/i)
    const averageRaised = screen.getByText(
      /^Average Raised per Round \(USD\):/i,
    )

    expect(totalFundingRounds).toBeInTheDocument()
    expect(totalRaised).toBeInTheDocument()
    expect(averageRaised).toBeInTheDocument()
  })
})
