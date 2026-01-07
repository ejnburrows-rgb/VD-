import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const { videoId } = await request.json();
    if (!videoId) {
      return NextResponse.json({ error: "videoId required" }, { status: 400 });
    }

    const url = `https://www.youtube.com/watch?v=${videoId}`;

    const r = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept-Language": "en-US,en;q=0.8,es;q=0.8"
      }
    });

    const html = await r.text();

    // return first 100k characters so we can capture captions JSON
    return NextResponse.json({
      partialHtml: html.slice(0, 100000)
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}
