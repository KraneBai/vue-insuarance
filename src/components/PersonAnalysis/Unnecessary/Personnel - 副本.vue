<template>
  <div class="personnel">
    <!-- 离司/人员概览/入司 -->
    <div class="chart-inner border" ref="chartbox">
      <h2 class="border-bottom"><span>人员概览</span><i>详细</i></h2>
      <section class="chart-top">
        <dl>
          <dt>在册人力</dt>
          <dd>21457</dd>
        </dl>
        <dl class="orange">
          <dt>行业占比</dt>
          <dd>10.15%</dd>
        </dl>
        <div class="pie">
          <!-- <pie-chart></pie-chart> -->
        </div>
        <div>
          1 2 3 5
        </div>
      </section>
      <h2 class="border-bottom">人员变动走势图</h2>
      <div class="chart-box">
        <div class="legend">
          <p>人员数(人)</p>
          <p class="legend-right">
            <span class="first">行业</span>
            <span class="last">公司</span>
          </p>
        </div>
        <highcharts :width="1000" :height="100" :options="options"></highcharts>
      </div>
    </div>
    <footer class="border">
      <div>
        <section>
          <dl>
            <dt>新增人数</dt>
            <dd>1158</dd>
          </dl>
          <dl class="orange">
            <dt>行业占比</dt>
            <dd>13.51%</dd>
          </dl>
          <div class="line border-right"></div>
        </section>
        <section>
          <dl>
            <dt>离司人数</dt>
            <dd>1367</dd>
          </dl>
          <dl class="orange">
            <dt>行业占比</dt>
            <dd>13.51%</dd>
          </dl>
          <div class="line border-right"></div>
        </section>
        <section>
          <dl>
            <dt>公司留存率</dt>
            <dd>75.52%</dd>
          </dl>
          <dl class="orange">
            <dt>行业留存率</dt>
            <dd>100.00%</dd>
          </dl>
        </section>
      </div>
    </footer>
  </div>
</template>
<script>
// import { Line, Pie } from 'vue-chartjs'
export default {
  name: 'Personnel',
  // components: {
  //   BarChart: {
  //     extends: Line,
  //     props: {
  //       height: Number
  //     },
  //     data () {
  //       return {
  //         data: {
  //           labels: ['1', '2', '3', '4', '5', '6', '7'],
  //           datasets: [
  //             {
  //               label: '行业',
  //               borderWidth: 1,
  //               borderColor: '#ffff43',
  //               pointBorderColor: '#ffff43',
  //               pointBackgroundColor: '#ffff43',
  //               backgroundColor: '#ffff43',
  //               fill: false, // 图标囊括的面积是否被填充, 设false, 否则遮挡另一条线
  //               data: [200, 300, 400, 500, 600, 700]
  //             },
  //             {
  //               label: '公司',
  //               borderWidth: 1,
  //               borderColor: '#00ccff',
  //               pointBorderColor: '#00ccff',
  //               pointBackgroundColor: '#00ccff',
  //               backgroundColor: '#00ccff',
  //               fill: false,
  //               data: [600, 700, 400, 200, 100, 300]
  //             }
  //           ]
  //         },
  //         options: {
  //           responsive: true,
  //           legend: {
  //             display: false,
  //             labels: {
  //               boxWidth: 16,
  //               fontSize: 10,
  //               fontColor: '#00ccff',
  //               usePointStyle: true // 使用圆形样式
  //             }
  //           },
  //           elements: {
  //             line: {
  //               tension: 0 // disables bezier curves
  //             }
  //           },
  //           scales: {
  //             xAxes: [{
  //               scaleLabel: {
  //                 display: true,
  //                 labelString: '年月',
  //                 fontColor: '#fff'
  //               },
  //               ticks: {
  //                 fontColor: '#fff'
  //               },
  //               gridLines: {
  //                 display: false,
  //                 color: '#2c3459'
  //               }
  //             }],
  //             yAxes: [{
  //               beginAtZero: true,
  //               ticks: {
  //                 min: 0,
  //                 padding: 10,
  //                 stepSize: 100,
  //                 fontColor: '#fff'
  //               },
  //               gridLines: {
  //                 display: true,
  //                 color: '#2c3459',
  //                 tickMarkLength: 0,
  //                 zeroLineColor: '#2c3459'
  //                 // drawTicks: false
  //               }
  //               // labels: [200, 800],
  //               // scaleLabel: {
  //               //   display: true,
  //               //   labelString: '人员数(人)',
  //               //   fontColor: '#fff'
  //               // },
  //             }]
  //           }
  //         }
  //       }
  //     },
  //     mounted () {
  //       this.renderChart(this.data, this.options)
  //     }
  //   },
  //   PieChart: {
  //     extends: Pie,
  //     data () {
  //       return {
  //         data: {
  //           labels: ['本公司', '其他公司'],
  //           datasets: [
  //             {
  //               backgroundColor: ['#ffff43', '#00ccff'],
  //               data: ['29.56', '70.44'],
  //               borderColor: 'transparent'
  //             }
  //           ]
  //         },
  //         options: {
  //           responsive: true,
  //           maintainAspectRatio: true,
  //           tooltip: {
  //             callbacks: {
  //               label: function () {
  //                 return 1111
  //               }
  //             }
  //           },
  //           legend: {
  //             position: 'right',
  //             display: false,
  //             labels: {
  //               padding: 0,
  //               boxWidth: 16,
  //               fontSize: 10,
  //               fontColor: '#00ccff'
  //             }
  //           }
  //           // elements: {
  //           //   line: {
  //           //     tension: 0 // disables bezier curves
  //           //   }
  //           // },
  //           // scales: {
  //           //   xAxes: [{
  //           //     scaleLabel: {
  //           //       display: true,
  //           //       labelString: '年月',
  //           //       fontColor: '#fff'
  //           //     },
  //           //     ticks: {
  //           //       fontColor: '#fff'
  //           //     },
  //           //     gridLines: {
  //           //       display: false,
  //           //       color: '#2c3459'
  //           //     }
  //           //   }],
  //           //   yAxes: [{
  //           //     beginAtZero: true,
  //           //     ticks: {
  //           //       min: 0,
  //           //       padding: 10,
  //           //       stepSize: 100,
  //           //       fontColor: '#fff'
  //           //     },
  //           //     gridLines: {
  //           //       display: true,
  //           //       color: '#2c3459',
  //           //       tickMarkLength: 0,
  //           //       zeroLineColor: '#2c3459'
  //           //       // drawTicks: false
  //           //     }
  //           //     // labels: [200, 800],
  //           //     // scaleLabel: {
  //           //     //   display: true,
  //           //     //   labelString: '人员数(人)',
  //           //     //   fontColor: '#fff'
  //           //     // },
  //           //   }]
  //           // }
  //         }
  //       }
  //     },
  //     mounted () {
  //       this.renderChart(this.data, this.options)
  //     }
  //   }
  // },
  data () {
    return {
      // height: 250
      options: {
        title: {
          text: 'Monthly Average Temperature',
          x: -20 //center
        },
        subtitle: {
          text: 'Source: WorldClimate.com',
          x: -20
        },
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
          ]
        },
        yAxis: {
          title: {
            text: 'Temperature (°C)'
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },
        tooltip: {
          valueSuffix: '°C'
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          borderWidth: 0
        },
        series: [{
          name: 'Tokyo',
          data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
          name: 'New York',
          data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
          name: 'Berlin',
          data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }, {
          name: 'London',
          data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
      }
    }
  },
  methods: {
  },
  mounted () {
    // console.log(this.$refs.chartbox.offsetHeight)
    // this.height = this.$refs.chartbox.offsetHeight - 176
    // console.log(this.options)
  }
}
</script>
<style lang="stylus" scoped>
// .chart-box > div
//   height inherit
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
    div
      width 100%
      display flex
      overflow-x auto
      section
        min-width 50%
        max-width 50%
        height 1.4rem
        dl
          flex 1
          dd
            font-size .4rem
        .line
          width 0.1rem
          height .6rem
          &::before
            border-color $txtColor
      .orange
        margin 0
</style>
