import React from "react";
import { BasicTable } from "../../../Common/table/basic-table";
import BasicTableHead from "../../../Common/table/basic-table-head";
import { compose } from "redux";
import { connect } from "react-redux";
import ServicesForm from "./services-form";
import {
  containerDispatchProps,
  containerStateProps,
} from "../../utils/props-selector";
import { Loader } from "../../../Common/loader";
import { Pagination } from "../../../Common/table/pagination";

const subj = "services";
const mapStateToProps = containerStateProps(subj);
const mapDispatchToProps = containerDispatchProps(subj);

const ServicesContainer = (props) => {
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
  const headProps = { columns, push, order, orderby, setChange: setPaging };
  const pagingProps = { option: optionPagn, setPaging };

  const tableProps = {
    items,
    columns,
    push,
    editState,
    remove,
    toast,
    pagination: <Pagination {...pagingProps} />,
    header: editState ? <ServicesForm /> : <BasicTableHead {...headProps} />,
  };

  return (
    <>
      <Loader loading={loading} />
      <BasicTable {...tableProps} />
    </>
  );
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  ServicesContainer
);
