  //不为空验证
  $(document).ready(function(){
     function focusHidden(dom) {
        dom.next('.errMsg').hide();
    }
    function blurShow(dom,tips) {
        dom.next('.errMsg').html(tips).css({
            display: 'inline-block'
        }).show();
        return false;
    }
    function validateConfirm() {
        var confirmDom = $('#buyParts');
        var parts = parseInt(confirmDom.val());
        if (confirmDom.val() == '' || confirmDom.val() == 'undefiend') {
            confirmDom.next('.errMsg').html('此项内容不能为空！').css({
                display: 'inline-block'
            }).show();
            if ($('#partsLst').children('p').length > 0) {
                $('#partsLst').empty();
            }
            return false;
        }
        else if (!$.isNumeric(confirmDom.val())) {
            confirmDom.next('.errMsg').html('此项内容必须为数字').show();
            return false;
        }
        else if(parts> 199) {
            confirmDom.next('.errMsg').html('您输入的份数超出最大份额').css({
                display: 'inline-block'
            }).show();
            return false;
        }
        else
            return true;
    }
    function changingParts() {
        var sumMoney = parseInt($('#wholeMoney').val()),
        pubPro = parseInt($('#pubProportion').val()),
        pubEarn = parseInt($('#pubEarn').val()),
        perParts = parseInt($('#buyParts').val());
        if ( validateConfirm()) {
            if ($('#partsLst').children('p').length > 0) {
                $('#partsLst').empty();
            }
            if (sumMoney!=0 && pubPro!=0 && pubEarn!=0 && perParts!=0) {
                var i,len;
                for(i=1,len=perParts; i<=len; i++){
                    var p = $('<p></p>'),
                    span1 = $('<span></span>').text('份数: ' + i),
                    span2 = $('<span></span>').text('金额: ' + parseInt(sumMoney/i));
                    p.append(span1, span2);
                    $('#partsLst').append(p);
                }
                $('#perLowset').text(parseInt(sumMoney/perParts));
            };
            if (sumMoney==0) {
                $('#perLowset').text('0');
            };
        };
    }
    function changingPercent() {
        var all = $('#wholeMoney').val(),
        pub = $('#pubProportion').val(),
        pubEarn = $('#pubEarn').val();
        if (!$.isNumeric(all) || !$.isNumeric(pub)) {
          $('#pubPercent').text(0+ '%');
          $('#invPropotion').text(0 +'%');
      }
      else {
        $('#pubPercent').text(parseInt(pub/all*100) + '%');
        $('#invPropotion').text(parseInt(100-pub/all*100)  + '%');
    };
    if ($.isNumeric(pubEarn)) {
        $('#invEarn').text(100- parseInt(pubEarn) + '%');
    };
    if (parseInt(all) == 0) {
        $('#pubPercent').text(0+ '%');
        $('#invPropotion').text(0 +'%');
        $('#pubEarn').text(0 +'%');
        $('#invEarn').text(0 +'%');
        $('#perLowset').text(0 +'%');
    };
}
$('.validate').each(function() {
    $(this).focus(function() {
        focusHidden($(this));
    })
})
$('.validate').each(function() {
    $(this).blur(function() {
        if ($(this).val() =='' || $(this).val() =='undefiend') {
            blurShow($(this),'此项内容不能为空');
        }
    })
})
$('.number-validate').focus(function() {
    focusHidden($(this));
})
$('.number-validate').blur(function() {
 if ($(this).val() =='' || $(this).val() =='undefiend') {
    blurShow($(this),'此项内容不能为空');
}
else if (!$.isNumeric($(this).val())) {
    blurShow($(this),'此项内容必须为数字');
};
})
$('.address').each(function() {
    $(this).focus(function() {
        $('#addressErr').hide();
    })
})
$('.address').each(function() {
    $(this).blur(function() {
        if ($(this).val() =='0') {
            $('#addressErr').html('此项必须选择').css({
                display: 'inline-block'
            }).show();
        }
    })
})
$('select').each(function() {
    $(this).focus(function() {
        focusHidden($(this));
    })
})
$('select').each(function() {
    $(this).blur(function() {
        if ($(this).val() == '0') { 
            blurShow($(this),'此项必须选择');
        };
    })
})
$('#buyParts').focus(function() {
   focusHidden($(this));
})
$('#buyParts').blur(function() {
    validateConfirm();
})
$('#buyParts').change(function() {
    changingParts();
})
$('#wholeMoney').change(function() {
    changingParts();
})
$('#pubEarn').change(function() {
    changingPercent();
})
$('input[type = "file"]').blur(function() {
    $('.errChoice').hide();
});
$('input[type = "file"]').focus(function() {
    $('.errChoice').hide();
    if ($(this).val() == "" || $(this).val() == 'undefiend') {
        $('.errChoice').html('您还没选择何文件').css({
            display: 'inline-block'
        }).show();
        return false;
    };
})
$('#nextSecond').click(function() {

    if (!validateForm()) {
        alert('温馨提示：请填写相关字段');
    }
})

$('#pubProportion').change(function() {
 changingPercent();
})
$('#wholeMoney').change(function() {
 changingPercent();
})
    //submit 提交表单验证
    function validateForm() {
        if ($('#checkBox').checked == false) return false
        else if ($('#name').val() == "" || $('#name').val() == 'undefiend') return false;
        else if ($('#money').val() == "" || $('#money').val() == 'undefiend') return false;
        else if ($('#province-lst').val() == 0 ) return false;
        else return true;
    }
    //ajax动态加载推荐份数
    function init () {
        changingParts();
        changingPercent();
    }
    init();

})

//页面加载后向数据库请求相关信息  特例，只适用于一个特定对象
// $(document).ready(function(){
//     var ss='小李飞刀万寿寺店'
//     $.ajax({
//             url : "/pro-publish-info",
//             async : true,
//             type : 'post',
//             data : {
//                 "proname" : ss
//             },
//             dataType : 'json',
//             success : function(data) {

//                 var result;
//                 try {
//                     result = eval(data);
//                 } catch (e) {
//                     result = JSON.parse(data);
//                 }
//                 $("#title-pro").html(result[0].remarkName);
//             }
//     });
// });