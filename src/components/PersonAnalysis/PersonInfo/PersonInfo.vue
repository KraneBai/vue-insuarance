<template>
  <div class="lists">
    <header class="border-bottom">
      <span
        :class="{active: isActive}"
        class="first"
        @click="toggleTab('messages')"
      >
        通知公告
      </span>
      <span
        :class="{active: !isActive}"
        class="second"
        @click="toggleTab('reports')"
      >
        分析报告
      </span>
    </header>
    <div class="contents">
      <mt-loadmore
        ref="loadmore"
        :autoFill="false"
        :top-method="loadTop"
        :bottom-method="loadBottom"
        v-if="!noData"
      >
        <info-list :messages="lists"></info-list>
      </mt-loadmore>
      <div class="noData" v-else>暂无数据</div>
    </div>
  </div>
</template>
<script>
import InfoList from './InfoList'
import axios from 'axios'
export default {
  name: 'PersonInfo',
  components: {
    InfoList
  },
  data () {
    return {
      tab: 'messages',
      isActive: true,
      messages: [], // 存放通知公告
      reports: [], // 存放分析报告数据
      lists: [], // 实际传给列表页面的数组
      page: 1
    }
  },
  computed: {
    noData () {
      if (this.tab === 'messages' && this.messages.length === 0) {
        return false
      }
      if (this.tab === 'reports' && this.reports.length === 0) {
        return false
      }
    }
  },
  methods: {
    // 切换tab
    toggleTab (type) {
      if (this.tab === type) {
        return false
      } else {
        this.page = 1
        this.tab = type
        this.isActive = type === 'messages'
        // 判断当前切换的tab中是否之前加载过数据, 决定是否初始化数据
        if (this[type].length === 0) {
          this.setData(this.tab, 'init')
        }
        this.lists = this[type]
      }
    },
    loadTop () {
      this.setData(this.tab, 'reload')
    },
    loadBottom () {
      this.setData(this.tab, 'loadmore')
    },
    // 上拉loadmore 下拉reload 初始化init -> 数据
    setData (tab, type) {
      this.$indicator.open()
      // let url = 'messages.json'
      let url = 'Notice/index'
      if (tab === 'reports') {
        // url = 'reports.json'
      }
      // axios.get('/api/' + url)
      axios.get('/jmobile/' + url + '/uid/' + sessionStorage.getItem('uid') + '/page/' + this.page)
        .then((res) => {
          this.$indicator.close()
          if (res.data.status) {
            if (type === 'loadmore') {
              if (tab === 'messages') {
                this.messages.push(...res.data.data)
                this.lists = this.messages
              } else {
                this.reports.push(...res.data.data)
                this.lists = this.reports
              }
              this.$refs.loadmore.onBottomLoaded()
              this.allLoaded = true // 若数据已全部获取完毕
            } else {
              if (tab === 'messages') {
                this.messages = res.data.data
                this.lists = this.messages
              } else {
                this.reports = res.data.data
                this.lists = this.reports
              }
              if (type === 'reload') {
                this.$refs.loadmore.onTopLoaded()
              }
            }
          }
        })
        .catch(() => {
          this.$indicator.close()
        })
    }
  },
  mounted () {
    this.setData(this.tab, 'init')
  }
}
</script>
<style lang="stylus" scoped>
.lists
  position relative
  width 100%
  min-height 100%
  background linear-gradient(to bottom, #182649, #1d5174)
  header
    padding .3rem 0
    text-align center
    font-size 0
    z-index 999
    &::before
      border-color $borderBottomColor
    span
      display inline-block
      box-sizing border-box
      width 1.6rem
      height .6rem
      font-size .28rem
      color $txtColor
      text-align center
      line-height .6rem
      border 1px solid $borderColor
      &.active
        color $commonTxtColor
        background #00ccff
      &.first
        border-top-left-radius $borderRadius - 5px
        border-bottom-left-radius $borderRadius - 5px
      &.second
        border-top-right-radius $borderRadius - 5px
        border-bottom-right-radius $borderRadius - 5px
  .contents
    overflow auto
    position absolute
    top 1.2rem
    left 0
    right 0
    bottom 0
  .noData
    padding-top .5rem
    text-align center
    color $commonTxtColor
  >>>
    .mint-loadmore
      height 100%
    .mint-loadmore-text
      color $txtColor
</style>
