function renderTable(){
   layui.use('table', function(){
   var table = layui.table;
   table.init('demo', {
   height: 200 ,
   limit: 5 ,
   text: {
    none: '暂无历史请假记录'
    }
   }); 
  });
 }
 renderTable();
 
 $(function() {
  var userid = "";
	//获取已登录用户账号
    getcookie();
    function getcookie() {
    	if($.cookie("user")){
    	 var obj1 = JSON.parse($.cookie("user"));
    	 console.log(obj1)
        for (var i in obj1) {
            $("#acount").val(i);
            userid = i;
         }
    	}
    	else{
    		return false;
    	} 
    }
     $(".btn").click(function(){
      if($("#textaer").val()!=""&&$("#time1").val()!=""&&$("#time2").val()!=""){
        $.ajax({
        url:'http://10.40.153.145:8888/dayoff/addDayoff',
        type:'post',
        data:{
            salesmanid:Number($("#acount").val()),
            starttime:$("#time1").val(),
            endtime:$("#time2").val(),
            type:$("#type").val(),
            cause:$("#textaer").val()
        },
        success:function(data){
          if(data == "success"){
            layer.msg('申请成功');
          }
        } 
   })
     }
     else{
           layer.msg('不能为空哦！'); 
        }
       
 })
     var str="";
 $.ajax({
        url:'http://10.40.153.145:8888/dayoff/getOldDayoff',
        type:'post',
        data:{
          userid:Number(userid)
        },
        success:function(data){
          console.log(data)
           for(var i=0;i<data.length;i++){
             str +=`<tr>
              <td>${data[i].salesmanid}</td>
              <td>${data[i].type}</td>
              <td>${data[i].cause}</td>
              <td>${data[i].throught}</td>
              <td>${data[i].startTime}</td>
              <td>${data[i].endTime}</td>
              <td>${data[i].currTime}</td></tr>`;
           }
            $("#tbody").html(str);
            renderTable()
        } 
  });
   
})
 