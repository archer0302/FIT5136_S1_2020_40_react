import React, { useContext, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './login/LoginPage';
import CoordinatorMissionList from './coordinator/CoordinatorMissionList';
import {Media, Container} from 'react-bootstrap';
import {Switch, Route, BrowserRouter, Router} from 'react-router-dom';
import styled from 'styled-components';
import CoordinatorRouter from './coordinator/CoordinatorRouter';

const AppContainer = styled(Container).attrs({
  className: "container"
})``;

const AppHeader = styled(Media)
`
  min-height: 200px;
  height: 200px;
  max-height: 300px;
`;

const AppTitle = styled(Media.Body)
``;

const AppTitleLogo = styled.img.attrs({
  src: "logo192.png"
})`
  height: 200px;
  width: 200px;
`;

const AppTitleText = styled.h1.attrs({
})
`
  margin: 10px;
  line-height: 200px;
  vertical-align: middle;
`;

const App = () => {
  return (
    <AppContainer>
      <AppHeader>
        <AppTitleLogo/>
        <AppTitle>
          <AppTitleText>Mission to Mars</AppTitleText>
        </AppTitle>
      </AppHeader>
      <BrowserRouter>
        <Switch>
          <CoordinatorRouter path="/coordinator" component={CoordinatorMissionList}/>
          <Route path="/" component={LoginPage}/>
        </Switch>
      </BrowserRouter>
    </AppContainer>
  )
}

export default App;
