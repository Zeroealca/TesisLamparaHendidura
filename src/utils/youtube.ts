export const getID = (url: string) => {
  const match = url.match(
    /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=))([\w-]{10,12})($|&|\?)/
  );
  return match ? match[1] : "";
};

export const concat_url_idVideo = (id: string) => {
  return `https://www.youtube.com/embed/${id}`;
};
