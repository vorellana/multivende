const separation = (num) => console.log("\n\n" + "*".repeat(num));

import persons from "./persons.json" assert { type: "json" };

export const getPersonsWithoutAddress = () =>
  persons
    .filter((person) => !person.hasOwnProperty("address"))
    .map((person) => ({
      id: person._id,
      name: person.name,
      gender: person.gender,
      age: person.age,
    }));

export const sortPersonsWithoutAddressByName = () =>
  getPersonsWithoutAddress()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((person) => ({ id: person.id, name: person.name }));

export const getPersonsByAgeAndNameFiltered = () =>
  persons
    .filter((person) => {
      const validAge = person.age >= 20 && person.age <= 30;
      const validName =
        person.name.startsWith("H") || person.name.startsWith("L");
      return validAge && validName;
    })
    .map((person) => ({ id: person._id, name: person.name, age: person.age }));

// Imprime los resultados.
separation(60);
console.log(
  "A. Lista de las personas que no tiene dirección\n\n",
  getPersonsWithoutAddress()
);

separation(60);
console.log(
  "B. Lista de las personas que no tiene dirección ordenadas por nombre de forma ascendente \n\n",
  sortPersonsWithoutAddressByName()
);

separation(60);
console.log(
  "C. Lista de personas que tienen la edad entre 20 y 30 años y su nombre empiece por H y L \n\n",
  getPersonsByAgeAndNameFiltered()
);
