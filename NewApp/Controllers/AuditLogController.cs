using NewApp.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Mvc;

namespace NewApp.Controllers
{
    public class AuditLogController : BaseController
    {
        //
        // GET: /AuditLog/
        #region Local variable declaration
        SqlConnection _Con;
        string username = string.Empty;
        string lastseen = string.Empty;
        string UserCode = string.Empty;
        int usertype = 0;
        public List<CardCodeBind> _CustomerList = new List<CardCodeBind>();
        #endregion
        string _sExcelPath = ConfigurationManager.AppSettings["ExcelPath"];
        string dtCurrentDate = System.DateTime.Now.ToString("yyyyMMddHHmmss");
        public List<Auditlog> _UserList = new List<Auditlog>();

        #region Connection Methodm
        public void connection()
        {
            string constr = ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();
            _Con = new SqlConnection(constr);
        }
        #endregion
        public AuditLogController()
        {
            username = (string)System.Web.HttpContext.Current.Session["_SAP_ID"];
            lastseen = (string)System.Web.HttpContext.Current.Session["LastLoginDateTime"];
            UserCode = (string)System.Web.HttpContext.Current.Session["USER_CODE"];
            usertype = (Int32)System.Web.HttpContext.Current.Session["USER_TYPEID"];
        }
        public ActionResult Index()
        {
            try
            {
                if (UserCode == null || username == "")
                {
                    return Redirect("~/Default.aspx");
                }
                else
                {
                    int time = DateTime.Now.Hour;
                    if (time > 24)
                    {
                        time = 24;
                    }
                    if (time < 12)
                    {
                        ViewBag.UserName = "Good Morning : " + Session["F_NAME"].ToString();
                    }
                    else if (time < 17)
                    {
                        ViewBag.UserName = "Good Afternoon : " + Session["F_NAME"].ToString();
                    }
                    else
                    {
                        ViewBag.UserName = "Good Evening : " + Session["F_NAME"].ToString();
                    }
                    ViewBag.lastseen = "Last Login:" + Session["LastLoginDateTime"].ToString();
                }
            }
            catch (Exception ex)
            {
                Response.Write(ex.Message);
            }
            return View();
         
        }
        #region GET USER DETAILS
        [HttpPost]
        public JsonResult GetAuditLoginDetails(string sLoginId, string sFromDate, string sToDate)
        {
            try
            {
                DataSet _DS = new DataSet();
                _UserList.Clear();
                _DS = new DataSet();
                List<Parameters> lstparameters = new List<Parameters>();
                lstparameters.Add(new Parameters("@LoginId", sLoginId.ToString()));
                lstparameters.Add(new Parameters("@fromDate", sFromDate.ToString()));
                lstparameters.Add(new Parameters("@toDate", sToDate.ToString()));
                _DS = dataAccess.GetDataSet("Prc_GetAuditLogDetails",lstparameters);
                foreach (DataRow _Dr in _DS.Tables[0].Rows)
                {
                    _UserList.Add(new Auditlog()
                    {
                        RecordID = Convert.ToInt64(_Dr["RecordID"].ToString()),
                        OperationDetails = _Dr["OperationDetails"].ToString(),
                        LoginId = _Dr["LoginId"].ToString(),
                        FromIP = _Dr["FromIP"].ToString(),
                        OperationPerformedDateTime = _Dr["OperationPerformedDateTime"].ToString(),
                        FromPage = _Dr["FromPage"].ToString(),
                        UrlReferrer = _Dr["UrlReferrer"].ToString(),
                        UserAgent = _Dr["UserAgent"].ToString()
                    });
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            //return Json(new { draw = 1, recordsTotal = _UserList.Count, recordsFiltered = 10, data = _UserList }, JsonRequestBehavior.AllowGet);
            var jsonResult = Json(_UserList, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = Int32.MaxValue;
            return jsonResult;
        }
        [HttpPost]
        public ActionResult AuditLoginDetailsExcel(string sLoginId, string sFromDate, string sToDate)
        {
            string _Result = string.Empty;
            try
            {

                DataSet _DS = new DataSet();
                _UserList.Clear();
                _DS = new DataSet();
                List<Parameters> lstparameters = new List<Parameters>();
                lstparameters.Add(new Parameters("@LoginId", sLoginId.ToString()));
                lstparameters.Add(new Parameters("@fromDate", sFromDate.ToString()));
                lstparameters.Add(new Parameters("@toDate", sToDate.ToString()));
                _DS = dataAccess.GetDataSet("Prc_GetAuditLogDetails", lstparameters);

                foreach (DataRow _Dr in _DS.Tables[0].Rows)
                {
                    _UserList.Add(new Auditlog()
                    {
                        RecordID = Convert.ToInt64(_Dr["RecordID"].ToString()),
                        OperationDetails = _Dr["OperationDetails"].ToString(),
                        LoginId = _Dr["LoginId"].ToString(),
                        FromIP = _Dr["FromIP"].ToString(),
                        OperationPerformedDateTime = _Dr["OperationPerformedDateTime"].ToString(),
                        FromPage = _Dr["FromPage"].ToString(),
                        UrlReferrer = _Dr["UrlReferrer"].ToString(),
                        UserAgent = _Dr["UserAgent"].ToString()
                    });
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            var jsonResult = Json(_UserList, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = Int32.MaxValue;
            return jsonResult;
        }
        #endregion
    }
}
