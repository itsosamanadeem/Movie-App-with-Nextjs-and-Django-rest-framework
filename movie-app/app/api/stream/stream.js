import fs from "fs";
import path from "path";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const fileName = searchParams.get("file");

        if (!fileName) {
            return new Response(JSON.stringify({ error: "Missing file parameter" }), { status: 400 });
        }

        const filePath = path.join(process.cwd(), "public", "videos", decodeURIComponent(fileName));

        if (!fs.existsSync(filePath)) {
            return new Response(JSON.stringify({ error: "File not found" }), { status: 404 });
        }

        const stat = fs.statSync(filePath);
        const fileStream = fs.createReadStream(filePath);

        return new Response(fileStream, {
            headers: {
                "Content-Type": "video/mp4",
                "Content-Length": stat.size,
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
}
