var isKeyDown = {};
var isKeyDownAny = false;

document.addEventListener('keydown', function (e) {
    isKeyDown[event.code] = true;
    isKeyDownAny = true;
});

document.addEventListener('keyup', function (e) {
    isKeyDown[event.code] = false;
    isKeyDownAny = false;
});

window.addEventListener('blur', function () {
    isKeyDown = {};
    isKeyDownAny = false;
});
