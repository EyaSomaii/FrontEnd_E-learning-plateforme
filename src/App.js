import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import React from "react";
import "./App.css";
import HomePageSA from "./components/SuperAdmin/HomePageSA/HomePageSA";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Authentification/Login";
import Password from "./components/Authentification/ModifierPassWord/Password";
import { home } from "./components/SuperAdmin/home";
import Administrateur from "./components/Administrateur/Administrateur";
import Etudiant from "./components/SuperAdmin/Etudiants/Etudiant";
import { homeF } from "./components/Formateurs/homeF";
import ProfilF from "./components/Formateurs/ProfilF";
import ProfilE from "./components/Etudiant/ProfilE";
import Listformations from "./components/Formations/Listformations.jsx";
import { DetailFormation } from "./components/Formations/DetailFormation";
import { ContenuLeçon } from "./components/Formations/ContenuLeçon ";
import EtudiantList from "./components/SuperAdmin/Etudiants/Etudiant";
import FormateursList from "./components/SuperAdmin/Formateurs/Formateurs";
import AjouterLeçon from "./components/SuperAdmin/Formations/FormationsSA/AjouterLeçon";
import { DetailLeçon } from "./components/Formations/DetailLeçon";
import { AjoutFormation } from "./components/SuperAdmin/HomePageSA/AjoutFormation";
import FormationFormateur from "./components/Formateurs/FormationFormateur";
import FormationsEtudiants from "./components/Etudiant/FormationsEtudiant";
import Calendrier from "./components/Formateurs/Calendrier";
import Depot_Acces from "./components/Depot_AccesEtu/Depot_Acces";
import { HomePageLeçon } from "./components/Formations/HomePageLeçon";
import Admins from "./components/SuperAdmin/Admins/Admins";
import DashboardAd from "./components/SuperAdmin/DashboardAD/DashboardAd";
import { Fiche } from "./components/Evaluation/Fiche";
import FicheEvalAd from "./components/Evaluation/FicheEvalAd";
import FicheEval_Acces from "./components/Evaluation/FicheEval_Acces";
import ModifierLeçon from "./components/ModifierLeçon";
import Meeting from "./components/Meeting/Meeting";
import DashCalenderFormateur from "./components/SuperAdmin/DashCalenderFormateur";
//import SearchUser from "./components/Chats/SearchUser";
import Chatpage from "./components/Chats/Pages/ChatPage";
import SingleChat from "./components/Chats/SingleChat";
import SideBar from "./components/SideBar/SideBar";
import GestionCalndrier from "./components/Formateurs/GestionCalndrier";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/GestionCalndrier/:userId"
            component={GestionCalndrier}
          />{" "}
          <Route exact path="/SideBar" component={SideBar} />{" "}
          <Route exact path="/SingleChat" component={SingleChat} />{" "}
          <Route exact path="/Chatpage" component={Chatpage} />
          <Route
            exact
            path="/DashCalender/:userId"
            component={DashCalenderFormateur}
          />
          <Route exact path="/HomePageLeçon" component={HomePageLeçon} />
          <Route exact path="/video/:id" component={Meeting} />
          <Route
            exact
            path="/ModifierLeçon/:userId"
            component={ModifierLeçon}
          />
          <Route
            exact
            path="/FicheEval_Acces/:userId/:IdFormation"
            component={FicheEval_Acces}
          />
          <Route exact path="/FicheEvalAd" component={FicheEvalAd} />
          <Route exact path="/Fiche/:userId/:IdFormation" component={Fiche} />
          <Route exact path="/Formations" component={HomePageSA} />
          <Route exact path="/Calendrier/:userId" component={Calendrier} />
          <Route exact path="/Dashboard" component={DashboardAd} />
          <Route
            exact
            path="/DetailFormation/:userId/:IdFormation"
            component={Depot_Acces}
          />
          <Route exact path="/Admins" component={Admins} />
          <Route exact path="/ContenuLeçon" component={ContenuLeçon} />
          <Route exact path="/home/Formateur" component={homeF} />
          <Route exact path="/Administrateur/id" component={Administrateur} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/ChangerMotDePasse" component={Password} />
          <Route exact path="/home/:id" component={home} />
          <Route exact path="/Etudiants" component={Etudiant} />
          <Route exact path="/EtudiantList" component={EtudiantList} />
          <Route exact path="/FormateursList" component={FormateursList} />
          <Route exact path="/homeF" component={homeF} />
          <Route exact path="/AjouterLeçon/:userId" component={AjouterLeçon} />
          <Route exact path="/AjoutFormation" component={AjoutFormation} />
          <Route exact path="/profilFormateur/:userId" component={ProfilF} />
          <Route exact path="/profilEtudiant/:userId" component={ProfilE} />
          <Route exact path="/ListFormations" component={Listformations} />
          <Route
            exact
            path="/DetailFormation/:userId"
            component={DetailFormation}
          />
          <Route
            exact
            path="/DetailFormation/:userId/DetailLeçon/:userId"
            component={DetailLeçon}
          />
          <Route
            exact
            path="/FormationFormateur"
            component={FormationFormateur}
          />{" "}
          <Route
            exact
            path="/FormationsEtudiants/:userId"
            component={FormationsEtudiants}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
