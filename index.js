const urlBase = "https://api.punkapi.com/v2/beers";
const filterABV = document.getElementById('filterABV');
let optionABV ='';

// fliters
fliterABV.addEventListener('change', e =>{
    const value =e.target.value;

    switch (value){
        case "all":
            optionABV="";
            break
        case "weak":
            optionABV="abv_lt=4.6";
            break
        case "medium":
            optionABV="abv_gt=4.5&abv_lt=7.6";
            break
        case "medium":
            optionABV="abv_gt=7.5";
            break
    }
});

async function getBeers() {
    const url = urlBase + "?" +optionABV;
    // fetch
    const beerPromise = await fetch(url);
    const beers = await beerPromise.json();

    // render data
    const beersDiv = document.querySelector('.beers');

    let beerHtml = "";

    beers.forEach(beer => {
       beerHtml += `
        <div class='beer-wrapper card'>
            <div class='beer'>
                <img class='beer__img' src="${beer.image_url}">
                <h3>${beer.name}</h3>
                <span class='beer__info'>
                    <span>ABV: ${beer.abv}%</span>
                    <span>IBU: ${beer.ibu}</span>
                </span>
            </div>
            <div class='beer__content'>
                <div class='beer__name'>${beer.name}</div>
                <div class='beer__tagline'>${beer.tagline}</div>
                <div class='beer__description'>${beer.description}</div>
                <div class='beer__food-pairing'>
                    Pair with: ${beer.food_pairing.join(', ')}
                </div>
            </div>
        </div>
       `;
    });

    beersDiv.innerHTML = beerHtml;
}

// initial get
getBeers();
