import axios from "axios";

export async function getData(url, accessToken) {
  return axios
    .get(`${import.meta.env.VITE_API_SERVER_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function postData(url, data, accessToken) {
  return axios
    .post(
      `${import.meta.env.VITE_API_SERVER_URL}${url}`,
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
