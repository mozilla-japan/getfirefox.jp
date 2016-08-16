/* functions for the homepage */

g_eyeVioVideoCode = '<iframe src="http://eyevio.jp/embed.do?movieId=56122" style="margin: 0px; width: 400px; height: 345px;" frameborder="0" scrolling="no"></iframe>';

function launchVideoOverlay() {
	var videoOverlayDiv = $('videoOverlay');
	document.body.style.overflow = 'hidden';
	$('overlay').setStyle('display', 'block');
	$('overlayContentContainer').setStyle('display', 'block');
	$('videoOverlay').setStyle('display', 'block');
	videoOverlayDiv.innerHTML = g_eyeVioVideoCode;
}

function closeVideoOverlay() {
	var videoOverlayDiv = $('videoOverlay');
	$('overlay').setStyle('display', 'none');
	$('overlayContentContainer').setStyle('display', 'none');
	$('videoOverlay').setStyle('display', 'none');
	document.body.style.overflow = 'auto';
	videoOverlayDiv.innerHTML = '';
}

/*
MOOdalBox.open( // case matters

MOOdalBox.open("http://eyevio.jp/embed.do?movieId=56122", "getfirefox.jp - Video Awards", "500 400");
*/