const styles = {
  btnLink: (theme) => ({
    fontFamily: "Monteserrat, sans-serif",
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "22px",
    textTransform: "capitalize",
    dispaly: "flex",
    color: "#000000",
    padding: "0",
    marginBottom: "44px",
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": {
      background: "#686868",
    },
  }),

  dropDownButton: {
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    textDecoration: "none",
    borderRadius: 16,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 175, 1)",
    dispaly: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    dispaly: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "green",
    textDecoration: "none",
  },

  menuItem: {
    cursor: "pointer",
    "&:hover": {
      background: "#686868",
      color: "red",
    },
  },

  serviceTitle: {
    "&:hover": {
      marginLeft: "20px",
    },
  },
};
export default styles;
