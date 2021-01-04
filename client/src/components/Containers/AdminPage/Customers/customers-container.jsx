import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { BasicTable } from "../../../Common/table/basic-table";
import BasicTableHead from "../../../Common/table/basic-table-head";
import CustomersForm from "./customers-form";
import {
  containerDispatchProps,
  containerStateProps,
} from "../../utils/props-selector";
import { Loader } from "../../../Common/loader";
import { Pagination } from "../../../Common/table/pagination";

const subj = "customers";
const mapStateToProps = containerStateProps(subj);
const mapDispatchToProps = containerDispatchProps(subj);

const CustomersContainer = (props) => {
  const {
    items,
    columns,
    editState,
    remove,
    push,
    toast,
    loading,
    setPaging,
    paging,
  } = props;

  const { limit, offset, count, orderby, order } = paging;
  const optionPagn = { limit, offset, count };
  const headProps = { columns, push };
  const pagingProps = { option: optionPagn, setPaging };

  const tableProps = {
    items,
    columns,
    push,
    editState,
    remove,
    toast,
    pagination: <Pagination {...pagingProps} />,
    header: editState ? <CustomersForm /> : <BasicTableHead {...headProps} />,
  };

  return (
    <>
      <Loader loading={loading} />
      <BasicTable {...tableProps} />
    </>
  );
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  CustomersContainer
);
