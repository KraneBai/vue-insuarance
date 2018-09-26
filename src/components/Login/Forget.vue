<template>
  <form>
    <div class="inp-wrapper border-bottom tel">
      <input type="tel" placeholder="请输入手机号">
    </div>
    <div class="inp-wrapper border-bottom verify-num">
      <input type="number" placeholder="请输入验证码" key="verify">
      <a href="#" @click="verify">获取验证码</a>
    </div>
    <div class="log-btns">
      <input type="submit" value="下一步" @click.prevent="reset">
      <a class="toggle-way" @click="toggleWay">返回登录</a>
    </div>
  </form>
</template>
<script>
export default {
  name: 'Forget',
  data () {
    return {}
  },
  methods: {
    // 获取验证码
    verify () {

    },
    // 返回账号登录
    toggleWay () {
      this.$router.push({name: 'Account'})
    },
    // 跳转到重置密码
    reset () {
      this.$router.push({name: 'Reset'})
    }
  }
}
</script>
