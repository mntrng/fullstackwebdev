describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
    cy.contains('Magic Gate').click()

    const user = {
      name: 'Alan Turing',
      username: 'alanturing',
      password: 'turing123'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Username')
    cy.contains('Password')
  })

      describe('Login tests',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('alanturing')
      cy.get('#password').type('turing123')
      cy.get('#loginB').click()

      cy.contains('Alan Turing logged-in')
    })

    it('fails with wrong credentials', function() {
        cy.get('#username').type('alanturing')
        cy.get('#password').type('turing1234')
        cy.get('#loginB').click()

        cy.get('.error').should('contain', 'Wrong username and/or password!')
          .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
    })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'alanturing', password: 'turing123' })
    })

    it('A new blog can be created', function() {
      cy.contains('Create a new blog').click()
      cy.get('#title').type('Test Blog')
      cy.get('#author').type('James Meyor')
      cy.get('#url').type('https://tester.com')
      cy.get('#createB').click()
      cy.contains('Test Blog by James Meyor')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.addBlog({
          title: 'Haha',
          author: 'Hehe',
          url: 'http://www.sandwich.com'
        })
      })

      it('Can like a blog', function() {
        cy.contains('View').click()
        cy.contains('Like').click()
        cy.contains('Likes: 1')
      })

      it('Owner can delete a blog', function() {
        cy.contains('View').click()
        cy.contains('Delete').click()
        cy.get('.good').should('contain', 'Deleted')
      })
    })

    describe('blogapp has several users', function () {
      beforeEach(function () {
        const user1 = {
          name: 'Buk Lau',
          username: 'buklau',
          password: 'buklau123'
        }

        cy.request('POST', 'http://localhost:3001/api/users/', user1)

        cy.addBlog({
          title: 'Top',
          author: 'Liverpool',
          likes: 100,
          url: 'http://www.auto.fi'
        })

        cy.addBlog({
          title: 'Bottom',
          author: 'Ronaldo Messi',
          likes: 20,
          url: 'http://www.highkite.se'
        })

        cy.addBlog({
            title: 'Middle',
            author: 'Phuc Long',
            likes: 40,
            url: 'http://www.high.se'
        })
      })

      it('only owner can delete blog', function () {
        cy.contains('Log out').click()
        cy.login({ username: 'buklau', password: 'buklau123' })
        cy.contains('View').click().get('html').should('not.contain', 'Delete')
      })

      it('blogs are ordered according to likes', function () {
        cy.get('.finalTest').eq(0).should('contain', 'Liverpool')
        cy.get('.finalTest').eq(1).should('contain', 'Middle')
        cy.get('.finalTest').eq(2).should('contain', 'Messi')
      })
    })
  })
})