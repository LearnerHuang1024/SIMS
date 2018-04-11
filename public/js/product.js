function renderTable(){
   layui.use('table', function(){
   var table = layui.table;
   table.init('demo', {
<<<<<<< HEAD
   height: 300 ,//ÉèÖÃ¸ß¶È
   limit: 5 ,//×¢Òâ£ºÇëÎñ±ØÈ·±£ limit ²ÎÊý£¨Ä¬ÈÏ£º10£©ÊÇÓëÄã·þÎñ¶ËÏÞ¶¨µÄÊý¾ÝÌõÊýÒ»ÖÂ
   page:true,
   text: {
    none: 'ÔÝÎÞÏà¹ØÊý¾Ý' //Ä¬ÈÏ£ºÎÞÊý¾Ý¡£×¢£º¸ÃÊôÐÔÎª layui 2.2.5 ¿ªÊ¼ÐÂÔö
=======
   height: 300 ,
   limit: 5 ,
   page:true,
   text: {
    none: '暂无相关数据'
>>>>>>> d1ca6b97584c4fb0166fb947d7eb930f048e6471
    }
   }); 
   tooldmo(table);
  });
 }
<<<<<<< HEAD
 renderTable()//äÖÈ¾±í¸ñ
 //ÉÌÆ·²éÑ¯
=======
 renderTable()
>>>>>>> d1ca6b97584c4fb0166fb947d7eb930f048e6471
 function productlist(){
   var str="";
 $.ajax({
        url:'http://10.40.153.145:8888/product/getAllProduct',
        type:'post',
        success:function(data){
           for(var i=0;i<data.length;i++){
             str +=`<tr>
              <td>${data[i].productId}</td>
              <td>${data[i].name}</td>
              <td>${data[i].price}</td>
              <td>${data[i].img}</td>
              <td>${data[i].notic}</td>`;
           }
            $("#tbody").html(str);
            renderTable()
        } 
  });
 }
 productlist();
 //添加数据
  $(".btn").click(function(){
   var file = $("#img").val();
   var fileName ="../img/"+getFileName(file);
      if($("#name").val()!=""&&$("#price").val()!=""&&$("#img").val()!="",$("#notic").val()!=""){
        $.ajax({
        url:'http://10.40.153.145:8888/product/addProduct',
        type:'post',
        data:{
            name:$("#name").val(),
            price:$("#price").val(),
            img:fileName,
            notic:$("#notic").val(),
            
        },
        success:function(data){
        } 
     })
        layer.msg('添加成功');
     }
     else{
           layer.msg('不能为空哦！'); 
        }
       

})
  function getFileName(o){
    var pos=o.lastIndexOf("\\");
    return o.substring(pos+1); 
 }
  //单条查询商品
 function inquiry(){
  var str="";
  $("#btn2").click(function(){
    var num = Number($("#product").val());
    if(num){
      $.ajax({
        url:'http://10.40.153.145:8888/product/getProductById',
        type:'post',
        data:{productid:Number($("#product").val())},
        success:function(data){
          console.log(data.productid)
             str =`<tr>
              <td>${data.productId}</td>
              <td>${data.name}</td>
              <td>${data.price}</td>
              <td>${data.img}</td>
              <td>${data.notic}</td>`;
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
//元素操作
function tooldmo(table){
  table.on('tool(demo)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
    var data = obj.data //获得当前行数据
    ,layEvent = obj.event; //获得 lay-event 对应的值
    if(layEvent === 'edit'){
      var html = "custormer.html";
      $(".layui-body").load(html);
     
    } else if(layEvent === 'del'){
      console.log(Number(data.productId));
      layer.confirm('真的删除行么', function(index){
        obj.del(); //删除对应行（tr）的DOM结构
        layer.close(index);
        //向服务端发送删除指令
        $.ajax({
        url:'http://10.40.153.145:8888/product/del',
        type:'post',
        data:{
            productid:Number(data.productId)
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
$("#look").click(function(){
  var file = $("#img").val();
   var fileName ="../img/"+getFileName(file);
   console.log(fileName)
   $("#myimg").attr("src",fileName);
  $(".productpic").css("display","block");
})