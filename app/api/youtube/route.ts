import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    return NextResponse.json({ isLive: false, liveVideoId: null, videos: [] });
  }

  try {
    const [liveRes, videosRes] = await Promise.all([
      fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`,
        { next: { revalidate: 30 } }
      ),
      fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&order=date&maxResults=8&key=${apiKey}`,
        { next: { revalidate: 300 } }
      ),
    ]);

    const [liveData, videosData] = await Promise.all([
      liveRes.json(),
      videosRes.json(),
    ]);

    const isLive = (liveData.items?.length ?? 0) > 0;
    const liveVideoId = isLive ? liveData.items[0].id.videoId : null;
    const videos = videosData.items ?? [];

    return NextResponse.json({ isLive, liveVideoId, videos });
  } catch {
    return NextResponse.json({ isLive: false, liveVideoId: null, videos: [] });
  }
}
