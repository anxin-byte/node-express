var express = require("express")
var router = express.Router();
let {Effective} = require("../models/effective")
let {TestSchema} = require("../models/effective")
/* GET effective listing. */
router.get('/', function(req, res, next) {
    for(let i=0; i<1000; i++){
        TestSchema.create({satid:1})
    }

    // let param = req.query.page ? 1 : req.query.page;
    // let start = (param - 1) * req.query.items_per_page;
    //
    // Effective.query('SELECT * from locServe', function(err, result) {
    //
    //     if (err){
    //         res.json({
    //             success:false,
    //             list:[],
    //             pagination:null
    //         })
    //     }else{
    //         let allCount=result.length;
    //         let allPage = parseInt(allCount)/req.query.items_per_page;
    //         let pagination={
    //             allCount:allCount,
    //             allPage:allPage,
    //             page:param
    //         }
    //         let shuju=[];
    //         for(var i=start;i<(start+req.query.items_per_page);i++){
    //             shuju.push(result[i]);
    //         }
    //         res.json({
    //             success:true,
    //             list:shuju,
    //             pagination:pagination
    //             // count:Math.ceil(count/pageSize)
    //         })
    //         //res.jsonp(shuju);
    //     };
    //
    // })
    //

    // let count = 0
    // Effective.count({}, (err, num) => {
    //     count = num
    // })
    // let pageNum = (+req.query.page)
    // let pageSize = +req.query.items_per_page
    Effective.find({})
        .sort({id:1})//排序
        // .skip((pageNum - 1) * pageSize)//跳过的条数
        // .limit(pageSize)//读取的条数
        .exec().then(data=>{
        res.json({
            success:true,
            list:data,
            // count:Math.ceil(count/pageSize)
        })
    })
});

module.exports = router;