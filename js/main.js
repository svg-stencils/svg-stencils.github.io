
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
          components.push('<div class="overflow-hidden"> <div class="aspect-w-16 aspect-h-10"> <img src="'+svgcomp+'" class="object-cover w-full h-full rounded-lg shadow-md"> </div> </div>');
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
