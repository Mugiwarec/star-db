import React from 'react';
import {withRouter} from 'react-router-dom';

import {StarshipList} from '../sw_components';

const PeoplePage = ({history}) => {
  return (
    <StarshipList
      onItemSelected={(id) => history.push(id)}/>
  );
};

export default withRouter(PeoplePage);
