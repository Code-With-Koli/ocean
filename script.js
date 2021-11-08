const trashContainer = document.querySelector(".trash-container")
const moneyElement = document.querySelector('.money')

const currencyFormatter = new Intl.NumberFormat(
    "en-us", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
}
)
const trashFormater = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
    minimumIntegerDigits: 8,
    useGrouping: false,

})
const MAX_AMOUNT = 30000000;

setupTrash();

async function setupTrash() {
    const amount = await fetch("https://tscache.com/donation_total.json")
        .then(res => res.json())
        .then(data => data.count)
    moneyElement.innerText = currencyFormatter.format(amount)

    const amountLeft = Math.max(MAX_AMOUNT - amount, 0);
    const stringAmount = trashFormater.format(amountLeft);

    const trashAmount = {
        xxl: {
            amount: parseInt(`${stringAmount[0]}${stringAmount[1]}`),
            icon: "bag",
        },
        xl: {
            amount: parseInt(stringAmount[2]),
            icon: "bottle",
        },
        lg: {
            amount: parseInt(stringAmount[3]),
            icon: "headphones",
        },
        md: {
            amount: parseInt(stringAmount[4]),
            icon: "phone",
        },
        sm: {
            amount: parseInt(stringAmount[5]),
            icon: "takeout",
        },
        xs: {
            amount: parseInt(stringAmount[6]),
            icon: "toy",
        },
    }

    Object.values(trashAmount).forEach(({ amount, icon }) => {
        for (let i = 0; i < amount; i++) {
            createTrash(icon)
        }
    });
}

function createTrash(icon) {
    const img = document.createElement("img");
    const top = randomNumberBetween(0, 50);
    const size = top / 5 + 1;
    img.style.width = `${size}vmin`;
    img.style.height = `${size}vmin`;
    img.src = `/img/${icon}.svg`;
    img.style.top = `${top}vh`;
    img.classList.add("trash");
    img.style.left = `${randomNumberBetween(0, 100)}vw`;
    img.style.setProperty("--rotation", `${randomNumberBetween(-30, 30)}deg`);
    trashContainer.appendChild(img)
};

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}