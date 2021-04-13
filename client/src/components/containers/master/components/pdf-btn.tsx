import React, { useEffect, useState } from 'react';
import { TableCell, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { useCallback } from 'react';

type Props = { id: number; getPdf: Function; disabled: boolean };

export const PdfBtn = ({ id, getPdf, disabled }: Props) => {
  // const [link, setLink] = useState('/master');

  const newPdf = useCallback(async () => {
    const lk = await getPdf();
    console.log(lk);
    // if (typeof lk === 'string') setLink(lk);
  }, []);

  return (
    <TableCell>
      <IconButton
        onClick={newPdf}
        color='primary'
        title='Download orders receipt in pdf format'
        disabled={disabled}
      >
        <PictureAsPdfIcon />
      </IconButton>
    </TableCell>
  );
};
