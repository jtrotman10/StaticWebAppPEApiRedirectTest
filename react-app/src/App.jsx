import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [apiResponse, setApiResponse] = useState(null)
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const testApi = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/test')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setApiResponse(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchWeather = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/weatherforecast')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setWeatherData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Azure Static Web App + API Test</h1>
      <div className="card">
        <h2>API Connection Test</h2>
        <p>This React app calls ASP.NET 9 API using relative /api paths</p>
        
        <div style={{ marginTop: '20px' }}>
          <button onClick={testApi} disabled={loading}>
            Test API Endpoint
          </button>
          <button onClick={fetchWeather} disabled={loading} style={{ marginLeft: '10px' }}>
            Fetch Weather
          </button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        
        {apiResponse && (
          <div style={{ marginTop: '20px', textAlign: 'left', background: '#1a1a1a', padding: '15px', borderRadius: '8px' }}>
            <h3>API Test Response:</h3>
            <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
          </div>
        )}

        {weatherData && (
          <div style={{ marginTop: '20px', textAlign: 'left', background: '#1a1a1a', padding: '15px', borderRadius: '8px' }}>
            <h3>Weather Forecast:</h3>
            <pre>{JSON.stringify(weatherData, null, 2)}</pre>
          </div>
        )}
      </div>
      <p className="read-the-docs">
        For Azure deployment: React app in Static Web App, API in App Service with Private Endpoint
      </p>
    </>
  )
}

export default App
