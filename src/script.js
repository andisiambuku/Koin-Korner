

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
    .then(data=>displayTable(data));
    
}

function displayTable(data){
    const $resultsTable = document.getElementById('market-data-table')

    data.forEach((element,index) =>{
        renderRow(element,index)
    })

    function renderRow(element,position){
       const {image, name, symbol, market_cap, current_price, price_change_percentage_24h} =element

    // first row is taken up by the headers
    // insert a new row based on the index to the table element
    const row = $resultsTable.insertRow(position + 1)
    // each cell inserted corresponds to a row 
    const numberCell = row.insertCell(0)
    const imageCell = row.insertCell(1)
    const nameCell = row.insertCell(2)
    const symbolCell = row.insertCell(3)
    const currentPriceCell =  row.insertCell(4)
    const marketCapPriceCell = row.insertCell(5)
    const priceChangeCell = row.insertCell(6)
    const likerCell = row.insertCell(7)

    const logoElement = document.createElement('img')
    logoElement.src = image;
    logoElement.alt = 'Coin-Logo';

    const likerButton = document.createElement('button');
    likerButton.innerHTML="	&#11088;";
    likerButton.onclick= function(){
        alert("Liked");
    }

    
    numberCell.innerText = position + 1
    imageCell.appendChild(logoElement)
    nameCell.innerText = name.toUpperCase()
    symbolCell.innerText = symbol.toUpperCase()
    currentPriceCell.innerText = `$${current_price.toFixed(2)}`
    marketCapPriceCell.innerText = `$${market_cap.toFixed(2)}`
    priceChangeCell.innerText = `${price_change_percentage_24h.toFixed(2)}%`
    likerCell.appendChild(likerButton)
    }
}
  

window.onload = function(){
    searchData();
    marketData();
}
 