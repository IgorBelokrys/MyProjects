const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
const form = document.querySelector('.form');
const number = document.querySelector('.number');
const iconWeather = document.querySelector('.iconWeather');
const favoriteButton = document.querySelector('.favoriteButton');
const favoriteList = document.querySelector('.favoriteList');
const cityForAdd = document.querySelector('.cityForAdd');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const cityName = document.querySelector('.inputSearch').value;
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

  cityForAdd.textContent = cityName;

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Произошла ошибка!');
      }
    })
    .then((data) => {
      console.log(data);
      const temp = data.main.temp;
      const weatherIconCode = data.weather[0].icon;

      number.textContent = Math.round(temp);

      iconWeather.src = `http://openweathermap.org/img/wn/${weatherIconCode}@4x.png`;
    })
    .catch((error) => console.error(error));
});

favoriteButton.addEventListener('click', () => {
  const existingCities = favoriteList.querySelectorAll('.favoriteCity');
  let cityExists = false;
  existingCities.forEach((elem) => {
    if (elem.textContent === cityForAdd.textContent) {
      cityExists = true;
    }
  });
  if (cityExists) {
    alert('Этот город уже добавлен в избранное!');
    return;
  }

  const newDiv = document.createElement('div');
  newDiv.classList.add('favoriteItem');
  const newElem = document.createElement('span');
  newElem.classList.add('favoriteCity');
  newElem.textContent = cityForAdd.textContent;
  const delButton = document.createElement('button');
  delButton.classList.add('delButton');
  const iconDel = document.createElement('img');
  iconDel.classList.add('iconDel');
  iconDel.src = './images/del.png';
  delButton.appendChild(iconDel);
  delButton.addEventListener('click', () => {
    newDiv.remove();
    delButton.remove();
  });

  favoriteList.appendChild(newDiv);
  newDiv.append(newElem, delButton);
});
