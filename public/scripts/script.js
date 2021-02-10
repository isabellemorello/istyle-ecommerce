$(document).ready(function () {
  $("#navbarDropdown").hover(
    function () {
      $("ul.dropdown-menu", this).addClass("show");
    },
    function () {
      $("ul.dropdown-menu", this).removeClass("show");
    }
  );
});

function eliminaProdotto(prodottoId) {
  fetch(`/cart/${prodottoId}`, {
    method: "delete",
  })
    .then(function (response) {
      if (response.status === 200) {
        window.location.reload();
      } else {
        alert("Errore durante la rimozione dell'articolo");
      }
    })
    .catch(function (error) {
      alert("Errore durante la rimozione dell'articolo");
    });
}

const quantityForm = document.getElementById("quantityForm");
const quantityInputField = document.getElementById("itemQuantity");

quantityInputField.onchange = function (event) {
  quantityForm.submit();
};

function deleteAllItemsCart() {
  $(this).attr("disabled", true);

  fetch(`/cart`, {
    method: "delete",
    credentials: "same-origin",
  })
    .then(function (response) {
      if (response.status === 200) {
        window.location.reload();
      } else {
        alert("Errore durante lo svuotamento del carrello");
      }
    })
    .catch(function (error) {
      alert("Errore durante lo svuotamento del carrello");
    });
}
