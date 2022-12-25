import { axiosPrivate } from "../../../helper/axiosPrivate";

export async function fetchAllAlbums(): Promise<Album[]> {
  const res = await axiosPrivate.get("/album/");
  return res.data;
}

export async function createAlbum(album: FormData) {
  return axiosPrivate.post("/album-create/?format=json", album);
}

export async function deleteAlbum(albumId: number) {
  return axiosPrivate.delete(`/album/${albumId}?format=json`);
}
