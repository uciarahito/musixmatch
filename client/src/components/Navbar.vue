<template lang="html">
  <div>
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">Musix Match</el-menu-item>
      <div class="auth_button" v-show="statusLogin == null">
        <el-menu-item index="1" @click="signInDialog">SignIn</el-menu-item>
        <el-menu-item index="1" @click="signUpDialog">SignUp</el-menu-item>
      </div>
      <div class="auth_button" v-show="statusLogin">
        <el-menu-item index="1" @click="signOut">SignOut</el-menu-item>
      </div>
    </el-menu>
    <el-dialog title="SignUp" v-model="dialogFormVisibleSignup">
      <el-form :model="form_signup">
        <el-form-item>
          <el-input v-model="form_signup.name" placeholder="Name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form_signup.username" placeholder="Username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form_signup.password" placeholder="Password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form_signup.email" placeholder="Email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleSignup = false">Cancel</el-button>
        <el-button type="primary" @click="signUp(form_signup);dialogFormVisibleSignup = false;notification()">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog title="SignIn" v-model="dialogFormVisibleSignin">
      <el-form :model="form_signin">
        <el-form-item>
          <el-input v-model="form_signin.username" placeholder="Username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form_signin.password" placeholder="Password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleSignin = false">Cancel</el-button>
        <el-button type="primary" @click="signIn(form_signin);dialogFormVisibleSignin = false;">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      activeIndex: '1',
      form_signup: {
        name: '',
        username: '',
        password: '',
        email: ''
      },
      form_signin: {
        username: '',
        password: ''
      },
      dialogFormVisibleSignup: false,
      dialogFormVisibleSignin: false
    };
  },
  methods: {
    ...mapActions([
      "signIn", "signUp"
    ]),
    signUpDialog(){
      this.dialogFormVisibleSignup = true
    },
    signInDialog(){
      this.dialogFormVisibleSignin = true
    },
    signOut(){
      window.localStorage.clear()
      window.location = "/"
      // this.$router.push('/')
    },
    notification() {
      this.$notify({
        title: 'Success',
        message: 'SignUp succes, you mush signin first!',
        type: 'success'
      })
    }
  },
  computed: {
    ...mapGetters({
      statusLogin: "isLogin"
    })
  }
}
</script>


<style lang="css">
  .auth_button{
    float: right;
  }
  .el-select{
    width: 100%
  }
  .el-menu{
    border: 1px solid #d9d9d9;
    width: 100%;
  }
</style>
