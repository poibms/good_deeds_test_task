import { DeedCreds, UserType, userUpdateCreds, UpdateDeedCreds } from './../types/types';
import { $authHost } from "./intex";
import localStorageService from "./localStorage.service";


const deedService = {

  getAllDeeds: async () => {
    const { data } = await $authHost.get('/posts/');
    const { username } = localStorageService.getUserData();
    return data.filter((user: UserType) => user.username !== username);
  },

  getDeedsByOwnerId: async () => {
    const { data } = await $authHost.get('/posts/');
    return data;
  },
  updateDeedData: async (deepUpdateCreds: UpdateDeedCreds) => {
    const { data } = await $authHost.put('/posts/', deepUpdateCreds);
    return data;
  },

  deleteDeed: async (postsid: string) => {
    const {data} = await $authHost.delete(`/posts/${postsid}`);
    console.log( data.message )
  },

  createDeed: async (payload: DeedCreds) => {
    const { data } = await $authHost.post('/posts/', payload)
    return data;
  }
}

export default deedService;