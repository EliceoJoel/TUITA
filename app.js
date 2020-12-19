
var thefile;

const inputFile = document.getElementById('myfile');
const postButton = document.querySelector(".post-button");
const postText = document.querySelector(".text-area");
const postButtons = document.querySelector(".post-buttons");


inputFile.onchange = (e)=>{
   if(thefile){
      alert("Only one image");
   }else{
      thefile = e.target.files;
      const divImg = document.createElement('div')
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
   }
}

postButton.addEventListener('click', (e)=>{
   // console.log(postText.value)
   if(thefile != undefined && postText.value != ""){
      console.log("complete");
   }else{
      console.log("incomplete");
   }
})
