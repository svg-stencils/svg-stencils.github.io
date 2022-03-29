
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

function selectChanged(){
  url = document.getElementById("stencilLibs").value;
  openLib(url);
}
function openLib(url){
  let svgcomp = "";
  let components = [];
  let imagecelltpl = document.getElementById("imgcelltpl").innerHTML;

  fetch(url + "/stencil-meta.json")
    .then(res =>  res.json())
    .then((out) => {
      document.getElementById("stencilLibTitle").innerHTML = out.name;
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
