<template>
  <div class="details">
    <h1>{{details.title}}</h1>
    <h5>{{details.date}}</h5>
    <div class="content" v-html="details.content"></div>
    <div class="attach">
      <h3>附件</h3>
      <dl v-for="item of details.attach" :key="item.id">
        <dt>{{item.title}}</dt>
        <dd>查看></dd>
      </dl>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'InfoDetail',
  data () {
    return {
      details: {}
    }
  },
  methods: {
    setData () {
      this.$indicator.open()
      axios.get('/api/details.json')
        .then((res) => {
          this.$indicator.close()
          let data = res.data
          if (data.status) {
            this.details = data.details
          }
        })
        .catch(() => {
          this.$indicator.close()
        })
    }
  },
  mounted () {
    this.setData()
  }
}
</script>
<style lang="stylus" scoped>
.details .content >>> p
  margin-bottom .36rem
.details
  padding .42rem .28rem 0
  box-sizing border-box
  width 100%
  min-height 100%
  background linear-gradient(to bottom, #182649, #1d5174)
  color $commonTxtColor
  line-height .32rem
  -webkit-overflow-scrolling touch
  h1
    margin-bottom .25rem
    font-size .3rem
    text-align center
  h5
    margin-bottom .25rem
    font-size .24rem
    text-align center
  .content
    padding-top .18rem
    border-top 1px dotted #ccc
    border-bottom 1px dotted #ccc
    font-size .28rem
  .attach
    padding .2rem 0
    font-size .28rem
    color $commonTxtColor
    dl
      display flex
      margin-top .3rem
      dt
        flex 1
      dd
        text-align right
        width 1rem
        color $txtColor
</style>
