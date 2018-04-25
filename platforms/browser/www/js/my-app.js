// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add views
var view1 = myApp.addView('#view-1');
var view2 = myApp.addView('#view-2');

var username = "";
var password = "";
var usertype = "";
var userid = "";
var permissions = cordova.plugins.permissions;






function login() {
    document.getElementById("loginButton").innerHTML = "connecting..."
    document.getElementById("loginButton").classList.remove('button-fill');

    if (document.getElementById("username").value.toLowerCase() == '') {
        document.getElementById("statusLogIn").innerHTML = "Missing Credetials";
        document.getElementById("statusLogIn").style.color = "#cc0000";
        document.getElementById("loginButton").innerHTML = "login"
        document.getElementById("loginButton").classList.add('button-fill');


    } else {
        document.getElementById("statusLogIn").innerHTML = "";
        document.getElementById("statusLogIn").style.color = "gray";

        username = document.getElementById("username").value.toLowerCase();
        password = md5(document.getElementById("password").value + "salt");
        
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://kqrtags.000webhostapp.com/app/index.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send('username=' + username + '&password=' + password);

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                var auser = JSON.parse(this.response);
                userid = parseInt(auser.userid);
                usertype = String(auser.type);
                getdata();
            }
        };

        $.getJSON
    }

};



function getdata() {

    if (usertype == "admin") {

        console.log("you are connected");
        document.getElementById("loginButton").style.display = "none";
        document.getElementById("logoutButton").style.display = "inherit";
        document.getElementById("tabbarMenu").style.display = "inherit";
        document.getElementById("formLogin").style.display = "none";
        document.getElementById("profilePicMain").style.display = "inherit";
        document.getElementById("statusLogIn").innerHTML = "Welcome " + username;
        document.getElementById("statusLogIn").style.color = "gray";
        document.getElementById("loginButton").innerHTML = "login"
        document.getElementById("loginButton").classList.add('button-fill');

    } else if (usertype == "user") {

        console.log("you are connected");
        document.getElementById("loginButton").style.display = "none";
        document.getElementById("logoutButton").style.display = "inherit";
        document.getElementById("tabbarMenu").style.display = "inherit";
        document.getElementById("formLogin").style.display = "none";
        document.getElementById("profilePicMain").style.display = "inherit";
        document.getElementById("adminMenu").style.display = "none";
        document.getElementById("statusLogIn").innerHTML = "Welcome " + username;
        document.getElementById("statusLogIn").style.color = "gray";
        document.getElementById("loginButton").innerHTML = "login"
        document.getElementById("loginButton").classList.add('button-fill');

    } else {
        document.getElementById("statusLogIn").innerHTML = "Wrong Credetials";
        document.getElementById("statusLogIn").style.color = "#cc0000";
        document.getElementById("loginButton").innerHTML = "login"
        document.getElementById("loginButton").classList.add('button-fill');

    }
};


function logout() {
    username = "";
    password = "";
    usertype = "";
    userid = "";
    window.location.reload();
    document.getElementById("loginButton").style.display = "inherit";
    document.getElementById("logoutButton").style.display = "none";
    document.getElementById("profilePicMain").style.display = "none";
    document.getElementById("statusLogIn").style.color = inital;



};


function makeHttpObject() {
    try { return new XMLHttpRequest(); } catch (error) {}
    try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (error) {}
    try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch (error) {}

    throw new Error("Could not create HTTP request object.");
};


function getKeyNumber() {


    var keyName = encodeURIComponent(document.getElementById("keyName").value);
    var keyLocation = encodeURIComponent(document.getElementById("keyLocation").value);
    var keyDescription = encodeURIComponent(document.getElementById("keyDescription").value);
    if (keyName != "" && keyLocation != "") {
        document.getElementById("errorGenerator").innerHTML = "";
        document.getElementById("getKeyButton").innerHTML = "adding..."
        document.getElementById("getKeyButton").classList.remove('button-fill');

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://kqrtags.000webhostapp.com/app/index.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send('username=' + username + '&password=' + password + '&kname=' + keyName + '&klocation=' + keyLocation + '&kdescription=' + keyDescription);

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                var anumber = JSON.parse(this.response);
                var urlQrImage = "http://kqrtags.000webhostapp.com/app/kqrcodes/" + anumber.kid + ".JPEG";
                var imgSRC = "<p>KQR Tag number: " + anumber.kid + "</p><img src='" + urlQrImage + "' style='width:100%; border-radius: 1px;' > <div class='col'><a class='button button-fill convert-form-to-data' href='#' onclick=\"window.plugins.socialsharing.share(null, null, '" + urlQrImage + "', null)\">Print KQR Tag</a></div>";
                var newqrbutton = "<br><br><div class='col'><a class='button button convert-form-to-data' href='#' onclick=\"newQrCode()\">create new KQR code</a></div>";
                document.getElementById("qrCodeContainer").innerHTML = imgSRC + newqrbutton;
                document.getElementById("qrGeneratorContainer").style.display = "none";

            }
        };


    } else {
        document.getElementById("errorGenerator").innerHTML = "Key Name and Location are required!<br>";
    }


};

function newQrCode() {
    document.getElementById("keyName").value = "";
    document.getElementById("keyLocation").value = "";
    document.getElementById("keyDescription").value = "";
    document.getElementById("getKeyButton").innerHTML = "add key"
    document.getElementById("getKeyButton").classList.add('button-fill');
    document.getElementById("qrGeneratorContainer").style.display = "block";
    document.getElementById("qrCodeContainer").innerHTML = "";
}

function kqrReader() {
    cordova.plugins.barcodeScanner.scan(
        function(result) {
        
        if(/^\d+$/.test(result.text)){

            var xhr2 = new XMLHttpRequest();
            xhr2.open('POST', 'https://kqrtags.000webhostapp.com/app/index.php', true);
            xhr2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr2.send('username=' + username + '&password=' + password + '&kid=' + String(result.text));
            // xhr2.send('username=' + username + '&password=' + password + '&kid=' + String(result.text).replace(/[\n\r]/g, ''));

            xhr2.onreadystatechange = function() {
                if (xhr2.readyState == 4) {

                    var akey = JSON.parse(this.response);
                    alert("Key id : " + akey.id +
                        "\nKey Name : " + akey.name +
                        "\nKey Location : " + akey.location +
                        "\nKey Description : " + akey.description)
                }
            };
        } else{
            alert("Not KQR");
        }



        },
        function(error) {
            alert("Scanning failed: " + error);
        }, {
            preferFrontCamera: false, // iOS and Android
            showFlipCameraButton: false, // iOS and Android
            showTorchButton: true, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            saveHistory: false, // Android, save scan history (default false)
            prompt: "Place a kqrtag inside the scan area", // Android
            resultDisplayDuration: 1000, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
            orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations: true, // iOS
            disableSuccessBeep: true, // iOS and Android
        }
    );
}