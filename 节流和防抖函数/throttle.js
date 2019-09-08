const throttle = function (fn, wait, options = {}) {
    let timer, lastThis, lastArgs, result
    let previous = 0
    options = options
    function later() {
        previous = options.leading ? new Date().getTime() : 0
        timer = null
        result = fn.apply(lastThis, lastArgs)
        if (!timer) lastThis = lastArgs = null
        return result
    }
    function cancel() {
        clearTimeout(timer)
        timer = null
        previous = 0
    }
    function throttled() {
        let now = new Date().getTime()
        lastThis = this
        lastArgs = arguments
        let remaining = wait - (now - previous)
        if (remaining <= 0) {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
            result = fn.apply(lastThis, lastArgs)
            previous = now
            if (!timer) lastThis = lastArgs = null
            return result
        } else if (!timer && options.trailing) {
            timer = setTimeout(later, remaining)
        }
    }
    throttle.cancel = cancel
    return throttled
}