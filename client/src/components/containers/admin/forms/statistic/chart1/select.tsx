import React, { useState } from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'
import { Box } from '@material-ui/core'
import { useStyles } from '../styles'
import { useEffect } from 'react'
import { getChart1Init } from '../../../../../../services/admin/statistic'
import { Chart1Init } from '../../../types'

type Props = { getFilteredData: (city: string[]) => void }

export const MultipleSelect = ({ getFilteredData }: Props) => {
  const [masters, setMasters] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [initData, setInitData] = useState<Chart1Init>([])
  const { form, chipsBox, chip, select, formBox1, formBox2, selectLabel } = useStyles()

  const handleChangeMasters = (event: React.ChangeEvent<{ value: unknown }>) => {
    const values = event.target.value as string[]
    setCities([])
    setMasters(values)
    getFilteredData(values)
  }

  const handleChangeCity = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMasters([])
    setCities(event.target.value as string[])
    getFilteredData(event.target.value as string[])
  }

  const deleteMasterChip = (master: string) => () => {
    const newMasters = masters.filter((name) => master !== name)
    setMasters(newMasters)
    getFilteredData(newMasters)
  }
  const deleteCityChip = (city: string) => () => {
    const newCities = cities.filter((name) => name !== city)
    setCities(newCities)
    getFilteredData(newCities)
  }

  const filterCity = initData.reduce((acc: string[], { city }) => {
    if (!acc.includes(city)) acc.push(city)
    return acc
  }, [])

  useEffect(() => {
    const initData = async () => {
      const data = await getChart1Init()
      if ('type' in data) return
      setInitData(data)
    }
    initData()
  }, [])

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
                  {initData.map(({ fullName }, inx) => (
                    <MenuItem key={inx} value={fullName}>
                      {fullName}
                    </MenuItem>
                  ))}
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
                  {filterCity.map((city, inx) => {
                    return (
                      <MenuItem key={inx} value={city}>
                        {city}
                      </MenuItem>
                    )
                  })}
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
