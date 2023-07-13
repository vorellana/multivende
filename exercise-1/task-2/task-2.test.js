import { validateEmails } from "./task-2"; // please replace with your actual module path

describe("Email Validation", () => {
  test("Valid Email", () => {
    const emails = ["test@example.com"];
    const results = validateEmails(emails);
    expect(results.validEmails.length).toBe(1);
    expect(results.validEmails[0]).toBe(emails[0]);
  });

  test("Invalid Email", () => {
    const emails = ["invalid-email"];
    const results = validateEmails(emails);
    expect(results.invalidEmails.length).toBe(1);
    expect(results.invalidEmails[0]).toBe(emails[0]);
  });

  test("No Person Email", () => {
    const emails = ["@example.com"];
    const results = validateEmails(emails);
    expect(results.noPersonEmails.length).toBe(1);
    expect(results.noPersonEmails[0]).toBe(emails[0]);
  });
});
