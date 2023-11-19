const queryOutputTextEl = document.getElementById("query-output-text");
const googleSearchBtn = document.getElementById("google-search-button");
const inputContainerEl = document.getElementById("input-container");
const addRowButtonEl = document.getElementById("add-row-button");

let allRemoveBtnEl = document.querySelectorAll(".remove-btn");
let allTextInputEl = document.querySelectorAll(".dork-input");
let allSelectInputEl = document.querySelectorAll("select");

const getNewInputRowsEl = () => {
   const inputRowsEl = document.createElement("div");
   inputRowsEl.setAttribute("class", "row mx-1 mb-4");
   inputRowsEl.innerHTML = `
   <div class="col me-3">
      <div class="row mb-2">
         <div class="form-floating gx-1">
            <select class="node operator form-select text-center">
               <option selected></option>
               <option value="&">& (AND)</option>
               <option value="|">| (OR)</option>
            </select>
            <label>Operator</label>
         </div>
      </div>
      <div class="node filter row form-floating">
         <div class="form-floating col me-1 gx-1">
            <select class="form-select">
               <option value="" selected></option>
               <option value="+">+ (include)</option>
               <option value="-">- (exclude)</option>
            </select>
            <label>Include/Exclude</label>
         </div>
         <div class="form-floating col me-1 gx-1">
            <select class="form-select">
               <option selected></option>
               <option value="allintext">allintext</option>
               <option value="intext">intext</option>
               <option value="allinurl">allinurl</option>
               <option value="inurl">inurl</option>
               <option value="allintitle">allintitle</option>
               <option value="intitle">intitle</option>
               <option value="allinanchor">allinanchor</option>
               <option value="inanchor">inanchor</option>
               <option value="site">site</option>
               <option value="filetype">filetype</option>
               <option value="link">link</option>
               <option value="related">related</option>
               <option value="cache">cache</option>
            </select>
            <label>Filter</label>
         </div>
         <div class="form-floating col gx-1">
            <input class="dork-input form-control text-black" type="text" value="">
            <label>Text</label>
         </div>
      </div>
   </div>
   <button type="button" class="btn btn-danger remove-btn col-1">-</button>`;
   return inputRowsEl;
}

const findAllRemoveBtnEl = () => {
   allRemoveBtnEl = document.querySelectorAll(".remove-btn");
   allRemoveBtnEl.forEach(button => {
      button.addEventListener("click", removeRow);
   });
}

const findAllInputEl = () => {
   allTextInputEl = document.querySelectorAll(".dork-input");
   allTextInputEl.forEach(input => {
      input.addEventListener("keyup", updateOutput);
   });
}

const findAllSelectEl = () => {
   allSelectInputEl = document.querySelectorAll("select");
   allSelectInputEl.forEach(select => {
      select.addEventListener("change", updateOutput);
   });
}

const updateOutput = () => {
   console.log("updating!");
   let output = "";
   let nodes = document.querySelectorAll(".node");
   console.log(nodes);
   for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      let nodeOutput = "";
      if (node.classList.contains("filter")) {
         let excIncOp = node.children[0].children[0].value;
         let filter = (node.children[1].children[0].value == "") ? "" : node.children[1].children[0].value + ":";
         let text = node.children[2].children[0].value;
         nodeOutput = excIncOp + filter + text + " ";
      }
      if (node.classList.contains("operator")) {
         nodeOutput = (node.value != "") ? node.value + " " : "";
      }
      output += nodeOutput;
   }
   output = output.substring(0, output.length - 1);
   queryOutputTextEl.textContent = output;
   let outputURIEncoded = encodeURIComponent(output);
   googleSearchBtn.setAttribute("href","https://www.google.com/search?q=" + outputURIEncoded);
}

const addRows = () => {
   let lastChild = inputContainerEl.lastElementChild;

   const inputRowsEl = getNewInputRowsEl();
   inputContainerEl.insertBefore(inputRowsEl, lastChild);

   findAllRemoveBtnEl();
   findAllInputEl();
   findAllSelectEl();
}

const removeRow = (event) => {
   const row = event.target.parentNode;
   row.remove();
   updateOutput();
}

const copyOutput = () => {
   navigator.clipboard.writeText(queryOutputTextEl.textContent);
}

const initialize = () => {
   findAllRemoveBtnEl();
   findAllInputEl();
   findAllSelectEl();
}

addRowButtonEl.addEventListener("click", addRows);
queryOutputTextEl.addEventListener("click", copyOutput);

initialize();