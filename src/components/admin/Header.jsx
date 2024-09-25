import React from 'react';
import { Box, Typography, useTheme } from "@mui/material";


const Header = ({title, subTitle}) => {
  const theme = useTheme();
  return (
    <Box mb={2}>
    <Typography
      sx={{
        color: theme.palette.info.light,
        fontWeight: "bold",
        marginBottom:"10px",
      }}
      variant="h4"
    >
      {title}
    </Typography>
    <Typography variant="body1">{subTitle}</Typography>
  </Box>

  
  );
}

export default Header;
