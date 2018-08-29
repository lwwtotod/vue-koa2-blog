<template>
  <div class="container">

    <Form ref="user"
          class="login-form"
          :model="user"
          :rules="ruleInline"
          inline>
      <h2 class="title">
        登陆
      </h2>
      <FormItem prop="username">
        <Input type="text"
               v-model="user.username"
               placeholder="Username">
        <Icon type="ios-person-outline"
              slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password"
               v-model="user.password"
               placeholder="Password">
        <Icon type="ios-lock-outline"
              slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem class="form-botton">
        <Button type="primary"
                class='reg-button'
                @click="toSignup()">注册</Button>
        <Button type="primary"
                class='login-button'
                @click="Login('user')">登陆</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { USER_SIGNIN } from '@/store/mutations-type'
import { mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      ruleInline: {
        username: [
          { required: true, message: '请输入用户', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '请输入不小于6位数字的密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions([
      'UserLogin',
    ]),
    ...mapMutations([
      USER_SIGNIN
    ]),
    Login(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.UserLogin(this.user).then(res => {
            if (res.data.success) {
              this.$router.replace({
                path: '/admin'
              })
              this.USER_SIGNIN(res.data.token)
            } else {
              this.$Message.error(res.data.info)
            }
          }).catch(error => {
            this.$Message.error(`登陆失败,请联系管理员${error}`)
          })
        } else {
          this.$Message.error('请输入账号与密码');
        }
      })
    },
    toSignup() {
      this.$router.push({ path: '/signup' })
    }
  }
}
</script>

<style  lang="stylus" scoped>
.container
  margin 0
  background-color #4c4c4c
  min-width 680px
  position absolute
  top 0
  bottom 0
  left 0
  right 0

  .title
    text-align center
    margin 0px auto
    text-align center
    color #505458

.login-form, .reg-form
  border-radius 5px
  background-color #f9fafc
  margin 150px auto 20px auto
  box-shadow 0 10 10 #eee
  width 25rem
  padding 20px 20px 10px 20px
  opacity 1

  .form-botton
    display flex
    justify-content space-between

    .reg-button
      margin-right 30px
</style>
