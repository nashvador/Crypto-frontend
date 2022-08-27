import axios from "axios";
import { loginInfo } from "../components/UserAuthentication/LogInPage";
import { signupInfo } from "../components/UserAuthentication/SignUpPage";

const login = async (baseURL: string, credentials: loginInfo | signupInfo) => {
  const response = await axios.post(baseURL, credentials);
  console.log(response.data);
  return response.data;
};

export default { login };
