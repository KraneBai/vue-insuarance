<template>
  <div class="filter-opts">
    <div class="filter-opts-inner">
      <template v-for="radio of radioOpts">
        <filter-opts ref="radioItems" :cate="radio" :key="radio.type" @getType="getFilterInfo"></filter-opts>
      </template>
      <filter-opts v-if="type === 'all'" :cate="rate" @getType="getFilterInfo"></filter-opts>
    </div>
    <div class="btns">
      <button class="reset-btn" @click="reset">重置</button>
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
      searchItem: { // 默认搜索值
        age: '不限',
        education: '不限',
        sex: '不限',
        political: '不限',
        retain: ['13个月留存率']
      },
      radioOpts: [], // 单选项目
      rate: {}, // 留存率多选
      type: 'all' // 默认人员概览
    }
  },
  methods: {
    // 子组件传给父组件, 改变搜索条件值
    getFilterInfo (info) {
      this.searchItem[info.type] = info.item
    },
    // 搜索
    searchChart () {
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
        age: '不限',
        education: '不限',
        sex: '不限',
        political: '不限',
        retain: []
      }
    },
    setData () {
      this.$indicator.open()
      axios.get('/api/detailFilter.json')
        .then((res) => {
          this.$indicator.close()
          let data = res.data
          if (data.status) {
            this.radioOpts = data.radioOpts
            this.rate = data.rate
          }
        })
        .catch(() => {
          this.$indicator.close()
        })
    }
  },
  mounted () {
    this.setData()
    this.type = this.$route.query.type
  }
}
</script>
<style lang="stylus" scoped>
.filter-opts
  box-sizing border-box
  padding-bottom 1.4rem
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
