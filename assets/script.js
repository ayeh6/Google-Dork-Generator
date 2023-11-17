const queryOutputTextEl = document.getElementById("query-output-text");
const inputContainerEl = document.getElementById("input-container");
const addRowButtonEl = document.getElementById("add-row-button");

let allRemoveBtnEl = document.querySelectorAll(".remove-btn");
let allTextInputEl = document.querySelectorAll(".dork-input");
let allSelectInputEl = document.querySelectorAll("select");

const getNewInputRowEl = () => {
   // create input row div
   const inputRowEl = document.createElement("div");
   inputRowEl.setAttribute("class", "node row mb-2 mx-5");
   inputRowEl.innerHTML = `
   <select class="form-select col me-1">
      <option value="" selected></option>
      <option value="+">+ (include)</option>
      <option value="-">- (exclude)</option>
   </select>
   <select class="form-select col me-1" aria-label="Filter select">
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
   <input class="dork-input form-control text-black col me-1" type="text" value="">
   <button type="button" class="btn btn-danger px-auto col-1 remove-btn">-</button>`;

   return inputRowEl;
}

const getNewAndOrSelectorEl = () => {
   // create input AND OR selector
   const inputAndOrSelectorEl = document.createElement("div");
   inputAndOrSelectorEl.setAttribute("class", "row mx-5 mb-2");
   inputAndOrSelectorEl.innerHTML = `
   <select class="node operator form-select text-center">
      <option selected></option>
      <option value="&">& (AND)</option>
      <option value="|">| (OR)</option>
   </select>`;

   return inputAndOrSelectorEl;
}

const findAllRemoveBtnEl = () => {
   console.log("finding all buttons");
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
   })
}

const updateOutput = () => {
   let output = "";
   let nodes = document.querySelectorAll(".node");
   for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      let nodeOutput = "";
      if (node.classList.contains("row")) {
         console.log(node.children[0].value);
         let excIncOp = node.children[0].value;
         let filter = (node.children[1].value == "") ? "" : node.children[1].value + ":";
         let text = node.children[2].value;
         nodeOutput = excIncOp + filter + text;
      }
      if (node.classList.contains("operator")) {
         nodeOutput = node.value + " ";
      }
      output += (output == "" || i == nodes.length-1) ? nodeOutput : " " + nodeOutput;
   }
   queryOutputTextEl.value = output;
}

const addRow = () => {
   let lastChild = inputContainerEl.lastElementChild;

   const newInputRowEl = getNewInputRowEl();
   const newInputAndOrSelectorEl = getNewAndOrSelectorEl();

   inputContainerEl.insertBefore(newInputAndOrSelectorEl, lastChild);
   inputContainerEl.insertBefore(newInputRowEl, lastChild);
   findAllRemoveBtnEl();
   findAllInputEl();
   findAllSelectEl();
}

const removeRow = (elem) => {
   const row = elem.target.parentNode;
   const andOrOperatorEl = row.previousElementSibling;

   row.remove();
   andOrOperatorEl.remove();

   updateOutput();
}

const copyOutput = () => {
   navigator.clipboard.writeText(queryOutputTextEl.value);
}

const initialize = () => {
   findAllRemoveBtnEl();
   findAllInputEl();
   findAllSelectEl();
}

addRowButtonEl.addEventListener("click", addRow);
queryOutputTextEl.addEventListener("click", copyOutput);

initialize();