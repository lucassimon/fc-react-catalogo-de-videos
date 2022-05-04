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
  categories: yup.string().required(),
  genres: yup.string().required(),
  // categories: yup.array().of(yup.string()).min(1).required(),
  // genres: yup.array().of(yup.string()).min(1).required(),
  thumb_file: yup.mixed().nullable().notRequired().test( "fileSize", "File is too large",  value => {
    if (value && value.length > 0) {
      return value && value[0].size <= 2000000000
    } else {
      return true;
    }
  }),
  banner_file: yup.mixed().test( "fileSize", "File is too large",  value => {
    if (value && value.length > 0) {
      return value && value[0].size <= 2000000000
    } else {
      return true;
    }
  }),
  trailer_file: yup.mixed().test( "fileSize", "File is too large",  value => {
    if (value && value.length > 0) {
      return value && value[0].size <= 2000000000
    } else {
      return true;
    }
  }),
  video_file: yup.mixed().test( "fileSize", "File is too large",  value => {
    if (value && value.length > 0) {
      console.log(value)
      console.log(value[0].size)
      console.log(value[0].size <= 2000000000)
      return value && value[0].size <= 2000000000
    } else {
      return true;
    }
  }),
}).required();

export default schema