$(function(){
	var str = '';
	$.ajax({
		url:'http://10.40.153.145:8888/notic/getAllNotic',
		type:'post',
		success:function(data){	
			for(var i= 0;i<data.length;i++)
			{
				str+='<li><em>'+data[i].id+'</em><span><a href="##" class = "click">'+data[i].title+'</a></span><strong>'+data[i].time+'</strong></li><hr>';
			}
			$("#tbody").html(str);		
			$("#tbody").on("click",".click",function(){
		var html = "notcontent.html";
		console.log($(this).parent().prev().html());
		var num = $(this).parent().prev().html()
		$(".layui-body").load(html,function(){
			$(".form").attr("data-id",num);
		});
		})
		}
	})
})
//单条公告查询
   function inquiry(){
var str="";
$("#btn").click(function(){
    	var num = $("#user").val();
    if(num){
      $.ajax({     	
        url:'http://10.40.153.145:8888/notic/getNoticById',
        type:'post',
        data:{id:num},
        success:function(data){	
			str='<li><em>'+data.id+'</em><span><a href="##" class = "click">'+data.title+'</a></span><strong>'+data.time+'</strong></li><hr>';
			console.log(str)
			    $("#tbody").html(str);
		}  
	})
    }else{
        layer.msg('请正确输入');
    }    
})
 }
inquiry();

