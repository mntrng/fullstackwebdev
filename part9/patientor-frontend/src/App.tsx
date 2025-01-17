import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { setDiagnosisList, setPatientList, useStateValue } from "./state";
import { Diagnosis, Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientInfo from "./PatientInfo";

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    const fetchDiagnosisList = async () => {
      try {
          const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
              `${apiBaseUrl}/diagnoses`
          );
          dispatch(setDiagnosisList(diagnosisListFromApi));
      } catch (e) {
          console.error(e);
      }
  };

    fetchPatientList();
    fetchDiagnosisList();
  }, [dispatch]);
  
  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id" component={PatientInfo} />
            <Route path="/" component={PatientListPage} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
