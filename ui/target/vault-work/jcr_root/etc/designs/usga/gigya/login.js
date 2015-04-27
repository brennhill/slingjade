function getUserInfo() {
    UA.gigya.socialize.getUserInfo({
        callback: function (response) {
            if (response.errorCode == 0 && response.user && response.user.isConnected) {
                response.user.uidSignature = response.user.UIDSignature;
                response.user.uid = response.user.UID;

                showData(response.user);
            } else {
                UA.log(response);
                alert('User is not signed in.');
            }
        }
    });

}

window.onload = function () {
    UA.init(
        {
            eventHandler: usgaEventHandler,
            gigyaApiKey: '3_2XjOryTsvLPQvhvmmwB8TY-OB_6VT05LD5NVNZjYl1TTvIhq_2kEmKcC9MG1LbVw',
            urls: {
                'visitClubhouse': 'http://integration-usgamc.mngd.org/',
                'renew': 'http://integration-usgamc.mngd.org/members-renew',
                'connectYourMemberId': 'http://account.usga.org/ConnectYourMemberID.aspx'
            }
        }
    );

};

function usgaEventHandler(event, data) {
    //alert(event);

    UA.log(event);

    switch (event) {
        case 'login-successful':
            UA.log(data);
            showData(data);
            break;

        case 'register-successful':
            UA.log(data);
            showData(data);
            break;

        case 'renew':
            UA.log(data);
            showData(data);
            break;

        case 'logout':
            cleanData();
            break;

        case 'close-popup':
            break;

        case 'join-USGA':
            window.location = 'http://integration-usgamc.mngd.org/members-join';
            break;

        case 'gigya-loaded':
            console.log('gigya-loaded');
            break;
    }
}

function showData(data) {
    document.getElementById("data").innerHTML = "<li>UID=" + data.uid + "<li>UIDSignature=" + data.uidSignature + "<li>SignatureTimestamp=" + data.signatureTimestamp +
        "<li>Email=" + data.email + "<li>FirstName=" + data.firstName + "<li>LastName=" + data.lastName;
}

function cleanData() {
    document.getElementById("data").innerHTML = "";
}