import React from 'react'
import NavigationBar from './navigationBar'

describe('<NavigationBar />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<NavigationBar/>)
    })
})