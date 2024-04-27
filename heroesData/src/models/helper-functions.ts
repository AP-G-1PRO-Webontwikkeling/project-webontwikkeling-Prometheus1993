const charactersUrl =
"https://raw.githubusercontent.com/AP-G-1PRO-Webontwikkeling/project-webontwikkeling-Prometheus1993/main/heroesData/assets/json/characters.json"

const powersUrl =
"https://raw.githubusercontent.com/AP-G-1PRO-Webontwikkeling/project-webontwikkeling-Prometheus1993/main/heroesData/assets/json/powers.json"


// FetchHeroesData and FetchPowersData are helper functions that fetch the data from the characters.json and powers.json files.
const FetchHeroesData = async () => {
  const loadData = await fetch(charactersUrl);
  try {
    const characters = await loadData.json();
    return characters;
  } catch (error) {
    console.error("Er is een fout opgetreden:", error);
  }
};

const FetchPowersData = async () => {
  const loadData = await fetch(powersUrl);
  try {
    const powers = await loadData.json();
    return powers;
  } catch (error) {
    console.error("Er is een fout opgetreden:", error);
  }
}

export { FetchHeroesData, FetchPowersData };
