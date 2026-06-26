import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export default api;

export async function getSurveys() {
  const response = await api.get("/surveys");
  return response.data;
}

export async function getSurvey(id: number) {
  const response = await api.get(`/surveys/${id}`);
  return response.data;
}

export async function createSurvey(data: any) {
  const response = await api.post("/surveys", data);
  return response.data;
}

export async function getResults(id: number) {
  const response = await api.get(`/surveys/${id}/results`);
  return response.data;
}

export async function sendResponses(data: any) {
  const response = await api.post("/responses", data);
  return response.data;
}