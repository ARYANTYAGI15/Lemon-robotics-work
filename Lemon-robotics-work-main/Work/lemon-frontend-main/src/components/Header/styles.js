const styles = {
  appBar: (theme) => ({
    background: "#fff",
    boxShadow: "none",
    backdropFilter: "blur(8px)",
    //backgroundImage: "linear-gradient(to right, #FFC371, #FF5F6D)",
    backgroundImage:
      "linear-gradient(90deg, rgba(123,181,28,1) 23%, rgba(255,253,0,1) 100%)",
    [theme.breakpoints.up("lg")]: {
      borderBottom: "0.5px solid #777FEB",
      padding: "20px 0",
      margin: "auto",
      maxWidth: "100%",
    },
  }),

  logoDesk: (theme) => ({
    marginRight: 2,
    display: { xs: "none", lg: "flex" },
    flexGrow: 1,
  }),

  logoMob: (theme) => ({
    marginRight: 3,
    display: { xs: "flex", lg: "none" },
    flexGrow: 1,
  }),
};

export default styles;
