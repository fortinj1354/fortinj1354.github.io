//Register redirection listener
browser.webRequest.onBeforeRequest.addListener(function(requestDetails) {
    return detectRedirect(requestDetails);
}, {
    urls : ["<all_urls>"],
    types: ["main_frame","sub_frame"]
}, ["blocking"]);


function detectRedirect(requestDetails) {
    var url = requestDetails.url;

    //If there is no URL, exit
    if (url == null) {
        return;
    }

    //Build pipe delimited filter list
    var filter = "(smile-redirected=1)"
               + "|(redirect=true)"
               + "|(redirect.html)"
               + "|(r.html)"
               + "|(f.html)"
               + "|(/gp/dmusic/cloudplayer)"
               + "|(/gp/photos)"
               + "|(/gp/wishlist)"
               + "|(/ap/)"
               + "|(aws.amazon.com)"
               + "|(read.amazon.com)"
               + "|(login.amazon.com)"
               + "|(payments.amazon.com)"
               + "|(amazon.com/clouddrive)"
               + "|(http://)";

    //Do not redirect URLs that match anything in the filter list
    if (url.match(filter) != null) {
        return;
    }

    return handleRedirect(url);
}

function handleRedirect(url) {
    var smileUrl = "https://smile.amazon.com";

    return {
        //Append the redirection URI to the smile base URL
        redirectUrl : smileUrl + buildRedirectUri(url)
    };
}

function buildRedirectUri(url) {
    //Get everything in the URL after the domain
    var amazonUrl = "www.amazon.com";
    var existingUri = url.split(amazonUrl)[1];

    //Prevents us from redirecting a URL that was already redirected, is in the filter list
    var smileRedirectedFlag = "smile-redirected=1";

    //Build regex to detect existing parameters
    var paramStartRegex = "\\?";
    var redirectUri = null;

    //Check if there are already URL parameters
    if (existingUri.match(paramStartRegex) != null) {
        //If there are, add "&" to mark a new parameter and then append already redirected flag
        redirectUri = existingUri + "&" + smileRedirectedFlag;
    } else {
        //If there aren't, add "?" to start parameters and then append already redirected flag
        redirectUri = existingUri + "?" + smileRedirectedFlag;
    }
    return redirectUri;
}
