<template>
  <section>
    <button @click="logout()" class="btn btn-danger">Logout</button>
    <h1>Dashboard</h1>
    <h2 v-if="!user">Getting user information...</h2>
    <h2 v-if="user">Hello, {{user.username}} ! 👋</h2>
    <div class="custom-control custom-switch">
      <input @click="showForm = !showForm" type="checkbox" class="custom-control-input" id="toggleForm" checked="">
      <label class="custom-control-label" for="toggleForm">Toggle form</label>
    </div>
    <form v-if="showForm" @submit.prevent="addNote()">
      <div class="form-group">
        <h3 for="title">Title</h3>
        <input
          v-model="newNote.title"
          id="title"
          class="form-control"
          type="text"
          aria-describedby="titleHelp"
          placeholder="Enter a title">
      </div>
      <div class="form-group">
        <h3 for="note">Note</h3>
        <textarea
          v-model="newNote.note"
          id="note"
          class="form-control"
          rows="3"
          placeholder="Enter your note">
        </textarea>
      </div>
      <button type="submit" class="btn btn-primary">Add note</button>
    </form>
    <section class="row mt-3">
      <div
        class="col-4"
        v-for="note in notes"
        :key="note._id">
        <div class="card border-primary mb-3">
          <div class="card-header">
            <h3>{{note.title}}</h3>
          </div>
          <div class="card-body">
            <p class="card-text" v-html="renderMarkdown(note.note)"></p>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import MarkdownIt from 'markdown-it';
import emoji from 'markdown-it-emoji';

const md = new MarkdownIt();
md.use(emoji);

const API_URL = 'http://localhost:5000/';

export default {
  data: () => ({
    showForm: true,
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
          this.getNotes();
        } else {
          this.logout();
        }
      });
  },
  methods: {
    renderMarkdown(note) {
      return md.render(note);
    },
    getNotes() {
      fetch(`${API_URL}api/v1/notes`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        },
      }).then((res) => res.json())
        .then((notes) => {
          this.notes = notes;
        });
    },
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
.card {
  height: 90%;
  margin-bottom: 1em;
}
.card-text img {
  width: 100%;
}
</style>
