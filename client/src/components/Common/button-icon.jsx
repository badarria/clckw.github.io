import { IconButton, Tooltip } from "@material-ui/core";
import React from "react";

export const ButtonIcon = (props) => {
  const { title, icon, onClick, disabled = false, type = "button" } = props;

  return (
    <Tooltip title={title}>
      <span>
        <IconButton onClick={onClick} disabled={disabled} type={type}>
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
};
