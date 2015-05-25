//
//
// Created on 2013-5-30
// 飞博共创 冷笑话3.0 PC版, 通用类扩展
// author ming
// Updated on 2013-6-18
//

(function(window, undefined) {

	//使document指向参数window里的document
	var document = window.document,
		location = document.location;

	var vqd={
		// fn:		类型判断
		// param:	{any} o 判断对象
		// return:	{string} 返回判断字符串
		//			可选字符串有:"Boolean","Number","String","Function","Array","Date","RegExp","Object","undefined",等
		type:function(o){
			//"Boolean","Number","String","Function","Array","Date","RegExp","Object","undefined"
			var t=Object.prototype.toString.call(o),l=t.length;
			return o==null?String(o):t.slice(8,l-1);
		},

		// fn:		删除左右两端的空格
		// param:	{string} str 要处理的字符串
		// return:	{string} 返回处理好的字符串
		trim:function(str){
			 return str.replace(/(^\s+|\s+$)/g,"");
		},

		// scrolltop
		wScrollTop:function(v){
			var d = document;
			if(vqd.type(v)!="undefined"){
				window.pageYOffset=d.documentElement.scrollTop=d.body.scrollTop=v;
				return v;
			}
			return window.pageYOffset || d.documentElement.scrollTop || d.body.scrollTop;
		},

		// scrollleft
		wScrollLeft:function(){
			var d = document;
			return window.pageXOffset || d.documentElement.scrollLeft || d.body.scrollLeft;
		},

		// fn:		scrollWidth
		// param:	{boolean} r 是否刷新当前数据
		// return:	{number} scrollWidth
		wScrollWidth:function(r){
			var d = document;
			if(!this._scrollWidth || r){
				this._scrollWidth=d.documentElement.scrollWidth;
			}
			return this._scrollWidth;
		},
		// fn:		scrollHeight
		// param:	{boolean} r 是否刷新当前数据
		// return:	{number} scrollHeight
		wScrollHeight:function(r){
			var d = document;
			if(!this._scrollHeight || r){
				this._scrollHeight=d.documentElement.scrollHeight;
			}
			return this._scrollHeight;
		},

		// fn:		clientWidth
		// param:	{boolean} r 是否刷新当前数据
		// return:	{number} clientWidth
		wClientWidth:function(r){
			var d = document;
			if(!this._clientWidth || r){
				this._clientWidth=d.documentElement.clientWidth;
			}
			return this._clientWidth;
		},

		// fn:		clientHeight
		// param:	{boolean} r 是否刷新当前数据
		// return:	{number} clientHeight
		wClientHeight:function(r){
			var d = document;
			if(!vqd._clientHeight || r){
				vqd._clientHeight=window.innerHeight || d.documentElement.clientHeight;
			}
			return vqd._clientHeight;
		},
		easeOut:function(t,b,c,d){
			return -c*(t/=d)*(t-2)+b;
		},
		anScroll:function(r,fnBefore,fnAfter){
			fnBefore && fnBefore();
			var b=vqd.wScrollTop(),c=r-vqd.wScrollTop(),d=40,t=0;
			var run=function(){
				vqd.wScrollTop(Math.ceil(vqd.easeOut(t,b,c,d)));
				if(t<d){t++;setTimeout(run,10);}
			};
			run();
		},
		//滚动条在Y轴上的滚动距离
		getScrollTop:function(){
			var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
			if(document.body){
				bodyScrollTop = document.body.scrollTop;
			}
			if(document.documentElement){
				documentScrollTop = document.documentElement.scrollTop;
			}
			scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
			return scrollTop;
		},
		//文档的总高度
		getScrollHeight:function(){
			var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
			if(document.body){
				bodyScrollHeight = document.body.scrollHeight;
			}
			if(document.documentElement){
				documentScrollHeight = document.documentElement.scrollHeight;
			}
			scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
			return scrollHeight;
		},
		//浏览器视口的高度
		getWindowHeight:function(){
			var windowHeight = 0;
			if(document.compatMode == "CSS1Compat"){
				windowHeight = document.documentElement.clientHeight;
			}else{
				windowHeight = document.body.clientHeight;
			}
			return windowHeight;
		},
		//Create a cookie with the given name and value and other optional parameters.
		//
		//@example vqd.cookie('the_cookie', 'the_value');
		//@desc Set the value of a cookie.
		//@example vqd.cookie('the_cookie', 'the_value', {expires: 7, path: '/', domain: 'jquery.com', secure: true});
		//@desc Create a cookie with all available options.
		//@example vqd.cookie('the_cookie', 'the_value');
		//@desc Create a session cookie.
		//@example vqd.cookie('the_cookie', null);
		//@desc Delete a cookie by passing null as value.
		//
		//@param String name The name of the cookie.
		//@param String value The value of the cookie.
		//@param Object options An object literal containing key/value pairs to provide optional cookie attributes.
		//@option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
		//                            If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
		//                            If set to null or omitted, the cookie will be a session cookie and will not be retained
		//                            when the the browser exits.
		//@option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
		//@option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
		//@option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
		//                       require a secure protocol (like HTTPS).
		cookie : function(name, value, options) {
			if (typeof value != 'undefined') { // name and value given, set cookie
				options = options || {};
				if (value === null) {
					value = '';
					options.expires = -1;
				}
				var expires = '';
				if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
					var date;
					if (typeof options.expires == 'number') {
						date = new Date();
						date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
					} else {
						date = options.expires;
					}
					
					expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
				}
				var path = options.path ? '; path=' + options.path : '';
				var domain = options.domain ? '; domain=' + options.domain : '';
				var secure = options.secure ? '; secure' : '';
				document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');

			} else { // only name given, get cookie
				var cookieValue = null;
				var len=parseInt(name.length+1);
				if (document.cookie && document.cookie != '') {
					var cookies = document.cookie.split(';');
					for (var i = 0; i < cookies.length; i++) {
						var cookie = cookies[i].replace(/(^\s+|\s+$)/g,"");
						// Does this cookie string begin with the name we want?
						//alert(cookie.substring(0, len)+"对"+len+"比"+(name + '='));
						if (cookie.substring(0,len) == (name + '=')) {
							cookieValue = decodeURIComponent(cookie.substring(len));
							break;
						}
					}
				}
				return cookieValue;
			}
		},
		//本地存储get
		getItem:function(key){
			if(localStorage.length){
				return localStorage.getItem(key);
			}else{
				return vqd.cookie(key);
			}
		},
		//本地存储set
		setItem:function(key,val,opts){
			if(localStorage.length){
				if(!val){
					localStorage.removeItem(key);
				}else{
					localStorage.setItem(key,val);
				}
			}else{
				vqd.cookie(key,val,opts);
			}
		},	
		//字符串相似度 levenshtein Distance算法
		//first_str:参考字符串
		//secend_str:需要匹配的字符串
		//percentNum:返回的数据，0-1，小数点后4位
		LD_str:function(first_str, secend_str){
			// levenshtein distance 算法
			function Levenshtein_Distance(s,t){
				var n=s.length;// length of s
				var m=t.length;// length of t
				var d=[];// matrix
				var i;// iterates through s
				var j;// iterates through t
				var s_i;// ith character of s
				var t_j;// jth character of t
				var cost;// cost
				if (n == 0) return m;
				if (m == 0) return n;
				for (i = 0; i <= n; i++) {
					d[i]=[];
					d[i][0] = i;
				};
				for (j = 0; j <= m; j++) {
					d[0][j] = j;
				};
				for (i = 1; i <= n; i++) {
					s_i = s.charAt (i-1);
					// Step 4
					for (j = 1; j <= m; j++) {
						t_j = t.charAt (j-1);
						if (s_i == t_j) {
							cost = 0;
						}else{
							cost = 1;
						};
						d[i][j] = Minimum (d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1] + cost);
				 	};
				};
				return d[n][m];
			}
			//求三个数字中的最小值
			function Minimum(a,b,c){
				return a<b?(a<c?a:c):(b<c?b:c);
			}

			var length_str = first_str.length>secend_str.length?first_str.length:secend_str.length;
			var num = Levenshtein_Distance(first_str,secend_str);
			var percentNum = (1-num/length_str).toFixed(4)
			return percentNum;
		},
		//一般提示框
		fullMsg:{
			msg:function(opt){
				return vqd.formDialog.dialog(opt,true);
			}
		},
		//新浪微博分享
		sinaWbShare:function(opts){
			 var sets=$.extend({
				 width:"440",
				 height:"430",
				 source:"",
				 sourceUrl:"",
				 pic:"",//分享的图片链接地址
				 title:"",//分享内容
				 location:"",//内容链接|默认当前页location
				 charset:"gb2312"//页面编码
			 },opts);
			 var width=sets.width,height=sets.height,source=sets.source,sourceUrl=sets.sourceUrl;
			 var pic=sets.pic,title=sets.title,location=sets.location,charset=sets.charset;
			 
			 var e=encodeURIComponent;
			 var urlbase='http://v.t.sina.com.cn/share/share.php?appkey=60665216';
			 //var location=location||document.location;
			 var param=['&url=',e(location),'&title=',e(title||document.title),'&source=',e(source),'&sourceUrl=',e(sourceUrl),'&content=',charset||'gb2312','&pic=',e(pic||'')].join('');
			 function send(){
				 if(!window.open([urlbase,param].join(''),'mb',['toolbar=0,status=0,resizable=1,width=',width,',height=',height,',left=',(screen.width-440)/2,',top=',(screen.height-430)/2].join(''))){
					 location.href=[urlbase,param].join('');
				 }
			 }
			 if(/Firefox/.test(navigator.userAgent)){
				 setTimeout(send,0);
		     }else{ 
		    	 send();
			}
		 },
		//腾讯微博分享
		txWbShare:function(opts){
			 var sets=$.extend({
				 width:"700",
				 height:"680",
				 title:"",//分享内容
				 appkey:"",//从腾讯获得的appkey 
				 pic:"",//分享的图片
				 site:""//网站地址
			 },opts);
			 var width=sets.width,height=sets.height,title=sets.title||document.title;
			 var appkey='100265368',pic=sets.pic,site=sets.site;
			 
			 var _t = encodeURI(title); 
			 //var _url = encodeURI(document.location); 
			 var _url = encodeURI(site); 
			 var _appkey = encodeURI(appkey);
			 var _pic = encodeURI(pic);//（列如：var _pic='图片url1|图片url2|图片url3....） 
			 var _site = site;//你的网站地址 
			
			 var _u = 'http://v.t.qq.com/share/share.php?title='+_t+'&url='+_url+'&appkey='+_appkey+'&site='+_site+'&pic='+_pic; 
			 window.open( _u,'转播到腾讯微博', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
		},
		//qq空间分享
		qZoneShare:function(opts){
			 var sets=$.extend({
				 title:"",//分享内容
				 pic:"",//分享的图片
				 url:"",//分享来源地址	 
				 summary:""//分享来源地址
			 },opts);
			 var pic=encodeURIComponent(sets.pic),title='冷笑话精选，分享身边的爆笑事',url=encodeURIComponent(sets.url||document.location.href),summary=encodeURIComponent(sets.title||document.title);
			 window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+url+'&title='+title+'&pic='+pic+'&summary='+summary+'&desc='+summary);
		},
		//人人网分享,貌似只能分享链接
		rrShare:function(opts){
			 var sets=$.extend({
				 s:"440",
				 d:"430",
				 e:"",
				 pic:"",//分享的图片链接地址
				 title:"",//分享内容
				 link:""//分享的链接	 
			 },opts);
			 var s=sets.s||screen,d=sets.d||document,e=sets.e||encodeURIComponent,pic=sets.pic,title=sets.title;
			 var f='http://share.renren.com/share/buttonshare?link=';
			 var u=sets.link?sets.link:location.href,l='',p=[e(u),'&title='+title,e(l)].join('');
			 function send(){
				if(!window.open([f,p].join(''),'xnshare',['toolbar=0,status=0,resizable=1,width=626,height=436,left=',(s.width-626)/2,',top=',(s.height-436)/2].join('')))
					u.href=[f,p].join('');
			 };
			 if(/Firefox/.test(navigator.userAgent)){
				setTimeout(send,0);
			 }else{ 
				send();
			 }
		},
		//微信朋友圈分享
		wxFriShare:function(data,cb){
		    if (typeof WeixinJSBridge == 'undefined') {
		        return false;
		    }else {
		        WeixinJSBridge.invoke('shareTimeline', {
		            'img_url': data.imgurl || '', // 图片url地址
		            'link': data.url, // 文章地址，此内容分享到朋友圈后可以点击跳转到此地址
		            'desc': data.desc,
		            'title': data.title
		        }, function(d) {
		            // 返回res.err_msg取值，d还有一个属性是err_desc
		            // share_timeline:cancel 用户取消
		            // share_timeline:fail　发送失败
		            // share_timeline:confirm 发送成功
		            WeixinJSBridge.log(d.err_msg);
		            cb && cb(d.err_msg);
		        });
		    }
		    return false;
		},
		//微信分享给朋友
		wxShare:function(data){
			if (typeof WeixinJSBridge == 'undefined') {
			    return false;
			}else {
			    WeixinJSBridge.invoke('sendAppMessage',{
					"appid":data.appId,
					"img_url":data.imgUrl,
					"img_width":"640",
					"img_height":"640",
					"link":data.link,
					"desc":data.desc,
					"title":data.title
				}, function(res) {});
			}
		}

	}
	window.vqd=vqd;
})(window);

