import { hot } from 'react-hot-loader/root';
import React from 'react';
import VolunteerSelector from 'components/VolunteerSelector/VolunteerSelector';

// if you are integrating redux this is a good place to wrap your app in <Provider store={store}>
// if you are using react-router this is a good place to set up your router

const App = () => (
  <div>
    <VolunteerSelector />

    <div className="adv">Adv: We are looking for a good web designer</div>
  </div>
);

export default hot(App);
