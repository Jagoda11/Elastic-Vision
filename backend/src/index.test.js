const http = require('http')

jest.mock('http')
jest.mock('@elastic/elasticsearch')
jest.mock('dotenv')
jest.mock('path')

jest.mock('http', () => ({
  createServer: jest.fn().mockReturnValue({ listen: jest.fn() }),
}))
jest.mock('@elastic/elasticsearch', () => ({
  Client: jest.fn(),
}))
jest.mock('dotenv')
jest.mock('path')

describe('🚀 Server', () => {
  let originalEnv

  beforeEach(() => {
    originalEnv = process.env
    process.env = { ...originalEnv, ES_URL: 'http://localhost:9200' }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('🚀 starts the server correctly', () => {
    require('./index')
    expect(http.createServer).toHaveBeenCalled()
  })
})
