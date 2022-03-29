
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

function selectChanged(){
  url = document.getElementById("stencilLibs").value;
  openLib(url);
}

function openinfo(){
        document.getElementById("stencil-info").classList.remove("hidden");
}
function closeinfo(){
        document.getElementById("stencil-info").classList.add("hidden");
}

function openLib(url){
  let svgcomp = "";
  let components = [];
  let imagecelltpl = document.getElementById("imgcelltpl").innerHTML;

  fetch(url + "/stencil-meta.json")
    .then(res =>  res.json())
    .then((out) => {
      document.getElementById("stencilLibTitle").innerHTML = out.name;
      document.getElementById("stencil-name").innerHTML = out.name;

      if(out.author){
        document.getElementById("stencil-author").innerHTML = "Author: " + out.author;
        document.getElementById("stencil-author").classList.remove("hidden");
      }
      else{
        document.getElementById("stencil-author").classList.add("hidden");
      }

      console.log(out)
      if(out.homepage){
        document.getElementById("stencil-homepage").innerHTML = 'Homepage: <a  class="text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out" target="_blank" href="' + out.homepage +'">'+out.homepage+'</a>';
        document.getElementById("stencil-homepage").classList.remove("hidden");
      }
      else{
        document.getElementById("stencil-author").classList.add("hidden");
      }

      if(out.license){
        document.getElementById("stencil-license").innerHTML = '<a target="_blank" class="text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out" href="' + out.license +'">License</a>';
        document.getElementById("stencil-license").classList.remove("hidden");
      }
      else{
        document.getElementById("stencil-author").classList.add("hidden");
      }

      if(out.description){
        document.getElementById("stencil-description").innerHTML = out.description;
        document.getElementById("stencil-description").classList.remove("hidden");
      }
      else{
        document.getElementById("stencil-author").classList.add("hidden");
      }


    })
    .catch(err => { throw err });


  fetch(url + "/stencil-components.json")
    .then(res =>  res.json())
    .then((out) => {

      const start = async () => {
        await asyncForEach(out.components, async (c) => {
          svgcomp = url+"/"+c;
          components.push(imagecelltpl.replace("SVGCOMP", svgcomp));
        });
        document.getElementById("selectedLib").innerHTML = components.join("\n");
      }
      start();

    })
    .catch(err => { throw err });
}

function ready() {
  selectChanged();
}

document.addEventListener("DOMContentLoaded", ready);
