import { NextResponse } from "next/server";

async function resolveChannelId(apiKey: string, channelIdOrHandle: string): Promise<string | null> {
  if (channelIdOrHandle.startsWith("UC")) return channelIdOrHandle;
  const handle = channelIdOrHandle.startsWith("@") ? channelIdOrHandle.slice(1) : channelIdOrHandle;
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${handle}&key=${apiKey}`,
    { next: { revalidate: 86400 } }
  );
  const data = await res.json();
  return data.items?.[0]?.id ?? null;
}

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelIdOrHandle = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelIdOrHandle) {
    return NextResponse.json({ isLive: false, liveVideoId: null, videos: [] });
  }

  try {
    const channelId = await resolveChannelId(apiKey, channelIdOrHandle);
    if (!channelId) {
      return NextResponse.json({ isLive: false, liveVideoId: null, videos: [] });
    }

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
