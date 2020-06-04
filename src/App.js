import React, { useState, useEffect } from 'react';
import logo from './static/icon.png';
import LoginPage from './login/LoginPage';
import { Media, Container } from 'react-bootstrap';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import CoordinatorRouter from './coordinator/CoordinatorRouter';
import CoordinatorMissionList from './coordinator/CoordinatorMissionList';
import AdministratorRouter from './administrator/AdministratorRouter';
import AdministratorMissionList from './administrator/AdministratorMissionList';
import CandidateInformation from './candidate/CandidateInformation';
import LogoutButton from './LogoutButton';
import Register from './register/Register';

const AppContainer = styled(Container).attrs({
  className: "container"
})`
  background-color: #5C3D47;
  color: #F4EEEB;
`;

const AppIcon = styled(Media)`
  padding: 30px;
  display: flex;
  flex-direction: column;
  min-height: 200px;
  height: 200px;
  max-height: 300px;
  align-items: center;
`;

const App = () => {
  const [userName, setUserName] = useState('');

  useEffect(() =>  {
    setUserName(window.localStorage.getItem("userName"));
  }, []);

  return (
    <div style={{backgroundColor: '#5C3D47', minHeight: '1080px'}} >
      <AppContainer>
        <BrowserRouter>
          <AppIcon>
              <img src={logo} width={100} height={100}/>
              <h1>Mission to Mars</h1>
          </AppIcon>
          {
            window.localStorage.getItem("userName") && (
              <div>
                {/* <span>Hello, {userName}</span> */}
                <LogoutButton setUserName={setUserName} userName={userName}/>
              </div>
            )
          }
          <Switch>
            <CoordinatorRouter path="/coordinator" component={CoordinatorMissionList}/>
            <AdministratorRouter path="/administrator" component={AdministratorMissionList}/>
            <Route path="/register" render={(props) => <Register {...props}/>}/>
            <Route path="/candidate" render={(props) => <CandidateInformation {...props}/>}/>
            <Route path="/" render={(props) => <LoginPage {...props} setUserName={setUserName}/>}/>
          </Switch>
        </BrowserRouter>
      </AppContainer>
    </div>
  )
}

export default App;
