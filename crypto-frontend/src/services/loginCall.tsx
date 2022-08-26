import axios from "axios";
import { loginInfo } from "../components/UserAuthentication/LogInPage";

const login = async (loginCredentials: loginInfo) => {
  const response = await axios.post(
    "http://localhost:3005/api/login/",
    loginCredentials
  );
  console.log(response.data);
  return response.data;
};

export default { login };
