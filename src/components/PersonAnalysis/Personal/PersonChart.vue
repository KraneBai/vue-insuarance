<template>
  <div class="personnel">
    <!-- 离司/人员概览/入司 -->
    <div class="chart-inner border" ref="chartbox">
      <h2 class="border-bottom"><span>{{type.category}}</span><i @click="toFilter">详细</i></h2>
      <section class="chart-top">
        <dl>
          <dt>{{type.top.left}}</dt>
          <dd>{{type.top.leftNum}}</dd>
        </dl>
        <dl class="orange">
          <dt>{{type.top.right}}</dt>
          <dd>{{type.top.rightPer}}</dd>
        </dl>
          <highcharts class="pie" ref="pieChart" :options="pieOpt"></highcharts>
      </section>
      <h2 class="border-bottom">{{type.subcategory}}</h2>
      <div class="chart-box">
        <highcharts :options="lineOpt"></highcharts>
      </div>
    </div>
    <footer class="border" ref="wrapper" v-if="hasFooter">
      <div ref="tabContent">
        <section ref="tabItem" v-for="item in type.footerList" :key="item.id">
          <dl>
            <dt>{{item.newTit}}</dt>
            <dd>{{item.newMount}}</dd>
          </dl>
          <dl class="orange">
            <dt>{{item.industryTit}}</dt>
            <dd>{{item.industryMount}}</dd>
          </dl>
          <div class="line border-right" v-if="type.footerList.length !== item.id"></div>
        </section>
      </div>
    </footer>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  name: 'PersonnelChart',
  props: {
    type: Object
  },
  computed: {
    hasFooter () {
      return this.type.type !== 'add'
    }
  },
  data () {
    return {
      common: {
        chart: {
          spacing: [0, 0, 0, 0],
          backgroundColor: '#192749'
        },
        colors: ['#ffc600', '#00c3ff'],
        credits: {
          enabled: false
        },
        title: {
          text: null
        },
        tooltip: {
          enabled: false
        },
        legend: {
          squareSymbol: false,
          symbolHeight: 2,
          symbolWidth: 12,
          floating: true,
          align: 'right',
          verticalAlign: 'top',
          labelFormatter () {
            return '<div style="font-weight: normal; color:' + this.color + '">' + this.name + '</div>'
          }
        }
      },
      lineOpt: {
        chart: {
          spacing: [0, 0, 0, 0],
          backgroundColor: '#192749',
          width: 1000,
          height: 200,
          marginTop: 45
        },
        colors: ['#ffc600', '#00c3ff'],
        credits: {
          enabled: false
        },
        title: {
          text: null
        },
        tooltip: {
          enabled: false
        },
        legend: {
          squareSymbol: false,
          symbolHeight: 2,
          symbolWidth: 12,
          floating: true,
          align: 'right',
          verticalAlign: 'top',
          labelFormatter () {
            return '<div style="font-weight: normal; color:' + this.color + '">' + this.name + '</div>'
          }
        },
        plotOptions: {
          line: {
            marker: {
              symbol: 'circle'
            },
            enableMouseTracking: false,
            lineWidth: 1
          }
        },
        xAxis: {
          categories: ['2018-01', '2018-02', '2018-03', '2018-04', '2018-05', '2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12'],
          labels: {
            style: {
              color: '#fff'
            }
          },
          lineColor: '#2c3459',
          title: {
            text: '年月',
            style: {
              color: '#fff'
            }
          },
          tickLength: 0 // 刻度线长度
        },
        yAxis: {
          labels: {
            style: {
              color: '#fff'
            }
          },
          lineColor: '#2c3459',
          lineWidth: 1, // 默认0 x轴默认1
          gridLineColor: '#2c3459', // 数据线颜色
          title: {
            text: '人员数(人)',
            style: {
              color: '#fff'
            },
            align: 'high',
            offset: -10,
            rotation: 0,
            y: -20,
            x: 10
          },
          tickInterval: 100 // 数据数间隔
        },
        series: [{
          name: '行业',
          data: [100, 200, 300, 400, 500, 600, 700]
        }, {
          name: '公司',
          data: [500, 100, 300, 250, 700, 200, 600]
        }]
      },
      pieOpt: {
        chart: {
          backgroundColor: '#192749',
          spacing: [0, 0, 0, 0],
          margin: 0
        },
        colors: ['#ffc600', '#00c3ff'],
        credits: {
          enabled: false
        },
        title: {
          text: null
        },
        tooltip: {
          enabled: false
        },
        legend: {
          squareSymbol: false,
          symbolHeight: 2,
          symbolWidth: 12,
          float: true,
          align: 'right',
          verticalAlign: 'top',
          labelFormatter () {
            return '<div style="font-weight: normal; font-size: .16rem; color:' + this.color + '">' + this.name + '</div>'
          },
          layout: 'vertical'
        },
        plotOptions: {
          pie: {
            size: '80%',
            dataLabels: {
              connectorColor: '#00c3ff',
              color: '#00c3ff',
              distance: 5
            }
          },
          series: {
            states: {
              hover: {
                enabled: false // 划过或点击效果
              }
            },
            showInLegend: true, // 是否显示图例
            borderWidth: 0, // 图的边框
            dataLabels: {
              format: '{y}%',
              connectorPadding: 0, // 线和label的距离
              style: {
                fontSize: '10',
                textOutline: 'none' // 文字去除阴影
              },
              softConnector: false // 线条硬朗？
            }
          }
        },
        series: [{
          center: ['20%', '50%'],
          type: 'pie',
          data: [
            {
              name: '本公司',
              y: 90.44
            },
            {
              name: '其他公司',
              y: 9.56,
              dataLabels: {
                enabled: false
              }
            }
          ]
        }]
      }
    }
  },
  methods: {
    toFilter () {
      this.$router.push({name: 'PersonDetailOpts'})
    },
    _initScroll () {
      this.$nextTick(() => {
        if (this.$refs.tabItem) {
          let len = this.$refs.tabItem.length
          // 计算横向滚动区域内的宽度 否则无法横向滚动
          let width = this.$refs.tabItem[0].getBoundingClientRect().width * len
          this.$refs.tabContent.style.width = width + 'px'
          if (!this.scrollX) {
            this.scrollX = new BScroll(this.$refs.wrapper, {
              eventPassthrough: 'vertical',
              startX: 0,
              scrollX: true,
              scrollY: false
            })
          } else {
            this.scrollX.refresh()
          }
        }
      })
    }
  },
  mounted () {
    this._initScroll()
    // 新增人员时没有底部 动态调整位置
    if (this.type.type === 'add') {
      this.$refs.chartbox.style.bottom = '.3rem'
    }
  }
}
</script>
<style lang="stylus" scoped>
>>>
  .highcharts-legend-item
    position relative
    padding-top .2rem
    .highcharts-point
      position absolute
      top 0
      left 0
.personnel
  position relative
  height 100%
  color $txtColor
  .border
    section-border()
  .border-bottom
    &::before
      border-color $borderBottomColor
  .chart-inner
    position absolute
    box-sizing border-box
    padding 0 .2rem
    top 0
    bottom 1.9rem
    left 0
    right 0
    h2
      display flex
      height .78rem
      line-height .78rem
      font-size .26rem
      i
        flex 1
        padding-right .35rem
        font-size .22rem
        text-align right
        bg-img(.12rem, .22rem, right .1rem, center)
        background-image url(../../../assets/images/arrow_right.png)
  section
    display flex
    align-items center
    height 1.96rem
    dl
      text-align center
      dt
        margin-bottom .15rem
        font-size .2rem
      dd
        font-size .5rem
    .orange
      margin 0 .3rem
      dt
        color $orangeTopColor
      dd
        color $orangeBottomColor
    .pie
      flex 1
      height 100%
      overflow hidden
  .chart-box
    overflow auto
    width 100%
    height 3rem
    .legend
      margin-top .2rem
      display flex
      color $commonTxtColor
      font-size .16rem
      p
        &.legend-right
          flex: 1
          text-align right
          span
            position relative
            padding-top .2rem
            display inline-block
            height .35rem
            &::before
              content ''
              position absolute
              top 0
              left 0
              width .16rem
              height .03rem
          .first
              margin-right .1rem
              color #ffff43
              &::before
                background #ffff43
          .last
              color #00ccff
              &::before
                background #00ccff
  footer
    position absolute
    box-sizing border-box
    bottom .3rem
    left 0
    right 0
    overflow hidden
    white-space nowrap
    div
      display flex
      flex-wrap nowrap
      section
        flex 1
        min-width 3rem
        height 1.4rem
        dl
          flex 1
          dd
            font-size .4rem
        .line
          width .1rem
          height .6rem
          &::before
            border-color $txtColor
      .orange
        margin 0
</style>
