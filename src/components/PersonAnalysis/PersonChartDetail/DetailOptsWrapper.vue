<template>
  <div class="filter-opts">
    <template v-for="cate of filterOpts">
      <filter-opts :cate="cate" :key="cate.type" @getType="getFilterInfo"></filter-opts>
    </template>
    <div class="btns">
      <button class="reset-btn">重置</button>
      <button class="search-btn" @click="searchChart">搜索</button>
    </div>
  </div>
</template>
<script>
import FilterOpts from './FilterOpts'
export default {
  name: 'DetailOptsWrapper',
  props: {},
  components: {
    FilterOpts
  },
  data () {
    return {
      seachItem: {
        age: '不限',
        education: '不限',
        sex: '不限',
        political: '不限',
        retain: ['13个月留存率']
      },
      filterOpts: [
        {
          filter: 'radio',
          type: 'plitical',
          category: '政治面貌',
          catesList: [
            {
              name: '不限',
              idx: 0
            },
            {
              name: '群众',
              idx: 1
            },
            {
              name: '共青团员',
              idx: 2
            },
            {
              name: '中共党员',
              idx: 3
            },
            {
              name: '民主党派人士',
              idx: 4
            }
          ]
        },
        {
          filter: 'radio',
          type: 'education',
          category: '文化程度',
          catesList: [
            {
              name: '不限',
              idx: 0
            },
            {
              name: '初中及以下',
              idx: 1
            },
            {
              name: '高中',
              idx: 2
            },
            {
              name: '技工学校',
              idx: 3
            },
            {
              name: '中等专业学校和中等技术学校',
              idx: 4
            },
            {
              name: '大学专科和专科学校',
              idx: 5
            },
            {
              name: '大学本科',
              idx: 6
            },
            {
              name: '研究生',
              idx: 7
            },
            {
              name: '博士生',
              idx: 8
            }
          ]
        },
        {
          filter: 'radio',
          type: 'age',
          category: '年龄',
          catesList: [
            {
              name: '不限',
              idx: 0
            },
            {
              name: '18-24岁',
              idx: 1
            },
            {
              name: '25-34岁',
              idx: 2
            },
            {
              name: '35-44岁',
              idx: 3
            },
            {
              name: '45-54岁',
              idx: 4
            },
            {
              name: '55-64岁',
              idx: 5
            },
            {
              name: '65岁以上',
              idx: 6
            }
          ]
        },
        {
          filter: 'radio',
          type: 'sex',
          category: '性别',
          catesList: [
            {
              name: '不限',
              idx: 0
            },
            {
              name: '男',
              idx: 1
            },
            {
              name: '女',
              idx: 2
            }
          ]
        },
        {
          filter: 'multi',
          type: 'retain',
          category: '留存率',
          catesList: [
            {
              name: '13个月留存率',
              idx: 0
            },
            {
              name: '7个月留存率',
              idx: 3
            },
            {
              name: '4个月留存率',
              idx: 6
            },
            {
              name: '3个月留存率',
              idx: 6
            }
          ]
        }
      ]
    }
  },
  methods: {
    // 子组件传给父组件, 改变搜索条件值
    getFilterInfo (info) {
      this.seachItem[info.type] = info.item
    },
    // 搜索
    searchChart () {
      console.log(this.seachItem)
      this.$router.push({name: 'PersonChartsWrapper'})
    }
  }
}
</script>
<style lang="stylus" scoped>
.filter-opts
  box-sizing border-box
  padding 0 .1rem
  width 100%
  min-height 100%
  background linear-gradient(to bottom, #182649, #1d5174)
  overflow-y auto
  -webkit-overflow-scrolling touch
  .btns
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
</style>
