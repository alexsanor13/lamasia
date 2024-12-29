import { create } from 'zustand'

type Page = 'home' | 'about' | 'contact'

interface CurrentPageStore {
	currentPage: Page
	setCurrentPage: (page: Page) => void
}

export const useCurrentPage = create<CurrentPageStore>((set) => ({
	currentPage: 'home',
	setCurrentPage: (page: Page) => set({ currentPage: page }),
}))
