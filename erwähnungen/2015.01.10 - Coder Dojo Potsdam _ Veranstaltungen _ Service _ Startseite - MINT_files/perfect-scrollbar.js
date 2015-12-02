/*! perfect-scrollbar - v0.4.11
 * http://noraesae.github.com/perfect-scrollbar/
 * Copyright (c) 2014 Hyeonje Alex Jun; Licensed MIT */
(function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)})(function(e){"use strict";var t={wheelSpeed:10,wheelPropagation:!1,minScrollbarLength:null,maxScrollbarLength:null,useBothWheelAxes:!1,useKeyboard:!0,suppressScrollX:!1,suppressScrollY:!1,scrollXMarginOffset:0,scrollYMarginOffset:0,includePadding:!1},o=function(){var e=0;return function(){var t=e;return e+=1,".perfect-scrollbar-"+t}}();e.fn.perfectScrollbar=function(r,n){return this.each(function(){var l=e.extend(!0,{},t),s=e(this);if("object"==typeof r?e.extend(!0,l,r):n=r,"update"===n)return s.data("perfect-scrollbar-update")&&s.data("perfect-scrollbar-update")(),s;if("destroy"===n)return s.data("perfect-scrollbar-destroy")&&s.data("perfect-scrollbar-destroy")(),s;if(s.data("perfect-scrollbar"))return s.data("perfect-scrollbar");s.addClass("ps-container");var a,c,i,u,d,p,f,h,v,b,g=e("<div class='ps-scrollbar-x-rail'></div>").appendTo(s),m=e("<div class='ps-scrollbar-y-rail'></div>").appendTo(s),w=e("<div class='ps-scrollbar-x'></div>").appendTo(g),T=e("<div class='ps-scrollbar-y'></div>").appendTo(m),L=parseInt(g.css("bottom"),10),y=L===L,I=y?null:parseInt(g.css("top"),10),S=parseInt(m.css("right"),10),x=S===S,C=x?null:parseInt(m.css("left"),10),P="rtl"===s.css("direction"),D=o(),X=parseInt(g.css("borderLeftWidth"),10)+parseInt(g.css("borderRightWidth"),10),Y=parseInt(g.css("borderTopWidth"),10)+parseInt(g.css("borderBottomWidth"),10),k=function(e,t){var o=e+t,r=u-v;b=0>o?0:o>r?r:o;var n=parseInt(b*(p-u)/(u-v),10);s.scrollTop(n),y?g.css({bottom:L-n}):g.css({top:I+n})},M=function(e,t){var o=e+t,r=i-f;h=0>o?0:o>r?r:o;var n=parseInt(h*(d-i)/(i-f),10);s.scrollLeft(n),x?m.css({right:S-n}):m.css({left:C+n})},W=function(e){return l.minScrollbarLength&&(e=Math.max(e,l.minScrollbarLength)),l.maxScrollbarLength&&(e=Math.min(e,l.maxScrollbarLength)),e},j=function(){var e={width:i,display:a?"inherit":"none"};e.left=P?s.scrollLeft()+i-d:s.scrollLeft(),y?e.bottom=L-s.scrollTop():e.top=I+s.scrollTop(),g.css(e);var t={top:s.scrollTop(),height:u,display:c?"inherit":"none"};x?t.right=P?d-s.scrollLeft()-S-T.outerWidth():S-s.scrollLeft():t.left=P?s.scrollLeft()+2*i-d-C-T.outerWidth():C+s.scrollLeft(),m.css(t),w.css({left:h,width:f-X}),T.css({top:b,height:v-Y}),a?s.addClass("ps-active-x"):s.removeClass("ps-active-x"),c?s.addClass("ps-active-y"):s.removeClass("ps-active-y")},E=function(){i=l.includePadding?s.innerWidth():s.width(),u=l.includePadding?s.innerHeight():s.height(),d=s.prop("scrollWidth"),p=s.prop("scrollHeight"),!l.suppressScrollX&&d>i+l.scrollXMarginOffset?(a=!0,f=W(parseInt(i*i/d,10)),h=parseInt(s.scrollLeft()*(i-f)/(d-i),10)):(a=!1,f=0,h=0,s.scrollLeft(0)),!l.suppressScrollY&&p>u+l.scrollYMarginOffset?(c=!0,v=W(parseInt(u*u/p,10)),b=parseInt(s.scrollTop()*(u-v)/(p-u),10)):(c=!1,v=0,b=0,s.scrollTop(0)),b>=u-v&&(b=u-v),h>=i-f&&(h=i-f),j()},O=function(){var t,o;w.bind("mousedown"+D,function(e){o=e.pageX,t=w.position().left,g.addClass("in-scrolling"),e.stopPropagation(),e.preventDefault()}),e(document).bind("mousemove"+D,function(e){g.hasClass("in-scrolling")&&(M(t,e.pageX-o),e.stopPropagation(),e.preventDefault())}),e(document).bind("mouseup"+D,function(){g.hasClass("in-scrolling")&&g.removeClass("in-scrolling")}),t=o=null},q=function(){var t,o;T.bind("mousedown"+D,function(e){o=e.pageY,t=T.position().top,m.addClass("in-scrolling"),e.stopPropagation(),e.preventDefault()}),e(document).bind("mousemove"+D,function(e){m.hasClass("in-scrolling")&&(k(t,e.pageY-o),e.stopPropagation(),e.preventDefault())}),e(document).bind("mouseup"+D,function(){m.hasClass("in-scrolling")&&m.removeClass("in-scrolling")}),t=o=null},A=function(e,t){var o=s.scrollTop();if(0===e){if(!c)return!1;if(0===o&&t>0||o>=p-u&&0>t)return!l.wheelPropagation}var r=s.scrollLeft();if(0===t){if(!a)return!1;if(0===r&&0>e||r>=d-i&&e>0)return!l.wheelPropagation}return!0},B=function(){l.wheelSpeed/=10;var e=!1;s.bind("mousewheel"+D,function(t,o,r,n){var i=t.deltaX*t.deltaFactor||r,u=t.deltaY*t.deltaFactor||n;e=!1,l.useBothWheelAxes?c&&!a?(u?s.scrollTop(s.scrollTop()-u*l.wheelSpeed):s.scrollTop(s.scrollTop()+i*l.wheelSpeed),e=!0):a&&!c&&(i?s.scrollLeft(s.scrollLeft()+i*l.wheelSpeed):s.scrollLeft(s.scrollLeft()-u*l.wheelSpeed),e=!0):(s.scrollTop(s.scrollTop()-u*l.wheelSpeed),s.scrollLeft(s.scrollLeft()+i*l.wheelSpeed)),E(),e=e||A(i,u),e&&(t.stopPropagation(),t.preventDefault())}),s.bind("MozMousePixelScroll"+D,function(t){e&&t.preventDefault()})},F=function(){var t=!1;s.bind("mouseenter"+D,function(){t=!0}),s.bind("mouseleave"+D,function(){t=!1});var o=!1;e(document).bind("keydown"+D,function(r){if(!(r.isDefaultPrevented&&r.isDefaultPrevented()||!t||e(document.activeElement).is(":input,[contenteditable]"))){var n=0,l=0;switch(r.which){case 37:n=-30;break;case 38:l=30;break;case 39:n=30;break;case 40:l=-30;break;case 33:l=90;break;case 32:case 34:l=-90;break;case 35:l=-u;break;case 36:l=u;break;default:return}s.scrollTop(s.scrollTop()-l),s.scrollLeft(s.scrollLeft()+n),o=A(n,l),o&&r.preventDefault()}})},H=function(){var e=function(e){e.stopPropagation()};T.bind("click"+D,e),m.bind("click"+D,function(e){var t=parseInt(v/2,10),o=e.pageY-m.offset().top-t,r=u-v,n=o/r;0>n?n=0:n>1&&(n=1),s.scrollTop((p-u)*n)}),w.bind("click"+D,e),g.bind("click"+D,function(e){var t=parseInt(f/2,10),o=e.pageX-g.offset().left-t,r=i-f,n=o/r;0>n?n=0:n>1&&(n=1),s.scrollLeft((d-i)*n)})},K=function(){var t=function(e,t){s.scrollTop(s.scrollTop()-t),s.scrollLeft(s.scrollLeft()-e),E()},o={},r=0,n={},l=null,a=!1;e(window).bind("touchstart"+D,function(){a=!0}),e(window).bind("touchend"+D,function(){a=!1}),s.bind("touchstart"+D,function(e){var t=e.originalEvent.targetTouches[0];o.pageX=t.pageX,o.pageY=t.pageY,r=(new Date).getTime(),null!==l&&clearInterval(l),e.stopPropagation()}),s.bind("touchmove"+D,function(e){if(!a&&1===e.originalEvent.targetTouches.length){var l=e.originalEvent.targetTouches[0],s={};s.pageX=l.pageX,s.pageY=l.pageY;var c=s.pageX-o.pageX,i=s.pageY-o.pageY;t(c,i),o=s;var u=(new Date).getTime(),d=u-r;d>0&&(n.x=c/d,n.y=i/d,r=u),e.preventDefault()}}),s.bind("touchend"+D,function(){clearInterval(l),l=setInterval(function(){return.01>Math.abs(n.x)&&.01>Math.abs(n.y)?(clearInterval(l),void 0):(t(30*n.x,30*n.y),n.x*=.8,n.y*=.8,void 0)},10)})},z=function(){s.bind("scroll"+D,function(){E()})},Q=function(){s.unbind(D),e(window).unbind(D),e(document).unbind(D),s.data("perfect-scrollbar",null),s.data("perfect-scrollbar-update",null),s.data("perfect-scrollbar-destroy",null),w.remove(),T.remove(),g.remove(),m.remove(),g=m=w=T=a=c=i=u=d=p=f=h=L=y=I=v=b=S=x=C=P=D=null},R=function(t){s.addClass("ie").addClass("ie"+t);var o=function(){var t=function(){e(this).addClass("hover")},o=function(){e(this).removeClass("hover")};s.bind("mouseenter"+D,t).bind("mouseleave"+D,o),g.bind("mouseenter"+D,t).bind("mouseleave"+D,o),m.bind("mouseenter"+D,t).bind("mouseleave"+D,o),w.bind("mouseenter"+D,t).bind("mouseleave"+D,o),T.bind("mouseenter"+D,t).bind("mouseleave"+D,o)},r=function(){j=function(){var e={left:h+s.scrollLeft(),width:f};y?e.bottom=L:e.top=I,w.css(e);var t={top:b+s.scrollTop(),height:v};x?t.right=S:t.left=C,T.css(t),w.hide().show(),T.hide().show()}};6===t&&(o(),r())},G="ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch,J=function(){var e=navigator.userAgent.toLowerCase().match(/(msie) ([\w.]+)/);e&&"msie"===e[1]&&R(parseInt(e[2],10)),E(),z(),O(),q(),H(),G&&K(),s.mousewheel&&B(),l.useKeyboard&&F(),s.data("perfect-scrollbar",s),s.data("perfect-scrollbar-update",E),s.data("perfect-scrollbar-destroy",Q)};return J(),s})}});
