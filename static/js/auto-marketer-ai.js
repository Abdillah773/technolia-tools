// static/js/auto-marketer-ai.js

function autoGenerateMarketingContent(productName, language = "sw") {
  const templates = {
    sw: [
      `Habari! Unatafuta ${productName}? Usikose ofa yetu kali kabisa leo!`,
      `${productName} ni suluhisho bora kwa kila mtu anayejali ubora. Jaribu sasa!`,
      `Furahia maisha ukiwa na ${productName}! Nunua leo upate punguzo maalum!`,
    ],
    en: [
      `Looking for ${productName}? Don’t miss our hot offer today!`,
      `${productName} is the perfect solution for anyone who values quality. Try it now!`,
      `Enjoy life with ${productName}! Order today and get a special discount!`,
    ],
  };

  const emailTemplate = {
    sw: `Mteja mpendwa,\n\nTunakuletea bidhaa yetu mpya kabisa - ${productName}.\nImesanifiwa kukidhi mahitaji yako kwa ubora wa hali ya juu. Usikose nafasi hii!\n\nWasiliana nasi sasa.\n`,
    en: `Dear Customer,\n\nIntroducing our brand-new product – ${productName}.\nDesigned to meet your needs with top-notch quality. Don’t miss this chance!\n\nContact us now.\n`,
  };

  const whatsappMessage = {
    sw: `Habari! Ningependa kukutambulisha ${productName}, bidhaa bora unayoweza kuipata leo. Tupigie sasa!`,
    en: `Hello! I’d love to introduce you to ${productName}, one of the best products you can get today. Call us now!`,
  };

  const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

  return {
    post: random(templates[language]),
    email: emailTemplate[language],
    whatsapp: whatsappMessage[language],
  };
}

// 🚀 On user input
function showMarketingSamples() {
  const input = document.getElementById("productInput").value.trim();
  const lang = document.getElementById("languageSelect").value;
  const result = autoGenerateMarketingContent(input, lang);

  document.getElementById("socialPost").innerText = result.post;
  document.getElementById("emailText").innerText = result.email;
  document.getElementById("whatsappText").innerText = result.whatsapp;
}
