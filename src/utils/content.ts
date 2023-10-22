type SortCollectionItems = {
	<C extends { id: string }[]>(collection: C): C
}

export const sortCollectionItems: SortCollectionItems = (collection) =>
	collection.sort((a, b) => (parseInt(a.id) > parseInt(b.id) ? -1 : 0))
