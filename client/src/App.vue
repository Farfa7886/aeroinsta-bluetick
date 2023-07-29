<script setup>
import axios from "axios"
import Swal from 'sweetalert2'

function copyServerUrl() {
  navigator.clipboard.writeText("https://aeroinsta-bluetick.vercel.app")
  document.getElementById("copy-icon").style.display = "none"
  document.getElementById("copy-icon-copied").style.display = "block"
}

function addUsername() {

  document.getElementById("btn-add-loading").style.display = "block"
  document.getElementById("btn-add-text").style.display = "none"
  document.getElementById("btn-add").setAttribute("disabled", "disabled")

  const username = document.getElementById("insta-usr").value

  axios({
    method: 'post',
    url: `https://aeroinsta-bluetick.vercel.app/add/${username}`
  })
  .then((response) => {
    if (response.data.success) {
      Swal.fire(
        'Success',
        'Username successfully added',
        'success'
      )
    }
  })
  .catch((error) => {
    Swal.fire(
      'Uh oh!',
      error.response.data.error,
      'error'
    )
  })
  .finally(() => {
    document.getElementById("btn-add-loading").style.display = "none"
    document.getElementById("btn-add-text").style.display = "block"
    document.getElementById("btn-add").removeAttribute("disabled")
    document.getElementById("insta-usr").value = ""
  })
}

</script>

<template>
  <div style="display: flex; align-items: center; justify-content: center; height: 100vh; width: 100%;">
    <div style="margin: 30px;">
      <div class="mb-10" style="width: 100%; text-align: center;">
        <h1 class="text-2xl">AeroInsta quick blue checkmark</h1>
      </div>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
        <input id="insta-usr" type="text" placeholder="Instagram username" class="input input-bordered input-primary w-full" />
        <button @click="addUsername()" id="btn-add" class="btn btn-primary">
          <p id="btn-add-text">Add me!</p>
          <span id="btn-add-loading" style="display: none;" class="loading loading-spinner loading-md"></span>
        </button>
      </div>
      <div style="text-align: center; margin-top: 30px;">
        <h1 class="text-xl">How to see blue check mark?</h1>
        <p>To see custom blue checkmark use as server the following URL</p>
        <div style="display: flex; justify-content: center; align-items: center;">
          <kbd class="kbd kbd-lg" style="margin-top: 30px;">https://aeroinsta-bluetick.vercel.app</kbd>
          <button @click="copyServerUrl()">
            <svg style="height: 30px; margin-top: 28px; margin-left: 10px; display: block;" id="copy-icon" clip-rule="evenodd" fill="currentColor" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="m6 18v3c0 .621.52 1 1 1h14c.478 0 1-.379 1-1v-14c0-.478-.379-1-1-1h-3v-3c0-.478-.379-1-1-1h-14c-.62 0-1 .519-1 1v14c0 .621.52 1 1 1zm10.5-12h-9.5c-.62 0-1 .519-1 1v9.5h-2.5v-13h13z"/>
            </svg>
            <svg style="height: 30px; margin-top: 28px; margin-left: 10px; display: none;" id="copy-icon-copied" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M9 22l-10-10.598 2.798-2.859 7.149 7.473 13.144-14.016 2.909 2.806z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>