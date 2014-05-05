var mapSrc = $("#map").attr('ng-src');
$(".print-code").html(mapSrc);

$( document ).ready(function() {

$("[data-toggle=popover]").popover({
  placement : 'right',
  trigger:'hover'
});

// Bootstrap Tooltips & Twitter not for mobile-ish
if ($(window).width() > 800) {
  $('[data-rel=tooltip]').tooltip({ trigger: "hover", placement:"bottom" });
  !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
}
});
