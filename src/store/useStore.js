import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      // User state
      user: null,
      isAuthenticated: false,
      
      // Job prediction state
      jobPredictions: [],
      currentPrediction: null,
      
      // UI state
      isLoading: false,
      theme: 'light',
      
      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
      
      setJobPredictions: (predictions) => set({ jobPredictions: predictions }),
      addJobPrediction: (prediction) => set((state) => ({
        jobPredictions: [...state.jobPredictions, prediction]
      })),
      
      setCurrentPrediction: (prediction) => set({ currentPrediction: prediction }),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light'
      })),
      
      // Computed values
      getPredictionById: (id) => {
        const state = get();
        return state.jobPredictions.find(p => p.id === id);
      },
      
      getRecentPredictions: (limit = 5) => {
        const state = get();
        return state.jobPredictions
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, limit);
      }
    }),
    {
      name: 'ai-job-predictor-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        jobPredictions: state.jobPredictions,
        theme: state.theme
      })
    }
  )
);
