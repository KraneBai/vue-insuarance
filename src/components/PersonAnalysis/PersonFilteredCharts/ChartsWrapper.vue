<template>
  <div class="filter-wrapper">
    <div class="filters" ref="swiper">
      <div class="swiper-wrapper">
        <filter-chart class="swiper-slide" :opts="sexOpts"></filter-chart>
        <filter-chart class="swiper-slide" :opts="politicalOpts"></filter-chart>
        <filter-chart class="swiper-slide" :opts="ageOpts"></filter-chart>
        <filter-chart class="swiper-slide" :opts="cultureOpts"></filter-chart>
        <filter-chart class="swiper-slide" :opts="industryOpts"></filter-chart>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import FilterChart from './Filter'
export default {
  name: 'FilterWrapper',
  components: {
    FilterChart
  },
  data () {
    return {
      sexOpts: {
        category: '性别',
        employee: 20236,
        percent: '22.11%',
        title: '性别分布',
        subtitle: '性别行业占比情况',
        data: [
          {
            name: '女',
            y: 35,
            color: '#ffc600',
            dataLabels: {
              color: '#ffc600'
            }
          },
          {
            name: '男',
            y: 65,
            color: '#00c3ff',
            dataLabels: {
              color: '#00c3ff'
            }
          }
        ],
        footerList: [
          {
            stage: '男',
            industry: 209413,
            company: 10941,
            percent: '5.13%'
          },
          {
            stage: '女',
            industry: 1920,
            company: 51,
            percent: '0.15%'
          }
        ]
      },
      ageOpts: {
        category: '年龄',
        employee: 20236,
        percent: '22.11%',
        title: '年龄分布',
        subtitle: '年龄行业占比情况',
        data: [
          {
            name: '18岁-24岁',
            y: 45,
            color: '#ffc600',
            dataLabels: {
              color: '#ffc600'
            }
          },
          {
            name: '25岁-34岁',
            y: 15,
            color: '#ff8400',
            dataLabels: {
              color: '#ff8400'
            }
          },
          {
            name: '35岁-44岁',
            y: 65,
            color: '#6edd42',
            dataLabels: {
              color: '#6edd42'
            }
          },
          {
            name: '45岁-54岁',
            y: 65,
            color: '#284dea',
            dataLabels: {
              color: '#284dea'
            }
          },
          {
            name: '55岁-64岁',
            y: 65,
            color: '#ed5a5a',
            dataLabels: {
              color: '#ed5a5a'
            }
          },
          {
            name: '65岁以上',
            y: 30,
            color: '#00c3ff',
            dataLabels: {
              color: '#00c3ff'
            }
          }
        ],
        footerList: [
          {
            stage: '18岁-24岁',
            industry: 209413,
            company: 12441,
            percent: '5.13%'
          },
          {
            stage: '25岁-34岁',
            industry: 209413,
            company: 12441,
            percent: '100.00%'
          },
          {
            stage: '35岁-44岁',
            industry: 209413,
            company: 12441,
            percent: '100.00%'
          },
          {
            stage: '45岁-54岁',
            industry: 209413,
            company: 12441,
            percent: '10.00%'
          },
          {
            stage: '55岁-64岁',
            industry: 209413,
            company: 12441,
            percent: '25.00%'
          },
          {
            stage: '65岁以上',
            industry: 209413,
            company: 12441,
            percent: '25.00%'
          }
        ]
      },
      politicalOpts: {
        category: '政治面貌',
        employee: 20236,
        percent: '22.11%',
        title: '政治面貌分布',
        subtitle: '政治面貌行业占比情况',
        data: [
          {
            name: '群众',
            y: 45,
            color: '#ffc600',
            dataLabels: {
              color: '#ffc600'
            }
          },
          {
            name: '民主党派人士',
            y: 55,
            color: '#00c3ff',
            dataLabels: {
              color: '#00c3ff'
            }
          },
          {
            name: '共青团员',
            y: 15,
            color: '#ff8400',
            dataLabels: {
              color: '#ff8400'
            }
          },
          {
            name: '中共党员',
            y: 12,
            color: '#6edd42',
            dataLabels: {
              color: '#6edd42'
            }
          }
        ],
        footerList: [
          {
            stage: '群众',
            industry: 209413,
            company: 10941,
            percent: '5.13%'
          },
          {
            stage: '共青团员',
            industry: 12441,
            company: 51,
            percent: '0.15%'
          },
          {
            stage: '中共党员',
            industry: 1920,
            company: 51,
            percent: '0.15%'
          },
          {
            stage: '民主党派人士',
            industry: 500,
            company: 5,
            percent: '1.15%'
          }
        ]
      },
      cultureOpts: {
        category: '文化程度',
        employee: 20236,
        percent: '22.11%',
        title: '文化程度分布',
        subtitle: '文化程度行业占比情况',
        data: [
          {
            name: '初中以下',
            y: 45,
            color: '#ffc600',
            dataLabels: {
              color: '#ffc600'
            }
          },
          {
            name: '高中',
            y: 15,
            color: '#ff8400',
            dataLabels: {
              color: '#ff8400'
            }
          },
          {
            name: '技工学校',
            y: 65,
            color: '#6edd42',
            dataLabels: {
              color: '#6edd42'
            }
          },
          {
            name: '大学本科',
            y: 65,
            color: '#284dea',
            dataLabels: {
              color: '#284dea'
            }
          },
          {
            name: '研究生',
            y: 65,
            color: '#ed5a5a',
            dataLabels: {
              color: '#ed5a5a'
            }
          },
          {
            name: '博士',
            y: 30,
            color: '#00c3ff',
            dataLabels: {
              color: '#00c3ff'
            }
          },
          {
            name: '中等专业学校和中等技术学校',
            y: 30,
            color: '#facd89',
            dataLabels: {
              color: '#facd89'
            }
          },
          {
            name: '大学专科和专科学校',
            y: 30,
            color: '#009acc',
            dataLabels: {
              color: '#009acc'
            }
          }
        ],
        footerList: [
          {
            stage: '初中以下',
            industry: 209413,
            company: 12441,
            percent: '5.13%'
          },
          {
            stage: '高中',
            industry: 209413,
            company: 12441,
            percent: '100.00%'
          },
          {
            stage: '技工学校',
            industry: 209413,
            company: 12441,
            percent: '100.00%'
          },
          {
            stage: '大学本科',
            industry: 209413,
            company: 12441,
            percent: '10.00%'
          },
          {
            stage: '研究生',
            industry: 209413,
            company: 12441,
            percent: '25.00%'
          },
          {
            stage: '博士',
            industry: 209413,
            company: 12441,
            percent: '25.00%'
          },
          {
            stage: '中等专业学校和中等技术学校',
            industry: 209413,
            company: 12441,
            percent: '25.00%'
          },
          {
            stage: '大学专科和专科学校',
            industry: 209413,
            company: 12441,
            percent: '25.00%'
          }
        ]
      },
      industryOpts: {
        cates: 'industry',
        category: '类型',
        employee: 20236,
        percent: '22.11%',
        subtitle: '单维度统计结果',
        data: [
          {
            name: '行业人数',
            y: 45,
            color: '#ffc600',
            dataLabels: {
              color: '#ffc600'
            }
          },
          {
            name: '公司人数',
            y: 55,
            color: '#00c3ff',
            dataLabels: {
              color: '#00c3ff'
            }
          }
        ],
        footerList: [
          {
            stage: '共青团员',
            industry: 209413,
            company: 12441,
            percent: '5.13%'
          },
          {
            stage: '18-24岁',
            industry: 209413,
            company: 12441,
            percent: '100.00%'
          },
          {
            stage: '高中',
            industry: 209413,
            company: 12441,
            percent: '100.00%'
          },
          {
            stage: '男',
            industry: 209413,
            company: 12441,
            percent: '100.00%'
          }
        ]
      }
    }
  },
  methods: {
    _swiper () {
      this.$nextTick(() => {
        this.swiper = new Swiper(this.$refs.swiper, {
          loop: false,
          direction: 'vertical',
          noSwipingSelector: '.chart-box' // 避免局部滑动的时候 滑动slider
        })
      })
    }
  },
  mounted () {
    this._swiper()
  }
}
</script>
<style lang="stylus" scoped>
.filter-wrapper
  position relative
  box-sizing border-box
  padding 0 .3rem 0
  page-style()
  .filters
    height 100%
    width 100%
    overflow hidden
</style>
