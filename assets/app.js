
//Variables
var thefile;
var imageSRC;
var myEdit = '';
var copyPostButton;

const inputFile = document.getElementById('myfile');
const postButton = document.querySelector(".post-button");
const postText = document.querySelector(".text-area");
const postButtons = document.querySelector(".post-buttons");
const deleteImageButoon = document.querySelector(".delete-file");
const publications = document.querySelector(".publications-area");


//file uppload event
inputFile.onchange = (e)=>{
   if(thefile){
      alert("Only one image");
   }else{
      thefile = e.target.files;
      const divImg = document.createElement('div');
      divImg.className = "image-file";
      const fileName = document.createElement('p');
      const deleteFile = document.createElement('button');
      deleteFile.className ="delete-file";
      const deleteIcon = document.createElement('i')
      deleteIcon.className = "fas fa-trash";
      deleteFile.appendChild(deleteIcon);
      fileName.textContent = "Image";
      divImg.appendChild(fileName);
      divImg.appendChild(deleteFile);
      postButtons.appendChild(divImg);

      deleteFile.addEventListener('click', (e)=>{
         thefile = undefined;
         divImg.remove();
      });

      //save the image
      inputFile.files[0];
      const reader = new FileReader();

      reader.addEventListener("load", function(){
         imageSRC = reader.result;
      },false);

      if(inputFile.files[0]){
         reader.readAsDataURL(inputFile.files[0]);
      }
   }
}

//event listeners
eventListeners();
function eventListeners(){
   //add new publication
   postButton.addEventListener('click', (e)=>{
      if(postButton.classList[1] !== "edit"){
         if(thefile != undefined && postText.value != ""){
            handlePublications();
         }else{
            alert("Complete the text and image fields")
         }
      }else{
         changeTextOfPublication();
      }
   });
   
   //delete publication
   publications.addEventListener('click', deletePublication);

   //edit publication
   publications.addEventListener('click', editPublication);
}




//functions

//new publication
function handlePublications() {
   const pArea = document.querySelector(".publications-area");
   let textPosted = postText.value;
   pArea.innerHTML += `
            <div class="publication">
              <div class="text-area-posted">
                <p class="posted-text">${textPosted}</p>
                <div class="dropdown">
                  <button class="dropbtn">
                    <i class="fas fa-ellipsis-h"></i>
                  </button>
                  <div class="dropdown-content">
                    <a href="#" class="edit-publication">Edit</a>
                    <a href="#" class="delete-publication">Delete</a>
                  </div>
                </div>
              </div>
              <img src="${imageSRC}" alt="${textPosted}" />
            </div>
   `
   //clear fields
   postText.value = "";
   thefile = undefined;
   document.querySelector('.image-file').remove();
}

//delete publication
function deletePublication(e){
   e.preventDefault();
   if(e.target.className === "delete-publication"){
      e.target.parentElement.parentElement.parentElement.parentElement.remove();
   }
}

function editPublication(e){
   e.preventDefault();
   if(e.target.className === "edit-publication"){
      let textPublication = e.target.parentElement.parentElement
      .previousElementSibling;
      myEdit = textPublication;
      postButton.classList.add("edit");
      postText.value = textPublication.textContent;
      postButton.innerHTML = `<i class="fas fa-save"></i>Save`;
   }
}

function changeTextOfPublication(e){
   myEdit.innerText = postText.value;
   postText.value = "";
   postButton.innerHTML = `<i class="fas fa-paper-plane"></i>Post`
   postButton.classList.remove("edit")
}