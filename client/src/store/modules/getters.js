export const Getters = {
  isLogin: (state) => {
    return window.localStorage.getItem('token')
  }
}