const punkURL = "https://api.punkapi.com/v2/beers";

function getData(userInput, callback) {
    const settings = {
      url: punkURL,
      data: {
        food: `${userInput}`,
        per_page: 5
      },
      dataType: 'JSON',
      type: 'GET',
      success: callback
    };
  console.log('success', callback);
    $.ajax(settings);
  }

  function displayResults(item) {
   const seachTerm = $('input').val(); 
   const matches = item.food_pairing.filter(s => s.includes(seachTerm));
    console.log(matches);
    return `
    <span class="js-thumbnail">
      <h3>${item.name}</h3>
      <h3>Food Pairing</h3>
        <button>${matches}</button>
    </span>
  `;
}

function displayPunkData(data) {
  const result = data.map((id, i) => displayResults(id));
  $('.js-search-results').html(result);
}

function userSubmit() {
  $('.js-search-form').on('submit', event => {
    event.preventDefault();
    const userInput = $('.js-query').val(); 
    $(this).val("");
    getData(userInput, displayPunkData);
  });
}

$(userSubmit);