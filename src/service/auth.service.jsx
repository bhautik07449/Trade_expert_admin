import { get } from "lodash";
import serverCall from "../serverCall";

const login = async (body) => {
  try {
    const response = await serverCall.post('/auth/login', body);

    const data = get(response, "data", null);

    if (data) {
      setDataToLocal(data);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

const setDataToLocal = (data) => {

  const token = data?.access_token;
  localStorage.setItem("token", token);
};

const getProfile = async () => {
  try {
    const response = serverCall.get('/admin/profile')
    return response
  } catch (error) {
    throw error
  }
}

const AuthService = {
  login, getProfile
};

export default AuthService;
