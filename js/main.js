async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

function toggleCanvas(){
  var toggleCanvas = document.getElementById("toggleCanvas").checked;
  if(toggleCanvas === true){
    document.getElementById("componentsListing").classList.add("hidden");
    document.getElementById("componentsCanvas").classList.remove("hidden");
  }
  else{
    document.getElementById("componentsCanvas").classList.add("hidden");
    document.getElementById("componentsListing").classList.remove("hidden");
  }

}

function selectChanged(){
  var url = document.getElementById("stencilLibs").value;
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
  let componentsInListing = [];
  let componentsInCanvas = [];
  let imagecelltpl = document.getElementById("imgcelltpl").innerHTML;
  let imagecelltpl2 = document.getElementById("imgcelltpl2").innerHTML;

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

  var zoomfactor = 1

  fetch(url + "/stencil-components.json")
    .then(res =>  res.json())
    .then((out) => {

      const start = async () => {
        await asyncForEach(out.components, async (c) => {
          svgcomp = url+"/"+c;
          componentsInListing.push(imagecelltpl.replace("SVGCOMP", svgcomp));

          if(out.components_data && out.components_data[c]){
            var tmpcell = Object.assign(imagecelltpl2);
            var width = out.components_data[c].right - out.components_data[c].left
            componentsInCanvas.push(tmpcell.replace("SVGCOMP", svgcomp).replace("SVGSTYLE", "xwidth:"+width+"px;xheight:30px;position:absolute;top:"+out.components_data[c].top+"px;left:"+out.components_data[c].left+"px;"));
            document.getElementById("canvasToolBar").classList.remove("hidden");
          }
          else{
            document.getElementById("toggleCanvas").checked = false;
            toggleCanvas();
            document.getElementById("canvasToolBar").classList.add("hidden");
          }

        });
        document.getElementById("componentsListing").innerHTML = componentsInListing.join("\n");
        document.getElementById("componentsCanvas").innerHTML = componentsInCanvas.join("\n");
      }
      start();

    })
    .catch(err => { throw err });
}

function ready() {
  selectChanged();
}

document.addEventListener("DOMContentLoaded", ready);
