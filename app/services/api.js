const apiClient = (baseUrl) => ({
  async get(endpoint) {
    try {
      const response = 
        await fetch(
          `${baseUrl}${endpoint}`, 
          { 
            headers: {
              "authorization": `Bearer ${process.env.NEXT_PUBLIC_REST_COUNTRIES_API}`,
            }
          } 
        );

      if (!response.ok) {
        return [null, `HTTP error! status: ${response.statusText}`];
      }

      const data = await response.json();
      return [data, null];
    } catch (error) {
      console.log("API request failed: ", error);
      return [null, error.message];
    }
  },
  async post(endpoint) {
    return endpoint;
  },
});

const api = apiClient("https://api.restcountries.com/countries/v5");
// const api = apiClient("https://restcountries.com/v5");

const baseFields = "cca3,flags,name,capital,region,population"

const countriesApi = {
  getAll: () => api.get(`?pretty=1`),
  
  getCountry: (id) => 
    api.get(`/names.common/${id}?fields=${baseFields},languages,currencies,tld,borders`),
};

export { countriesApi };

// getAll: () => api.get(`/all?fields=${baseFields}`),