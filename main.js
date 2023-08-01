const notesData = [
    {
        id: 1,
        name: "Watch a movie",
        created: "2023-07-12 17:22",
        content: "Fight club",
        category: "Random Thought",
        dates: [""]
    },
    {
        id: 2,
        name: "Buy a car",
        created: "2023-07-27 22:12",
        content: "BMW M3",
        category: "Idea",
        dates: [""]
    },
    {
        id: 3,
        name: "New Feature",
        created: "2023-08-01 10:00",
        content: "I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
        category: "Task",
        dates: ["2023-08-05, 2023-08-07"]
    },
    {
        id: 4,
        name: "Shopping list",
        created: "2023-08-01 10:58",
        content: "Tomatoes, bread",
        category: "Task",
        dates: [""]
    },
    {
        id: 5,
        name: "Write a book",
        created: "2023-08-01 11:03",
        content: "Write a book in the adventure genre",
        category: "Idea",
        dates: [""]
    },
    {
        id: 6,
        name: "Take a walk in the park",
        created: "2023-08-01 11:22",
        content: "Go to Kyoto Park",
        category: "Random Thought",
        dates: [""]
    },
    {
        id: 7,
        name: "Birthday",
        created: "2023-08-01 11:40",
        content: "Buy a gift and order a restaurant",
        category: "Task",
        dates: ["2023-08-22"]
    },
];

// Функція для оновлення таблиць з нотатками та архівованими нотатками
function updateTables() {
    const notesTable = document.getElementById("notes-table");
    const archivedTable = document.getElementById("archived-table");

  // Очищення таблиць
    notesTable.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Created</th>
            <th>Category</th>
            <th>Content</th>
            <th>Dates</th>
            <th>
                <i class="th_icon fa-solid fa-folder-plus"></i>
                <i class="th_icon fa-solid fa-trash-can"></i>
            </th>
        </tr>
    `;
    archivedTable.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Created</th>
            <th>Category</th>
            <th>Content</th>
            <th>Dates</th>
            <th>
                <i class="th_icon fa-solid fa-folder-plus"></i>
                <i class="th_icon fa-solid fa-trash-can"></i>
            </th>
        </tr>
    `;

  // Заповнення таблиць з даними змінної notesData
  for (let i = 0; i < notesData.length; i++) {
    const note = notesData[i];
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `
      <td>${note.name}</td>  
      <td>${note.created}</td>
      <td>${note.category}</td>
      <td>${note.content}</td>
      <td>${note.dates.join(", ")}</td>
      <td>
        <i onclick="editNote(${note.id})" class="button_icon fa-solid fa-pencil"></i>
        <i onclick="archiveNote(${note.id})" class="button_icon fa-solid fa-folder-plus"></i>
        <i onclick="deleteNote(${note.id})" class=" button_icon fa-solid fa-trash-can"></i>
      </td>
    `;

    if (note.archived) {
        archivedTable.appendChild(tableRow);
    } else {
        notesTable.appendChild(tableRow);
    }
  }

  updateSummaryTable();
}

// Функція для архівації або розархівації нотатки
function archiveNote(noteId) {
    for (let i = 0; i < notesData.length; i++) {
        if (notesData[i].id === noteId) {
            notesData[i].archived = !notesData[i].archived;
            updateTables();
            return;
        }
    }
}

function toggleArchivedTable() {
    const archivedTable = document.getElementById("archived-table");
    const toggleArchivedTableBtn = document.getElementById("toggleArchivedTableBtn");

    if (archivedTable.style.display === "none") {
        archivedTable.style.display = "table";
        toggleArchivedTableBtn.textContent = "Hide Archive";
    } else {
        archivedTable.style.display = "none";
        toggleArchivedTableBtn.textContent = "Show Archive";
    }
}

const createNoteMenu = document.getElementById("hidden_note_menu");

function openCreateNoteMenu() {
    createNoteMenu.style.display = "flex";
}

function closeCreateNoteMenu() {
    createNoteMenu.style.display = "none";
}

// Функція для редагування нотатки
function editNote(noteId) {
    for (let i = 0; i < notesData.length; i++) {
        if (notesData[i].id === noteId) {
        const newContent = prompt("Enter new content for the note:", notesData[i].content);

            if (newContent !== null && newContent.trim() !== "") {
                notesData[i].content = newContent.trim();
                notesData[i].datesMentioned = newContent.match(/\d{1,2}\/\d{1,2}\/\d{4}/g) || [];
                updateTables();
            }
            return;
        }
    }
}

// Функція для видалення нотатки
function deleteNote(noteId) {
    for (let i = 0; i < notesData.length; i++) {
        if (notesData[i].id === noteId) {
        notesData.splice(i, 1);
        updateTables();
        return;
    }
  }
}

// Функція для додавання нової нотатки
function addNote() {
  var categorySelect = document.getElementById("category");
  var contentTextarea = document.getElementById("content");

  var category = categorySelect.value;
  var content = contentTextarea.value.trim();

  if (!content) {
    alert("Note content cannot be empty!");
    return;
  }

  var timeOfCreation = new Date().toLocaleString();
  var datesMentioned = content.match(/\d{1,2}\/\d{1,2}\/\d{4}/g) || [];

  notesData.push({
    id: notesData.length + 1,
    timeOfCreation: timeOfCreation,
    content: content,
    category: category,
    datesMentioned: datesMentioned
  });

  // Очистити поле вводу після додавання нотатки
  contentTextarea.value = "";

  updateTables();
}

// Функція для оновлення таблиці зі зведеною інформацією
function updateSummaryTable() {
    const summaryTable = document.getElementById("summary-table");
    const categories = ["Task", "Random Thought", "Idea"];

    // Очищення таблиці
    summaryTable.innerHTML = ` 
        <tr>
            <th>Category</th>
            <th>Active</th>
            <th>Archived</th>
        </tr>
    `;

    // Отримання кількості активних та архівованих нотаток за категоріями
    let summaryData = [];
    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        let activeNotesCount = 0;
        let archivedNotesCount = 0;

        for (let j = 0; j < notesData.length; j++) {
            let note = notesData[j];
            if (note.category === category) {
                if (note.archived) {
                    archivedNotesCount++;
                } else {
                    activeNotesCount++;
                }
            }
        }

        summaryData.push({
            category: category,
            activeNotesCount: activeNotesCount,
            archivedNotesCount: archivedNotesCount
        });
    }

    // Заповнення таблиці зі зведеною інформацією
    for (let i = 0; i < summaryData.length; i++) {
        const summary = summaryData[i];
        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `
            <td>${summary.category}</td>
            <td>${summary.activeNotesCount}</td>
            <td>${summary.archivedNotesCount}</td>
        `;
        summaryTable.appendChild(tableRow);
    }
}

updateTables();