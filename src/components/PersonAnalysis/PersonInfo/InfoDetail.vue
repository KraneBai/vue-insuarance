<template>
  <div class="details">
    <h1>{{details.title}}</h1>
    <h5>{{details.created_at}}</h5>
    <div class="content" v-html="details.content"></div>
    <div class="attach">
      <h3>附件</h3>
      <a :href="item.file_url" v-for="(item, index) of details.url_file" :key="index">
        <span>{{item.name}}</span>
        <span>查看></span>
      </a>
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
      let id = this.$route.params.id
      this.$indicator.open()
      // axios.get('/api/details.json')
      axios.get('/jmobile/Notice/details/uid/' + sessionStorage.getItem('uid') + '/id/' + id)
        .then((res) => {
          this.$indicator.close()
          if (res.data.status) {
            this.details = res.data.data
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
    a
      display flex
      margin-top .3rem
      span
        &:first-child
          flex 1
          color #fff
        &:last-child
          text-align right
          width 1rem
          color $txtColor
</style>
