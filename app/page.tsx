import { Card, Grid, Footer, Header } from "./components"

  const countries = [
    {
      id: 1,
      country: "Brazil",
      region: "South America",
      capital: "Brasília",
      population: '216422446'
    },
    {
      id: 2,
      country: "Germany",
      region: "Europe",
      capital: "Berlin",
      population: '83294633'
    },
    {
      id: 3,
      country: "Japan",
      region: "Asia",
      capital: "Tokyo",
      population: '125124989'
    },
    {
      id: 4,
      country: "Nigeria",
      region: "Africa",
      capital: "Abuja",
      population: '223804632'
    },
    {
      id: 5,
      country: "Canada",
      region: "North America",
      capital: "Ottawa",
      population: '38781291'
    }
  ]

export default function Home() {
  return (
    <>
    <Header />
    <main className="flex-1">
      <Grid>
        {
          countries.map(({id, country, capital, region, population}) => 
            <Card 
              key={id}
              country={country} 
              capital={capital} 
              region={region} 
              population={population}
            />
          )
        }  
      </Grid>
    </main>
    <Footer />
    </>
  )
}
