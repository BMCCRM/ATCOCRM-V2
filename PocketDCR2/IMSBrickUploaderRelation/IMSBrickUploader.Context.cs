﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PocketDCR2.IMSBrickUploaderRelation
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class CCLPharmaEntities : DbContext
    {
        public CCLPharmaEntities()
            : base("name=CCLPharmaEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Tbl_IMSBrick_Tem> Tbl_IMSBrick_Tem { get; set; }
        public virtual DbSet<Tbl_UploadFilePath_IMSBrick> Tbl_UploadFilePath_IMSBrick { get; set; }
    }
}
