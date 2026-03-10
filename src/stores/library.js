import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLibraryStore = defineStore('library', () => {
  const books = ref([
    { id: 1, title: 'Math 101', author: 'John Doe', isbn: '12345', available: true },
    { id: 2, title: 'English Literature', author: 'Jane Smith', isbn: '67890', available: false }
  ])

  const borrowBook = (bookId) => {
    const book = books.value.find(b => b.id === bookId)
    if (book) book.available = false
  }

  const returnBook = (bookId) => {
    const book = books.value.find(b => b.id === bookId)
    if (book) book.available = true
  }

  return { books, borrowBook, returnBook }
})