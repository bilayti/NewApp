using NewApp.Models;
using System;
using System.Web.Mvc;

namespace NewApp.Controllers
{
    public class AgreeController : Controller
    {
        //
        // GET: /Agree/
        static string username = (string)System.Web.HttpContext.Current.Session["_SAP_ID"];
        static string lastseen = (string)System.Web.HttpContext.Current.Session["LastLoginDateTime"];
        static string UserCode = (string)System.Web.HttpContext.Current.Session["USER_CODE"];
        public ActionResult Index()
        {
            Agree agree = new Agree();
            try
            {
                if (UserCode != null || username != "")
                {
                    agree.UserTypeId = Convert.ToInt32(Session["USER_TYPEID"]);
                }
                else
                {
                    return Redirect("~/Default.aspx");
                }
            }
            catch (Exception ex)
            {
                Response.Write(ex.Message);
            }
            return View(agree);
        }
    }
}
