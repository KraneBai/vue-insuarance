<template>
  <div class="filter-content">
    <div class="filter-inner">
      <radio @getType="getFilterInfo" :radio="timeRadio" ref="timezone">
        <span slot="subtit">{{timeRange}}</span>
        <date
          slot="picker"
          @dateRange="getDateRange"
          :ostartyear="overviews.startyear"
          :ostartmonth="overviews.startmonth"
          :oendyear="overviews.endyear"
          :oendmonth="overviews.endmonth"
          :changed="pickerChange"
          v-if="showDate"
        ></date>
      </radio>
      <radio @getType="getFilterInfo" :radio="companyRadio" ref="companyzone"></radio>
      <radio @getType="getFilterInfo" :radio="areaRadio" ref="areazone"></radio>
    </div>
    <div class="btns">
      <button class="reset-btn" @click="reset">重置</button>
      <button class="search-btn" @click="search">确定</button>
    </div>
  </div>
</template>
<script>
import Radio from '../../Common/Radio'
import Date from '../../Common/Date'
export default {
  name: 'PFilter',
  components: {
    Radio,
    Date
  },
  props: {
    overviews: Object,
    showDate: Boolean
  },
  computed: {
    timeRange () {
      return this.startyear + '/' + this.startmonth + '-' + this.endyear + '/' + this.endmonth
    }
  },
  data () {
    return {
      searchItem: { // 默认搜索值
        time: '',
        company: '行业',
        area: '全省'
      },
      pickerChange: false,
      startyear: null,
      startmonth: null,
      endyear: null,
      endmonth: null,
      timeRadio: {
        tit: '时间区间',
        type: 'time',
        items: ['本月', '近三个月', '近六个月'],
        startyear: 2018,
        startmonth: 3,
        endyear: 2018,
        endmonth: 9
      },
      companyRadio: {
        tit: '公司类型',
        type: 'company',
        items: ['行业', '寿险类型', '财险类型', '中介类型']
      },
      areaRadio: {
        tit: '地区',
        type: 'area',
        items: ['全省', '长春市', '吉林市', '四平市', '辽源市', '通化市', '白山市', '松原市', '白城市', '延边朝鲜族自治州']
      }
    }
  },
  watch: {
    pickerChange (val) {
      let timeSpans = this.$refs.timezone.$el.children[1].children
      if (val) {
        for (let item of timeSpans) {
          item.setAttribute('class', 'border')
        }
      }
    }
  },
  methods: {
    getDateRange (date) {
      this.startyear = date.startyear
      this.startmonth = date.startmonth
      this.endyear = date.endyear
      this.endmonth = date.endmonth
      this.pickerChange = date.changed
    },
    // 点击空白隐藏左边栏
    filterHide () {
      this.$emit('filterControl', false)
    },
    // 子组件传给父组件, 改变搜索条件值
    getFilterInfo (info) {
      this.searchItem[info.type] = info.item
      if (info.type === 'time') {
        this.pickerChange = info.changed
        this.startyear = info.startyear
        this.startmonth = info.startmonth
        this.endyear = info.endyear
        this.endmonth = info.endmonth
      }
    },
    // 搜索
    search () {
      console.log(this.searchItem)
      // this.$router.push({name: 'PersonChartsWrapper'})
    },
    // 重置筛选
    reset () {
      for (let keys in this.$refs) {
        this.$refs[keys].$data.curItem = 0
      }
      this.searchItem = { // 重置搜索值
        time: '',
        company: '行业',
        area: '全省'
      }
    }
  },
  updated () {
    // this.startyear = this.overviews.startyear
  },
  mounted () {}
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
    span
      margin-left .2rem
      color $txtColor
      letter-spacing .02rem
    // i.arrow
    //   position absolute
    //   right .22rem
    //   top 50%
    //   margin-top -0.06rem
    //   width .22rem
    //   height .12rem
    //   transform rotate(-180deg)
    //   bg-img(.22rem, .12rem, left, center)
    //   background-image url(../../../assets/images/arrow_down.png)
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
