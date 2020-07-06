/// <reference types="cypress" />
context('Actions', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    describe('input a new todo task',() => {
        it('should have click on input field nouvelleTache', ()=>{
            cy.get('.addTodoTitle')
            .type('nouvelleTache').should('have.value', 'nouvelleTache')
        })

        it('should have display the new Task and verif his content', ()=>{
            cy.get('.addTodoTitle')
            .type('nouvelleTache')

            cy.get('.addTodoBtn').click();

            cy.get('#nouvelleTache label').contains('nouvelleTache')
        });

        it('should have display the new Task', ()=>{
            cy.get('.addTodoTitle')
            .type('nouvelleTache')

            cy.get('.addTodoBtn').click();

            cy.get('#nouvelleTache label').contains('nouvelleTache')
        });

        it('should have dispear the Task', ()=>{
            cy.get('.addTodoTitle')
            .type('nouvelleTache')

            cy.get('.addTodoBtn').click();

            cy.get('#nouvelleTache .del').click();

            cy.get('#nouvelleTache').should('not.exist')
        })

        it('should remove all Task',()=>{
            cy.get('app-todo-item .del').each(($el)=>{
                cy.wrap($el).click();
            })
            cy.get('app-todo-item').should('not.exist')
        });

        it('should line-through',()=>{
            cy.get('.addTodoTitle')
            .type('nouvelleTache')

            cy.get('.addTodoBtn').click();
            cy.get('#nouvelleTache .lineThrough').click();
            cy.get('#nouvelleTache').should('have.class', 'is-complete')

        });

        it('should not have line-through',()=>{
            cy.get('.addTodoTitle')
            .type('nouvelleTache');
            cy.get('.addTodoBtn').click();
            cy.get('#nouvelleTache .lineThrough').click();
            cy.get('#nouvelleTache .lineThrough').click();
            cy.get('#nouvelleTache').should('not.have.class', 'is-complete')
        });

    });
})