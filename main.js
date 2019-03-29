// ADD CONST
const searchBox = document.querySelector(".search-box");
const buttons = document.querySelector(".buttons");
const resultSection = document.querySelector(".result-section");
const subTitle = document.querySelector('.sub-title')
const storedCountries = countriesObject
subTitle.textContent = `Currently, there are ${countriesObject.length} countries`
let clickState = 0;
// ======================
// EVENT LISTENERS FOR SEARCHBOXES
searchBox.addEventListener("keyup", function (element) {
  let searchTerm = element.target.value.toUpperCase()
  showCountries(search(countriesObject, searchTerm))
  const count = document.querySelectorAll('.country-wrapper')
  subTitle.textContent = `Currently, there are ${count.length} countries`
});
// EVENT LISTERNER FOR BUTTONS
buttons.addEventListener("click", function (element) {
  console.log(element.target.className);
  if (element.target.classList.contains("sort-by-A-Z")) {
    element.target.classList.toggle('selected')
    sortByAz()
  } else if (element.target.classList.contains("sort-by-capital")) {
    console.log("button2");
    element.target.classList.toggle('selected')
    sortByCapital()
  } else if (element.target.classList.contains('sort-by-population')) {
    element.target.classList.toggle('selected')
    console.log("button3")
    sortByPopulation()
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
  return searchResult
}
// ====================
// CREATE A FUNCTION THAT REVERSES THE RESULT
function sortByAz() {
  if (clickState == 0) {
    let test = storedCountries.sort((a, b) => {
      if (a.name > b.name) {
        return -1
      }
    })
    showCountries(search(test, searchBox.value.toUpperCase()))
    clickState = 1
  } else {
    test = storedCountries.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      }
    })
    showCountries(search(test, searchBox.value.toUpperCase()))
    clickState = 0
  }
}

function sortByCapital() {
  if (clickState == 0) {
    let test = storedCountries.sort((a, b) => {
      if (a.capital > b.capital) {
        return -1
      }
    })
    showCountries(search(test, searchBox.value.toUpperCase()))
    clickState = 1
  } else {
    test = storedCountries.sort((a, b) => {
      if (a.capital < b.capital) {
        return -1
      }
    })
    showCountries(search(test, searchBox.value.toUpperCase()))
    clickState = 0
  }
}
// function reverse(arr) {
//   showCountries(search(arr.sort().reverse(), searchBox.value.toUpperCase()))
// }
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
// ==================
// CREATE A FUNCTION THAT GENERATES THE CONTENT
function showCountries(array) {
  let contents = ''
  resultSection.innerHTML = ''
  array.forEach(function (element) {
    contents += generateContent(element)
  })
  resultSection.innerHTML = contents
}
showCountries(search(countriesObject, searchBox.value))
// ===================
// CREATE FUNCTION THAT SORTS BY POPULATION
function sortByPopulation() {
  if (clickState == 0) {
    let test = storedCountries.sort((a, b) => {
      if (a.population > b.population) {
        return -1
      }
    })
    showCountries(search(test, searchBox.value.toUpperCase()))
    clickState = 1
  } else {
    test = storedCountries.sort((a, b) => {
      if (a.population < b.population) {
        return -1
      }
    })
    showCountries(search(test, searchBox.value.toUpperCase()))
    clickState = 0
  }
}