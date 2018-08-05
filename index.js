const punkURL = "https://api.punkapi.com/v2/beers";

function getPunkData(userInput, callback) {
    const settings = {
      url: punkURL,
      data: {
        food: userInput,
        per_page: 5
      },
      dataType: 'JSON',
      type: 'GET',
      success: callback
    };
  console.log('success', callback);
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
      success: callback
    };
  console.log('success', callback);
    $.ajax(settings);
  }

  function displayResults(item) {
   const searchTerm = $('input').val(); 
   const matches = item.food_pairing.filter(s => s.toLowerCase().includes(`${searchTerm}`));
   console.log(matches);
    return `
    <span class="js-beer-list">
      <h3>${item.name}</h3>
      <h4>Food Pairing</h4>
        <button class="js-button">${matches}</button>
    </span>
  `;
}

function displayPunkData(data) {
  const result = data.map((id, i) => displayResults(id));
  $('.js-search-results').html(result);
}

/*function displayFoodData(data) {
    const result = data.map((id, i) => displayResults(id));
    $('.js-search-results').html(result);
  }*/

function onButtonClick(){
    $('.js-search-results').on('click', '.js-button', event => {
        event.preventDefault();
        const buttonVal = $('.js-button').text();
        getFoodData(buttonVal);
    });
}

$(onButtonClick);

function userSubmit() {
  $('.js-search-form').on('submit', event => {
    event.preventDefault();
    const userInput = $('.js-query').val(); 
    $(this).val("");
    getPunkData(userInput, displayPunkData);
  });
}

$(userSubmit);