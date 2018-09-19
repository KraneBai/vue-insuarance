<template>
  <div class="filter-opts">
    <div class="filter-opts-inner">
      <template v-for="cate of filterOpts">
        <filter-opts :cate="cate" :key="cate.type" @getType="getFilterInfo"></filter-opts>
      </template>
    </div>
    <div class="btns">
      <button class="reset-btn">重置</button>
      <button class="search-btn" @click="searchChart">搜索</button>
    </div>
  </div>
</template>
<script>
import FilterOpts from './FilterOpts'
import axios from 'axios'
export default {
  name: 'DetailOptsWrapper',
  props: {},
  components: {
    FilterOpts
  },
  data () {
    return {
      seachItem: {
        age: '不限',
        education: '不限',
        sex: '不限',
        political: '不限',
        retain: ['13个月留存率']
      },
      filterOpts: []
    }
  },
  methods: {
    // 子组件传给父组件, 改变搜索条件值
    getFilterInfo (info) {
      this.seachItem[info.type] = info.item
    },
    // 搜索
    searchChart () {
      console.log(this.seachItem)
      this.$router.push({name: 'PersonChartsWrapper'})
    },
    setData () {
      this.$indicator.open()
      axios.get('/api/detailFilter.json')
        .then((res) => {
          this.$indicator.close()
          let data = res.data
          if (data.status) {
            this.filterOpts = data.filterOpts
          }
        })
        .catch(() => {
          this.$indicator.close()
        })
    }
  },
  mounted () {
    this.setData()
  }
}
</script>
<style lang="stylus" scoped>
.filter-opts
  box-sizing border-box
  padding 0 .1rem 1.4rem .1rem
  width 100%
  height 100%
  background linear-gradient(to bottom, #182649, #1d5174)
  .filter-opts-inner
    height 100%
    overflow-y auto
    -webkit-overflow-scrolling touch
  .btns
    position fixed
    left 0
    right 0
    bottom 0
    padding .3rem .2rem
    display flex
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
