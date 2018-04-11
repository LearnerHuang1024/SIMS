var str="";
 $.ajax({
        url:'http://10.40.153.145:8888/customer/findAllCustomer',
        type:'post',
        success:function(data){
           for(var i=0;i<data.length;i++){
             str +=`<tr>
              <td>${data[i].customerId}</td>
				      <td>${data[i].profile}</td>
				      <td>${data[i].tel}</td>
				      <td>${data[i].email}</td>
				      <td>${data[i].userId}</td>
				      <td>${data[i].state}</td>
				      <td>${data[i].cause}</td></tr>`;
           }
            $("#tbody").html(str);
            renderTable()
        } 
  });
 renderTable()
function renderTable(){
   layui.use('table', function(){
   var table = layui.table;
   table.init('demo', {
   height: 450 ,//设置高度
   limit: 9 ,//注意：请务必确保 limit 参数（默认：10）是与你服务端限定的数据条数一致
   page:true,
   text: {
    none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
    }
   }); 
   tooldmo(table);
  });
 }
 //单条查询客户
 function inquiry(){
  var str="";
  $("#btn1").click(function(){
    var num = Number($("#searval").val());
    if(num){
      $.ajax({
        url:'http://10.40.153.145:8888/customer/findCustomerById',
        type:'post',
        data:{customerid:Number($("#searval").val())},
        success:function(data){
          console.log(data.customerId)
             str =`<tr>
              <td>${data.customerId}</td>
              <td>${data.profile}</td>
              <td>${data.tel}</td>
              <td>${data.email}</td>
              <td>${data.userId}</td>
              <td>${data.state}</td>
              <td>${data.cause}</td></tr>`;
            $("#tbody").html(str);
            renderTable()
        } 
  });
     }
     else{
        layer.msg('请正确输入');
     }
     
  })
 }
 inquiry();
function tooldmo(table){
  table.on('tool(demo)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
    var data = obj.data //获得当前行数据
    ,layEvent = obj.event; //获得 lay-event 对应的值
    if(layEvent === 'edit'){
      console.log(data.userid)
      var html = "custormer.html";
      $(".layui-body").load(html,function(){
           $("#custormerid").val(data.customerId),
           $("#profile").val(data.profile),
           $("#tel").val(data.tel),
           $("#email").val(data.email),
           $("input[type='radio']:checked").val(data.state),
           $("#cause").val(data.cause),
           $("#userid").val(data.userid)
      });
    } else if(layEvent === 'del'){
      layer.confirm('真的删除行么', function(index){
        obj.del(); //删除对应行（tr）的DOM结构
        layer.close(index);
        //向服务端发送删除指令
        $.ajax({
        url:'http://10.40.153.145:8888/customer/del',
        type:'post',
        data:{
          customerid:Number(data.customerId),
        },
        success:function(data){
          console.log(data);
          if(data=="success"){

           layer.msg('删除成功');
          }
        } 
     });
      });
    } 
  });
}
function renderForm(){
  layui.use('form', function(){
   var form = layui.form;
   form.render();
  });
 }
 renderForm()
          
        


