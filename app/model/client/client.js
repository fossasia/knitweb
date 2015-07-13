var isAuthenticated = false;

function authenticate() {

    $.ajax({
        url: 'http://127.0.0.1:8000/',
        type: 'POST',
        data: 'user_name=test_user&password=test123',
        success: function () {
            isAuthenticated = true;
            alert('authentication completed');
        },
        error: function () {
            isAuthenticated = false;
            alert('authentication failed')
        }
    });
}



