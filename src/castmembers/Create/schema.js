import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required(),
  kind: yup.number().positive().integer().min(0).max(1).required(),
}).required();

export default schema