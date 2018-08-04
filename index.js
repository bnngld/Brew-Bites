const punkURL = "https://api.punkapi.com/v2/beers";

function getData(userInput, callback) {
    const settings = {
      url: punkURL,
      data: {
        q: `${userInput} in: title`,
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
    return `
    <span class="js-thumbnail">
      <h3>${item.name}</h3>
      <ul>Food Pairing:
        <li>${item.food_pairing}</li>
    </ul>
    </span>
  `;
}

function displayPunkData(data) {
  const result = data.map((id, i) => displayResults(id));
  $('.js-search-results').append(result);
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