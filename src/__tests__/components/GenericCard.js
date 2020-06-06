import React from 'react';
import { shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import  GenericCard  from '../../components/GenericCard';
configure({adapter: new Adapter()});


it ('whithout prop title  in GenericCard', () => {
    const wrapper = shallow(<GenericCard />);
   
    expect(wrapper.find('h5').text()).toEqual("Sin nombre");
})

it ('prop entity is true ', () => {
    const wrapper = shallow(<GenericCard  entity={true}/>);
   
    expect(wrapper.find('.access-entity').text()).toEqual("Acceder");
})

