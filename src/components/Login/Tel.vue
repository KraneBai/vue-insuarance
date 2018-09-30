<template>
  <form>
    <div class="inp-wrapper border-bottom tel">
      <input type="tel" placeholder="请输入手机号" v-model.trim="mobile">
    </div>
    <div class="inp-wrapper border-bottom verify-num">
      <input type="number" placeholder="请输入验证码" v-model.trim="code">
      <a href="#" @click="verify" v-if="getcode" key="code">获取验证码</a>
      <a href="#" v-text="'重新发送' + countdown + 's'" v-else key="count"></a>
    </div>
    <div class="log-btns">
      <input type="submit" value="登录" @click.prevent="selectPlatform">
      <a class="toggle-way" @click="toggleWay">账号登录</a>
    </div>
  </form>
</template>
<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
  name: 'Tel',
  data () {
    return {
      mobile: '',
      code: '',
      getcode: true,
      countdown: 60,
      timer: null
    }
  },
  methods: {
    ...mapMutations(['changeArgs']),
    // 获取验证码
    verify () {
      this.$indicator.open()
      axios.post('/jmobile/login/sendsms', {
        mobile: this.mobile,
        sign: 0
      })
        .then((res) => {
          this.$indicator.close()
          if (res.data.status === 1) {
            this.$toast({
              message: res.data.info,
              duration: 2000
            })
            this.getcode = false
            // 开启重发验证码倒计时
            this.timer = setInterval(() => {
              this.countdown--
              if (this.countdown === 0) {
                this.getcode = true
                this.countdown = 60
                clearInterval(this.timer)
              }
            }, 1000)
          } else {
            this.$toast({
              message: res.data.info,
              duration: 5000
            })
          }
        })
        .catch(() => {
          this.$indicator.close()
          this.mobile = ''
          this.$toast({
            message: '网络错误',
            duration: 5000
          })
        })
    },
    // 切换登录方式
    toggleWay () {
      this.$router.push({name: 'Account'})
    },
    // 登录成功选择平台
    selectPlatform () {
      this.$indicator.open()
      axios.post('/jmobile/login/index', {
        login_mobile: this.mobile,
        code: this.code
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
            this.code = ''
          }
        })
        .catch(() => {
          this.$indicator.close()
          this.code = ''
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
