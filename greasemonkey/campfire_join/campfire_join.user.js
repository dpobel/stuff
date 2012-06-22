// ==UserScript==
// @name        campfire join
// @namespace   https://ezp.campfirenow.com/
// @description Automatically join a campfire chatroom
// @include     https://ezp.campfirenow.com/
// @version     1
// ==/UserScript==


var chatRoomId = 328128, // eZ Publish development
    alreadyJoined = !!document.getElementById('room_tab-' + chatRoomId);

if ( !alreadyJoined ) {
    document.location.href = "https://ezp.campfirenow.com/room/" + chatRoomId;
} else {
    //console.log('Already in');
}


