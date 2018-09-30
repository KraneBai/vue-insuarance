<template>
  <div class="person-overview">
    <p-header
      @centerControl="CenterControl"
      @filterControl="FilterControl"
      :user="user"
    ></p-header>
    <div class="charts" ref="swiper">
      <div class="swiper-wrapper">
        <p-chart
          class="swiper-slide"
          :type="item"
          :key="index"
          v-for="(item, index) of charts"
        ></p-chart>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <Drawer :closable="false" v-model="centerShow" placement="left">
      <p-center :user="user"></p-center>
    </Drawer>
    <Drawer :closable="false" v-model="filterShow">
      <p-filter :showDate="filterShow"></p-filter>
    </Drawer>
  </div>
</template>
<script>
import PHeader from './PHeader'
import PCenter from './PCenter'
import PFilter from './PFilter'
import PChart from './PChart'
import axios from 'axios'
import Swiper from 'swiper'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'PersonOverview',
  components: {
    PHeader,
    PCenter,
    PFilter,
    PChart
  },
  data () {
    return {
      user: {},
      charts: {}, // 中心图表部分
      centerShow: false,
      filterShow: false
    }
  },
  computed: {
    ...mapState(['area', 'areaname', 'companytype', 'startmonth', 'startyear', 'endyear', 'endmonth'])
  },
  methods: {
    ...mapMutations(['changeArgs']),
    // 父级显示人物中心栏
    CenterControl (type) {
      this.centerShow = type
    },
    // 父级显示筛选栏
    FilterControl (type) {
      this.filterShow = type
    },
    setData () {
      // 获取center及header信息
      axios.get('/jmobile/User/index/uid/' + sessionStorage.getItem('uid'))
      // axios.get('/api/overviews.json')
        .then((res) => {
          if (res.data.status === 1) {
            this.user = res.data.data
            if (this.areaname === '') {
              this.changeArgs({areaname: res.data.data.city})
            }
            this._initChart()
          } else {
            this.$toast({
              message: res.data.info,
              duration: 5000
            })
          }
        })
        .catch(() => {
          this.$indicator.close()
          this.$toast({
            message: '网络错误',
            duration: 5000
          })
        })
    },
    _initChart () {
      this.$indicator.open()
      // 拼接日期参数
      let datestart = this.startyear + '-' + this.startmonth
      let dateend = this.endyear + '-' + this.endmonth
      let args = this.common.checkArgs({area: this.area, d_company_type: this.companytype, datestart, dateend})
      console.log(args)
      axios.get('/jmobile/index/index' + args)
      // axios.get('/api/charts.json')
        .then((res) => {
          this.$indicator.close()
          console.log(res)
          if (res.data.status === 1) {
            this.charts = res.data.data
          } else {
            this.$toast({
              message: res.data.info,
              duration: 5000
            })
          }
        })
        .catch(() => {
          this.$indicator.close()
        })
    },
    // 初始化swiper
    _swiper () {
      this.$nextTick(() => {
        this.swiper = new Swiper(this.$refs.swiper, {
          loop: false,
          direction: 'vertical',
          observer: true, // 启动动态检查器(OB/观众/观看者)，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper
          noSwipingSelector: '.chart-box', // 避免局部滑动的时候 滑动slider
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    }
  },
  mounted () {
    this._swiper()
    this.setData()
  }
}
</script>
<style lang="stylus" scoped>
>>>
  .ivu-drawer-content
    background-color transparent
  .ivu-drawer-no-header .ivu-drawer-body
    padding 0
    background linear-gradient(to bottom, #182649, #1d5174)
    color $txtColor
  .ivu-drawer
    width 75% !important
  .ivu-drawer-mask
    background-color rgba(0 , 0, 0,.5)
  .swiper-container-vertical > .swiper-pagination-bullets
    left .07rem
  .swiper-pagination-bullet
    width 6px
    height 6px
    display block
    margin-top .07rem
    background #3a9ec6
  .swiper-pagination-bullet-active
    height 10px
    border-radius 10px
    background #00c3ff
.person-overview
  position relative
  box-sizing border-box
  padding .2rem .3rem .3rem
  page-style()
  .charts
    position absolute
    top 3.56rem
    left 0
    bottom 0
    overflow hidden
    width 100%
    .swiper-wrapper
      padding 0 .3rem
      box-sizing border-box
</style>
