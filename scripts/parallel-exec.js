$(document).ready(function () {
    runAbcAsync();
});

function abcAsync() {
    var deferred = $.Deferred();
    var count = 0;
    var firstPromise = timeoutAsync(2000);
    var secondPromise = timeoutAsync(3000);    
    var thirdPromise = timeoutAsync(1000);
    var fourthPromise = timeoutAsync(1234);
    firstPromise.always(function () { deferred.notify(++count); });
    secondPromise.always(function () { deferred.notify(++count); });    
    thirdPromise.always(function () { deferred.notify(++count); });    
    fourthPromise.always(function () { deferred.notify(++count); });
    $.when(firstPromise, secondPromise, thirdPromise, fourthPromise)
    .then(function () { alert('done!'); deferred.resolve(); },
    function () { deferred.reject(); }
    );
    return deferred.promise();
}

/* includeThird = true => takes 3000ms to set to resolve() state
   includeThird = false => takes 6000ms to set to resolve() state */
function abcAsync_conditional(includeThird) {
    var deferred = $.Deferred();
    var firstPromise = timeoutAsync(2000);
    var secondPromise = timeoutAsync(3000);
    /* $.when() without params returns a resolved promise object */
    var thirdPromise = includeThird ? timeoutAsync(6000) : $.when();
    var fourthPromise = timeoutAsync(1234);
    $.when(firstPromise, secondPromise, thirdPromise, fourthPromise)
    .then(function () { alert('done!'); deferred.resolve(); },
    function () { deferred.reject(); });
    return deferred.promise();
}

function runAbcAsync() {    
    //var promise = abcAsync();
    var promise = abcAsync_conditional(false);
    promise.progress(function (msg) { alert(msg); });
    promise.done(function() { alert('All Done!');})
    return promise;
}

function timeoutAsync(milliseconds) {
    var deferred = $.Deferred();
    setTimeout(function () { deferred.resolve(); }, milliseconds);
    return deferred.promise();
}