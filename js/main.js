document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form");
  const tableBody = document.getElementById("tableBody");
  
  // Load existing data from local storage if available
  const storedData = JSON.parse(localStorage.getItem("storedData")) || [];
  storedData.forEach(function (data) {
    const newRow = createTableRow(data.siteName, data.url);
    tableBody.appendChild(newRow);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const siteName = document.querySelector("input[name='site_name']").value;
    const url = document.querySelector("input[name='url']").value;

    if (siteName && url) {
      const newRow = createTableRow(siteName, url);
      tableBody.appendChild(newRow);

      // Save new data to local storage
      const newData = { siteName, url };
      storedData.push(newData);
      localStorage.setItem("storedData", JSON.stringify(storedData));

      // Clear input fields
      document.querySelector("input[name='site_name']").value = "";
      document.querySelector("input[name='url']").value = "";
    }
  });

  tableBody.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-button")) {
      const row = event.target.closest("tr");
      const rowIndex = Array.from(tableBody.children).indexOf(row);

      // Remove data from local storage
      storedData.splice(rowIndex, 1);
      localStorage.setItem("storedData", JSON.stringify(storedData));

      row.remove();
    }
  });

  function createTableRow(siteName, url) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${tableBody.children.length + 1}</td>
      <td>${siteName}</td>
      <td><a href="${url}" target="_blank">${url}</a></td>
      <td><a href="${url}" target="_blank">Visit</a></td>
      <td><button class="btn btn-danger delete-button">Delete</button></td>
    `;
    return newRow;
  }
});