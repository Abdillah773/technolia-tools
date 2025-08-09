fetch('data/tools.json')
  .then(response => response.json())
  .then(data => {
    const listDiv = document.getElementById('toolsList');
    listDiv.innerHTML = '';

    data.forEach(tool => {
      const card = document.createElement('div');
      card.className = 'tool-card';
      card.innerHTML = `
        <img src="${tool.image}" alt="${tool.name}" />
        <h3>${tool.name}</h3>
        <p>${tool.description}</p>
        <p><strong>Bei:</strong> TZS ${tool.price}</p>
        <a href="${tool.download}" target="_blank">Pakua / Angalia Demo</a>
      `;
      listDiv.appendChild(card);
    });
  });
