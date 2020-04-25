function addIngredient(){
    var parent = document.body.querySelector(".ingredientHolder");
    var input = document.createElement("input")

    input.type="text";
    input.className="ingredient" + " " + "createInput";
    input.placeholder="Ingredient Name"
    parent.appendChild(input);
}

function addInstruction(){
    var parent = document.body.querySelector(".instructionHolder");
    var input = document.createElement("input")

    input.type="text";
    input.className="instruction" + " " + "createInput";
    input.placeholder="Instruction Name"
    parent.appendChild(input);
}

$(".menu").click(function(e){
    e.preventDefault();
    $(".navigation").removeClass("hideNav");
    $(".navigation").addClass("showNav");
})

$(".closeModal").click(function(e){
    e.preventDefault();
    $(".navigation").removeClass("showNav");
    $(".navigation").addClass("hideNav");
})

function initApp(){
    _returnRecipes();
}

$(document).ready(function(){
    initApp();
})