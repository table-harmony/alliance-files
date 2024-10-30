import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
  path: "/generateUploadUrl",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const uploadUrl = await ctx.storage.generateUploadUrl();
    return new Response(JSON.stringify({ uploadUrl: uploadUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
});

http.route({
  path: "/getFileUrl",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const url = new URL(request.url);
    const storageId = url.searchParams.get("storageId");

    if (!storageId) {
      return new Response(
        JSON.stringify({ error: "Missing storageId parameter" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    try {
      const fileUrl = await ctx.storage.getUrl(storageId);
      return new Response(JSON.stringify({ fileUrl }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error getting file URL:", error);
      return new Response(JSON.stringify({ error: "Error getting file URL" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }),
});

export default http;
