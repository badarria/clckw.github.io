import {
  Container,
  Box,
  Paper,
  TableBody,
  Table,
  TableContainer,
  TableFooter,
} from '@material-ui/core';
import { Loader, Toast } from 'components/ui';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ChangeStatus,
  MasterOrdersList,
  Paging,
  TypicalResponseType,
} from 'types';
import { Pagination, MasterTableHead, MasterTableList } from './components';
import { useStyles } from './styles';
import {
  getList,
  sendRatingMail,
  setDone,
  getOrdersPhoto,
  getOrdersReceipt,
} from '../../../services/master';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const columns = [
  'id',
  'customer',
  'service',
  'price',
  'date',
  'begin',
  'finish',
  'rating',
  'completed',
  'photos',
  'receipt',
];

export const Master = () => {
  const { id, name } = useSelector((state: RootState) => state.user);
  const [orders, setOrders] = useState<MasterOrdersList[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<TypicalResponseType>({
    type: 'success',
    msg: '',
  });

  const initPaging: Paging = {
    limit: 10,
    offset: 0,
    order: 'desc',
    orderby: 'date',
    count: orders.length,
  };
  const [paging, setPaging] = useState(initPaging);
  const { wrap, box, root, table, container } = useStyles();
  const { order, orderby, limit, offset, count } = paging;

  const setLoader = async <T extends any>(doSomething: T) => {
    setLoading(true);
    const res = await doSomething;
    setLoading(false);
    return res;
  };

  const setToastMsg = (toast: TypicalResponseType) => {
    setToast(toast);
    setTimeout(() => {
      setToast({ type: toast.type, msg: '' });
    }, 3000);
  };

  const getOrdersList = async (sayHi = false) => {
    const list = await setLoader(getList({ ...paging, id }));
    if ('type' in list) setToastMsg(list);
    else if (!list.length) {
      const toast: TypicalResponseType = {
        type: 'warning',
        msg: `Hi, ${name}, you haven't orders`,
      };
      setToastMsg(toast);
    } else {
      const data: MasterOrdersList[] = [];
      list.forEach(
        ({ id, c, s, date, begin, finish, rating, completed, photos }) => {
          const dataForList = {
            id,
            customer: c?.fullName,
            userEmail: c?.email,
            service: s?.service,
            price: s?.price,
            date,
            begin,
            finish,
            rating,
            completed,
            photos,
          };
          data.push(dataForList);
        }
      );
      setOrders(data);
      const toast: TypicalResponseType = {
        type: 'success',
        msg: `Hi, ${name}, you have ${data.length} orders. `,
      };
      sayHi && setToastMsg(toast);
      if (list.length !== paging.count)
        setPaging((paging) => ({ ...paging, count: list.length }));
    }
  };

  useEffect(() => {
    if (!loading) {
      getOrdersList(true);
    }
  }, []);

  const setChange = async (data: Paging) => {
    setPaging((paging) => ({ ...paging, ...data }));
  };

  useEffect(() => {
    getOrdersList();
  }, [paging]);

  const changeStatus = async (data: ChangeStatus) => {
    const result = await setLoader(setDone(data.id));
    setToastMsg(result);
    if (result.type !== 'error') {
      getOrdersList();
      const ratingRequest = await sendRatingMail(data);
      console.log(ratingRequest);
    }
  };

  const getPdf = useCallback(async (id: number) => {
    const pdf = await setLoader(getOrdersReceipt(id));
    if (pdf instanceof Blob) {
      const url = URL.createObjectURL(pdf);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'receipt.pdf';
      a.click();
    } else setToastMsg(pdf);
  }, []);

  const headerProps = { columns, order, orderby, setChange };
  const paginatorProps = {
    option: { limit, offset, count },
    setPaging: setChange,
  };

  const masterListProps = {
    data: orders,
    columns,
    change: changeStatus,
    getZip: getOrdersPhoto,
    getPdf,
  };

  return (
    <Container className={container}>
      <Loader loading={loading} />
      <Box className={wrap}>
        <Box className={box}>
          <Toast toast={toast} />
        </Box>
        <TableContainer component={Paper} className={root}>
          <Table className={table} aria-label={`table`}>
            <MasterTableHead {...headerProps} />
            <TableBody>
              <MasterTableList {...masterListProps} />
            </TableBody>
            <TableFooter>
              <Pagination {...paginatorProps} />
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};
