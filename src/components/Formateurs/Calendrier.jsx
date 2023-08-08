import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import React, { useState, useRef, useEffect } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { Select } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Text,
} from "@chakra-ui/react";

import NavBarSA from "../NavBarSA/NavBarSA";
import SideBarF from "./SideBarF/SideBarF";
import { Button, ChakraProvider } from "@chakra-ui/react";
import { Label } from "@mui/icons-material";
import { EventHandler } from "@syncfusion/ej2-base";
import axios from "axios";
import moment from "moment";
import Moment from "react-moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBarSA from "../SuperAdmin/SidebarSA/SideBarSA";
import { Popconfirm, message } from "antd";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
const Calendrier = () => {
  const bb = localStorage.getItem("userInfo");
  const aa = bb.split(",")[0].split(":")[1].split('"')[1];
  const { isOpen, onOpen, onClose } = useDisclosure();

  const calendarRef = useRef(null);
  const [title, setTitle] = useState("");
  const [TitreRoom, setTitreRoom] = useState("");
  const [description, setdescription] = useState("");
  const [lien, setlien] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [events, setevents] = useState([]);
  const [events2, setevents2] = useState([]);

  const [showad, setshoawad] = useState(false);
  const [showform, setshowform] = useState(false);
  const [open, setopen] = React.useState(false);
  const [opendetailMeet, setopendetailMeet] = React.useState(false);
  const [openplanif, setopenplanif] = React.useState(false);
  const [Modules, setModules] = useState([]);
  const [BtnDelte, setBtnDelte] = React.useState("");
  const [BtnplanifDelte, setBtnplanifDelte] = React.useState("");
  const [IdEvent, setIdEvent] = React.useState("");
  const [IdPlanif, setIdPlanif] = React.useState("");
  const [Formations, setFormations] = useState([]);
  const [shoawadmin, setshoawadmin] = React.useState("");

  const { userId } = useParams();
  let meet = false;
  const addevent = (event) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent({
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      title: event.title,
    });
  };
  const planifiermeet = (event) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent({
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      title: event.title,
      TitreRoom: event.TitreRoom,
      description: event.description,
    });
    console.log(event);
  };
  const onsubmit2 = (event) => {
    meet = true;
    console.log(meet);
    event.preventDefault();
    planifiermeet({ title, start, end, TitreRoom, description });
  };
  const onsubmit = (event) => {
    event.preventDefault();
    addevent({ title, start, end });
  };
  async function click(info) {
    if (info.event._def.extendedProps.TitreRoom != null) {
      setBtnplanifDelte(info.event);
      setTitle(info.event.title);
      setdescription(info.event._def.extendedProps.description);
      setTitreRoom(info.event._def.extendedProps.TitreRoom);
      setlien(info.event._def.extendedProps.lien);
      setStart(info.event.start);
      setEnd(info.event.end);
      setIdPlanif(info.event._def.extendedProps._id);
      setopendetailMeet(true);
    } else {
      setBtnDelte(info.event);
      setopen(true);
      setTitle(info.event.title);
      setStart(info.event.start);
      setEnd(info.event.end);
      setIdEvent(info.event._def.extendedProps._id);
    }
  }

  const onsupp = async () => {
    Swal.fire({
      title: "Voulez vous supprimer !",
      icon: "question",
      iconHtml: "؟",
      confirmButtonText: "Confirmer",
      cancelButtonText: "Annuler",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Suppression Fait Avec Succees", "", "success");
        axios.delete(`http://localhost:3001/Calendrier/SuppEvent/${IdEvent}`);
        setevents(events.filter((events) => events._id !== IdEvent));
        setTimeout(() => {}, 1000);
        BtnDelte.remove();
        //setTimeout(window.location.reload(false), 5000);
      }
    });
    /**if (
      window.confirm(
        `Are you sure you want to delete the event '${BtnDelte.title}'`
      )
    ) */ {
    }
    setopen(false);
  };

  const supprimerPlanificationMeet = async () => {
    Swal.fire({
      title: "Voulez vous supprimer cette planification !",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Confirmer",
      cancelButtonText: "Annuler",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Suppression Fait Avec Succees", "", "success");
        axios.delete(
          `http://localhost:3001/RoomMeetRoute/SuppPlanifMeet/${IdPlanif}`
        );
        setevents2(events2.filter((events) => events._id !== IdPlanif));
        setTimeout(() => {}, 1000);
        BtnplanifDelte.remove();
        // setTimeout(window.location.reload(false), 5000);
      }
    });
    setopendetailMeet(false);
  };
  async function handelEventAdd(data) {
    await axios.post(
      `http://localhost:3001/Calendrier/AjouterDate/${aa}`,
      data.event
    );
    toast.success("Séance ajoutée avec succés", {
      autoClose: 1000,
      position: toast.POSITION.BOTTOM_CENTER,
    });
  }
  async function handleEventMeet(data) {
    await axios.post(
      `http://localhost:3001/RoomMeetRoute/AjouterRoom/${aa}`,
      data.event
    );
    toast.success("Planification ajoutée avec mail envoyé aux étudiants ", {
      autoClose: 1000,
      position: toast.POSITION.BOTTOM_CENTER,
    });
  }
  /**  async function handleDateSetAD(data) {
    const response = await axios.get(
      "http://localhost:3001/Calendrier/AfficherDate?start=" +
        moment(data.start).toISOString() +
        "&end=" +
        moment(data.end).toISOString(),
      data.event
    );

    setevents(response.data);
  }*/
  async function handleDateSetAD(data) {
    const response = await axios.get(
      `http://localhost:3001/Calendrier/AfficherDateparformateur/${userId}`,
      data.event
    );

    setevents(response.data);
  }
  async function handleDateSet(data) {
    const response = await axios.get(
      `http://localhost:3001/Calendrier/AfficherDateparformateur/${aa}`,
      data.event
    );

    //setevents({ event: [...events, response.data] });

    setevents(response.data);
  }
  async function handleDateSetMeet(data) {
    const response = await axios.get(
      `http://localhost:3001/RoomMeetRoute/GetHeureDeMeetParFormateur/${aa}`,
      data.event
    );
    //setevents({ event: [...events, response.data] });

    setevents2(response.data);
  }
  console.log(events.concat(events2));
  const handleClose = () => setopen(false);
  const handleCloseplanif = () => setopenplanif(false);
  const handleClosedetailplanif = () => setopendetailMeet(false);
  const handleopenplani = () => setopenplanif(true);

  const getDataById = async () => {
    const data = await axios.get(
      `http://localhost:3001/User/AfficherUtilisateur/${aa}`
    );

    if (data.data[0].Role === "Formateur") {
      setFormations(data.data[0].formation);
      setshowform(true);
    } else if (data.data[0].Role === "SPAdmin") {
      setshoawad(true);
    } else if (data.data[0].Role === "Administrateur") {
      setshoawadmin(true);
    }
  };

  useEffect(() => {
    const getFormateursModules = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/Module/Get_Les_Module_ByFormateurs/${userId}`
      );
      setModules(data);
    };
    getFormateursModules();
  }, []);
  useEffect(() => {
    getDataById();
  }, []);
  return (
    <ChakraProvider>
      {open ? (
        <>
          <Modal isOpen={open} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Detail de votre séance</ModalHeader>
              <ModalCloseButton />

              <ModalBody>
                <Text fontSize="lg">Titre </Text>
                <hr></hr>
                <Text fontSize="md">{title}</Text>
                <br></br>
                <Text fontSize="lg">Date début</Text>
                <hr></hr>
                <Moment format="MMMM Do YYYY, h:mm:ss a">{start}</Moment>
                <br></br>
                <br></br>

                <Text fontSize="lg">Date fin</Text>
                <hr></hr>
                <Moment format="MMMM Do YYYY, h:mm:ss a">{end}</Moment>
                <br></br>
                <br></br>
                {showform ? <Button onClick={onsupp}> Supprimer</Button> : null}
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      ) : null}
      {opendetailMeet ? (
        <>
          <Modal isOpen={opendetailMeet} onClose={handleClosedetailplanif}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Détail </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text fontSize="lg">Titre formation</Text>
                <hr></hr>
                <Text fontSize="md">{title}</Text>
                <br></br>
                <Text fontSize="lg">Titre module</Text>
                <hr></hr>
                <Text fontSize="md">{description}</Text>
                <br></br>
                <Text fontSize="lg">Nom salon</Text>
                <hr></hr>
                <Text fontSize="md">{TitreRoom}</Text>
                <br></br>
                <Text fontSize="lg">Date début</Text>
                <hr></hr>
                <Moment format="MMMM Do YYYY, h:mm:ss a">{start}</Moment>
                <br></br>
                <br></br>
                <Text fontSize="lg">Date fin</Text>
                <hr></hr>
                <Moment format="MMMM Do YYYY, h:mm:ss a">{end}</Moment>
                <br></br>
                <br></br>
                <a href={lien} target="_blank">
                  <Button>Rejoindre meet </Button>
                </a>
                <br></br>
                <br></br>
                {showform ? (
                  <Button onClick={supprimerPlanificationMeet}>
                    {" "}
                    supprimer{" "}
                  </Button>
                ) : null}
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      ) : null}
      {showform ? (
        <>
          {" "}
          <Button onClick={handleopenplani}>Planifier Meet</Button>
        </>
      ) : null}
      <Modal isOpen={openplanif} onClose={handleCloseplanif}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ajouter votre planification meet </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <Select
                placeholder="select formation"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              >
                {Formations.map((item) => (
                  <>
                    {" "}
                    <option value={item.Titre}>{item.Titre}</option>
                  </>
                ))}
              </Select>
              <br></br>
              <Select
                placeholder="select module"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              >
                {Modules.map((item) => (
                  <>
                    {" "}
                    <option value={item.nom}>{item.nom}</option>
                  </>
                ))}
              </Select>
              <br></br>
              <Input
                placeholder="nom room meet"
                value={TitreRoom}
                onChange={(e) => setTitreRoom(e.target.value)}
              ></Input>

              <div>
                <Label>Date debut </Label>
                <Datetime
                  value={start}
                  onChange={(date) => setStart(date)}
                ></Datetime>
              </div>
              <div>
                <Label>Date fin </Label>
                <Datetime
                  value={end}
                  onChange={(date) => setEnd(date)}
                ></Datetime>
              </div>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onsubmit2}>
              Ajouter
            </Button>{" "}
          </ModalFooter>
        </ModalContent>
      </Modal>
      {showform ? (
        <>
          {" "}
          <Button onClick={onOpen}>Ajouter Heure De Travail</Button>
        </>
      ) : null}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ajouter une séance</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <Input
                placeholder="Titre"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Input>
              <div>
                <Label>Date debut </Label>
                <Datetime
                  value={start}
                  onChange={(date) => setStart(date)}
                ></Datetime>
              </div>
              <div>
                <Label>Date fin </Label>
                <Datetime
                  value={end}
                  onChange={(date) => setEnd(date)}
                ></Datetime>
              </div>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onsubmit}>
              Ajouter
            </Button>{" "}
          </ModalFooter>
        </ModalContent>
      </Modal>
      {showad || shoawadmin ? (
        <>
          <FullCalendar
            ref={calendarRef}
            events={events}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            eventAdd={(event) => handelEventAdd(event)}
            datesSet={(date) => handleDateSetAD(date)}
            eventClick={(info) => click(info)}
          />
        </>
      ) : null}
      {showform ? (
        <>
          <FullCalendar
            ref={calendarRef}
            events={events.concat(events2)}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            eventAdd={(event) => {
              if (meet == true) {
                handleEventMeet(event);
              } else {
                handelEventAdd(event);
              }
            }}
            datesSet={(date) => {
              handleDateSetMeet(date);
              handleDateSet(date);
            }}
            eventClick={(info) => click(info)}
          />
        </>
      ) : null}
    </ChakraProvider>
  );
};
export default Calendrier;
