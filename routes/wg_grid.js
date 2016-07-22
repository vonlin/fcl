var express = require('express');
var route = express.Router();

route.getList = function(db){
    return function (req, res) {
        var query = req.query;
        var page = query.page;
        var size = query.size;
        console.log("page:" + page + " , size:" + size);
        var collection = db.get('wg_grid_table');
        //var set = collection.find({});
        //set.skip((page - 1) * size);
        //set.limit(size);
        //console.log(set)
        //
        //set.exec(function(err,res){
        //    if(err){
        //        res.send(err);
        //    }else{
        //        set.skip((page - 1) * size);
        //        set.limit(size);
        //        colllection.find(function(err,docs){
        //            res.json({success:"ok",list:docs,totalRecord:docs.length});
        //        });
        //    }
        //});

        collection.find({}, {}, function (e, docs) {
            var total = docs.length%size == 0 ? docs.length/size : Math.floor(docs.length/size) + 1;
            res.json({success:"ok",list:docs.slice((page-1)*size,size*page),total:total,totalRecord : docs.length});
        });
        //res.json({list:set});
    };
};

route.add = function(db){
    return function(req,res){
        var query = req.body;
        var managerCode = query.code;
        var mangerName = query.name;
        var year = query.year;
        var month = query.month;
        var reportFileName = query.filename;
        var collection = db.get('wg_grid_table');
        collection.insert({
            "managerCode": managerCode,
            "mangerName": mangerName,
            "year": year,
            "month": month,
            "projectCount": 4,
            "reportStyle": "本期",
            "reportFileName": reportFileName
        },function(e,docs){
            res.json({success:"ok"});
        });
    }
};

route.delete = function(db){
    return function(req,res){
        var id = req.body.id;
        var collection = db.get('wg_grid_table');
        collection.remove({_id : id},function(e,docs){
            res.json({success:"ok"});
        });
    };
};

route.update = function(db){
    return function(req,res){
        var query = req.body;
        var managerCode = query.code;
        var mangerName = query.name;
        var year = query.year;
        var month = query.month;
        var reportFileName = query.filename;
        var id = query.id;
        var collection = db.get('wg_grid_table');
        collection.update({_id : id},{$set:{"managerCode": managerCode,
            "mangerName": mangerName,
            "year": year,
            "month": month,
            "projectCount": 4,
            "reportStyle": "更改后的本期",
            "reportFileName": reportFileName}
        },function(e,docs){
            res.json({success:"ok"});
        });
    };
};

route.view = function(db){
    return function(req,res){
        var id = req.query.id;
        var collection = db.get('wg_grid_table');
        collection.findOne({_id : id},function(e,docs){
            res.json({success:"ok",data:docs});
        });
    };
};

module.exports = route;