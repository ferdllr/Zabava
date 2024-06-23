'use client'

import { Box } from "@mui/material";
import Footer from "../components/Footer";
import PrimaryAppBar from "../components/AppBar";
import React from 'react';
import Tabs from '../components/Tabs';
import useStore from "../store";

const Search: React.FC = () => {
  const { selectedTab } = useStore();

  return (
    <Box>
      <PrimaryAppBar />
      <Tabs />
      <Box>
        {selectedTab === 'EVENTOS' && <div>Conteúdo da aba EVENTOS</div>}
        {selectedTab === 'LOCAIS' && <div>Conteúdo da aba LOCAIS</div>}
      </Box>
      <Footer />
    </Box>
  );
};

export default Search;
