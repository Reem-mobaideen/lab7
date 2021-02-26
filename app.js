'use strict'
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
let hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm']

let shops = [];
function Location(locationName, minCustomer, maxCustomer, avgCookies) {
  this.locationName = locationName;
  this.minCustomer = minCustomer;
  this.maxCustomer = maxCustomer;
  this.avgCookies = avgCookies;
  this.customersEachHour = [];
  this.cookiesEachHour = [];
  this.totalCookies = 0;

  //console.log(this);
  shops.push(this);
}
Location.prototype.calcCustomersEachHour = function () {
  for (let i = 0; i < hours.length; i++) {
    this.customersEachHour.push(random(this.minCustomer, this.maxCustomer));
  }
}

  Location.prototype.calcCookiesEachHour = function () {
    for (let i = 0; i < hours.length; i++) {

      this.cookiesEachHour.push(Math.floor(this.customersEachHour[i] * this.avgCookies));
      this.totalCookies += this.cookiesEachHour[i]
    }
  }





  // console.log(shops);
  //seattle.customersEachHour();
  //seattle.cookiesEachHour();
  //console.log(shops);


//Location.prototype.render=function () {
//const parent = document.getElementById('salmon cookies');
let parent = document.getElementById('parent');

console.log(parent);

let table = document.createElement('table');
parent.appendChild(table)
//console.log(parent);

function makeHeader() {
  let headerRow = document.createElement('tr');
  table.appendChild(headerRow);

  let firstTh = document.createElement('th');
  firstTh.textContent = '';
  headerRow.appendChild(firstTh);

  for (let i = 0; i < hours.length; i++) {
    let thElement = document.createElement('th');
    headerRow.appendChild(thElement);

    thElement.textContent = hours[i];
  }
  let lastTh = document.createElement('th');
  lastTh.textContent = 'Daily location total';
  headerRow.appendChild(lastTh);
}

Location.prototype.render = function () {
  let dataRow = document.createElement('tr');
  table.appendChild(dataRow);

  let nameData = document.createElement('td');
  dataRow.appendChild(nameData);
  nameData.textContent = this.locationName;

  for (let i = 0; i < hours.length; i++) {
    let tdElement = document.createElement('td');
    tdElement.textContent = this.cookiesEachHour[i];
    dataRow.appendChild(tdElement);
  }

  let totalDataForEachShop = document.createElement('td');
  dataRow.appendChild(totalDataForEachShop);
  totalDataForEachShop.textContent = this.totalCookies;
}

let makeFooter = function () {
  let footerRow = document.createElement('tr');
  table.appendChild(footerRow);

  let footerTh = document.createElement('th');
  footerRow.appendChild(footerTh);
  footerTh.textContent = 'Totals';

  let totalOfTotal = 0;

  for (let i = 0; i < hours.length; i++) {
    let totalEachHour = 0;

    for (let j = 0; j < shops.length; j++) {
      console.log(shops[j]);
      totalEachHour += shops[j].cookiesEachHour[i];
      totalOfTotal+=shops[j].cookiesEachHour[i];
    }
    footerTh = document.createElement('th');
    footerRow.appendChild(footerTh);
    footerTh.textContent = totalEachHour;

  }
  let finalTh = document.createElement('th');
  footerRow.appendChild(finalTh);
  finalTh.textContent = totalOfTotal;
}

let seattle = new Location('Seattle', 23, 65, 6.3);

let tokyo = new Location('Tokyo', 3, 24, 1.2);

let dubai = new Location('Dubai', 11, 38, 3.7);

let paris = new Location('Paris', 20, 38, 2.3);

let lima = new Location('Lima', 2, 16, 4.6);
console.log(shops);
makeHeader();
for (let i = 0; i < shops.length; i++) {
  shops[i].calcCustomersEachHour();
  shops[i].calcCookiesEachHour();
  shops[i].render();
}
makeFooter();