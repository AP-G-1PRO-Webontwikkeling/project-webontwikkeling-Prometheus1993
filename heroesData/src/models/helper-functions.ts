const charactersUrl =
  "https://raw.githubusercontent.com/AP-G-1PRO-Webontwikkeling/project-webontwikkeling-Prometheus1993/main/heroData/assets/json/characters.json";


const FetchHeroesData = async () => {
  const loadData = await fetch(charactersUrl);
  try {
    const characters = await loadData.json();
    return characters;
  } catch (error) {
    console.error("Er is een fout opgetreden:", error);
  }
};

export { FetchHeroesData };
