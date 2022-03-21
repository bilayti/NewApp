<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="LoginPage.aspx.cs" Inherits="NewApp.LoginPage" %>

<%@ Register Src="~/Captcha/WebUserControl1.ascx" TagName="Captcha" TagPrefix="uc1" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Login :: USG BORAL</title>
    <link type="text/css" rel="stylesheet" href="~/css/style1.css" />
    <style type="text/css">
        .Required111 {
            border-left: 5px solid red;
        }
    </style>
    <style type="text/css">
        #btnLogin {
            background-color: #56575b;
            font-weight: bold;
            color: white;
        }
    </style>
    <style type="text/css">
        .background {
            background: url('icons/interanet.png')no-repeat center center fixed;
            width: 100%;
            height: 100%;
            padding: 1px 1px 1px 100px;
            position: fixed;
            z-index: -1;
            min-height: 100%;
            min-width: 100%;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div class="background">
            <div class="login-wrap">
                <img src="../../icons/Picture1.jpg" width="100%" height="50px" style="position: relative;" />
                <div class="login-html">
                    <center>
                <label class="tab" style="color:white;">USG BORAL<span style="font-family:'Buxton Sketch';font-size:23px;"> ONLINE !</span></label></center>
                    <div class="login-form">
                        <div class="sign-in-htm">
                            <div class="group">
                                <%--<label>User Name <span style="color: Red;">*</span></label>--%>
                                <asp:TextBox ID="txtLoginId" class="input" placeholder="Enter User Name" runat="server" MaxLength="30" AutoCompleteType="None" EnableViewState="false" autocomplete="off" TabIndex="1"></asp:TextBox>
                                <asp:RequiredFieldValidator ID="RegularExpressionValidator2" runat="server" CssClass="error-mes"
                                    ControlToValidate="txtLoginId" Display="Dynamic" ForeColor="Red" ErrorMessage="Required!" ValidationGroup="UserManagement">
                                </asp:RequiredFieldValidator>
                                <asp:RegularExpressionValidator ID="revLoginId" runat="server" ControlToValidate="txtLoginId"
                                    Display="Dynamic" EnableViewState="false" ErrorMessage="LoginID must start with an aplha and must be between 6-30 characters long!"
                                    SetFocusOnError="true" Text="*" ValidationExpression="[a-zA-Z]+[a-zA-Z0-9]{1,30}"
                                    ValidationGroup="UserManagement"></asp:RegularExpressionValidator>

                            </div>
                            <div class="group">
                                <%--<label>Password <span style="color: Red;">*</span></label>--%>
                                <asp:TextBox ID="txtPassword" class="input" placeholder="Enter Password" TextMode="Password" runat="server" AutoCompleteType="None" TabIndex="2" EnableViewState="false"></asp:TextBox>
                                <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" CssClass="error-mes"
                                    ControlToValidate="txtPassword" ForeColor="Red" Display="Dynamic" ErrorMessage="Required!" ValidationGroup="UserManagement">
                                </asp:RequiredFieldValidator>
                                <asp:RegularExpressionValidator ID="revPassword" runat="server" ControlToValidate="txtPassword"
                                    Display="Dynamic" EnableViewState="false" ErrorMessage="Password should contain only a-z, A-Z, 0-9, ^, $, #, @  characters only and must be between 8-30 characters long!"
                                    SetFocusOnError="true" ValidationExpression="^[a-zA-Z0-9\@\#\$]+?$" ValidationGroup="UserManagement"></asp:RegularExpressionValidator>
                                <asp:HiddenField ID="hfSalt" runat="server" />

                            </div>

                            <uc1:Captcha ID="Captcha1" runat="server" Visible="True" ValidationGroup="UserManagement"
                                CaseSensitiveCode="True" />
                            <div class="group">
                                <asp:Label ID="lblerr" CssClass="error-mes" runat="server"></asp:Label>
                            </div>
                            <div class="group">
                                <asp:Button ID="btnLogin" class="button" Text="Login" runat="server" TabIndex="5"
                                    ValidationGroup="UserManagement"
                                    OnClick="btnLogin_Click" OnClientClick="ComputeHash();" />
                                <asp:Button ID="btnReset" runat="server" Text="Reset" class="button"
                                    ValidationGroup="UserManagement" TabIndex="6" EnableViewState="false"
                                    OnClientClick="return ClearPwd();" OnClick="btnReset_Click" />
                            </div>

                            <%--<div class="group" style="color: white; display: none;">
                                <a href="#forgot">Forgot Password?</a>
                            </div>--%>
                        </div>


                    </div>
                    <%--<div style="width: 100%; color: white;">

                        <h4 style="font-size: 12px;">GENERAL INSTRUCTIONS:</h4>
                        <ol style="color: white; font-size: 12px;">
                            <li>Please keep your LoginId & Password in a safe place.</li>
                            <li>Do not try to attempt more than 5 invalid login attempts, otherwise the account
                will be locked.</li>
                            <li>In case your account gets locked then contact deepak.tyagi[at]usgboral[dot]com</li>

                        </ol>

                    </div>--%>
                </div>

            </div>
            <script src="js/jquery.min.js"></script>
            <script type="text/javascript" src="js/dfs.gis.js"></script>
            <script type="text/javascript">
                function ComputeHash() {
                    var txtLoginId = document.getElementById('<%= txtLoginId.ClientID %>');
                var txtPassword = document.getElementById('<%= txtPassword.ClientID %>');
                var hfSalt = document.getElementById('<%= hfSalt.ClientID %>');
                if (txtLoginId.value != '') {
                    txtPassword.value = Sha256(hfSalt.value + Sha256(txtPassword.value));
                    hfSalt.value = '';
                }

            }

            function ClearPwd() {
                document.getElementById('<%= txtLoginId.ClientID %>').value = '';
                document.getElementById('<%= txtPassword.ClientID %>').value = '';
                document.getElementById('<%= hfSalt.ClientID %>').value = '';
                return;
            }
            </script>
    </form>
</body>
</html>
