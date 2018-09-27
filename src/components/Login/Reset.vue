<template>
  <form>
    <div class="inp-wrapper border-bottom username">
      <span>18888888888</span>
    </div>
    <div class="inp-wrapper border-bottom password">
      <input type="password" placeholder="请输入新密码">
    </div>
    <div class="inp-wrapper border-bottom password">
      <input type="password" placeholder="请确认新密码">
    </div>
    <div class="log-btns">
      <input type="submit" value="确认" @click.prevent="confirm">
      <a class="toggle-way" @click="toggleWay">返回登录</a>
    </div>
  </form>
</template>
<script>
export default {
  name: 'Reset',
  data () {
    return {}
  },
  methods: {
    // 返回账号登录
    toggleWay () {
      this.$router.push({name: 'Account'})
    },
    // 密码修改确认
    confirm () {
      this.$router.push({name: 'Reset'})
    }
  }
}
</script>
