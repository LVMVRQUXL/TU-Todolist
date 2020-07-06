/// <reference types="cypress" />
context('Actions', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    describe('input a new todo task',() => {
        it('should have click on input field fake@gmail.com', ()=>{
            cy.get('.addTodoTitle')
            .type('nouvelleTache').should('have.value', 'nouvelleTache')
        })
    });
})