const button = document.getElementById('getNameBtn');
const resultDiv = document.getElementById('result');

button.addEventListener('click', () => {
  const id = document.getElementById('playerId').value.trim();
  if (!id) {
    resultDiv.textContent = 'Please enter a valid ID.';
    return;
  }
  
  resultDiv.textContent = 'Fetching...';
  
  fetch(`https://get-nickname-games.p.rapidapi.com/bgmi?id=${encodeURIComponent(id)}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '26a0fd911cmsha34f81402c0c112p11f908jsnf048ff5d13da',
      'X-RapidAPI-Host': 'get-nickname-games.p.rapidapi.com'
    }
  })
  .then(res => res.json())
  .then(json => {
    if (json.status === 'success' && json.data.nickname) {
      resultDiv.textContent = `Player Name: ${json.data.nickname}`;
    } else {
      resultDiv.textContent = 'No player found.';
    }
  })
  .catch(err => {
    console.error(err);
    resultDiv.textContent = 'Error fetching data.';
  });
});
