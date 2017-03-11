let fs = require('fs')
let data = fs.readFileSync(__dirname + '/../static/data/data.json')
let int = Number.parseInt

data = JSON.parse(data)

const saveIntoFile = () => {
  fs.writeFileSync(__dirname + '/../static/data/data.json', JSON.stringify(data))
}

model = {
  get () {
    return data
  },

  set (newRecord) {
    for (let record of data) {
      if (int(record.year) === int(newRecord.year) &&
        int(record.month) === int(newRecord.month) &&
        int(record.date) === int(newRecord.date)) { // 更新已有记录
        record.items = newRecord.items
        saveIntoFile()
        return
      }
    }
    data.push(newRecord) // 添加新纪录
    data.sort((a, b) => { // 按照时间排序
      let t1 = new Date(a.year + '-' + a.month + '-' + a.date)
      let t2 = new Date(b.year + '-' + b.month + '-' + b.date)
      if (t1.getTime() < t2.getTime()) return 1
      if (t1.getTime() > t2.getTime()) return -1
      return 0
    })
    saveIntoFile()
  }
}

module.exports = model