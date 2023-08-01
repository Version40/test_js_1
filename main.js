const notesData = [
    {
        id: 1,
        name: "New Feature",
        created: "2023-08-01 10:00",
        content: "I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
        category: "Task",
        dates: ["2023-08-05, 2023-08-07"]
    },
    {
        id: 2,
        name: "Shopping list",
        created: "2023-08-01 10:58",
        content: "Tomatoes, bread",
        category: "Task",
        dates: [""]
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

// Функція для архівації нотатки
function archiveNote(noteId) {
  for (var i = 0; i < notesData.length; i++) {
    if (notesData[i].id === noteId) {
      notesData[i].archived = true;
      updateTables();
      return;
    }
  }
}

// Функція для редагування нотатки
function editNote(noteId) {
  for (var i = 0; i < notesData.length; i++) {
    if (notesData[i].id === noteId) {
      var newContent = prompt("Enter new content for the note:", notesData[i].content);

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
  for (var i = 0; i < notesData.length; i++) {
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
  var summaryTable = document.getElementById("summary-table");
  var categories = ["Task", "Random Thought", "Idea"];

  // Очищення таблиці
  summaryTable.innerHTML = `
    <tr>
      <th>Category</th>
      <th>Active Notes Count</th>
      <th>Archived Notes Count</th>
    </tr>
  `;

  // Отримання кількості активних та архівованих нотаток за категоріями
  var summaryData = [];
  for (var i = 0; i < categories.length; i++) {
    var category = categories[i];
    var activeNotesCount = 0;
    var archivedNotesCount = 0;

    for (var j = 0; j < notesData.length; j++) {
      var note = notesData[j];
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
  for (var i = 0; i < summaryData.length; i++) {
    var summary = summaryData[i];
    var tableRow = document.createElement("tr");
    tableRow.innerHTML = `
      <td>${summary.category}</td>
      <td>${summary.activeNotesCount}</td>
      <td>${summary.archivedNotesCount}</td>
    `;
    summaryTable.appendChild(tableRow);
  }
}

// Початкове оновлення таблиць при завантаженні сторінки
updateTables();