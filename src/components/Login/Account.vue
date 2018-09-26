<template>
  <form>
    <div class="inp-wrapper border-bottom username">
      <input type="text" placeholder="请输入账号">
    </div>
    <div class="inp-wrapper border-bottom password">
      <input type="password" placeholder="请输入密码">
    </div>
    <div class="log-btns">
      <input type="submit" value="登录" @click.prevent="selectPlatform">
      <a class="forget-pwd" href="#" @click="forgetPwd">忘记密码?</a>
      <a class="toggle-way" @click="toggleWay">手机号登录</a>
    </div>
  </form>
</template>
<script>
export default {
  name: 'Account',
  data () {
    return {}
  },
  methods: {
    // 忘记密码
    forgetPwd () {
      this.$router.push({name: 'Forget'})
    },
    // 切换登录方式
    toggleWay () {
      this.$router.push({name: 'Tel'})
    },
    // 登录成功选择平台
    selectPlatform () {
      this.$router.push({name: 'Platform'})
    }
  }
}
</script>
