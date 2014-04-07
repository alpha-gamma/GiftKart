var myform;
var fromGetPerm = false;

$(document).ready(function() {
	window.fbAsyncInit = function() {
		FB.init({
			appId: '547881965266446', // Set YOUR APP ID
			channelUrl: 'channel.html', // Channel File
			status: true, // check login status
			cookie: true, // enable cookies to allow the server to access the session
			xfbml: true // parse XFBML
		});

		fromGetPerm = false;
		FB.Event.subscribe('auth.authResponseChange', function(response) {
			if (response.status === 'connected') {
				$('#loading').hide();
				getUserInfo();
			} else if (response.status === 'not_authorized') {} else {}
		});

		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				//$('#welcomeScreen').addClass("animated fadeOut").one('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd', function() {
	
                                    $('#welcomeScreen').addClass('hidden');
					$('#mainScreen').removeClass('hidden');
					$('#mainScreen').addClass('fadeIn animated');
					$('#loading').hide();
				//});
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

			getEbayData(["gift items"], 12);

		});

		function getPerm() {
			FB.login(function(response) {
				if (response.authResponse) {
					// getUserInfo();
				} else {
					// console.log('User cancelled login or did not fully authorize.');
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
		$('#userProfile .userName').html(response.name).click(function() {
			showRec(response.name, response.id);
		});
		$('#userProfile .profilePic').css({
			'background': 'url("' + response.picture.data.url + '") center',
			'background-size': 'cover'
		});
	});

	FB.api('/me/friends?fields=name,birthday,picture', function(response) {
		var friends = [];
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var today = [];
		var thisMonth = [];
		var currentMonth = new Date().getMonth() + 1;
		$.each(response.data, function(index, val) {
			if (this.birthday) {
				var bday = this.birthday;
				var naam = this.name;
				var id = this.id;
				friends.push({
					label: naam,
					value: naam,
					birday: bday.substr(3, 2) + " " + months[(bday.substr(0, 2) * 1) - 1],
					pic: this.picture.data.url,
					uid: id
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

		console.log(friends);
		var year = new Date().getFullYear();
		thisMonth = thisMonth.sort(function(a, b) {
			return new Date(a.birthday).setYear(year) - new Date(b.birthday).setYear(year);
		});

		$.each(thisMonth, function(index, val) {
			var item = "<div class='friendDetail'><div class='calenderIcon'>" + this.birthday.substr(3, 2) + "</div><div class='friendName'>" + this.name + "</div><div class='messageIcon' onclick='wishBirthday(" + this.id + ")'></div><div class='linkIcon'></div></div>";
			$(item).appendTo('#upcoming .details').click(function() {

				showRec(thisMonth[index].name, thisMonth[index].id);
			});
			var loc = "http://www.facebook.com/" + this.id;
			$('.linkIcon').click(function() {
				window.open(loc, '_blank');
			});
		});

		$.each(today, function(index, val) {
			var item = "<div class='friendDetail'><div class='calenderIcon'>" + this.birthday.substr(3, 2) + "</div><div class='friendName'>" + this.name + "</div><div class='messageIcon' onclick='wishBirthday(" + this.id + ")'></div><div class='linkIcon'></div></div>";
			$(item).appendTo('#today .details').click(function() {
				showRec(today[index].name, today[index].id);
			});
			var loc = "http://www.facebook.com/" + this.id;
			$('.linkIcon').click(function() {
				window.open(loc, '_blank');
			});
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
				showRec(ui.item.label, ui.item.uid);
				return false;
			}
		}).data("ui-autocomplete")._renderItem = function(ul, item) {
			return $("<li>").attr("data-value", item.value)
				.append("<a class='testclass'><div class='autoCompleteDiv'>" +
					"<div class='friendPic' style='background:url(" + item.pic + ")'></div>" +
					"<div class='friendDetails'>" +
					"<div class='name'>" + item.value + "</div>" +
					"<div class='birthday'>" + item.birday + "</div>" +
					"</div></div></a>")
				.appendTo(ul);
		};
	});
}

function showRec(s, id) {
	$('#searchBar').val('');
	$('#headLabel').html(s);
	$('#loading').show();
	$('#recItems').html('');
	getRecommendations(id);
}


function getRecommendations(id) {
	var dataCSV = id + "";
	var userLikes = [];
	var queryURL = '/' + id + '/likes?limit=2000';
	FB.api(queryURL, function(response) {
		var likes = response.data;
		$.each(likes, function() {
			if (this.category == 'Movie' || this.category == 'Tv' || this.category == 'Tv show' || this.category == 'Book')
				dataCSV += "," + this.id;
				userLikes.push(this.name);
		});
		// console.log(fromGetPerm + '' + dataCSV);
		if (dataCSV == id) {
			getEbayData(["gift items"], 12);
		} else {

			$.post("getRecommendation", {
				data: dataCSV
			}, function(response) {
				$.each(response,function(i,val) {
					userLikes.push(val);
				});
				console.log(userLikes);
				getEbayData(userLikes, 1);
			});
		}
	});
}

function _cb_findItemsByKeywords(root) {
	// recomCounts--;
	$('#loading').hide();
	var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
	// console.log(items);

	$.each(items, function(i, val) {
		console.log(items[i]);
		if(items[i].galleryInfoContainer) {
			var item = "<div class='giftItems hidden'>" +
			"<div class='giftItemPic' style='background:url(" + items[i].galleryInfoContainer[0].galleryURL[0].__value__ + ") no-repeat center; background-size: contain'>" +
			"</div>" +
			"<div class='giftItemName'>" +
			"	<a href='" + items[i].viewItemURL + "' target='_blank'>" + items[i].title + "</a>" +
			"</div>" +
			"<div class='giftItemPrice'>Rs." +
			items[i].sellingStatus[0].convertedCurrentPrice[0].__value__ +
			"</div>" +
			"</div>";
		$(item).appendTo('#recItems').delay(i * 300).fadeIn("slow");
		}
		

	});
	$('.giftItems').click(function() {
		var loc = $(this).find("a").attr("href");
		window.open(loc, '_blank');
		return false;
	});
}

function getEbayData(keywordList, enteries) {
	$.each(keywordList, function(index, val) {
		val = encodeURIComponent(val.trim());
		// console.log("Querying with keywords : " + val);
		var url = "http://svcs.ebay.com/services/search/FindingService/v1";
		url += "?OPERATION-NAME=findItemsByKeywords";
		url += "&SERVICE-VERSION=1.0.0";
		url += "&SECURITY-APPNAME=Individu-3628-4ccf-a6b5-3a96454ede1d";
		url += "&GLOBAL-ID=EBAY-IN";
		url += "&RESPONSE-DATA-FORMAT=JSON";
		url += "&callback=_cb_findItemsByKeywords";
		url += "&REST-PAYLOAD";
		url += "&keywords=" + val;
		url += "&outputSelector=GalleryInfo";
		url += "&paginationInput.entriesPerPage=" + enteries;


		script = document.createElement('script'); // create script element
		script.src = url;
		$('#scripts').append(script);
		$('#scripts').html('');
	});
}

function wishBirthday(id) {
	FB.ui({
		method: 'feed',
		to: id,
		link: 'https://apps.facebook.com/547881965266446/',
		caption: 'GiftKart',
		description: 'Never forget your friends birthday with us.'
	}, function(response) {
		if (!response || response.error) {
			// alert('Error occured');
			// console.log(response);
		} else {
			// alert('Post ID: ' + response.post_id);
			console.log(response.post_id);
		}
	});
}