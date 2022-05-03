import * as yup from "yup";

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string(),
}).required();

export default schema