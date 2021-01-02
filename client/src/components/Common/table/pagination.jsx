import { TablePagination } from "@material-ui/core";
import React from "react";

export const Pagination = (props) => {
  const { paging, setPaging } = props;
  const { itemsPerPage, offset, orderBy, order } = paging;

  const changeOffset = (event, page) => {
    console.log(event, page);
    const data = {
      itemsPerPage,
      offset: page * itemsPerPage - 1,
      orderBy,
      order,
    };
    setPaging(data);
  };

  const changeItemsPerPage = (event) => {
    const data = {
      itemsPerPage: event.target.value,
      offset: 0,
      orderBy,
      order,
    };
    setPaging(data);
  };

  const page = (offset + 1) / itemsPerPage;

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25, { label: "All", value: "all" }]}
      count={10}
      rowsPerPage={itemsPerPage}
      page={page}
      SelectProps={{
        inputProps: { "aria-label": "rows per page" },
        native: true,
      }}
      onChangePage={changeOffset}
      onChangeRowsPerPage={changeItemsPerPage}
    />
  );
};
