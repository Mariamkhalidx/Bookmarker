var siteNameInput=document.getElementById('bookmarkeName');
var siteUrlInput=document.getElementById('websiteUrl');
var siteTableInput=document.getElementById('tbody');
var url=document.getElementById('url');
var siteName=document.getElementById('name');

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];




var siteList=[];
if(localStorage.getItem('sites')==null){
    siteList=[];
}else
{
    siteList=JSON.parse( localStorage.getItem('sites'));
    displaySite(siteList);
}

function addSite(){

    var site={
        name:siteNameInput.value,
        url:siteUrlInput.value,
      
    }
    console.log(site)
    siteList.push(site);
console.log(siteList);
console.log(siteList[0].url)
clear();
displaySite();
localStorage.setItem('sites',JSON.stringify(siteList));



}

function clear(){
    siteNameInput.value='';
    siteUrlInput.value='';
    url.classList.remove('is-valid');
    siteName.classList.remove('is-valid');
    url.classList.add('is-invalid');
    siteName.classList.add('is-invalid');
}

function displaySite(){
    var string='';
    for(var i =0; i< siteList.length; i++){
        string+=`<table class="table mt-4 text-center bg-white ">
                <thead>
                  <tr>
                    <th>${i+1}</th>
                    <th>${siteList[i].name}</th>
                    <th> <a target="_blank" class="btn btn-success" href="${siteList[i].url}" > <i class="fa-solid fa-eye"></i> visit</a></th>

                    <th><button onclick='deleteSite(${i});' class="btn btn-danger"><i class="fa-solid fa-trash"></i> delete</button>
</th>
                  </tr>
                </thead>
              </table>`
    }

    siteTableInput.innerHTML=string;
}


function deleteSite(deleteIndex){
    siteList.splice(deleteIndex,1)
    displaySite();
    localStorage.setItem('sites',JSON.stringify(siteList));

}

function validateSite(element){
    console.log(element.nextElementSibling);

    console.log(element.value,element.id);
    
    var regex={
        bookmarkeName:/^[a-z]{3,}$/,
        websiteUrl:/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    }
    
    if(regex[element.id].test(element.value)==true){
        element.classList.add('is-valid')
        element.classList.remove('is-invalid')
        element.nextElementSibling.classList.replace('d-block','d-none')


    }
    else{

element.classList.add('is-invalid')
element.classList.remove('is-valid')
element.nextElementSibling.classList.replace('d-none','d-block')


  }
}


btn.onclick = function() {
    if(siteNameInput.value===''&&siteUrlInput.value===''||siteNameInput.value==='' ||siteUrlInput.value===''){

    modal.style.display = "block";





    }
    else{
        addSite();
    }
  }
  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  



