/**
 * jTinder initialization
 */

function autoPlay() {
    var index = $('.video iframe').length -1;
    playNextVideo(index);
};

function stopAndAddTo(item, classname) {
	// set the status text
    stopVideo(item.index());
    var video = $('.video', item).html().replace('onload="autoPlay()"', '');
    var yht = '<div class="yhteystiedot"><button class="btn btn-primary" href="#">Go to website</button></div>';
    var some = '<img src="img/some2.png" class="some img-responsive"></img>';
    $('.' + classname +' ul').append('<li><h3>' + $('h2', item).html() + '</h3>' + $('.description', item).html() + video + yht + some + '</li>');
    if(item.index() === 0) {
    	endOfItems();
    }
    else {
    	playNextVideo(item.index() -1);
    }
}

$("#tinderslide").jTinder({
	// dislike callback
    onDislike: function (item) {
    	stopAndAddTo(item, "disliked");
    },
	// like callback
    onLike: function (item) {
    	stopAndAddTo(item, "liked");
    },
	animationRevertSpeed: 200,
	animationSpeed: 400,
	threshold: 1,
	likeSelector: '.like',
	dislikeSelector: '.dislike'
});

function stopVideo(idx) {
	var lastVid = $('.video')[idx];
	var iframe = $('iframe', lastVid)[0].contentWindow;
    iframe.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
}

function stopAllVideos() {
	var videos = $('.video');
	$.each(videos, function(index, video) {
		console.log(index);
		var iframe = $('iframe', video)[0].contentWindow;
    	iframe.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
	});
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
	$('.actions').hide();
	$('.end-of-content').show();
}

$('.show-likes').click(function(e) {
	stopAllVideos();
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
	stopAllVideos();
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
