import React, { useState } from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'
import { Box } from '@material-ui/core'
import { useStyles } from '../styles'
import { useEffect } from 'react'
import { HistogramInit, HistogramRes } from '../../../types'

type Props = {
  cities: string[]
  masters: string[]
  setMasters: (data: string[]) => void
  setCities: (data: string[]) => void
  data: HistogramRes
}

export const HistogramSelect = ({ cities, masters, setCities, setMasters, data }: Props) => {
  const [initData, setInitData] = useState<HistogramInit>({ masters: [], cities: [] })
  const { form, chipsBox, chip, select, formBox1, formBox2, selectLabel } = useStyles()

  const handleChangeMasters = (event: React.ChangeEvent<{ value: unknown }>) => {
    const values = event.target.value as string[]
    setCities([])
    setMasters(values)
  }

  const handleChangeCity = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMasters([])
    setCities(event.target.value as string[])
  }

  const deleteMasterChip = (master: string) => () => {
    const newMasters = masters.filter((name) => master !== name)
    setMasters(newMasters)
  }
  const deleteCityChip = (city: string) => () => {
    const newCities = cities.filter((name) => name !== city)
    setCities(newCities)
  }

  const getInitData = () => {
    const res = data.reduce(
      (acc: { masters: string[]; cities: string[] }, { orders }) => {
        orders.forEach(({ master, city }) => {
          if (!acc.masters.includes(master)) acc.masters.push(master)
          if (!acc.cities.includes(city)) acc.cities.push(city)
        })
        return acc
      },
      { masters: [], cities: [] }
    )
    setInitData(() => res)
  }

  useEffect(() => {
    if (masters.length) setMasters([])
    if (cities.length) setCities([])
    getInitData()
  }, [data])

  return (
    <>
      <Box className={form}>
        <Box className={formBox1}>
          <FormControl>
            <Box className={form}>
              <Box>
                <InputLabel id='MasterLabel' className={selectLabel}>
                  Select masters
                </InputLabel>
                <Select id='masters-id' multiple value={masters} onChange={handleChangeMasters} className={select}>
                  {initData.masters.length ? (
                    initData.masters.map((name, inx) => (
                      <MenuItem key={inx} value={name}>
                        {name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>There is no options</MenuItem>
                  )}
                </Select>
              </Box>
            </Box>
          </FormControl>
          <FormControl margin='dense'>
            <Box className={form}>
              <Box>
                <InputLabel id='cityLabel' className={selectLabel}>
                  Or select cities
                </InputLabel>
                <Select id='cities-id' multiple value={cities} onChange={handleChangeCity} className={select}>
                  {initData.cities.length ? (
                    initData.cities.map((city, inx) => {
                      return (
                        <MenuItem key={inx} value={city}>
                          {city}
                        </MenuItem>
                      )
                    })
                  ) : (
                    <MenuItem disabled>There is no options</MenuItem>
                  )}
                </Select>
              </Box>
            </Box>
          </FormControl>
        </Box>
        <Box className={formBox2}>
          <Box className={chipsBox}>
            {!cities.length &&
              masters.map((master, inx) => (
                <Box>
                  <Chip key={inx} label={master} onDelete={deleteMasterChip(master)} className={chip} />
                </Box>
              ))}
            {!masters.length &&
              cities.map((city, inx) => (
                <Box>
                  <Chip key={inx} label={city} onDelete={deleteCityChip(city)} className={chip} />
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
    </>
  )
}
