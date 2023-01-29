import { AuthCreds } from './../types/types';
import { $host } from './intex';



const authService = {
  signUp: async (payload: AuthCreds) => {
    const { data } = await $host.post(`/auth/signup`, payload);
    return data;
  },
  signIn: async (payload: AuthCreds) => {
    console.log('check');
    const { data } = await $host.post(`/auth/signin`, payload);
    return data;
  },
};

export default authService;


