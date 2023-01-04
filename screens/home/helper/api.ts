import { axiosPrivate } from "../../../helper/axiosPrivate";

export async function fetchAllAlbums(): Promise<Album[]> {
  const res = await axiosPrivate.get("/album/");
  return res.data;
}

export async function createAlbum(album: { cover: string; title: string }) {
  const formData = new FormData();
  formData.append("cover", album.cover);
  formData.append("title", album.title);
  console.log(album);
  return axiosPrivate.post("/album-create/?format=json", formData);
}

export async function deleteAlbum(albumId: number) {
  return axiosPrivate.delete(`/album/${albumId}?format=json`);
}
