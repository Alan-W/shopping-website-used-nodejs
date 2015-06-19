$(document).ready(function(){
    var issuer=$("#privname").text();
    
    $.ajax({
        url : "/per-publish-info",
        async : true,
        type : 'post',
        data : {
            "issuer" : issuer
        },
        dataType : 'json',
        success : function(data) { 
            var result;
            try {
                result = eval(data);
            } catch (e) {
                result = JSON.parse(data);
            }
            var str = "";
            for (var i = 0; i < result.length; i++) {

               str +='<div class="published"><img src="'+result[i].logo+'"/><div class="publup"><p class="pname">'+result[i].remarkName+'</p><p class="updata"><a href="publish?id='+result[i]._id+'">修改|</a></p></div><div class="publdown"><p>地区：'+result[i].province+'</p><p>行业：'+result[i].type+'</p></div></div>';
           }
           $("#published-box").html(str);
       }
   });   
});