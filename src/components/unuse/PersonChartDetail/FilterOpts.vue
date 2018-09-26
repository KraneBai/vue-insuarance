<template>
  <section class="filter-opts-item border-bottom">
    <h3>
      {{cate.category}}
      <span v-if="cate.type === 'time'">{{startyear}}/{{startmonth}}-{{endyear}}/{{endmonth}}</span>
      <!-- <i v-if="(cate.type === 'company' || cate.type === 'area' || cate.type === 'time')"></i> -->
    </h3>
    <div class="filter-inp" v-if="cate.type === 'age'">
      <input type="tel" v-model.trim="minage" placeholder="最小年龄">
      <span></span>
      <input type="tel" v-model.trim="maxage" placeholder="最大年龄">
      <a @click.prevent="clearInp">清空</a>
    </div>
    <div class="filter-item">
      <!-- 单选 -->
      <span
        class="border"
        :class="{active: curItem === key}"
        v-for="(item, key) of cate.tabList"
        :key="key"
        :style="{fontSize: item.length > 7 ? '.16rem' : '.22rem'}"
        @click="radioSelect(key, item, cate.type)"
        :ref="cate.type"
      >{{item}}</span>
      <!-- 多选 -->
      <span
        v-if="cate.filter === 'multi'"
        class="border"
        v-for="(item, key) of cate.multiList"
        :key="key"
        :class="{active: 0 === key}"
        :style="{fontSize: item.length > 6 ? '.16rem' : '.22rem'}"
        @click="multiSelect(key, item, cate.type)"
        ref="multiItem"
      >{{item}}</span>
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
    cate: Object,
    ostartyear: String,
    ostartmonth: String,
    oendyear: String,
    oendmonth: String
  },
  data () {
    return {
      startPicker: '',
      endPicker: '',
      startyear: this.ostartyear,
      startmonth: this.ostartmonth,
      endyear: this.oendyear,
      endmonth: this.oendmonth,
      minage: '',
      maxage: '',
      curItem: 0, // 单选需要
      itemArr: [] // 多选传参需要
    }
  },
  computed: {
    inpage () {
      return this.minage + '-' + this.maxage
    },
    slotsStart () {
      let arr = []
      let month = new Date().getMonth() + 1
      for (let i = 1; i <= month; i++) {
        arr.push(i)
      }
      let start = [
        {
          defaultIndex: new Date().getMonth() - 6 >= 0 ? new Date().getFullYear() - 2017 : new Date().getFullYear() - 2018, // 默认第几个
          flex: 1,
          values: [2017, 2018],
          textAlign: 'right'
        },
        {
          defaultIndex: new Date().getMonth() - 6 >= 0 ? new Date().getMonth() - 6 : 12 - Math.abs(new Date().getMonth() - 6),
          flex: 1,
          values: arr
        }
      ]
      return start
    },
    slotsEnd () {
      let arr = []
      let month = new Date().getMonth() + 1
      for (let i = 1; i <= month; i++) {
        arr.push(i)
      }
      let end = [
        {
          defaultIndex: new Date().getFullYear() - 2017,
          flex: 1,
          values: [2017, 2018],
          textAlign: 'right'
        },
        {
          defaultIndex: new Date().getMonth(),
          flex: 1,
          values: arr
        }
      ]
      return end
    }
  },
  watch: {
    // 输入的年龄有值, tab消失
    minage (val) {
      if (val !== '') {
        this.curItem = -1
      }
    },
    maxage (val) {
      if (val !== '') {
        this.curItem = -1
      }
    },
    inpage (val) {
      if (val !== '-') {
        val = val + '岁'
        this.$emit('getType', {type: 'age', item: val})
      } else {
        this.$emit('getType', {type: 'age', item: '不限'})
        if (this.curItem < 0) { // 控制inp框都为空时, 点击tab, 会选不到当前, 固定不限
          this.curItem = 0
        }
      }
    }
  },
  methods: {
    // 清空输入年龄
    clearInp () {
      // 清空当前输入的年龄
      this.minage = ''
      this.maxage = ''
    },
    // 改变当前选中的tab
    radioSelect (key, item, type) {
      if (type === 'age') { // 输入的年龄为空, 置空操作在前
        this.minage = ''
        this.maxage = ''
      }
      if (type === 'time') {
        let minus = 0
        if (key === 1) {
          minus = 3 // 近3个月
        }
        if (key === 2) {
          minus = 6 // 近6个月
        }
        let today = new Date()
        this.endmonth = today.getMonth() + 1
        this.endyear = today.getFullYear()
        if (this.endmonth - minus > 1) {
          this.startmonth = this.endmonth - minus
          this.startyear = this.endyear
        } else {
          this.startmonth = 12 - Math.abs(this.endmonth - minus)
          this.startyear = this.endyear - 1
        }
        this.startPicker.setValues([this.startyear, this.startmonth])
        this.endPicker.setValues([this.endyear, this.endmonth])
        setTimeout(() => {
          this.$refs.time[key].setAttribute('class', 'border active')
        }, 50)
      }
      this.curItem = key
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
      this.startPicker = picker
      this.startyear = this.startPicker.getValues()[0]
      this.startmonth = this.startPicker.getValues()[1]
      for (let item of this.$refs.time) {
        item.setAttribute('class', 'border')
      }
      let montharr = []
      if (this.startPicker.getValues()[0] === 2017) {
        montharr = [12]
        this.startPicker.setSlotValues(1, montharr)
      } else if (this.startPicker.getValues()[0] === new Date().getFullYear()) {
        for (let i = 1; i <= new Date().getMonth() + 1; i++) {
          montharr.push(i)
        }
        this.startPicker.setSlotValues(1, montharr)
      } else {
        montharr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        this.startPicker.setSlotValues(1, montharr)
      }
    },
    endChange (picker, values) {
      this.endPicker = picker
      this.endyear = this.endPicker.getValues()[0]
      this.endmonth = this.endPicker.getValues()[1]
      for (let item of this.$refs.time) {
        item.setAttribute('class', 'border')
      }
      let montharr = []
      if (this.endPicker.getValues()[0] === 2017) {
        montharr = [12]
        this.endPicker.setSlotValues(1, montharr)
      } else if (this.endPicker.getValues()[0] === new Date().getFullYear()) {
        for (let i = 1; i <= new Date().getMonth() + 1; i++) {
          montharr.push(i)
        }
        this.endPicker.setSlotValues(1, montharr)
      } else {
        montharr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        this.endPicker.setSlotValues(1, montharr)
      }
    }
  },
  mounted () {}
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
    padding 0 .05rem
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
    // i
    //   position absolute
    //   right .22rem
    //   top 50%
    //   margin-top -0.06rem
    //   width .22rem
    //   height .12rem
    //   transform rotate(-180deg)
    //   bg-img(.22rem, .12rem, left, center)
    //   background-image url(../../../assets/images/arrow_down.png)
  .filter-item
    padding 0 .1rem
    display grid
    grid-template-columns: repeat(3, 1fr)
    span
      flex 1
      display flex
      padding .05rem
      box-sizing border-box
      align-items center
      margin .2rem .1rem 0
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
  .filter-inp
    display flex
    padding-left .2rem
    padding-right .8rem
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
    a
      margin-left .2rem
      font-size .26rem
      white-space nowrap
      color #25a4bb
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
