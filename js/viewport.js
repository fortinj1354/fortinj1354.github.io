window.onload = function () {
    if (window.innerWidth < 500) {
        var svp = document.getElementById('siteViewport');
        svp.setAttribute('content', 'width=500');
    }
};
