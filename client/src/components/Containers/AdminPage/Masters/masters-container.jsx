import React from "react";
import { BasicTable } from "../../../Common/table/basic-table";
import BasicTableHead from "../../../Common/table/basic-table-head";
import { compose } from "redux";
import { connect } from "react-redux";
import MastersForm from "./masters-form";
import {
  containerDispatchProps,
  containerStateProps,
} from "../../utils/props-selector";
import { Loader } from "../../../Common/loader";
import { Pagination } from "../../../Common/table/pagination";

const subj = "masters";
const mapStateToProps = containerStateProps(subj);
const mapDispatchToProps = containerDispatchProps(subj, true);

const MastersContainer = (props) => {
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

  const headProps = { columns, push };
  const pagingProps = { paging, setPaging };

  const tableProps = {
    items,
    columns,
    push,
    editState,
    remove,
    toast,
    pagination: <Pagination {...pagingProps} />,
    header: editState ? <MastersForm /> : <BasicTableHead {...headProps} />,
  };

  return (
    <>
      <Loader loading={loading} />
      <BasicTable {...tableProps} />
    </>
  );
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  MastersContainer
);
