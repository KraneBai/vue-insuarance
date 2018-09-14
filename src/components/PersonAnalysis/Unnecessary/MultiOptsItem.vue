<template>
  <section class="filter-opts-item border-bottom">
    <h3>{{cate.category}}</h3>
    <div class="cate-item">
      <span
        class="border"
        v-for="(item, key) of cate.catesList"
        :key="key"
        :style="{fontSize: item.length > 6 ? '.2rem' : '.28rem'}"
        @click="changeSelect(key, item, cate.type)"
        ref="multiItem"
      >{{item}}</span>
    </div>
  </section>
</template>
<script>
export default {
  name: 'MultiOptsItem',
  props: {
    cate: Object
  },
  data () {
    return {
      itemArr: []
    }
  },
  methods: {
    // 改变当前选中的tab
    changeSelect (key, item, type) {
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
    }
  },
  mounted () {
    this.$refs.multiItem[0].setAttribute('class', 'border active')
  }
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
  .cate-item
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
