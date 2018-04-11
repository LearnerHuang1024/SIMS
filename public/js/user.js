
$(function() {
	var userid = 0;
	//获取已登录用户账号
    getcookie();
    function getcookie() {
    	if($.cookie("user")){
    	 var obj1 = JSON.parse($.cookie("user"));
        for (var i in obj1) {
            userlist(i);
         }
    	}
    	else{
    		return false;
    	} 
    }
//获取用信息
  function userlist(i){
   var str="";
 $.ajax({
        url:'http://10.40.153.145:8888/user/getUser',
         type:'post',
        data:{
        	account:Number(i)
        },
        success:function(data){
        	console.log(data);
        	$("#account").val(data.account);
        	$("#pwd").val(data.pwd);
        	$("#tel").val(data.tel);
        	$("#email").val(data.email);
        	$("#identify").val(data.identify);
        	userid=Number(data.userId);
        } 

  });
 }
 //修改用户信息
 $(".btn4").click(function(){
 	console.log(Number($("#account").val()),$("#pwd").val(),$("#tel").val(),$("#email").val())
 	$.ajax({
 		type:'post',
        url:'http://10.40.153.145:8888/user/updateInfo',
        data:{
        	//account:Number($("#account").val()),
        	userid:userid,
        	password:$("#pwd").val(),
        	tel:$("#tel").val(),
        	email:$("#email").val()
        },
        success:function(data){
            console.log(data)

           }
  });
 })
  function randomform(){
	layui.use('form', function(){
    var form = layui.form;
     form.render(); 
 });
}
randomform()

 })


