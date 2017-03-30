function getStyle(element, attr) {
    var res = 0;
    if (element.currentStyle) {
        res = element.currentStyle[attr];
    } else {
        res = window.getComputedStyle(element, null)[attr];
    }
    return res;
}

function animateV(element, json, fn) {
    clearInterval(element.timer);
    element.timer = setInterval(function() {
        var flag = true;
        for (var key in json) {
            var target = json[key];
            if (key == "opacity") {
                var current = Number(getStyle(element, "opacity"));
                var step = (target - current) / 10 * 100;
                step = (target - current) > 0 ? Math.ceil(step) : Math.floor(step);
                current += step / 100;
                element.style.opacity = current;
            } else if (key == "zIndex") {
                element.style.zIndex = target;
                current = target;
            } else {
                var current = parseInt(getStyle(element, key)) || 0;
                var step = (target - current) / 10;
                step = (target - current) > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[key] = current + "px";
            }
            if (target != current) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(element.timer);
            (typeof fn == "function") && fn();
        }
    }, 20)
}
