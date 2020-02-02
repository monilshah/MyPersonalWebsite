/*

Project: PersoCV - Personal CV/Portfolio HTML Template
Version: 1.0
Author : anamulhaquemohan

*/

;(function ($) {
    'use strict';

    /*------------------------------------*\
        COMMON VARIABLES
    \*------------------------------------*/
    var $wn = $(window);

    $(function () {
        /*------------------------------------*\
            BACKGROUND IMAGE
        \*------------------------------------*/
        var $bgImage = $('[data-bg-img]');

        $bgImage.setBgImg();

        /*------------------------------------*\
            ANIMATESCROLL
        \*------------------------------------*/
        var $scrollTo = $('[data-scroll-to]');

        $scrollTo.animteScroll();

        /*------------------------------------*\
            STICKYJS
        \*------------------------------------*/
        var $stickyJS = $('[data-sticky="stickyjs"]');

        $stickyJS.setSticky();

        /*------------------------------------*\
            COUNTERUP
        \*------------------------------------*/
        var $couterUp = $('[data-counter-up="true"]');

        if ( $couterUp.length ) {
            $couterUp.counterUp({
                delay: 10,
                time: 2000
            });
        }

        /*------------------------------------*\
            PRETTY PHOTO
        \*------------------------------------*/
        var $popup = $('[data-popup="video"]');

        if ( $popup.length ) {
            $popup.magnificPopup({
                disableOn: 700,
                type: 'iframe',
                removalDelay: 160
            });
        }

        /*------------------------------------*\
            FORM VALIDATION
        \*------------------------------------*/
        var $formValidation = $('[data-form-validation] form'),
            formValidation,
            formAjax = function (el) {
                var $el = $(el),
                    formURL = $el.attr('action'),
                    formData = $el.serialize();

                if ( $el.parent().data('form-validation') === 'contactForm' ) {
                    $.post(formURL, formData, function(res) {
                        $el.parent().siblings('.contact--form-status').html(res).slideDown().delay(3000).slideUp();
                    });
                }
            };

        formValidation = $formValidation.validate({
            submitHandler: formAjax
        });

        /*------------------------------------*\
            BANNER AREA
        \*------------------------------------*/
        var $banner = $('.banner');

        $banner.setMinHeight();

        /*------------------------------------*\
            SKILL AREA
        \*------------------------------------*/
        var $skillChart = $('.skill--chart');

        $skillChart.setSkillChart();

        /*------------------------------------*\
            PORTFOLIO AREA
        \*------------------------------------*/
        var $portfolio = $('.portfolio'),
            $dataPortfolioFilter = $('[data-portfolio-filter]');

        $portfolio.setPortfolioModalMaxHeight({
            selector: '.portfolio--modal',
            getHeightForm: '.portfolio--modal-img',
            setHeightTo: '.portfolio--modal-content'
        });

        $dataPortfolioFilter.setPortfolioFilterDataAPI();

        /*------------------------------------*\
            CONTACT AREA
        \*------------------------------------*/
        var $contact = $('#contact'),
            $contactMap = $contact.find('#contactMap'),
            contactMap, contactMapData;

        if ( $contactMap.length && typeof google !== 'undefined' ) {
            contactMap = new google.maps.Map($contactMap[0], {
                center: {lat: $contactMap.data('map-latitude'), lng: $contactMap.data('map-longitude')},
                zoom: $contactMap.data('map-zoom'),
                scrollwheel: false,
                disabledDefaultUI: true,
                zoomControl: true
            });

            if ( typeof $contactMap.data('map-marker') !== 'undefined' ) {
                contactMapData = $contactMap.data('map-marker');

                for ( var i = 0; i < contactMapData.length; i++ ) {
                    new google.maps.Marker({
                        position: {lat: contactMapData[i][0], lng: contactMapData[i][1]},
                        map: contactMap,
                        animation: google.maps.Animation.DROP,
                        draggleable: true
                    });
                }
            }
        }
    });

    $wn.on('load', function () {
        /*------------------------------------*\
            FILTER MENU
        \*------------------------------------*/
        var $filterMenu = $('[data-set-filter-menu="true"]');

        $filterMenu.setFilterMenu();
    });
})(jQuery);
