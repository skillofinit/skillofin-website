/* eslint-disable @typescript-eslint/no-explicit-any */
export async function uploadImageAPI(img: any) {
  const data = new FormData();
  data.set("key", import.meta.env.VITE_IMGBB_KEY as string);
  data.append("image", img);
  
  const response = await fetch("https://api.imgbb.com/1/upload", {
    method: "post",
    body: data,
  });
  const url = await (response?.json() as any);
  return url?.data?.url;
}
