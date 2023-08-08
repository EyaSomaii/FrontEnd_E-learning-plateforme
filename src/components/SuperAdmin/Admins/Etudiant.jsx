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
import { Badge } from "@chakra-ui/react";
import { Stack } from "react-bootstrap";
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
import SideBarSA from "../SidebarSA/SideBarSA";
import NavBarSA from "../../NavBarSA/NavBarSA";
import AddIcon from "@mui/icons-material/Add";
import { Fab, InputLabel, MenuItem, Select } from "@mui/material";
import { Save } from "@mui/icons-material";
import Liste_Etus from "../../Containers/Liste_Etus";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import SideBar from "../../SideBar/SideBar";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function Etudiant() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState([]);

  const filterContent = async (user, searchTerm) => {
    const result = user.filter(
      (post) =>
        post.nom.toLowerCase().includes(searchTerm) ||
        post.prenom.toLowerCase().includes(searchTerm) ||
        post.email.toLowerCase().includes(searchTerm)
    );
    setUser(result);
    //this.setState({ user: result });
  };

  const handleTextSearch = async (e) => {
    const searchTerm = e.currentTarget.value;
    axios.get("http://localhost:3001/User/Etudiants").then((res) => {
      filterContent(res.data, searchTerm);
    });
  };
  const SuppUser = async (id) => {
    Swal.fire({
      title: "Voulez vous supprimer cet utilisateur !",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Confirmer",
      cancelButtonText: "Annuler",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Suppression Fait Avec Succees", "", "success");
        axios.delete(`http://localhost:3001/User/SupprimerUti/${id}`);
        setUser(user.filter((user) => user._id !== id));
        setTimeout(() => {}, 1000);
      }
    });
  };
  const getUserData = async () => {
    try {
      const data = await axios.get("http://localhost:3001/User/Etudiants");
      console.log(data.data);
      setUser(data.data);
      console.log(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - user.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="d-flex">
      <div>
        <SideBar />
      </div>
      <div
        style={{
          flex: "1 1 auto",
          display: "flex",
          flexFlow: "column",
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        <NavBarSA> </NavBarSA>
        <div style={{ height: "100%" }}>
          <div className="list">
            <br />
            <ChakraProvider>
              <Stack
                direction="row"
                style={{
                  width: "180px",
                  height: "20px",
                  marginLeft: "10px",
                }}
              >
                <Badge colorScheme="purple" fontSize="1em" borderRadius="full">
                  <p style={{ textAlign: "center" }}>Liste des etudiants</p>
                </Badge>
              </Stack>
            </ChakraProvider>

            <br />
            <div
              className="col-lg-3 mt-2 mb-2"
              style={{
                marginLeft: "10px",
              }}
            >
              <input
                className="form-control"
                type="search"
                placeholder="Recherche étudiant"
                name="searchTerm"
                style={{ borderRadius: "20px" }}
                onChange={handleTextSearch}
              ></input>
            </div>
            <div
              style={{
                flex: "1 1 auto",
                display: "flex",
                flexFlow: "column",
                height: "100vh",
                overflowY: "hidden",
              }}
            >
              <div style={{ height: "calc(100% - 64px)", overflowY: "scroll" }}>
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <TableCell>{user.length} Etudiants </TableCell>
                        <TableCell align="left">Contact</TableCell>
                        <TableCell align="left">Inscription</TableCell>
                        <TableCell align="left">Status</TableCell>{" "}
                        <TableCell align="left">Formations</TableCell>{" "}
                        <TableCell align="left"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? user.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : user
                      ).map((row, index) => (
                        <Liste_Etus
                          key={row.name}
                          row={row}
                          Id={row._id}
                          onClick={console.log(index)}
                          SuppUser={SuppUser}
                          idIn={uuidv4()}
                          idIn1={uuidv4()}
                          idIn2={uuidv4()}
                          idIn3={uuidv4()}
                          idIn4={uuidv4()}
                          idIn5={uuidv4()}
                          idIprenom={uuidv4()}
                          ListeUser={getUserData}
                        />
                      ))}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[5]}
                          colSpan={3}
                          count={user.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                            inputProps: {
                              "aria-label": "rows per page",
                            },
                            native: true,
                          }}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
