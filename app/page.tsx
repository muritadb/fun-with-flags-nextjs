'use client'

import { useEffect, useState } from "react"
import { Card, Grid, Footer, Header } from "./components"
import { countriesApi } from './services'
import {  z } from 'zod'
import Link from "next/link"

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

console.log('countrySchema', countrySchema)

type Country = z.infer<typeof countrySchema>

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    const fetchCountries = async () => {
   
    const [response, error] = await countriesApi.getAll()
    setLoading(false)

    if(error) {
      setError(error)
      return
    }

    setCountries(response)
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
              <Link  key={cca3}  href={`/country/${cca3}`}>
                <Card 
                  index={index}
                  flag={flag}
                  name={countryName} 
                  capital={capitalName} 
                  region={region} 
                  population={population}
                />
              </Link>
            )
          })
        }  
      </Grid>
    </main>
    <Footer />
    </>
  )
}
