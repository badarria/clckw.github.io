import * as yup from "yup";

const citiesSchema = yup.object().shape({
	name: yup.string().required(),
});