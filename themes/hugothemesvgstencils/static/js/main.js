
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
  fetch(url)
    .then(res =>  res.json())
    .then((out) => {

      const start = async () => {
        await asyncForEach(out.components, async (c) => {
          if(out.base_url){
            svgcomp = out.base_url + c;
          }
          else{
            svgcomp = c;
          }

          components.push('<div class="overflow-hidden"> <div class="aspect-w-16 aspect-h-10"> <img src="'+svgcomp+'" alt="Blog post image" class="object-cover w-full h-full rounded-lg shadow-md"> </div> </div>');

        });
        document.getElementById("selectedLib").innerHTML = components.join("\n");
        document.getElementById("stencilLibTitle").innerHTML = out.name;
      }
      start();

    })
    .catch(err => { throw err });
}

function ready() {
  selectChanged();
}
document.addEventListener("DOMContentLoaded", ready);
