/**
 * Created by Grimbode on 17/04/2017.
 */

var cnlVideo;

var resize = function(){
    var width = cnlVideo.width();
    //560/315
    cnlVideo.css({height: (width*315)/560 + 'px' });
};

$(document.body).ready(function(){
    cnlVideo = $('#cnlVideo');
    resize();
    $(window).on('resize', resize);
});


