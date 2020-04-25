document.body.querySelector('#image').addEventListener('change', handleUploadChange);

let selectedFile;

function handleUploadChange(e){
  selectedFile = e.target.files[0];
}

var recipeImage;

function handleUploadSubmit(){
  let storageRef = firebase.storage().ref(`images/${selectedFile.name}`);

  let uploadTask = storageRef.put(selectedFile);

  uploadTask.on(
    "state_changed",
    snapshot => {},
    error => {
        console.log(error)
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then(
          downloadURL => {
            console.log("File available at", downloadURL);

    let recipeImage = downloadURL;
    let recipeName = $("#name").val();
    let recipeDesc = $("#desc").val();
    let recipeTime = $("#time").val();
    let recipeServing = $("#servingSize").val();

    var ingredientList = document.body.querySelectorAll(".ingredient");
    var ingredientArray = [];
    for(var i=0; i<ingredientList.length; i++){
        ingredientArray.push(ingredientList[i].value);
    }

    let ingredients = ingredientArray;

    var instructionList = document.body.querySelectorAll(".instruction");
    var instructionArray = [];
    for(var i=0; i<instructionList.length;i++){
        instructionArray.push(instructionList[i].value);
    }

    let instructions = instructionArray;

    _createRecipe(recipeImage, recipeName, recipeDesc, recipeTime, recipeServing, ingredients, instructions);
        });
    }
  );
}

$(".submitRecipe").click(function(e){
    e.preventDefault();
    handleUploadSubmit(recipeImage);
})