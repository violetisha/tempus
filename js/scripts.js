// ========================
// Equal heights
// ========================	
(function($) {
    $.fn.equalHeights = function(base_height) {
        var itemsbatch = this;
        if (base_height === 0) {
            base_height = Math.max.apply(null, this.map(function() {
                return $(this).height();
            }).get());
        }
        itemsbatch.height(base_height);
        itemsbatch.each(function() {
            var elemToResize = this;
            $(elemToResize).find('img').load(function() {
                if (elemToResize.height > base_height) {
                    itemsbatch.equalHeights(elemToResize.height);
                }
            });
        });
        return base_height;
    };
})(jQuery);




// ========================
// Loading functions
// ========================	
$(document).ready(function(){

    // Misma altura
	$('.item-hacemos').equalHeights(0);


    // Transición suave entre las secciones.
    $('nav a').click(function() {
        $("nav a").removeClass("active");
        $(this).addClass("active");

        var $link = $(this);
        var anchor = $link.attr('href');

        $('html, body').stop().animate({
            scrollTop : $(anchor).offset().top
        }, 1500, "easeInOutCubic");
    });

});
