<template>
  <section class="filter-opts-item border-bottom">
    <h3>
      {{cate.category}}
      <span v-if="cate.type === 'time'">2017/12-2018/12</span>
      <i v-if="(cate.type === 'company' || cate.type === 'area' || cate.type === 'time')"></i>
    </h3>
    <div class="filter-inp" v-if="cate.type === 'age'">
      <input type="text" placeholder="最小年龄">
      <span></span>
      <input type="text" placeholder="最大年龄">
    </div>
    <div class="filter-item">
      <!-- 单选 -->
      <span
        v-if="cate.filter === 'radio'"
        class="border"
        v-for="(item, key) of cate.catesList"
        :key="key"
        :style="{fontSize: item.name.length > 6 ? '.16rem' : '.22rem'}"
        @click="radioSelect(key, item, cate.type)"
        :class="{active: curItem === key}"
      >{{item.name}}</span>
      <!-- 多选 -->
      <span
        v-if="cate.filter === 'multi'"
        class="border"
        v-for="(item, key) of cate.catesList"
        :key="key"
        :style="{fontSize: item.name.length > 6 ? '.16rem' : '.22rem'}"
        @click="multiSelect(key, item, cate.type)"
        ref="multiItem"
      >{{item.name}}</span>
    </div>
    <div class="filter-time" v-if="cate.type === 'time'">
      <h2>
        <span>开始日期</span>
        <span>结束日期</span>
      </h2>
      <div class="time-wrapper">
        <mt-picker ref="startPicker" :visibleItemCount="3" :slots="slotsStart" @change="startChange"></mt-picker>
        <mt-picker ref="endPicker" :visibleItemCount="3" :slots="slotsEnd" @change="endChange"></mt-picker>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'FilterOpts',
  props: {
    cate: Object
  },
  data () {
    return {
      slotsStart: [
        {
          defaultIndex: 2, // 默认第几个
          flex: 1,
          values: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
          className: 'slot1',
          textAlign: 'right'
        },
        {
          defaultIndex: 11,
          flex: 1,
          values: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
          className: 'slot2',
          textAlign: 'left'
        }
      ],
      slotsEnd: [
        {
          defaultIndex: 3,
          flex: 1,
          values: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
          className: 'slot1',
          textAlign: 'right'
        },
        {
          defaultIndex: 11,
          flex: 1,
          values: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
          className: 'slot2',
          textAlign: 'left'
        }
      ],
      curItem: 0, // 单选需要
      itemArr: [] // 多选传参需要
    }
  },
  methods: {
    // 改变当前选中的tab
    radioSelect (key, item, type) {
      this.curItem = key
      if (type === 'time') {}
      // 传给上级当前选中的值, 更新搜索条件
      this.$emit('getType', {type, item})
    },
    multiSelect (key, item, type) {
      let curItems = this.$refs.multiItem
      // 设置是否选中
      if (curItems[key].className.indexOf('active') > -1) {
        curItems[key].setAttribute('class', 'border')
      } else {
        curItems[key].setAttribute('class', 'border active')
      }
      // 增加删除值
      this.itemArr = []
      curItems.forEach((item) => {
        if (item.className.indexOf('active') > -1) {
          this.itemArr.push(item.innerHTML)
        }
      })
      // 传给上级当前选中的值, 更新搜索条件
      this.$emit('getType', {type, item: this.itemArr})
    },
    startChange (picker, values) {
    },
    endChange (picker, values) {
    }
  },
  mounted () {
    if (this.cate.filter === 'multi') {
      // 复选默认第一个选中
      this.$refs.multiItem[0].setAttribute('class', 'border active')
    }
  }
}
</script>
<style lang="stylus" scoped>
.filter-time >>>
  .picker
    flex 1
  .picker:first-child
    padding-right .22rem
  .picker:last-child
    padding-left .22rem
  .picker-item
    color #0c6f92
  .picker-item.picker-selected
    color $borderColor
  .picker-center-highlight:before,
  .picker-center-highlight:after
    background-color $borderBottomColor
.filter-opts-item
  padding .3rem 0
  &::before
    border-color #3043a9
  h3
    padding 0 .2rem
    position relative
    color $commonTxtColor
    font-size .26rem
    line-height .3rem
    span
      margin-left .2rem
      color $txtColor
      letter-spacing .02rem
    i
      position absolute
      right .22rem
      top 50%
      margin-top -0.06rem
      width .22rem
      height .12rem
      transform rotate(-180deg)
      bg-img(.22rem, .12rem, left, center)
      background-image url(../../../assets/images/arrow_down.png)
  .filter-inp
    display flex
    padding-left .2rem
    padding-right 1.1rem
    margin-top .2rem
    align-items center
    input
      background #fff
      color #87a9c3
      text-align center
      width 45%
      height .6rem
      border-radius 5px
      border none
      outline none
      &::placeholder
        color #87a9c3
    span
      margin 0 .2rem
      height .02rem
      width .3rem
      background $borderColor
  .filter-item
    padding 0 .2rem
    display flex
    flex-wrap wrap
    span
      flex 1
      display flex
      padding .05rem .1rem
      box-sizing border-box
      align-items center
      width 30%
      min-width 30%
      max-width 30%
      margin-top .2rem
      margin-right .26rem
      justify-content center
      text-align center
      height .7rem
      color $txtColor
      font-size .24rem
      &::before
        border-color $borderColor
        border-radius 5px
      &.active
        background-color $borderColor
        color $commonTxtColor
        border-radius 5px
      &:nth-child(3n)
        margin-right 0
  .filter-time
    h2
      margin .4rem 0 .14rem
      display flex
      span
        flex 1
        color #009ec5
        font-size .26rem
        text-align center
    .time-wrapper
      display flex
</style>
