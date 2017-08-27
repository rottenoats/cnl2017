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
        choiceHandler();

        if($this.val() !== ""){
            $step1.fadeIn();
            clubnameHandler();
            paymentHandler();

        }else{
            $step1.fadeOut();
            $step2.fadeOut();
            $step3.fadeOut();
            $step4.fadeOut();

            //TODO: test
            $register.fadeOut();
            $register.prop("disabled", true);
            $registerAndPay.fadeOut();
            $registerAndPay.prop("disabled", true);
        }
    });

    var clubnameHandler = function () {
        var $this = $clubname;
        if($this.val().length > 0){
            $step2.fadeIn();
        }else{
            $step2.fadeOut();
            $step3.hide();
            $step4.hide();
        }
    };

    var paymentHandler = function () {
        var val = $('input[name="paiement"]:checked').val();
        if(val === "cheque"){
            $register.fadeIn();
            $registerAndPay.hide();
            $register.prop("disabled", false);
            $registerAndPay.prop("disabled", true);
        }

        else if(val === "lydia"){
            $register.hide();
            $register.prop("disabled", true);
            $registerAndPay.fadeIn();
            $registerAndPay.prop("disabled", false);
        }
    };

    var choiceHandler = function (event) {
        var $this = $('input[name="choix"]:checked');
        if($this.prop("checked") === true){
            console.log("checked", $this.prop("checked"));
            $step3.fadeIn();
            if($this.hasClass("share")){
                $step4.fadeIn();
            }else{
                $step4.fadeOut();
            }
        }else{
            console.log('not checked');
            $step3.fadeOut();
            $step4.fadeOut();
        }
    };

    $clubname.on("input", clubnameHandler);

    $choice.on("change", choiceHandler);

    $paiement.on("change", paymentHandler);
    
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

