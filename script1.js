// Fonction pour générer un ID unique

function generateUniqueId() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');
    const uniqueID = `${Math.random().toString(36).substr(2, 4)}${year}${month}${day}`;
    return uniqueID;
  }
  
  
  // Fonction pour ajouter un livre
  function addBook(title, author) {
    var livresEnregistrerJSON = localStorage.getItem('books');
    var livresEnregistrer = [];
  
    if (livresEnregistrerJSON) {
      livresEnregistrer = JSON.parse(livresEnregistrerJSON);
    }
  
    var id = generateUniqueId();
  
    var newBook = {
      id: id,
      title: title,
      author: author,
      read: false
    };
    
    document.getElementById("book-title").value= '';
    document.getElementById("book-author").value= '';
    modal.style.display='none';
  
    livresEnregistrer.push(newBook);
  
    localStorage.setItem('books', JSON.stringify(livresEnregistrer));
    displayBooks();
  }
  
  // Fonction pour supprimer un livre
  function deleteBook(id) {
    var livresEnregistrerJSON = localStorage.getItem('books');
    var livresEnregistrer = [];
  
    if (livresEnregistrerJSON) {
      livresEnregistrer = JSON.parse(livresEnregistrerJSON);
    }
  
    livresEnregistrer = livresEnregistrer.filter(function(book) {
      return book.id !== id;
    });
  
    localStorage.setItem('books', JSON.stringify(livresEnregistrer));
    displayBooks();
  }
  
  // Fonction pour marquer un livre comme lu
  function markAsRead(id) {
    var livresEnregistrerJSON = localStorage.getItem('books');
    var livresEnregistrer = [];
  
    if (livresEnregistrerJSON) {
      livresEnregistrer = JSON.parse(livresEnregistrerJSON);
    }
  
    livresEnregistrer.forEach(function(book) {
      if (book.id === id) {
        book.read = !book.read;
      }
    });
  
    localStorage.setItem('books', JSON.stringify(livresEnregistrer));
    displayBooks();
  }
  
  // Fonction pour afficher la liste des livres
  function displayBooks() {
    var bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
  
    var livresEnregistrerJSON = localStorage.getItem('books');
    var livresEnregistrer = [];
  
    if (livresEnregistrerJSON) {
      livresEnregistrer = JSON.parse(livresEnregistrerJSON);
    }
  
    livresEnregistrer.forEach(function(book) {
      var li = document.createElement('li');
      var titleClass = book.read ? 'book-read' : '';
      li.innerHTML = '<span class="' + titleClass + '">' + book.title + ' - ' + book.author + '</span>' + 
                     '<button onclick="markAsRead(\'' + book.id + '\')">Marquer comme lu</button>' +
                     '<button onclick="deleteBook(\'' + book.id + '\')">Supprimer</button>' +
                     '<span>ID: ' + book.id + '</span>';
      bookList.appendChild(li);
    });
  }
  
  // Fonction pour ouvrir le modal
  document.getElementById('add-book-btn').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'block';
  });
  
  // Fonction pour fermer le modal
  document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
  });
  
  // Fonction pour enregistrer un nouveau livre
  document.getElementById('save-book-btn').addEventListener('click', function() {
    var title = document.getElementById('book-title').value;
    var author = document.getElementById('book-author').value;
    
    addBook(title, author);
    document.getElementById('modal').style.display = 'none';
  });
  
  // Appeler la fonction pour afficher les livres au chargement de la page
  displayBooks();
  