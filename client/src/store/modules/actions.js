export const Actions = {
  signIn: ({commit}, payload) => {
    axios.post('http://localhost:3000/signIn', {
      username: payload.username,
      password: payload.password
    })
    .then(response => {
      console.log('Action SignIn');
      console.log(response.data);
      commit('signIn', response.data)
    })
    .catch(error => {
      console.log(error);
    })
  },
  signUp: ({commit}, payload) => {
    axios.post('http://localhost:3000/signUp', {
      name: payload.name,
      username: payload.username,
      password: payload.password,
      email: payload.email
    })
    .then(response => {
      console.log('Action SignUp');
      console.log(response.data);
      commit('signUp', response.data)
    })
    .catch(error => {
      console.log(error);
    })
  }
}