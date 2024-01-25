/**
  - Login Spec
    - should display login page correctly
    - should display alert when email is empty
    - should display alert when password is empty
    - should display alert when email and username is wrong
    - should display homepage when email and password is correct
*/

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Masuk$/).should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.get('button').contains(/^Masuk$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to beempty');
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Email"]').type('user@mail.com');

    cy.get('button').contains(/^Masuk$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to beempty');
    });
  });

  it('should display alert when email and password are wrong', () => {
    cy.get('input[placeholder="Email"]').type('user@mail.com');

    cy.get('input[placeholder="Password"]').type('wrong_user');

    cy.get('button').contains(/^Masuk$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when username and password are correct', () => {
    cy.get('input[placeholder="Email"]').type('user@test.com');

    cy.get('input[placeholder="Password"]').type('password_test');

    cy.get('button').contains(/^Masuk$/).click();

    cy.get('button[aria-label="add thread"]').should('be.visible');
  });
});
