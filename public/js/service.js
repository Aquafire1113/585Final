var firebaseConfig = {
    apiKey: "AIzaSyBOvTUqXChWNxipr78-8_pCOhQJqdJ0958",
    authDomain: "finalproject585.firebaseapp.com",
    databaseURL: "https://finalproject585.firebaseio.com",
    projectId: "finalproject585",
    storageBucket: "finalproject585.appspot.com",
    messagingSenderId: "589551024462",
    appId: "1:589551024462:web:94d6edfa93242edd7ec61f",
    measurementId: "G-HG82Z9MMYL"
  };
  
  firebase.initializeApp(firebaseConfig);

  var db = firebase.firestore();



var _createRecipe = function(recipeImage, recipeName, recipeDesc, recipeTime, recipeServing, ingredients, instructions){

    db.collection('recipes').add({
        image:recipeImage, 
        name:recipeName, 
        description:recipeDesc, 
        time:recipeTime, 
        serving:recipeServing, 
        ingredientList:ingredients,
        instructionList:instructions
    }).then(function(){
        console.log("submitted")
        alert("Your recipe " + recipeName + " has been submitted.")
        location.replace("recipes.html");
    })
}

var _returnRecipes = function(){
    db.collection('recipes').get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            $(".yourBox").append(
                `<div class='yourRecipeBox'>
                <div class="yourRecipe">
                <img class="yourImage" src="${doc.data().image}">
                <div class='viewButton' id="${doc.id}">View</div>
                <div class="recipeDiv">
                  <h3 class="recipeName">${doc.data().name}</h3>
                  <p class="recipeDesc">
                  ${doc.data().description}
                  </p>
                  <div class="iconDiv">
                    <img class="recipeIcon" src="images/time.svg" alt="timer icon">
                    <p class="recipeDesc">${doc.data().time}</p> 
                  </div>
                  <div class="iconDiv">
                    <img class="recipeIcon" src="images/servings.svg" alt="timer icon">
                    <p class="recipeDesc">${doc.data().serving}</p> 
                  </div>
                </div>
              </div>
              <div class="buttonBox">
              <div class="updateModalOpen" id="${doc.id}">Update</div>
              <div class="deleteRecipe" id="${doc.id}">
              Delete
              </div>
              </div>
              </div>`
            )
        })
        
    $(".deleteRecipe").click(function(e){
        e.preventDefault();
        var recipeId = e.currentTarget.id;
        _deleteRecipe(recipeId);
    })

    $(".updateModalOpen").click(function(e){
        e.preventDefault();
        var recipeId = e.currentTarget.id;
        $("#update").removeClass('hide');
        $("#update").addClass('show');
        _populateRecipe(recipeId);
    })

    $(".viewButton").click(function(e){
        e.preventDefault();
        var recipeId = e.currentTarget.id;
        $("#view").removeClass('hide');
        $("#view").addClass('show');
        _viewRecipe(recipeId);
    })

    })
}

var _deleteRecipe = function(id){
    db.collection('recipes').doc(id).delete().then(function(){
        alert("Recipe has been removed")
        window.location.reload();
    }).catch(function(error){
        console.log(error);
    })
}

var _populateRecipe = function(id){
    var docRef = db.collection('recipes').doc(id);

    docRef.get().then(function(doc){
        $('#update').append(
            `
            <h1 class="pageHeader">Update this recipe:</h1>

<input type="text" id="nameUpdate" class="createInput" value="${doc.data().name}">

<input type="text" id="descUpdate" class="createInput" value="${doc.data().description}">

<input type="text" id="timeUpdate" class="createInput" value="${doc.data().time}">

<input type="number" id="servingSizeUpdate" class="createInput" value="${doc.data().serving}">

<h2 class="createSubheader">Edit Ingredients:</h2>
<div class="ingredientHolder">
            <input class='createInput ingredientUpdate' value="${doc.data().ingredientList}">
</div>

<h2 class="createSubheader">Edit Instructions:</h2>
<div class="instructionHolder">
<input class='createInput instructionUpdate' value="${doc.data().instructionList}">
</>

<input id="${doc.id}" class="updateRecipe" type="submit" value="Update Recipe">

            `
        )

        $(".updateRecipe").click(function(e){
            e.preventDefault();
            var updateId = e.currentTarget.id;
            // console.log("click");
    let newName = $("#nameUpdate").val();
    let newDesc = $("#descUpdate").val();
    let newTime = $("#timeUpdate").val();
    let newServing = $("#servingSizeUpdate").val();
    let newIngredients = $(".ingredientUpdate").val();
    let newInstructions = $(".instructionUpdate").val();
    
    _updateRecipe(updateId, newName, newDesc, newTime, newServing, newIngredients, newInstructions);
        });
    })
}

var _updateRecipe = function(id, newName, newDesc, newTime, newServing, newIngredients, newInstructions){
    var newObj = {
        name:newName,
        serving:newServing,
        time:newTime,
        description:newDesc,
        ingredientList:newIngredients,
        instructionList:newInstructions
    }
    db.collection('recipes').doc(id).update(newObj).then(function(){
        alert("This recipe has been updated");
        window.location.reload();
    })
}

var _viewRecipe = function(id){
    var docRef = db.collection('recipes').doc(id);

    docRef.get().then(function(doc){
        $('#view').append(
            `
            <div class="recipeTop">
                <image src="${doc.data().image}" class="displayRecipeImage">
                <div class="recipeBegins">
                    <h2 class="recipeHeader">Description</h2>
                    <p class="recipeBeginsFont">${doc.data().description}</p>

                    <h3 class="recipeSubheader">Total Time:</h3>
                    <p class="recipeBeginsFont">${doc.data().time}</p>

                    <h3 class="recipeSubheader">Servings:</h3>
                    <p class="recipeBeginsFont">${doc.data().serving}</p>
                </div>
            </div>

            <div class="recipeBottom">
                    <h2 class="recipeHeader">Ingredients</h2>
                    <p class=recipeBeginsFont>${doc.data().ingredientList}</p>

                    <h2 class="recipeHeader">Ingredients</h2>
                    <p class=recipeBeginsFont>${doc.data().instructionList}</p>
            </div>

            `
        )

        $(".closeModal").click(function(e){
            
        });
    })
}
