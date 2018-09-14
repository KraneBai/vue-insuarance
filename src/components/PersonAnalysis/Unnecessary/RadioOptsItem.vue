<template>
  <section class="filter-opts-item border-bottom">
    <h3>{{cate.category}}</h3>
    <div class="filter-inp" v-if="cate.type === 'age'">
      <input type="text" placeholder="最小年龄">
      <span></span>
      <input type="text" placeholder="最大年龄">
    </div>
    <div class="filter-item">
      <span
        class="border"
        v-for="(item, key) of cate.catesList"
        :key="key"
        :style="{fontSize: item.length > 6 ? '.2rem' : '.28rem'}"
        @click="changeSelect(key, item, cate.type)"
        :class="{active: curItem === key}"
      >{{item}}</span>
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
      curItem: 0
    }
  },
  methods: {
    // 改变当前选中的tab
    changeSelect (key, item, type) {
      this.curItem = key
      // 传给上级当前选中的值, 更新搜索条件
      this.$emit('getType', {type, item})
    }
  },
  mounted () {}
}
</script>
<style lang="stylus" scoped>
.filter-opts-item
  padding .3rem
  &::before
    border-color $borderBottomColor
  h3
    color $commonTxtColor
    font-size .24rem
  .filter-inp
    display flex
    padding-right .9rem
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
      height .8rem
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
</style>
