<template>
  <form>
    <div class="inp-wrapper border-bottom username">
      <input type="text" placeholder="请输入账号" v-model="username">
    </div>
    <div class="inp-wrapper border-bottom password">
      <input type="password" placeholder="请输入密码" v-model="password">
    </div>
    <div class="log-btns">
      <input type="submit" value="登录" @click.prevent="selectPlatform">
      <a class="forget-pwd" href="#" @click="forgetPwd">忘记密码?</a>
      <a class="toggle-way" @click="toggleWay">手机号登录</a>
    </div>
  </form>
</template>
<script>
import { mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: 'Account',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapMutations(['changeArgs']),
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
      if (this.username === '' || this.password === '') {
        this.$toast({
          message: '请输入用户名/密码',
          duration: 3000
        })
        return false
      }
      this.$indicator.open()
      axios.post('/jmobile/login/index', {
        username: this.username,
        password: this.password
      })
        .then((res) => {
          this.$indicator.close()
          if (res.data.status === 1) {
            sessionStorage.setItem('uid', res.data.data.user_auth.uid)
            this.$router.push({name: 'Platform'})
          } else {
            this.$toast({
              message: res.data.info,
              duration: 5000
            })
            this.username = ''
            this.password = ''
          }
        })
        .catch(() => {
          this.$indicator.close()
          this.username = ''
          this.password = ''
          this.$toast({
            message: '网络错误',
            duration: 5000
          })
        })
    }
  },
  created () {
    // 登录页面初始化, 清空uid, 重置vuex数据
    sessionStorage.setItem('uid', '')
    let {startyear, startmonth, endyear, endmonth} = this.common.initDate()
    this.changeArgs({area: '', areaname: '', companytype: '', startyear, startmonth, endyear, endmonth})
  }
}
</script>
