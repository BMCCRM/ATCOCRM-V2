﻿// Global Variables
var TeamId = 0;
var mode = "", myData = "", jsonObj = "", msg = "";

// Events
function pageLoad() {

    ClearFields();

    $('#btnSave').click(btnSaveClicked);
    $('#btnCancel').click(btnCancelClicked);
    $('#btnYes').click(btnYesClicked);
    $('#btnNo').click(btnNoClicked);
    $('#btnOk').click(btnOkClicked);

    $('#divConfirmation').jqm({ modal: true });
    $('#Divmessage').jqm({ modal: true });
   // OnChangeddG1();

}
function btnSaveClicked() {

    var isValidated = $('#form1').validate({
        rules: {
            txtName: {
                required: true,
            }
        }
    });
    var letters = /^[0-9a-zA-Z ]+$/;
    if (!$('#txtName').val().match(letters)) {
        alert('Please input alphanumeric characters only');
        return false;
    }
    if ($('#dG1').val() == "-1") {
        alert('Please Select Group');
        //return false;
    }else {
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
}
function btnCancelClicked() {

    $('#hdnMode').val("AddMode");
    ClearFields();
    ajaxCompleted();
    $("#btnRefresh").trigger('click');
    return false;
}
function btnYesClicked() {

    myData = "{'teamId':'" + TeamId + "'}";

    $.ajax({
        type: "POST",
        url: "TeamMaster.asmx/DeleteTeam",
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

    myData = "{'GroupId':'1','TeamName':'" + $('#txtName').val() + "','description':'" + $('#txtDescription').val() + "','isActive':'" + $('#chkActive').attr("checked") + "'}";

    $.ajax({
        type: "POST",
        url: "TeamMaster.asmx/InsertTeamMaster",
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
    TeamId = sender.PK_TSID;
    ClearFields();
    myData = "{'teamId':'" + TeamId + "'}";

    $.ajax({
        type: "POST",
        url: "TeamMaster.asmx/GetTeamMaster",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetTeam,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function oGrid_Delete(sender) {

    $('#hdnMode').val("DeleteMode");
    TeamId = sender.PK_TSID;
    $('#divConfirmation').jqmShow();
}
function UpdateData() {

    myData = "{'teamId':'" + TeamId + "','teamName':'" + $('#txtName').val() + "','description':'" + $('#txtDescription').val() + "','isActive':'" + $('#chkActive').attr("checked") + "','groupId':'1'}";

    $.ajax({
        type: "POST",
        url: "TeamMaster.asmx/UpdateTeamMaster",
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
function ajaxCompleted() {

    $('#imgLoading').hide();
}
function onSuccessGetTeam(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        $('#txtName').val(jsonObj[0].TeamMastertName);
        $('#txtDescription').val(jsonObj[0].TeamMasterDescription);
        $('#chkActive').attr("checked", jsonObj[0].IsActive == "True" ? 1 : 0);
        $('#dG1').val(jsonObj[0].Fk_GID);
    }
}
function onSuccess(data, status) {

    if (data.d == "OK") {

        mode = $('#hdnMode').val();
        msg = '';

        if (mode === "AddMode") {
            msg = 'Data inserted succesfully!';
        }
        else if (mode === "EditMode") {
            msg = 'Data updated succesfully!';
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
        msg = 'Team already exist! Try different';
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
function startingAjax() {

    $('#imgLoading').show();
}
function ClearFields() {

    $('#txtName').val("");
    $('#chkActive').attr("checked", true);

    //function OnChangeddG1() {
    //    $('#dialog').jqm({ modal: true });
    //    $('#dialog').jqm();
    //    $('#dialog').jqmShow();


    //    $.ajax({
    //        type: "POST",
    //        url: "Products.asmx/GetTeamDatawithGroupId",
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        async: false,
    //        success: onSuccessG1,
    //        error: onError,
    //        beforeSend: startingAjax,
    //        complete: ajaxCompleted,
    //        cache: false

    //    });

    //    $('#dialog').jqmHide();
    //}

    //function onSuccessG1(data, status) {
    //    var jsonData = JSON.parse(data.d);
    //    if (data.d != '') {
    //        $.each(jsonData, function (i, tweet) {
    //            $("#dG1").append("<option value='" + tweet.ID + "'>" + tweet.TeamName + "</option>");
    //        });
    //    }

    //}
}


function OnChangeddG1() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();


    $.ajax({
        type: "POST",
        url: "TeamMaster.asmx/GetGroupDD",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: onSuccessG1,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });

    $('#dialog').jqmHide();
}

function onSuccessG1(data, status) {
    var jsonData = JSON.parse(data.d);
    if (data.d != '') {
        $.each(jsonData, function (i, element) {
            $("#dG1").append("<option value='" + element.ID + "'>" + element.GroupName + "</option>");
        });
    }

}