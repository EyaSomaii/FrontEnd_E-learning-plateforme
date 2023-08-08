import { Center, ChakraProvider, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Badge,
  Box,
} from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { PieChart, Pie, Legend, Tooltip } from "recharts";
import axios from "axios";
import { useParams } from "react-router-dom";
const FormateurDashBoard = () => {
  const [Nbr, SetNbr] = useState(0);
  const [NbrEtudiant, SetNbrEtudiant] = useState(0);
  const [NbrModule, SetNbrModule] = useState(0);
  const [Nbrchapitre, SetNbrchapitre] = useState(0);
  const [Nbrlecon, SetNbrlecon] = useState(0);
  const [DashCourbe, setDashCourbe] = useState([]);
  const [prenom, setprenom] = useState("");

  const [nom, setnom] = useState("");

  const { userId } = useParams();
  const getDataById = async () => {
    const data = await axios.get(
      `http://localhost:3001/User/AfficherUtilisateur/${userId}`
    );
    console.log(data.data);
    setnom(data.data[0].nom);

    setprenom(data.data[0].prenom);
  };
  useEffect(() => {
    const detnbrEtu_ParFormation = async () => {
      const { data } = await axios.get(
        ` http://localhost:3001/User/GetLesFormationsAvecNbrEtuDeChacune/${userId}`
      );
      console.log(data);
      setDashCourbe(data);
    };
    const getNbrModules = async () => {
      const { data } = await axios.get(
        ` http://localhost:3001/Module/GetNombreModulesAssocierAuFormateur/${userId}`
      );

      SetNbrModule(data);
    };
    const getNbrChapitres = async () => {
      const { data } = await axios.get(
        ` http://localhost:3001/Module/Nombres_chap_DeChaqueFormateur/${userId}`
      );

      SetNbrchapitre(data);
    };
    const getNbrlecon = async () => {
      const { data } = await axios.get(
        ` http://localhost:3001/Module/Nombres_Deslecon_DeChaqueFormateur/${userId}`
      );

      SetNbrlecon(data);
    };
    const getNbrFormation = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/User/GetNombreFormationAssocierAuFormateur/${userId}`
      );

      SetNbr(data);
    };
    const getNbrEtudiants = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/User/GetNombreEtuDiantAssocierAuFormateur/${userId}`
      );
      console.log(data);
      SetNbrEtudiant(data);
    };
    getDataById();
    getNbrFormation();
    getNbrEtudiants();
    getNbrModules();
    getNbrChapitres();
    getNbrlecon();
    detnbrEtu_ParFormation();
  }, []);

  return (
    <ChakraProvider>
      <Center>
        <Box p="6" marginTop="-80px">
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="60" bg="#c9c5c5" fontSize="2xl">
              DashBoard du {nom} {prenom}
            </Badge>
          </Box>
        </Box>
      </Center>
      <SimpleGrid columns={[1, null, 5]}>
        <Center bg="#003f5c" height="100px" width="180px" padding="0.5rem">
          <Stat>
            <StatNumber color="white">Nombre formations</StatNumber>

            <StatHelpText color="white">
              <StatArrow type="increase" />
              {Nbr}
            </StatHelpText>
          </Stat>
        </Center>
        <Center bg="#58508d" height="100px" width="180px" padding="0.5rem">
          {" "}
          <Stat>
            <StatNumber color="white">Nombre modules</StatNumber>
            <StatHelpText color="white">
              <StatArrow type="increase" />
              {NbrModule}
            </StatHelpText>
          </Stat>
        </Center>{" "}
        <Center bg="#bc5090" height="100px" width="180px" padding="0.5rem">
          <Stat>
            <StatNumber color="white">Nombre étudiants</StatNumber>

            <StatHelpText color="white">
              <StatArrow type="increase" />
              {NbrEtudiant}
            </StatHelpText>
          </Stat>
        </Center>{" "}
        <Center bg="#ff6361" height="100px" width="180px" padding="0.5rem">
          <Stat>
            <StatNumber color="white">Nombre chapitres</StatNumber>
            <StatHelpText color="white">
              <StatArrow type="increase" />
              {Nbrchapitre}
            </StatHelpText>
          </Stat>
        </Center>{" "}
        <Center bg="#ffa600" height="100px" width="180px" padding="0.5rem">
          {" "}
          <Stat>
            <StatNumber color="white">Nombre leçons</StatNumber>

            <StatHelpText color="white">
              <StatArrow type="increase" />
              {Nbrlecon}
            </StatHelpText>
          </Stat>
        </Center>
      </SimpleGrid>
      <br></br>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <ComposedChart
            width={500}
            height={400}
            data={DashCourbe}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar
              dataKey="Nombre_Etudiants_par_Formation"
              barSize={20}
              fill="#413ea0"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </ChakraProvider>
  );
};

export default FormateurDashBoard;
