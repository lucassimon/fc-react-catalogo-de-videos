import apiClient from "../../http-client";

const Service = {

  paginated(page) {
    const url = `/v1/videos/?page=${page}`;
    let params = {};

    const headers = {  };
    return apiClient.get(url, { params, headers });
  },
};

export default Service;
