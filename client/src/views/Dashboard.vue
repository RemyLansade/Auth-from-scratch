<template>
  <section>
    <button @click="logout()" class="btn btn-danger">Logout</button>
    <h1>Dashboard</h1>
    <h2 v-if="!user">Getting user information...</h2>
    <h2 v-if="user">Hello, {{user.username}} ! 👋</h2>
    <button @click="showForm = !showForm" class="btn btn-info">Toggle form</button>
    <form v-if="showForm" @submit.prevent="addNote()">
      <form class="form-group">
        <label for="title">Title</label>
        <input
          v-model="newNote.title"
          id="title"
          class="form-control"
          type="text"
          aria-describedby="titleHelp"
          placeholder="Enter a title">
      </form>
      <form class="form-group">
        <label for="note">Note</label>
        <textarea
          v-model="newNote.note"
          id="note"
          class="form-control"
          rows="3"
          placeholder="Enter your note">
        </textarea>
      </form>
      <button type="submit" class="btn btn-primary">Add note</button>
    </form>
  </section>
</template>

<script>

const API_URL = 'http://localhost:5000/';

export default {
  data: () => ({
    showForm: false,
    user: null,
    newNote: {
      title: '',
      note: '',
    },
    notes: [],
  }),
  mounted() {
    fetch(API_URL, {
      headers: {
        authorization: `Bearer ${localStorage.token}`,
      },
    }).then((res) => res.json())
      .then((result) => {
        if (result.user) {
          this.user = result.user;
        } else {
          this.logout();
        }
      });
  },
  methods: {
    addNote() {
      fetch(`${API_URL}api/v1/notes`, {
        method: 'POST',
        body: JSON.stringify(this.newNote),
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.token}`,
        },
      }).then((res) => res.json())
        .then((note) => {
          this.notes.push(note);
          this.newNote = {
            title: '',
            note: '',
          };
          this.showForm = false;
        });
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
  },
};
</script>

<style>

</style>
