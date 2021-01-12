import './styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './js/fetchCountries.js';

const input = document.getElementById('searchInput');

input.addEventListener(
  'input',
  debounce(e => {
    if (e.target.value === '' || e.target.value === null) {
      input.value = '';
      return;
    } else {
      fetchCountries(e.target.value);
    }
  }, 700),
);
