const statusCodeHandeling = (status) => {
  if (status == 401) {
    localStorage.clear();
    window.location.href = "/";
  }
  if (status == 404) {
    window.location.href = "#/error404";
  }
  if (status == 500) {

    window.location.href = "#/error500";
  }
}

export const statusHandeling = {
  statusCodeHandeling
}