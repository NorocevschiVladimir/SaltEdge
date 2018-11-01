$(document).ready(function() {

// Open navbarSide when button is clicked

    function openMenu() {
        $('#navbarSide').addClass('reveal');
        $('.overlay').show();
        $('.small-menu').addClass('is-active');
        $('body').addClass('modal-open');
        disableScroll();
    }
    function closeMenu() {
        enableScroll();
        $('body').removeClass('modal-open');
        $('#navbarSide').removeClass('reveal');
        $('.small-menu').removeClass('is-active');
        $('.overlay').hide();
    }
    $('#navbarSideButton').on('click', function() {
        openMenu();
    });
    // Close navbarSide when the outside of menu is clicked or clicked on link
    $('.overlay').on('click', function(){
        closeMenu();
    });

    $('.side-link').on('click', function () {
        closeMenu();
    });
    //Scroll to element with anchor

    var activeScroll = 0;
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .not('[href="#pills-home"]')
        .not('[href="#pills-profile"]')
        .click(function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                if (activeScroll === 0) {
                    disableScroll();
                    // Figure out element to scroll to
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    // Does a scroll target exist?
                    if (target.length) {
                        // Only prevent default if animation is actually gonna happen
                        event.preventDefault();
                        var mq = window.matchMedia("(max-width: 768px)");
                        if (mq.matches) {
                            var hnav = 60;
                        }
                        else {
                            var hnav = 82;
                        }
                        $('html, body').animate({
                            scrollTop: target.offset().top - hnav
                        }, 1500);
                        activeScroll++;
                        setTimeout(function () {
                            activeScroll--;
                            enableScroll();
                        }, 1500);
                    }
                }
            }
        });

    //Scroll to elemnt on mobile menu and close menu

    $('#dropdownMenuButton').on('click', function () {
        if (activeScroll === 0 && $(this).attr('aria-expanded') === 'false') {
            disableScroll();
            var mq = window.matchMedia("(max-width: 768px)");
            if (mq.matches) {
                var hnav = 63;
            }
            else {
                var hnav = 80;
            }
            setTimeout(function () {
                $('html, body').animate({
                    scrollTop: $("#ul-dropdown").offset().top - hnav
                }, 1500);
            }, 200);
            activeScroll ++;
            setTimeout(function () {
                activeScroll--;
                enableScroll();
            }, 1700);
        }
    });

    //All functions for disable Scroll

    var keys = {37: 1, 38: 1, 39: 1, 40: 1};

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    function disableScroll() {
        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll', preventDefault, false);
        window.onwheel = preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        window.ontouchmove  = preventDefault; // mobile
        document.onkeydown  = preventDefaultForScrollKeys;
    }

    function enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    }
    //changes - target for change images
    //device - target for change glow
    $('.feature').mouseenter(function () {
        let changes = $('#changes');
        let device = $('#device');
        let target = $(this).attr('data-id');
        changes.removeAttr('class');
        changes.addClass('image_inner' + target);
        device.removeAttr('class');
        device.addClass('device' + target);
    });
});
