<template>
  <div class="container">
    <Form ref="user"
          class="login-form"
          :model="user"
          :rules="ruleInline"
          inline>
      <h2 class="title">
        注册
      </h2>
      <FormItem prop="username">
        <Input type="text"
               v-model="user.username"
               placeholder="username">
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
      <FormItem prop="passwordAgain">
        <Input type="password"
               v-model="user.passwordAgain"
               placeholder="Enter password again">
        <Icon type="ios-lock-outline"
              slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem class="form-botton">
        <Button type="primary"
                class='login-button'
                @click="toLogin()">登陆</Button>
        <Button type="primary"
                class='reg-button'
                @click="singUp()">注册</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { USER_REG } from '@/store/mutations-type'
import { mapActions, mapMutations } from 'vuex'
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入你的密码'));
      } else {
        if (this.user.passwordAgain !== '') {
          // 对第二个密码框单独验证
          this.$refs.user.validateField('passwordAgain');
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入您的密码'));
      } else if (value !== this.user.password) {
        callback(new Error('这两个输入密码不匹配！'));
      } else {
        callback();
      }
    };
    return {
      user: {
        username: '',
        password: '',
        passwordAgain: ''
      },
      ruleInline: {
        username: [
          { required: true, message: '请输入用户', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        passwordAgain: [
          { validator: validatePassCheck, trigger: 'blur' }
        ],
      },
    }
  },
  methods: {
    ...mapMutations([
      USER_REG
    ]),
    ...mapActions([
      'UserSignUp'
    ]),
    singUp() {
      this.$refs.user.validate(valid => {
        if (valid) {
          let user = {
            username: this.user.username,
            password: this.user.password
          }
          this.UserSignUp(user).then(res => {
            if (res.data.success) {
              this.USER_REG(res.data.token)
              this.$router.replace({
                path: '/admin'
              })
              this.$Message.success('注册成功!')
            } else {
              this.$Message.error(res.data.info)
            }
          }).catch(
            this.$Message.error(res.data.info)
          )
        } else {
          this.$Message.error('请检查输入的信息')
          return false
        }
      })
    },
    toLogin() {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style lang="stylus" scoped>
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

    .login-button
      margin-right 30px
</style>
