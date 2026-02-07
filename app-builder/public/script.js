function upload() {
  const file = document.getElementById("file").files[0];
  const form = new FormData();
  form.append("appfile", file);

  fetch("/upload", {
    method: "POST",
    body: form
  }).then(loadApps);
}

function loadApps() {
  fetch("/apps")
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("list");
      list.innerHTML = "";
      data.forEach(app => {
        list.innerHTML += `
          <li>
            ${app}
            <button onclick="del('${app}')">Delete</button>
          </li>`;
      });
    });
}

function del(name) {
  fetch("/delete/" + name, { method: "DELETE" })
    .then(loadApps);
}

loadApps();
