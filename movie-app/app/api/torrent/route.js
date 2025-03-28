import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import ffmpeg from "fluent-ffmpeg";
import { PassThrough } from "stream";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        var moviePath = searchParams.get("movie-path");
        moviePath= `https://1337x.to/torrent${moviePath}`
        
        const response = await fetch(moviePath, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch the page");
        }

        const html = await response.text();
        const $$ = cheerio.load(html);
        
        const magnetUri = $$("#openPopup").attr("href");
        if (!moviePath) {
            return NextResponse.json({ error: "moviepath is required" }, { status: 400 });
        }

        console.log(`Fetching stream for: ${magnetUri}`);
        return NextResponse.json({ message: magnetUri  }, { status: 200 });

    } catch (error) {
        console.error("Unexpected Error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}

