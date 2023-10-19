const socket = io();

let btnDelete = document.querySelectorAll(".btn-delete");
setDelete(btnDelete);

function setDelete(btnDelete) {
  for (let btn of btnDelete) {
    btn.addEventListener("click", () => {
      Swal.fire({
        title: 'Delete User',
        text: `You will delete the user id: "${btn.value}"`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          let idToDelete = btn.value;
          socket.emit("delete-user", idToDelete);
          Swal.fire(
            'Deleted!',
            'The user has been deleted.',
            'success'
          );
        }
      });
    });
  }
}

socket.on('reload-page', () => {
  location.reload();
});

// Agrega manejo de eventos para eliminar el usuario de la tabla en tiempo real
socket.on("delete-user-in-table", (idToDelete) => {
  btnDelete = document.querySelectorAll(".btn-delete");
  for (let btn of btnDelete) {
    if (btn.value == idToDelete) {
      let child = btn.parentNode;
      let parent = child.parentNode;
      parent.remove();
    }
  }
});
