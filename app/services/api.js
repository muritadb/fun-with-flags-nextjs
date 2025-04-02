try {
  const response = await fetch('https://restcountries.com/v3.1/all?fields=cca3,flags,name,capital,region,population')
  const data = await response.json()
  setCountries(data)
} catch(error) {
  setError("Failed to fech data")
  console.log(error)
} finally {
  setLoading(false)
}

const apiClient = () => ({
  async get(endpoint) {
    try {
      const response = await fetch(endpoint)

      if(!response.ok) {
        return [null, `HTTP error! status: ${response.statusText}`]
      }

      const data = await response.json()
      return [data, null]
    } catch(error) {
      console.log("API request failed: ", error)
      return [null, error.message]
    }
  }
})