
var thefile;
var imageSRC;

const inputFile = document.getElementById('myfile');
const postButton = document.querySelector(".post-button");
const postText = document.querySelector(".text-area");
const postButtons = document.querySelector(".post-buttons");
const deleteImageButoon = document.querySelector(".delete-file");

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


postButton.addEventListener('click', (e)=>{
   if(thefile != undefined && postText.value != ""){
      handlePublications();
   }else{
      alert("Complete the text and image fields")
   }
})

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
                    <a href="#">Edit</a>
                    <a href="#">Delete</a>
                  </div>
                </div>
              </div>
              <img src="${imageSRC}" alt="${textPosted}" />
            </div>
   `
   postText.value = "";
   thefile = undefined;
   document.querySelector('.image-file').remove();
 }
