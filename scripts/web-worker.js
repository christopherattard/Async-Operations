//For good reasons, Chrome doesn't let you load web workers when running scripts from a local file.
//To run your app from the file:// scheme, run Chrome with the --allow-file-access-from-files flag set. 
var worker = new Worker('scripts/myWork.js');
worker.onmessage = function (e) {
    $('#result').append(e.data + '<br />');
}
worker.onerror = function (e) {
    $('#result').append('Error: ' + e.data + '<br />');
}
    
$('document').ready(function () {
    $('#btnSend').on('click', function () {
        worker.postMessage($('#message').val());
    });
});