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
            var str0 = '<caption>项目方提交的等待审核的项目</caption><tr class="trh"><th>发布人</th><th>项目名称</th><th>项目所在地</th><th>联系方式</th><th>是否同意</th></tr>';              
            var str1 = '<caption>预热中的项目</caption><tr class="trh"><th>发布人</th><th>项目名称</th><th>项目所在地</th><th>联系方式</th><th>是否同意</th></tr>';              
            var str2 = '<caption>融资中的项目</caption><tr class="trh"><th>发布人</th><th>项目名称</th><th>项目所在地</th><th>联系方式</th><th>是否同意</th></tr>';              
            var str3 = '<caption>已成功的项目</caption><tr class="trh"><th>发布人</th><th>项目名称</th><th>项目所在地</th><th>联系方式</th><th>是否同意</th></tr>';              
            var str4 = '<caption>已分红的项目</caption><tr class="trh"><th>发布人</th><th>项目名称</th><th>项目所在地</th><th>联系方式</th></tr>';              
            
            for (var i = 0; i < result.length; i++) {
                var row = result[i];
                if(row.state=='0'){
                str0 += '<tr id="tr'+i+'"><td>'+row.issuer+'</td><td>'+row.remarkName+'</td><td>'+row.province+'</td><td>'+row.contant+'</td><td><span class="spanagree" ID="'+row._id+'">同意</span><span class="spannoagree" ID="'+row._id+'">不同意</span></td></tr>';
                }
                if(row.state=='1'){
                str1 += '<tr id="tr'+i+'"><td>'+row.issuer+'</td><td>'+row.remarkName+'</td><td>'+row.province+'</td><td>'+row.contant+'</td><td><span class="spanagree1" ID="'+row._id+'">预热完成</span></td></tr>';
                }
                if(row.state=='2'){
                str2 += '<tr id="tr'+i+'"><td>'+row.issuer+'</td><td>'+row.remarkName+'</td><td>'+row.province+'</td><td>'+row.contant+'</td><td><span class="spanagree2" ID="'+row._id+'">融资完成</span></td></tr>';
                }
                if(row.state=='3'){
                str3 += '<tr id="tr'+i+'"><td>'+row.issuer+'</td><td>'+row.remarkName+'</td><td>'+row.province+'</td><td>'+row.contant+'</td><td><span class="spanagree3" ID="'+row._id+'">开始分红</span></td></tr>';
                }
                if(row.state=='4'){
                str4 += '<tr id="tr'+i+'"><td>'+row.issuer+'</td><td>'+row.remarkName+'</td><td>'+row.province+'</td><td>'+row.contant+'</td></tr>';
                }
            }
            $("#pro-table0").html(str0);
            $("#pro-table1").html(str1);
            $("#pro-table2").html(str2);
            $("#pro-table3").html(str3);
            $("#pro-table4").html(str4);
            $(".spanagree").each(function(){
              $(this).click(function(){
                var $this=$(this);
                var id = $(this).attr('ID'); 
                $.ajax({
                    
                    url : "/examine-pass",
                    async : true,
                    type : 'post',
                    data : {
                        "id" : id
                    },
                    dataType : 'json',
                    success:function(data){
                        $this.parent().parent().remove();  
                    }
                })
              });
            });
            $(".spanagree1").each(function(){
              $(this).click(function(){
                var $this=$(this);
                var id = $(this).attr('ID'); 
                $.ajax({
                    
                    url : "/examine-passaaa",
                    async : true,
                    type : 'post',
                    data : {
                        "id" : id
                    },
                    dataType : 'json',
                    success:function(data){
                        $this.parent().parent().remove();  
                    }
                })
              });
            });
            $(".spanagree2").each(function(){
              $(this).click(function(){
                var $this=$(this);
                var id = $(this).attr('ID'); 
                $.ajax({
                    
                    url : "/examine-passbbb",
                    async : true,
                    type : 'post',
                    data : {
                        "id" : id
                    },
                    dataType : 'json',
                    success:function(data){
                        $this.parent().parent().remove();  
                    }
                })
              });
            });
            $(".spanagree3").each(function(){
              $(this).click(function(){
                var $this=$(this);
                var id = $(this).attr('ID'); 
                $.ajax({
                    
                    url : "/examine-passccc",
                    async : true,
                    type : 'post',
                    data : {
                        "id" : id
                    },
                    dataType : 'json',
                    success:function(data){
                        $this.parent().parent().remove();  
                    }
                })
              });
            });
            $(".spannoagree").each(function(){
              $(this).click(function(){
                var $this=$(this);
                var id = $(this).attr('ID'); 
                $.ajax({
                    
                    url : "/examine-nopass",
                    async : true,
                    type : 'post',
                    data : {
                        "id" : id
                    },
                    dataType : 'json',
                    success:function(data){
                        $this.parent().parent().remove();  
                    }
                })
              });
            });
           
        }
    });
});