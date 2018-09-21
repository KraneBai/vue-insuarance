<template>
  <div class="filter-content">
    <div class="filter-inner">
      <template v-for="cate of overviews.filter">
        <filter-opts
          ref="radioItems"
          :cate="cate"
          :ostartyear="overviews.startyear"
          :ostartmonth="overviews.startmonth"
          :oendyear="overviews.endyear"
          :oendmonth="overviews.endmonth"
          :key="cate.type"
          @getType="getFilterInfo"
        ></filter-opts>
      </template>
    </div>
    <div class="btns">
      <button class="reset-btn" @click="reset">重置</button>
      <button class="search-btn" @click="search">确定</button>
    </div>
  </div>
</template>
<script>
import FilterOpts from '../PersonChartDetail/FilterOpts'
export default {
  name: 'PFilter',
  components: {
    FilterOpts
  },
  props: {
    overviews: Object
  },
  data () {
    return {
      searchItem: { // 默认搜索值
        time: '',
        company: '行业',
        area: '全省'
      }
    }
  },
  methods: {
    // 点击空白隐藏左边栏
    filterHide () {
      this.$emit('filterControl', false)
    },
    // 搜索
    search () {
      console.log(this.searchItem)
      // this.$router.push({name: 'PersonChartsWrapper'})
    },
    // 重置筛选
    reset () {
      for (let item of this.$refs.radioItems) {
        item.$data.curItem = 0
        item.$data.minage = ''
        item.$data.maxage = ''
      }
      this.searchItem = { // 重置搜索值
        time: '',
        company: '行业',
        area: '全省'
      }
    },
    // 子组件传给父组件, 改变搜索条件值
    getFilterInfo (info) {
      this.searchItem[info.type] = info.item
    }
  },
  mounted () {
    console.log(this.overviews)
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
