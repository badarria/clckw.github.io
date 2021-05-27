import React, { useState } from 'react'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import { Button } from '@material-ui/core'
import { FilterQuery } from '../types'
import { Order, Paging } from '../../../../types'
import { getOrders } from '../../../../services/admin/orders'
import { Loader } from 'components/ui'
import { useEffect } from 'react'
import { ButtonIcon } from '.'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'

type Props = { filters: FilterQuery; columns: Array<keyof Order> }

export default ({ filters, columns }: Props) => {
  const [dataXLSX, setDataXLSX] = useState<Array<Order | {}>>([])
  const [loading, setLoading] = useState(false)

  const getData = async () => {
    setLoading(true)
    const paging: Paging = { limit: -1, offset: 0, orderby: 'id', order: 'asc' }
    const res = await getOrders({ ...paging, ...filters })
    if ('type' in res) return

    const dataForTable = res.items.map((order) =>
      columns.reduce((acc: Order | {}, column) => {
        acc = { ...acc, [column]: order[column] }
        return acc
      }, {})
    )
    setDataXLSX(() => dataForTable)
    setLoading(false)
  }

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtension = '.xlsx'

  useEffect(() => {
    if (!dataXLSX.length) return

    const ws = XLSX.utils.json_to_sheet(dataXLSX)
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(data, 'orders' + fileExtension)
  }, [dataXLSX])

  const buttonProps = { title: 'Export to XLSX', icon: <ArrowDownwardIcon />, onClick: getData }

  return (
    <>
      <Loader loading={loading} />
      <ButtonIcon {...buttonProps} />
    </>
  )
}
