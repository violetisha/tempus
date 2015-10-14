// ========================
// Function: Equal heights
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

    // Equal height
    // -------------------
	$('.item-hacemos').equalHeights(0);

    // Navigation
    // -------------------
    $('#nav').onePageNav({
        currentClass: 'active',
        changeHash: true,
        scrollSpeed: 750
     });


    // Contact form
    // -------------------
    $("#send").click(function() { 
       
        var proceed = true;
        
        // Filed validation    
        $('input[required=true], textarea[required=true]').each(function(){
            $(this).css('border-color',''); 
            
            if(!$.trim($(this).val())){ 
                $(this).css('border-color','red');
                proceed = false;
            }
            
            var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
            if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
                $(this).css('border-color','red'); //change border color to red   
                proceed = false; //set do not proceed flag              
            }   
        });
       
        if(proceed) {
            
            post_data = {
                'user_name'     : $('input[name=nombre]').val(), 
                'user_email'    : $('input[name=email]').val(),
                'subject'       : $('select[name=asunto]').val(), 
                'msg'           : $('textarea[name=mensaje]').val()
            };
            
            // Ajax post data to server
            $.post('send.php', post_data, function(response){  
                if(response.type == 'error'){ //load json data from server and output message     
                    output = '<div class="error">'+response.text+'</div>';
                }else{
                    output = '<div class="success">'+response.text+'</div>';
                    //reset values in all input fields
                    $("input, textarea").val('');
                }
                $("#results").hide().html(output).slideDown();
            }, 'json');
        }
    });
    
    // Atempt to correct the required fields
    $("input[required=true], textarea[required=true]").keyup(function() { 
        $(this).css('border-color',''); 
    });

});
