import { useEffect, useState } from 'react'
import './App.css'

const API_BASE_URL = 'https://api.openbrewerydb.org/v1/breweries'

const formatPhone = (value) => {
  if (!value || value.length !== 10) return 'Phone unavailable'

  return `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`
}

const formatType = (value) => {
  if (!value) return 'Other'

  const labels = {
    micro: 'Small Independent Brewery',
    nano: 'Very Small Batch Brewery',
    regional: 'Regional Brewery',
    brewpub: 'Brewery Restaurant',
    large: 'Large Brewery',
    planning: 'Coming Soon Brewery',
    bar: 'Bar Brewery',
    contract: 'Contract Brewery',
    proprietor: 'Private Brewery',
    closed: 'Permanently Closed Brewery',
  }

  return labels[value] || value
      .split(/[\s_-]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
}

function App() {
  const [breweries, setBreweries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchHoustonBreweries = async () => {
      try {
        setLoading(true)
        setError('')

        const params = new URLSearchParams({
          by_city: 'houston',
          per_page: '20',
          sort: 'name:asc',
        })

        const response = await fetch(`${API_BASE_URL}?${params.toString()}`)

        if (!response.ok) {
          throw new Error('Unable to load Houston breweries right now.')
        }

        const data = await response.json()

        const formattedBreweries = data.slice(0, 10).map((brewery) => ({
          id: brewery.id,
          name: brewery.name || 'Unnamed brewery',
          rawType: brewery.brewery_type || 'other',
          type: formatType(brewery.brewery_type),
          address: brewery.street || 'Address unavailable',
          location: `${brewery.city || 'Houston'}, ${brewery.state || 'TX'}`,
          phone: formatPhone(brewery.phone),
          website: brewery.website_url,
        }))

        setBreweries(formattedBreweries)
      } catch (fetchError) {
        setError(fetchError.message)
      } finally {
        setLoading(false)
      }
    }

    fetchHoustonBreweries()
  }, [])

  const breweryTypes = [
    'All',
    ...new Set(breweries.map((brewery) => brewery.type).filter(Boolean)),
  ]

  const filteredBreweries = breweries.filter((brewery) => {
    const normalizedSearch = searchTerm.toLowerCase()
    const matchesSearch =
      brewery.name.toLowerCase().includes(normalizedSearch) ||
      brewery.address.toLowerCase().includes(normalizedSearch)

    const matchesType =
      selectedType === 'All' || brewery.type === selectedType

    return matchesSearch && matchesType
  })

  const uniqueTypes = new Set(filteredBreweries.map((brewery) => brewery.type)).size
  const websiteCount = filteredBreweries.filter((brewery) => brewery.website).length
  const microCount = filteredBreweries.filter(
    (brewery) => brewery.rawType === 'micro',
  ).length

  return (
    <main className="dashboard-shell">
      <section className="hero-panel">
        <p className="eyebrow">Houston Brewery Guide</p>
        <h1>Top Houston breweries at a glance</h1>
        <p className="hero-copy">
          Explore ten Houston breweries, compare their brewery types, and scan
          addresses, contact details, and website availability from a live public
          API.
        </p>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <span className="stat-label">Breweries showing</span>
          <strong className="stat-value">{filteredBreweries.length}</strong>
        </article>

        <article className="stat-card">
          <span className="stat-label">Unique brewery types</span>
          <strong className="stat-value">{uniqueTypes}</strong>
        </article>

        <article className="stat-card">
          <span className="stat-label">With websites</span>
          <strong className="stat-value">{websiteCount}</strong>
        </article>

        <article className="stat-card">
          <span className="stat-label">Micro breweries</span>
          <strong className="stat-value">{microCount}</strong>
        </article>
      </section>

      <section className="controls-panel">
        <div className="control-group">
          <label htmlFor="search">Search by brewery name or address</label>
          <input
            id="search"
            type="text"
            placeholder="Search Houston breweries..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="control-group">
          <label htmlFor="type">Filter by brewery type</label>
          <select
            id="type"
            value={selectedType}
            onChange={(event) => setSelectedType(event.target.value)}
          >
            {breweryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="list-panel">
        <div className="list-header">
          <h2>Brewery Dashboard</h2>
          <p>Live results from Open Brewery DB for Houston, Texas.</p>
        </div>

        {loading && <p className="status-message">Loading breweries...</p>}
        {error && <p className="status-message error-message">{error}</p>}

        {!loading && !error && (
          <>
            {filteredBreweries.length === 0 ? (
              <p className="status-message">
                No breweries match your current search and filter.
              </p>
            ) : (
              <div className="event-list">
                {filteredBreweries.map((brewery) => (
                  <article key={brewery.id} className="event-row">
                    <div>
                      <p className="event-name">{brewery.name}</p>
                      <p className="event-meta">
                        {brewery.address} • {brewery.location}
                      </p>
                    </div>

                    <div className="event-pill-group">
                      <span className="event-pill">{brewery.type}</span>
                      <span className="event-pill muted-pill">
                        {brewery.website ? 'Website listed' : 'No website'}
                      </span>
                    </div>

                    <div className="event-date-block">
                      <span>{brewery.phone}</span>
                      <strong>{brewery.website ? 'Open online' : 'Call first'}</strong>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  )
}

export default App
