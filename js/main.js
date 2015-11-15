/**
 * jTinder initialization
 */

$("#tinderslide").jTinder({
	// dislike callback
    onDislike: function (item) {
	    // set the status text
	    stopVideo($('.video', item));
	    var video = $('.video', item).html().replace("&amp;autoplay=1", "");
	    console.log(video);
        $('.disliked ul').append('<li><h3>' + $('h2', item).html() + '</h3>' + $('.description', item).html() + video + '</li>');
        if(item.index() === 0) {
        	endOfItems();
        }
        else {
        	playNextVideo(item.index() -1);
        }
    },
	// like callback
    onLike: function (item) {
	    // set the status text
	    stopVideo($('.video', item));
	    var video = $('.video', item).html().replace("&amp;autoplay=1", "");
	    console.log(video);
        $('.liked ul').append('<li><h3>' + $('h2', item).html() + '</h3>' + $('.description', item).html() + video + '</li>');
        if(item.index() === 0) {
        	endOfItems();
        }
        else {
        	playNextVideo(item.index() -1);
        }
    },
	animationRevertSpeed: 200,
	animationSpeed: 400,
	threshold: 1,
	likeSelector: '.like',
	dislikeSelector: '.dislike'
});

function stopVideo(videoDiv) {
	var iframe = $('iframe', videoDiv)[0].contentWindow;
    iframe.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
}

function playNextVideo(index) {
	console.log("Play next video from index: ", index);
	var videoDiv = $('.video')[index];
	var iframe = $('iframe', videoDiv)[0].contentWindow;
    iframe.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
}

/**
 * Set button action to trigger jTinder like & dislike.
 */
$('.actions .like, .actions .dislike').click(function(e){
	e.preventDefault();
	$("#tinderslide").jTinder($(this).attr('class'));
});

function checkIfNoLikes() {
	if (!$('.liked ul li').length) {
		$('.liked').html('<h3>No liked pitches</h3>');
	}
}

function checkIfNoDislikes() {
	if (!$('.disliked ul li').length) {
		$('.disliked').html('<h3>No disliked pitches</h3>');
	}
}

function endOfItems() {
	console.log("endOfItems");
	checkIfNoDislikes();
	checkIfNoLikes();
	$('.wrap').hide();
	$('.end-of-content').show();
}

$('.show-likes').click(function(e) {
	e.preventDefault();
	checkIfNoLikes();
	$('.end-of-content').hide();
	$('.disliked').hide();
	$('.wrap').hide();
	$('.actions').hide();
	$('.liked').show();
	$('.liked ul li').css('transform', '');
	$('.liked ul li').show();
})

$('.show-dislikes').click(function(e) {
	e.preventDefault();
	checkIfNoDislikes();
	$('.end-of-content').hide();
	$('.liked').hide();
	$('.wrap').hide();
	$('.actions').hide();
	$('.disliked').show();
	$('.disliked ul li').css('transform', '');
	$('.disliked ul li').show();
})