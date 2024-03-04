import axios from "axios";

export async function getData(url, accessToken) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_SERVER_URL}${url}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    // Re-throw the error to let the caller handle it
    throw error.response.data.message;
  }
}

export async function postData(url, data, accessToken) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_SERVER_URL}${url}`,
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    // Re-throw the error to let the caller handle it
    throw error;
  }
}

export async function putData(url, data, accessToken) {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_SERVER_URL}${url}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    // Re-throw the error to let the caller handle it
    throw error.response.data.message;
  }
}

export async function deleteData(url, accessToken) {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_SERVER_URL}${url}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    // Re-throw the error to let the caller handle it
    throw error;
  }
}
