document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("launchForm");
  const preview = document.getElementById("previewCard");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const desc = document.getElementById("productDesc").value;
    const img = document.getElementById("productImage").value;

    preview.innerHTML = `
      <div class="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
        <img class="w-full h-48 object-cover" src="${img}" alt="${name}">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">${name}</div>
          <p class="text-gray-700 text-base">${desc}</p>
          <p class="text-green-600 font-semibold mt-2">Tsh ${price}</p>
        </div>
        <button class="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700">Nunua Sasa</button>
      </div>
    `;
  });
});
