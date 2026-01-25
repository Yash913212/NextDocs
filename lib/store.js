import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useThemeStore = create(
  persist(
    (set) => ({
      isDark: false,
      setIsDark: (isDark) => set({ isDark }),
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
    }),
    {
      name: 'theme-storage',
    }
  )
)

export const useSidebarStore = create(
  persist(
    (set) => ({
      isOpen: true,
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
      setOpen: (isOpen) => set({ isOpen }),
    }),
    {
      name: 'sidebar-storage',
    }
  )
)

export const useSearchStore = create((set) => ({
  query: '',
  setQuery: (query) => set({ query }),
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}))
