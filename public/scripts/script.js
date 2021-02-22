// Funzione per rimuovere un singolo prodotto dal carrello, utilizzando una Fetch API con metodo DELETE
function eliminaProdotto(prodottoId) {
  fetch(`/cart/${prodottoId}`, {
    //path
    method: "delete",
  })
    .then(function (response) {
      if (response.status === 200) {
        window.location.reload(); // se tutto va a buon fine, ricarica la pagina
      } else {
        alert("Errore durante la rimozione dell'articolo");
      }
    })
    .catch(function (error) {
      alert("Errore durante la rimozione dell'articolo");
    });
}

// Per aggiornare la quantità quando la vai a selezionare e fare submit
const quantityForm = document.getElementById("quantityForm");
const quantityInputField = document.getElementById("itemQuantity");
quantityInputField.onchange = function (event) {
  quantityForm.submit();
};

// Funzione per svuotare il carrello, utilizzando una Fetch API con metodo DELETE
function deleteAllItemsCart() {
  // l'utene non può cliccare 2 volte di fila sul bottone
  $(this).attr("disabled", true); // this fa riferimento al bottone su cui è stato attaccato l'evento

  fetch(`/cart`, {
    method: "delete",
    credentials: "same-origin", // riguarda il CORS, serve per passare le credenziali solo nel caso in cui la risorsa a cui voglio accedere è nella stessa origin
  })
    .then(function (response) {
      if (response.status === 200) {
        window.location.reload(); // se tutto va a buon fine, ricarica la pagina
      } else {
        alert("Errore durante lo svuotamento del carrello");
      }
    })
    .catch(function (error) {
      alert("Errore durante lo svuotamento del carrello");
    });
}
