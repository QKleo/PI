import React from 'react';
import {configure, mount} from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import {Forms} from './components/Forms'
import {Home} from './components/Home.jsx'
configure({adapter:new Adapter()})

describe('<algo>',()=>{

    describe('Formulario',()=>{
        
        beforeEach(()=>{
           const wrapper=mount({node:<Home/>});
        

        it('renderiza un <boton>',()=>{
            expect(wrapper.find('button')).toHaveLength(1)
        } )})



    })


})