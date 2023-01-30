import { DeedCreds, UserType, userUpdateCreds } from './../types/types';
import { $authHost } from "./intex";
import localStorageService from "./localStorage.service";


const deedService = {

  getAllDeeds: async () => {
    const { data } = await $authHost.get('/posts/');
    console.log(data);
    const { username } = localStorageService.getUserData();
    return data.filter((user: UserType) => user.username !== username);
  },

  updateUserData: async (userUpdateCreds: userUpdateCreds) => {
    const { data } = await $authHost.put('/user/', userUpdateCreds);
    return data;
  },

  deleteAcc: async () => {
    const {data} = await $authHost.delete('/user/');
    console.log( data.message )
  },

  createDeed: async (payload: DeedCreds) => {
    const { data } = await $authHost.post('/posts/', payload)
    return data;
  }
}

export default deedService;