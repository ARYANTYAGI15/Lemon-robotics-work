import api from "./myaxios";

export const getEmployeeDetail = async () => {
  const response = await api.get("hr/employees/me");
  return response.data;
};

// export the functions
export default {
  getEmployeeDetail,
};
