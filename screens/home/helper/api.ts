import { axiosPrivate } from "../../../helper/axiosPrivate";

export async function fetchAllAlbums(): Promise<Album[]> {
  const res = await axiosPrivate.get("/album/");
  return res.data;
}

export async function createAlbum(album: { cover: string; title: string }) {
  const blob = new Blob(["data:image/jpeg;base64," + album.cover], {
    type: "image/jpeg",
    lastModified: 100,
  });
  const formData = new FormData();
  if (blob) {
    formData.append("cover", blob);
  }
  formData.append("title", album.title);
  return axiosPrivate.post("/album-create/?format=json", formData);
}

export async function deleteAlbum(albumId: number) {
  return axiosPrivate.delete(`/album/${albumId}?format=json`);
}
