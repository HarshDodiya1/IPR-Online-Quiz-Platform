import React from "react";
import { motion } from "framer-motion";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Box, Container, Typography, IconButton, Link } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import IPRLogo from "../assets/Logo.jpg";

const StyledFooter = styled(Box)({
  background: "linear-gradient(145deg, #f3e7ff 0%, #fff1f9 50%, #e8f4ff 100%)",
  padding: "4rem 0 2rem",
  position: "relative",
  overflow: "hidden",
});

const TeamMemberCard = styled(motion.div)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(10px)",
  borderRadius: "12px",
  padding: "1rem",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  transition: "all 0.3s ease",
  height: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "0.5rem",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
    background: "rgba(255, 255, 255, 0.95)",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0.75rem",
  },
}));

const LogoSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  marginBottom: "2rem",
  [theme.breakpoints.up("md")]: {
    marginBottom: 0,
  },
}));

const LogoImage = styled(motion.img)(({ theme }) => ({
  height: "120px",
  width: "auto",
  objectFit: "contain",
  [theme.breakpoints.down("md")]: {
    height: "140px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "120px",
  },
}));

const teamMembers = [
  {
    name: "Harsh Dodiya",
    linkedin: "https://www.linkedin.com/in/dodiya-harsh/",
  },
  {
    name: "Ridham Patel",
    linkedin: "https://www.linkedin.com/in/ridhampatel2k4/",
  },
  {
    name: "Kandarp Gajjar",
    linkedin: "https://www.linkedin.com/in/kandarpgajjar/",
  },
  { name: "Vihar Talaviya", linkedin: "https://www.linkedin.com/in/vt4/" },
  { name: "Vraj Patel", linkedin: "https://www.linkedin.com/in/imvraj/" },
  {
    name: "Poojal Kachhadiya",
    linkedin: "https://www.linkedin.com/in/pmk2410/",
  },
  {
    name: "Palak Vanpariya",
    linkedin: "https://www.linkedin.com/in/palakvanpariya/",
  },
  {
    name: "Krisha Mangukiya",
    linkedin: "https://www.linkedin.com/in/krisha-mangukiya-03b4b2273/",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 8 },
            mb: 4,
          }}
        >
          {/* Logo Section */}
          <Box
            sx={{
              flex: { md: "0 0 300px" },
              alignSelf: { md: "flex-start" },
            }}
          >
            <LogoSection>
              <LogoImage
                src={IPRLogo}
                alt="IPR Logo"
                component={motion.img}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              />
              <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#e1823a",
                    fontWeight: "500",
                    fontSize: { xs: "1.5rem", sm: "1.5rem" },
                    lineHeight: 1.4,
                  }}
                >
                  प्लाज्मा अनुसंधान संस्थान
                </Typography>
                <Typography
                  sx={{
                    color: "#23559f",
                    fontSize: { xs: "1.5rem", sm: "1.5rem" },
                    fontWeight: "400",
                    lineHeight: 1.4,
                  }}
                >
                  Institute for{" "}
                  <Box component="span" sx={{ fontWeight: 700 }}>
                    Plasma Research
                  </Box>
                </Typography>
              </Box>
            </LogoSection>
          </Box>

          {/* Team Section */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h5"
              sx={{
                color: "#6B46C1",
                fontWeight: "bold",
                marginBottom: "1.5rem",
                textAlign: { xs: "center", md: "center" },
                fontSize: { xs: "1.5rem", sm: "1.75rem" },
              }}
            >
              Our Team
            </Typography>
            <Grid container spacing={2}>
              {teamMembers.map((member, index) => (
                <Grid xs={6} sm={3} key={index}>
                  <TeamMemberCard
                    whileHover={{ scale: 1.03 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: "#2D3748",
                        fontWeight: "600",
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                      }}
                    >
                      {member.name}
                    </Typography>
                    <IconButton
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: "#0077B5",
                        padding: { xs: "4px", sm: "8px" },
                      }}
                    >
                      <LinkedInIcon
                        sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
                      />
                    </IconButton>
                  </TeamMemberCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* Copyright Section */}
        <Box
          sx={{
            borderTop: "1px solid rgba(0, 0, 0, 0.1)",
            paddingTop: "1.5rem",
            marginTop: "1rem",
            textAlign: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "rgba(0, 0, 0, 0.6)",
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          >
            © {currentYear} | Developed by students of{" "}
            <Link
              href="https://www.ldrp.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "#6B46C1",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              LDRP-ITR
            </Link>{" "}
            for{" "}
            <Link
              href="https://www.ipr.res.in/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "#6B46C1",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Institute for Plasma Research
            </Link>
          </Typography>
        </Box>
      </Container>
    </StyledFooter>
  );
}
