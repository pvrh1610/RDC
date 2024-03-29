function renderRDCApplication(userName,password,loginURL) {

    /*var userNameClientId = "it1::content";
    var passwordClientId = "it2::content";

    var loginURLClientId = "it3::content";
    var userFieldIdClientId = "it4::content";
    var passwordFieldIdClientId = "it5::content";
    var submitIdClientId = "it6::content";*/

    var iframeContainerId = "iframePg";
    var currentFormRootElemId = "studyReg";
    var loadingStatusElemId = "loading";

    /*var userName = document.getElementById(userNameClientId).value;
    var password = document.getElementById(passwordClientId).value;    
    var loginURL = document.getElementById(loginURLClientId).value;
    var userFieldId = document.getElementById(userFieldIdClientId).value;
    var passwordFieldId = document.getElementById(passwordFieldIdClientId).value;
    var submitId = document.getElementById(submitIdClientId).value;*/

    var userFieldId = "user::content";
    var passwordFieldId = "password::content";
    var submitId = "login";

    var iframeContainerElem = document.getElementById(iframeContainerId);
    var currentFormRootElem = document.getElementById(currentFormRootElemId);
    var loadingStatusElem = document.getElementById(loadingStatusElemId);

    var iframe = document.createElement("iframe");
    iframe.name = "myTarget";
    iframe.id = "myTarget";
    iframe.src = loginURL;
    iframe.style.display = "none";
    iframe.frameBorder = 0;
    iframeContainerElem.appendChild(iframe);

    var windowResizeListener = function () {
        iframe.style.height = (window.innerHeight - 4) + "px";
        iframe.style.width = (window.innerWidth - 4) + "px";
    };

    windowResizeListener();

    var iframeDisplayAfterLogin = function () {
        iframe.style.display = "";
        loadingStatusElem.style.display = 'none';
    };

    var iframeLoadListener = function () {
        var iframeDoc = (iframe.contentWindow || iframe.contentDocument);
        if (iframeDoc.document) {
            iframeDoc = iframeDoc.document;
        }

        var userElem = iframeDoc.getElementById(userFieldId);
        if (userElem) {
            userElem.setAttribute("value", userName);

            var passwordElem = iframeDoc.getElementById(passwordFieldId);
            passwordElem.setAttribute("value", password);

            var submitElem = iframeDoc.getElementById(submitId);
            submitElem.click();

            iframe.removeEventListener("load", iframeLoadListener);

            setTimeout(iframeDisplayAfterLogin, 5000);
        }
        else {
            iframe.removeEventListener("load", iframeLoadListener);

            setTimeout(iframeDisplayAfterLogin, 1000);
        }
    };

    window.addEventListener("resize", windowResizeListener);
    iframe.addEventListener("load", iframeLoadListener);

    currentFormRootElem.style.display = 'none';
    loadingStatusElem.style.display = '';

    // actionEvent.cancel();
}

function checkIECompatibility(event) {
    var b = navigator.userAgent.toLowerCase(), d;
    if (b.indexOf("msie") !=  - 1) {
        var ieDocMode = document.documentMode;
        if (Math.abs(ieDocMode) == 7) {
            var popupid = "iecompopup";
            var popup = AdfPage.PAGE.findComponent(popupid);
            popup.show();
        }
    }
}

function clearFormFields(event) {
    document.getElementById("pt1:it1::content").value = "";
    document.getElementById("pt1:it2::content").value = "";
}