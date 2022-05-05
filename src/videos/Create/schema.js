import * as yup from "yup";



// .test(
//   "fileFormat",
//   "Unsupported Format",
//   value => !value || (value => value && SUPPORTED_FORMATS.includes(value.type))
// ),

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  year_launched: yup.number().required(),
  duration: yup.number().required(),
  rating: yup.string().max(1).required(),
  categories: yup.array().of(yup.string()).min(1).required(),
  genres: yup.array().of(yup.string()).min(1).required()
}).required();

export default schema