const punkURL = "https://api.punkapi.com/v2/beers";

function getPunkData(userInput, callback, displayBeerError) {
    const settings = {
      url: punkURL,
      data: {
        food: userInput,
        per_page: 5
      },
      dataType: 'JSON',
      type: 'GET',
      success: callback,
      error: displayBeerError
    };
    $.ajax(settings);
  }

 const foodURL = "https://api.edamam.com/search";

 function getFoodData(buttonVal, callback) {
    const settings = {
      url: foodURL,
      data: {
        q: buttonVal,
        app_id: 'c03f1683',
        app_key: '7bdba1c44d81525c792ad78924b3a87a',
        per_page: 1
      },
      dataType: 'JSON',
      type: 'GET',
      success: callback,
      error: function(){
        $('.js-beer-error').prop('hidden', false);
      }
      
    };
    $.ajax(settings);
  }

function displayPunkResults(item) {
    const searchTerm = $('input').val(); 
    const matches = item.food_pairing.filter(x => x.toLowerCase().includes(`${searchTerm}`));
     return `
     <h4 class="js-accordion">${item.name}</h4>
      <article class="js-panel" aria-live="assertive" hidden>
        <p>${item.description}</p>
        <p>Food Pairing:</p>
        ${matches.map(match => `<button class="js-button">${match}</button>`).join("")}
      </article>
   `;}
 

function displayPunkData(data) {
  const result = data.map((beer, i) => displayPunkResults(beer));
  $('.js-search-results').html(result);
}

function onButtonClick(){
    $('.js-search-results').on('click', '.js-button', function() {
        const buttonVal = $(this).html();
        getFoodData(buttonVal);
    });
}


function userSubmit() {
  $('.js-search-form').on('submit', event => {
    event.preventDefault();
    const userInput = $('.js-query').val(); 
    $(this).val("");
    getPunkData(userInput, displayPunkData);
  });
}

function panelButton(){
  $('.js-search-results').on('click', '.js-accordion', function(){
    $(this).next().toggle();
    $('.js-panel').not($(this).next()).hide();
  });
}

function renderPage(){
  userSubmit();
  onButtonClick();
  panelButton();
}

$(renderPage);