import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  XAxis,
  ComposedChart,
  CartesianGrid,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  LineChart,
  Line,
} from "recharts";

import SideBarSA from "../SidebarSA/SideBarSA";
import NavBarSA from "../../NavBarSA/NavBarSA";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Center, ChakraProvider, SimpleGrid } from "@chakra-ui/react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
import SideBar from "../../SideBar/SideBar";
const DashboardAd = () => {
  const [activeIndex, setactiveIndex] = useState(0);
  const [nbrFormateurs, setnbrFormateurs] = useState(0);
  const [nbrEtudiants, setnbrEtudiants] = useState(0);
  const [nbrFormations, setnbrFormations] = useState(0);
  const [nbrModules, setnbrModules] = useState(0);
  const [nbrChapitres, setnbrChapitres] = useState(0);
  const [nbrlecon, setnbrlecon] = useState(0);
  const [totalPrix, settotalPrix] = useState(0);

  const [nbrFormateur, setnbrFormateur] = useState([]);
  const [nbretu, setnbretu] = useState([]);
  const [tatalPrix, settatalPrix] = useState([]);

  useEffect(() => {
    const GetnbrForm_ParFormation = async () => {
      const { data } = await axios.get(
        ` http://localhost:3001/Formation/GetLesFormationsAvecNbrFormDeChacune`
      );

      setnbrFormateur(data);
    };
    const GetnbrEtu_ParFormation = async () => {
      const { data } = await axios.get(
        ` http://localhost:3001/Formation/GetLesFormationsAvecNbrEtuDeChacune`
      );

      setnbretu(data);
    };
    const TotalPrixParFormation = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/DashBoardRoute/ToTalPrixdeChaqurFormation`
      );

      settatalPrix(data);
    };
    const nbrFormateurs = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/DashBoardRoute/NombreDesFormateurs`
      );

      setnbrFormateurs(data);
    };
    const nbrEtudiants = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/DashBoardRoute/NombresDesEtudiants`
      );

      setnbrEtudiants(data);
    };
    const nbrFormations = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/DashBoardRoute/ToTalPrixdeChaqurFormation`
      );

      setnbrFormations(data);
    };
    const nbrModules = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/DashBoardRoute/NombreDesModules`
      );

      setnbrModules(data);
    };
    const nbrChapitres = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/DashBoardRoute/NombresDesChapitres`
      );

      setnbrChapitres(data);
    };
    const nbrleçons = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/DashBoardRoute/NombresDesLecon`
      );

      setnbrlecon(data);
    };
    const totalPrix = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/DashBoardRoute/ToTalPrix`
      );

      settotalPrix(data);
    };
    nbrFormateurs();
    nbrEtudiants();
    nbrModules();
    nbrChapitres();
    nbrleçons();
    totalPrix();
    TotalPrixParFormation();
    GetnbrEtu_ParFormation();
    GetnbrForm_ParFormation();
  }, []);
  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`Nombre formateurs `}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {value}
        </text>
      </g>
    );
  };

  const onPieEnter = (_, index) => {
    setactiveIndex(index);
  };
  /** <ResponsiveContainer width="100%" height="100%">
   <LineChart
     width={500}
     height={300}
     data={tatalPrix}
     margin={{
       top: 5,
       right: 30,
       left: 20,
       bottom: 5,
     }}
   >
     <CartesianGrid strokeDasharray="3 3" />
     <XAxis dataKey="name" />
     <YAxis />
     <Tooltip />
     <Legend />
     <Line
       type="monotone"
       dataKey="TotalPrix_par_DT"
       stroke="#8884d8"
       activeDot={{ r: 8 }}
     />
   </LineChart>
 </ResponsiveContainer>;*/
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

            <br />

            <div
              style={{
                flex: "1 1 auto",
                display: "flex",
                flexFlow: "column",
                height: "100vh",
                overflowY: "hidden",
              }}
            >
              <ChakraProvider>
                <SimpleGrid columns={[1, null, 5]} padding="0.5rem">
                  <Center
                    bg="#003f5c"
                    height="100px"
                    width="180px"
                    padding="0.5rem"
                  >
                    <Stat>
                      <StatNumber color="white">Nombre formateurs</StatNumber>

                      <StatHelpText color="white">
                        <StatArrow type="increase" />
                        {nbrFormateurs}
                      </StatHelpText>
                    </Stat>
                  </Center>
                  <Center
                    bg="#58508d"
                    height="100px"
                    width="180px"
                    padding="0.5rem"
                  >
                    {" "}
                    <Stat>
                      <StatNumber color="white"> Nombre formations</StatNumber>
                      <StatHelpText color="white">
                        <StatArrow type="increase" />4
                      </StatHelpText>
                    </Stat>
                  </Center>{" "}
                  <Center
                    bg="#bc5090"
                    height="100px"
                    width="180px"
                    padding="0.5rem"
                  >
                    <Stat>
                      <StatNumber color="white">Nombre modules</StatNumber>

                      <StatHelpText color="white">
                        <StatArrow type="increase" />
                        {nbrModules}
                      </StatHelpText>
                    </Stat>
                  </Center>{" "}
                  <Center
                    bg="#ff6361"
                    height="100px"
                    width="180px"
                    padding="0.5rem"
                  >
                    <Stat>
                      <StatNumber color="white">Nombre chapitres</StatNumber>
                      <StatHelpText color="white">
                        <StatArrow type="increase" />
                        {nbrChapitres}
                      </StatHelpText>
                    </Stat>
                  </Center>{" "}
                  <Center
                    bg="#ffa600"
                    height="100px"
                    width="180px"
                    padding="0.5rem"
                  >
                    {" "}
                    <Stat>
                      <StatNumber color="white">Nombre leçons</StatNumber>

                      <StatHelpText color="white">
                        <StatArrow type="increase" />
                        {nbrlecon}
                      </StatHelpText>
                    </Stat>
                  </Center>
                  <Center
                    bg="#ffa600"
                    height="100px"
                    width="180px"
                    padding="0.5rem"
                    marginTop="2rem"
                  >
                    {" "}
                    <Stat>
                      <StatNumber color="white">Prix Total</StatNumber>

                      <StatHelpText color="white">
                        <StatArrow type="increase" />
                        {totalPrix}
                      </StatHelpText>
                    </Stat>
                  </Center>
                </SimpleGrid>
                <br></br>
              </ChakraProvider>

              <div style={{ height: "calc(100% - 64px)", overflowY: "scroll" }}>
                <SimpleGrid columns={[1, null, 2]} padding="0.5rem">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={400}>
                      <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={nbrFormateur}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                      <ComposedChart
                        width={500}
                        height={400}
                        data={nbretu}
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
                          dataKey="Nbr_Etudiants"
                          barSize={20}
                          fill="green"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </SimpleGrid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAd;
