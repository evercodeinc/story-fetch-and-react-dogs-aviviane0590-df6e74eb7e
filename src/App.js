import React, { useEffect, useState } from "react";
import placeholderImg from "./images/dog_walking.svg";

function App() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dogImages, setDogImages] = useState([]);

  useEffect(() => {
    const url = "https://dog.ceo/api/breeds/list/all"
    const fetchDataDog = async () => {
      try {
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error('Não foi possível carregar os dados da API.');
        }
        let data = await response.json();
        data = Object.keys(data.message)
        setBreeds(data)

      } catch (error) {
        console.log("Error fetching data:")
      }
    }
    fetchDataDog()
  }, []);

  const searchByBreed = () => {
    setIsLoading(true);

    async function resultSearchDog() {
      try {
        const url = `https://dog.ceo/api/breed/${selectedBreed}/images`
        const data = await fetch(url)
        let response = await data.json();
        //response = Object.keys(response.message)
        setIsLoading(false);
        setDogImages(response.message)

      } catch (error) {
        console.log("Error fetching data", error)
      }

    }
    resultSearchDog()
  };

  return (
    <div className="d-flex justify-content-center flex-column text-center">
      <header>
        <h1 className="mt-4 mb-5">Pawspective 🐶</h1>
      </header>
      <main role="main">
        <div className="d-flex justify-content-center">
          <select
            className="form-select w-25"
            aria-label="Select a breed of dog to display results"
            value={selectedBreed}
            onChange={(event) => setSelectedBreed(event.target.value)}
          >
            <option value="" disabled>
              Select a breed
            </option>
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="btn btn-primary mx-2"
            disabled={!selectedBreed}
            onClick={searchByBreed}
            style={{ color: "#fff", cursor: "pointer" }}
          >
            Search
          </button>
        </div>
        {dogImages.length > 0 && !isLoading && (
          <div className="px-5 mx-5 text-end" data-testid="results-count">
            <p className="fs-5">{dogImages.length} results</p>
          </div>
        )}
        <div className="mt-5 d-flex justify-content-center flex-wrap px-5 mx-5">
          {dogImages.length === 0 && !isLoading && (
            <img
              src={placeholderImg}
              className="mx-auto d-block mt-4 w-50"
              alt=""
            />
          )}
          {isLoading && (
            <div className="d-flex align-items-center ">
              <p className="h1 me-2">Loading</p>
              <div
                className="spinner-border ms-auto text-primary fs-3"
                role="status"
                aria-hidden="true"
              ></div>
            </div>
          )}
          {dogImages.length > 0 &&
            !isLoading &&
            dogImages.map((imgSrc, index) => (
              <img
                key={`${index}-${selectedBreed}`}
                src={imgSrc}
                className="img-thumbnail w-25"
                alt={`${selectedBreed} ${index + 1} of ${dogImages.length}`}
              />
            ))}
        </div>
      </main>
    </div>
  );
}

export default App;
