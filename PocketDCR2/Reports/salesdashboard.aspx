﻿<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true"
    CodeBehind="salesdashboard.aspx.cs" Inherits="PocketDCR2.Reports.salesdashboard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style type="text/css">
        html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video
        {
            border: 0;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;
            margin: 0;
            padding: 0;
        }
        article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section
        {
            display: block;
        }
        body
        {
            line-height: 1;
        }
        ol, ul
        {
            list-style: none;
        }
        blockquote, q
        {
            quotes: none;
        }
        blockquote:before, blockquote:after, q:before, q:after
        {
            content: none;
        }
        table
        {
            border-collapse: collapse;
            border-spacing: 0;
        }
        .wrapper
        {
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="wrapper">
        <iframe class="red" id="ifrm" runat="server" src="" width="100%" height="100%" frameborder="0">
        </iframe>
    </div>
</asp:Content>