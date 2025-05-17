function toggleSiteAddress(value) {
  document.getElementById('site_address_fields').style.display = value === 'different' ? 'block' : 'none';
}

async function lookupAddress(zip, prefName, cityName, townName) {
  if (!/^\d{7}$/.test(zip)) return;
  try {
    const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip}`);
    const data = await res.json();
    if (data.results && data.results[0]) {
      const result = data.results[0];
      document.getElementsByName(prefName)[0].value = result.address1;
      document.getElementsByName(cityName)[0].value = result.address2;
      document.getElementsByName(townName)[0].value = result.address3;
    }
  } catch (error) {
    console.error('郵便番号検索エラー', error);
  }
}

document.querySelector("form").addEventListener("keydown", function(event) {
    // Enterキー（keyCode 13）が押され、textareaでない場合
    if (event.key === "Enter" && event.target.tagName !== "TEXTAREA") {
      event.preventDefault(); // デフォルト動作（送信）を無効にする


      // フォーム内の全ての入力要素を取得
      const formElements = Array.from(this.querySelectorAll("input, select, textarea"));

      const index = formElements.indexOf(event.target);
      if (index !== -1 && index < formElements.length - 1) {
          const nextElement = formElements[index + 1];
          nextElement.focus(); //フォーカス移動 
      }

    }
});

const emailInput = document.getElementById("email");

function stripFullWidthChars() {
    emailInput.value = emailInput.value.replace(/[^\x20-\x7E]/g, '');
}

emailInput.addEventListener('input', stripFullWidthChars);
emailInput.addEventListener('compositionend', stripFullWidthChars);


const images = ["img/slideimage1.jpg", "img/slideimage2.jpg", "img/slideimage3.jpg"];
let currentIndex = 0;
const slideImage = document.getElementById("slide-image");

setInterval(() => {
  currentIndex = (currentIndex + 1) % images.length;
  slideImage.style.opacity = 0;
  setTimeout(() => {
    slideImage.src = images[currentIndex];
    slideImage.style.opacity = 1;
  }, 500); // fade out before switching
}, 5000); // change every 5 seconds

