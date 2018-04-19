$(function(){
  //
  var urlName = "http://scmc.villion.cn:4433/";
  var zhang = "http://scmc.villion.cn:4433/";
  var yang = "http://scmc.villion.cn:4433/";
  //取cookie

  // console.log( $.cookie('username'));
  // console.log( $.cookie('psd'));
  // if($.cookie('username') === undefined || $.cookie('psd') === undefined){
  //   console.log('请登录')
  //   // return false
  // }else{
  //   if( $.cookie('username') === null || $.cookie('psd') === null){
  //     console.log('请登录')
  //   }else if( $.cookie('username') !== null || $.cookie('psd') !== null){
  //     $('#nb-global-spinner').css('display','block');
  //     var set = {
  //       'username' : $.cookie('username'),
  //       'pwd' : $.cookie('psd')
  //     };
  //     $.ajax({
  //       url:zhang + "wishome-web/rest/ReadCookie",
  //       type:"POST",
  //       data:set,
  //       dataType:"jsonP",
  //       success:function(data){
  //         console.log(data);
  //         if(data.data === 200){
  //           // $('#nb-global-spinner').css('display','none');
  //           var user = data.user;
  //           var role = data.role;
  //           var storage = window.localStorage;
  //           //时间
  //           var expiresDate= new Date();
  //           expiresDate.setTime(expiresDate.getTime() + ( 60 * 1000)); //?替换成分钟数如果为60分钟则为 60 * 60 *1000
  //           $.cookie("username", set.user, {
  //             path : '/',      //cookie的作用域
  //             expires : expiresDate
  //           });
  //           $.cookie("psd", set.psd, {
  //             path : '/',      //cookie的作用域
  //             expires : expiresDate
  //           });
  //           //缓存
  //           storage.setItem("loginId",user);
  //           storage.setItem("role",role);
  //           window.location.href = "src/app/templates/home.html";
  //         }else if(data.error ==="登录失败"){
  //           alert("失败")
  //         }
  //       }
  //     });
  //   }
  // }

  // var urlName = "http://192.168.2.103:8080/";
  // var zhang = "http://192.168.2.103:8080/";
  // var yang = "http://192.168.2.103:8080/";

	var
    loginButton=document.getElementById("login_button"),
    logonButton=document.getElementById("logon_button"),
    logonDiv=document.getElementById("logon_div"),
    loginDiv=document.getElementById("login_div"),
    anotherChoose=document.getElementsByClassName("anotherChoose"),
    logonTencent=document.getElementsByClassName("logon_tencent"),
    underlineButton=document.getElementById("underline_button"),
    logon_click=document.getElementById("logon_click"),
    login_click=document.getElementById("login_click"),
    password=document.getElementById("password"),
    passwordAgain=document.getElementsByClassName("password_again"),
    logonByPhone=document.getElementById("logonByPhone"),
    passByKey=document.getElementById("passByKey"),
    passByCode=document.getElementById("passByCode"),
    forget=document.getElementById("forget"),
    logonByUsername=document.getElementById("logonByUsername"),
    iconUser=document.getElementById("iconUser"),
    username=document.getElementById("username"),
    password_again=document.getElementById("password_again"),
    getCode=document.getElementById("getCode"),
    codeByPhone=document.getElementById("codeByPhone"),
    // role=document.getElementById("role"),
    weChat=document.getElementById("weChat");

	loginButton.onclick=function(){
    showAll();
		passByKey.style.display="block";
		passByCode.style.display="none";
		iconUser.classList.add("icon-denglu");
		underlineButton.style.left="14.6rem";
		anotherChoose[0].style.display="none";
		passwordAgain[0].style.display="block";
		logonTencent[0].style.display="none";
		logon_click.style.display="none";
		login_click.style.display="block";
		login_click.style.background="#A6D112";
		login_click.value="现在注册";
		username.value="";
		password.value="";
		username.placeholder="6~12位数字或字母组合";
		password.placeholder="6~12位数字或字母组合密码";
	};

	logonButton.onclick=function(){
    showAll();
		underlineButton.style.left="2rem";
		anotherChoose[0].style.display="block";
		passwordAgain[0].style.display="none";
		logonTencent[0].style.display="block";
		logon_click.style.display="block";
		logon_click.style.background="#A6D112";
		logon_click.value="登录";
		login_click.style.display="none";
		username.placeholder="用户名";
		password.placeholder="密码";
		username.value="";
		password.value="";
		password_again.value="";
		passByCode.style.display="none";
		forget.style.display="block";
		logonByPhone.style.display="block";
		logonByUsername.style.display="none";
		passByKey.style.display="block";
	};
	logonByUsername.onclick=function(){
    showAll();
    underlineButton.style.left="2rem";
    anotherChoose[0].style.display="block";
    passwordAgain[0].style.display="none";
    logonTencent[0].style.display="block";
    logon_click.style.display="block";
    logon_click.style.background="#A6D112";
    logon_click.value="登录";
    login_click.style.display="none";
    username.placeholder="用户名";
    password.placeholder="密码";
    username.value="";
    password.value="";
    password_again.value="";
    passByCode.style.display="none";
    forget.style.display="block";
    logonByPhone.style.display="block";
    logonByUsername.style.display="none";
    passByKey.style.display="block";
    // showAll();
    // $("#login_click").hide();
		// this.style.display="none";
		// passByKey.style.display="block";
		// passByCode.style.display="none";
		// forget.style.display="block";
		// logonByPhone.style.display="block";
		// iconUser.classList.add("icon-denglu");
		// iconUser.classList.remove("icon-shouji");
		// username.placeholder="用户名";
		// username.value="";
		// logon_click.style.background="#A6D112";
		// logon_click.value="登录";
	};
	logon_click.onclick=function(){
		var usernameValue=username.value;
		var passwordValue=password.value;
		if(usernameValue.length<6||usernameValue.length>12){
			this.style.background="#FFCC00";
			this.value="用户名为6-12位数字或字母的组合";
		}else{
			var userReg=new RegExp(/^([0-9]|[a-z]|[A-Z])*$/);
			if(userReg.test(usernameValue)){
				if(passwordValue.length<6||passwordValue.length>12){
					this.style.background="#FFCC00";
					this.value="密码为6-12位数字或字母的组合";
				}else{
				  var user = $("#username").val();
				  var psd = $("#password").val();
				  var set = {
            "user":user,
            "psd":psd
          };
          $.ajax({
            url:zhang + "wishome-web/rest/userlogin",
            type:"POST",
            data:set,
            dataType:"json",
            success:function(data){
              console.log(data);
              if(data.success ==="登录成功"){
                var user = data.user;
                var role = data.role;
                var storage = window.localStorage;
                storage.setItem("loginId",data.user);
                storage.setItem("role",data.role);
                window.location.href = "src/app/templates/home.html";
              }else if(data.error ==="登录失败"){
                alert("失败")
              }
            },error:function(){
            }
          });
				}
			}else{
				this.style.background="#FFCC00";
				this.value="用户名为6-12位数字或字母的组合";
			}
		}
	};
  // logon_click.onclick();
	logonByPhone.onclick=function(){
		this.style.display="none";
		passByKey.style.display="none";
		passByCode.style.display="block";
		forget.style.display="none";
		logonByUsername.style.display="block";
		iconUser.classList.remove("icon-denglu");
		iconUser.classList.add("icon-shouji");
		username.placeholder="请输入手机号";
		username.value="";
		password.value="";
		logon_click.style.background="#A6D112";
		logon_click.value="登录";
		username.onfocus=function(){
			getCode.removeAttribute("disabled","disabled");
			getCode.style.background="";
			getCode.value="获取验证码";
			logon_click.style.background="#A6D112";
			logon_click.value="登录";
		};

		logon_click.onclick=function(){
			var usernameValue=username.value;
			var phoneReg=new RegExp(/^1[34578]\d{9}$/);
			if(phoneReg.test(usernameValue)){
				submitCode();
			}else{
				this.style.background="#FFCC00";
				this.value="手机号码格式错误";
			}
		}
	};


  //键盘事件
  $("#passByKey #password").keyup(function(event){
    if(this.placeholder === '密码'){
      if(event.keyCode === 13){
        logon_click.onclick();
      }else{
        return false
      }
    }else{
      return false
    }
  });

  // function loginKeyUp(item,e){
  //   alert(1)
  // }

  //微信点击
  var weChatTimer;
  function noneAll(){
    $("#none1").hide();
    $("#none2").hide();
    $("#none3").hide();
    $("#none4").hide();
    $("#logon_click").hide();
    $("#login_click").hide();
    $("#code").show()
  }
  function showAll(){
    window.clearInterval(weChatTimer);
    $("#code").hide();
    $("#none1").show();
    $("#none2").show();
    $("#none3").show();
    $("#none4").show();
    $("#logon_click").show();
    $("#login_click").show();
  }
  weChat.onclick = function(){
    noneAll();
    var obj = new WxLogin({
      id: "login_container",
      appid: "wx43a7adb3473744ac",
      scope: "snsapi_login",
      redirect_uri: "http%3a%2f%2fscmc.villion.cn%2findex.html",
      state: Math.ceil(Math.random()*1000),
      style: "white",
      href: "https://scmc.villion.cn:443/wishome-web/index.css"
    });
  };

	getCode.onclick=function(){
		var usernameValue=username.value;
		var phoneReg=new RegExp(/^1[34578]\d{9}$/);
		if(phoneReg.test(usernameValue)){
			var wait=60;
			time(this);
			function time(o) {
		        if (wait === 0) {
		            o.removeAttribute("disabled");
		            o.value="获取验证码";
		            wait = 60;
		        } else {
		            o.setAttribute("disabled", true);
		            o.value="重新发送(" + wait + "s)";
		            wait--;
		            setTimeout(function() {
		                time(o)
		            },
		            1000)
		        }
		    }
		    submitPhone();
		}else{
			this.setAttribute("disabled","disabled");
			this.style.background="#FFCC00";
			this.value="手机号码格式错误";
		}
	};
	login_click.onclick=function(){
		var usernameValue=username.value;
		var passwordValue=password.value;
		var passwordAgainValue=password_again.value;
		if(usernameValue.length<6||usernameValue.length>12){
			this.style.background="#FFCC00";
			this.value="用户名为6-12位数字或字母的组合";
		}else{
			var userReg=new RegExp(/^([0-9]|[a-z]|[A-Z])*$/);
			if(userReg.test(usernameValue)){
				if(passwordValue.length<6||passwordValue.length>12){
					this.style.background="#FFCC00";
					this.value="密码为6-12位数字或字母的组合";
				}else{
					if(passwordValue===passwordAgainValue){
						submitRole();
					}else{
						this.style.background="#FFCC00";
						this.value="两次密码不相同";
					}
				}
			}else{
				this.style.background="#FFCC00";
				this.value="用户名为6-12位数字或字母的组合";
			}

		}
	};

	password.onfocus=function(){
		logon_click.style.background="#A6D112";
		logon_click.value="登录";
		login_click.style.background="#A6D112";
		login_click.value="现在注册";
	};
	password_again.onfocus=function(){
		login_click.style.background="#A6D112";
		login_click.value="现在注册";
	};
	username.onfocus=function(){
		logon_click.style.background="#A6D112";
		logon_click.value="登录";
		login_click.style.background="#A6D112";
		login_click.value="现在注册";
	};



	function submitRole(){
		$.ajax({
			url:urlName + "wishome-web/rest/AddUser",
			type:"POST",
			datatype:"json",
			data:{"username":$("#username").val(),"password":$("#password").val()},
			success:function(data){
			  if(data.username === 500){
			    alert('这个用户已存在')
        }else if(data.state === 200){
          var storage = window.localStorage;
          storage.setItem("loginId",data.user);
          storage.setItem("role",data.role);
          window.location.href = "src/app/templates/home.html";
        }
			},error:function(){

			}
		});
	}

	function submitPhone(){
		var phoneNum=username.value;
		$.ajax({
			url:urlName + "wishome-web/rest/NetEaseCloud",
			type:"POST",
			dataType:"json",
			data:{"phoneNumber":phoneNum},
			success:function(data){
        var storage = window.localStorage;
        storage.setItem("identifyingId",data.identifyingId);
			},error:function(){

			}
		});
	}

	function submitCode(){
    var storage = window.localStorage;
		$.ajax({
			url:urlName + "wishome-web/rest/QueryIdentifyingId",
			type:"POST",
			dataType:"json",
			data:{"phoneNumber":$("#username").val(),"identifyingCode":$("#codeByPhone").val(),'identifyingId': storage.getItem("identifyingId")},
			success:function(data){
			  if(data.true){
			    $.ajax({
            url:urlName + "wishome-web/rest/phoneLogin",
            type:"POST",
            dataType:"json",
            data:{"phoneNumber":$("#username").val()},
            success:function(data){
              if(data.state === 200){
                storage.setItem("loginId",data.user);
                storage.setItem("role",data.role);
                window.location.href = "src/app/templates/home.html";
              }else if(data.state === 400){
                alert('此手机号未绑定。')
              }
            }
          })
        }else if(data.error === error){
			    alert('验证码错误！')
        }
			},error:function(){

			}
		});
	}

});
