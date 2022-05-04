export const appendToArray = async (data) => {
  const new_data = {
    ...data,
    "categories": [data["categories"]]
  }

  return new_data
}