import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './static/logo192.png';
import LoginPage from './login/LoginPage';
import { Media, Container } from 'react-bootstrap';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import CoordinatorRouter from './coordinator/CoordinatorRouter';
import CoordinatorMissionList from './coordinator/CoordinatorMissionList';
import AdministratorRouter from './administrator/AdministratorRouter';
import AdministratorMissionList from './administrator/AdministratorMissionList';
import LogoutButton from './LogoutButton';

const AppContainer = styled(Container).attrs({
  className: "container"
})``;

const AppHeader = styled(Media)
`
  min-height: 200px;
  height: 200px;
  max-height: 300px;
`;

const AppTitleText = styled.h1.attrs({
})
`
  margin: 10px;
  line-height: 200px;
  vertical-align: middle;
`;

const App = () => {
  const [userName, setUserName] = useState('');

  return (
    <AppContainer>
      <BrowserRouter>
        <AppHeader>
          <img src={logo}/>
          <AppTitleText>Mission to Mars</AppTitleText>
          <LogoutButton setUserName={setUserName}/>
          Hello, {userName}
        </AppHeader>
        <Switch>
          <CoordinatorRouter path="/coordinator" component={CoordinatorMissionList}/>
          <AdministratorRouter path="/administrator" component={AdministratorMissionList}/>
          <Route path="/" render={(props) => <LoginPage {...props} setUserName={setUserName}/>}/>
        </Switch>
      </BrowserRouter>
    </AppContainer>
  )
}

export default App;
