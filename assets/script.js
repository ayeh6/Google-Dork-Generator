const inputContainerEl = document.getElementById("input-container");
const addRowButtonEl = document.getElementById("add-row-button");

const getNewInputRowEl = () => {
   // create input row div
   const inputRowEl = document.createElement("div");
   inputRowEl.setAttribute("class", "row mb-2 mx-5");
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
   <input class="form-control text-black col me-1" type="text" value="">
   <button type="button" class="btn btn-danger px-auto col-1">-</button>`;
   return inputRowEl;
}

const getNewAndOrSelectorEl = () => {
   // create input AND OR selector
   const inputAndOrSelectorEl = document.createElement('div');
   inputAndOrSelectorEl.setAttribute("class", "row mx-5 mb-2");
   inputAndOrSelectorEl.innerHTML = `
   <select class="form-select text-center">
      <option selected></option>
      <option value="&">& (AND)</option>
      <option value="|">| (OR)</option>
   </select>`;
   return inputAndOrSelectorEl;
}

const addRow = () => {
   let lastChild = inputContainerEl.lastElementChild;
   console.log(lastChild);
   const newInputRowEl = getNewInputRowEl();
   const newInputAndOrSelectorEl = getNewAndOrSelectorEl();
   inputContainerEl.insertBefore(newInputAndOrSelectorEl, lastChild);
   inputContainerEl.insertBefore(newInputRowEl, lastChild);
}

addRowButtonEl.addEventListener('click', addRow);