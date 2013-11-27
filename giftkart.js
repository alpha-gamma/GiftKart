var myform;
var fromGetPerm = false;

$(document).ready(function() {
	window.fbAsyncInit = function() {
		FB.init({
			appId: '547881965266446', // Set YOUR APP ID
			channelUrl: 'http://bvpgiftkart.appspot.com/channel.html', // Channel File
			status: true, // check login status
			cookie: true, // enable cookies to allow the server to access the session
			xfbml: true // parse XFBML
		});
		fromGetPerm = false;
		FB.Event.subscribe('auth.authResponseChange', function(response) {
			if (response.status === 'connected') {
				getUserInfo();
			} else if (response.status === 'not_authorized') {} else {}
		});
		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				// alert("here");
				$('#welcomeScreen').addClass("animated fadeOut").one('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd', function() {
					$('#welcomeScreen').addClass('hidden');
					$('#mainScreen').removeClass('hidden');
					$('#mainScreen').addClass('fadeIn animated');
				});
			} else if (response.status === 'not_authorized') {
				$('#login').html("Login");
				$('#but1').show();
				$('#but1').addClass('tada animated');
				$('#but1').click(function() {
					getPerm();
					$('#welcomeScreen').addClass("animated fadeOut").one('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd', function() {
						$('#welcomeScreen').addClass('hidden');
						$('#mainScreen').removeClass('hidden');
						$('#mainScreen').addClass('fadeIn animated');
					});
				});
			} else {
				$('#login').html("Sign Up");
				$('#but1').show();
				$('#but1').addClass('tada animated');
				$('#but1').click(function() {
					getPerm();
					$('#welcomeScreen').addClass("animated fadeOut").one('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd', function() {
						$('#welcomeScreen').addClass('hidden');
						$('#mainScreen').removeClass('hidden');
						$('#mainScreen').addClass('fadeIn animated');
					});
				});
			}

			$('.birthdayHead').click(function() {
				$(this).children('.head .arrow').toggleClass('rotateArrow');
				$(this).next('.details').slideToggle("slow");
				// console.log($(this).next('.details'));
			});

			$('#searchBar').blur(function() {
				$(this).val('');
			});

		});

		function getPerm() {
			FB.login(function(response) {
				if (response.authResponse) {
					// getUserInfo();
				} else {
					console.log('User cancelled login or did not fully authorize.');
				}
			}, {
				scope: 'email, user_about_me, user_activities, user_birthday, user_events, user_friends, user_groups, user_interests, user_likes, user_location, user_photos, user_subscriptions, friends_birthday, friends_likes, friends_interests, publish_stream'
			});
			fromGetPerm = true;
		}
	};
});

// Load the SDK asynchronously
(function(d) {
	var js, id = 'facebook-jssdk',
		ref = d.getElementsByTagName('script')[0];
	if (d.getElementById(id)) {
		return;
	}
	js = d.createElement('script');
	js.id = id;
	js.async = true;
	js.src = "//connect.facebook.net/en_US/all.js";
	ref.parentNode.insertBefore(js, ref);
}(document));

function getUserInfo() {
	FB.api('me?fields=name,picture.type(normal),picture', function(response) {
		// console.log(response.picture.data.url);
		$('#userProfile .userName').html(response.name);
		$('#userProfile .profilePic').css({
			'background': 'url("' + response.picture.data.url + '") center',
			'background-size': 'cover'
		});
	});

	FB.api('/me/friends?fields=name,birthday', function(response) {
		var friends = [];
		var today = [];
		var thisMonth = [];
		var currentMonth = new Date().getMonth() + 1;
		$.each(response.data, function(index, val) {
			if (this.birthday) {
				var bday = this.birthday;
				var naam = this.name;
				friends.push({
					label: naam,
					value: naam,
					bday: bday
				});
				if (currentMonth <= bday.substr(0, 2) * 1 && new Date().getDate() <= new Date(bday).getDate()) {
					if (currentMonth == bday.substr(0, 2) * 1) {
						thisMonth.push(this);
						if (new Date().getDate() == new Date(bday).getDate()) {
							today.push(this);
							thisMonth.pop(this);
						}
					}
				}
			}
		});
		//console.log(JSON.stringify(friends));
		var year = new Date().getFullYear();
		thisMonth = thisMonth.sort(function(a, b) {
			return new Date(a.birthday).setYear(year) - new Date(b.birthday).setYear(year);
		});

		$.each(thisMonth, function(index, val) {
			$('#upcoming .details').append("<div class='friendDetails'><div class='calenderIcon'>" + this.birthday.substr(3, 2) + "</div><div class='friendName'>" + this.name + "</div><div class='messageIcon'></div><div class='linkIcon'></div></div>");
		});

		$.each(today, function() {
			upcoming.push(this.name);
			$('#today .details').append("<div class='friendDetails'><div class='friendName'>" + this.name + "</div><div class='messageIcon'></div><div class='linkIcon'></div></div>");
		});

		$("#searchBar").autocomplete({
			minLength: 0,
			source: friends,
			autoFocus: true,
			focus: function(event, ui) {
				//$("#searchBar").val(ui.item.label);
				return false;
			},
			select: function(event, ui) {
				$("#searchBar").val(ui.item.label);
				showRec(ui.item.label);
				return false;
			}
		}).data("ui-autocomplete")._renderItem = function(ul, item) {
			return $("<li>").attr("data-value", item.value)
				.append("<a>" + item.value + "<br/>" + item.bday.substr(0, 5) + "</a>")
				.appendTo(ul);
		};
		var queryURL = 'http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&outputSelector=PictureURLLarge&GLOBAL-ID=EBAY-IN&SECURITY-APPNAME=Individu-3628-4ccf-a6b5-3a96454ede1d&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=women%20jackets';
		$.get(queryURL, function(data) {
			console.log(data);
		});

	});
}

function showRec(s) {
	$('#searchBar').val('');
	$('#headLabel').html(s);
}

function clickMe() {
	// alert('hello');
	FB.ui({
		method: 'feed',
		to: '100000059179620',
		link: 'https://apps.facebook.com/547881965266446/',
		caption: 'GiftKart',
		description: 'Never forget your friends birthday with us.'
	}, function(response) {
		if (!response || response.error) {
			alert('Error occured');
			console.log(response);
		} else {
			alert('Post ID: ' + response.post_id);
			console.log(response.post_id);
		}
	});
}

function getData(id) {
	var dataCSV = id + "";
	var queryURL = '/' + id + '/likes?limit=2000';
	// console.log(queryURL);
	FB.api(queryURL, function(response) {
		// console.log(JSON.stringify(response.data));
		var likes = response.data;
		$.each(likes, function() {
			if (this.category === "Movie")
				dataCSV += "," + this.id;
		});
		console.log(dataCSV);
		if (fromGetPerm)
			makeForm(dataCSV);
		showRecc(dataCSV);
	});
}

function showRecc(data) {
	$('#friendsList').hide();
	$('#recommend').show();
	var items = data.split(',');
	$.each(items, function(index, val) {
		$('.gifts').append("<li>" + items[index] + "</li>");
	});
	//$('#recommend').append("<div class='newbox'>I'm new box by prepend</div>);
}


function makeForm(id) {
	myform = document.createElement("form");
	myform.setAttribute("id", "myform");
	myform.setAttribute('action', "/helloworld");
	myform.setAttribute('method', "post");

	var tname = document.createElement('input');
	tname.setAttribute('type', 'text');
	tname.setAttribute('name', "name");
	tname.setAttribute('value', id);
	myform.appendChild(tname);
	document.body.appendChild(myform);
	document.forms["myform"].submit();
}