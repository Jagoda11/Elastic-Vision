import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import FundingChart from './FundingChart'

jest.mock('react-chartjs-2', () => ({
  Pie: () => null, // Mocked Pie component
}))

test('👀renders FundingChart without crashing', () => {
  render(<FundingChart series={[]} />)
  const linkElement = screen.getByText(/Fundings/i)
  expect(linkElement).toBeInTheDocument()
})
