import common from '../util/common.js'

let area = ''
let companytype = ''

let areaname = '' // 存放人员分析首页的地区
// 存放人员分析的开始结束年月
let {startyear, startmonth, endyear, endmonth} = common.initDate()

export default {
  area,
  companytype,
  areaname,
  startmonth,
  startyear,
  endmonth,
  endyear
}
