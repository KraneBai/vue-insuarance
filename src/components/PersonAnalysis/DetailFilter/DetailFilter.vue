<template>
  <div class="filter-opts">
    <div class="filter-opts-inner" v-if="radio">
      <radio
        v-for="item of radio"
        :key="item.type"
        :ref="item.type + 'zone'"
        :radio="item"
        @getType="getFilterInfo"
      >
        <div class="filter-inp" slot="input" v-if="item.type === 'age'">
          <input type="tel" v-model.trim="minage" placeholder="最小年龄">
          <span></span>
          <input type="tel" v-model.trim="maxage" placeholder="最大年龄">
          <a @click.prevent="clearInp">清空</a>
        </div>
      </radio>
      <multi v-if="type === 'all'" @getType="getFilterInfo" :multi="multi.retainMulti"></multi>
    </div>
    <div class="btns">
      <button class="reset-btn" @click="reset">重置</button>
      <button class="search-btn" @click="searchChart">搜索</button>
    </div>
  </div>
</template>
<script>
import Radio from '../../Common/Radio'
import Multi from '../../Common/Multi'
import axios from 'axios'
export default {
  name: 'DetailFilter',
  props: {},
  components: {
    Radio,
    Multi
  },
  data () {
    return {
      searchItem: { // 默认搜索值
        age: '不限',
        education: '不限',
        sex: '不限',
        political: '不限',
        retain: ['13个月留存率']
      },
      radio: null,
      multi: null, // 所有动态列出的筛选项
      minage: '',
      maxage: '',
      type: 'all' // 默认人员概览
    }
  },
  computed: {
    inpage () {
      return this.minage + '-' + this.maxage
    }
  },
  watch: {
    // 输入的年龄有值, tab消失
    minage (val) {
      this.clearAgeTab(val)
    },
    maxage (val) {
      this.clearAgeTab(val)
    },
    // minage - maxage 表示
    inpage (val) {
      if (val !== '-') {
        this.searchItem['age'] = val
      } else {
        // input内容为空时, 自动加上不限的选中
        this.$refs.agezone[0].$el.children[2].children[0].setAttribute('class', 'border active')
        this.searchItem['age'] = '不限'
      }
    }
  },
  methods: {
    // 当年龄input有值时, 年龄Tab取消选中
    clearAgeTab (val) {
      if (val !== '') {
        let ageSpans = this.$refs.agezone[0].$el.children[2].children
        if (val) {
          for (let item of ageSpans) {
            item.setAttribute('class', 'border')
          }
        }
      }
    },
    // 清空输入年龄
    clearInp () {
      // 清空当前输入的年龄
      this.minage = ''
      this.maxage = ''
    },
    // 子组件传给父组件, 改变搜索条件值
    getFilterInfo (info) {
      this.searchItem[info.type] = info.item
      if (info.type === 'age') { // agetab切换的时候input年龄清空值
        this.minage = ''
        this.maxage = ''
      }
    },
    // 搜索
    searchChart () {
      console.log(this.searchItem)
      this.$router.push({name: 'DCharWrap'})
    },
    // 重置筛选
    reset () {
      for (let keys in this.$refs) {
        this.$refs[keys][0].$data.curItem = 0
        this.minage = ''
        this.maxage = ''
      }
      this.searchItem = { // 重置搜索值
        age: '不限',
        education: '不限',
        sex: '不限',
        political: '不限',
        retain: ['13个月留存率']
      }
    },
    setData () {
      this.$indicator.open()
      axios.get('/api/filterDetail.json')
        .then((res) => {
          this.$indicator.close()
          let data = res.data
          if (data.status) {
            this.radio = data.data.radio
            this.multi = data.data.multi
          }
        })
        .catch(() => {
          this.$indicator.close()
        })
    }
  },
  mounted () {
    this.setData()
    this.type = this.$route.query.type // 只有人员概览有留存率
  }
}
</script>
<style lang="stylus" scoped>
.filter-opts
  box-sizing border-box
  padding-bottom 1.4rem
  width 100%
  height 100%
  background linear-gradient(to bottom, #182649, #1d5174)
  .filter-opts-inner
    height 100%
    overflow-y auto
    -webkit-overflow-scrolling touch
  .btns
    position fixed
    left 0
    right 0
    bottom 0
    padding .3rem .2rem
    display flex
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
  >>>
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
</style>
