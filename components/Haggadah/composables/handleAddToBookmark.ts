export async function handleAddToBookmark(inBookmarks: boolean, slug: string, vueApp): Promise<void | Error> {
  // TODO: if !loggedIn, show login modal

  try {
    if (inBookmarks) {
      const { _data } = await vueApp.$api.book.unBookmarkBook(slug);
      if (_data?.status) {
        vueApp.$toast.success('Book removed from bookmarks');
      }
    } else {
      const { _data } = await vueApp.$api.book.bookmarkBook(slug);
      if (_data?.status) {
        vueApp.$toast.success('Book added to bookmarks');
      }
    }
  } catch (error) {
    console.error(error);
  }
}
