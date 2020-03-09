(() => {

    // Store form fields
    window.onbeforeunload = function() {
        localStorage.setItem("originalURL", $('#originalURL').val());
        localStorage.setItem("baseURL", $('#baseURL').val());
        localStorage.setItem("URLCode", $('#URLCode').val());
    }

})();

window.onload = function() {
    
    // Load stored form fields
    var originalURL = localStorage.getItem("originalURL");
    if (originalURL !== null) $('#originalURL').val(originalURL);
    var baseURL = localStorage.getItem("baseURL");
    if (baseURL !== null) $('#baseURL').val(baseURL);
    var URLCode = localStorage.getItem("URLCode");
    if (URLCode !== null) $('#URLCode').val(URLCode);

    // Set warning tags
    function setWarnings() {

        const warning = '<span class="glyphicon glyphicon-warning-sign form-control-feedback"></span>';
        
        if(duplicate == 'URL Code') {
            $('#URLCodeCont').addClass(' has-warning');
            $(warning).insertAfter("#URLCode");
        } else if(duplicate == 'Original URL') {
            $('#originalURLCont').addClass(' has-warning');
            $(warning).insertAfter("#originalURL");
        } else if(duplicate == 'Base URL') {
            $('#baseURLCont').addClass(' has-warning');
            $(warning).insertAfter("#baseURL");
        }

    }

    // Set error tags
    function setError() {

        const error = '<span class="glyphicon glyphicon-remove form-control-feedback"></span>';
        
        if(errorvar == "Invalid Base URL") {
            $('#baseURLCont').addClass(' has-error');
            $(error).insertAfter("#baseURL");
        } else if(errorvar == "Invalid Original URL") {
            $('#originalURLCont').addClass(' has-error');
            $(error).insertAfter("#originalURL");
        }

    }

    // Set success tags
    function setSuccess() {

        let originalURL = $('#originalURL').val(),
            baseURL = $('#baseURL').val(),
            URLCode = $('#URLCode').val();
        
        if(originalURL && baseURL && URLCode && !duplicate && !errorvar) {
            const success = '<span class="glyphicon glyphicon-ok form-control-feedback"></span>';
            
            $('#URLCodeCont').addClass(' has-success');
            $(success).insertAfter("#URLCode");
            
            $('#originalURLCont').addClass(' has-success');
            $(success).insertAfter("#originalURL");
            
            $('#baseURLCont').addClass(' has-success');
            $(success).insertAfter("#baseURL");
        }

    }    

    // Call functions
    setWarnings();
    setError();
    setSuccess();
}