<?php

if (isset($_POST)) {

	$fname = $_POST['first_name'];
	$lname = $_POST['last_name'];
	$email = $_POST['email'];
	$phone = $_POST['phone'];
	$source = $_POST['source'];
	$message = $_POST['message'];

	$clearance = 0;

	//Validate Requireds
	$reqs = [$fname,$lname,$email,$phone,$source];
	foreach( $reqs as $r ) {
		$clearance += (required($r)) ? 0 : 1;}
	//Validate Email
	$clearance += (email($email)) ? 0 : 1;
	//Validate Phone
	$clearance += (phone($phone)) ? 0 : 1;

	//Check Validation & Send Email
	if ($clearance !== 0) {
	/* submission invalidation */

		/* error-handling */

	} else {
	/* submission clear */

		//Load CMS Constants
		$community_number = "215";
		$followup_code = "E";
		$custom_4 = ""

		//Load Request Data
		$data = "FirstName:" . $fname;
		$data .= "~LastName:" . $lname;
		$data .= "~Email:" . $email;
		$data .= "~Phone:" . $phone;
		$data .= "~Source:" . $source;
		$data .= "~Comments:" . $message;
		$data .= "~CommunityNumber:" . $community_number;
		$data .= "~FollowupCode:" . $followup_code;
		$data .= "~Custom4" . $custom_4;
		$base = "http://www.buildercms.com/cms/custom/ProspectImport.aspx?ProspectData=";
		$url .= $base . (urlencode($data));

		//Initialize Mailer & Request
		$response = implode('',file($url));

	}/**(submission)**/
}
//GENERAL GLOBAL DECLARATIONS
function required($x) {
	if ($x !== "") return true;
	else return false;
}
function email($x) {
	$rgx = '/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+([.][a-zA-Z]+)+$/';
	$val = preg_match($rgx,$x);
	return ($val === 1) ? true : false;
}
function phone($x) {
	$rgx = '/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/';
	$val = preg_match($rgx,$x);
	return ($val === 1) ? true : false;
}

?>
