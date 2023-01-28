const LocalStorageService = {

  setToken: (token: string) => {
    localStorage.setItem('accessToken', token)
  },

  removeToken: () => {
    localStorage.removeItem('accessToken')
  }
}

export default LocalStorageService;