<template>
  <div class="login">
    <h1>吉林省保险从业人员服务平台</h1>
    <form>
      <div class="inp-wrapper border-bottom username" key="username" v-if="!logTel">
        <input type="text" placeholder="请输入账号">
      </div>
      <div class="inp-wrapper border-bottom tel" key="tel" v-if="logTel">
        <input type="tel" placeholder="请输入手机号">
      </div>
      <div class="inp-wrapper border-bottom password" v-if="!logTel">
        <input type="password" placeholder="请输入密码" key="pwd">
      </div>
      <div class="inp-wrapper border-bottom verify-num" v-if="logTel">
        <input type="number" placeholder="请输入验证码" key="verify">
        <a href="#" @click="verify">获取验证码</a>
      </div>
      <div class="log-btn">
        <input type="submit" value="登录" @click.prevent="selectPlatform">
        <a href="#" @click="forgetPwd" v-if="!logTel">忘记密码?</a>
      </div>
      <a class="toggle" @click="toggleWay">{{logName}}</a>
    </form>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      logTel: false
    }
  },
  computed: {
    logName () {
      if (this.logTel) {
        return '账号登录'
      } else {
        return '手机号登录'
      }
    }
  },
  methods: {
    // 获取验证码
    verify () {

    },
    // 忘记密码
    forgetPwd () {

    },
    // 切换登录方式
    toggleWay () {
      this.logTel = !this.logTel
    },
    // 登录选择平台
    selectPlatform () {
      this.$router.push({name: 'SelectPlatform'})
    }
  }
}
</script>
<style lang="stylus" scoped>
.login
  width 100%
  height 100%
  font-size .26rem
  color $commonTxtColor
  bg-img(100%, 100%, left, top)
  background-image url(../../assets/images/loginbg.png)
  h1
    padding-top 2.4rem
    text-align center
    font-size .44rem
    font-weight normal
  form
    padding 1.7rem .9rem 0
    box-sizing border-box
    .inp-wrapper
      padding .58rem 0 .2rem .56rem
      position relative
      bg-img(.38rem, .38rem, left, .58rem)
      &::before
        border-color #fff
      input
        width 100%
        border none
        background none
        color $commonTxtColor
        &::placeholder
          color $commonTxtColor
      a
        position absolute
        right 0
        top .62rem
        color $commonTxtColor
      &.verify-num
        padding-right 1.5rem
        background-image url(../../assets/images/verify.png)
      &.password
        background-image url(../../assets/images/key.png)
      &.tel
        background-image url(../../assets/images/iphone.png)
      &.username
        background-image url(../../assets/images/username.png)
    .log-btn
      padding-top .9rem
      position relative
      a
        position absolute
        right 0
        top 0.3rem
        color $commonTxtColor
      input[type="submit"]
        display block
        background #758398
        width 100%
        height .84rem
        line-height .84rem
        text-align center
        color $commonTxtColor
        border-radius 25px
        font-size .32rem
    .toggle
      margin-top .8rem
      display block
      color $commonTxtColor
      text-align center
      font-size .28rem
</style>
