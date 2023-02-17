const logout = async () => {
  const response = await fetch('/api/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};

const deleteProject = async (id) => {
  const { value: result } = await Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this project!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  });

  if (!result) {
    return;
  }

  const response = await fetch(`/api/project/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Failed to delete project!',
    });
  }
};

document.querySelector('#logout').addEventListener('click', logout);
