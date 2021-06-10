import React, { useState } from 'react'

import { FilterQuery } from '../types'
import { Paging } from '../../../../types'
import { getOrdersXLSX } from '../../../../services/admin/orders'
import { Loader } from 'components/ui'
import { ButtonIcon } from '.'
import FileSaver from 'file-saver'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'

type Props = { filters: FilterQuery }
const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
const fileExtension = '.xlsx'

export default ({ filters }: Props) => {
  const [loading, setLoading] = useState(false)

  const getData = async () => {
    setLoading(true)
    const paging: Paging = { limit: -1, offset: 0, orderby: 'id', order: 'asc' }
    const res = await getOrdersXLSX({ ...paging, ...filters })
    if ('type' in res) return

    const data = new Blob([res], { type: fileType })
    FileSaver.saveAs(data, 'orders' + fileExtension)

    setLoading(false)
  }

  const buttonProps = { title: 'Export to XLSX', icon: <ArrowDownwardIcon />, onClick: getData }

  return (
    <>
      <Loader loading={loading} />
      <ButtonIcon {...buttonProps} />
    </>
  )
}
