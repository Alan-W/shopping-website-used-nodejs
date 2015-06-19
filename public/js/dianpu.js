$(document).ready(function(){
	$('#parts').change(function() {
		var a=$('#parts').val(),
		b=$('#numplus').val();
		var c=a*b;
		parseInt(c);
		$('#numplus').val(c);
      
    })

        var url=document.location.search; 
    var proid = url.substr(4);
    $("#proid").attr("value",proid);
    $.ajax({
            url : "/pro-publish-info",
            async : true,
            type : 'post',
            data : {
                "proid" : proid
            },
            dataType : 'json',
            success : function(data) {

                var result;
                try {
                    result = eval(data);
                } catch (e) {
                    result = JSON.parse(data);
                }
                var str = result[0].editcode;
                $("#codebox").html(str);
            }
    });   
    });