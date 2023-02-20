const ENDPOINT = "https://melon-potent-period.glitch.me/skills";

// Fetch and display data from API//

fetch(ENDPOINT)
  .then((response) => response.json())
  .then((data) => {
    const skillsTable = document.getElementById("skillsTable");

    data.forEach((skill) => {
      const row = createSkillRow(skill);
      skillsTable.appendChild(row);
    });

    // Add skill from user's input//

    const addSkillForm = document.getElementById("add-skill");
    addSkillForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const skillName = document.getElementById("skill").value;

      const newSkill = { skill: skillName };

      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSkill),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to add skill");
          }
        })
        .then((skill) => {
          const row = createSkillRow(skill);
          skillsTable.appendChild(row);
        })
        .catch((error) => console.error(error));
    });
  })
  .catch((error) => console.error(error));

//Create skill in HTML function //

function createSkillRow(skill) {
  const row = document.createElement("tr");
  const idCell = document.createElement("td");
  const skillCell = document.createElement("td");
  const actionCell = document.createElement("td");
  const deleteLink = document.createElement("a");

  idCell.textContent = skill.id;
  skillCell.textContent = skill.skill;

  deleteLink.textContent = "delete";
  deleteLink.href = "#";
  deleteLink.addEventListener("click", (event) => {
    event.preventDefault();

    fetch(`https://melon-potent-period.glitch.me/skill/${skill.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          row.remove();
        } else {
          throw new Error("Failed to delete skill");
        }
      })
      .catch((error) => console.error(error));
  });

  actionCell.appendChild(deleteLink);

  row.appendChild(idCell);
  row.appendChild(skillCell);
  row.appendChild(actionCell);

  return row;
}

//BUTTONS//

// const addSkillButton = document.getElementById("add");
// addSkillButton.addEventListener("click", () => {
//   window.open("add.html", "_blank");
// });

// const backButton = document.getElementById("backButton");
// backButton.addEventListener("click", () => {
//   window.location.href = "index.html";
// });
