//Global vars
var clk;
var clkex=0;
var prevtbox;
var prevcurr;
var prevnitems;
var disp;
var pixeltype = 's';
var pixelsl = 's';
var server;
var pixelct;
var pixelUDO;
var siteid;
var cid;
var actionid;
var ctagn;
var ctagid;
var withdisc;
var withcurr;
var advlikesim;
var fc=0;
var prevfc;
var pixtypenum = 0;
var testaid="";
var gstatus=0;

function isIE () {
	if (navigator.appName == "Microsoft Internet Explorer") {
		ie = true;
		var ua = navigator.userAgent;
		var re = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
		if (re.exec(ua) != null) {
			var br=parseInt(RegExp.$1);
			return br;
		}
	}
}

function ifHTML5(){
	var test_canvas = document.createElement("canvas");
	var canvascheck=(test_canvas.getContext)? true : false;
	return canvascheck;
}

$(document).ready(function(){
	if(!ifHTML5()||isIE()<10)
		window.location = "http://browsehappy.com/";
	fill_texts();
	fill_items();
	if(window.location.href.indexOf('?') != -1){
		if(read_params()==99){
			restart(1);
			setreadonly();
			$("#URLwrongformat").show();
			gstatus=99;
		}
	}
	$(document).ajaxStart(function(){
		document.getElementById('ajaxwait').innerHTML="<img src=\"img/ajax.gif\"/>";
	});
	$(document).ajaxComplete(function(){
		document.getElementById('ajaxwait').innerHTML="";
	});
	if(fc!=1){
		document.getElementById('pixelct').checked=true;addct(true);
		document.getElementById('pixelUDO').checked=false;convert2UDO(false);
	}
});

function validate(evt) {
	if(gstatus==99)
		return;
	var theEvent = evt || window.event;
	var key = theEvent.keyCode || theEvent.which;
	key = String.fromCharCode( key );
	var regex = /[0-9]|\./;
	if( !regex.test(key) ) {
		theEvent.returnValue = false;
		if(theEvent.preventDefault) theEvent.preventDefault();
	}
}

function restart(full){
	if(gstatus==99)
		return;
	$("#pixelta").hide(1000);
	$("#pixelhelp").hide(1000);
	$("#examplediv").hide(1000);
	document.getElementById('ejemplo').innerHTML="";
	document.getElementById('exnumitems').value = 1;
	$("#ejemplo").hide();
	prevtbox="";
	prevcurr="";
	prevnitems="";
	prevfc=undefined;
	$("#generate_URL_div").hide(1000);
	$("#urlspan").hide();
	document.getElementById('urlspan').innerHTML="";
	document.getElementById('forclient').checked=true;
	if(full==1){
		document.getElementById('serverdom').value="www.emjcd.com";
		document.getElementById('pixelct').checked=false;
		document.getElementById('contid').value=document.getElementById('contn').value=document.getElementById('actionidtb').value=document.getElementById('cidtb').value="";
		document.getElementById('withdisc').checked=true;
		document.getElementById('withcurr').checked=true;
		document.getElementById('advlikesiminp').checked=false;
	}
}

function addct(sw){
	if(gstatus==99)
		return;
	if(fc==1){
		document.getElementById('generate_but').innerHTML="Tag Template";
		document.getElementById('generate_but').className = "generate_but2";
	}else{
		if(sw&&!document.getElementById('pixelUDO').checked){
			$("#ctagdiv").show(1000);
			document.getElementById('generate_but').innerHTML="Generate Container Tag";
		}else if(sw){
			document.getElementById('generate_but').innerHTML="Generate Container Tag";
		}else{
			$("#ctagdiv").hide(1000);
			if(!document.getElementById('pixelUDO').checked)
				document.getElementById('generate_but').innerHTML="Generate Pixel";
			else
				document.getElementById('generate_but').innerHTML="Generate Script";
		}
	}
	restart();
}

function convert2UDO(isudo){
	if(gstatus==99)
		return;
	if(isudo){
		$("#siteiddiv").show(1000);
		$("#ctagdiv").hide(1000);
		$(".hideONudo").hide(1000);		
		$(".readonlyONudo").attr('disabled','disabled');	
		$("#serverdom").val('cj.mplxtms.com');	
		$(".showONudo").show(1000);	
		setTimeout(function() {	$(".hideONudot").hide(300);}, 1000);
		$("#specialcorner").addClass("speciallastchild");
		if(!document.getElementById('pixelct').checked)
			document.getElementById('generate_but').innerHTML="Generate Script";
		else
			document.getElementById('generate_but').innerHTML="Generate Container Tag";
	}else{
		$("#siteiddiv").hide(1000);
		$(".hideONudot").show(1000);
		$(".readonlyONudo").removeAttr('disabled');
		$("#serverdom").val('www.emjcd.com');	
		$(".showONudo").hide(1000);	
		setTimeout(function() {	$(".hideONudo").show(300);}, 1000);
		$("#specialcorner").removeClass("speciallastchild");
		if(document.getElementById('lead').checked)
			hideextras();
		addct(document.getElementById('pixelct').checked);
		if(!document.getElementById('pixelct').checked)
			document.getElementById('generate_but').innerHTML="Generate Pixel";
		else
			document.getElementById('generate_but').innerHTML="Generate Container Tag";
	}
	restart();
}

function showextras(){
	if(gstatus==99)
		return;
	$("#specialcorner").removeClass("speciallastchild");
//	document.getElementById("specialcorner").className = "";
$("#extrat").show(1000);
setTimeout(function() {	$("#extra").show(300);}, 1000);
restart();
}

function hideextras(){
	if(gstatus==99)
		return;
	$("#extra").hide(300);
	setTimeout(function() {
		$("#extrat").hide(1000);
	setTimeout(function() { $("#specialcorner").addClass("speciallastchild");/*document.getElementById("specialcorner").className = "speciallastchild"; */}, 1000);
}, 300);
	restart();
}

function showadv(){
	if(gstatus==99)
		return;
	$("#advlikesim").show(1000);
	if(!document.getElementById('advlikesiminp').checked)
		$("#nproducts").show(2000);
	else
		$("#nproducts").hide(2000);
	restart();
}

function hideadv(){
	if(gstatus==99)
		return;
	$("#advlikesim").hide(1000);
	$("#nproducts").hide(2000);
	restart();
}

function validate_nitems(nitems){
	if(gstatus==99)
		return;
	if(nitems.value>9)
		nitems.value=9;
	else if(nitems.value<0)
		nitems.value=1;
}

function updatevalues(){
	if(gstatus==99)
		return;
	discount="&discount=[order_discount_amount]&coupon=[voucher_code]";
	discount_ad="&dcnt1=[item_discount_amount]&discount=[order_discount_amount]&coupon=[voucher_code]";
	currency="&amp;currency=[currency]";
	endpix="&method=IMG\" height=\"1\" width=\"20\">";
	endpix_ct="\"></iframe>";

	qty=1;

	if(document.getElementById('advance').checked)
		pixeltype='a';
	else
		pixeltype='s';

	if(document.getElementById('lead').checked)
		pixelsl='l';
	else
		pixelsl='s';

	server = document.getElementById('serverdom');
	server = server.options[server.selectedIndex].value;
	pixelct = document.getElementById('pixelct').checked;
	cid = document.getElementById('cidtb').value;
	actionid = document.getElementById('actionidtb').value;
	//ctagn = encodeURIComponent(document.getElementById('contn').value);
	ctagn = document.getElementById('contn').value;
	ctagid = document.getElementById('contid').value;
	withdisc = document.getElementById('withdisc').checked;
	withcurr = document.getElementById('withcurr').checked;
	advlikesim = document.getElementById('advlikesiminp').checked;
	pixelUDO = document.getElementById('pixelUDO').checked;
	siteid =  document.getElementById('siteID').value;
	if(advlikesim)
		discount_ad="&dcnt1=0&discount=[order_discount_amount]&coupon=[voucher_code]";
}

function AnimateRotate(d){
    var elem = $("#pixelhelp");

    $({deg: 0}).animate({deg: d}, {
        duration: 4000,
        step: function(now){
            elem.css({
                // transform: "rotate(" + now + "deg)"
            });
        }
    });
}

function genpixel(){

	if(gstatus==99)
		return;

    updatevalues();

    if(pixelUDO&&siteid==""||pixelct&&!pixelUDO&&(ctagn==""||ctagid=="")||cid==""||actionid==""){
    	$("#errorlist").show(1000);
    	restart();
		//document.getElementById('pixelta').innerHTML = "";
		//$("#pixelta").hide(400);
		//$("#pixelhelp").hide(400);
		return;
	}else{
		$("#errorlist").hide(300);
	}

	if(pixelUDO){

		if(pixelct){
			tbox = "<script>var encodedUdo = encodeURIComponent(JSON.stringify(MasterTmsUdo));ctm_iframe = '<iframe src=\"https://secure-cdn.mplxtms.com/iframeContainer.html#siteId="+siteid+"&UDO=' + encodedUdo + '\" width=0 height=0 marginwidth=0 marginheight=0 hspace=0 vspace=0 frameborder=0 scrolling=no></iframe>';	document.write(ctm_iframe);</script>";
		}else{
			tbox = '<script>/*DO NOT ALTER *** SITE name: '+siteid+' */(function(e){var t="'+siteid+'",n=document,r,i,s={http:"http://cdn.mplxtms.com/s/MasterTMS.min.js",https:"https://secure-cdn.mplxtms.com/s/MasterTMS.min.js"},o=s[/\\w+/.exec(window.location.protocol)[0]];i=n.createElement("script"),i.type="text/javascript",i.async=!0,i.src=o+"#"+t,r=n.getElementsByTagName("script")[0],r.parentNode.insertBefore(i,r),i.readyState?i.onreadystatechange=function(){if(i.readyState==="loaded"||i.readyState==="complete")i.onreadystatechange=null}:i.onload=function(){try{e()}catch(t){}}})(function(){});</script>';
		}	

		if(pixeltype=='s'){
			pixtypenum = 98;
		} else {
			pixtypenum = 99;
		}

	} else {

		if(advlikesim){
			qty=1;
			amt="[total_order_value]";
		}else{
			qty="[item_quantity]";
			amt="[item_unit_price]";
		}

		var sspix = "<img src=\"https://"+server+"/u?amount=[order_amount]&cid="+cid+"&oid=[unique_id]&type="+actionid;
		var slpix = "<img src=\"https://"+server+"/u?amount=0&cid="+cid+"&oid=[unique_id]&type="+actionid+"&method=IMG\" height=\"1\" width=\"20\">";
		var aspix = "<img src=\"https://"+server+"/u?cid="+cid+"&oid=[unique_id]&type="+actionid+"&item1=[item_id]&amt1="+amt+"&qty1="+qty;
		var alpix = "<img src=\"https://"+server+"/u?cid="+cid+"&oid=[unique_id]&type="+actionid+"&item1=[itemid]&amt1=0&qty1=1&method=IMG\" height=\"1\" width=\"20\">";
		var sspix_ct = "<iframe height=\"1\" width=\"1\" frameborder=\"0\" scrolling=\"no\" name=\""+ctagn+"\" id=\""+ctagid+"\" src=\"https://"+server+"/tags/c?containerTagId="+ctagid+"&cid="+cid+"&type="+actionid+"&oid=[unique_id]&amount=[order_amount]";
		var slpix_ct = "<iframe height=\"1\" width=\"1\" frameborder=\"0\" scrolling=\"no\" name=\""+ctagn+"\" id=\""+ctagid+"\" src=\"https://"+server+"/tags/c?containerTagId="+ctagid+"&cid="+cid+"&type="+actionid+"&oid=[unique_id]&amount=0\"></iframe>";
		var aspix_ct = "<iframe height=\"1\" width=\"1\" frameborder=\"0\" scrolling=\"no\" name=\""+ctagn+"\" id=\""+ctagid+"\" src=\"https://"+server+"/tags/c?containerTagId="+ctagid+"&cid="+cid+"&type="+actionid+"&oid=[unique_id]&item1=[item_id]&qty1="+qty+"&amt1="+amt;
		var alpix_ct = "<iframe height=\"1\" width=\"1\" frameborder=\"0\" scrolling=\"no\" name=\""+ctagn+"\" id=\""+ctagid+"\" src=\"https://"+server+"/tags/c?containerTagId="+ctagid+"&cid="+cid+"&type="+actionid+"&oid=[unique_id]&item1=[item_id]&qty1=1&amt1=0\"></iframe>";

		if(withdisc){
			sspix+=discount;
			aspix+=discount_ad;
			sspix_ct+=discount;
			aspix_ct+=discount_ad;
		}
		if(withcurr){
			sspix+=currency;
			aspix+=currency;
			sspix_ct+=currency;
			aspix_ct+=currency;
		}

		if(withcurr&&pixelsl=='s')
			$("#currtype").show();
		else
			$("#currtype").hide();

		if(!advlikesim&&pixeltype=='a')
			$("#nproducts").show();
		else
			$("#nproducts").hide();

		if(pixeltype=='s'){
			if(pixelsl=='s'){
				if(pixelct){
					pixtypenum = 1;
					tbox=sspix_ct+endpix_ct;
				}else{
					tbox=sspix+endpix;
					pixtypenum = 2;
				}
			}else{
				if(pixelct){
					tbox=slpix_ct;//+endpix_ct;
					pixtypenum = 3;
				}else{
					tbox=slpix;//+endpix;
					pixtypenum = 4;
				}
			}	
		}else{
			if(pixelsl=='s'){
				if(pixelct){
					tbox=aspix_ct+endpix_ct;
					pixtypenum = 5;
				}else{
					tbox=aspix+endpix;
					pixtypenum = 6;
				}
			}else{
				if(pixelct){
					tbox=alpix_ct;//+endpix_ct;
					pixtypenum = 7;
				}else{
					tbox=alpix;//+endpix;
					pixtypenum = 8;
				}
			}
		}
	}
	
	if(tbox==prevtbox)
		return;

	AnimateRotate(360);
	restart();
	prevtbox=tbox;
	if(clk==1){
		$("#pixelta").hide(400);
		$("#pixelhelp").hide(400);
	}
	document.getElementById('pixelta').innerHTML = tbox;
	$("#pixelta").show(2000);
	$("#pixelhelp").show(2000);
	if(!pixelUDO)
		$("#examplediv").show(2000);
	if(fc!=1)
		$("#generate_URL_div").show(2000);
	clk=1;
}

function updatecurr(){
	if(gstatus==99)
		return;
	prevcurr=document.getElementById('currspan').innerHTML=document.getElementById('currenciesso').options[document.getElementById('currenciesso').selectedIndex].value;
	$("#currspan").hide();
	$("#currspan").show(1000);
}

function genexample(){
	if(gstatus==99)
		return;
	var nitems = document.getElementById('exnumitems').value;
	var curr = document.getElementById('currenciesso').options[document.getElementById('currenciesso').selectedIndex].value;
	var pix;
	updatevalues();
	switch (pixtypenum){
		case 1:
		pix = "&lt;iframe height=\"1\" width=\"1\" frameborder=\"0\" scrolling=\"no\" <span id=\"tctagn\" class=\"pixhelp\">name=\""+ctagn+"\"</span> <span id=\"tctag1\" class=\"pixhelp\">id=\""+ctagid+"\"</span> <br>src=\"https://"+server+"/tags/c?<span id=\"tctag\" class=\"pixhelp\">containerTagId="+ctagid+"</span>&<span id=\"tcid\" class=\"pixhelp\">cid="+cid+"</span>&<span id=\"ttype\" class=\"pixhelp\">type="+actionid+"</span>&<span id=\"toid\" class=\"pixhelp\">oid="+get_oid()+"</span>&<span id=\"tamount\" class=\"pixhelp\">amount="+get_amt('s')+"</span>"+add_curr()+add_dis()+endpix_ct;
		break;
		case 2:
		pix = "&lt;img src=\"https://"+server+"/u?<span id=\"tamount\" class=\"pixhelp\">amount="+get_amt('s')+"</span>&<span id=\"tcid\" class=\"pixhelp\">cid="+cid+"</span>&<span id=\"toid\" class=\"pixhelp\">oid="+get_oid()+"</span>&<span id=\"ttype\" class=\"pixhelp\">type="+actionid+"</span>"+add_curr()+add_dis()+endpix;
		break;
		case 3:
		pix = "&lt;iframe height=\"1\" width=\"1\" frameborder=\"0\" scrolling=\"no\" <span id=\"tctagn\" class=\"pixhelp\">name=\""+ctagn+"\"</span> <span id=\"tctag1\" class=\"pixhelp\">id=\""+ctagid+"\"</span> <br>src=\"https://"+server+"/tags/c?<span id=\"tctag\" class=\"pixhelp\">containerTagId="+ctagid+"</span>&<span id=\"tcid\" class=\"pixhelp\">cid="+cid+"</span>&<span id=\"ttype\" class=\"pixhelp\">type="+actionid+"</span>&<span id=\"toid\" class=\"pixhelp\">oid="+get_oid()+"</span>&amount=0\"></iframe>";
		break;
		case 4:
		pix = "&lt;img src=\"https://"+server+"/u?amount=0&<span id=\"tcid\" class=\"pixhelp\">cid="+cid+"</span>&<span id=\"toid\" class=\"pixhelp\">oid="+get_oid()+"</span>&<span id=\"ttype\" class=\"pixhelp\">type="+actionid+"</span>&method=IMG\" height=\"1\" width=\"20\">";
		break;
		case 5:
		pix = "&lt;iframe height=\"1\" width=\"1\" frameborder=\"0\" scrolling=\"no\" <span id=\"tctagn\" class=\"pixhelp\">name=\""+ctagn+"\"</span> <span id=\"tctag1\" class=\"pixhelp\">id=\""+ctagid+"\"</span> <br>src=\"https://"+server+"/tags/c?<span id=\"tctag\" class=\"pixhelp\">containerTagId="+ctagid+"</span>&<span id=\"tcid\" class=\"pixhelp\">cid="+cid+"</span>&<span id=\"ttype\" class=\"pixhelp\">type="+actionid+"</span>&<span id=\"toid\" class=\"pixhelp\">oid="+get_oid()+"</span>"+generate_items('s')+add_curr()+add_dis()+endpix_ct;
		break;
		case 6:
		pix = "&lt;img src=\"https://"+server+"/u?<span id=\"tcid\" class=\"pixhelp\">cid="+cid+"</span>&<span id=\"toid\" class=\"pixhelp\">oid="+get_oid()+"</span>"+"&<span id=\"ttype\" class=\"pixhelp\">type="+actionid+"</span>"+generate_items('s')+add_curr()+add_dis()+endpix;
		break;
		case 7:
		pix = "&lt;iframe height=\"1\" width=\"1\" frameborder=\"0\" scrolling=\"no\" <span id=\"tctagn\" class=\"pixhelp\">name=\""+ctagn+"\"</span> <span id=\"tctag1\" class=\"pixhelp\">id=\""+ctagid+"\"</span> <br>src=\"https://"+server+"/tags/c?<span id=\"tctag\" class=\"pixhelp\">containerTagId="+ctagid+"</span>&<span id=\"tcid\" class=\"pixhelp\">cid="+cid+"</span>&<span id=\"ttype\" class=\"pixhelp\">type="+actionid+"</span>&<span id=\"toid\" class=\"pixhelp\">oid="+get_oid()+"</span>"+generate_items('l')+endpix_ct;
		break;
		default:
		pix = "&lt;img src=\"https://"+server+"/u?<span id=\"tcid\" class=\"pixhelp\">cid="+cid+"</span>&<span id=\"toid\" class=\"pixhelp\">oid="+get_oid()+"</span>&<span id=\"ttype\" class=\"pixhelp\">type="+actionid+"</span>"+generate_items('l')+endpix;
	}
	document.getElementById('ejemplo').innerHTML=pix;
	if(nitems!=prevnitems){
		$("#itemspan").hide(300);
	}
	if(curr!=prevcurr&&clkex==1){
		$("#currspan").hide();
	}
	prevnitems=nitems;
	prevcurr=curr;
	$("#ejemplo").show(1000);
	if(clkex!=1)
		setTimeout(function() { $("#itemspan").show(700); }, 800);
	else
		$("#itemspan").show(1000);
	$("#currspan").show(1000);
	fill_ex_items();
	clkex=1;
}

function get_oid(){
	if(gstatus==99)
		return;
	return Math.floor((Math.random()*100000000)+113);
}

function generate_items(sl){
	if(gstatus==99)
		return;
	var nitems = document.getElementById('exnumitems').value;
	if(nitems<1)
		nitems=document.getElementById('exnumitems').value=1
	var examp="<div id=\"itemspan\">";
	for (var i=1;i<=nitems;i++)
	{
		examp+=	"<br>&<span id=\"titem\" class=\"pixhelp titem\">item"+i+"="+Math.floor((Math.random()*1000000)+100)+"</span>&<span id=\"tqty\" class=\"pixhelp tqty\">qty"+i+"="+get_qty(sl)+"</span>&<span id=\"tamt\" class=\"pixhelp tamt\">amt"+i+"="+get_amt(sl)+"</span>"+get_dcnt(sl,i);
	}
	examp+="</div>";
	return examp;
}

function get_dcnt(sl,i){
	if(gstatus==99)
		return;
	if(sl=='s'&&withdisc)
		return "&<span id=\"tdcnt\" class=\"pixhelp tdcnt\">dcnt"+i+"=0</span>";
	return "";
}

function get_qty(sl){
	if(gstatus==99)
		return;
	if(sl=='s'&&!advlikesim){
		return Math.floor((Math.random()*10)+1);
	}else{
		return 1;
	}
}

function get_amt(sl){
	if(gstatus==99)
		return;
	if(sl=='s'){
		return Math.floor((Math.random()*200)+1);
	}else{
		return 0;
	}
}

function add_curr(){
	if(gstatus==99)
		return;
	if(withcurr)
		return "&amp;<span id=\"tcurr\" class=\"pixhelp tcurr\">currency=<span id=\"currspan\">"+document.getElementById('currenciesso').options[document.getElementById('currenciesso').selectedIndex].value+"</span></span>";
	return "";
}

function add_dis(){
	if(gstatus==99)
		return;
	if(withdisc)
		return "&<span id=\"tdiscount\" class=\"pixhelp tdiscount\">discount="+Math.floor((Math.random()*10)+1)+"</span>&<span id=\"tcoupon\" class=\"pixhelp\">coupon=10off100</span>";
	return "";
}

function get_url(showurl){
	if(gstatus==99)
		return;
	testaid=document.getElementById('testaid').value;
	if(testaid==""&&document.getElementById('forclient').checked){
		document.getElementById('testaid').className+=" wrongAID";
		$("#urlspan").hide(300);
		return 9;
	}else{
		document.getElementById('testaid').className="textbox";
	}
	document.getElementById('urlspan').innerHTML="";
	var urlf = document.URL;
	var urlvars;
	urlf=clean_url(urlf)+"?";
	urlvars="pt="+pixeltype+"&psl="+pixelsl+"&ser="+encodeURI(server)+"&pct="+pixelct+"&CID="+cid+"&acid="+actionid+"&ctagn="+ctagn+"&ctagid="+ctagid+"&wdisc="+withdisc+"&wcurr="+withcurr+"&als="+advlikesim+"&pnum="+pixtypenum+"&siteid="+siteid+"&isudo="+pixelUDO;
	if(testaid!="")
		urlvars+="&aid="+testaid;
	if(document.getElementById('forclient').checked)
		urlvars+="&fc=1";
	else
		urlvars+="&fc=0";
	urlvars=encodeURIComponent(ROT47(urlvars));
	urlf+=urlvars;
	try{
		document.getElementById('ajaxwait').innerHTML="<img src=\"img/ajax.gif\"/>";
		makeShort(urlf);
	}catch(err){
		document.getElementById('ajaxwait').innerHTML="";
		document.getElementById('urlspan').href=document.getElementById('urlspan').innerHTML=urlf;
	};
	var finalurl=document.getElementById('urlspan').innerHTML;
	/*if(document.getElementById('urlspan').innerHTML=="")
	document.getElementById('urlspan').href=document.getElementById('urlspan').innerHTML=urlf;*/
	if(showurl!=1)
		$("#urlspan").show(2000);
}

function updatefc(upd){
	if(gstatus==99)
		return;
	if(prevfc!=upd&&document.getElementById('urlspan').innerHTML!=""){
		$("#urlspan").hide();
		if(get_url(1)!=9)
			$("#urlspan").show(1000);
	}
	prevfc = upd;
}

function clean_url(urlf){
	if(gstatus==99)
		return;
	var oldURL = urlf;
	var index = 0;
	index = oldURL.indexOf('?');
	if(index == -1){
		index = oldURL.indexOf('#');
	}
	if(index != -1){
		return oldURL.substring(0, index);
	}else{
		return oldURL;
	}
}

function get_short_url(long_url, login, api_key, func)
{
	$.getJSON(
		"http://api.bitly.com/v3/shorten?callback=?",
		{
			"format": "json",
			"apiKey": api_key,
			"login": login,
			"longUrl": long_url
		},
		function(response)
		{
			func(response.data.url);
		}
		);
}

function makeShort(urlf)
{
	if(gstatus==99)
		return;

	var login = "iescribano";
	var api_key = "R_38f67d85385b4ed58f21ca353b1467a9";
	var long_url = urlf;

	get_short_url(long_url, login, api_key, function(short_url) {
		document.getElementById('ajaxwait').innerHTML="";
		if(typeof(short_url) == 'undefined')
			document.getElementById('urlspan').href=document.getElementById('urlspan').innerHTML=urlf;
		else if(short_url.indexOf("bit.ly") == -1)
			document.getElementById('urlspan').href=document.getElementById('urlspan').innerHTML=urlf;
		else
			document.getElementById('urlspan').href=document.getElementById('urlspan').innerHTML=short_url;

	});

}

function read_params(){
	if(gstatus==99)
		return 99;
	pixeltype=getUrlVars()["pt"];
	pixelsl=getUrlVars()["psl"];
	server=getUrlVars()["ser"];
	if(typeof(server) != 'undefined')
		document.getElementById('serverdom').value=server;
	else
		return 99;
	pixelct=(getUrlVars()["pct"]==="true");
	if(typeof(pixelct) != 'undefined')
		document.getElementById('pixelct').checked=pixelct;
	else
		return 99;
	cid=getUrlVars()["CID"];
	if(typeof(cid) != 'undefined')
		document.getElementById('cidtb').value=cid;
	else
		return 99;
	actionid=getUrlVars()["acid"];
	if(typeof(actionid) != 'undefined')
		document.getElementById('actionidtb').value=actionid;
	else
		return 99;
	ctagn=getUrlVars()["ctagn"];
	if(typeof(ctagn) != 'undefined')
		document.getElementById('contn').value=ctagn;
	else
		return 99;
	ctagid=getUrlVars()["ctagid"];
	if(typeof(ctagid) != 'undefined')
		document.getElementById('contid').value=ctagid;
	else
		return 99;
	withdisc=(getUrlVars()["wdisc"]==="true");
	if(typeof(withdisc) != 'undefined')
		document.getElementById('withdisc').checked=withdisc;
	else
		return 99;
	withcurr=(getUrlVars()["wcurr"]==="true");
	if(typeof(withcurr) != 'undefined')
		document.getElementById('withcurr').checked=withcurr;
	else
		return 99;
	advlikesim=(getUrlVars()["als"]==="true");
	if(typeof(advlikesim) != 'undefined')
		document.getElementById('advlikesiminp').checked=advlikesim;
	else
		return 99;
	siteid=(getUrlVars()["siteid"]);
	if(typeof(siteid) != 'undefined')
		document.getElementById('siteID').value=siteid;
	
	pixelUDO=(getUrlVars()["isudo"]==="true");
	if(typeof(pixelUDO) != 'undefined')
		document.getElementById('pixelUDO').checked=pixelUDO;
	
	pixtypenum=getUrlVars()["pnum"];
	fc=getUrlVars()["fc"];
	testaid=document.getElementById('testaid').value=getUrlVars()["aid"];

	if(pixeltype=='a'){
		document.getElementById('advance').checked=true;
		showadv();
	}

	if(pixelsl=='l'){
		document.getElementById('lead').checked=true;
		hideextras();
	}

	if(fc==1)
		setreadonly();
	else if(fc!=0)
		return 99;

	addct(pixelct);
	convert2UDO(pixelUDO);

	genpixel();
}

function getUrlVars() {
	if(gstatus==99)
		return;
	var params="?"+ROT47(decodeURIComponent(window.location.search.slice(1)));
	if(params.length==1)
		window.location.replace(clean_url(document.URL));
	var vars = {};
	var parts = params.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}

function setreadonly(){
	if(gstatus==99)
		return;
	$('#nclient').find('input, select').attr('disabled', true);
	$('td').find('input, textarea, select').attr('disabled', true);
	$("#tagoptions").hide();
	$("#UDOspan").hide();
}

function fill_help(){
	if(gstatus==99)
		return;
	var auxtbox = tbox;
	var testurlx= "http://www.jdoqocy.com/click-1245-"+get_testaid()+"?SID=TrackingTest";
	var testurl="<br><br><a target=\"_blank\" href="+testurlx+">"+testurlx+"</a><br><br>";
	var sudo = "&lt;script> <br>&emsp;var MasterTmsUdo = { <br>&emsp;'CJ' : {<br> &emsp;&emsp;'CID': <b style='color:green'>'"+cid+"'</b>,<br> &emsp;&emsp;'TYPE': <b style='color:blue'>'"+actionid+"'</b>,<br>&emsp;&emsp;'OID': 'SAMPLE_OID',<br>&emsp;&emsp;'AMOUNT': '0.00',<br>&emsp;&emsp;'CURRENCY' : 'USD',<br>&emsp;&emsp;'COUPON' : 'CouponName',<br>&emsp;&emsp;'DISCOUNT' : '0.00',<br>&emsp;&emsp;'FIRECJ' : 'TRUE' <i>// Note: The CJ tag will only fire when this parameter value is set to TRUE </i><br>&emsp;}<br>";
	var audo = "<br>&emsp;<i>// Note: The example below shows two different products were added to your shopping cart</i> <br><br>&emsp;MasterTmsUdo['CJ']['PRODUCTLIST'] = [<br>&emsp;{     <br>&emsp;&emsp;'ITEM' : 'Item 1 name',<br>&emsp;&emsp;'AMT' : '0.00',<br>&emsp;&emsp;'QTY' : '0',<br>&emsp;&emsp;'DCNT' : '0.00'<br>&emsp;},<br><br>&emsp;{   <br>  &emsp;&emsp;'ITEM' : 'Item 2 name',<br>&emsp;&emsp;'AMT' : '0.00',<br>&emsp;&emsp;'QTY' : '0',<br>&emsp;&emsp;'DCNT' : '0.00'<br>&emsp;} ] <br>";
	var fudo = "}; <br>&lt;/script><br><br><div id='textscript'></div></div>";

	if(pixelUDO){
		var htxt="<span class='helptitle'>FULL TAG</span><br><br><div style='text-align:left'>Please read this document before implementing the Script below: <a target=\"_blank\" href='http://www.qksrv.net/assets/pdf/en/udo_integration.pdf'><b>CTM integration document</b></a><br><br>";
	} else {
		var htxt=doctext1;
		htxt+="<br><div style=\"color:red\">ACTION ID: <span style=\"font-weight:bold\">"+actionid+"</span><br>ENTERPRISE ID: <span style=\"font-weight:bold\">"+cid+"</span></div><br>";
		htxt+=doctext2;
	}
	switch (pixtypenum)
	{
		case 1: case 2:
		htxt+=doctextSS;
		break;
		case 3: case 4:
		htxt+=doctextSL;
		break;
		case 5: case 6:
		htxt+=doctextAS;
		break;
		case 98:
		htxt+=sudo+fudo;
		break;
		case 99:
		htxt+=sudo+audo+fudo;
		break;
		default:
		htxt+=doctextAL;
		break;
	}
	htxt+=doctextTESTtitulo+testurl+doctextTEST;
	document.getElementById('mainhelp').innerHTML=htxt;
	if(pixelUDO){
		$("#textscript").text(tbox);
	}
	document.getElementById('showquickpixdiv').innerHTML=auxtbox.replace('<','&lt;')+doctextpixnotes;
}

function get_testaid(){
	if(gstatus==99)
		return;
	if(testaid==""||typeof(testaid) == 'undefined')
		testaid=document.getElementById('testaid').value;

	if(testaid==""||typeof(testaid) == 'undefined')
		//return "<span style='color:red;'>[AID]</span>";
	return "[AID]";
	else
		return testaid;
}
