$(function(){
    $.ajax({
        url:'http://10.40.153.145:8888/user/findSalesman',
        type:'post',
        success:function(data){
           for(var i=0;i<data.length;i++){
              $("#userid").append('<option value='+data[i].userId+'>'+data[i].userId+'</option>' )
           }
           renderForm();
        } 
    });
    $(".btn").click(function(){
      if($("#profile").val()!=""&&$("#tel").val()!=""&&$("#email").val()!=""&&$("#userid").val()!=""){
        $.ajax({
        url:'http://10.40.153.145:8888/customer/addCustomer',
        type:'post',
        data:{
            profile:$("#profile").val(),
            tel:$("#tel").val(),
            email:$("#email").val(),
            state:$("input[type='radio']:checked").val(),
            cause:$("#cause").val(),
            userid:Number($("#userid").val())
        },
        success:function(data){
          if(data == "success"){
            layer.msg('添加成功');
          }
        } 
   })
     }
     else{
           layer.msg('不能为空哦！'); 
        }
       
 })
})
renderForm();
function renderForm(){
  layui.use('form', function(){
   var form = layui.form;
   form.render();
  /* form.render('select','selFilter'); */
  });
 }
function alert(){
  layui.use('layer', function(){ //独立版的layer无需执行这一句
  var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句  
  //触发事件
  var active = {
    confirmTrans: function(){
      //配置一个透明的询问框
      layer.msg('大部分参数都是可以公用的<br>合理搭配，展示不一样的风格', {
        btn: ['明白了', '知道了', '哦']
      });
  }
}
});
}