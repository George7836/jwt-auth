import { AxiosResponse } from "axios";
import api from "../http";
import { User } from "../models/user";

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<User[]>> {
    return api.get<User[]>("/users");
  }
}
