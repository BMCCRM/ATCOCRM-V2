using System;
using System.Linq;
using System.Web.Script.Services;
using System.Web.Services;
using DatabaseLayer.SQL;
using System.Web.Script.Serialization;
using PocketDCR2.Classes;
using System.Data.SqlClient;
using System.Collections.Specialized;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for ProductSkuService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class ProductSkuService : System.Web.Services.WebService
    {
        #region Public Member

        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();
        NameValueCollection nv = new NameValueCollection();
        DAL dl = new DAL();

        #endregion

        #region Public Functions

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertProductSku(int productId, int packsizeId, int strengthId, int formId ,
            string skuCode, string skuName, bool isActive, decimal distributorPrice, decimal tradePrice, decimal retailPrice)
        {
            string returnString = "";

            try
            {
                #region Validate Code

                var isValidateCode = _dataContext.sp_ProductSkuSelect0(null, skuCode.Trim(), null).ToList();
                var isValidateName = _dataContext.sp_ProductSkuSelect0(null, null, skuName.Trim()).ToList();

                #endregion

                if (isValidateCode.Count != 0)
                {
                    returnString = "Duplicate Code!";
                }
                else if (isValidateName.Count != 0)
                {
                    returnString = "Duplicate Name!";
                }
                else
                {
                    var insertProductSKU = _dataContext.sp_ProductSkuInsert(productId, packsizeId, strengthId, formId, skuCode, skuName.Trim(),
                        isActive, distributorPrice, tradePrice, retailPrice, DateTime.Now, DateTime.Now).ToList();
                    returnString = "OK";
                } 
            }
            catch (Exception exception)
            {

                returnString = exception.Message;
            }

            return returnString;
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertProductSkuwithTeamRelation(int productId, int packsizeId, int strengthId, int formId,
            string skuCode, string skuName, bool isActive, decimal distributorPrice, decimal tradePrice, decimal retailPrice, string teamIDs)
        {
            string returnString = "";

            try
            {
                #region Validate Code

                var isValidateCode = _dataContext.sp_ProductSkuSelect0(null, skuCode.Trim(), null).ToList();
                var isValidateName = _dataContext.sp_ProductSkuSelect0(null, null, skuName.Trim()).ToList();

                #endregion

                if (isValidateCode.Count != 0)
                {
                    returnString = "Duplicate Code!";
                }
                else if (isValidateName.Count != 0)
                {
                    returnString = "Duplicate Name!";
                }
                else
                {
                    var insertProductSKU = _dataContext.sp_ProductSkuInsertwithTeamRelation(productId, packsizeId, strengthId, formId, skuCode, skuName.Trim(),
                        isActive, distributorPrice, tradePrice, retailPrice, DateTime.Now, DateTime.Now, teamIDs).ToList();
                    returnString = "OK";
                }
            }
            catch (Exception exception)
            {

                returnString = exception.Message;
            }

            return returnString;
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetProductSku(int skuId)
        {
            string returnString = "";

            try
            {
                //nv.Clear();
                nv.Add("@SkuId-int", skuId.ToString());
                nv.Add("@SKUCode-int", "NULL");
                nv.Add("@SkuName-int", "NULL");
                var team_ds = dl.GetData("sp_ProductSkuSelect0", nv);
                if (team_ds != null)
                {
                    if (team_ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = team_ds.Tables[0].ToJsonString();
                    }
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetProductSkuwithTeam(int skuId)
        {
            string returnString = "";

            try
            {
                //nv.Clear();
                nv.Add("@SkuId-int", skuId.ToString());
                nv.Add("@SKUCode-int", "NULL");
                nv.Add("@SkuName-int", "NULL");
                var team_ds = dl.GetData("sp_ProductSkuSelectwithTeam", nv);
                if (team_ds != null)
                {
                    if (team_ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = team_ds.Tables[0].ToJsonString();
                    }
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        //[WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public string GetProductSku(int skuId) 
        //{
        //    string returnString = "";

        //    try
        //    {
        //        var getProductSKU =
        //            _dataContext.sp_ProductSkuSelect0(skuId, null, null).Select(
        //                p =>
        //                    new DatabaseLayer.SQL.ProductSku
        //                    {
        //                        SkuId = p.SkuId,
        //                        ProductId = p.ProductId,
        //                        PackSizeid = p.PackSizeid,
        //                        StrengthId = p.StrengthId,
        //                        FormId = p.FormId,
        //                        SkuCode = p.SkuCode,
        //                        SkuName = p.SkuName,
        //                        IsActive = p.IsActive,
        //                        DistributorPrice = p.DistributorPrice,
        //                        TradePrice = p.TradePrice,
        //                        RetailPrice = p.RetailPrice                                
        //                    }).ToList();
        //        returnString = _jss.Serialize(getProductSKU);
        //    }
        //    catch (Exception exception)
        //    {
        //        returnString = exception.Message;
        //    }

        //    return returnString;
        //}

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateProductSku(int skuId,int productId, int packsizeId, int strengthId, int formId,
            string skuCode, string skuName, bool isActive, decimal distributorPrice, decimal tradePrice, decimal retailPrice)
        {
            string returnString = "";

            try
            {
                #region Validate Code + Name

                var isValidateCode = _dataContext.sp_ProductSkuSelect0(null, skuCode.Trim(), null).ToList();
                var isValidateName = _dataContext.sp_ProductSkuSelect0(null, null, skuName.Trim()).ToList();

                #endregion

                if (isValidateCode.Count != 0 && Convert.ToInt32(isValidateCode[0].SkuId) != skuId)
                {
                    returnString = "Duplicate Code!";
                }
                else if (isValidateName.Count != 0 && Convert.ToInt32(isValidateName[0].SkuId) != skuId)
                {
                    returnString = "Duplicate Name!";
                }
                else
                {
                    var updateProductSKU = _dataContext.sp_ProductSkuUpdate(skuId, productId, packsizeId, strengthId, formId, skuCode, skuName.Trim(),
                        isActive, distributorPrice, tradePrice, retailPrice, DateTime.Now, DateTime.Now).ToList();
                    returnString = "OK";
                }                
            }
            catch (Exception exception)
            {

                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateProductSkuwithTeamRelation(int skuId, int productId, int packsizeId, int strengthId, int formId,
            string skuCode, string skuName, bool isActive, decimal distributorPrice, decimal tradePrice, decimal retailPrice, string teamIDs)
        {
            string returnString = "";

            try
            {
                #region Validate Code + Name

                var isValidateCode = _dataContext.sp_ProductSkuSelect0(null, skuCode.Trim(), null).ToList();
                var isValidateName = _dataContext.sp_ProductSkuSelect0(null, null, skuName.Trim()).ToList();

                #endregion

                if (isValidateCode.Count != 0 && Convert.ToInt32(isValidateCode[0].SkuId) != skuId)
                {
                    returnString = "Duplicate Code!";
                }
                else if (isValidateName.Count != 0 && Convert.ToInt32(isValidateName[0].SkuId) != skuId)
                {
                    returnString = "Duplicate Name!";
                }
                else
                {
                    var updateProductSKU = _dataContext.sp_ProductSkuUpdatewithTeamRelation(skuId, productId, packsizeId, strengthId, formId, skuCode, skuName.Trim(),
                        isActive, distributorPrice, tradePrice, retailPrice, DateTime.Now, DateTime.Now, teamIDs).ToList();
                    returnString = "OK";
                }
            }
            catch (Exception exception)
            {

                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DeleteProductSku(int skuId) 
        {
            string returnString = "";

            try
            {
                _dataContext.sp_ProductSkuDelete(skuId);
                returnString = "OK";
            }
            catch (SqlException exception)
            {
                if (exception.Number == 547)
                {
                    returnString = "Not able to delete this record due to linkup.";
                }
                else
                {
                    returnString = exception.Message;
                }
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetProductWithTeamID(string TeamID)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@TeamID-bigint", TeamID.ToString());
                var team_ds = dl.GetData("sp_GetProductWithteamID", nv);
                if (team_ds != null)
                {
                    if (team_ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = team_ds.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetTeam()
        {
            string returnString = "";

            try
            {
                var team_ds = dl.GetData("sp_GetTeam", null);
                if (team_ds != null)
                {
                    if (team_ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = team_ds.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetProductByTeam(int TeamID)
        {
            string returnString = "";

            try
            {
                nv.Add("@TeamID-int", TeamID.ToString());
                var team_ds = dl.GetData("SP_GetProductByTeam", nv);
                if (team_ds != null)
                {
                    if (team_ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = team_ds.Tables[0].ToJsonString();
                    }
                }
            }
            catch (SqlException exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }
        #endregion
    }
}
