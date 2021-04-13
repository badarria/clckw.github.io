import React, { useState } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { TypicalResponseType, MasterOrdersList } from '../../../../types';
import { ButtonDialog, PdfBtn, ZipBtn } from '.';

type Props = {
  data: MasterOrdersList[];
  columns: string[];
  change: Function;
  getZip: (id: number) => Promise<string | TypicalResponseType>;
  getPdf: Function;
};

export const MasterTableList = (props: Props) => {
  const { data, columns, change, getZip, getPdf } = props;
  const generatedColumns = columns.slice(0, -3);

  if (data.length)
    return (
      <>
        {data.map((item: MasterOrdersList, inx: number) => {
          const { id, completed, userEmail, customer, photos } = item;
          const dataForLetter = { id, userEmail, name: customer };
          const zipBtnProps = { id, getZip, disabled: !photos };
          const pdfBtnProps = { id, getPdf, disabled: !completed };
          const thisItem: any = { ...item };

          return (
            <TableRow key={inx} component='tr'>
              {generatedColumns.map((col, inx) => {
                return (
                  <TableCell component='td' key={inx}>
                    {thisItem[col]}
                  </TableCell>
                );
              })}
              <TableCell>
                <ButtonDialog
                  accept={() => change(dataForLetter)}
                  isDisabled={completed}
                />
              </TableCell>

              <ZipBtn {...zipBtnProps} />
              <PdfBtn {...pdfBtnProps} />
            </TableRow>
          );
        })}
      </>
    );
  else
    return (
      <TableRow component='tr'>
        <TableCell align='center' colSpan={11} component='td'>
          There is no placed order
        </TableCell>
      </TableRow>
    );
};
