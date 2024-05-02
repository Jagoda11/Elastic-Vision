import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import OrgTable from './OrgTable'

test('renders OrgTable without crashing', () => {
  render(<OrgTable rows={[]} columns={[]} />)
  const linkElement = screen.getByText(/Organizations/i)
  expect(linkElement).toBeInTheDocument()
})

test('toggles calculations on button click', () => {
  render(<OrgTable rows={[]} columns={[]} />)
  const button = screen.getByText(/Show Calculations/i)
  fireEvent.click(button)
  const calculations = screen.getByText(/Total Organizations/i)
  expect(calculations).toBeInTheDocument()
  fireEvent.click(button)
  expect(calculations).not.toBeInTheDocument()
})
