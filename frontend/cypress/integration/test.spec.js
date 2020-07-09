/// <reference types="cypress" />
context('Actions', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  const _formatStringId = (string) => {
    const specialChars = [/\W/]
    specialChars.forEach((char) => {
      string = string.replace(new RegExp(char, 'g'), '-');
    });
    return string;
  };

  describe('add a task', () => {
    it('should display the new task', () => {
      const value = 'New,task';
      cy.get('.addTodoTitle').type(value).should('have.value', value);
      cy.get('.addTodoBtn').click();
      cy.get(`#${_formatStringId(value)} label`).contains(value);
    });
  });

  describe('remove task(s)', () => {
    it('should create and remove this task', ()=>{
      const value = 'New task remove task';
      cy.get('.addTodoTitle').type(value).should('have.value', value);
      cy.get('.addTodoBtn').click();

      cy.get(`#${_formatStringId(value)} .del`).click();
      cy.get(`#${_formatStringId(value)}`).should('not.exist')
    });
    
    it('should remove all tasks', () => {
      const appTodoItem = 'app-todo-item';
      cy.get(`${appTodoItem} .del`).each(($button)=>{
        cy.wrap($button).click();
      });
      cy.get(appTodoItem).should('not.exist');
    });
  });

  describe('is-complete/or not task',()=>{
    it('should create and click on complete task and reclick on not complete task',() => {
      const value = 'New,task is complete';
      cy.get('.addTodoTitle').type(value).should('have.value', value);
      cy.get('.addTodoBtn').click();
      
      cy.get(`#${_formatStringId(value)} .lineThrough`).click();
      cy.get(`#${_formatStringId(value)}`).should('have.class', 'is-complete');
      cy.get(`#${_formatStringId(value)} .lineThrough`).click();
      cy.get(`#${_formatStringId(value)}`).should('not.have.class', 'is-complete');
    });
  });

  describe('go to About Page',()=>{
    it('should sent user to about Page and go back to index page',()=>{
      cy.get('a[routerlink="/about"]').click()
      cy.get(`.aboutPage`).should('exist');
      cy.get('a[routerlink="/"]').click();
      cy.get('app-add-todo').should('exist');
    });
  });
  
})
