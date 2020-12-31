
/******************************** VARIABLES ********************************/
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


/****************************** INPUT FILE EVENT ***************************/
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

/***************************** EVENT LISTENERS ****************************/
eventListeners();

function eventListeners(){
   //add new publication
   postButton.addEventListener('click', (e)=>{
      if(postButton.classList[1] !== "edit"){
         if(thefile != undefined && postText.value != ""){
            handlePublications(postText.value, imageSRC);
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

   //Load content in local Storage
   document.addEventListener('DOMContentLoaded', obtainPosts);
}




/********************************* FUNCTIONS *********************************/

//new publication
function handlePublications(text, src) {
   const pArea = document.querySelector(".publications-area");
   pArea.innerHTML += `
      <div class="publication">
        <div class="text-area-posted">
          <p class="posted-text">${text}</p>
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
        <img src="${src}" alt="${text}" />
      </div>`

   //Add publication to locas storage
   addPostLocalStorage(text, src);

   //clear fields
   postText.value = "";
   thefile = undefined;
   document.querySelector('.image-file').remove();
}

function addPostLocalStorage(text, src){
   let posts;
   posts = obtainPostLocalStorage();
   //add new post to posts in local storage
   posts.push({text: text, src: src})
   console.log(JSON.stringify(posts));
   localStorage.setItem('posts', JSON.stringify(posts));
}

//check if exists anyone post
function obtainPostLocalStorage(){
   let posts;
   if(localStorage.getItem('posts') === null){
      posts = [];
   }else{
      posts = JSON.parse(localStorage.getItem('posts'));
   }
   return posts;
}

//obtain posts of local storage and load in DOM these
function obtainPosts(){
   let posts;
   posts = obtainPostLocalStorage();
   const pArea = document.querySelector(".publications-area");
   posts.forEach(post => {
      pArea.innerHTML += `
         <div class="publication">
           <div class="text-area-posted">
             <p class="posted-text">${post.text}</p>
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
           <img src="${post.src}" alt="${post.text}" />
         </div>`
   });
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
