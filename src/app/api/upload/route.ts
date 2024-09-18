import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file)
      return Response.json({ message: "Missing file" }, { status: 400 });

    const fileBlob = file instanceof Blob ? file : new Blob([file]);
    const uploadUrl = await fetchMutation(api.files.generateUploadUrl);

    const result = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": fileBlob.type },
      body: fileBlob,
    });
    console.log(result);
    if (!result.ok) throw new Error("Failed to upload file");
    const { storageId } = await result.json();

    const fileUrl = await fetchQuery(api.files.getFileUrl, { storageId });
    if (!fileUrl) throw new Error("Failed to retrieve file URL");

    return Response.json(
      { message: "File uploaded successfully", fileUrl },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Error uploading file", error: error },
      { status: 500 }
    );
  }
}
