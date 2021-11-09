// 加载模块
let mongoose = require('mongoose')
// 链接只需要链接一次
mongoose.connect('mongodb://localhost:27017/locServe').then(res=>{
    console.log('链接数据库成功')
}).catch(err=>{
    console.log(err)
})

// 创建表的构造函数 Schema
let Schema = mongoose.Schema;
// 创建 表结构
let EffectiveSchema = new Schema({
    id: Number,
    max_acreage: Number, //卫星最大服务面积(平方公里)
    serve_acreage: Number, //卫星实际服务面积(平方公里)
    source_useable: Number, //卫星可用资源(MHz)
    source_need: Number, // 用户资源需求(MHz)
    source_used: Number, // 用户实际使用资源(MHz)
    ocupancy_rate: Number, // 资源占用率(百分比)
    saticfaction: Number, // 满意度(百分比)
    user_cnt: Number, // 卫星服务的用户个数
    user_onbusiness_cnt: Number, // 有业务的用户个数
    user_nobusiness_cnt: Number, // 无业务的用户个数
},{
    timestamps:true
})
// 表结构映射到 数据库中
let Effective = mongoose.model('effective',EffectiveSchema);
let TestSchema = new Schema({
    satid: Number, //卫星最大服务面积(平方公里)
},{
    timestamps:true
})

module.exports = {Effective,TestSchema}