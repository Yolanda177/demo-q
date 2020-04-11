/*
 * @Author: maolf
 * @Date: 2019-08-05 17:10:41
 * @LastEditors: Liangqq
 * @LastEditTime: 2020-04-03 09:31:50
 * @Description: 根据当前选择的时间类型，输出下一层级的时间
 */
/* 用于时间格式转换 */
import dayjs from 'dayjs'

const getTimeByType = (item, Times, TimeTypes, currentNodeLevel) => {
  const data = []
  let start = 1
  let end = ''

  debugger
  // 时间类型
  const timeId = item.typeId
  // 时间类型对象
  const timeObj = TimeTypes[timeId]
  // 当前时间类型
  const currentLevel = item.level
  // 时间类型对应的信息
  const currentObj = TimeTypes[currentLevel]
  // 当前时间类型级别
  const levelIndex = TimeTypes[timeId].chain.indexOf(item.level)

  if (currentLevel === Times.YEAR) {
    start = new Date().getFullYear() - 20
    end = start + 40
  } else if (currentLevel === Times.DAY) {
    end = dayjs(`${item.parentYear}-${item.parentMonth}`).daysInMonth()
  } else {
    end = currentObj.maxValue
  }

  for (let i = start; i <= end; i++) {
    const timeItem = {
      label: currentObj.format.replace(
        '$',
        (`${i}`).padStart(currentObj.length, '0')
      ),
      value: (`${i}`).padStart(currentObj.length, '0'),
      typeId: timeId,
      level: timeObj.chain[levelIndex + 1]
        ? timeObj.chain[levelIndex + 1]
        : currentLevel,
      leaf: timeObj.chain.length === currentNodeLevel,
      // children: [],
      // loading: false,
      parentYear: currentLevel === Times.MONTH ? item.value : '',
      parentMonth:
        currentLevel === Times.MONTH
          ? (`${i}`).padStart(currentObj.length, '0')
          : ''
    }
    if (!timeObj.chain[levelIndex + 1]) {
      delete timeItem.loading
    }
    data.push(timeItem)
  }
  return data
}
export default getTimeByType
