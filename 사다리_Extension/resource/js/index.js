$(function() {
    function swing() {
        $('.floating-image').animate({'top':'5px'},600).animate({'top':'10px'},600, swing);
    }
    swing();
});
