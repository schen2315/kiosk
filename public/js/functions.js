$('#home-page').on('click', function () {
	window.location.href = "welcome.html";
});

$('#welcome-continue').on('click', function () {
	window.location.href = "verification.html";
});

$('#quit-button').on('click', function () {
	window.location.href = "/";
});

//$('#send-code-button').on('click', function () {
//	window.location.href = "code.html";
//});

// $('#code-button').on('click', function () {
//	window.location.href = "vote.html";
//});

$('#submit-poll-button').on('click', function () {
	window.location.href = "finish.html";
});
$('#send-code-button').on('click', function() {
	//send phone # to the back end
	$num = $("#verify-number").val();
	$.ajax({
		type:"POST",
		url: "/verification.html",
		data: {num: $num},
		success: function(data) {
			window.location.href = "code.html";
		}
	});
});
$('#code-button').on('click', function() {
	//get the verification code and send to back end
	$code = $("#code-number").val();
	$.ajax({
		type:"POST",
		url: "/code.html",
		data: {code: $code},
		success: function(data) {
			if(data == "success") {
				window.location.href = "vote.html";
			} else {
				$("#verify-status").html("Incorrect Code. Please Try Again");
			}
		}
	});
});
$("#answer-div ul li").on('click', function() {
    window.location.href = "/finish.html";
});
