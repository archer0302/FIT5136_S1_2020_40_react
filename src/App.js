import React, { useState, useEffect } from 'react';
import logo from './static/icon.png';
import LoginPage from './login/LoginPage';
import { Media, Container } from 'react-bootstrap';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import CandidateView from './candidate/CandidateView';
import LogoutButton from './common/LogoutButton';
import CandidateForm from './candidate/CandidateForm';
import MissionForm from './mission/MissionForm';
import MissionList from './mission/MissionList';
import MissionView from "./mission/MissionView";

// CSS styled component

const AppContainer = styled(Container).attrs({
  className: "container"
})`
  background-color: #5C3D47;
  color: #F4EEEB;
`;

const AppIcon = styled(Media)`
  padding-top: 30px;
  display: flex;
  flex-direction: column;
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
              <img src={logo} width={100} height={100} alt="Mission to Mars"/>
              <h1>Mission to Mars</h1>
          </AppIcon>
          {
            window.localStorage.getItem("userName") && (
              <div>
                <LogoutButton setUserName={setUserName} userName={userName}/>
              </div>
            )
          }
          {/** URL Routers */}
          <Switch>
            {/** New Mission Page */}
            <Route path="/mission/new" render={(props) => <MissionForm {...props}/>}/>
            {/** Mission View Page */}
            <Route path="/mission/view/:id" render={(props) => <MissionView {...props} missionId={props.match.params.id}/>}/>
            {/** Edit Mission Page */}
            <Route path="/mission/edit/:id" render={(props) => <MissionForm {...props} missionId={props.match.params.id}/>}/>
            {/** Mission List */}
            <Route path="/mission" exact component={MissionList}/>
            {/** Register Candidate Page */}
            <Route path="/register" render={(props) => <CandidateForm {...props} setUserName={setUserName}/>}/>
            {/** Edit candidate profile Page */}
            <Route path="/candidate/edit" render={(props) => <CandidateForm {...props}/>}/>
            {/** Candidate profile view Page */}
            <Route path="/candidate" render={(props) => <CandidateView {...props}/>}/>
            {/** Homepage Page */}
            <Route path="/" render={(props) => <LoginPage {...props} setUserName={setUserName}/>}/>
          </Switch>
        </BrowserRouter>
      </AppContainer>
    </div>
  )
}

export default App;
