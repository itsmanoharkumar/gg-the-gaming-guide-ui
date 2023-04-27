import axios from "axios";

const YOUTUBE_PLAYLIST_ITEMS_API =
  "https://www.googleapis.com/youtube/v3/playlistItems";

export async function getYoutubePlaylistApi() {
  const res = await axios.get(
    `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=PLoaTLsTsV3hNzLvt4ql92nn1QT_SbrG2C&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
  );
  return res.data;
}
