import React, { useEffect } from "react";
import { Paper, Box, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import FormFieldsGenerator from "../../Common/form/form-fields-generator";
import { compose } from "redux";
import { connect } from "react-redux";
import { getFormDataState } from "../../../middleware/state-selectors";
import {
  changeHours,
  checkCustomer,
  findMasters,
  getInitState,
  setOrderData,
} from "../../../middleware/home/home-client-thunks";
import { ControlledDatePicker } from "../../Common/form/controlled-date-picker";
import { ControlledSelect } from "../../Common/form/controlled-select";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../../validation/home-schema";
import { useSearchFormStyles } from "../../styles/styles";
import Typography from "@material-ui/core/Typography";
import { getBeginEnd } from "../../../middleware/utils/datetime-func";

export const MainSearchForm = (props) => {
  const classes = useSearchFormStyles();

  const {
    data,
    initState,
    changeHours,
    findMasters,
    checkCustomer,
    setOrderData,
  } = props;
  const { fields, date, hours } = data;

  useEffect(() => {
    if (fields.city === "" && fields.service === "") {
      initState();
    }
  }, []);

  const defaultValues = {
    name: "",
    surname: "",
    email: "",
    city: { id: null, name: "" },
    service: { id: null, name: "", time: "" },
    date: date,
    hours: "",
  };

  const { register, handleSubmit, control, watch, reset, errors } = useForm({
    resolver: yupResolver(schema.form),
    defaultValues,
  });
  const service = watch("service");

  useEffect(() => {
    if (service?.time) {
      changeHours(service.time);
    }
  }, [service]);

  const fieldsProps = {
    data: fields,
    register,
    control,
    classes,
    errors,
    defaultValues,
  };

  const submit = async (data) => {
    const { name, surname, email, service, city, date, hours } = data;
    const { begin, end } = getBeginEnd(date, hours, service.time);
    const res = await findMasters({ city: city.id, begin, end });
    if (res) {
      setOrderData({ service: service.id, begin, end });
      checkCustomer({ name, surname, email });
    }
  };

  return (
    <Paper className={classes.container}>
      <Typography align="center">
        Enter your details, city, and size of the watch that needs to be
        repaired.
      </Typography>
      <Typography align="center">
        {" "}
        Select a comfy date and time and we will find free masters for you.{" "}
      </Typography>
      <form
        onSubmit={handleSubmit((data) => submit(data))}
        className={classes.form}
        onReset={() => reset(defaultValues)}
      >
        <Box className={classes.wrap}>
          <FormFieldsGenerator {...fieldsProps} />
          <ControlledDatePicker control={control} />
          <ControlledSelect control={control} data={hours || []} name="hours" />
        </Box>
        <Box className={classes.wrap}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.btn}
          >
            Find Master
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  data: getFormDataState(state),
});

const mapDispatchToProps = (dispatch) => {
  return {
    initState: () => dispatch(getInitState),
    changeHours: (service_time) => dispatch(changeHours(service_time)),
    findMasters: (data) => dispatch(findMasters(data)),
    checkCustomer: (data) => dispatch(checkCustomer(data)),
    setOrderData: (data) => dispatch(setOrderData(data)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  MainSearchForm
);