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

document.addEventListener("DOMContentLoaded", () => {
  const checkInactiveUsersButton = document.getElementById("check-inactive-users");

  checkInactiveUsersButton.addEventListener("click", () => {
    fetch("/api/users", {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Usuarios inactivos verificados y eliminados con éxito.",
          }).then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al verificar usuarios inactivos.",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});



let btnChangeRol = document.querySelectorAll(".btn-change-rol");
setChangeRol(btnChangeRol);

function setChangeRol(btnChangeRol) {
    for (let btn of btnChangeRol) {
      btn.addEventListener("click", () => {
        Swal.fire({
          title: 'Change User Role',
          text: `You will change the role of the user with id: "${btn.value}"`,
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Change Role',
          html:
              '<input id="swal-input1" class="swal2-input" placeholder="Select the new role" ' +
          'list="roles" ><datalist id="roles" readonly><option value="user"><option value="premium">' +
          '<option value="admin"></datalist>'
        }).then((result) => {
          if (result.isConfirmed) {
            const idToChangeRol = btn.value;
            const newRol = document.getElementById('swal-input1').value;
            socket.emit("change-user-rol", { idToChangeRol: idToChangeRol, newRol: newRol });
            Swal.fire(
              'Role Changed!',
              'The user role has been updated.',
              'success'
            );
          }
        });
      });
    }
  }
