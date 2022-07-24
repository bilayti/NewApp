using System.Data.SqlClient;
using System.Web;
using System.Web.Configuration;
namespace NewApp.Models
{
    public class ProjectConfig : DBConnection
    {
        VariableClass objVc = new VariableClass();
        GlobalMethod objGm = new GlobalMethod();

        public static string DBConnectionString
        {
            get
            {
                string ConnectionString = WebConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
                SqlConnectionStringBuilder ConnectionBuilder = new SqlConnectionStringBuilder(ConnectionString);
                return ConnectionBuilder.ConnectionString;

            }
        }
        public int InvalidLoginAttemptLockCount
        {
            get
            {
                return int.Parse(WebConfigurationManager.AppSettings["InvalidLoginAttemptLockCount"].ToString());
            }
        }
        public int MaxUploadSizeInMB
        {
            get { return int.Parse(WebConfigurationManager.AppSettings["MaxUploadSizeInMB"].ToString()); }
        }
        public static int MaxInvalidLoginAttempts
        {
            get
            {
                return int.Parse(WebConfigurationManager.AppSettings["MaxInvalidLoginAttempts"].ToString());
            }
        }
        public static int FreshnessOfUploadInDays
        {
            get
            {
                return int.Parse(WebConfigurationManager.AppSettings["FreshnessOfUploadInDays"].ToString());
            }
        }
        public static int DisplayForNDays
        {
            get
            {
                return int.Parse(WebConfigurationManager.AppSettings["DisplayForNDays"].ToString());
            }
        }
        public static int DisplayForNDaysVC
        {
            get
            {
                return int.Parse(WebConfigurationManager.AppSettings["DisplayForNDaysVC"].ToString());
            }
        }
        public static string MailServer
        {
            get
            {
                return WebConfigurationManager.AppSettings["MailServer"].ToString();
            }
        }
        public static int MailPort
        {
            get
            {
                return int.Parse(WebConfigurationManager.AppSettings["MailPort"].ToString());
            }
        }
        public static bool MailIsSSL
        {
            get
            {
                return bool.Parse(WebConfigurationManager.AppSettings["MailIsSSL"].ToString());
            }
        }
        public static string MailSenderEmail
        {
            get
            {
                return WebConfigurationManager.AppSettings["MailSenderEmail"].ToString();
            }
        }
        public static string MailSenderUsername
        {
            get
            {
                return WebConfigurationManager.AppSettings["MailSenderUsername"].ToString();
            }
        }
        public static string MailSenderPassword
        {
            get
            {
                return WebConfigurationManager.AppSettings["MailSenderPassword"].ToString();
            }
        }
        public static string MailSenderDisplayName
        {
            get
            {
                return WebConfigurationManager.AppSettings["MailSenderDisplayName"].ToString();
            }
        }
        public static string HtmlEncode(string plainInput)
        {
            return HttpUtility.HtmlEncode(plainInput);
        }
        public static string UrlEncode(string plainInput)
        {
            return HttpUtility.UrlEncode(plainInput);
        }
        //public static string JavaScriptEncode(string plainInput)
        //{
        //    return Encoder.JavaScriptEncode(plainInput);
        //}
    }
}

