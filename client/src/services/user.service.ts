import { UserType, userUpdateCreds } from './../types/types';
import { $authHost } from "./intex";
import localStorageService from "./localStorage.service";


const userService = {

  getAllUsers: async () => {
    const { data } = await $authHost.get('/user/');
    console.log(data);
    const { username } = localStorageService.getUserData();
    // return data.filter((user: UserType) => user.username !== username);
    return data;
  },

  updateUserData: async (userUpdateCreds: userUpdateCreds) => {
    const { data } = await $authHost.put('/user/', userUpdateCreds);
    return data;
  },

  deleteAcc: async () => {
    const {data} = await $authHost.delete('/user/');
    console.log( data.message )
  },

  addFriend: async (id: string) => {
    const {data} = await $authHost.put('/user/addfriend', {friendId: id});
    return data
  }
}

export default userService;