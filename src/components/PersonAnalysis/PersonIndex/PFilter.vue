<template>
  <div class="filter-content">
    <div class="filter-inner" v-if="showDate">
      <date
        :radio="filters.timeRadio"
        @getType="getFilterInfo"
        ref="timezone"
      ></date>
      <radio @getType="getFilterInfo" :radio="filters.companyRadio" ref="companyzone"></radio>
      <radio @getType="getFilterInfo" :radio="filters.areaRadio" ref="areazone"></radio>
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
    filters: Object,
    showDate: Boolean
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
    // 子组件传给父组件, 改变搜索条件值
    getFilterInfo (info) {
      this.searchItem[info.type] = info.item
    },
    // 搜索
    search () {
      console.log(this.searchItem)
      this.$router.push({name: 'DCharWrap'})
    },
    // 重置筛选
    reset () {
      for (let keys in this.$refs) {
        let data = this.$refs[keys].$data
        if (data.type === 'time') {
          // 重置picker
          data.curItem = -1
          data.cstartyear = 2017
          data.cstartmonth = 12
          data.cendyear = 2018
          data.cendmonth = 6
          data.startPicker.setValues([2017, 12])
          data.endPicker.setValues([2018, 6])
        } else {
          data.curItem = 0
        }
      }
      this.searchItem = { // 重置搜索值
        time: '',
        company: '行业',
        area: '全省'
      }
    }
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
