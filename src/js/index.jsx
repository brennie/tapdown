import React from 'react';
import { render } from 'react-dom';

import Splash from 'js/components/splash';

document.addEventListener('DOMContentLoaded', function onLoad() {
  render(<Splash />, document.querySelector('.content'));
});
