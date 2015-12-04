var docWidth = 100;
var contentWidth = 100;
$(document).ready(function() {
    docWidth = $(window).width();
    contentWidth = $('#content').width();
    $(window).resize(onResize);
    onResize();
    $('.gameContainer').click(function(event) {
        var link = $(this).attr('href').slice(1);
        window.location.hash = link;
        event.preventDefault();
    });
    $('#hamburgerMenu').click(function() {
        clearTimeout(sidebarOverlayTO);
        $('#sidebar').toggleClass('open');
        $('#sidebarOverlay').toggleClass('open');
    });
    var sidebarOverlayTO;
    $('#sidebarOverlay').click(function() {
        $('#sidebar').removeClass('open');
        $('#sidebarOverlay').css({
            'opacity' : '0.0001'
        });
        sidebarOverlayTO = setTimeout(function() {
            $('#sidebarOverlay').css({'opacity' : ''});
            $('#sidebarOverlay').removeClass('open');
        }, 250);
    });


    $('.closeModal, .modalBGOverlay').click(function() {

    });

    var prevImage;
    var lastImage;
    var clonedImage;
    var lastOffset;
    var lastSize;
    var modalTO;
    $(window).on('hashchange',function(event){
        clearTimeout(modalTO);
        var hash = window.location.hash.slice(1);
        lastImage = $('#_' + hash).children('img');
        if(clonedImage) {
            $('#gameModalWindow').css({
                'transform' : ''
            });
            modalTO = setTimeout(function () {
                clonedImage.css({
                    'position' : 'fixed',
                    'transform' : 'translate('+(lastOffset.left) +'px, '+ (parseInt(lastOffset.top) - parseInt($(window).scrollTop())) +'px) scale(1,1)',
                    'transform-origin' : '0% 0%',
                    'transition' : 'transform 250ms',
                    'width' : lastSize.w,
                    'height' : 'auto',
                    'z-index' : '10',
                    'top' : '0px',
                    'left' : '0px'
                });
                setTimeout(function() {
                    prevImage.css({'opacity':1});
                    clonedImage.css({'opacity':0.001});
                    setTimeout(function () {
                        clonedImage.remove();
                        moveCoverImage(hash);
                    }, 200);
                }, 300);
            }, 250);
        }
        else moveCoverImage(hash);
        event.preventDefault();
    });



    function moveCoverImage(hash) {
        clearTimeout(modalTO);
        if(hash) {
            var topOffset = $('#gameModalWindow').offset().top - 10;
            prevImage = lastImage;
            clonedImage = lastImage.clone();
            lastOffset = lastImage.offset();
            lastSize = {
                w : lastImage.width(),
                h : lastImage.height()
            };
            clonedImage.css({
                'position' : 'fixed',
                'transform' : 'translate(' + (lastOffset.left) +'px, '+ (parseInt(lastOffset.top) - parseInt($(window).scrollTop())) +'px) scale(1,1)',
                'transform-origin' : '0% 0%',
                'transition' : 'transform 250ms',
                'width' : lastSize.w + 'px',
                'height' : 'auto',
                'z-index' : '10',
                'top' : '0px',
                'left' : '0px'
            });
            clonedImage.appendTo('#content');
            lastImage.css({'opacity' : 0.001});
            setTimeout(function () {
                //check for mobile
                clonedImage.css({
                    'transform' : 'translate(220px, 20px) scale(1.5, 1.5)',
                });
                modalTO = setTimeout(function () {
                    $('#imageModalPlaceholder').css({
                        width : prevImage.width()*1.5 + 'px',
                        height : prevImage.height()*1.5 + 'px'
                    });
                    $('#gameModalUpperText').css({
                        height : prevImage.height()*1.5 + 'px',
                        width : 'calc(100% - ' + ((prevImage.width()*1.5)+30) + 'px)',
                        'margin-left': '10px'
                    });
                    $('#gameModalWindow').css({
                        'transform' : 'translateY(-'+topOffset+'px)'
                    });
                }, 250);
            }, 50);
            $.get('/partials/' + hash, function(data, textStatus, xhr) {
                if($(document).width() > 736) {

                }
                else { // mobile

                }
            });
        }
        else {
            lastImage = undefined;
            clonedImage = undefined;
        }
    }
});



var resizeTO;
function onResize() {
    clearTimeout(resizeTO);
    resizeTO = setTimeout(function() {
        docWidth = $(window).width();
        contentWidth = $('#content').width();
        $('#sidebar').removeClass('open');
        $('#sidebarOverlay').removeClass('open');
        if(contentWidth > 1000) { // 5 games
            $('.gameContainer').each(function(i, e){
                var column = i % 5;
                var row = Math.floor(i / 5);
                $(e).css({
                    'transform' : 'translate('+((contentWidth * 0.2) * column)+'px, '+ (row * ((contentWidth * 0.18) * 1.5)) +'px)',
                    'width' : (contentWidth * 0.18).toString().split('.')[0] + 'px',
                    'height' : ((contentWidth * 0.18) * 1.5).toString().split('.')[0] + 'px',
                    'padding' : (contentWidth * 0.01).toString().split('.')[0] + 'px'
                });
            });
        }
        else if(contentWidth > 800 && contentWidth <= 1000) { // 4 games
            $('.gameContainer').each(function(i, e){
                var column = i % 4;
                var row = Math.floor(i / 4);
                $(e).css({
                    'transform' : 'translate('+((contentWidth * 0.25) * column)+'px, '+ (row * ((contentWidth * 0.23) * 1.5)) +'px)',
                    'width' : (contentWidth * 0.23).toString().split('.')[0] + 'px',
                    'height' : ((contentWidth * 0.23) * 1.5).toString().split('.')[0] + 'px',
                    'padding' : (contentWidth * 0.01).toString().split('.')[0] + 'px'
                });
            });
        }
        else if(contentWidth > 600 && contentWidth <= 800) { // 3 games
            $('.gameContainer').each(function(i, e){
                var column = i % 3;
                var row = Math.floor(i / 3);
                $(e).css({
                    'transform' : 'translate('+((contentWidth * 0.33) * column)+'px, '+ (row * ((contentWidth * 0.31) * 1.5)) +'px)',
                    'width' : (contentWidth * 0.31).toString().split('.')[0] + 'px',
                    'height' : ((contentWidth * 0.31) * 1.5).toString().split('.')[0] + 'px',
                    'padding' : (contentWidth * 0.01).toString().split('.')[0] + 'px'
                });
            });
        }
        else if(contentWidth > 400 && contentWidth <= 600) { // 2 games
            $('.gameContainer').each(function(i, e){
                var column = i % 2;
                var row = Math.floor(i / 2);
                $(e).css({
                    'transform' : 'translate('+((contentWidth * 0.5) * column)+'px, '+ (row * ((contentWidth * 0.48) * 1.5)) +'px)',
                    'width' : (contentWidth * 0.48).toString().split('.')[0] + 'px',
                    'height' : ((contentWidth * 0.48) * 1.5).toString().split('.')[0] + 'px',
                    'padding' : (contentWidth * 0.01).toString().split('.')[0] + 'px'
                });
            });
        }
        else { // 1 games
            $('.gameContainer').each(function(i, e){
                var column = i % 1;
                var row = Math.floor(i / 1);
                $(e).css({
                    'transform' : 'translate('+((contentWidth * 1) * column)+'px, '+ (row * ((contentWidth * 0.98) * 1.5)) +'px)',
                    'width' : (contentWidth * 0.98).toString().split('.')[0] + 'px',
                    'height' : ((contentWidth * 0.98) * 1.5).toString().split('.')[0] + 'px',
                    'padding' : (contentWidth * 0.01).toString().split('.')[0] + 'px'
                });
            });
        }
    },50);
}
