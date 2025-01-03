import React from "react";
import ExpenseSheetForm from "../forms/ExpenseSheetForm";
import ExpenseSheetFetch  from "../fetch/ExpenseSheetFetch";
import ExpenseSheetRender from "../render/expensesheetrender";
import {Grid} from "@mui/material";

const ExpenseSheetWindow = () =>{
    return (
        <>
          <Grid
            container
            spacing={4}
            sx={{
              display: "flex",
              backgroundImage:
                "url('https://cdn.photographylife.com/wp-content/uploads/2014/09/Nikon-D750-Image-Samples-2.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
              maxWidth: "100%",
              mt: 10,
              ml: 10,
              alignContent: {
                xs: "flex-start",
                sm: "center",
              },
            }}
          >
            <Grid item xs={4} sx={{ maxWidth: { xs: "75%", lg: "50%" } }}>
              <ExpenseSheetForm />
            </Grid>
            <Grid item xs={4} sx={{ maxWidth: { xs: "75%", lg: "50%" } }}>
              <ExpenseSheetFetch/>
            </Grid>
          </Grid>
        </>
      );
};
export default ExpenseSheetWindow;