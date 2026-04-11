"use server";
import { redirect } from "next/navigation";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { uploadImage } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";
export async function createPost(prevState, formData) {
  const title = formData.get("title");
  const content = formData.get("content");
  const image = formData.get("image");
  console.log(image); // 👈 تأكد مش null

  const errors = [];
  if (!title || title.trim() === "") {
    errors.push("Title is required");
  }
  if (!content || content.trim() === "") {
    errors.push("Content is required");
  }
  if (!image || image.size === 0) {
    errors.push("Image is required");
  }

  if (errors.length > 0) {
    return { errors };
  }

  let imageUrl;

  try {
    imageUrl = await uploadImage(image);
    console.log("Image uploaded successfully:", imageUrl);
  } catch (error) {
    console.error("Image upload failed:", error);
    throw new Error("Image upload failed...");
  }
  await storePost({ imageUrl, title, content, userId: 1 });
  revalidatePath("/", "layout");
  redirect("/feed");
}

export async function togglePostLikeStatus(postId) {
  await updatePostLikeStatus(postId, 2);
  revalidatePath("/", "layout");
}
