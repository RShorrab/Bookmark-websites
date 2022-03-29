var webNameInput = document.getElementById("webNameInput");
var webURLInput = document.getElementById("webURLInput");
var addBtn = document.getElementById("addBtn");
var inputs = document.getElementsByClassName("form-control");
var searchBar = document.getElementById("searchBar");
var urlAlert = document.getElementById("urlAlert");
var displayDiv = document.getElementById("displayDiv");
var webSites = [];
var updIndex;


if(JSON.parse(localStorage.getItem("Websites")) != null)
{
    webSites = JSON.parse(localStorage.getItem("Websites"));
    display();
}
if(display() == true) //check if the table has items to display
{
    displayDiv.classList.remove("d-none");
}

addBtn.onclick = function()
{
    if(addBtn.innerHTML == "Bookmark")
    {
        bookmark();
    }
    else
    {
        editSite();
    }
    displayDiv.classList.remove("d-none");
    display();
    clearInputs();
}

function bookmark()
{
    if(webURLInput.onkeyup() == true && webNameInput.value != null && webNameInput.value != '')
    {
        var website =
        {
            siteName: webNameInput.value,
            siteURL: webURLInput.value
        }
        webSites.push(website);
        localStorage.setItem("Websites", JSON.stringify(webSites));
    }
    else
    {
        alert("You should enter the website name!")
        addBtn.disabled="true";
    }
}
function display()
{
    var trs='';
    for(var i=0; i < webSites.length; i++)
    {
        trs+= `<tr>
                <td> ${webSites[i].siteName} </td>
                <td> <button onClick=" visitSite(webSites[${i}].siteURL)" class="btn btn-transparent shadow-none"> <i class="fas fa-globe fs-5 text-success"></i> </button> </td>
                <td> <button onclick="updateSite(${i})" class="btn btn-transparent shadow-none"> <i class="fas fa-edit fs-5 text-black-50"></i> </button>
                <td> <button onClick="deleteSite(${i})" class="btn btn-transparent shadow-none"> <i class="fas fa-trash-alt fs-5 text-danger"></i> </button> </td>
            </tr>`
    }
    if(trs == '')
    {
        displayDiv.classList.add("d-none");
        return false;
    }

    document.getElementById("tableBody").innerHTML = trs;
    return true;
}
function clearInputs()
{
    for(var i=0; i<inputs.length; i++)
    {
        inputs[i].value = "";
        inputs[i].classList.remove("is-invalid");
        inputs[i].classList.remove("is-valid");
        urlAlert.classList.add("d-none");
    }
}
function visitSite(url)
{
    window.location.href = url;
}
function deleteSite(index)
{
    webSites.splice(index,1);
    localStorage.setItem("Websites", JSON.stringify(webSites));
    display();
}
function updateSite(index) //to display site data in the inputs
{
    updIndex=index; //to be seen by other functions
    addBtn.innerHTML="Update Site";
    webNameInput.value = webSites[index].siteName;
    webURLInput.value = webSites[index].siteURL;
    addBtn.removeAttribute("disabled");
}
function editSite() //actual editing func.
{
    if(webURLInput.onkeyup() == true && webNameInput.value != null && webNameInput.value != '')
    {
        webSites[updIndex]=
        {
            siteName: webNameInput.value,
            siteURL: webURLInput.value
        }
        localStorage.setItem("Websites", JSON.stringify(webSites));
        addBtn.innerHTML="Bookmark";
        addBtn.disabled="true";
    }
    else
    {
        alert("check your inputs!")
        addBtn.disabled="true";
    }
}
searchBar.onkeyup = function()
{
    var trs='';
    var val = searchBar.value;
    for(var i=0; i<webSites.length; i++)
    {
        if(webSites[i].siteName.toLowerCase().includes(val.toLowerCase()))
        {
            trs+= `<tr>
                <td> ${webSites[i].siteName} </td>
                <td> <button onClick=" visitSite(webSites[${i}].siteURL)" class="btn btn-transparent shadow-none"> <i class="fas fa-globe fs-5 text-success"></i> </button> </td>
                <td> <button onclick="updateSite(${i})" class="btn btn-transparent shadow-none"> <i class="fas fa-edit fs-5 text-black-50"></i> </button>
                <td> <button onClick="deleteSite(${i})" class="btn btn-transparent shadow-none"> <i class="fas fa-trash-alt fs-5 text-danger"></i> </button> </td>
            </tr>`
        }
    }
    document.getElementById("tableBody").innerHTML=trs;
}

webURLInput.onkeyup = function() //site URL verification
{
    var URLregex = /[A-Z|a-z]{2,10}[a-z|\W|1-9]{0,10}[.][a-z|.|\W|1-9]{1,10}$/
    if(!URLregex.test(webURLInput.value))
    {
        webURLInput.classList.add("is-invalid");
        webURLInput.classList.remove("is-valid");
        urlAlert.classList.remove("d-none");
        addBtn.disabled="true";
        return false;
    }
    else
    {
        webURLInput.classList.add("is-valid");
        webURLInput.classList.remove("is-invalid");
        urlAlert.classList.add("d-none");
        addBtn.removeAttribute("disabled");
        return true;
    }
}