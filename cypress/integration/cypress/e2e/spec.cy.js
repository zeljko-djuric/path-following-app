describe("FollowPath valid path", () => {
  it("should follow a valid path", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#text-area").type(`
      @---A---+
              |
      x-B-+   C
          |   |
          +---+
    `);
    cy.get("#submit-button").click();
    cy.get("#collected-letters").should("contain", "ACB");
    cy.get("#path").should("contain", "@---A---+|C|+---+|+-B-x");
  });
});

describe("FollowPath invalid path", () => {
  it("should display an error in Alert componnent", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#text-area").type(`@Test test test x`);
    cy.get("#submit-button").click();
    cy.get('[class="ant-alert-message"]').should("contain", "Broken path");
  });
});

describe("FollowPath invalid path", () => {
  it("should display an error in Alert componnent", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#submit-button").click();
    cy.get('[class="ant-alert-message"]').should(
      "contain",
      "Missing start character"
    );
  });
});

const textAreaSelector = "#text-area";
const submitButtonSelector = "#submit-button";
const collectedLettersSelector = "#collected-letters";
const pathSelector = "#path";
const logo1Selector = ".ant-card-head-title:contains('Collected Letters')";
const logo2Selector = ".ant-card-head-title:contains('Path')";

describe("UI Rendering", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should display the title", () => {
    cy.get("h2").should("contain", "Enter Your Path");
  });

  it("should display an input field", () => {
    cy.get(textAreaSelector).should("be.visible");
  });

  it("should display a 'Submit' button", () => {
    cy.get(submitButtonSelector).should("be.visible");
  });

  it("should display the first logo", () => {
    cy.get(logo1Selector).should("be.visible");
  });

  it("should display the second logo", () => {
    cy.get(logo2Selector).should("be.visible");
  });

  it("should handle input and button click", () => {
    const inputText = "Software sauna test";
    cy.get(textAreaSelector).type(inputText);
    cy.get(submitButtonSelector).click();
    cy.get(collectedLettersSelector).should("be.visible");
    cy.get(pathSelector).should("be.visible");
  });
});
