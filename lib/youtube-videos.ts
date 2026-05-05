export const DEVIN_YOUTUBE_CHANNEL_URL = "https://youtube.com/@devinschumacher1";

export type DevinYoutubeVideo = {
  title: string;
  thumbnail: string;
  url: string;
  platform: "youtube";
  duration: string;
};

export const devinYoutubeVideos: DevinYoutubeVideo[] = [
  youtubeVideo({
    id: "OjdabspScTY",
    title: "How to Download Circle.so Videos for Free (HLS / m3u8 Streams)",
    duration: "3:09",
  }),
  youtubeVideo({
    id: "flv3b3bGQDQ",
    title: "Loom Video Downloader Instructions | How to Download Loom Videos",
    duration: "2:40",
  }),
  youtubeVideo({
    id: "KeHqIErqLJA",
    title: "Sprout Video Downloader Extension Demo | Download Sprout Videos – Any Type, From Any Site",
    duration: "1:03",
  }),
  youtubeVideo({
    id: "DX2Lr4hySpg",
    title: "How to Download WHOP Videos for Free | Step by Step Guide to Downloading Videos from whop.com",
    duration: "3:33",
  }),
  youtubeVideo({
    id: "SVtC2W4GYBc",
    title: "How to Download Vimeo Videos for Free (HLS Streams / http live stream)",
    duration: "9:48",
  }),
  youtubeVideo({
    id: "jHtHkm9uGqU",
    title: "How to Download Vimeo Videos for Free (Mac & Windows) | No Extensions/Tools Needed (WINDOWS VERSION)",
    duration: "10:08",
  }),
  youtubeVideo({
    id: "ry3iQx37hZQ",
    title: "Download Vimeo Videos (Private or Public) with Browser Extension (Chrome, Firefox, Edge, Opera)",
    duration: "2:14",
  }),
  youtubeVideo({
    id: "RjO0NivCiY0",
    title: "Download Any Vimeo Video Easily (on Public or Private Web Pages) | Vimeo Video Downloader v2.0.0",
    duration: "3:00",
  }),
  youtubeVideo({
    id: "eXs51yL6UgQ",
    title: "How to Download Vimeo Videos for Free (Mac & Windows) | No Extensions/Tools Needed (MAC VERSION)",
    duration: "3:28",
  }),
  youtubeVideo({
    id: "g7aEw_aHnoM",
    title: "How to Download Whop Videos for Free (Chrome Extension Method)",
    duration: "3:46",
  }),
  youtubeVideo({
    id: "AxJSxDGUMt0",
    title: "How to Download Thinkific Course Videos for Free (Chrome Extension Method)",
    duration: "3:57",
  }),
  youtubeVideo({
    id: "e3Dlc87QDmA",
    title: "How to Download GoKollab Course Videos for Free (Chrome Extension Method)",
    duration: "3:55",
  }),
  youtubeVideo({
    id: "1ktvV0BfBEI",
    title: "How to Download GoHighLevel Videos for Free (Chrome Extension Method)",
    duration: "3:22",
  }),
  youtubeVideo({
    id: "lwDK2jEYbA8",
    title: "How to Download Sprout Videos for Free (Chrome Extension Method)",
    duration: "3:57",
  }),
  youtubeVideo({
    id: "12BpS16ETls",
    title: "How to Download ClientClub Course Videos for Free (Chrome Extension Method)",
    duration: "4:25",
  }),
  youtubeVideo({
    id: "EcEWGobXAQU",
    title: "How to Download Circle Videos for Free (Chrome Extension Method)",
    duration: "3:35",
  }),
  youtubeVideo({
    id: "ujWUiJxk614",
    title: "How to Download Skool Videos Free - Demo Step by Step Instructions",
    duration: "3:46",
  }),
  youtubeVideo({
    id: "H4nU0cTm8TY",
    title: "How to Download Wistia Videos for Free (Chrome Extension Method)",
    duration: "3:32",
  }),
  youtubeVideo({
    id: "SZY_13gQIa0",
    title: "How to Download Loom Videos for Free (Chrome Extension Method)",
    duration: "3:18",
  }),
  youtubeVideo({
    id: "NV_g1ijqxLA",
    title: "How to Download Vimeo Videos for Free (Chrome Extension Method)",
    duration: "3:12",
  }),
];

function youtubeVideo({
  id,
  title,
  duration,
}: {
  id: string;
  title: string;
  duration: string;
}): DevinYoutubeVideo {
  return {
    title,
    thumbnail: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    url: `https://www.youtube.com/watch?v=${id}`,
    platform: "youtube",
    duration,
  };
}
