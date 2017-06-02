<!DOCTYPE html>
<!-- saved from url=(0044)http://shell1.vclk.net/~alebus/pixel_parser/ -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Standalone pixel parser</title>
        
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                
        <link rel="stylesheet" type="text/css" href="/css/custom.css">

        <link rel="icon" type="image/png" href="http://shell1.vclk.net/~alebus/pixel_parser/favicon1.png">

     <!-- jQuery -->
    <script src="/js/jquery-1.11.3.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="/js/bootstrap.min.js"></script>

    <!-- Plugin JavaScript -->
    <script src="js/jquery.easing.min.js"></script>
    
    <!-- Custom Javascript -->
	<script src='/js/javascript.js'></script>
    <script src="/js/custom.js"></script>
	
    </head>
	
	
<body>
        
        
<img height="100" src="/images/cj_logo.png">
<h1>Standalone Pixel Parser</h1>
<br><br>



<input class="a_textbox" type="text" size="150" id="a_input"><br>
<input class="a_button" type="submit" value="Parse the pixel" id="a_submit">
<div id="output_area" style="display: block;"><br><strong>SUBTOTAL: 2299</strong><br><br><span class="params">CID</span>: 1522550<br><span class="params">TYPE</span>: 359963<br><span class="params">OID</span>: 33246735<br><span class="params">COUPON</span>: 0<br><span class="params">CURRENCY</span>: USD<br><img src="../images/blue_line.png"><br><span class="params_head">SKU GROUP NUMBER: 1</span><br><span class="params">ITEM</span>: 151046101<br><span class="params">AMT</span>: 2299<br><span class="params">QTY</span>: 1<br><span class="params">DCNT</span>: 0<br><img src="../images/blue_line.png"></div>
<br><br><br>


<table>
    <tbody><tr><td>sample pixel for testing:</td><td>&nbsp;</td><td>broken pixel for testing:</td></tr>
<tr>
    <td>
        <textarea class="sample_pixel" rows="4" cols="50">OID=123ABC&amp;CID=151515&amp;TYPE=353241&amp;containerTagId=777&amp;DCNT5=27.25&amp;DCNT4=9.75&amp;DCNT3=14.75&amp;DCNT2=8.50&amp;DCNT1=9.50&amp;QTY5=1&amp;DISCOUNT=5.00&amp;QTY4=1&amp;QTY3=1&amp;AMT5=109.00&amp;QTY2=1&amp;AMT4=39.00&amp;QTY1=2&amp;AMT3=59.00&amp;ITEM5=444234&amp;AMT2=34.00&amp;ITEM4=442843_BLA_L_1&amp;AMT1=19.00&amp;CURRENCY=USD&amp;ITEM3=444685&amp;ITEM2=404511&amp;ITEM1=384275&amp;COUPON=MUSHROOM_PIXXA</textarea>
    </td>
    <td>&nbsp;</td>
    <td>
        <textarea class="broken_pixel" rows="4" cols="50">OID=123ABC&amp;CID=151515&amp;TYPE=353241&amp;containerTagId=777&amp;DCNTx=27.25&amp;DCNT4=-9.75&amp;DCNT3=$14.75&amp;DCNT2=8.50&amp;DCNT1=9..50&amp;QTY5=1&amp;DISCOUNT=-5.00&amp;QTY4=1.0&amp;QTY3=-1&amp;AMT5=109..00&amp;QTY2=1&amp;AMT4=39,00&amp;QTY1=2&amp;AMT3=$59.00&amp;ITEM5=444234&amp;AMT2=34.00&amp;ITEM4=44284.3_BLA_L_1&amp;AMT1=19.00&amp;CURRENCY=USD&amp;ITEM3=444685&amp;ITEM2=404#511&amp;ITEM1=384275&amp;COUPON=MUSHROOM_PIXXA</textarea>
    </td>
</tr>
</tbody></table>

<br><br>
<div class="container-fluid" id="pixelparser">
<strong>NEW FEATURES</strong>
<ul>

    <li><strong>Update 03-25-2016: Some internal and final values in this tool are now rounded to TWO decimal places. The pixel parser and CJ system may not calculate subtotals in the same way.</strong></li>   
	<li><strong>Error-checking is being added</strong></li>    
	<li>Now supports HTML-encoded ampersands</li>
	
    <ul>
        <li>Currently implemented:</li>
            <li>QTY: Non-numeric values</li>
            <li>ITEM: Any character besides dashes, underscores, and alphanumeric</li>
            <li>AMOUNT and ITEM in the same tag (simple and advanced combined)</li>
            <li>Checks AMT and AMOUNT for anything besides 0-9 with decimal.</li>
            <li>Also runs separate "is numeric" check on AMT and AMOUNT in contains "1..0 " or similar.</li>
            <li>Warn if COUPON is missing</li>
            <li>A literal DCNTx etc. However, some variations currently break the parser.</li>
        </ul>
    
    
</ul>


<strong>Notes and warnings:</strong>
<ul>
<li>Recommended browser: Chrome</li>
<li>Some kinds of tags may break the parser - it requires properly formed key/value pairs and other basic information to be correct in order to parse the query string.</li>
<li>Characters displayed in warnings will be separated with commas.</li>
<li>Currently only "known" parameters are listed.</li>
<li>You should always verify the tag manually as well.</li>

</ul>
</div>

<br><br>
<p>-- Version 1.6 -- </p>



<script>

/*
 *Standalone Pixel Parser 
 *By Airn LeBus
 */


eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('$("#B").11();$("#1B").1D(1M(e){$("#B").1P("");b M=$("#1f").1q();M=M.1r(/&1C;/T,\'&\');b f=0;b k=1l;b 7="<r 8=\'7\'>";b F=M.14("&");b 3=1e 1h();S(i=0;i<F.1g;i++){Q=F[i].v(/(1t)|(1u)|(1o)|(1m)/T);5(Q!=w){7+=\'<2/>j: A 1w 1n: \'+Q}b t=F[i].14("=");3[t[0].1p()]=t[1]}b 6="";b G="";b I="";b J="";b L="";b U="";5(3["h"]!=m){J=3["h"].v(/[^0-9\\.]/g);5(J!=w){7+=\'<2/>j: C D A z h: \'+J;k=o}5(!$.1d(3["h"])){7+=\'<2/>j: h E P a 1b 16: \'+3["h"];k=o}U="Y";6=6+\'<4 8="c">h</4>: \'+3["h"]+\'<2/>\';f=f+p.q(y(3["h"])*d)/d}5(3["N"]!=m){6=6+\'<4 8="c">N</4>: \'+3["N"]+\'<2/>\'}5(3["x"]==m){7+=\'<2/>j: x E 1s.\'};5(3["x"]!=m){6=6+\'<4 8="c">x</4>: \'+3["x"]+\'<2/>\'}5(3["R"]!=m){6=6+\'<4 8="c">R</4>: \'+3["R"]+\'<2/>\'}5(3["H"]!=m){6=6+\'<4 8="c">H</4>: \'+3["H"]+\'<2/>\';f=f-p.q(y(3["H"])*d)/d}6=6+\'<17 15="10.W">\';S(b n=1;n<d+1;n++){5(3["s"+n]!=m){5(U=="Y"){7+=\'<2/>j: 1i 1k 1j h 1Z s c\';7+=\'<2/>13 O 1S P 12 1T S 1R 1Q.\';k=o}I=3["s"+n].v(/[^0-1O-Z\\-1U]/T);5(I!=w){7+=\'<2/>j: C D A z s\'+n+\': \'+I}6=6+\'<2/>\'+\'<4 8="1V">20 1x 1X: \'+n+\'</4><2/>\'+\'<4 8="c">s\'+\'</4>: \'+3["s"+n]+\'<2/>\'+\'<4 8="c">l\'+\'</4>: \'+3["l"+n]+\'<2/>\'+\'<4 8="c">u\'+\'</4>: \'+3["u"+n]+\'<2/>\';G=3["u"+n].v(/[^0-9]/g);5(G!=w){7+=\'<2/>j: C D A z u\'+n+\': \'+G;k=o}X=p.q(y(3["l"+n])*d)/d;V=p.q(y(3["u"+n])*d)/d;f=f+(X*V);L=3["l"+n].v(/[^0-9\\.]/g);5(L!=w){7+=\'<2/>j: C D A z l\'+n+\': \'+L;k=o}5(!$.1d(3["l"+n])){7+=\'<2/>j: l\'+n+\' E P a 1b 16: \'+3["l"+n];k=o}5(3["K"+n]!=m){6=6+\'<4 8="c">K</4>: \'+3["K"+n]+\'<2/>\';f=f-p.q(y(3["K"+n])*d)/d}}1A{1y}}5(k===o){7+=\'<2>j: 1z 1E z 1K 1L O 1J 1I. 13 O 1G 12 1H.\'}7+="<2/><2/></r><2/><2/>";5(7==="<r 8=\'7\'><2/><2/></r><2/><2/>"){7=""}f=p.q(f*d)/d;$("#B").1Y(\'<2>\'+7+\'<19>1F: \'+f+\'</19><2/><2/>\'+\'<4 8="c">1a</4>: \'+3["1a"]+\'<2/>\'+\'<4 8="c">18</4>: \'+3["18"]+\'<2/>\'+\'<4 8="c">1c</4>: \'+3["1c"]+\'<2/>\'+6+\'</r></r><17 15="10.W">\');5($("#B").E(":1W")){$("#B").11("1v","1N")}});',62,125,'||br|pixelDict|span|if|itemList|warnings|class|||var|params|100||subTotal||AMOUNT||Warning|badSubtotal|AMT|undefined||true|Math|round|div|ITEM||QTY|match|null|COUPON|parseFloat|in|found|output_area|Illegal|characters|is|pixelArray|qtyBadChars|DISCOUNT|itemBadChars|amountBadChars|DCNT|amtBadChars|querystring|CONTAINERTAGID|subtotal|not|usingX|CURRENCY|for|gi|tagType|tempqty|png|tempamt|simple||blue_line|toggle|be|The|split|src|value|img|TYPE|strong|CID|numeric|OID|isNumeric|new|a_input|length|Array|tag|both|has|false|qtyx|parameter|itemx|toUpperCase|val|replace|missing|dcntx|amtx|slide|bad|GROUP|break|Fields|else|a_submit|amp|click|used|SUBTOTAL|may|incorrect|errors|generated|the|order|function|500|9A|html|reason|this|will|calculated|_|params_head|hidden|NUMBER|append|and|SKU'.split('|'),0,{}))



</script>




<script>

</script>





   





</body></html>