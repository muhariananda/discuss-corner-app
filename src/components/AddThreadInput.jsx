import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import useInputHTML from '../hooks/useInputHTML';

function AddThreadInput({ addThread }) {
  const [title, handleTitleChange] = useInput('');
  const [body, handleBodyChange] = useInputHTML('');
  const [category, handleCategoryChange] = useInput('');

  const handleAddThread = (event) => {
    event.preventDefault();
    if (!title || !body) {
      alert('Judul dan keterangan tidak boleh kosong');
    } else {
      addThread({ title, body, category });
    }
  };

  return (
    <form onSubmit={handleAddThread}>
      <div className="mb-4">
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleTitleChange}
          className="mt-1 p-2 w-full border rounded-md"
          placeholder="Judul"
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          id="category"
          name="category"
          value={category}
          onChange={handleCategoryChange}
          className="mt-1 p-2 w-full border rounded-md"
          placeholder="Kategori (Opsional)"
        />
      </div>

      <div className="mb-4">
        <div
          id="content"
          name="content"
          contentEditable
          data-placeholder="Masukkan konten"
          onInput={handleBodyChange}
          className="mt-1 p-2 w-full border rounded-md h-32"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white rounded p-2 mt-3 w-full hover:bg-blue-700"
      >
        Buat
      </button>
    </form>
  );
}

AddThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default AddThreadInput;
