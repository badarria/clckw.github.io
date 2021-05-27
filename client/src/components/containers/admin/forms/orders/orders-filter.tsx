import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { ButtonIconProps, FilterQuery, Range, SelectFilterProps } from '../../types'
import Select from './select'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ClearIcon from '@material-ui/icons/Clear'
import DoneIcon from '@material-ui/icons/Done'
import { useStyles } from './styles'
import { getFilterInintData } from 'services/admin/orders'
import { ButtonIcon, DateRangePicker, ExportXLSX } from '../../components'
import { City, Master, Service, Order } from '../../../../../types'

type InitData = {
  masters: Array<Master & { fullName: string }>
  cities: City[]
  services: Service[]
  status: { id: number; name: string }[]
}
type Selected = { masters: number[]; cities: number[]; services: number[]; status: number[] }
type Chips = { id: number; label: string; key: keyof Selected; color: string }
type Props = { changeFiltered: (data: FilterQuery) => void; columns: Array<keyof Order> }

const initRange: Range = { begin: '', finish: '' }
const initStatus = [
  { id: 1, name: 'completed' },
  { id: 0, name: 'not completed' },
]
const initSelected = { masters: [], cities: [], services: [], status: [] }
const initInitData = { masters: [], cities: [], services: [], status: initStatus }
const colors = { masters: '#c8dbf8', cities: '#dcf8c8', services: '#faeaa9', status: '#e2d2fa' }

export default ({ changeFiltered, columns }: Props) => {
  const [initData, setInitData] = useState<InitData>(initInitData)
  const [selected, setSelected] = useState<Selected>(initSelected)
  const [chips, setChips] = useState<Chips[]>([])
  const [range, setRange] = useState<Range>(initRange)
  const [expanded, setExpanded] = useState(false)
  const [filterForXLSX, setFilterForXLSX] = useState<FilterQuery>({})
  const { accordion, filtersBox, chipsBox, chip, detailBox, filter, btnBox } = useStyles()
  const { masters, services, cities, status } = initData

  const isSelected = () => {
    const { begin, finish } = range
    for (let [key, values] of Object.entries(selected)) {
      if (values.length) {
        return true
      }
    }
    if (begin || finish) return true
    return false
  }

  const dataToFilterQuery = () => {
    const { begin, finish } = range
    const data = Object.entries(selected).reduce((acc: any, [key, values]) => {
      if (key === 'status' && values.length) {
        acc.completed = values.map((num) => !!num)
      } else if (values.length) acc[key] = values
      return acc
    }, {})
    const querydata: FilterQuery = { ...data }
    if (begin) querydata.begin = begin.slice(0, -6)
    if (finish) querydata.finish = finish.slice(0, -6)
    setFilterForXLSX(querydata)
    return querydata
  }

  const reset = () => {
    setSelected(initSelected)
    setChips([])
    changeFiltered({})
  }

  const accept = () => {
    if (!isSelected()) return

    changeFiltered(dataToFilterQuery())
  }

  useEffect(() => {
    const getInitData = async () => {
      const initData = await getFilterInintData()
      if ('type' in initData) return reset()
      setInitData((prev) => ({ ...prev, ...initData }))
    }
    getInitData()
  }, [])

  useEffect(() => {
    dataToFilterQuery()
  }, [selected, range])

  const filteredChips = (key: keyof Selected, values: number[]) =>
    chips.filter((chip) => {
      if (chip.key === key && !values.includes(chip.id)) return false
      return true
    })

  const changeSelected = (key: keyof Selected) => (values: number[]) => {
    setSelected((prev) => ({ ...prev, [key]: values }))

    if (selected[key].length < values.length) {
      const newChip = values.reduce((acc: Chips[], id) => {
        if (!selected[key].includes(id)) {
          let label = initData[key].find((item) => item.id === id)?.name || ''
          if (key === 'masters') label = initData[key].find((item) => item.id === id)?.fullName || ''
          acc.push({ id, label, key, color: colors[key] })
        }

        return acc
      }, [])
      setFilterForXLSX(dataToFilterQuery())
      return setChips((prev) => [...prev, ...newChip])
    }

    if (selected[key].length > values.length) return setChips(() => filteredChips(key, values))
  }

  const deleteChip = (key: keyof Selected, id: number) => {
    const newSelected = selected[key].filter((itemId) => itemId !== id)
    const newChips = chips.filter((chip) => {
      if (chip.key === key && chip.id === id) return false
      return true
    })
    if (newChips.length === 0 && chips.length > 0) reset()
    setSelected((prev) => ({ ...prev, [key]: newSelected }))
    setChips(newChips)
  }

  const changeRange = ({ begin, finish }: Range) => setRange({ begin, finish })

  const mastersProps: SelectFilterProps = {
    data: masters,
    selected: selected.masters,
    label: 'masters',
    keyWord: 'fullName',
    changeOptions: changeSelected('masters'),
  }

  const citiesProps: SelectFilterProps = {
    data: cities,
    selected: selected.cities,
    label: 'cities',
    changeOptions: changeSelected('cities'),
  }

  const servicesProps: SelectFilterProps = {
    data: services,
    selected: selected.services,
    label: 'services',
    changeOptions: changeSelected('services'),
  }
  const completedProps: SelectFilterProps = {
    data: status,
    selected: selected.status,
    label: 'status',
    changeOptions: changeSelected('status'),
  }

  const rangeProps = {
    initBegin: range.begin,
    initFinish: range.finish,
    onChange: changeRange,
    required: false,
  }
  const resetProps: ButtonIconProps = {
    icon: <ClearIcon />,
    title: 'Reset filters',
    onClick: () => reset(),
    disabled: !isSelected(),
    type: 'submit',
  }
  const acceptProps: ButtonIconProps = {
    icon: <DoneIcon />,
    title: 'Apply filters',
    onClick: () => accept(),
    disabled: !isSelected(),
    type: 'submit',
  }
  const XLSXProps = { filters: filterForXLSX, columns }

  const handleExpand = () => setExpanded(!expanded)

  return (
    <>
      <Accordion expanded={expanded} onChange={handleExpand} className={filter}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id='filter' className={accordion}>
          <Typography>Filters</Typography>
        </AccordionSummary>
        <AccordionDetails className={detailBox}>
          <Box className={filtersBox}>
            <Select {...mastersProps} />
            <Select {...citiesProps} />
            <Select {...servicesProps} />
            <Select {...completedProps} />
            <DateRangePicker {...rangeProps} />
          </Box>
          <Box className={chipsBox}>
            {chips.map(({ id, label, key, color }, inx) => {
              const del = () => deleteChip(key, id)
              return (
                <Chip
                  key={inx}
                  label={label}
                  onDelete={del}
                  className={chip}
                  size='small'
                  style={{ background: color }}
                />
              )
            })}
          </Box>
          <Box className={btnBox}>
            <ButtonIcon {...acceptProps} />
            <ButtonIcon {...resetProps} />
            <ExportXLSX {...XLSXProps} />
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  )
}
