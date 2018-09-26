let curDay = new Date()
let endyear = curDay.getFullYear()
let endmonth = curDay.getMonth() + 1
let startmonth = endmonth - 6 >= 1 ? endmonth - 6 : 12 - Math.abs(endmonth - 6)
let startyear = endmonth - 6 >= 1 ? endyear : endyear - 1
// try {
//   // if (localStorage.city) {
//   //   defaultCity = localStorage.city
//   // }
// } catch (error) {

// }

export default {
  startyear,
  startmonth,
  endyear,
  endmonth
}
