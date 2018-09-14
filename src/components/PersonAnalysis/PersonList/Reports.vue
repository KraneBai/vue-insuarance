<template>
  <ul class="reports">
    <li class="border-bottom" v-for="item of reports" :key="item.id">
      <p>{{item.title}}</p>
      <span>{{item.date}}</span>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'Reports',
  props: {
    reports: Array
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
<style lang="stylus" scoped>
.reports
  li
    padding .26rem .32rem .2rem
    line-height .5rem
    &::before
      border-color $borderBottomColor
    p
      text-hidden()
      font-size .28rem
      color $commonTxtColor
    span
      display block
      text-align right
      color $txtColor
      font-size .24rem
</style>
