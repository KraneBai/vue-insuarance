<template>
  <div class="filter-content">
    <div class="filter-inner">
      <template v-for="cate of overviews.filter">
        <filter-opts :cate="cate" :key="cate.type" @getType="getFilterInfo"></filter-opts>
      </template>
    </div>
    <div class="btns">
      <button class="reset-btn">重置</button>
      <button class="search-btn">确定</button>
    </div>
  </div>
</template>
<script>
import FilterOpts from '../PersonChartDetail/FilterOpts'
export default {
  name: 'PersonFilter',
  components: {
    FilterOpts
  },
  props: {
    overviews: Object
  },
  methods: {
    // 点击空白隐藏左边栏
    filterHide () {
      this.$emit('filterControl', false)
    },
    // 子组件传给父组件, 改变搜索条件值
    getFilterInfo (info) {}
  }
}
</script>
<style lang="stylus" scoped>
.filter-content
  padding-bottom 1.4rem
  height 100%
  .filter-inner
    height 100%
    overflow-y auto
    -webkit-overflow-scrolling touch
.btns
  position fixed
  width 75%
  right 0
  bottom 0
  padding .3rem .2rem
  display flex
  z-index 100000
  button
    flex 1
    outline none
    background none
    border none
    color $commonTxtColor
    height .8rem
    line-height .8rem
    text-align center
    font-size .3rem
    border-radius 5px
    &.reset-btn
      margin-right .34rem
      background #3f6a88
    &.search-btn
      background #2649ba
</style>
