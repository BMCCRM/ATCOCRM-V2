//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PocketDCR2.BWSD
{
    using System;
    using System.Collections.Generic;
    
    public partial class tbl_UploadExcelSalesData
    {
        public int ID { get; set; }
        public string ExcelFileName { get; set; }
        public string EmailAddress { get; set; }
        public int UserId { get; set; }
        public string EmailStatus { get; set; }
        public string EmailSendTime { get; set; }
        public bool ProccessStatus { get; set; }
        public string Remarks { get; set; }
        public System.DateTime CreateDate { get; set; }
        public Nullable<System.DateTime> ProcessCompleteTime { get; set; }
        public string FileName { get; set; }
        public string SendFileName { get; set; }
        public Nullable<int> totalRecords { get; set; }
        public string ProcessRemarks { get; set; }
        public Nullable<System.DateTime> SelectedMonthYear { get; set; }

         public string FileMonth { get; set; }
         public string FileYear { get; set; }
    }
}
