import React from 'react';
import {Table, Button} from 'react-bootstrap';
import axios from 'axios';

class MissionList extends React.Component {

  state = {
    missions: []
  }

  componentWillMount() {
    axios.get(`http://localhost:8080/mission/list`)
      .then(res => {
        const missions = res.data;
        this.setState({ missions });
      })
  }

	render () {
		return (
			<Table>
        <thead>
          <tr style={{ textAlign: 'center' }}>
            <th></th>
            <th>Mission name</th>
            <th>Shuttle</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { this.state.missions.map(
            mission => 
              <tr>
                <td>{mission.id}</td>
                <td>{mission.missionName}</td>
                <td>{mission.shuttleId}</td>
                <td></td>
                <td style={{ textAlign: 'right' }}>
                  <Button size="sm" style={{ marginRight: 10 }}>Edit</Button>
                  <Button size="sm" variant="danger">Delete</Button>
                </td>
              </tr>
            ) 
          }
        </tbody>
			</Table>
		)
	}
}

export default MissionList;