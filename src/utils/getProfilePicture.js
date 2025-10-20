export const getProfilePicture = (fileName) => {
  const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

  return fileName ? IMAGE_URL + fileName : "/img/profile-default.jpg";
};
