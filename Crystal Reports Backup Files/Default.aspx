<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="NewApp.Views.Login.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Home</title>
    <script type="application/x-javascript">
     addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } 
    </script>
    <%--<script type="text/javascript">
        function date_time(id) {
            date = new Date;
            year = date.getFullYear();
            month = date.getMonth();
            months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
            d = date.getDate();
            day = date.getDay();
            days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
            h = date.getHours();
            if (h < 10) {
                h = "0" + h;
            }
            m = date.getMinutes();
            if (m < 10) {
                m = "0" + m;
            }
            s = date.getSeconds();
            if (s < 10) {
                s = "0" + s;
            }
            result = '' + days[day] + ' ' + months[month] + ' ' + d + ' ' + year + ' ' + h + ':' + m + ':' + s + ' ' + 'IST';
            document.getElementById(id).innerHTML = result;
            setTimeout('date_time("' + id + '");', '1000');
            return true;
        }
    </script>--%>
    <style type="text/css">
        #date_time {
            margin-right: 10%;
            margin-top: 1%;
        }
    </style>
   
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
    <script src="js/jquery.min.js"></script>
    <link href='//fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900' rel='stylesheet' type='text/css' />
    <!---//webfonts--->
    <style type="text/css">
        .background {
            background: url('icons/interanet.png')no-repeat center fixed;
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

        <div id="wrapper" style="background-color: #009639;">
            <!-- Navigation -->
            <nav class="top1 navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: -20px; margin-top: -20px; height: 71px; background-color: white; padding: 10px 5px 20px 20px; top: 0px; left: 0px;">
                <div class="navbar-header" style="margin-top: -8px">
                    <a class="navbar-brand" href="https://www.usgboral.com/en_in/" target="_blank"><%--USG BORAL--%>
                        <img src="icons/rsz_usg_boral_logo.png" />
                    </a>

                </div>

                <!-- /.navbar-header -->
                <div class="nav navbar-nav navbar-right" style="font-family: Verdana; font-size: large; font-weight: bold;">
                    <ul class="nav navbar-nav navbar-right">
                        <li class="dropdown">
                        <asp:Button ID="btnLoginPage" runat="server" Style="margin-top:20px;border-radius:5px;" Text="LOGIN" CssClass="btn btn-xs btn-primary" OnClick="btnLoginPage_Click" /></li>
                    </ul>
                </div>
                <!-- /.navbar-static-side -->
            </nav>
            <br />
            <br />
            <div class="background">

            </div>
        </div>
    </form>
</body>
</html>
