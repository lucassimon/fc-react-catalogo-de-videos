import * as yup from "yup";

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().nullable(),
  categories: yup.array().of(yup.string()).min(1).required(),
}).required();

export default schema