export function NavScroll() {
    $(document).ready(function() {

        $(window).scroll(function() {

            var scrollTop = $(window).scrollTop();
    
            if (scrollTop >= 20) {
                $('.Navbar').addClass('solid-nav');
            } else {
                $('.Navbar').removeClass('solid-nav');
            }
    
        });
    });
}
