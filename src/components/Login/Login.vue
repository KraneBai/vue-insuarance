<template>
  <div class="login">
    <h1>吉林省保险从业人员服务平台</h1>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'Login'
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
.login >>>
  form
    padding 1.7rem .9rem 0
    box-sizing border-box
  .inp-wrapper
    padding .58rem 0 .2rem .56rem
    position relative
    line-height .4rem
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
    &.username
      background-image url(../../assets/images/username.png)
    &.password
      background-image url(../../assets/images/key.png)
    &.tel
      background-image url(../../assets/images/iphone.png)
    &.verify-num
      padding-right 1.5rem
      background-image url(../../assets/images/verify.png)
      a
        position absolute
        right 0
        top .62rem
        color $commonTxtColor
  .log-btns
    padding-top .9rem
    position relative
    text-align center
    .forget-pwd
      position absolute
      right 0
      top 0.3rem
      color $commonTxtColor
    input[type="submit"]
      padding 0
      width 100%
      background #758398
      height .84rem
      line-height .84rem
      color $commonTxtColor
      border-radius 25px
      font-size .32rem
      border-bottom none
    .toggle-way
      margin-top .8rem
      display inline-block
      color $commonTxtColor
      font-size .28rem
</style>
