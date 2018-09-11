var weather = function() {
	var tmp = 0;
	var SWther = {
		w : [ {} ],
		add : {}
	};
	var SWther = {};
	this.getWeather = function(city, type) {			
        //var url = "http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&city=" + city + "&day=2&dfc=3";
		var url = $("#basePath").val().split(":")[0]+"://api.map.baidu.com/telematics/v3/weather?location="+city+"&output=json&ak=ngitApAKdEIXIIOTOpddActNCg0CURRs";
        $.ajax({
            url: url,
            dataType: "jsonp",
            scriptCharset: "utf-8",
            success: function (data) {
            	echo(city,data);
            }
          });
	}
	function dis_img(weather) {
		var style_img = "http://mj.588cy.com/img/s_13.png";
		if (weather.indexOf("多云") !== -1 || weather.indexOf("晴") !== -1) {
			style_img = "http://mj.588cy.com/img/s_1.png";
		} else if (weather.indexOf("多云") !== -1 && weather.indexOf("阴") !== -1) {
			style_img = "http://mj.588cy.com/img/s_2.png";
		} else if (weather.indexOf("阴") !== -1 && weather.indexOf("雨") !== -1) {
			style_img = "http://mj.588cy.com/img/s_3.png";
		} else if (weather.indexOf("晴") !== -1 && weather.indexOf("雨") !== -1) {
			style_img = "http://mj.588cy.com/img/s_12.png";
		} else if (weather.indexOf("晴") !== -1 && weather.indexOf("雾") !== -1) {
			style_img = "http://mj.588cy.com/img/s_12.png";
		} else if (weather.indexOf("晴") !== -1) {
			style_img = "http://mj.588cy.com/img/s_13.png";
		} else if (weather.indexOf("多云") !== -1) {
			style_img = "http://mj.588cy.com/img/s_2.png";
		} else if (weather.indexOf("阵雨") !== -1) {
			style_img = "http://mj.588cy.com/img/s_3.png";
		} else if (weather.indexOf("小雨") !== -1) {
			style_img = "http://mj.588cy.com/img/s_3.png";
		} else if (weather.indexOf("中雨") !== -1) {
			style_img = "http://mj.588cy.com/img/s_4.png";
		} else if (weather.indexOf("大雨") !== -1) {
			style_img = "http://mj.588cy.com/img/s_5.png";
		} else if (weather.indexOf("暴雨") !== -1) {
			style_img = "http://mj.588cy.com/img/s_5.png";
		} else if (weather.indexOf("冰雹") !== -1) {
			style_img = "http://mj.588cy.com/img/s_6.png";
		} else if (weather.indexOf("雷阵雨") !== -1) {
			style_img = "http://mj.588cy.com/img/s_7.png";
		} else if (weather.indexOf("小雪") !== -1) {
			style_img = "http://mj.588cy.com/img/s_8.png";
		} else if (weather.indexOf("中雪") !== -1) {
			style_img = "http://mj.588cy.com/img/s_9.png";
		} else if (weather.indexOf("大雪") !== -1) {
			style_img = "http://mj.588cy.com/img/s_10.png";
		} else if (weather.indexOf("暴雪") !== -1) {
			style_img = "http://mj.588cy.com/img/s_10.png";
		} else if (weather.indexOf("扬沙") !== -1) {
			style_img = "http://mj.588cy.com/img/s_11.png";
		} else if (weather.indexOf("沙尘") !== -1) {
			style_img = "http://mj.588cy.com/img/s_11.png";
		} else if (weather.indexOf("雾") !== -1) {
			style_img = "http://mj.588cy.com/img/s_12.png";
		} else {
			style_img = "http://mj.588cy.com/img/s_2.png";
		}
		return style_img;
	};

	function echo(city,data) {
		$('#city').html(city);
		//$('#weather').html(data.results[0].weather_data[0].weather);
		$('#T_temperature').html(data.results[0].weather_data[0].temperature.replace(' ','') );
		$('#T_wind').html(data.results[0].weather_data[0].wind.substring(3));
		$('#T_direction').html(data.results[0].weather_data[0].wind.substring(0,3));
		$('#T_weather').html(data.results[0].weather_data[0].weather);

		var T_weather_img = dis_img(data.results[0].weather_data[0].weather);
		$('#T_weather_img').html(
				"<img src='" + T_weather_img + "' title='"
						+ data.results[0].weather_data[0].temperature + "' alt='"
						+ data.results[0].weather_data[0].weather + "' />");
		/*$('#T_temperature').html(
				window.SWther.w[city][0].t2 + '~' + window.SWther.w[city][0].t1
						+ '&deg;');
		$('#T_wind').html(window.SWther.w[city][0].p1+'级');
		$('#T_direction').html(window.SWther.w[city][0].d1);
		$('#T_weather').html(window.SWther.w[city][1].s1);

		var M_weather_img = dis_img(window.SWther.w[city][1].s1);
		$('#T_weather_img').html(
				"<img src='" + M_weather_img + "' title='"
						+ window.SWther.w[city][1].s1 + "' alt='"
						+ window.SWther.w[city][1].s1 + "' />");
		$('#T_temperature').html(
				window.SWther.w[city][1].t1 + '~' + window.SWther.w[city][1].t2
						+ '&deg;');
		$('#T_wind').html(window.SWther.w[city][1].p1);
		$('#T_direction').html(window.SWther.w[city][1].d1);
		$('#T_weather').html(window.SWther.w[city][2].s1);

		var L_weather_img = dis_img(window.SWther.w[city][2].s1);
		$('#T_weather_img').html(
				"<img src='" + L_weather_img + "' title='"
						+ window.SWther.w[city][2].s1 + "' alt='"
						+ window.SWther.w[city][2].s1 + "' />");
		$('#T_temperature').html(
				window.SWther.w[city][1].t2 + '~' + window.SWther.w[city][2].t1
						+ '&deg;');
		$('#T_wind').html(window.SWther.w[city][2].p1);
		$('#T_direction').html(window.SWther.w[city][2].d1);*/
	}
}
// weather结束了
function jintian(city) {	
	if(city=="山西"){
		city="长治";
	}
	weather_.getWeather(city, 'js');
};