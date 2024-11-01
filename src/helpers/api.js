import axios from "axios";

export const getProductApi = async (page, limit, search) => {
  const searchQuery = search ? `&search=${search}` : "";
  return await axios
    .get(
      process.env.REACT_APP_API_URL +
        `task/products/search?page=${page}&limit=${limit}${searchQuery}`,
      { headers: { "x-api-key": process.env.REACT_APP_API_KEY } }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
