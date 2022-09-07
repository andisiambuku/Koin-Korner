

//function for the search feature
function searchData(){
    const currentURL =window.location.href;
    const url_obj = new URL(currentURL);
    const params = new URLSearchParams(url_obj.search);
    if(!params.has('q')){
        return;
    }
    document.getElementsByName('q')[0].value = params.get('q');
    fetch('https://api.coingecko.com/api/v3/search?query='+ params.get('q'))
    .then(resp => resp.json())
    .then(render);
}
function render(data){
    for(let i=0;i<data.coins.length;i++){
        const singleCoin = data.coins[i];
        console.log(singleCoin);
        const index = i +1;
        const logo = singleCoin.thumb;
        const name = singleCoin.name;
        const symbol = singleCoin.symbol;
        const coinId = singleCoin.id;
        createSingleCard(index, logo, name, symbol, coinId);
    }
}

function createSingleCard(index, logo, name, symbol, coinId){
    const id_elem = document.createElement('p');
    if(index<10){
        index = index + "&nbsp;&nbsp;";
    }
    id_elem.innerHTML=index;

    const logo_elem = document.createElement('img');
    logo_elem.src=logo;
    logo_elem.alt='Coin Logo';

    const name_elem = document.createElement('h3');
    name_elem.innerText=name;

    const symbol_elem = document.createElement('h3');
    symbol_elem.innerText=symbol;

    const anchor_elem = document.createElement('a');
    anchor_elem.innerText="More Info";
    anchor_elem.href="#" + coinId;

    const container_elem = document.createElement('div');
    container_elem.classList.add('single-search-result','card');
    container_elem.appendChild(id_elem);
    container_elem.appendChild(logo_elem);
    container_elem.appendChild(name_elem);
    container_elem.appendChild(symbol_elem);
    container_elem.appendChild(anchor_elem);

    document.getElementById('search-results').appendChild(container_elem);
}

//function for coin data
function marketData(){
    // const currentURL =window.location.href;
    return fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    
    .then(res=>res.json())
    .then(data=>display(data));
    
}
function display(data){   
     for(let i=0;i<data.length;i++){
        const oneCoin = data[i];
        console.log(oneCoin);
        const index = i +1;
        const logo = oneCoin.image;
        const name = oneCoin.name;
        const symbol = oneCoin.symbol;
        const market_cap= oneCoin.market_cap;
        const current_price=oneCoin.current_price;
        const price_change = oneCoin.price_change_percentage_24h.toFixed(1)
        
        createCoinCard(index, logo, name, symbol, market_cap,current_price,price_change);
        
    }
          
}
function createCoinCard(index, logo, name, symbol, market_cap,current_price,price_change){
    const id_element = document.createElement('p');
    if(index<10){
        index = index + "&nbsp;&nbsp;";
    }
    id_element.innerHTML=index;

    const logo_element = document.createElement('img');
    logo_element.src=logo;
    logo_element.alt='Coin Logo';

    const name_element = document.createElement('h3');
    name_element.innerText= name;

    const symbol_element = document.createElement('h3');
    symbol_element.innerText=symbol;

    const current_price_element = document.createElement('h3');
    current_price_element.innerText= "$" + current_price;
   
    const market_cap_element = document.createElement('h3');
    market_cap_element.innerText= "$" + market_cap;

    const price_change_element = document.createElement('h3');
    price_change_element.innerText=price_change + "%";

    const likerButton = document.createElement('button');
    likerButton.innerHTML="	&#11088;";
    likerButton.onclick= function(){
        alert("Liked");
    }

    const container_element = document.createElement('div');
    container_element.classList.add('single-market-data','card');
    container_element.appendChild(id_element);
    container_element.appendChild(logo_element);
    container_element.appendChild(name_element);
    container_element.appendChild(symbol_element);
    container_element.appendChild(current_price_element);
    container_element.appendChild(market_cap_element);
    container_element.appendChild(price_change_element);
    container_element.appendChild(likerButton);
    
    document.getElementById('search-results').appendChild(container_element);
}

window.onload = function(){
    searchData();
    marketData();
}
 