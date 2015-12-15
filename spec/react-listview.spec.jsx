import React from 'react/addons';
import ReactListview from '../lib/react-listview.js';

describe('ReactListview', function() {
  var component;

  beforeEach(function() {
    component = React.addons.TestUtils.renderIntoDocument(
      <ReactListview/>
    );
  });

  it('should render', function() {
    expect(component.getDOMNode().className).toEqual('react-listview');
  });
});
