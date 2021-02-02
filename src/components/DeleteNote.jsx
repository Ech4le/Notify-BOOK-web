import React from 'react';
import { useMutation } from '@apollo/client';
import { withRouter } from 'react-router-dom';

import ButtonAsLink from './ButtonAsLink';

const DeleteNote = props => {
    return <ButtonAsLink>Usun notatke</ButtonAsLink>;
};

export default withRouter(DeleteNote);
