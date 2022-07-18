$("#login_button").on('click', function (e) {
    e.preventDefault();
    let username = document.getElementById("username").value;
    if (username.length == 0) {
        $("#login_error").text("Write a username first!");
    }
    else if (username.length > 20) {
        $("#login_error").text("Your username is too long!");
    }
    var self = document.getElementById("login_button");
    $('#toggleText').slideUp('fast', function () {
        var _a;
        (_a = self.form) === null || _a === void 0 ? void 0 : _a.submit();
    });
});
export {};
