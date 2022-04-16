$(function () {
    SearchText();
});
function SearchText() {
    $(".autosuggest").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "HomePage/GetAutoStudentData",
                data: "{'username':'" + document.getElementById('txtAdmissionId').value + "'}",
                dataType: "json",
                success: function (data) {
                    JSON.parse(JSON.stringify(data));
                    if (data.length > 0) {

                        response($.map(data, function (item) {
                            return {
                                label: item.split('/')[0],
                                val1: item.split('/')[1],
                                val2: item.split('/')[2],
                                val3: item.split('/')[3]
                            }
                        }));
                    }
                    else {
                        response([{ label: 'No Records Found', val: -1 }]);
                    }
                },
                error: function (xhr, status, error) {
                    //Printing error message
                    console.warn(xhr.responseText);
                }
            });
        },
        select: function (event, ui) {
            if (ui.item.val == -1) {
                return false;
            }
            else {
                if (ui.item.value != '') {
                    debugger;
                    document.getElementById('<%=lblStudentName.ClientID %>').value = ui.item.val1;
                    document.getElementById('<%=hdnStudentName.ClientID %>').value = ui.item.val1;
                    document.getElementById('<%=hfCustomerId.ClientID %>').value = ui.item.val2;
                    document.getElementById('<%=lblSAPID.ClientID %>').value = ui.item.val3;
                }
            }
        }
    });
}

//Password GIS
var hiddenFieldStr = '';

function ComputeHash() {

    //validate password for valid chars.
    var NewPassword = document.getElementById('<%= txtNewPassword.ClientID %>').value;
    var NewPasswordConfirm = document.getElementById('<%= txtNewPasswordConfirm.ClientID %>').value;
    var lblErrMsg2 = document.getElementById('<%= lblErrMsg.ClientID %>');
    var hfSalt = document.getElementById('<%= hfSalt.ClientID %>');

    if (ValidatePassword(NewPassword) == false) {
        //display error msg.
        lblErrMsg2.innerHTML = 'Password must contain at least one upper case letter, one special character, one numeric number, and length should be at least 8 characters!<br />';
        return false;
    }

    if (NewPassword != NewPasswordConfirm) {
        //display error msg.
        lblErrMsg2.innerHTML = 'Password and Confirm Password must match!<br />';
        return false;
    }

    shaObj = new jsSHA(NewPassword, "ASCII");
    var passwordHash = shaObj.getHash("SHA-256", "HEX");
    if (NewPassword.length > 0) {
        document.getElementById('<%= txtNewPassword.ClientID %>').value = passwordHash;
    }

    //compute confirm password salted hash
    shaObj = new jsSHA(NewPasswordConfirm, "ASCII");
    var confirmPasswordHash = shaObj.getHash("SHA-256", "HEX");
    shaObj = new jsSHA(hfSalt.value + confirmPasswordHash, "ASCII");
    var confirmPasswordSaltedHash = shaObj.getHash("SHA-256", "HEX");
    if (NewPasswordConfirm.length > 0) {
        document.getElementById('<%= txtNewPasswordConfirm.ClientID %>').value = confirmPasswordSaltedHash;
    }

    hfSalt.value = '';
    //submit form
    return true;
}
function ClearPwd() {


    document.getElementById('<%= txtNewPassword.ClientID %>').value = '';
    document.getElementById('<%= txtNewPasswordConfirm.ClientID %>').value = '';

    //submit form
    return true;
}