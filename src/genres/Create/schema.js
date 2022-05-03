import * as yup from "yup";

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string(),
  categories: yup.string().required(),
}).required();

export default schema