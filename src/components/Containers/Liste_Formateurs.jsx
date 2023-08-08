import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import NavigationIcon from "@mui/icons-material/Navigation";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  ChakraProvider,
} from "@chakra-ui/react";
//import "./Etudiant.css";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Grid from "@mui/material/Grid";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";
import ButtonBase from "@mui/material/ButtonBase";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Chip from "@mui/material/Chip";
import { MultiSelect } from "react-multi-select-component";
import AddIcon from "@mui/icons-material/Add";
import { Fab, MenuItem, Select } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { Delete, List } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import BarChartIcon from "@mui/icons-material/BarChart";
import { ArrowDownIcon, ArrowUpIcon, DownloadIcon } from "@chakra-ui/icons";
import { useHistory, useParams } from "react-router";
import Moment from "react-moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, listeformation, theme) {
  return {
    fontWeight:
      listeformation.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const Liste_Formateurs = ({
  row,
  SuppUser,
  Id,
  idNom,
  idEmail,
  idAdresse,
  idNumTel,
  idPrenom,
  idformation,
  i,
  idIprenom,
}) => {
  const [open3, setOpen3] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen3(true);
  const handleClose = () => setOpen3(false);
  const [nom, setnom] = useState(row.nom);
  const [prenom, setprenom] = useState(row.prenom);
  const [numTel, setnumTel] = useState(row.numTel + "");
  const [Adresse, setAdresse] = useState(row.Adresse);
  const [email, setemail] = useState(row.email);
  const theme = useTheme();
  const [listeformation, setlisteformation] = useState([]);
  const [Formations, setFormations] = useState([]);
  const [formation, setFormation] = useState([]);
  const [selected, setSelected] = useState([]);
  const [tabformation, settabformation] = useState([]);
  const [selectedtabformation, setselectedtabformation] = useState([]);
  const [MesFormations, setMesFormations] = useState([]);

  const history = useHistory();
  const handleChange = (event) => {
    /**const {
      target: { value },
    } = event;*/
    setlisteformation(
      // On autofill we get a stringified value.
      typeof event.target.value === "string"
        ? event.target.value.split(",")
        : event.target.value
    );
    for (let i of event.target.value) {
      setselectedtabformation([{ Titre: i }]);
    }
    console.log(selectedtabformation);
  };
  const Modifier_User = async (id) => {
    //e.preventDefault;
    const info = {
      nom: nom,
      numTel: numTel,
      prenom: prenom,
      email: email,
      Adresse: Adresse,
      formation: listeformation,
    };
    if (
      validator.isEmail(email) &&
      numTel.length == 8 &&
      nom.match(/^[a-zA-Z]+$/) &&
      prenom.match(/^[a-zA-Z]+$/)
    ) {
      await axios.patch(`http://localhost:3001/User/ModifierUti/${id}`, info);
      console.log(selectedtabformation);
      document.getElementById(idNom).innerText = nom;
      document.getElementById(idEmail).innerText = email;
      document.getElementById(idAdresse).innerText = Adresse;
      document.getElementById(idNumTel).innerText = numTel;
      document.getElementById(idIprenom).innerText = prenom;
      Récuperer_mes_formations();
      //document.getElementById(idformation).innerText = listeformation;
      //settabformation(selectedtabformation);

      toast.success("Modification fait avec succées", { autoClose: 2000 });
    } else {
      toast.warning(`Verifier vos champs de saisie`, {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const Elimerformation = async (idForm) => {
    handleClose();
    Swal.fire({
      title: "Voulez vous retirer cette formation !",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Confirmer",
      cancelButtonText: "Annuler",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Formation retirer Avec Succees", "", "success");
        axios.patch(
          `http://localhost:3001/User/eliminerEtud/${idForm}/${row._id}`
        );
      }
      setMesFormations(
        MesFormations.filter((formation) => formation._id !== idForm)
      );
      setTimeout(() => {}, 1000);
    });
  };
  const Récuperer_mes_formations = async () => {
    const mesformations = await axios.get(
      `http://localhost:3001/User/mesformation/${row._id}`
    );
    setMesFormations(mesformations.data);
  };
  const GetFormations = async (id) => {
    const data = await axios

      .get(`http://localhost:3001/User/Notmesformation/${id}`)
      .then((result) => {
        setFormations(result.data);
      });
  };

  function CVFormateur() {
    if (row.cv != null) {
      return (
        <a type="button" href={row.cv} target="_blank">
          <LibraryBooksIcon color="secondary" /> cv
        </a>
      );
    } else {
      return <h1>Non disponible</h1>;
    }
  }
  useEffect(() => {
    Récuperer_mes_formations();
  }, [false]);

  return (
    <React.Fragment>
      <React.Fragment>
        <TableRow
          className="tabRow"
          key={row._id}
          sx={{
            "&:last-child td, &:last-child th": { border: 0 },
          }}
        >
          <TableCell
            component="th"
            scope="row"
            className="button"
            key={row._id}
          >
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase>
                  <Avatar src={row.image} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container className="button">
                <Grid
                  item
                  xs
                  container
                  direction="column"
                  spacing={2}
                  className="button"
                >
                  <Grid item xs>
                    <h3
                      className="button"
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                      id={idNom}
                    >
                      {row.nom}
                    </h3>
                    <h3
                      className="button"
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                      id={idIprenom}
                    >
                      {row.prenom}
                    </h3>
                    <h3
                      className="button"
                      variant="body2"
                      gutterBottom
                      id={idAdresse}
                    >
                      {row.Adresse}
                    </h3>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </TableCell>
          <TableCell align="left">
            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <h3
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                      id={idEmail}
                    >
                      {row.email}
                    </h3>
                    <h3
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                      id={idNumTel}
                    >
                      {row.numTel}
                    </h3>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </TableCell>
          <TableCell align="left">
            {" "}
            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <h3 gutterBottom variant="subtitle1" component="div">
                      <Moment format="MMMM Do YYYY, h:mm:ss a">
                        {row.createdAt}
                      </Moment>
                    </h3>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </TableCell>
          <TableCell align="left" key={row._id}>
            {" "}
            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <CVFormateur />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </TableCell>

          <TableCell>
            <IconButton aria-label="expand row" size="small" key={row._id}>
              <Fab size="small" color="secondary" aria-label="add">
                <div>
                  <List onClick={handleOpen} />
                  <Modal
                    open={open3}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Liste des formations
                      </Typography>
                      <Typography sx={{ mt: 2 }}>
                        {MesFormations.map((item, index) => (
                          <Grid container spacing={3}>
                            <Grid item xs>
                              {" "}
                              <li>{item.Titre}</li>
                            </Grid>
                            <Grid item>
                              <Button
                                color="secondary"
                                onClick={() => {
                                  Elimerformation(item._id);
                                }}
                              >
                                Retirer
                              </Button>
                            </Grid>
                          </Grid>
                        ))}
                      </Typography>
                    </Box>
                  </Modal>
                </div>
              </Fab>
            </IconButton>
            <IconButton aria-label="expand row" size="small" key={row._id}>
              <Fab size="small" color="secondary" aria-label="add">
                {" "}
                <BarChartIcon
                  onClick={() => {
                    history.push("/DashCalender/" + row._id);
                  }}
                ></BarChartIcon>
              </Fab>
            </IconButton>
          </TableCell>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {
                GetFormations(row._id);
                setOpen(!open);
                console.log(row._id);
              }}
              key={row._id}
            >
              {open ? (
                <Fab size="small" color="secondary" aria-label="add">
                  <ArrowUpIcon />
                </Fab>
              ) : (
                <Fab size="small" color="secondary" aria-label="add">
                  <ArrowDownIcon />
                </Fab>
              )}{" "}
            </IconButton>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => SuppUser(Id)}
              key={row._id}
            >
              <Fab size="small" color="secondary" aria-label="add">
                <Delete />
              </Fab>
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <TableRow
                className="tabRow"
                key={row._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row" className="button">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm container className="button">
                      <Grid
                        item
                        xs
                        container
                        direction="column"
                        spacing={2}
                        className="button"
                      >
                        <Grid item xs>
                          <TextField
                            label="Nom"
                            defaultValue={nom}
                            onChange={(e) => setnom(e.target.value)}
                            size="small"
                          />
                          <br></br> <br></br>
                          <h3 gutterBottom variant="subtitle1" component="div">
                            <TextField
                              label="Prénom"
                              defaultValue={prenom}
                              onChange={(e) => setprenom(e.target.value)}
                              size="small"
                            />
                          </h3>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell component="th" scope="row" className="button">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm container className="button">
                      <Grid
                        item
                        xs
                        container
                        direction="column"
                        spacing={2}
                        className="button"
                      >
                        <Grid item xs>
                          <TextField
                            type="number"
                            label="Num_Tel"
                            defaultValue={numTel}
                            onChange={(e) => setnumTel(e.target.value)}
                            size="small"
                          />{" "}
                          <br></br> <br></br>
                          <h3 gutterBottom variant="subtitle1" component="div">
                            <TextField
                              label="Email"
                              defaultValue={email}
                              onChange={(e) => setemail(e.target.value)}
                              size="small"
                            />
                          </h3>
                          <br></br>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </TableCell>

                <TableCell align="left">
                  {" "}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <h3 gutterBottom variant="subtitle1" component="div">
                            <FormControl
                              variant="standard"
                              sx={{ m: 1, minWidth: 120 }}
                            >
                              <InputLabel>Adresse</InputLabel>
                              <Select
                                defaultValue={Adresse}
                                onChange={(e) => setAdresse(e.target.value)}
                              >
                                <MenuItem value="Ariana"> Ariana </MenuItem>
                                <MenuItem value="Beja">Beja</MenuItem>
                                <MenuItem value="Ben Arous">Ben Arous</MenuItem>
                                <MenuItem value="Bizete">Bizete</MenuItem>
                                <MenuItem value="Gabes">Gabes</MenuItem>
                                <MenuItem value="Gafsa">Gafsa</MenuItem>
                                <MenuItem value="Jendouba">Jendouba</MenuItem>
                                <MenuItem value="Kairouan">Kairouan</MenuItem>
                                <MenuItem value="Kasserine">Kasserine</MenuItem>
                                <MenuItem value="Kébili">Kébili</MenuItem>
                                <MenuItem value="Kef">Kef</MenuItem>
                                <MenuItem value="Mahdia">Mahdia</MenuItem>
                                <MenuItem value="Manouba">Manouba</MenuItem>
                                <MenuItem value="Médenine">Médenine</MenuItem>
                                <MenuItem value="Monastir">Monastir</MenuItem>
                                <MenuItem value="Nabeul">Nabeul</MenuItem>
                                <MenuItem value="Sfax">Sfax</MenuItem>
                                <MenuItem value="Sidi Bouzid">
                                  Sidi Bouzid
                                </MenuItem>
                                <MenuItem value="Siliana">Siliana</MenuItem>
                                <MenuItem value="Sousse">Sousse</MenuItem>
                                <MenuItem value="Tataouine">Tataouine</MenuItem>
                                <MenuItem value="Tunis">Tunis</MenuItem>
                                <MenuItem value="Zaghouan">Zaghouan</MenuItem>
                              </Select>
                            </FormControl>
                          </h3>
                          <br></br>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </TableCell>

                <TableCell align="left">
                  {" "}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        {" "}
                        <FormControl sx={{ m: 1, width: 300 }}>
                          <InputLabel>Formations</InputLabel>
                          <Select
                            labelId="demo-multiple-chip-label"
                            multiple
                            value={listeformation}
                            onChange={handleChange}
                            input={
                              <OutlinedInput
                                id="select-multiple-chip"
                                label="Formations"
                              />
                            }
                            renderValue={(selected) => (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
                                {selected.map((value) => (
                                  <Chip key={value} label={value} />
                                ))}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                          >
                            {Formations.map((name) => (
                              <MenuItem
                                key={name._id}
                                value={name.Titre}
                                style={getStyles(name, listeformation, theme)}
                              >
                                {name.Titre}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Button
                      onClick={() => {
                        Modifier_User(row._id);
                      }}
                    >
                      Enregistrer{" "}
                    </Button>
                  </Grid>
                </TableCell>
              </TableRow>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    </React.Fragment>
  );
};

export default Liste_Formateurs;
