<template>
  <div class="filter-time">
    <h2>
      <span>开始日期</span>
      <span>结束日期</span>
    </h2>
    <div class="time-wrapper">
      <mt-picker ref="startPicker" :visibleItemCount="3" :slots="slotsStart" @change="startChange"></mt-picker>
      <mt-picker ref="endPicker" :visibleItemCount="3" :slots="slotsEnd" @change="endChange"></mt-picker>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Date',
  props: {
    ostartyear: Number,
    ostartmonth: Number,
    oendyear: Number,
    oendmonth: Number,
    changed: Boolean
  },
  data () {
    return {
      startPicker: '',
      endPicker: ''
    }
  },
  computed: {
    slotsStart () {
      return this._initSlot('start')
    },
    slotsEnd () {
      return this._initSlot('end')
    }
  },
  methods: {
    _initSlot (type) {
      let month = new Date().getMonth()
      let monthArr = []
      let monthIdx = null
      if ((this.ostartyear === 2017 && type === 'start') || (this.oendyear === 2017 && type === 'end')) {
        monthArr = [12]
        monthIdx = 0
      } else {
        for (let m = 0; m <= month; m++) {
          monthArr.push(m + 1)
        }
        monthIdx = this['o' + type + 'month'] - 1
      }
      let year = new Date().getFullYear()
      let yearArr = []
      let yearIdx = this['o' + type + 'year'] - 2017
      for (let y = 2017; y <= year; y++) {
        yearArr.push(y)
      }
      let slot = [
        {
          defaultIndex: yearIdx, // 默认第几个
          flex: 1,
          values: yearArr,
          textAlign: 'right'
        },
        {
          defaultIndex: monthIdx,
          flex: 1,
          values: monthArr
        }
      ]
      return slot
    },
    startChange (picker, values) {
      this.startPicker = picker
      this.pickerChange(picker, values[0])
    },
    endChange (picker, values) {
      this.endPicker = picker
      this.pickerChange(picker, values[0])
    },
    pickerChange (picker, val) {
      // this.startPicker.setValues([this.startyear, this.startmonth])
      // this.endPicker.setValues([this.endyear, this.endmonth])
      // 当年份改变时, 月份随着联动
      let monthArr = []
      if (val === 2017) {
        monthArr = [12]
        picker.setSlotValues(1, monthArr)
      } else if (val === new Date().getFullYear()) {
        for (let i = 1; i <= new Date().getMonth() + 1; i++) {
          monthArr.push(i)
        }
        picker.setSlotValues(1, monthArr)
      } else {
        monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        picker.setSlotValues(1, monthArr)
      }
      if (this.startPicker && this.endPicker) {
        let start = this.startPicker.getValues()
        let end = this.endPicker.getValues()
        this.$emit('dateRange', {
          startyear: start[0],
          startmonth: start[1],
          endyear: end[0],
          endmonth: end[1],
          changed: true
        })
      }
    }
  },
  updated () {
    // console.log(this.timerange)
  }
}
</script>
<style lang="stylus" scoped>
.filter-time >>>
  .picker
    flex 1
  .picker:first-child
    padding-right .22rem
  .picker:last-child
    padding-left .22rem
  .picker-item
    padding 0 .05rem
    color #0c6f92
  .picker-item.picker-selected
    color $borderColor
  .picker-center-highlight:before,
  .picker-center-highlight:after
    background-color $borderBottomColor
.filter-time
  h2
    margin .4rem 0 .14rem
    display flex
    span
      flex 1
      color #009ec5
      font-size .26rem
      text-align center
  .time-wrapper
    display flex
</style>
