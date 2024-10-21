import React, { useEffect, useState } from "react";
import axios from "axios";
import { getEmployeeDetail } from "../../apis/employee";
import EmployeeCardRender from "../render/EmployeeCardRender";

const EmployeecardFetch = () => {
  // const [employee, setEmployee] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    getEmployeeDetail()
      .then((data) => setUser([data]))
      .catch((error) => {
        // handle any errors
        console.error(error);
      });
  }, []);

  console.log(user);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Vertically centers the content
        backgroundColor: "#f4f4f9",
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Employee Details</h1>
      <h2>{user?.map((u) => u.first_name)}</h2>
      <EmployeeCardRender
        name={user?.map((u) => u.first_name)}
        empid={user?.[0].user_id}
        phone={user?.[0].phone}
        designation={user?.[0].designation}
        department={user?.[0].department}
      />
    </div>
  );
};

export default EmployeecardFetch;
