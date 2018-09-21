<template>
  <div class="personnel">
    <!-- 离司/人员概览/入司 -->
    <div class="chart-inner border" ref="chartbox">
      <div class="chart-inner-top">
        <h2 class="border-bottom"><span>{{type.category}}</span><i @click="toFilterChartDetail(type.type)">详细</i></h2>
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
        <h3 class="border-bottom">{{type.subcategory}}</h3>
      </div>
      <div class="chart-box-wrapper">
        <div class="chart-box">
          <highcharts :options="lineOpt"></highcharts>
        </div>
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
  name: 'PChart',
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
      commonChart: {
        colors: ['#ffc600', '#00c3ff'],
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
            return '<div style="font-weight: normal; font-size: .18rem; color:' + this.color + '">' + this.name + '</div>'
          }
        }
      },
      lineOpt: {
        chart: {
          spacing: [0, 0, 0, 0],
          backgroundColor: '#192749',
          marginTop: 25,
          marginRight: 15
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          line: {
            marker: {
              symbol: 'circle'
            },
            enableMouseTracking: false,
            lineWidth: 1,
            dataLabels: {
              enabled: true,
              style: {
                color: this.color,
                fontWeight: 'normal',
                fontSize: '10',
                textOutline: 'none' // 文字去除阴影
              }
            }
          },
          series: {
            pointStart: Date.UTC(2018, 0, 1), // 2018-01-01开始
            pointIntervalUnit: 'month'
          }
        },
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: {
            month: '%Y-%m'
          },
          // categories: ['2018-1', '2018-2', '2018-3', '2018-4', '2018-5', '2018-6', '2018-7', '2018-8', '2018-9', '2018-10', '2018-11', '2018-12', '2019-1', '2019-2', '2019-3', '2019-4', '2019-5', '2019-6', '2019-7', '2019-8', '2019-9', '2019-10', '2019-11', '2019-12'],
          labels: {
            style: {
              color: '#fff',
              fontSize: '8px'
            }
          },
          lineColor: '#2c3459',
          title: {
            text: '年月',
            style: {
              fontSize: '9',
              color: '#fff'
            }
          },
          // tickPixelInterval: 10,
          tickLength: 0 // 刻度线长度
        },
        yAxis: {
          labels: {
            style: {
              fontSize: '8',
              color: '#fff' // y轴显示颜色
            }
          },
          min: 0,
          endOnTick: false, // 最顶部多出来线条
          lineColor: '#2c3459', // y轴颜色
          lineWidth: 1, // 默认0 x轴默认1
          gridLineColor: '#2c3459', // 数据线颜色
          title: {
            text: '人员数(人)',
            style: {
              fontSize: '9',
              color: '#fff'
            },
            align: 'high',
            offset: -10,
            rotation: 0,
            y: -10,
            x: 10
          },
          tickInterval: 100 // 数据数间隔
          // tickPixelInterval: 10,
        }
      },
      pieOpt: {
        chart: {
          spacing: [0, 0, 0, 0],
          backgroundColor: '#192749',
          margin: 0
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          series: {
            size: '75%',
            center: ['20%', '30%'],
            states: {
              hover: {
                enabled: false // 划过或点击效果
              }
            },
            showInLegend: true, // 是否显示图例
            borderWidth: 0, // 图的边框
            dataLabels: {
              format: '{y}%',
              color: '#00c3ff',
              distance: 5,
              connectorColor: '#00c3ff',
              connectorPadding: 0, // 线和label的距离
              style: {
                fontSize: '8',
                textOutline: 'none' // 文字去除阴影
              },
              softConnector: false // 线条硬朗？
            }
          }
        }
      }
    }
  },
  methods: {
    toFilterChartDetail (type) {
      this.$router.push({name: 'PersonDetailOpts', query: {type}})
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
    },
    _initChart () {
      // pie图  动态改变obj的值
      this.pieOpt = Object.assign({}, this.commonChart, this.pieOpt, this.type.pieData)
      this.pieOpt.legend = Object.assign({}, this.pieOpt.legend, {layout: 'vertical'})
      this.pieOpt.legend = Object.assign({}, this.pieOpt.legend, {x: 5, y: -5})
      this.pieOpt.legend = Object.assign({}, this.pieOpt.legend, {symbolWidth: 0})
      // line图
      this.lineOpt = Object.assign({}, this.commonChart, this.lineOpt, this.type.lineData)
    }
  },
  mounted () {
    this._initScroll()
    this._initChart()
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
    padding 2.82rem .2rem .2rem
    position absolute
    box-sizing border-box
    top 0
    bottom 1.9rem
    left 0
    right 0
    .chart-inner-top
      position absolute
      top 0
      left .2rem
      right .2rem
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
      h3
        display flex
        height .58rem
        line-height .58rem
        font-size .26rem
  section
    display flex
    align-items center
    height 1.46rem
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
      overflow hidden
      position relative
      height 100%
  .chart-box-wrapper
    overflow scroll
    width 100%
    height 100%
    .chart-box
      width 30rem
      height 100%
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
