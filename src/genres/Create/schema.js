import * as yup from "yup";

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string(),
  // categories: yup.array().of(yup.string()).min(1).required(),
  categories: yup.string().required()
}).required();

export default schema