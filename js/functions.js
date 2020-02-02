/*

Project: PersoCV - Personal CV/Portfolio HTML Template
Version: 1.0
Author : anamulhaquemohan

*/

;(function ($) {
    'use strict';

    // COMMON VARIABLE
    var $wn = $(window);

    $(function () {
        // SET BACKGROUND IMAGE
        $.fn.setBgImg = function () {
            return this.each(function () {
                var $t = $(this);

                $t.css('background-image', 'url(' + $t.data('bg-img') + ')').addClass('bg--img').removeAttr('data-bg-img');
            });
        };

        // ANIMATESCROLL
        $.fn.animteScroll = function () {
            var attr = window.location.hash;

            if ( attr.length > 0 ) {
                $(attr).animatescroll({
                    easing: 'easeInOutExpo',
                    scrollSpeed: 2000
                });
            }

            this.on('click', function (e) {
                var attr = $(this).data('scroll-to'),
                    offset = $(this).data('scroll-offset');

                offset = typeof offset === 'undefined' ? 0 : offset;

                if ( attr.length > 0 ) {
                    $(attr).animatescroll({
                        padding: offset,
                        easing: 'easeInOutExpo',
                        scrollSpeed: 2000
                    });
                }

                if ( history.pushState ) {
                    history.pushState(null, null, attr);
                }

                e.preventDefault();
            });

            return this;
        };

        // SET STICKY
        $.fn.setSticky = function () {
            return this.each(function () {
                var $t = $(this);

                $t.sticky({
                    zIndex: $t.data('stickyjs-zindex')
                });
            });
        };

        // SET MINIMUM HEIGHT
        $.fn.setMinHeight = function (ops) {
            ops = $.extend({
                getHeightFrom: this.data('set-min-height')
            }, ops);

            ops.curItem = this;

            ops.settingHeight = function () {
                ops.curItem.each(function () {
                    var $parent = $(this),
                        getHeight = $parent.find( ops.getHeightFrom ).outerHeight();

                    $parent.css('min-height', getHeight).removeAttr('data-set-min-height');
                });
            };

            ops.settingHeight();

            $wn.on('resize', ops.settingHeight());

            return this;
        };

        // SET SKILL CHART
        $.fn.setSkillChart = function () {
            var $t = $(this);

            if ( $t.length ) {
                $t.easyPieChart({
                    percent: 0,
                    scaleLength: 0,
                    trackColor: 'transparent',
                    lineWidth: '1',
                    size: '50',
                    animate: 2000,
                    onStep: function (form, to, value) {
                        $(this.el).children('span').text( Math.round(value) + '%' );
                    }
                });
                
                $t.waypoint(function(dir) {
                    var $t = $(this.element);

                    $t.data('easyPieChart').update( $t.data('percentage') );
                    
                    this.destroy();
                }, {offset: 'bottom-in-view'});
            }

            return this;
        };

        // SET PORTFOLIO MODAL MAX HEIGHT
        $.fn.setPortfolioModalMaxHeight = function (ops) {
            var _t = this;

            _t.on('shown.bs.modal', ops.selector, function () {
                var $t = $(this),
                    $tModalImg = $t.find( ops.getHeightForm ),
                    $tModalContent = $t.find( ops.setHeightTo );

                $tModalContent.css( 'max-height', $tModalImg.outerHeight() );
            });

            return this;
        };

        // SET PORTFOLIO FILTER DATA API
        $.fn.setPortfolioFilterDataAPI = function () {
            this.on('click', function () {
                var $t = $(this),
                    selector = '[data-filter~="' + $t.data('portfolio-filter') + '"]',
                    $portfolioItems = $('.portfolio--items');

                if ( $portfolioItems.length ) {
                    $portfolioItems.isotope({
                        filter: selector
                    })
                        .siblings('.portfolio--filter-menu')
                        .find('li[data-target="' + $t.data('portfolio-filter') + '"]')
                        .addClass('active').siblings('li').removeClass('active');
                }
            });

            return this;
        };
    });

    // SET FILTER MENU
    $.fn.setFilterMenu = function (ops) {
        return this.each(function () {
            var FILTER = {};

            FILTER.$itemsWrapper = $(this);

            FILTER.ops = $.extend({
                filterWrapper: FILTER.$itemsWrapper.data('filter-wrapper')
            }, ops);

            FILTER.$itemsWrapper.isotope();

            $(FILTER.ops.filterWrapper).on('click', 'li', function () {
                FILTER.$curMenuItem = $(this);

                FILTER.target = FILTER.$curMenuItem.data('target');
                FILTER.target = FILTER.target === '*' ? FILTER.target : '[data-filter~="'+ FILTER.target +'"]';
                
                FILTER.$itemsWrapper.isotope({
                    filter: FILTER.target
                });
                
                FILTER.$curMenuItem.addClass('active').siblings().removeClass('active');
            });
        });
    };
})(jQuery);
