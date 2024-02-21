import axios from "axios";

export default async function GetUnsplashPhoto(query) {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos/random?query=${query}&count=3`,
      {
        headers: {
          Authorization: `Client-ID ${
            import.meta.env.VITE_UNSPLASH_ACCESS_KEY
          }`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    // Re-throw the error to let the caller handle it
    throw error.response.data.message;
  }
}
