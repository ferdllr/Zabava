import { create } from 'zustand'

type Store = {
  count: number
  inc: () => void
  selectedTab: string
  setSelectedTab: (tab: string) => void
}

const useStore = create<Store>()((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
  selectedTab: 'EVENTOS',
  setSelectedTab: (tab) => set({ selectedTab: tab }),
}))

export default useStore;