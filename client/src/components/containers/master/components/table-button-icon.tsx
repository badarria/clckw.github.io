import React, { useEffect, useState } from 'react'
import { TableCell, IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import { TableButtonIconProps } from 'types'

export const TableButtonIcon = ({ id, getZip, disabled }: TableButtonIconProps) => {
  const [link, setLink] = useState('/master')

  useEffect(() => {
    const newLink = async () => {
      const lk = await getZip(id)
      if (typeof lk === 'string') setLink(lk)
    }
    newLink()
  }, [])

  return (
    <TableCell>
      <IconButton
        component={Link}
        to={{ pathname: link }}
        target='_blank'
        color='primary'
        title="Download all order's photos"
        disabled={disabled}>
        <CloudDownloadIcon />
      </IconButton>
    </TableCell>
  )
}
