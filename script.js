const trashContainer = document.querySelector(".trash-container");
const moneyElement = document.querySelector(".money");
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});
const trashFormatter = new Intl.NumberFormat("en-US", {
  useGrouping: false,
  minimumFractionDigits: 0,
  minimumIntegerDigits: 8,
});
const MAX_MONEY_RAISED = 50_000_000;

(async () => {
  const amount = await fetch("https://tscache.com/donation_total.json")
    .then((res) => res.json())
    .then((data) => data.count);
  moneyElement.innerText = currencyFormatter.format(amount);
  addTrash();

  function addTrash() {
    const toRaise = Math.max(MAX_MONEY_RAISED - amount, 0);
    const stringifiedAmount = trashFormatter.format(toRaise);
    const trashAmount = {
      xxl: {
        amount: parseInt(`${stringifiedAmount[0]}${stringifiedAmount[1]}`),
        icon: "bag",
      },
      xl: {
        amount: parseInt(stringifiedAmount[2]),
        icon: "takeout",
      },
      l: {
        amount: parseInt(stringifiedAmount[3]),
        icon: "headphones",
      },
      m: {
        amount: parseInt(stringifiedAmount[4]),
        icon: "smartphone",
      },
      s: {
        amount: parseInt(stringifiedAmount[5]),
        icon: "toys",
      },
      xs: {
        amount: parseInt(stringifiedAmount[6]),
        icon: "liquor",
      },
    };

    for (const key in trashAmount) {
      const { amount, icon } = trashAmount[key];
      for (let i = 0; i < amount; i++) {
        createTrash(icon);
      }
    }
  }

  function createTrash(icon) {
    const img = document.createElement("img");
    const top = randomNumberBetween(0, 50);
    const left = randomNumberBetween(0, 100);
    const size = top / 5 + 1;
    img.src = `./img/${icon}.png`;
    img.style.top = `${top}vh`;
    img.style.left = `${left}vw`;
    img.style.height = `${size}vmin`;
    img.style.width = `${size}vmin`;
    img.style.setProperty("--rotation", `${randomNumberBetween(-30, 30)}deg`);
    img.classList.add("trash");
    trashContainer.appendChild(img);
  }

  function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
})();
