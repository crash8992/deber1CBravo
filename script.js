document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultsContainer = document.getElementById('results');

    // Función para buscar libros en la API de Open Library
    function searchBooks(query) {
        const apiUrl = `https://openlibrary.org/search.json?q=${query}`;

        // Realizar solicitud a la API
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Limpiar 
                resultsContainer.innerHTML = '';

                // Mostrar resultados en la web
                data.docs.forEach(book => {
                    const bookDiv = document.createElement('div');
                    bookDiv.className = 'book';
                    bookDiv.innerHTML = `<h2>${book.title}</h2>
                                         <p>Author: ${book.author_name ? book.author_name.join(', ') : 'N/A'}</p>
                                         <p>First Publish Year: ${book.first_publish_year ? book.first_publish_year : 'N/A'}</p>`;
                    resultsContainer.appendChild(bookDiv);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // hacer click para la busqueda
    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
            searchBooks(searchTerm);
        }
    });

    // buscar mediante texto
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            if (searchTerm !== '') {
                searchBooks(searchTerm);
            }
        }
    });
});
