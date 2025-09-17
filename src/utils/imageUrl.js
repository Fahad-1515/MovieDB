const BASE_IMAGE_URL = "https://image.tmdb.org/t/p";

export const imageUrl = {
  poster: (path, size = "w500") =>
    path ? `${BASE_IMAGE_URL}/${size}${path}` : "/placeholder-movie.jpg",

  backdrop: (path, size = "w1280") =>
    path ? `${BASE_IMAGE_URL}/${size}${path}` : "/placeholder-backdrop.jpg",

  profile: (path, size = "w185") =>
    path ? `${BASE_IMAGE_URL}/${size}${path}` : "/placeholder-profile.jpg",

  still: (path, size = "w300") =>
    path ? `${BASE_IMAGE_URL}/${size}${path}` : "/placeholder-still.jpg",
};
