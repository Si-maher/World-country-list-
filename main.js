// ADD CONST
const searchBox = document.querySelector(".search-box");
const buttons = document.querySelector(".buttons");
const resultSection = document.querySelector(".result-section");
const subTitle = document.querySelector('.sub-title')
subTitle.textContent = `Currently, there are ${countriesObject.length} countries`
// ======================
// EVENT LISTENER FOR SEARCHBOX
searchBox.addEventListener("keyup", function (element) {
  let searchTerm = element.target.value.toUpperCase()
  showCountries(search(countriesObject, searchTerm))
  const count = document.querySelectorAll('.country-wrapper')
  subTitle.textContent = `Currently, there are ${count.length} countries`
});
// EVENT LISTERNER FOR BUTTONS
buttons.addEventListener("click", function (element) {
  console.log(element.target.className);
  if (element.target.className.includes("sort-by-name")) {

  } else if (element.target.className.includes("sort-by-language")) {
    console.log("button2");
  } else {
    console.log("button3");
  }
});
// ====================
// CREATE A FUNCTION THAT SEARCHES BY ANY CHARACTER
function search(arr, keysearch) {
  const searchResult = arr.filter(function (element) {
    let { name, capital, languages } = element
    let isName = name.toUpperCase().includes(keysearch)
    let isCapital = capital.toUpperCase().includes(keysearch)
    let isLanguages = languages.join().toUpperCase().includes(keysearch)
    return isName || isCapital || isLanguages
  })
  // IF STATEMENT TO CLEAR UI WHEN SEARCHBOX IS EMPTY
  if (searchBox.value === '') {
    resultSection.style.display = 'none'
  } else {
    resultSection.style.display = 'flex'
  }
  return searchResult
}
// ====================
// CREATE DIVS FOR CONTENT

function generateContent(object) {
  let { name, capital, languages, population, flag, currency } = object;
  return `<div class = "country-wrapper">
  
  <img src ="${flag}">
  <p>${name}</p>
  <p>${capital}</p>
  <p>${languages}</p>
  <p>${population}</p>
  <p>${currency}</p>
  </div>`;

}
function showCountries(array) {
  let contents = ''
  resultSection.innerHTML = ''
  array.forEach(function (element) {
    contents += generateContent(element)

  })
  resultSection.innerHTML = contents

}



