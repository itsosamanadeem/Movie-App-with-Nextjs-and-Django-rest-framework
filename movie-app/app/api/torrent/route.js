import { NextResponse } from "next/server";
import WebTorrent from "webtorrent";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url, "http://localhost:3000");
        const magnetURI = searchParams.get("magnetURI");

        if (!magnetURI) {
            return NextResponse.json({ error: "Magnet URI is required" }, { status: 400 });
        }

        console.log("Received magnet URI:", magnetURI);

        const client = new WebTorrent();

        return new Promise((resolve, reject) => {
            client.add(magnetURI, (torrent) => {
                const files = torrent.files.map((file) => ({
                    name: file.name,
                }));

                resolve(NextResponse.json({ files }));
            });
        });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}