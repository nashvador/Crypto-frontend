import axios from "axios";
import { loginInfo } from "../components/UserAuthentication/LogInPage";
import { signupInfo } from "../components/UserAuthentication/SignUpPage";

const login = async (baseUrl: string, credentials: loginInfo | signupInfo) => {
  const response = await axios.post(
    process.env.REACT_APP_API_ENDPOINT! + baseUrl,
    credentials
  );
  console.log(response.data);
  return response.data;
};

export default { login };
