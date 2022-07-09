﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="LogOutPage.aspx.cs" Inherits="NewApp.LogOutPage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Logout :: USG BORAL  </title>
    <link href="~/css/bootstrap.min.css" rel="stylesheet" />

    <!-- Custom CSS -->
    <link href="~/css/style.css" rel="stylesheet" />
    <!-- Nav CSS -->
    <link href="~/css/custom.css" rel="stylesheet" />
    <!-- Graph CSS -->
    <link href="~/css/lines.css" rel="stylesheet" />
    <link href="~/css/font-awesome.css" rel="stylesheet" />
    <!----webfonts--->
    <!-- jQuery -->
    <script src="~/js/jquery.min.js"></script>
    <link href='//fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900' rel='stylesheet' type='text/css' />
    <!---//webfonts--->
    <link href="css/StyleSheet.css" rel="stylesheet" />
    <link type="text/css" rel="stylesheet" href="~/css/style1.css" />
    <script src="../js/jquery.min.js"></script>
    <link href="~/Content/DefaultImage/DefaultImage.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <div id="wrapper" style="background-color: #009639;">
            <!-- Navigation -->
            <nav class="top1 navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: -20px; margin-top: -20px; height: 71px; background-color: white; padding: 10px 5px 20px 20px; top: 0px; left: 0px;">
                <div class="navbar-header" style="margin-top: -8px">
                    <a class="navbar-brand" href="https://www.usgboral.com/en_in/" target="_blank">
                         <img src="icons/USG Knauf Logo.jpg" width="190" height="50" />
                    </a>

                </div>
                <!-- /.navbar-header -->
                <div class="nav navbar-nav navbar-right" style="font-family: Verdana; font-size: large; font-weight: bold;">
                </div>
                <div class="navbar-default sidebar" role="navigation">
                </div>
                <!-- /.navbar-static-side -->
            </nav>
        </div>
        <div class="copy">
            <p style="border: 0px solid black;">
                <center>
                    <h3>Do you want to logout</h3>
                        <p>
                            <asp:Button ID="btnok" runat="server" Text="OK" Width="73px" CssClass="btn btn-xs btn-primary" OnClick="btnok_Click" Style="background-color:#02AEF2 !important; border-color:rgb(2,174,242) !important;" />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     <asp:Button ID="btncancel" runat="server" Text="CANCEL" CssClass="btn btn-xs btn-danger" OnClick="btncancel_Click" />
                        </p>
                        </center>
            </p>
            <div class="LogoutBackground">
            </div>
        </div>

    </form>
</body>
</html>
