(function () {
    window.addEventListener("load", function () {
        if (window.innerWidth < PHONEEDGE) {
            document.querySelector(".mbtLayer .mbt_left").ontouchstart = function () {
                player.isWalkingLeft = true;
                mbt_bottomIsTouched = true;
                return false;
            }
            document.querySelector(".mbtLayer .mbt_left").ontouchend = function () {
                player.isWalkingLeft = false;
                player.isWalking = false;
                mbt_bottomIsTouched = false;
                return false;
            }
    
            document.querySelector(".mbtLayer .mbt_right").ontouchstart = function () {
                player.isWalkingRight = true;
                mbt_bottomIsTouched = true;
                return false;
            }
            document.querySelector(".mbtLayer .mbt_right").ontouchend = function () {
                player.isWalkingRight = false;
                player.isWalking = false;
                mbt_bottomIsTouched = false;
                return false;
            }
    
            document.querySelector(".mbtLayer .mbt_top").ontouchstart = function () {
                player.isWalkingForward = true;
                mbt_bottomIsTouched = true;
                return false;
            }
            document.querySelector(".mbtLayer .mbt_top").ontouchend = function () {
                player.isWalkingForward = false;
                player.isWalking = false;
                mbt_bottomIsTouched = false;
                return false;
            }
    
            document.querySelector(".mbtLayer .mbt_bottom").ontouchstart = function () {
                player.isWalkingBackward = true;
                mbt_bottomIsTouched = true;
                return false;
            }
            document.querySelector(".mbtLayer .mbt_bottom").ontouchend = function () {
                player.isWalkingBackward = false;
                player.isWalking = false;
                mbt_bottomIsTouched = false;
                return false;
            }    
        } else {
            document.querySelector("body").removeChild(document.querySelector(".mbtLayer"));
        }
    });
})();
