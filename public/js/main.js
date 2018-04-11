var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var multer = require('multer');

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// 创建连接
var connection = mysql.createConnection({
    host: '10.40.153.96',
    user: 'sa1',
    password: '123',
    database: 'crm'
});

// 进行连接数据库
connection.connect();

//接收登录请求
app.post('/login', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    var str = `select * from userinfo where account = '${req.body.name}'`;
    connection.query(str, function (error, results, fields) {
        if(results!=undefined){
            if (req.body.password == results[0].pwd) {
                if (results[0].identify == '业务员') {
                    res.send('salesman');
                } else if (results[0].identify == 'admin') {
                    res.send('admin');
                }
            } else {
                res.send('fail');
            }
        }else{
            res.send('fail');
        }
        
    });
})

//get all salesman
app.post('/user/findSalesman', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    connection.query(`select * from userinfo where identify = '业务员'`, function (error, results, fields) {
        if (error) {
            res.send('fail');
        } else {
            res.send(results);
        }
    });
})

//get a salesman by id
app.post('/user/findSalesmanById', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    connection.query(`select * from userinfo where userId = ${req.body.userid}`, function (error, results, fields) {
        if (error) {
            res.send('fail');
        } else {
            res.send(results[0]);
        }
    });
})

//get a user by account
app.post('/user/getUser', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    connection.query(`select * from userinfo where account = '${req.body.account}'`, function (error, results, fields) {
        if (error) {
            res.send('fail');
        } else {
            res.send(results[0]);
        }
    });
})

//admin && salesman  update infomation
app.post('/user/updateInfo', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    connection.query(`update userinfo set pwd = '${req.body.password}' , tel = '${req.body.tel}' , email =' ${req.body.email}' where userId = ${req.body.userid}`, function (error, results, fields) {
        if (error) {
            res.send('fail');
            return;
        } else {
            res.send('success')
        }
    });
})

//add userinfo
app.post('/user/addInfo', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    console.log(req.body)
    connection.query(`insert into userinfo(account,pwd,identify,tel,email,registerTime) values ('${req.body.accound}','${req.body.password}','${req.body.identify}','${req.body.tel}','${req.body.email}',now())`, function (error, results, fields) {
        if (error) {
            res.send('fail');
        } else {
            res.send('success');
        }
    });
})

//customer update infomation
app.post('/customer/updateCustomer', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    connection.query(`update customer set profile = '${req.body.profile}' , tel = '${req.body.tel}' , email =' ${req.body.email}' , state = '${req.body.state}' , cause = '${req.body.cause}' , userId = ${req.body.userid}  where customerId = ${req.body.customerid}`, function (error, results, fields) {
        if (error) {
            res.send('fail');
            return;
        } else {
            res.send('success')
        }
    });
})


//add customer
app.post('/customer/addCustomer', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    var str = `insert into customer(tel,email,profile,userId,state,cause) values ('${req.body.tel}','${req.body.email}','${req.body.profile}',${req.body.userid},'${req.body.state}','${req.body.cause}')`;
    console.log(str)
    connection.query(str, function (error, results, fields) {
        if (error) {
            res.send('fail');
        } else {
            res.send('success');
        }
    });
})

//get all customer
app.post('/customer/findAllCustomer', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    connection.query(`select * from customer`, function (error, results, fields) {
        if (error) {
            res.send('fail');
        } else {
            res.send(results);
        }
    });
})

//get a customer by id
app.post('/customer/findCustomerById', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    connection.query(`select * from customer where customerId = ${req.body.customerid}`, function (error, results, fields) {
        if (error) {
            res.send('fail');
        } else {
            res.send(results[0]);
        }
    });
})
//update product
app.post('/product/updateProduct', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    connection.query(`update product set name='${req.body.name}' , price = '${req.body.price}',img ='${req.body.img}', notic = '${req.body.notic}' where productId = ${req.body.productid}`, function (error, results, fields) {
        if (error) {
            res.send('fail');
        } else {
            res.send('success');
        }
    });
})

//get all product
app.post('/product/getAllProduct', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    connection.query(`select * from product`, function (error, results, fields) {
        if (error) {
            res.send('fail');
        } else {
            //console.log(results)
            res.send(results);
        }
    });
})

//get product by id
app.post('/product/getProductById', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    connection.query(`select * from product where productId = ${req.body.productid}`, function (error, results, fields) {
        if (error) {
            res.send('fail');
        } else {
            res.send(results[0]);
        }
    });
})

//add product
app.post('/product/addProduct', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    var str = `insert into product(name,price,img,notic) values ('${req.body.name}','${req.body.price}','${req.body.img}','${req.body.notic}')`;
    console.log(str)
    connection.query(str, function (error, results, fields) {
        if (error) {
            res.send('fail');
        } else {
            res.send('success');
        }
    });
})

//del user
app.post('/user/del', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    connection.query(`delete from userinfo where userid = ${req.body.userid}`, function (error, results, fields) {
        if (error) {
            res.send('fail');
        } else {
            res.send('success');
        }
    });
})

//del product
app.post('/product/del', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    var str = `delete from product where productId = ${req.body.productid}`;
    console.log(str)
    connection.query(str, function (error, results, fields) {
        if (error) {
            res.send('fail');
        } else {
            res.send('success');
        }
    });
})

//del customer
app.post('/customer/del', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    connection.query(`delete from customer where customerId = ${req.body.customerid}`, function (error, results, fields) {
        if (error) {
            res.send('fail');
        } else {
            res.send('success');
        }
    });
})



//add order
app.post('/oder/addorder', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    var branchid = Date.now();
    for (var i = 0; i < req.body.branch.length; i++) {
        connection.query(`insert into branch values ('${branchid}',${req.body.branch.productid},${req.body.branch.num},'${req.body.branch.price}')`, function (error, results, fields) {
            if (error) {
                res.send('fail');
                return;
            }
        });
    }
    connection.query(`insert into oder(customerId,userId,branchId) values (,${req.body.customerid},${req.body.userid},'${branchid}')`, function (error, results, fields) {
        if (error) {
            res.send('fail');
            return;
        } else {
            res.send('success');
        }
    });

})

//get order by id
app.post('/order/findOrderById', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    connection.query(`select * from oder where id = ${req.body.orderid}`, function (error, results, fields) {
        if (error) {
            res.send('fail');
        } else {
            var order = results[0];
            connection.query(`select * from branch where branchid = '${order.branchid}'`, function (error, results, fields) {
                if (error) {
                    res.send('fail');
                } else {
                    res.send({
                        order: order,
                        branch: results
                    })
                }
            });
        }
    });
})

//get all order
app.post('/order/getAllOrder', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    connection.query('select * from oder', function (error, results, fields) {
        if (error) {
            console.log(error)
            res.send('fail');
        } else {
            res.send({
                code:0,
                msg:"",
                count:1000,
                data:results
            });
        }
    });
})

//get order all branches
app.post('/order/getAllBranch', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    connection.query(`select * from oder where id = ${req.body.orderid}`, function (error, results, fields) {
        if (error) {
            res.send('fail');
        } else {
            var order = results[0];
            connection.query(`select * from branch where branchid = '${order.branchid}'`, function (error, results, fields) {
                if (error) {
                    res.send('fail');
                } else {
                    res.send(results);
                }
            });
        }
    });
})

//update branch
app.post('/order/updateBranch', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    connection.query(`select * from oder where id = ${req.body.orderid}`, function (error, results, fields) {
        if (error) {
            res.send('fail');
        } else {
            connection.query(`update branch set num = ${req.body.num} where productId = ${req.body.productid}`, function (error, results, fields) {
                if (error) {
                    res.send('fail');
                } else {
                    res.send('success');
                }
            });
        }
    });
})

//del branch
app.post('/order/updateBranch', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    connection.query(`select * from oder where id = ${req.body.orderid}`, function (error, results, fields) {
        if (error) {
            res.send('fail');
        } else {
            connection.query(`delete from branch where productId = ${req.body.productid}`, function (error, results, fields) {
                if (error) {
                    res.send('fail');
                } else {
                    res.send('success');
                }
            });
        }
    });
})

//get all notices
app.post('/notic/getAllNotic', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    connection.query(`select * from notic`, function (error, results, fields) {
        if (error) {
            res.send('fail');
        } else {
            res.send(results)
        }
    });
})

//get notic by id
app.post('/notic/getNoticById', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    connection.query(`select * from notic where id = ${req.body.id}`, function (error, results, fields) {
        if (error) {
            res.send('fail');
        } else {
            res.send(results[0])
        }
    });
})

//get notic by userid
app.post('/notic/getNoticByUserid', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    connection.query(`select * from notic where userid = ${req.body.userid}`, function (error, results, fields) {
        if (error) {
            res.send('fail');
        } else {
            res.send(results)
        }
    });
})

//del notic by id
app.post('/notic/getNoticById', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    connection.query(`delete from notic where id = ${req.body.id}`, function (error, results, fields) {
        if (error) {
            res.send('fail');
        } else {
            res.send('success')
        }
    });
})


//add notic
app.post('/notic/addNotic', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    connection.query(`insert into notic(userid,content,time,title) values(${req.body.userid},'${req.body.content}',now(),'${req.body.title}')`, function (error, results, fields) {
        if (error) {
            res.send('fail');
        } else {
            res.send('success')
        }
    });
})

//update notic
app.post('/notic/updateNotic', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    connection.query(`update notic set content = '${req.body.content}' , title = '${req.body.title}' , time = now() where id = ${req.body.id}`, function (error, results, fields) {
        if (error) {
            res.send('fail');
        } else {
            res.send('success')
        }
    });
})

//add dayoff
app.post('/dayoff/addDayoff', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    connection.query(`insert into dayoff(salesmanid,currTime,startTime,endTime,type,cause) values(${req.body.salesmanid},'${req.body.currtime}','${req.body.starttime}','${req.body.endtime}','${req.body.type}','${req.body.cause}','未批阅')`, function (error, results, fields) {
        if (error) {
            res.send('fail');
        } else {
            res.send('success')
        }
    });
})

//get All dayoff
app.post('/dayoff/getAllDayoff', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    connection.query(`select * from dayoff`, function (error, results, fields) {
        if (error) {
            res.send('fail');
        } else {
            res.send(results);
        }
    });
})

//get not pass dayoff
app.post('/dayoff/getNotPassDayoff', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    connection.query(`select * from dayoff where throught = '未批阅'`, function (error, results, fields) {
        if (error) {
            res.send('fail');
        } else {
            res.send(results);
        }
    });
})

//get pass dayoff
app.post('/dayoff/getPassDayoff', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    connection.query(`select * from dayoff where throught = '已批阅'`, function (error, results, fields) {
        if (error) {
            res.send('fail');
        } else {
            res.send(results);
        }
    });
})

//get old dayoff
app.post('/dayoff/getOldDayoff', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    connection.query(`select * from dayoff where salesmanid = ${req.body.userid}`, function (error, results, fields) {
        if (error) {
            res.send('fail');
        } else {
            res.send(results);
        }
    });
})
app.listen(8888);
console.log('start server')