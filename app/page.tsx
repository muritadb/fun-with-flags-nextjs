'use client'

import { useEffect, useState } from "react"
import { Card, Grid, Footer, Header } from "./components"
import {  z } from 'zod'

const countrySchema = z.object({
  cca3: z.string(),
  flags: z.object({
    svg: z.string()
  }),
  name: z.object({
    common: z.string()
  }),
  capital: z.string().array(),
  region: z.string(),
  population: z.number()
})

type Country = z.infer<typeof countrySchema>

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    const fetchCountries = async () => {
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
    }

    fetchCountries()
  }, [])

  if (loading) return <div>Loading ...</div>
  if (error) return <div>{error}</div>

  return (
    <>
    <Header />
    <main className="flex-1">
      <Grid>
        {
          countries.map(({cca3,flags, name, capital, region, population}, index) => {
            const { svg: flag } = flags ?? {}
            const { common: countryName } = name ?? {}
            const [capitalName] = capital ?? []

            return (
              <Card 
                index={index}
                key={cca3}
                flag={flag}
                name={countryName} 
                capital={capitalName} 
                region={region} 
                population={population}
              />
            )
          })
        }  
      </Grid>
    </main>
    <Footer />
    </>
  )
}
