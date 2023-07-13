import emails from "./emails.json" assert { type: "json" };

export function validateEmails(emails) {
  // Definimos una expresión regular para validar un correo electrónico.
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validEmails = [];
  const noPersonEmails = [];
  const invalidEmails = [];

  emails.forEach((email) => {
    if (!emailRegex.test(email)) {
      invalidEmails.push(email);
    }
    if (email.split("@")[0] === "") {
      noPersonEmails.push(email);
    }
    if (emailRegex.test(email) && email.split("@")[0] !== "") {
      validEmails.push(email);
    }
  });

  return { validEmails, noPersonEmails, invalidEmails };
}

const results = validateEmails(emails);

// Imprime los resultados.
console.log("Emails válidos: ", results.validEmails);
console.log("Emails sin persona asociada: ", results.noPersonEmails);
console.log("Emails inválidos: ", results.invalidEmails);
