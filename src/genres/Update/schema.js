import * as yup from "yup";

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().nullable(),
  status: yup.number().positive().integer().min(0).max(1).required(),
  is_deleted: yup.boolean(),
  // categories: yup.string().required()
  categories: yup.array().of(yup.string()).min(1).required(),
}).required();

export default schema