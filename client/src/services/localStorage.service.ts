import { UserType } from './../types/types';
import jwt_decode from 'jwt-decode'



class LocalStorageService {

  setToken = (token: string) => {
    localStorage.setItem('accessToken', token)
  }

  removeToken = () => {
    localStorage.removeItem('accessToken')
  }

  getAccessToken = (): string | null => {
    return localStorage.getItem('accessToken');
  }

  getUserData = (): UserType => {
    const token = this.getAccessToken();
    return jwt_decode(token!)
  }
}

export default new LocalStorageService();