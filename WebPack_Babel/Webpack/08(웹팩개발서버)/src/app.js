import axios from "axios";

document.addEventListener("DOMContentLoaded", async () => {
  // webpack-dev-server mockup api
  const res = await axios.get("/api/users");
  console.log(res);

  document.body.innerHTML = (res.data || [])
    .map((user) => {
      return `<div>${user.id}: ${user.name}</div>`;
    })
    .join("");
});
