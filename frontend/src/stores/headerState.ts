import { create } from 'zustand'

interface HeaderState {
	isHeaderVisible: boolean
	setHeaderVisible: (visible: boolean) => void
}

export const useHeaderStore = create<HeaderState>((set) => ({
	isHeaderVisible: true,
	setHeaderVisible: (visible: boolean) => set({ isHeaderVisible: visible }),
}))
