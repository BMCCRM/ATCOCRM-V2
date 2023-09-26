﻿// Global Variables
var ClassId = 0;
var id = 0;
var myData = "", mode = "", msg = "", jsonObj = "";


// Event
function pageLoad() {
    GetSellingSkillsFocusArea();

    $('#btnSave').click(btnSaveClicked);
    $('#btnCancel').click(btnCancelClicked);
    $('#btnYes').click(btnYesClicked);
    $('#btnNo').click(btnNoClicked);
    $('#btnOk').click(btnOkClicked);


    $('#divConfirmation').jqm({ modal: true });
    $('#Divmessage').jqm({ modal: true });
}



function GetSellingSkillsFocusArea() {

    $.ajax({
        type: "POST",
        url: "SellingSkillsFocusArea.asmx/GridSellingSkillsFocusArea",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: onSuccessSellingSkillsFocusArea,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });

    $('#dialog').jqmHide();

}
function onSuccessSellingSkillsFocusArea(data, status) {

    $('#GridSellingSkillsFocusArea').empty();
    $('#GridSellingSkillsFocusArea').prepend($('<table id="datatables" class="display" style="width: 670px;"><thead><tr>' +
                                        '<th Class="ob_gC_Fc">Engagement Strategy</th>' +
                                        //'<th Class="ob_gC_Fc">Product Name</th>'+
                                        //'<th Class="ob_gC_Fc">Doctor Classes</th>'+
                                        '<th Class="ob_gC_Fc">Edit</th><th Class="ob_gC_Fc">Delete</th></tr></thead><tbody>'));
    jsonObj = jsonParse(data.d);
    $.each(jsonObj, function (i, option) {
        $('#datatables').append($("<tr style='text-align:center;'><td class='ob_ST'>" + option.SellingSkillsFocusArea + "</td><td class='ob_text'>"
            + '<a href="#" onclick="oGrid_Edit(' + option.ID + ');return false">Edit</a>' + "</td><td class='ob_text'>"
            + '<a href="#" onclick="oGrid_Delete(' + option.ID + ');return false">Delete</a>' + '</td></tr>'));
    });


    $('#GridSellingSkillsFocusArea').append($('</tbody></table>'));

    //$('#datatables2').dataTable({
    //    "sPaginationType": "full_numbers"
    //});

}
function onError(request, status, error) {

    msg = 'Error occoured';

    $.fn.jQueryMsg({
        msg: msg,
        msgClass: 'error',
        fx: 'slide',
        speed: 500
    });

    $('#imgLoading').hide();
}


function btnSaveClicked() {

    var isValidated = $('#form1').validate({
        rules: {
            txtSellingSkillsFocusArea: {
                required: true
            }
        }
    });

    if (!$('#form1').valid()) {
        return false;
    }

    mode = $('#hdnMode').val();

    if (mode === "") {

        mode = "AddMode";
    }

    if (mode === "AddMode") {
        SaveData();
    }

    else if (mode === "EditMode") {
        UpdateData();
    }
    else {
        return false;
    }

    return false;
}
function btnCancelClicked() {

    $('#hdnMode').val("AddMode");
    ClearFields();
    ajaxCompleted();
    $("#btnRefresh").trigger('click');
    return false;
}
function btnYesClicked() {

    myData = "{'id':'" + id + "'}";

    $.ajax({
        type: "POST",
        url: "SellingSkillsFocusArea.asmx/DeleteSellingSkillsFocusArea",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccess,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function btnNoClicked() {

    $('#divConfirmation').jqmHide();
    $('#hdnMode').val("AddMode");
    ClearFields();
    ajaxCompleted();
    return false;
}
function btnOkClicked() {

    $('#Divmessage').jqmHide();
    $('#hdnMode').val("AddMode");
    $("#btnRefresh").trigger('click');
    ClearFields();
    ajaxCompleted();
    return false;
}




// Functions
function SaveData() {
    $('#hdnMode').val("AddMode");
    myData = "{'SellingSkillsFocusArea':'" + $('#txtSellingSkillsFocusArea').val() + "'}";

    $.ajax({
        type: "POST",
        url: "SellingSkillsFocusArea.asmx/InsertSellingSkillsFocusArea",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccess,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}

function oGrid_Edit(sender) {

    $('#hdnMode').val("EditMode");
    id = sender;
    ClearFields();
    myData = "{'id':'" + id + "'}";

    $.ajax({
        type: "POST",
        url: "SellingSkillsFocusArea.asmx/EditSellingSkillsFocusArea",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetStretchedTarget,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetStretchedTarget(data, status) {
    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        $("#txtSellingSkillsFocusArea").val(jsonObj[0].SellingSkillsFocusArea);

    }
}
function oGrid_Delete(sender) {

    $('#hdnMode').val("DeleteMode");
    id = sender;
    $('#divConfirmation').jqmShow();
}

function UpdateData() {

    myData = "{'id':'" + id + "','SellingSkillsFocusArea':'" + $('#txtSellingSkillsFocusArea').val() + "' }";

    $.ajax({
        type: "POST",
        url: "SellingSkillsFocusArea.asmx/UpdateSellingSkillsFocusArea",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccess,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}

function onSuccess(data, status) {

    if (data.d == "OK") {

        mode = $('#hdnMode').val();
        msg = '';

        if (mode === "AddMode") {
            msg = 'Data inserted succesfully!';
            GetSellingSkillsFocusArea();
        }
        else if (mode === "EditMode") {
            msg = 'Data updated succesfully!';
            GetSellingSkillsFocusArea();
        }
        else if (mode === "DeleteMode") {
            $('#divConfirmation').jqmHide();
            msg = 'Data deleted succesfully!';

        }

        ClearFields();

        $('#hdnMode').val("");
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();


    }
    else if (data.d == "Duplicate Name!") {
        msg = 'already exist! Try different';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();
        return false;
    }
    else if (data.d == "Not able to delete this record due to linkup.") {
        $('#divConfirmation').jqmHide();
        msg = 'Not able to delete this record due to linkup.';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();

    }
}


function startingAjax() {

    $('#imgLoading').show();
}
function ClearFields() {

    $('#txtStretchedTarget').val("");

}
function ajaxCompleted() {

    $('#imgLoading').hide();
}