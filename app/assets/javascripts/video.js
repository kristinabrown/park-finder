
var tag = document.createElement('script');
tag.src = "http://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

 // 3. This function creates an <iframe> (and YouTube player)
 //    after the API code downloads.
var player;
function onYouTubePlayerAPIReady() {
 player = new YT.Player('player', {
   playerVars: { 'autoplay': 1, 'controls': 1,'autohide':1,'wmode':'opaque', 'end': 49, 'loop':1},
   videoId: '2Tx3wm8mN6g',
   events: {
     'onReady': onPlayerReady,
     'onStateChange': onPlayerStateChange}
 });
}


// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
 event.target.mute();
}

function onPlayerStateChange(e){
    var id = '2Tx3wm8mN6g';

    if(e.data === YT.PlayerState.ENDED){
        player.loadVideoById({'videoId': '2Tx3wm8mN6g',
                              'startSeconds': 63,
                              'endSeconds': 98});
    }
}

 //tWxgxIRCCqQ walking park
 
 //2Tx3wm8mN6g subaru commercial 
 