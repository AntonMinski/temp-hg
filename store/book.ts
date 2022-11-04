import { ref } from 'vue';

export const useBookStore = defineStore('book', () => {
    // State
    const books = ref([]);

    // Actions
    async function getBooks<T>(): Promise<T>  {
        try {

            const { _data } = await $http.get(`/books`);
            books.value = _data;
            return _data;

        } catch (err) {
            return err;
        }
    }

    async function getSingleBook<T>(slug: String): Promise<T>  {
        try {

            const { _data } = await $http.get(`/books/${slug}`);
            return _data;

        } catch (err) {
            return err;
        }
    }

    async function createBook<T>(bookData): Promise<T>  {
        try {

            const { _data } = await $http.post(`/books`, { body: bookData });
            return _data;

        } catch (err) {
            return err;
        }
    }

    async function updateBook<T>(slug: String, updateData): Promise<T>  {
        try {

            const { _data } = await $http.patch(`/books/${slug}`, { body: updateData });
            return _data;

        } catch (err) {
            return err;
        }
    }

    async function deleteBook<T>(slug: String): Promise<T>  {
        try {

            const { _data } = await $http.delete(`/books/${slug}`);
            return _data;

        } catch (err) {
            return err;
        }
    }

    async function updateTitlePrivacy<T>(slug: String, updateData): Promise<T>  {
        try {

            const { _data } = await $http.post(`/update-title-book/${slug}`, { body: updateData });
            return _data;

        } catch (err) {
            return err;
        }
    }

    async function saveBook<T>(slug: String): Promise<T>  {
        try {

            const { _data } = await $http.post(`/save-book/${slug}`);
            return _data;

        } catch (err) {
            return err;
        }
    }

    async function unSaveBook<T>(slug: String): Promise<T>  {
        try {

            const { _data } = await $http.post(`/unsave-book/${slug}`);
            return _data;

        } catch (err) {
            return err;
        }
    }

    async function inviteCollaborator<T>(slug: String, collaboratorData): Promise<T>  {
        try {

            const { _data } = await $http.post(`/invite-collaborator/${slug}`, { body: collaboratorData });
            return _data;

        } catch (err) {
            return err;
        }
    }

    async function useAsATemplate<T>(slug: String, bookData): Promise<T>  {
        try {

            const { _data } = await $http.post(`/use-book-template/${slug}`, { body: bookData });
            return _data;

        } catch (err) {
            return err;
        }
    }

    return {
        books,
        getBooks,
        getSingleBook,
        createBook,
        updateBook,
        deleteBook,
        updateTitlePrivacy,
        saveBook,
        unSaveBook,
        inviteCollaborator,
        useAsATemplate,
    };
});
