
var simp;
var adv;

var sale;
var lead;

var server;

var use_disc;
var use_curr;
var use_advsimp;

var use_ct;

var tcid;

var use_fc;

var testAID;

var tcid;
var ttype;
var toid;
var tfull_item;
var tamount;
var titem;
var tqty;
var tamt;
var tdcnt;
var tdiscount;
var tcoupon;

var doctext1;
var doctext2;
var doctextSS;
var doctextAS;
var doctextSL;
var doctextAL;
var doctextTESTtitulo;
var doctextTEST;

function fill_texts(){

	simp="This is for advertisers who are only tracking at the shopping cart level";
	adv="This is for advertisers who are tracking at the item/product level within the shopping cart. It can also be used to see product performance in the CJ Reports";

	sale="Commission method in which a publisher is paid when a product or service is purchased on an advertiser's web site by a publisher - referred visitor. A simple integration pays the same commission rate regardless of which product or service was purchased, or which lead was acquired. For example, an electronics vendor pays the same commission rate for an adaptor cable and a DVD player";
	lead="Commission method in which a publisher is paid when an online registration, membership, or subscription is filled out and submitted to an advertiser by a publisher - referred visitor.";

	server="Integration domain (Please speak with CJ Integration's team before changing this)";

	use_disc="The pixel can be generated with or without discount parameters depending on your needs";
	use_curr="When your CJ account was set up, it was linked with a specific currency (GBP,EUR,USD..). If you are using different currencies in your site, please check this option";
	use_advsimp="If you don't want to pay product-based commission, but you want to see product performance in your CJ Reports, please check this option";

	use_ct="";

	tcid="Enterprise ID";

	use_fc="If you are going to send this URL to the client, please check this. Otherwise, please uncheck it";

	testAID="Test Link ID. Mandatory if the links is going to be sent to the client";

	tctagn="Conversion tag unique name. If you have multiple conversion tags, you can use this parameter to uniquely identify your tags";
	tctag="Unique identifier for the conversion tag";
	tcid="Eenterprise id used to identify the account";
	ttype="Action ID: A CJ defined id (actionid), used to define the type of event and apply the appropriate publisher commission";
	toid="Shopping cart order id";
	tfull_item="";
	tamount="Total shopping cart amount (excluding taxes or other charges)";
	titem="Unique product identifier (i.e. isbn, ean, sku, upc or product id)";
	tqty="Quantity of items(of previous ITEMID) purchased in the shopping cart for the specific order";
	tamt="Unit price for the product (for previousITEMID) in the shopping cart";
	tdcnt="Individual product discount. The discount is made to the total amount for the previous ITEMID";
	tcurr="Shopping cart transaction currency for the specific order";
	tdiscount="Shopping cart TOTAL order discount amount";
	tcoupon="Parameter for a coupon, voucher or discount code applied at the time of purchase";

	doctextpixnotes='<br><br><b>*Please, do not include the brackets. <br> *If you are not using the coupon field, please leave it blank.</b>'
	doctext1="<span class=\"helptitle\">NOTE</span><br><br>The information here below is aimed at a technical audience and should be forwarded to the attention of a technical team within your organisation.<br><br>The main thing you would need to be concentrating on is the format of the pixel tag and its value parameters.<br>This is so that you can then build the necessary logic at your end and integrate the pixel on your website's confirmation page.<br><br><br><div id=\"quickpixel\" class=\"helptitle\">QUICK OVERVIEW<img src='images/mouse.png' width='15' style='margin-left:4px;position:relative;top:3px;'><br></div><div id=\"showquickpixdiv\"></div><br><br>We provide you with two field ID values, which are specific to this account, as follows:<br>";
	docacideid="ACTION ID: <PLACE ACTION ID HERE><br>ENTERPRISE ID: <PLACE ENTERPRISE ID HERE><br>";
	doctext2="These two field values must be hard-coded. The <span style=\"font-weight:bold\">ENTERPRISE ID</span> needs to be inserted as value of the <span style=\"font-weight:bold\">\"CID\"</span> field and the <span style=\"font-weight:bold\">ACTION ID</span> needs to be inserted as value of the <span style=\"font-weight:bold\">\"TYPE\"</span> field of the image pixel code.<br><br>"
	doctextSS="The field values of the <span style=\"font-weight:bold\">AMOUNT</span> (total shopping cart order amount), <span style=\"font-weight:bold\">DISCOUNT</span> (order discount amount), <span style=\"font-weight:bold\">OID</span> (unique order ID), and <span style=\"font-weight:bold\">CURRENCY</span> must be dynamically populated by the logic of your website order confirmation page. CJ requires a unique Order ID to be generated by your system. <br>";
	doctextAS="The items  <span style=\"font-weight:bold\">OID</span> (unique order ID), <span style=\"font-weight:bold\">ITEMx, AMTx, QTYx, DCNTx, CURRENCY</span> and <span style=\"font-weight:bold\">DISCOUNT</span> (order discount amount), field values must be dynamically populated by the logic of your order confirmation page. <span style=\"font-weight:bold\">ITEM1, AMT1, QTY1, DCNT1</span> fields relate to just a single product.<br><span style=\"font-weight:bold\">ITEM1</span> is the product ID (also known as the SKU code). <span style=\"font-weight:bold\">AMT1</span> is the single unit cost of the product. <span style=\"font-weight:bold\">QTY1</span> indicates the number of units sold of that product. <span style=\"font-weight:bold\">DCNT1</span> represent the discount amount on that product.<br>";
	doctextSL="The value of the <span style=\"font-weight:bold\">OID</span> field (unique order ID), is to be dynamically populated by the logic of your website confirmation page.<br>";
	doctextAL="The items OID (unique order ID) and <span style=\"font-weight:bold\">ITEM1</span> field values must be dynamically populated by the logic of your order confirmation page. The <span style=\"font-weight:bold\">ITEM1</span> fields relate to just a single item or category etc..<br>";

	doctextsUDO="";
	doctextaUDO="";

	doctextTESTtitulo="<br><br><span class=\"helptitle\">TEST INSTRUCTIONS</span>";
	doctextTEST="1) Click on the above test link (or copy/paste it into your Internet browser)<br><br>2) Create a test transaction on your website (one for each CJ action you wish to test).<br><br><span style=\"font-weight:bold\">Note:</span> If the CJ pixel tag/batch file has been integrated on a test server/environment, after clicking on the CJ test link, change the address of your Internet browser to point to the corresponding page on your test server/environment, including all parameters that are required in order for your test server to identify and initiate CJ referral activity at your end (if applicable), then proceed as normal and create the test transaction. <br><br>3) Once your order or action is completed, and your confirmation page has fully loaded, save this page. <br><br><span style=\"font-weight:bold\">Note:</span> In Internet Explorer, this is done by accessing the <span style=\"font-weight:bold\">\"File &#8658;Save As\"</span> menu, and selecting \"Web page, single HTML only\", in the \"Save as type\" drop-down box.<br><br>";
}

function fill_items(){
	document.getElementById('simple').title=simp;
	document.getElementById('advance').title=adv;

	document.getElementById('sale').title=sale;
	document.getElementById('lead').title=lead;

	document.getElementById('serverdom').title=server;

	document.getElementById('withdisc').title=use_disc;
	document.getElementById('withcurr').title=use_curr;
	document.getElementById('advlikesiminp').title=use_advsimp;

	document.getElementById('pixelct').title=use_ct;

	document.getElementById('cidtb').title=tcid;

	document.getElementById('forclient').title=use_fc;

	document.getElementById('testaid').title=testAID;
}

function fill_ex_items(){

	try{document.getElementById('tctagn').title=tctagn;}catch(err){}
	try{document.getElementById('tctag').title=tctag;}catch(err){}
	try{document.getElementById('tctag1').title=tctag;}catch(err){}
	try{document.getElementById('tdiscount').title=tdiscount;}catch(err){}
	try{document.getElementById('tamount').title=tamount;}catch(err){}
	document.getElementById('ttype').title=ttype;
	document.getElementById('toid').title=toid;
	document.getElementById('tcid').title=tcid;
	document.getElementById('tcoupon').title=tcoupon;

	update_adv_items('titem', titem);
	update_adv_items('tqty', tqty);
	update_adv_items('tamt', tamt);
	update_adv_items('tcurr', tcurr);
	update_adv_items('tdcnt', tdcnt);

}

function update_adv_items(spclass, ttext){
	var divs = document.getElementsByClassName(spclass);
	for(var i=0; i<divs.length; i++) {
	  divs[i].title=ttext;
	}
}