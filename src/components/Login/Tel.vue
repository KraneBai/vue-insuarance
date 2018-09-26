<template>
  <form>
    <div class="inp-wrapper border-bottom tel">
      <input type="tel" placeholder="请输入手机号">
    </div>
    <div class="inp-wrapper border-bottom verify-num">
      <input type="number" placeholder="请输入验证码">
      <a href="#" @click="verify">获取验证码</a>
    </div>
    <div class="log-btns">
      <input type="submit" value="登录" @click.prevent="selectPlatform">
      <a class="toggle-way" @click="toggleWay">账号登录</a>
    </div>
  </form>
</template>
<script>
export default {
  name: 'Tel',
  data () {
    return {}
  },
  methods: {
    // 获取验证码
    verify () {

    },
    // 切换登录方式
    toggleWay () {
      this.$router.push({name: 'Account'})
    },
    // 登录成功选择平台
    selectPlatform () {
      this.$router.push({name: 'Platform'})
    }
  }
}
</script>
