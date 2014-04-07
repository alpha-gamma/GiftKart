<%-- 
    Document   : index
    Created on : Nov 28, 2013, 12:43:18 AM
    Author     : crap
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
   	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
  	<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
  	<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css">
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:600' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Courgette' rel='stylesheet' type='text/css'>
  	<link rel="stylesheet" type="text/css" href="style.css" media="screen" />
   	<link rel="stylesheet" type="text/css" href="animate-custom.css" />  
	<script type="text/javascript" src="giftkart.js"></script>
    <title>GiftKart</title>
    <script>
        
    </script>
  </head>

  <body>
      <div id="scripts" style="display: none;"></div>
	<div id="welcomeScreen">
		<div id='but1' class="butt hidden">
			<div class="icon"></div>
			<div id="login"></div>
		</div >	
	</div>

	<div id="mainScreen" class="hidden">
		<div id="menuBar">
			<div id="title">GiftKart</div>
			<div id="userProfile">
				<div class="profilePic"></div>
				<div class="userName"></div>
			</div>
		</div>
		<div id="panels">
				<div id="leftPanel">
					<div id="today">
						<div class="head birthdayHead">
							<div class="headTitle">Today</div>
							<div class="arrow"></div>
						</div>
						<div class="details"></div>
					</div>
					<div id="upcoming">
						<div class="head birthdayHead">
							<div class="headTitle">This Month</div>
							<div class="arrow"></div>
						</div>
						<div class="details"></div>
					</div>
				</div>
				<div id="rightPanel">
					<div id="rightPanelHead">
						<div id="headLabel">Most Popular Gifts</div>
						<input id="searchBar" type="text"></input>
					</div>
                    <div id="rightPanelBody">
                        <div id="loading" class="hidden"></div>
                        <div id="recItems"> 	</div>
                    </div>
				</div>
		</div>
		<!-- <input type="text" id="friendssList"></input> -->
		<!-- <input type="button" Onclick="clickMe()" value="click me"></input> -->
		<!-- <div id='displayPic'></div>
		<div id="name"></div>
		<div id="friendsList"> -->
		</div>	
	</div>
	<!--<iframe src='http://www.flipkart.com/affiliate/displayWidget?affrid=WRID-138599362687549487' frameborder=0 height=600 width=160 style="position:fixed; right:0px; top:20px;"></iframe>-->
	<div id="fb-root"></div>

  </body>
</html>