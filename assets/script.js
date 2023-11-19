const queryOutputTextEl = document.getElementById("query-output-text");
const googleSearchBtn = document.getElementById("google-search-button");
const inputContainerEl = document.getElementById("input-container");
const addRowButtonEl = document.getElementById("add-row-button");

let allRemoveBtnEl = document.querySelectorAll(".remove-btn");
let allTextInputEl = document.querySelectorAll(".dork-input");
let allSelectInputEl = document.querySelectorAll("select");

// create input row div
const getNewInputRowEl = () => {
   const inputRowEl = document.createElement("div");
   inputRowEl.setAttribute("class", "node row mb-4 mx-4");
   inputRowEl.innerHTML = `
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
   <div class="form-floating col me-1 gx-1">
      <input class="dork-input form-control text-black" type="text" value="">
      <label>Text</label>
   </div>
   <button type="button" class="btn btn-danger px-auto col-1 remove-btn">-</button>`;

   return inputRowEl;
}

// create input AND OR selector
const getNewAndOrSelectorEl = () => {
   const inputAndOrSelectorEl = document.createElement("div");
   inputAndOrSelectorEl.setAttribute("class", "row form-floating mx-4 mb-4 gx-1");
   inputAndOrSelectorEl.innerHTML = `
   <select class="node operator form-select text-center">
      <option selected></option>
      <option value="&">& (AND)</option>
      <option value="|">| (OR)</option>
   </select>
   <label>Operator</label>`;

   return inputAndOrSelectorEl;
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
   })
}

const updateOutput = () => {
   let output = "";
   let nodes = document.querySelectorAll(".node");
   for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      let nodeOutput = "";
      if (node.classList.contains("row")) {
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

/*

' = %27
\ = %5C
/ = %2F


*/