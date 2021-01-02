import React from "react";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import { ControlledAutocomplete } from "./controlled-autocomplete";
import { useFieldStyles } from "../../styles/styles";

const FormFieldsGenerator = (props) => {
  const { data, register, control, errors, defaultValues } = props;
  const labels = Object.keys(data);
  const classes = useFieldStyles();

  return (
    <>
      {labels.map((label, inx) => {
        return Array.isArray(data[label]) ? (
          <ControlledAutocomplete
            key={inx}
            control={control}
            name={label}
            data={data[label]}
            defaultValue={defaultValues[label]}
          />
        ) : (
          <TextField
            className={classes.fields}
            defaultValue={defaultValues[label]}
            label={label}
            name={label}
            InputLabelProps={{ className: classes.label }}
            inputProps={{
              readOnly: label === "id",
              className: `${label === "id" ? classes.idInput : null} ${
                classes.input
              }`,
            }}
            error={!!errors[label]}
            helperText={errors[label]?.message || ""}
            key={inx}
            autoComplete="nope"
            required={label !== "id"}
            inputRef={register}
            FormHelperTextProps={{ className: classes.helperText }}
          />
        );
      })}
    </>
  );
};

FormFieldsGenerator.propTypes = {
  data: PropTypes.object.isRequired,
  accept: PropTypes.func,
  cancel: PropTypes.func,
  state: PropTypes.any,
};

export default FormFieldsGenerator;
