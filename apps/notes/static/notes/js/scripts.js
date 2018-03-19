$(document).ready(function(){
    $(".card-body form").hide();
    $(document).on("click", ".card", function(e){
        $(this).children(".card-body").children().toggle();
    });
    $(document).on("click", ".card-body form", function(e){
        e.stopPropagation();
    });
    $(document).on("submit", "form.card-text", function(e){
        e.preventDefault();
        this_form = $(this)
        $.ajax({
            url: $(this).attr("action"),
            method: "post",
            data: $(this).serialize(),
            success: function(serverResponse){
                console.log("updating content");
                console.log(serverResponse)
                this_form.siblings("p").text(serverResponse)
            },
            dataType: "text"
        });
        $(this).hide();
        $(this).siblings().show();
    });
    $("#new").submit(function(e){
        e.preventDefault();
        $.ajax({
            url: $(this).attr("action"),
            method: "post",
            data: $(this).serialize(),
            success: function(serverResponse){
                $("#all_notes").append(serverResponse);
                $(".card-body form").hide();
            }
        });
    });
    $(document).on("click", ".delete", function(e){
        e.stopPropagation()
        $.ajax({
            url: $(this).attr("href"),
            method: "get",
            success: function(serverResponse){}
        });
        $(this).parent().parent().remove();
        return false;
    });
});