import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const getFileUrl = query({
  args: { storageId: v.id("_storage") },
  async handler(ctx, args) {
    return await ctx.storage.getUrl(args.storageId);
  },
});
