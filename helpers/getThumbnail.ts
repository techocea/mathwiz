export const getThumbnail = (url: string) => {
  // If it's a Cloudinary URL, convert it to a JPG thumbnail
  if (url.includes("cloudinary.com")) {
    // This replaces the extension and adds 'so_auto' to pick an intelligent frame
    return url
      .replace("/video/upload/", "/video/upload/so_1,q_auto,f_jpg/")
      .replace(/\.[^/.]+$/, ".jpg");
  }

  return "https://placehold.co";
};
