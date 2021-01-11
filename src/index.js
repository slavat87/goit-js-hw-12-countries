import './styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './js/fetchCountries.js';

const input = document.getElementById('searchInput');

input.addEventListener(
  'input',
  debounce(e => {
    if (e.target.value === null || e.target.value === ' ') {
      return;
    } else {
      fetchCountries(e.target.value);
    }
    // fetchCountries(e.target.value)
    // input.value = ''
  }, 700),
);
