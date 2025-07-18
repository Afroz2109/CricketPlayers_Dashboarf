import axios from "axios";

let updatingID = null;
const createNoteButton = document.querySelector('.createNoteButton');
const duplicateLists = document.querySelector('.notes');


async function renderElementsToScreen() {
    duplicateLists.innerHTML = '';
    try {
        const response = await axios.get(`https://cricketplayers-dashboarf.onrender.com/api/v1/players/get-players`);
        const players = response.data.data;

        if (Array.isArray(players)) {
            players.forEach(player => {
                renderNoteList(player, player._id);
            });
        }
    } catch (error) {
        console.error('Error fetching players:', error);
    }
}

createNoteButton.addEventListener('click', async () => {
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const role = document.getElementById('role').value;
    const availableInput = document.querySelector('input[name="available"]:checked');
    const available = availableInput ? availableInput.value : "";

    if (!first_name || !last_name || !email || !phone || !role || !available) {
        console.error("All fields are required.");
        return;
    }

    const body = { first_name, last_name, email, phone, role, available };

    try {
        if (updatingID) {
            await axios.put(`https://cricketplayers-dashboarf.onrender.com/api/v1/players/update-player/${updatingID}`, body);
            updatingID = null;
            createNoteButton.innerText = 'Submit';
        } else {
            await axios.post(`https://cricketplayers-dashboarf.onrender.com/api/v1/players/add-players`, body);
        }

        clearForm();
        await renderElementsToScreen(); // ✅ Only once here
    } catch (error) {
        console.error("Error saving player:", error);
    }
});

function clearForm() {
    document.getElementById('first_name').value = '';
    document.getElementById('last_name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('role').value = '';
    const checkedRadio = document.querySelector('input[name="available"]:checked');
    if (checkedRadio) checkedRadio.checked = false;
}

function renderNoteList(note, uniqueID) {
    const noteDiv = document.createElement('div');
    noteDiv.className = `note note${uniqueID}`;

    noteDiv.innerHTML = `
        <h4>Name: ${note.first_name} ${note.last_name}</h4>
        <p class="email">Email: ${note.email}</p>
        <p class="phone">Phone: ${note.phone}</p>
        <p class="role">Role: ${note.role}</p>
        <p class="availability">Available: ${note.available ? "Yes" : "No"}</p>
        <button class="edit-btn" style="background-color: green; color: white; border: none; padding: 7px; margin-right: 10px; border-radius: 6px;">Update</button>
        <button class="delete-btn" style="background-color: red; color: white; border: none; padding: 7px; border-radius: 6px;">Delete</button>
    `;

    noteDiv.querySelector('.edit-btn').addEventListener('click', () => updatePlayers(uniqueID, note));
    noteDiv.querySelector('.delete-btn').addEventListener('click', () => removeElementsfromNotes(uniqueID));

    duplicateLists.appendChild(noteDiv);
}

async function removeElementsfromNotes(id) {
    try {
        await axios.delete(`https://cricketplayers-dashboarf.onrender.com/api/v1/players/delete-player/${id}`);
        await renderElementsToScreen(); 
    } catch (error) {
        console.error("Error deleting player:", error);
    }
}

function updatePlayers(uniqueID, note) {
    document.getElementById('first_name').value = note.first_name;
    document.getElementById('last_name').value = note.last_name;
    document.getElementById('email').value = note.email;
    document.getElementById('phone').value = note.phone;
    document.getElementById('role').value = note.role;
    document.getElementById(note.available === "Yes" ? 'role-yes' : 'role-no').checked = true;

    updatingID = uniqueID;
    createNoteButton.innerText = 'Update';
}

document.addEventListener('DOMContentLoaded', renderElementsToScreen);
