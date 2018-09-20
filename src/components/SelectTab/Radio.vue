<template>
  <section class="select-tab border-bottom">
    <h3>
      {{radio.category}}
    </h3>
    <div class="tab-item">
      <span
        class="border"
        v-for="(item, key) of radio.tabList"
        :key="key"
        :style="fontSize(item)"
        :class="{active: curtab === key}"
        @click="radioSelect(key, item, radio.type)"
      >{{item}}</span>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Radio',
  props: {
    radio: Object,
    curtab: Number
  },
  data () {
    return {
      curItem: 0
    }
  },
  methods: {
    fontSize (name) {
      let size = name.length > 7 ? '.16rem' : '.22rem'
      return 'fontSize:' + size
    },
    // 改变当前选中的tab
    radioSelect (key, item, type) {
      this.curItem = key
      // if (type === 'time') {}
      // 传给上级当前选中的值, 更新搜索条件
      this.$emit('getType', {type, item})
    }
  },
  mounted () {
    // console.log(this.radio)
    console.log(this.curtab)
  }
}
</script>
<style lang="stylus" scoped>
.select-tab
  padding .3rem 0
  &::before
    border-color #3043a9
  h3
    padding 0 .2rem
    position relative
    color $commonTxtColor
    font-size .26rem
    line-height .3rem
  .tab-item
    padding 0 .1rem
    display grid
    grid-template-columns: repeat(3, 1fr)
    span
      display flex
      flex 1
      box-sizing border-box
      margin .2rem .1rem 0
      padding .05rem
      align-items center
      justify-content center
      text-align center
      height .7rem
      color $txtColor
      font-size .24rem
      border-radius 5px
      &::before
        border-color $borderColor
        border-radius 5px
      &.active
        background-color $borderColor
        color $commonTxtColor
        border-radius 5px
</style>
