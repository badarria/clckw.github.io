import React from "react";
import { FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";
import { Controller } from "react-hook-form";
import { useSelectStyles } from "../../styles/styles";

export const ControlledSelect = (props) => {
  const classes = useSelectStyles();
  const {
    control,
    data,
    defaultValue,
    name = "time",
    disabled = false,
  } = props;

  return (
    <FormControl className={classes.root}>
      <InputLabel htmlFor="trinity-select" required>
        Time
      </InputLabel>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        as={
          <Select
            id={name}
            disabled={disabled}
            inputProps={{ className: classes.input }}
          >
            {data.map(({ hour, booked }, inx) => (
              <MenuItem
                key={inx}
                value={hour}
                disabled={booked}
                MenuProps={{ classes: { list: classes.input } }}
              >
                {hour}
              </MenuItem>
            ))}
          </Select>
        }
      />
    </FormControl>
  );
};
