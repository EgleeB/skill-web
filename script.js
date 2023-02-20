// Fetch data from API//

fetch("https://melon-potent-period.glitch.me/skills")
  .then((response) => response.json())
  .then((data) => {
    const skillsTable = document.getElementById("skillsTable");
    data.forEach((skill) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${skill.id}</td>
          <td>${skill.skill}</td>
          <td><button onclick="deleteSkill(${skill.id})">Delete</button></td>
        `;
      skillsTable.appendChild(row);
    });
  })
  .catch((error) => console.error(error));

// Add skill from user's input //

const addSkillForm = document.getElementById("add-skill");

addSkillForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const skillInput = document.getElementById("skill");
  const newSkill = skillInput.value;

  fetch("https://melon-potent-period.glitch.me/skills", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ skill: newSkill }),
  })
    .then((response) => response.json())
    .then((data) => {
      const skillsTable = document.getElementById("skillsTable");
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${data.id}</td>
      <td>${data.skill}</td>
      <td><button onclick="deleteSkill(${data.id})">Delete</button></td>
    `;
      skillsTable.appendChild(row);
    })
    .catch((error) => console.error(error));
});

// Delete skill//

//BUTTONS//

const addButton = document.getElementById("add");
addButton.addEventListener("click", function () {
  window.open("add.html", "_blank");
});

const backButton = document.getElementById("backButton");
backButton.addEventListener("click", function () {
  history.back();
});
