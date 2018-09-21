<template>
  <div>
    <header class="border-bottom">
      <span>
        <img src="../../../assets/images/avatar.png">
      </span>
      {{overviews.name}}
    </header>
    <section class="info">
      <dl v-for="item of overviews.center" :key="item.type">
        <dt>{{item.category}}</dt>
        <dd>
          {{item.info}}
          <button
            v-if="item.type === 'wechat'"
            @click.stop="unlock"
          >解除绑定</button>
        </dd>
      </dl>
    </section>
  </div>
</template>
<script>
export default {
  name: 'PCenter',
  props: {
    overviews: Object
  },
  methods: {
    // 点击空白隐藏左边栏
    centerHide () {
      this.$emit('centerControl', false)
    },
    // 解除绑定
    unlock () {}
  }
}
</script>
<style lang="stylus" scoped>
header
  height 1.52rem
  line-height 1.52rem
  font-size .3rem
  &::before
    border-color $borderBottomColor
  span
    display inline-block
    margin 0 .26rem 0 .3rem
    width .94rem
    img
      width 100%
.info
  padding .2rem 0
  font-size .26rem
  dl
    padding 0 .2rem 0 .3rem
    margin-bottom .15rem
    display flex
    line-height .48rem
    dt
      margin-right .1rem
      width 1.3rem
      color $commonTxtColor
    dd
      flex 1
      button
        margin-left .25rem
        padding 0 .2rem
        height .46rem
        line-height .46rem
        color #1a2359
        background #ffea00
        border-radius 15px
    &:last-child
      padding-right 0
</style>
