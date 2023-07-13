import {
  getPersonsWithoutAddress,
  sortPersonsWithoutAddressByName,
  getPersonsByAgeAndNameFiltered,
} from "./task-1.js";

describe("Test person filters", () => {
  it("should filter out persons with address", () => {
    const persons = getPersonsWithoutAddress();
    persons.forEach((person) => {
      expect(person).not.toHaveProperty("address");
    });
  });

  it("should sort persons without address by name", () => {
    const sortedPersons = sortPersonsWithoutAddressByName();
    for (let i = 0; i < sortedPersons.length - 1; i++) {
      expect(sortedPersons[i].name <= sortedPersons[i + 1].name).toBeTruthy();
    }
  });

  it("should filter persons by age and name starting with H or L", () => {
    const filteredPersons = getPersonsByAgeAndNameFiltered();
    filteredPersons.forEach((person) => {
      const validAge = person.age >= 20 && person.age <= 30;
      const validName =
        person.name.startsWith("H") || person.name.startsWith("L");
      expect(validAge && validName).toBeTruthy();
    });
  });
});
