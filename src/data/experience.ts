import type { Role, SkillGroup } from './types'

export const experience: Role[] = [
  {
    company: 'Care.fi Technological Solutions Pvt Ltd',
    title: 'Data Analyst Intern',
    type: 'Internship',
    dates: 'Jun 2026 – Sep 2026',
    place: 'Gurugram, India',
    points: [
      'Built and maintained Airflow-orchestrated ETL pipelines in PySpark and SQL, moving large healthcare datasets from OLTP sources into analytical tables stored as partitioned Parquet on AWS S3.',
      'Designed idempotent loads with embedded validation and quality checks, and tuned SQL using query plans to avoid full table scans.',
      'Applied machine learning in Python to pipeline outputs for predictive insights, and reviewed and tested code produced with AI coding assistants.',
    ],
  },
  {
    company: 'IVISH AI Quantum Pvt Ltd',
    title: 'BI & Revenue Operational Analyst Intern',
    type: 'Internship',
    dates: 'Feb 2026 – May 2026',
    place: 'Remote',
    points: [
      'Cleaned and validated 50,000+ records for revenue reporting and operational analysis in a fast-paced startup.',
      'Built 8+ KPI dashboards and investor reports across 4+ business functions, working with 10+ stakeholders to surface growth trends.',
    ],
  },
]

export const skills: SkillGroup[] = [
  { group: 'Programming and data processing', items: ['Python', 'SQL', 'PySpark', 'Pandas', 'NumPy'] },
  {
    group: 'Data engineering',
    items: ['ETL pipelines', 'Apache Airflow', 'Parquet', 'Partitioning', 'Idempotent loads', 'Data validation', 'Query plans', 'OLTP vs OLAP'],
  },
  { group: 'Analytics and visualization', items: ['Power BI', 'Advanced Excel', 'KPI reporting', 'EDA', 'Matplotlib', 'Seaborn', 'Plotly', 'Streamlit'] },
  { group: 'Machine learning', items: ['scikit-learn', 'LightGBM', 'Feature engineering', 'Model evaluation', 'Regression'] },
  {
    group: 'LLMs and AI applications',
    items: ['RAG', 'Embeddings', 'FAISS', 'Cross-encoder reranking', 'LangChain', 'Prompt design', 'Retrieval evaluation'],
  },
  { group: 'Cloud and tools', items: ['AWS (S3, IAM)', 'Linux', 'Git and GitHub', 'Jira', 'AI coding assistants'] },
]
