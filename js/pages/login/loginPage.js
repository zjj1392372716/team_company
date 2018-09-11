var loginCity;
var IsSelect=false;
$(function() {
	if ($.cookie("rmbUser") == "true") {
		$("#ck_rmbUser").attr("checked", true);
		$("#loginName").val($.cookie("username"));
		$("#userPassword").val($.cookie("password"));
	}
$(".checkbox").click(function(){
	if(!IsSelect){
		$(".checkbox .checkbox-user").css({
			'backgroundImage':'url(css/login/img/right@1x.png),url(css/login/img/checkbox1x.png)',
			'backgroundRepeat':'no-repeat',
			'backgroundPosition':'center',
			'border':'none',
		});
		IsSelect=true;
	}else{
		$(".checkbox .checkbox-user").css({
			'backgroundImage':'none',
			'border':'1px solid #cdcdcd',
			'width':'15px',
			'height':'15px',
			'border-radius':'100%',
		});
		IsSelect=false;
	}
	
})
});

function login() {
	if ($("#loginName").val() == null || $("#loginName").val().length == 0) {
		  $(".Id-error").show();
		  $("#loginName").css({
			 'border': '1px solid #faa906',
			 'boxShadow':"none",
		  })
		return;
	} else if ($("#userPassword").val() == null
			|| $("#userPassword").val().length == 0) {
		 $("#loginName").css({
			 'borderColor': '#66afe9',
		  })
		  $(".Id-error").hide();
		  $("#userPassword").css({
			 'borderColor': '#d0021b',
		  })
		 $(".pass-error .pass-error-msg").text("密码不能为空");
		 $(".pass-error").show();
		return;
	} else {
		 $(".Id-error").hide();
		$(".pass-error").hide();
		$.cookie("upassword", "", {
			expires : -1
		});
		$.cookie("upassword", $("#userPassword").val(), {
			expires :1
		});
		if (IsSelect) {
			var str_username = $("#loginName").val();
			var str_password = $("#userPassword").val();
			$.cookie("rmbUser", "true", {
				expires : 7
			}); // 存储一个带7天期限的cookie
			$.cookie("username", str_username, {
				expires : 7
			});
			$.cookie("password", str_password, {
				expires : 7
			});
		} else {
			$.cookie("rmbUser", "false", {
				expire : -1
			});
			$.cookie("username", "", {
				expires : -1
			});
			$.cookie("password", "", {
				expires : -1
			});
		}
		$.ajax({
			type : "post",
			url : "loginUserAction",
			data : {
				loginName : $.trim($("#loginName").val()),
				userPassword : $.trim($("#userPassword").val()),
				vrifyCode : "8888",
				hostIP : $.trim($("#hostIP").val()),
				hostIP : $.trim($("#hostIP").val()),
				hostName : $.trim($("#hostName").val()),
				loginCity : loginCity
			},
			success : function(data) {
				if (data == "登录成功") {	
					$(".Id-error").hide();
					$(".pass-error").hide();
					$("#userPassword").css({
						 'borderColor': '#66afe9',
					  })
					window.location.href = "identity";
				} else {
					 $("#userPassword").css({
						 'borderColor': '#d0021b',
					 })
					$(".pass-error .pass-error-msg").text("密码错误");
					$(".pass-error").show();
				}
			}
		});
	}
}