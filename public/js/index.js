var showloginblock=function(){
	document.getElementById("indexloginblock").setAttribute('style','display:block;')
}
var hideloginblock=function(){
	document.getElementById("indexloginblock").setAttribute('style','display:none;')
}
$(document).ready(function(){
	$.ajax({
            url : "/project-info",
            async : true,
            type : 'post',
            data : {
                "state" : '0'
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
                $("#project-container").html();
                $("#project-container1").html();
                $("#project-container2").html();
                $("#project-container3").html();
                for (var i = 0; i < result.length; i++) {
                    var row = result[i];
                    //str += '<li><span>' + row.remarkName + '</span> <span>' + 'ddffggg' + '个页面</span></li>';
                    str += '<div class="single-project"><a href=""><img src="'+ row.logo+'"/></a><div class="pro-title clearfix"><a href="">' + row.remarkName + '</a><strong>' +row.province+ '</strong><p>' +'better perching'+ '</p></div><p class="financed"><em>已筹资</em>'+'Y 1225000.00'+'</p><div class="progress"><span><b>'+'98%'+'</b></span></div><div class="financing-ask clearfix"><div class="total"><p>Y125万</p><p>众筹融资总额</p></div><div class="perbuy"><p>Y2.5万</p><p>单投资人最低出额</p></div></div><div class="exchange"><em>关注：'+'173'+'</em><em>约谈：'+'21'+'</em><em>认购：'+'29'+'</em></div></div>';
                }
                $("#project-container").html(str);
                $("#project-container1").html(str);
                $("#project-container2").html(str);
                $("#project-container3").html(str);

            }
    });
	
});
var finexpend=function(){
	if(document.getElementById("project-container").style.height!='auto')
		document.getElementById("project-container").setAttribute('style','height:auto;');
	else
		document.getElementById("project-container").setAttribute('style','height:460px;');
}
// function loadpage(){
// 	loadpage();
// }