import { NextResponse } from "next/server";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const movie_name = encodeURIComponent(searchParams.get("query"));

        if (!movie_name) {
            return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
        }

        const searchUrl = `https://1337x.to/search/${movie_name}/1/`;

        const response = await fetch(searchUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch the page");
        }

        const html = await response.text();
        const $ = cheerio.load(html);
        let results = [];

        $("tbody tr").each((index, element) => {
            const title = $(element).find(".coll-1 a").text().trim();
            const url = "https://1337x.to" + $(element).find("a:not([class])").attr("href");
            const seeds = $(element).find(".coll-2").text().trim();
            const leeches = $(element).find(".coll-3").text().trim();
            const size = $(element).find(".coll-4").text().trim();
            const year = new Date().getFullYear(); 

            if (title && url) {
                results.push({ title, seeds, leeches, size, url, year });
            }
        });

        if (results.length === 0) {
            return NextResponse.json({ message: "No results found" }, { status: 404 });
        }

        return NextResponse.json({ results });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
