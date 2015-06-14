window.onload=function(){
	document.getElementById("usermold").checked = true;
}
function checkEmail(){
	
	if(document.getElementById("emails").value==""){
		document.getElementById("c_img_email").className='err-img';
	    document.getElementById("h_email").innerHTML="请输入邮箱";
	    return false;
    }
    else{
        document.getElementById("c_img_email").className='';
	    document.getElementById("h_email").innerHTML="";

    }
}

function checkName(){
	if(document.getElementById("name").value==""){
		document.getElementById("c_img_name").className='err-img';
	    document.getElementById("h_name").innerHTML="请输入姓名";
	    return false;
    }
    else{
    	document.getElementById("c_img_name").className='';
	    document.getElementById("h_name").innerHTML="";
    }
}

function checkPhone(){
	if(document.getElementById("phone").value==""){
		document.getElementById("c_img_phone").className='err-img';
	    document.getElementById("h_phone").innerHTML="请输入手机号";
	    return false;
    }
    else{
    	document.getElementById("c_img_phone").className='';
	    document.getElementById("h_phone").innerHTML="";
	}
}

function checkPassword(){
	if(document.getElementById("password").value==""){
		document.getElementById("c_img_password").className='err-img';
	    document.getElementById("h_password").innerHTML="请输入密码";
	    return false;
    }
    else{
    	document.getElementById("c_img_password").className='';
	    document.getElementById("h_password").innerHTML="";
    }
}

function checkPassworda(){
	if(document.getElementById("passworda").value==""){
		document.getElementById("c_img_passworda").className='err-img';
	    document.getElementById("h_passworda").innerHTML="请再次输入密码";
        return false;
    }
    else if(document.getElementById("passworda").value!=document.getElementById("password").value){
		document.getElementById("c_img_passworda").className='err-img';
	    document.getElementById("h_passworda").innerHTML="两次输入密码不一致";
        return false;
    }
    else{
    	document.getElementById("c_img_passworda").className='';
	    document.getElementById("h_passworda").innerHTML="";
    }
}

function checkForm(){

	// return checkEmail();
 //    return checkPhone();
    if(document.getElementById("emails").value==""){
		document.getElementById("c_img_email").className='err-img';
	    document.getElementById("h_email").innerHTML="请输入邮箱";
	    return false;
    }
    if(document.getElementById("name").value==""){
		document.getElementById("c_img_name").className='err-img';
	    document.getElementById("h_name").innerHTML="请输入姓名";
	    return false;
    }
    if(document.getElementById("phone").value==""){
		document.getElementById("c_img_phone").className='err-img';
	    document.getElementById("h_phone").innerHTML="请输入手机号";
	    return false;
    }
    if(document.getElementById("password").value==""){
		document.getElementById("c_img_password").className='err-img';
	    document.getElementById("h_password").innerHTML="请输入密码";
	    return false;
    }
    if(document.getElementById("password").value==""){
		document.getElementById("c_img_password").className='err-img';
	    document.getElementById("h_password").innerHTML="请输入密码";
	    return false;
    }
    if(document.getElementById("password").value!=""&&document.getElementById("passworda").value!=document.getElementById("password").value){
		document.getElementById("c_img_passworda").className='err-img';
	    document.getElementById("h_passworda").innerHTML="两次输入密码不一致";
        return false;
    }
    if(document.getElementById("agreement").checked==false){
    	alert('请阅读并同意《人人投网站服务协议》');
    	return false;
    }
}
