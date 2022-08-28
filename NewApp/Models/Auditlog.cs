using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NewApp.Models
{
    public class Auditlog
    {
        public Int64 RecordID { get; set; }
        public string OperationDetails { get; set; }
        public string LoginId { get; set; }
        public string FromIP { get; set; }
        public string OperationPerformedDateTime { get; set; }
        public string FromPage { get; set; }
        public string UrlReferrer { get; set; }
        public string UserAgent { get; set; }
    }
}