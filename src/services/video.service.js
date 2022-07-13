import axios from "axios";
import { EXAMPLE_VIDEOS } from "../config/exampleVideos";

export const fetchingVideos = async (isVimeo, id, isJustID) => {
  try {
    //In case of youtube
    if (!isVimeo || isJustID) {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${process.env.REACT_APP_YT_SECRET_KEY}&part=snippet,contentDetails,statistics,status`
      );
      const item = response.data.items[0];

      if (item) {
        return {
          img_medium: item.snippet.thumbnails.medium.url,
          img_high: item.snippet.thumbnails.high.url,
          type: "youtube",
          id: item.id,
          title: item.snippet.title,
          likes: item.statistics.likeCount,
          views: item.statistics.viewCount,
          creation_date: item.snippet.publishedAt,
          upload_date: new Date().getTime(),
          favourite: false,
        };
        //If its justID, i dont want to return yet, i wanna also try with vimeo case below \/
      } else if (!isJustID) return false;
    }
    //In case of vimeo
    if (isVimeo || isJustID) {
      const response = await axios.get(
        `https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${id}`
      );
      return {
        //Vimeo sends only 1 type of img so its the same
        img_medium: response.data.thumbnail_url,
        img_high: response.data.thumbnail_url,
        type: "vimeo",
        id: response.data.video_id,
        title: response.data.title,
        likes: "?",
        views: "?",
        creation_date: response.data.upload_date,
        upload_date: new Date().getTime(),
        favourite: false,
      };
    }
  } catch (err) {
    //If its error i will just return false here
    return false;
  }
};

export const uploadDemoVideos = (fetchHandler) => {
  for (let i = 0; i < EXAMPLE_VIDEOS.length; i++) {
    fetchHandler(false, EXAMPLE_VIDEOS[i].id, true);
  }
};

export const addToFavourites = (video, videos, setVideos) => {
  let videoList = [...videos];

  const videoIndex = videoList.findIndex(
    (item) => item.upload_date === video.upload_date
  );
  const targetVideo = videoList[videoIndex];

  if (targetVideo.favourite === true) {
    targetVideo.favourite = false;
  } else targetVideo.favourite = true;

  setVideos(videoList);
};

export const removeItem = (video, videos, setVideos) => {
  let videoList = [...videos];

  const videoIndex = videoList.findIndex(
    (item) => item.upload_date === video.upload_date
  );

  videoList.splice(videoIndex, 1);

  setVideos(videoList);
};
