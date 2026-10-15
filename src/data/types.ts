export type Category = 'analytics' | 'engineering' | 'ml' | 'genai'

export const CATEGORY_LABELS: Record<Category, string> = {
  analytics: 'Data Analytics',
  engineering: 'Data Engineering',
  ml: 'Data Science & ML',
  genai: 'Generative AI',
}

export interface Metric {
  label: string
  value: string
  note?: string
}

export interface ModelRow {
  model: string
  mae: number
  rmse: number
  r2: number
}

export interface Project {
  slug: string
  title: string
  summary: string
  categories: Category[]
  stack: string[]
  problem: string
  objective: string
  data: string
  approach: string[]
  workflow: string[]
  decisions: string[]
  results: Metric[]
  resultsNote?: string
  modelTable?: ModelRow[]
  limitations: string[]
  next: string[]
  /** GitHub repository URL, or null when no public repository exists. */
  repo: string | null
  /** Live demo URL, or null when none exists. */
  demo: string | null
}

export interface Role {
  company: string
  title: string
  type: string
  dates: string
  place: string
  points: string[]
}

export interface SkillGroup {
  group: string
  items: string[]
}

