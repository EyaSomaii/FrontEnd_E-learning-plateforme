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
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import Moment from "react-moment";
import validator from "validator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const Liste_Admins = ({
  row,
  SuppUser,
  Id,
  idIn,
  idIn1,
  idIn2,
  idIprenom,
  idIn5,
}) => {
  const [open2, setOpen2] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen2(true);
  const handleClose = () => setOpen2(false);
  const [nom, setnom] = useState(row.nom);
  const [prenom, setprenom] = useState(row.prenom);
  const [numTel, setnumTel] = useState(row.numTel + "");
  const [Adresse, setAdresse] = useState(row.Adresse);
  const [email, setemail] = useState(row.email);
  const Modifier_User = async (id) => {
    const info = {
      nom: nom,
      prenom: prenom,
      numTel: numTel,
      email: email,
      Adresse: Adresse,
    };
    if (
      validator.isEmail(email) &&
      numTel.length == 8 &&
      nom.match(/^[a-zA-Z]+$/) &&
      prenom.match(/^[a-zA-Z]+$/)
    ) {
      await axios.patch(`http://localhost:3001/User/ModifierUti/${id}`, info);

      axios
        .get(`http://localhost:3001/User/AfficherUtilisateur/${id}`)
        .then((result) => {
          document.getElementById(idIn).innerText = result.data[0].nom;
          document.getElementById(idIn1).innerText = result.data[0].numTel;
          document.getElementById(idIn2).innerText = result.data[0].email;
          document.getElementById(idIn5).innerText = result.data[0].Adresse;
          document.getElementById(idIprenom).innerText = result.data[0].prenom;
        });
      toast.success(`Modification fait avec succès`, {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.warning(`Verifier vos champs de saisie`, {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

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
                      id={idIn}
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
                      id={idIn5}
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
                      id={idIn2}
                    >
                      {row.email}
                    </h3>
                    <h3
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                      id={idIn1}
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
                      </Moment>{" "}
                    </h3>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </TableCell>

          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {
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
                              label="Prenom"
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

                <TableCell align="left">
                  {" "}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <h3 gutterBottom variant="subtitle1" component="div">
                            <TextField
                              label="Num_Tel"
                              type="number"
                              defaultValue={numTel}
                              onChange={(e) => setnumTel(e.target.value)}
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
                                value={Adresse}
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

export default Liste_Admins;
