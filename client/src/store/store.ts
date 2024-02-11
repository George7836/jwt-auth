import { makeAutoObservable } from "mobx";
import { User } from "../models/user";
import AuthService from "../services/authService";
import axios, { AxiosError } from "axios";
import { API_URL } from "../http";
import { AuthResponse } from "../models/response/authResponse";

export default class Store {
  user: User | null = null;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: User | null) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data?.message);
      } else {
        throw new Error((e as Error)?.message || "Неизвестная ошибка");
      }
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data?.message);
      } else {
        throw new Error((e as Error)?.message || "Неизвестная ошибка");
      }
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser(null);
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data?.message);
      } else {
        throw new Error((e as Error)?.message || "Неизвестная ошибка");
      }
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data?.message);
      } else {
        throw new Error((e as Error)?.message || "Неизвестная ошибка");
      }
    } finally {
      this.setLoading(false);
    }
  }
}
