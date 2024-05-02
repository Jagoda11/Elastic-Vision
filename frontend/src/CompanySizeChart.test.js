import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CompanySizeChart from './CompanySizeChart'

jest.mock('react-chartjs-2', () => ({
  Bar: ({ data }) => {
    // Render the colors as text so we can check them
    return <div>{data.datasets[0].backgroundColor.join(',')}</div>
  },
}))
test('displays the correct colors for the bars', () => {
  const data = [
    { employee_count: '1-10' },
    { employee_count: '11-50' },
    { employee_count: '1-10' },
  ]

  render(<CompanySizeChart data={data} />)
  const colors = screen.getByText(/rgba\(/i)
  expect(colors).toBeInTheDocument()
})

test('renders CompanySizeChart without crashing', () => {
  render(<CompanySizeChart data={[]} />)
  const linkElement = screen.getByText(/Company Size Chart/i)
  expect(linkElement).toBeInTheDocument()
})
