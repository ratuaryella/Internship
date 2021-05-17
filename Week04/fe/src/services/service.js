import http from "../http-common";

class IssueDataService {
  getAll() {
    return http.get("/issues");
  }

  get(id) {
    return http.get(`/issues/${id}`);
  }

  create(data) {
    return http.post("/issues/", data);
  }

  update(id, data) {
    return http.put(`/issues/${id}`, data);
  }

  delete(id) {
    return http.delete(`/issues/${id}`);
  }

  deleteAll() {
    return http.delete(`/issues`);
  }

}

export default new IssueDataService();