describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        
        const user1 = {
            name: 'Huy Tran',
            username: 'tranhuy',
            password: 'password'
        }
        const user2 = {
            name: 'Amy Adams',
            username: 'aadams',
            password: 'password'
        }

        cy.request('POST', 'http://localhost:3001/api/users', user1)
        cy.request('POST', 'http://localhost:3001/api/users', user2)

        cy.visit('http://localhost:3000')
    })

    it('Login form is displayed', function() {
        cy.contains('User Login')
    })

    describe('Login', function() {
        it('Succeeds with correct credentials', function() {
            cy.login({ username: 'tranhuy', password: 'password' })

            cy.contains('Logout')
        })

        it('Fails with wrong credentials', function() {
            cy.get('input[name="Username"]').type('tranhuy')
            cy.get('input[name="Password"]').type('wrong password')
            cy.get('[type~="submit"]').click()

            cy.should('not.contain', 'Logout')
            cy.get('#alert').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'tranhuy', password: 'password' })
        })

        it('A blog can be created', function() {
            cy.contains('Create New Blog').click()

            cy.get('#title').type('Test Blog')
            cy.get('#author').type('Huy Tran')
            cy.get('#url').type('www.myblogapp.ca')
            cy.get('[type~="submit"]').click()
            
            cy.contains('Test Blog')
        })

        describe('Several blogs exist', function() {
            beforeEach(function() {
                cy.createBlog({ title: 'Test Blog 1', author: 'Huy Tran', url: 'www.myblogapp.ca', likes: 14 })
                cy.createBlog({ title: 'Test Blog 2', author: 'Amy Adams', url: 'www.myblogapp.ca', likes: 23 })
                cy.createBlog({ title: 'Test Blog 3', author: 'Tina Chen', url: 'www.myblogapp.ca', likes: 9 })
            })

            it('A blog can be liked', function() {   
                cy.contains('Test Blog 1').parents('.blog').as('selectedBlogContainer')            
                cy.get('@selectedBlogContainer').contains('View').click()               
                cy.get('@selectedBlogContainer').contains('Like').click()
                cy.get('@selectedBlogContainer').get('.likes').contains(1)
            })

            it('A blog can be deleted', function() {
                cy.contains('Test Blog 2').parents('.blog').as('selectedBlogContainer')            
                cy.get('@selectedBlogContainer').contains('View').click() 
                cy.get('@selectedBlogContainer').contains('Delete Blog').click() 
                cy.on('window:confirm', () => true) 
                cy.contains('Test Blog 2').should('not.exist') 
            })

            it('A blog cannot be deleted by another user', function() {
                cy.contains('Logout').click()                                           //need to logout of user who created blogs first
                cy.login({ username: 'aadams', password: 'password' })                  //log in as another user
                cy.contains('Test Blog 3').parents('.blog').as('selectedBlogContainer') 
                cy.get('@selectedBlogContainer').contains('View').click()  
                cy.get('@selectedBlogContainer').should('not.contain', 'Delete Blog') 
            })

            it.only('Blogs sorted by likes in descending order', function() {
                //first need to expand all blogs
                cy.get('[data-cy=toggleDetails').click({ multiple: true })

                //extract likes from each blog into an array and compare with sorted array
                cy.get('.blog').then($blogs => {
                    let likes = $blogs.map((i, blog) => Cypress.$(blog).find('.likes > td').contents().get(0).nodeValue)
                    let sortedLikes = [...likes].sort((n1, n2) => n2 - n1)

                    cy.wrap(likes.toArray()).should('deep.equal', sortedLikes)
                })
            })
        })
    })
})