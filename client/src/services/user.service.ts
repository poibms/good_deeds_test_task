import { UserType, userUpdateCreds } from './../types/types';
import { $authHost } from "./intex";
import localStorageService from "./localStorage.service";


const userService = {

  getAllUsers: async () => {
    const { data } = await $authHost.get('/user/');
    console.log(data);
    const { username } = localStorageService.getUserData();
    return data.filter((user: UserType) => user.username !== username);
  },

  updateUserData: async (userUpdateCreds: userUpdateCreds) => {
    const { data } = await $authHost.put('/user/', userUpdateCreds);
    return data;
  }
}

export default userService;