const facts = document.querySelectorAll(".factItem");
const factList = document.querySelector(".factList");

const baseURL = "https://catfact.ninja/fact";

const instance = axios.create({ baseURL });

const network = {
  getRandomCat: async () => {
    let result = {};
    try {
      const response = await instance.get();
      result = response.data;
    } catch (error) {
      result = error;
    }

    return result;
  },
};

// display loading state
facts.forEach((fact) => {
  const factDescription = document.createElement("div");
  factDescription.classList.add("factDesription", "loading");
  factDescription.style.fontSize = "1rem";

  factDescription.textContent = "loading...";
  factList.insertBefore(factDescription, fact.nextSibling);
});

function PaintUI() {
  facts.forEach((fact) => {
    network
      .getRandomCat()
      .then((data) => {
        const factDescription = document.createElement("div");
        factDescription.classList.add("factDesription");
        factDescription.style.fontSize = "1rem";

        //   display error message if anyting goes wrong
        if (data.message) {
          factDescription.textContent = data.message;
        } else {
          factDescription.textContent = data.fact;
        }

        factList.insertBefore(factDescription, fact.nextSibling);
      })
      .then(() => {
        // remove loading state
        const loading = document.getElementsByClassName("loading");
        loading[0].parentNode.removeChild(loading[0]);
      });
  });
}

window.onload = () => PaintUI();
