/**
 * Created by Grimbode on 20/08/2017.
 */

$(document).ready(function () {

    var $form = $("#form");
    var $register = $("#register");
    var $registerAndPay = $("#register_and_pay");
    var $selectClubType = $("#selectClubType");
    var $clubname = $("#clubname");
    var $choice = $('input[name="choix"]');
    var $paiement = $('input[name="paiement"]');
    var $step1 = $("#step1");
    var $step2 = $("#step2");
    var $step3 = $("#step3");
    var $step4 = $("#step4");

    $selectClubType.on("change", function (event) {
        var $this = $(this);

        if($selectClubType.val() === "leo"){
            $(".leo").show();
            $(".lions").hide();
        }
        else if($selectClubType.val() === "lions"){
            $(".lions").show();
            $(".leo").hide();
        }

        $choice.prop("checked", false);

        if($this.val() !== ""){
            $step1.fadeIn();
        }else{
            $step1.fadeOut();
        }
    });

    $clubname.on("input", function (event) {
        if($(this).val().length > 0){
            $step2.fadeIn();
        }else{
            $step2.fadeOut();
            $step3.hide();
        }
    });

    $choice.on("change", function (event) {
        var $this = $(this);
        if($this.prop("checked", true)){
            $step3.fadeIn();
            if($(this).hasClass("share")){
                $step4.fadeIn();
            }else{
                $step4.fadeOut();
            }
        }else{
            $step3.fadeOut();
        }
    });

    $paiement.on("change", function (event) {
        var val = $('input[name="paiement"]:checked').val();
        if(val === "cheque"){
            $register.fadeIn();
            $registerAndPay.hide();
            $register.prop("disabled", false);
            $registerAndPay.prop("disabled", true);
        }

        if(val === "lydia"){
            $register.hide();
            $register.prop("disabled", true);
            $registerAndPay.fadeIn();
            $registerAndPay.prop("disabled", false);
        }
    });
    
    $form.on("submit", function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        var target = "https://script.google.com/macros/s/AKfycbxkV41wETxrKjjnWlOt_3NcMgeCXzNxST0qSxvTtMJuMqRKZUM/exec";

        var data = $.param($(this).serializeArray().map(function (obj) {
            if(obj.name === "premier_rassemblement"){
                if($('input[name="premier_rassemblement"]').prop("checked", true)){
                    obj.value = "oui"
                }else{
                    obj.value = "non"
                }
            }
            return obj;
        }));

        $.post(target, data, function(res){

            swal({
                title: "Inscrit !",
                text: "Vous allez recevoir un mail de confirmation",
                type: "success",
                showCancelButton: true,
                confirmButtonText: "Merci!",
                closeOnConfirm: false,
                closeOnCancel: false
            });

            console.log(res);

        }).fail(function (error) {
            console.error(error);
        })

    });
    
    $(".hour").flatpickr({
        enableTime: true,
        noCalendar: true,
        enableSeconds: false,
        time_24hr: true,
        dateFormat: "H:i",
        defaultHour: 12,
        defaultMinute: 0
    });
});

