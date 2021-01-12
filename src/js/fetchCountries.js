const countries = document.querySelector('.countries');
import template from '../template/template.hbs';
import listTemplate from '../template/listCountries.hbs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

let baseUrl = `https://restcountries.eu/rest/v2/name/`;

function createItem(temp, data, place) {
  const item = temp(data);
  place.insertAdjacentHTML('afterbegin', item);
}

export default function fetchCountries(searchQuery) {
  countries.innerHTML = '';
  let url = `${baseUrl}${searchQuery}`;
  return fetch(url)
    .then(res => {
      console.log(res);

      if (res.status > 200) {
        error({
          title: 'Країну не знайдено',
          text: 'Країну не знайдено',
          delay: 4000,
        });
      } else {
        return res.json();
      }
    })
    .then(countriesList => {
      console.log(countriesList);
      if (countriesList.length > 10) {
        error({
          title: 'Попередження',
          text: 'Знайдено забагато збігів. Введіть більш конкретний запит!',
          delay: 3000,
        });
        // throw new Error('Error fetching data');
      } else if (countriesList.length > 1 && countriesList.length <= 10) {
        createItem(listTemplate, countriesList, countries);
        // } else if (countriesList.length === 0) {
        //   createItem();
        //   countries.innerHTML = '';
      } else {
        createItem(template, countriesList, countries);
      }
    })
    .catch(error => console.log(error));
}
