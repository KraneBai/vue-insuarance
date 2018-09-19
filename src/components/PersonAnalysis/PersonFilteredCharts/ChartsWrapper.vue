<template>
  <div class="filter-wrapper">
    <div class="filters" ref="swiper">
      <div class="swiper-wrapper">
        <filtered-chart
          class="swiper-slide"
          v-for="(item, index) of allCharts"
          :key="index"
          :opts="item"
          :series="item.series"
        ></filtered-chart>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import FilteredChart from './FilteredChart'
import axios from 'axios'
export default {
  name: 'FilterWrapper',
  components: {
    FilteredChart
  },
  data () {
    return {
      allCharts: [],
      sexOpts: {},
      ageOpts: {},
      politicalOpts: {},
      cultureOpts: {},
      industryOpts: {}
    }
  },
  methods: {
    _swiper () {
      this.$nextTick(() => {
        this.swiper = new Swiper(this.$refs.swiper, {
          loop: false,
          direction: 'vertical',
          observer: true,
          noSwipingSelector: '.chart-box', // 避免局部滑动的时候 滑动slider.
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    },
    setData () {
      this.$indicator.open()
      axios.get('/api/filteredCharts.json')
        .then((res) => {
          this.$indicator.close()
          let data = res.data
          if (data.status) {
            this.allCharts = data.charts
          }
        })
        .catch(() => {
          this.$indicator.close()
        })
    }
  },
  mounted () {
    this.setData()
    this._swiper()
  }
}
</script>
<style lang="stylus" scoped>
>>>
  .swiper-container-vertical > .swiper-pagination-bullets
    left .07rem
  .swiper-pagination-bullet
    display block
    width 6px
    height 6px
    margin-top .07rem
    background #3a9ec6
  .swiper-pagination-bullet-active
    height 10px
    border-radius 10px
    background #00c3ff
.filter-wrapper
  position relative
  box-sizing border-box
  padding 0 .3rem 0
  page-style()
  .filters
    height 100%
    width 100%
    overflow hidden
    // position absolute
    // top 0
    // left 0
    // bottom 0
    // overflow hidden
    // width 100%
    // .swiper-wrapper
    //   padding 0 .3rem
    //   box-sizing border-box
</style>
