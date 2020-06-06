import React from 'react';
import { shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import  GenericModal  from '../../components/modals/GenericModal';
configure({adapter: new Adapter()});


it ('GenericModal with children ', () => {
    const wrapper = shallow(<GenericModal visible={false || true} />);
   
    expect(wrapper.find('Modal').prop('visible')).toBe(true || false);
})
