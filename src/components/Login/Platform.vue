<template>
  <div class="select-platform">
    <h2 class="border-bottom">吉林省保险行业管理人员服务平台</h2>
    <p class="border-bottom" @click="personDetail">人员分析</p>
    <p class="border-bottom">业务分析</p>
    <p class="border-bottom">在线教育</p>
  </div>
</template>
<script>
export default {
  name: 'Platform',
  methods: {
    // 人员概览
    personDetail () {
      this.$router.push({name: 'PersonIndex'})
    }
  },
  mounted () {
    // 当人员概览等页面返回到选择平台页面时, 清空上一页正在loading的效果
    this.$indicator.close()
  }
}
</script>
<style lang="stylus" scoped>
.select-platform
  width 100%
  height 100%
  background linear-gradient(to bottom, #182649, #1d5174)
  color $commonTxtColor
  line-height .9rem
  h2
    padding-left .3rem
    font-size .28rem
    bg-img(.22rem, .12rem, right .24rem, center)
    background-image url(../../assets/images/arrow_down.png)
    &::before
      border-color $borderBottomColor
  p
    padding-left .3rem
    font-size .24rem
    &::before
      border-color $borderBottomColor
</style>
