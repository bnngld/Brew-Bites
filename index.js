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

  function displayPunkResults(item) {
    const searchTerm = $('input').val(); 
    const matches = item.food_pairing.filter(x => x.toLowerCase().includes(`${searchTerm}`));
     return `
     <section class="js-beer-list">
       <h3>${item.name}</h3>
       <h4>Food Pairing</h4>
         <ul>
         ${matches
          .map(match => `<li><button class="js-button">${match}</button></li>`)
          .join("")}
         </ul>
     </section>
   `;}
 

function displayPunkData(data) {
  const result = data.map((beer, i) => displayPunkResults(beer));
  $('.js-search-results').html(result);
}

function onButtonClick(){
    $('.js-search-results').on('click', '.js-button', event => {
        event.preventDefault();
        const buttonVal = $('.js-button').html();
        console.log($(this).attr('id'));
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