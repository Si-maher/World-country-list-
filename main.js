// ADD CONST
const searchBox = document.querySelector(".search-box");
const buttons = document.querySelector(".buttons");
const resultSection = document.querySelector(".result-section");
const subTitle = document.querySelector('.sub-title')
const storedCountries = countriesObject
subTitle.textContent = `Currently, there are ${countriesObject.length} countries`
let clickState = 0;
document.querySelector('.result-top-ten').style.display = 'none'
// ===================================================================================================
// EVENT LISTENER FOR SEARCHBOX
searchBox.addEventListener("keyup", function (element) {
  let searchTerm = element.target.value.toUpperCase()
  showCountries(search(countriesObject, searchTerm))
  const count = document.querySelectorAll('.country-wrapper')
  subTitle.textContent = `Currently, there are ${count.length} countries`
});
// =====================================================================================================
// EVENT LISTENER FOR BUTTONS
buttons.addEventListener("click", function (element) {
  console.log(element.target.className);
  if (element.target.classList.contains("sort-by-A-Z")) {
    element.target.classList.toggle('selected')
    sortByAz()
  } else if (element.target.classList.contains("sort-by-capital")) {
    element.target.classList.toggle('selected')
    sortByCapital()
  } else if (element.target.classList.contains('sort-by-population')) {
    element.target.classList.toggle('selected')
    sortByPopulation()
  }
});
// =====================================================================================================
// ADD EVENT LISTERN FOR MOST POPULATED AND MOST SPOKEN LANGUAGES
document.querySelector('.most-populated').addEventListener('click', function () {
  if (clickState === 0) {
    showCountriesPopulation(topTenPopulated)
    document.querySelector('.result-top-ten').style.display = 'block'
    clickState = 1
  } else {
    document.querySelector('.result-top-ten').style.display = 'none'
    clickState = 0
  }
})
// =============================================================
document.querySelector('.most-spoken').addEventListener('click', function () {
  if (clickState === 0) {
    document.querySelector('.result-top-ten').style.display = 'block'
    clickState = 1
  } else {
    document.querySelector('.result-top-ten').style.display = 'none'
    clickState = 0
  }
})
// ======================================================================================================
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
// ========================================================================================================
// CREATE A FUNCTION THAT REVERSES THE RESULTS OF SORT-BY-AZ, SORT-BY-CAPITAL,
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
// ==================================================================
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

// ===========================================================================================================
// CREATE A FUCNCTION THAT CREATES DIVS FOR THE RESULTS
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
// ==========================================================================================================
// CREATE A FUNCTION THAT GENERATES THE CONTENT FOR THE DIVS
function showCountries(array) {
  let contents = ''
  resultSection.innerHTML = ''
  array.forEach(function (element) {
    contents += generateContent(element)
  })
  resultSection.innerHTML = contents
}
showCountries(search(countriesObject, searchBox.value))
// ===========================================================================================================
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
// ==================================================================================================
// DESIGN A FUNCTION THAT SEARCHES AND COLLECTS ALL THE LANGUAGES
function mostSpokenLanguages(array) {
  let allLanguages = []
  array.forEach(element => {
    allLanguages.push(element.languages.join(", ")) /*turns the array into a string*/

  })
  console.log(allLanguages)
  // (250) ["Pashto, Uzbek, Turkmen", 
  // ========
  let joined = allLanguages.join(", ").split(", ")
  console.log(joined)
  // (368) ["Pashto", "Uzbek", "Turkmen",
  // ============
  let mySet = new Set(joined)
  console.log(mySet)
  // Set(112) {"Pashto", "Uzbek", "Turkmen",

  let myMap = new Map()
  for (let language of mySet) {
    let count = joined.filter(element => element === language)
    myMap.set(language, count.length)
  }
  console.log(myMap)



}
// ==================================================================================================

mostSpokenLanguages(countriesObject)
// Top ten population of the world
const populationArray = storedCountries.sort(function (a, b) {
  return b.population - a.population
})
console.log(populationArray)
// Grab the top ten countries
const topTenPopulated = populationArray.slice(0, 10);
console.log(topTenPopulated);

// population of the world

let count = 0
countriesObject.forEach(element => {
  count = count + element.population
})
const worldPopulation = count
console.log(worldPopulation)

// top 10 population content

const createPopulationContent = content => {
  const { name, population } = content
  let width = (population / worldPopulation) * 100
  return `
  <div class="container">
  <p class="toptenNames">${name}</p>
  <div class="population-bar" style="width: ${width}%">${population}</div>
  </div>`
}
const showCountriesPopulation = array => {
  let content = "";
  array.forEach((country, i) => {

    content = content + createPopulationContent(country)

  })
  document.querySelector('.test').innerHTML = content
}
