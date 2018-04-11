# SIMS
组长：王晓堂   组员：温富欣  黄聪汉  陈海超 


# 登录  

请求方式:post

url:http://10.40.153.145:8888/login

传递参数:name,password

返回类型:string

返回值:"fail"（账号或密码错误）  "salesman"（进入销售员的界面）  "admin"（进入管理员的界面）

# 新增管理员或业务员账号  

请求方式:post

url:http://10.40.153.145:8888/user/addInfo

传递参数:accound,password,tel,email,identify

返回类型:string

返回值:"fail"（新增失败）  "success"（新增成功）

# 查询所有业务员

请求方式:post

url:http://10.40.153.145:8888/user/findSalesman

传递参数:无

返回类型:[{}]  || string

返回值:[{}]('查询成功时')  'fail'('查询失败时')

# 查询单个业务员

请求方式:post

url:http://10.40.153.145:8888/user/findSalesmanById

传递参数:userid

返回类型:object  || string

返回值:object('查询成功时')   'fail'('查询失败时')


# 管理员、业务员修改个人资料    //只可修改密码、联系方式、邮箱

请求方式:post

url:http://10.40.153.145:8888/user/updateInfo

传递参数:userid,password,tel,email

返回类型:string

返回值:"fail"（修改失败）  "success"（修改成功）


# 查询管理员、业务员个人资料    

请求方式:post

url:http://10.40.153.145:8888/user/getUser

传递参数:account

返回类型:string

返回值:"fail"（修改失败）  "success"（修改成功）



# 修改客户资料    //只可修改密码、联系方式、邮箱

请求方式:post

url:http://10.40.153.145:8888/customer/updateCustomer

传递参数:customerid,profile,tel,email,state,cause,userid

返回类型:string

返回值:"fail"（修改失败）  "success"（修改成功）


# 新增客户资料

请求方式:post

url:http://10.40.153.145:8888/customer/addCustomer

传递参数:profile,tel,email,state,cause,userid

返回类型:string

返回值:"fail"（新增失败）  "success"（新增成功）


# 查询所有客户资料

请求方式:post

url:http://10.40.153.145:8888/customer/findAllCustomer

传递参数:无

返回类型:string ||  [{}]

返回值:"fail"（查询失败时）  [{}]（查询成功）


# 查询单个客户资料

请求方式:post

url:http://10.40.153.145:8888/customer/findCustomerById

传递参数:customerid

返回类型:string ||  {}

返回值:"fail"（查询失败时）  {}（查询成功）


# 新增商品信息

请求方式:post

url:http://10.40.153.145:8888/product/addProduct

传递参数:name,price,img,notic

返回类型:string

返回值:"fail"（新增失败）  "success"（新增成功）

# 修改商品信息

请求方式:post

url:http://10.40.153.145:8888/product/updateProduct

传递参数:productid,name,price,img,notic

返回类型:string

返回值:"fail"（新增失败）  "success"（新增成功）

# 查询所有商品信息

请求方式:post

url:http://10.40.153.145:8888/product/getAllProduct

传递参数:无

返回类型:[{}] || string

返回值:[{}]('查询成功时')  'fail'('查询失败时')


# 查询单个商品信息

请求方式:post

url:http://10.40.153.145:8888/product/getProductById

传递参数:productid

返回类型:object  ||  string

返回值:{}('查询成功时')   'fail'('查询失败时')

# 删除用户

请求方式:post
url:http://10.40.153.145:8888/user/del

传递参数:userid

返回类型 :string

返回值: 'fail'    'success'

# 删除商品

请求方式:post
url:http://10.40.153.145:8888/product/del

传递参数:productid

返回类型 :string

返回值: 'fail'    'success'

# 删除客户

请求方式:post
url:http://10.40.153.145:8888/customer/del

传递参数:customerid

返回类型 :string

返回值: 'fail'    'success'


# 新增订单

请求方式:post

url:http://10.40.153.145:8888/order/addorder

传递参数:

//对象数组，存储商品的id，数量和价格,封装的名字为branch

branch:[{productid,num,price}]

//客户id
customerid

//销售员id
userid

返回类型:string

返回值:"fail"（新增失败）  "success"（新增成功）

# 查询单个订单   （整个订单信息包括分支）

请求方式:post
url:http://10.40.153.145:8888/order/findOrderById

传递参数:oderid

返回类型 :obj  || string

返回值: 

'fail'('查询失败')

查询成功时返回object

    {
        
        order:{} , //客户customerId  业务员userId

        branch:[{}]    //产品productId，数量num，价格price
    }

# 查询所有订单    （只返回客户，业务员，订单号，时间，【时间即小分支id，可下一步查询所有小分支】）

请求方式:post
url:http://10.40.153.145:8888/order/getAllOrder

传递参数:无

返回类型 :string

返回值: 'fail'    'success'

# 查询一个订单的所有分支

请求方式:post
url:http://10.40.153.145:8888/order/getAllBeanch

传递参数:orderid

返回类型 :string

返回值: 'fail'  [{}]branch数组(成功时)

# 查询一个订单的所有分支

请求方式:post
url:http://10.40.153.145:8888/order/getAllBranch

传递参数:orderid

返回类型 :string

返回值: 'fail'  [{}]branch数组(成功时)

# 修改订单（即修改订单下面的分支）

请求方式:post
url:http://10.40.153.145:8888/order/updateBranch

传递参数:orderid,productid,num

返回类型 :string

返回值: 'fail'  'success'

# 删除订单下面的某个分支

请求方式:post
url:http://10.40.153.145:8888/order/updateBranch

传递参数:orderid,productid

返回类型 :string

返回值: 'fail'  'success'


# 查询所有公告

请求方式:post
url:http://10.40.153.145:8888/notic/getAllNotic

传递参数:无

返回类型 :string  ||   [{}]

返回值: 'fail'('失败时')    [{}]('成功时')


# 查询单个公告

请求方式:post
url:http://10.40.153.145:8888/notic/getNoticById

传递参数:id

返回类型 :string  ||   {}

返回值: 'fail'('失败时')    {}('成功时')


# 查询自己发布的公告

请求方式:post
url:http://10.40.153.145:8888/notic/getNoticByUserid

传递参数:userid

返回类型 :string  ||   [{}]

返回值: 'fail'('失败时')    [{}]('成功时')


# 删除单个公告

请求方式:post
url:http://10.40.153.145:8888/notic/DeleteNotic

传递参数:id

返回类型 :string  

返回值: 'fail'   'success'


# 新增公告

请求方式:post
url:http://10.40.153.145:8888/notic/addNotic

传递参数:userid,content,title

返回类型 :string  

返回值: 'fail'   'success'

# 修改公告   (只可修改内容和标题)

请求方式:post
url:http://10.40.153.145:8888/notic/updateNotic

传递参数:id,content,title

返回类型 :string  

返回值: 'fail'   'success'

# 新增请假申请

请求方式:post
url:http://10.40.153.145:8888/dayoff/addDayoff

传递参数:salesmanid,currtime,starttime,endtime,type,cause

返回类型 :string  

返回值: 'fail'   'success'

# 查询所有请假申请

请求方式:post
url:http://10.40.153.145:8888/dayoff/getAllDayoff

传递参数:无

返回类型 :string  || [{}]

返回值: 'fail'   [{}]

# 查询未批阅申请请假申请

请求方式:post
url:http://10.40.153.145:8888/dayoff/getNotPassDayoff

传递参数:无

返回类型 :string  || [{}]

返回值: 'fail'      [{}]

# 查询已批阅申请请假申请

请求方式:post
url:http://10.40.153.145:8888/dayoff/getPassDayoff

传递参数:无

返回类型 :string  || [{}]

返回值: 'fail'   [{}]


# 查询自己的历史请假申请

请求方式:post
url:http://10.40.153.145:8888/dayoff/getOldDayoff

传递参数:userid

返回类型 :string  || [{}]

返回值: 'fail'   [{}]