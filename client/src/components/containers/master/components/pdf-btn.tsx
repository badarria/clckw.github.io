import React from 'react';
import { TableCell, IconButton } from '@material-ui/core';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { useCallback } from 'react';

type Props = { id: number; getPdf: Function; disabled: boolean };

export const PdfBtn = ({ id, getPdf, disabled }: Props) => {
  const click = useCallback(() => getPdf(id), []);

  return (
    <TableCell>
      <IconButton
        onClick={click}
        color='primary'
        title='Download orders receipt in pdf format'
        disabled={disabled}
      >
        <PictureAsPdfIcon />
      </IconButton>
    </TableCell>
  );
};
