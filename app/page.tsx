'use client'

import { useEffect, useState } from "react"
import { Card, Grid} from "./components"
import { countriesApi } from './services'
import {  z } from 'zod'
import Link from "next/link"

const countrySchema = z.object({
  uuid: z.string(),
  cca3: z.string(),
  flags: z.object({
    svg: z.string()
  }),
  names: z.object({
    common: z.string()
  }),
  capitals: z.object({
    name: z.string()
  }).array(),
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

    const parsedCountries = response?.data?.objects

    setCountries(parsedCountries)
    // setCountries(response)
    console.log('response', parsedCountries)
    }

    fetchCountries()
  }, [])

  if (loading) return <div>Loading ...</div>
  if (error) return <div>{error}</div>

  return (
      <Grid>
        {
          countries.map(({uuid, cca3,flags, names, capitals, region, population}, index) => {
            const { svg: flag } = flags ?? {}
            const { common: countryName } = names ?? {}
            // const capitalName = capitals[0]?.name ?? []
            const [{ name: capitalName = "" } = {}] = capitals

            // console.log('country caPITAL', typeof capitalName, capitals[0].name)

            return (
              <Link  key={uuid}  href={`/country/${cca3}`}>
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
  )
}


/**
 * "names": {
          "alternates": [
            "Apsny"
          ],
          "common": "Abkhazia",
          "native": {
            "abk": {
              "common": "Аҧсны",
              "official": "Аҧсны Аҳәынҭқарра"
            },
            "rus": {
              "common": "Абхазия",
              "official": "Республика Абхазия"
            }
          },
          "official": "Republic of Abkhazia",
          "translations": {
            "ara": {
              "common": "أبخازيا",
              "official": "جمهورية أبخازيا"
            },
            "deu": {
              "common": "Abchasien",
              "official": "Republik Abchasien"
            },
            "fra": {
              "common": "Abkhazie",
              "official": "République d'Abkhazie"
            },
            "hun": {
              "common": "Abházia",
              "official": "Abház Köztársaság"
            },
            "ita": {
              "common": "Abcasia",
              "official": "Repubblica di Abcasia"
            },
            "jpn": {
              "common": "アブハジア",
              "official": "アブハジア共和国"
            },
            "kor": {
              "common": "압하지야",
              "official": "압하지야 공화국"
            },
            "nld": {
              "common": "Abchazië",
              "official": "Republiek Abchazië"
            },
            "pol": {
              "common": "Abchazja",
              "official": "Republika Abchazji"
            },
            "por": {
              "common": "Abecásia",
              "official": "República da Abecásia"
            },
            "rus": {
              "common": "Абхазия",
              "official": "Республика Абхазия"
            },
            "spa": {
              "common": "Abjasia",
              "official": "República de Abjasia"
            },
            "swe": {
              "common": "Abchazien",
              "official": "Republiken Abchazien"
            },
            "tur": {
              "common": "Abhazya",
              "official": "Abhazya Cumhuriyeti"
            },
            "zho": {
              "common": "阿布哈兹",
              "official": "阿布哈兹共和国"
            }
          }
        },
        "codes": {
          "alpha_2": "",
          "alpha_3": "",
          "ccn3": "",
          "cioc": "",
          "fifa": "",
          "fips": "",
          "gec": ""
        },


        "capitals": [
          {
            "attributes": {
              "administrative": false,
              "constitutional": false,
              "executive": false,
              "judicial": false,
              "legislative": false,
              "primary": true
            },
            "coordinates": {
              "lat": 43.0033,
              "lng": 41.0153
            },
            "name": "Sukhumi"
          }
        ],
        "flag": {
          "description": "",
          "emoji": "",
          "html_entity": "",
          "unicode": "",
          "url_png": "",
          "url_svg": ""
        },
        "region": "Asia",
        "subregion": "Western Asia",
        "area": {
          "kilometers": 8665,
          "miles": 3345.6
        },
        "assets": [],
        "borders": [
          "GEO",
          "RUS"
        ],
        "calling_codes": [
          "7"
        ],
        "cars": {
          "driving_side": "right",
          "signs": []
        },
        "classification": {
          "dependency": false,
          "dependency_type": "",
          "disputed": true,
          "iso_status": "unassigned",
          "sovereign": true,
          "un_member": false,
          "un_observer": false
        },
        "continents": [
          "Asia"
        ],
        "coordinates": {
          "lat": 43,
          "lng": 41
        },
        "currencies": [
          {
            "code": "RUB",
            "name": "Russian ruble",
            "symbol": "₽"
          }
        ],
        "date": {
          "academic_year_start": {
            "day": 1,
            "month": 9
          },
          "fiscal_year_start": {
            "corporate": {
              "basis": "convention",
              "day": 1,
              "month": 1
            },
            "government": {
              "day": 1,
              "month": 1
            },
            "personal": {
              "day": 1,
              "month": 1
            }
          },
          "start_of_week": "monday"
        },
        "demonyms": {
          "eng": {
            "f": "Abkhaz",
            "m": "Abkhaz"
          },
          "fra": {
            "f": "Abkhaze",
            "m": "Abkhaze"
          }
        },
        "economy": {
          "gini_coefficient": {}
        },
        "government_type": "Unitary presidential republic",
        "landlocked": false,
        "languages": [
          {
            "bcp47": "ab",
            "iso639_1": "ab",
            "iso639_2b": "abk",
            "iso639_2t": "abk",
            "iso639_3": "abk",
            "name": "Abkhaz",
            "native_name": "Аҧсуа бызшәа"
          },
          {
            "bcp47": "ru",
            "iso639_1": "ru",
            "iso639_2b": "rus",
            "iso639_2t": "rus",
            "iso639_3": "rus",
            "name": "Russian",
            "native_name": "русский"
          }
        ],
        "leaders": [
          {
            "message": "data.leaders is only available on paid plans. Go to https://restcountries.com/plans to make updates to your account.",
            "sample": "https://files-03.restcountries.com/countries.00/sample.leaders.json"
          }
        ],
        "links": {
          "google_maps": "",
          "official": "http://presidentofabkhazia.org",
          "open_street_maps": "",
          "wikipedia": "https://en.wikipedia.org/wiki/Abkhazia"
        },
        "memberships": {
          "african_union": false,
          "arab_league": false,
          "asean": false,
          "brics": false,
          "commonwealth": false,
          "eu": false,
          "eurozone": false,
          "g20": false,
          "g7": false,
          "nato": false,
          "oecd": false,
          "opec": false,
          "schengen": false,
          "un": false
        },
        "number_format": {
          "decimal_separator": ",",
          "thousands_separator": "."
        },
        "parent": {
          "alpha_2": "GE",
          "alpha_3": "GEO"
        },
        "population": 244000,
        "postal_code": {
          "format": "",
          "regex": ""
        },
        "timezones": [
          "UTC+03:00"
        ],
        "tlds": [],
        "uuid": "0e1bae13-c4c6-40d7-955f-f2c6062381cc",
        "_meta": {
          "lastUpdatedTimestamp": 1781382415
        }
      },
 */