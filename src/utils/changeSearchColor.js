//本函数实现： 将检索结果中的关键字变色
//例如，搜索西瓜， 则得到大兴西瓜，西瓜变成灰色，其他为黑色
import _ from 'lodash'
const changeSearchColor = (allStr, str) => {
    return _.replace(allStr, str, `<span style="color: #605b5b">${str}</span>`)
}
export default changeSearchColor