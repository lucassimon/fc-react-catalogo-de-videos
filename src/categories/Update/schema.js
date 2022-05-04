import * as yup from "yup";

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string(),
  status: yup.number().positive().integer().min(0).max(1).required(),
  is_deleted: yup.boolean(),
}).required();

export default schema