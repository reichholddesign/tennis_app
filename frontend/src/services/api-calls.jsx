import axios from "axios";

export async function getData(url, accessToken, user_id) {
  return axios
    .get(
      `${import.meta.env.VITE_API_SERVER_URL}/${encodeURI(user_id)}/${url}`,
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

export async function postData(url, data, accessToken) {
  return axios
    .post(
      `${import.meta.env.VITE_API_SERVER_URL}/${encodeURI(user_id)}/${url}`,
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
export async function putData(url, data, accessToken, user_id) {
  return axios
    .put(
      `${import.meta.env.VITE_API_SERVER_URL}/${encodeURI(user_id)}/${url}`,
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
export async function deleteData(url, accessToken) {
  return axios
    .delete(
      `${import.meta.env.VITE_API_SERVER_URL}/${encodeURI(user_id)}/${url}`,
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
