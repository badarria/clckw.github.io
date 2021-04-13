import React, { useEffect, useState } from 'react';
import { TableCell, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { useCallback } from 'react';
import { TypicalResponseType } from 'types';

type Props = {
  id: number;
  getZip: (id: number) => Promise<string | TypicalResponseType>;
  disabled: boolean;
};

export const ZipBtn = ({ id, getZip, disabled }: Props) => {
  const [link, setLink] = useState('/master');

  const newLink = useCallback(async () => {
    const lk = await getZip(id);
    if (typeof lk === 'string') setLink(lk);
  }, []);

  useEffect(() => {
    newLink();
  }, []);

  return (
    <TableCell>
      <IconButton
        component={Link}
        to={{ pathname: link }}
        target='_blank'
        color='primary'
        title="Download all order's photos"
        disabled={disabled}
      >
        <CloudDownloadIcon />
      </IconButton>
    </TableCell>
  );
};
