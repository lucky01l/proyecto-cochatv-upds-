"use strict";

import { imageBaseURL } from "./api.js";

// movie card

export function createMovieCard(movie, genreList) {
  const { poster_path, title, vote_average, release_date, genre_ids, id } = movie;

  const card = document.createElement("div");
  card.classList.add("movie-card");

  const generos = genreList ? genreList.asString(genre_ids) : "";

  card.innerHTML = `
    <figure class="poster-box card-banner">
      <img src="${imageBaseURL}w342${poster_path}" alt="${title}" class="img-cover" loading="lazy">
      <span class="card-type">Película</span>
    </figure>

    <h4 class="title">${title}</h4>

    <p class="genre-text">${generos}</p>

    <div class="meta-list">
      <div class="meta-item">
        <img src="./assets/images/star.png" width="20" height="20" loading="lazy" alt="rating">
        <span class="span">${vote_average.toFixed(1)}</span>
      </div>

      <div class="card-badge">${release_date.split("-")[0]}</div>
    </div>

    <a href="./detail.html" class="ver-detalle-btn" title="${title}" onclick="getMovieDetail(${id})">VER PELÍCULA</a>
    <button class="btn-favorito" type="button">★ Favorito</button>
  `;

  // Hover: agranda el poster (Reto 3, evento 2)
  card.addEventListener("mouseover", function () {
    card.querySelector("img").style.transform = "scale(1.05)";
  });

  card.addEventListener("mouseout", function () {
    card.querySelector("img").style.transform = "scale(1)";
  });

  // Botón Favorito: guarda la película en la base de datos vía backend PHP
  card.querySelector(".btn-favorito").addEventListener("click", function (evento) {
    evento.stopPropagation();

    fetch("/cochatv/api/favoritos.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tmdb_id: id,
        titulo: title,
        poster: poster_path,
      }),
    })
      .then((respuesta) => respuesta.json())
      .then((data) => {
        console.log("Favorito guardado:", data);
        evento.target.textContent = "✓ Agregado";
        evento.target.disabled = true;
      })
      .catch((error) => console.error("Error al guardar favorito:", error));
  });

  return card;
}