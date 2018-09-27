<template>
  <section class="filter-opts-item border-bottom">
    <h3>
      {{radio.tit}}
      <slot name="subtit"></slot>
      <slot name="arrow"></slot>
    </h3>
    <slot name="input"></slot>
    <div class="filter-item">
      <span
        class="border"
        v-for="(item, key) of radio.items"
        :key="'radio-' + key"
        :class="{active: curItem === key}"
        :style="{fontSize: item.length > 7 ? '.16rem' : '.22rem'}"
        @click="radioSelect(item, key, radio.type)"
        :ref="radio.type"
      >{{item}}</span>
    </div>
    <slot name="picker"></slot>
  </section>
</template>
<script>
export default {
  name: 'Radio',
  props: {
    radio: Object
  },
  data () {
    return {
      curItem: 0
    }
  },
  methods: {
    // 改变当前选中的tab
    radioSelect (item, key, type) {
      this.curItem = key
      if (type === 'age') { // 输入的年龄为空, 置空操作在前
        let minage = ''
        let maxage = ''
        this.$emit('getType', {item, type, minage, maxage})
      } else if (type === 'time') { // 传给上级当前选中的值, 更新搜索条件
        let changed = false
        let minus = 0
        if (key === 1) {
          minus = 3 // 近3个月
        }
        if (key === 2) {
          minus = 6 // 近6个月
        }
        let today = new Date()
        let endmonth = today.getMonth() + 1
        let endyear = today.getFullYear()
        let startyear = null
        let startmonth = null
        if (endmonth - minus > 1) {
          startmonth = endmonth - minus
          startyear = endyear
        } else {
          startmonth = 12 - Math.abs(endmonth - minus)
          startyear = endyear - 1
        }
        this.$emit('getType', {item, type, changed, startmonth, startyear, endmonth, endyear})
        setTimeout(() => { // 解决初始化点击本月的时候不生效
          this.$refs.time[key].setAttribute('class', 'border active')
        }, 50)
      } else {
        this.$emit('getType', {item, type})
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
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
  .filter-item
    padding 0 .1rem
    display grid
    grid-template-columns: repeat(3, 1fr)
    span
      display flex
      padding .05rem
      margin .2rem .1rem 0
      box-sizing border-box
      align-items center
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
</style>
