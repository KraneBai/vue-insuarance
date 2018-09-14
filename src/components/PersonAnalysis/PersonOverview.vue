<template>
  <div class="person-overview">
    <person-header
      @centerControl="CenterControl"
      @filterControl="FilterControl"
      :overviews="overviews"
    ></person-header>
    <div class="charts" ref="swiper">
      <div class="swiper-wrapper">
        <person-chart
          class="swiper-slide"
          :type="item"
          :key="index"
          v-for="(item, index) of overviews.charts"
        ></person-chart>
      </div>
    </div>
    <Drawer :closable="false" v-model="centerShow" placement="left">
      <person-center :overviews="overviews"></person-center>
    </Drawer>
    <Drawer :closable="false" v-model="filterShow">
      <person-filter :overviews="overviews"></person-filter>
    </Drawer>
  </div>
</template>
<script>
import PersonHeader from './Personal/PersonHeader'
import PersonCenter from './Personal/PersonCenter'
import PersonFilter from './Personal/PersonFilter'
import PersonChart from './Personal/PersonChart'
import axios from 'axios'
import Swiper from 'swiper'
export default {
  name: 'PersonOverview',
  components: {
    PersonHeader,
    PersonCenter,
    PersonFilter,
    PersonChart
  },
  data () {
    return {
      overviews: {},
      centerShow: false,
      filterShow: false
    }
  },
  methods: {
    // 父级显示人物中心栏
    CenterControl (type) {
      this.centerShow = type
    },
    // 父级显示筛选栏
    FilterControl (type) {
      this.filterShow = type
    },
    setData () {
      this.$indicator.open()
      axios.get('/api/overviews.json')
        .then((res) => {
          this.$indicator.close()
          let data = res.data
          if (data.status) {
            this.overviews = data.overviews
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
          noSwipingSelector: '.chart-box' // 避免局部滑动的时候 滑动slider
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
    background-color: rgba(0 , 0, 0,.5);
.person-overview
  position relative
  box-sizing border-box
  padding .2rem .3rem .3rem
  page-style()
  .charts
    position absolute
    box-sizing border-box
    padding 0 .3rem
    top 3.56rem
    left 0
    bottom 0
    overflow hidden
    width 100%
</style>
