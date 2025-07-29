const imageInput = document.getElementById('imageInput');
    const gallery = document.getElementById('gallery');

    imageInput.addEventListener('change', function () {
      const files = Array.from(this.files);

      files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = function (e) {
          const wrapper = document.createElement('div');
          wrapper.classList.add('image-item');

          wrapper.innerHTML = `
            <img src="${e.target.result}" alt="Image Preview" />
            <button class="delete-btn">Delete</button>
          `;

          wrapper.querySelector('.delete-btn').addEventListener('click', () => {
            wrapper.remove();
          });

          gallery.appendChild(wrapper);
        };

        reader.readAsDataURL(file);
      });

      // Reset input so same file can be reselected later
      this.value = '';
    });