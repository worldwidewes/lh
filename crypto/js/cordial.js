//Cordial Conversion Tracking Template - Brief
//Cordial Documentation: https://cordial.zendesk.com/hc/en-us/articles/212527987-Embedded-Javascript-Listener
//This is the brief version.  No functions for pulling items into these values client side.  Code the 3 needed values in, or use your own client-side method to do so.  (account, email, orderID)

//Put this on EVERY page -- including all landing pages (both DR-hosted and client-hsoted), all checkout pages (ThreePgCheckout, QuickBuy), and all conversion pages (ThankYou, YourOrderIsBeingProcessed and DPLReview)
//Prep Section
window.mfcord = window.mfcord || {};

//Set Account Key here.  Commented value is for the sandbox Account.  Find this under: UI Top Right-> Administration -> Account Settings -> Account Info panel, "Account Key" value
mfcord.account = "nuanceapac";	//"digriv"
mfcord.email = 'westest@gmail.com'; //e.g. mfcord.email = "bob@gmail.com";
//pass false or leave as empty string if there is no email address to report 
	//e.g. mfcord.email = false;
	//e.g. mfcord.email = "";
mfcord.orderID = '129808';	//e.g. var orderID = "1245678901234";
//pass false or leave as empty string or numeral 0 if no order to report (e.g. cart pages)
	//e.g. mfcord.orderID = false;
	//e.g. mfcord.orderID = "";
	//e.g. mfcord.orderID = 0;

//list of QS parameters to track
//Add additional elements to this array with needed additional querystring parameters to be captured by cordial.
//e.g. see this documentation: https://cordial.zendesk.com/hc/en-us/articles/212527987-Embedded-Javascript-Listener#sourcetracking
mfcord.qs_params = [
	"utm_medium",	//Standard GA Medium (e.g. "organic search")
	"utm_source",	//Standard GA Source (e.g. "google.com")
	"utm_campaign",	//Standard GA Marketing Campaign (highly variable but e.g. "2016 Holiday Remarketing")
	"utm_keyword",	//Standard GA Paid Search keyword matched (e.g. "discount-software")
	"cid",			//Semi-Standard Adobe Analytics/Omniture campaign information (e.g. all the example utm_ parameter values above concatenated together: "organic search:google.com:2016 Holiday Remarketing:discount software")
	"cvosrc"		//Standard Convertro campaign information  (e.g. all the above combined e.g. "ps.google.discount-software")
	];

//End Prep Section
//Call Cordial Functions
mfcord.IdentifyContactOrder = function(){
	var mfcord = window.mfcord || {};
	//Identify user
	//if we have an email address for the user, identify them to Cordial
	if (mfcord.email !== false && typeof mfcord.email === "string" && mfcord.email.length > 0){
		cordial.identify(mfcord.email);
		//Add or Update identified contact to cordial
		cordial.contact();
		//Track Order
		//If order ID (required) is present, then track an order:
		if (mfcord.orderID !== false && mfcord.orderID !== "" && mfcord.orderID !== 0){
			//For our initial integratin solution, we only need ORDER ID -- everything else will be populated via a GC integration.  Passing required fields with generic values.
			//see documentation here: https://cordial.zendesk.com/hc/en-us/articles/212527987-Embedded-Javascript-Listener#order
			cordial.order('add',{
				 'orderID': mfcord.orderID.toString(),
				 'items': [
					 {
						'productID': 'default',
						'sku': 'default',
						'category': 'default',
						'name': 'default',
						'qty': 0
					}
				 ]
			});
		}
	}
};

//Load Cordial Library.  With onload handler to call the Cordial user and order tracking functions.
(function () {
	var t = document.createElement('script');
	t.setAttribute("data-cordial-track-key", mfcord.account);
	t.setAttribute("data-cordial-url", "track.cordial.io");
	t.setAttribute("data-auto-track", false);
	t.src = 'https://track.cordial.io/track.js';
	t.async = true;
	t.setAttribute("data-cordial-source-keys", mfcord.qs_params);	//include this line to track specified traffic source parameters.  Hardcode an array in place of mfcord.qs_params if desired.  Omit this entire line if desired.
	t.onload = mfcord.IdentifyContactOrder;
	document.body.appendChild(t);
})();

//Note to developers and QAers
	//The cordial.identify call returns '400 (incorrect input attribute)' if the user has never been identified before (i.e. they are new to file)
	//The cordial.order call returns '400 (Error)' if you've already submitted that orderID once before.
	//While frightening, these are the expected responses to receive, per Cordial guidance, in many scenarios.