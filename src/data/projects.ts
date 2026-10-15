import type { Project } from './types'

const GH = 'https://github.com/hemlata009'

export const projects: Project[] = [
  {
    slug: 'document-rag-chatbot',
    title: 'Document RAG Chatbot',
    summary:
      'Question answering over PDFs with dense retrieval, cross-encoder reranking and cited answers, built together with an evaluation harness so retrieval quality is measured rather than eyeballed.',
    categories: ['genai'],
    stack: ['Python', 'Sentence Transformers', 'FAISS', 'CrossEncoder', 'LangChain', 'SQLite', 'Streamlit'],
    problem:
      'A language model answers fluently even when it does not know. For questions about a specific document, an answer is only useful if it comes from that document and the system says so when it cannot find one.',
    objective:
      'Build a retrieval-augmented pipeline for personal PDFs, then add the measurement tooling needed to compare retrieval strategies on a fixed question set.',
    data: 'A multi-page PDF report used as the evaluation document, with a hand-labelled question set that maps each question to the chunks and pages that answer it.',
    approach: [
      'Extract page text with pypdf and split it into paragraph-aware chunks with stable ids of the form file::page::chunk.',
      'Embed chunks with Sentence Transformers and index them in FAISS; retrieve the top 6 candidates per query.',
      'Rerank candidates with a cross-encoder, then select chunks under a token budget so the final prompt always fits the model input limit.',
      'Generate with a LangChain LCEL chain through an OpenAI-compatible endpoint. Instructions go in system messages; retrieved text and chat history are treated as untrusted data.',
      'Keep conversation memory in SQLite: bounded recent history plus a rolling summary, with follow-up questions rewritten into standalone queries.',
      'Optional hybrid mode merges dense and BM25 results with Reciprocal Rank Fusion before reranking.',
    ],
    workflow: ['PDF', 'Chunk', 'Embed + FAISS top 6', 'Cross-encoder rerank', 'Token-budget context', 'LLM answer with citations'],
    decisions: [
      'Chunk ids encode file, page and position, so every retrieved chunk can be checked against a labelled answer and cited back to a page.',
      'A cross-encoder reranks the FAISS candidates because raw embedding similarity ranked the right chunk fourth in a logged run; after reranking it came first.',
      'Context is selected by token count, not chunk count, after an early run failed with "Final prompt exceeds configured input budget".',
      'Dense retrieval stays the default; hybrid is opt-in until a fresh comparison on the fixed question set justifies changing it.',
    ],
    results: [
      { label: 'Recall@4', value: '0.83', note: 'Experiment 4, dense top 6 + reranker' },
      { label: 'MRR', value: '0.83', note: 'first relevant chunk usually ranks first' },
      { label: 'Precision@4', value: '0.25', note: 'capped by one or two relevant chunks per question' },
    ],
    resultsNote:
      'Measured on one document and a small question set. Treat these as a baseline for further experiments, not a general accuracy claim.',
    limitations: [
      'Evaluated on a single document; results may not transfer to other layouts or longer documents.',
      'Early answer-accuracy runs produced false "not found" answers and one prompt-budget error. Later milestones target these, but a fresh end-to-end benchmark has not been recorded yet.',
      'Hybrid retrieval is implemented and unit-tested but not yet benchmarked against dense retrieval.',
      'Uses a hosted free-tier model, so answer quality and latency vary. Not hardened for production use.',
    ],
    next: [
      'Run the dense versus hybrid comparison on the fixed question set and record the numbers.',
      'Extend the evaluation set to several documents.',
    ],
    repo: `${GH}/pdf_rag_chatbot`,
    demo: null,
  },
  {
    slug: 'delivery-time-prediction',
    title: 'Smart Logistics Delivery Prediction',
    summary:
      'Predicts food delivery time from distance, traffic, weather, vehicle and delivery-partner features. Eight regressors were compared; LightGBM was selected and wrapped in a Streamlit dashboard.',
    categories: ['ml'],
    stack: ['Python', 'scikit-learn', 'LightGBM', 'Pandas', 'Streamlit'],
    problem:
      'Delivery estimates drive customer expectations and dispatch decisions. A flat average ignores traffic, weather and distance, so errors are large exactly when conditions are bad.',
    objective:
      'Predict delivery time in minutes, compare several model families on the same split, and expose the result in an interface that shows what drives the estimate.',
    data: 'About 45,000 food-delivery records with order time, restaurant and delivery coordinates, weather, traffic density, vehicle type, delivery-person rating and the observed delivery time.',
    approach: [
      'Parse dates and times, clean text categories, and derive day of week, month and order hour.',
      'Derive delivery distance from the restaurant and delivery coordinates (geodesic distance).',
      'Build a scikit-learn pipeline: imputation, scaling for numeric columns, one-hot encoding for categories.',
      'Compare eight regressors on one train/test split using MAE, RMSE and R².',
      'Tune LightGBM in the notebook and fit the final model in train_model.py.',
      'Serve predictions in a Streamlit dashboard with dataset overview, EDA and prediction pages.',
    ],
    workflow: ['Raw CSV', 'Clean + feature engineering', 'Pipeline', '8-model comparison', 'LightGBM', 'Streamlit dashboard'],
    decisions: [
      'Compared linear, tree, boosting, kernel and neighbour models first; the boosted models were close, so LightGBM was chosen for speed and categorical handling.',
      'Preprocessing lives inside a scikit-learn Pipeline so the app applies exactly the transformation used in training.',
      'Metrics are reported in minutes (MAE, RMSE) alongside R², since minutes are what a dispatcher actually reads.',
    ],
    results: [
      { label: 'MAE', value: '3.64 min', note: 'LightGBM, test set' },
      { label: 'RMSE', value: '4.61 min' },
      { label: 'R²', value: '0.76', note: 'best of 8 models, tied with RF, XGBoost and CatBoost' },
    ],
    modelTable: [
      { model: 'LightGBM', mae: 3.64, rmse: 4.61, r2: 0.76 },
      { model: 'Random Forest', mae: 3.62, rmse: 4.62, r2: 0.76 },
      { model: 'XGBoost', mae: 3.65, rmse: 4.63, r2: 0.76 },
      { model: 'CatBoost', mae: 3.65, rmse: 4.62, r2: 0.76 },
      { model: 'Gradient Boosting', mae: 3.71, rmse: 4.68, r2: 0.75 },
      { model: 'SVR', mae: 4.11, rmse: 5.26, r2: 0.69 },
      { model: 'K-Neighbors', mae: 4.69, rmse: 6.05, r2: 0.59 },
      { model: 'Linear Regression', mae: 5.14, rmse: 6.53, r2: 0.52 },
    ],
    resultsNote:
      'Figures come from the comparison cell in the project notebook. The four strongest models differ by under 0.1 minutes of MAE, so the choice of LightGBM is about practicality, not a decisive accuracy gap.',
    limitations: [
      'R² of 0.76 means about a quarter of the variation in delivery time is unexplained by the available features.',
      'One dataset and one split; no cross-city or time-based validation.',
      'The in-app confidence range is a heuristic margin, not a statistically derived prediction interval.',
    ],
    next: [
      'Add time-based validation to check performance on later orders.',
      'Replace the heuristic range with quantile or conformal intervals.',
    ],
    repo: `${GH}/Smart-Logistics-Delivery-Prediction-System`,
    demo: null,
  },
  {
    slug: 'ipl-pyspark-analysis',
    title: 'IPL Analysis with PySpark',
    summary:
      'Joins match, player, team and ball-by-ball data with PySpark to answer questions about top performers, win trends, toss impact, strike rates and venue effects.',
    categories: ['engineering', 'analytics'],
    stack: ['PySpark', 'Python', 'Pandas', 'Matplotlib', 'Seaborn'],
    problem:
      'Ball-by-ball cricket data is large and spread across several related tables, which makes simple spreadsheet analysis slow and error-prone.',
    objective:
      'Use distributed DataFrame operations to join and aggregate the tables, then answer a defined list of analytical questions.',
    data: 'Match, player, team, player-match and ball-by-ball CSV files from the Indian Premier League (the ball-by-ball file is about 25 MB).',
    approach: [
      'Load the CSV files into Spark DataFrames in a Jupyter notebook.',
      'Join matches, players, teams and deliveries on their keys.',
      'Aggregate with groupBy and Spark SQL for batting, bowling, toss and venue questions.',
      'Convert small aggregated results to Pandas for charts.',
    ],
    workflow: ['CSV tables', 'Spark DataFrames', 'Joins', 'Aggregations', 'Charts'],
    decisions: [
      'Aggregate in Spark and convert only the small result sets to Pandas for plotting.',
      'Keep the question list explicit: top run scorers and wicket-takers, team win trends, toss decision impact, strike rate and economy, venue performance.',
    ],
    results: [],
    resultsNote:
      'The repository documents the analysis questions but does not publish headline numbers, so none are shown here. This project is evidence of PySpark working skills, not of a specific finding.',
    limitations: [
      'No stated findings or validation in the README.',
      'Runs locally on a single machine, so it demonstrates the API rather than cluster-scale tuning.',
    ],
    next: ['Write up the findings with numbers.', 'Add a README section on how to reproduce the notebook run.'],
    repo: `${GH}/IPL-Data-Analysis`,
    demo: null,
  },
  {
    slug: 'bank-churn-analytics',
    title: 'Bank Customer Churn Analytics',
    summary:
      'An interactive Power BI dashboard over 10,001 bank customers that shows who leaves and which factors line up with leaving: credit score, age, activity and geography.',
    categories: ['analytics'],
    stack: ['Power BI', 'Excel', 'CSV'],
    problem: 'A bank loses customers without knowing which segments are at risk, so retention effort is spread thinly.',
    objective:
      'Identify demographic and financial factors associated with churn and give a business team a dashboard to explore them.',
    data: '10,001 customer records across seven source tables: customer info, churn status, credit card, active status, gender, geography and exit flag.',
    approach: [
      'Clean and prepare the source tables in Excel.',
      'Model the tables in Power BI and define KPIs for total customers, churned customers and retention rate.',
      'Build views by age, gender, geography and credit score, with slicers to compare churned and retained customers.',
    ],
    workflow: ['Source tables', 'Excel cleaning', 'Power BI model', 'KPI dashboard'],
    decisions: [
      'Kept customer attributes in separate lookup tables and joined them in the model, so slicers filter consistently.',
      'Framed the dashboard around retention KPIs rather than raw counts.',
    ],
    results: [
      { label: 'Customers analysed', value: '10,001' },
      { label: 'Source tables', value: '7' },
    ],
    resultsNote:
      'Patterns reported in the project: lower credit scores, younger customers and inactive members show higher churn, and churn varies by geography. The repository does not state effect sizes, so none are quoted here.',
    limitations: [
      'Findings are descriptive; no statistical test or predictive model is included in the repository.',
      'The dashboard is a .pbix file, so it needs Power BI Desktop to open. A preview image is not yet committed.',
    ],
    next: [
      'Add significance tests for the main churn drivers.',
      'Commit dashboard screenshots and publish quantified findings.',
      'Add a simple churn-risk model in Python.',
    ],
    repo: `${GH}/Bank-Customer-Churn-Analysis`,
    demo: null,
  },
  {
    slug: 'playstore-eda',
    title: 'Google Play Store App Analysis',
    summary:
      'Cleans the public Play Store dataset and explores how category, price, size, reviews and ratings relate to installs.',
    categories: ['analytics'],
    stack: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly'],
    problem:
      'Developers want to know what separates widely installed apps from the rest, but the raw data has missing values, duplicates and text-formatted numbers.',
    objective:
      'Produce an analysis-ready dataset and use it to compare categories, free versus paid apps, and the relationship between ratings, reviews and installs.',
    data: 'The Google Play Store apps dataset: 10,841 rows and 13 columns covering category, rating, reviews, size, installs, type and price.',
    approach: [
      'Handle missing values and duplicates, and convert installs, price and size from text to numbers.',
      'Engineer features for analysis in the notebook.',
      'Visualize rating distributions, installs versus reviews, top categories and free versus paid performance.',
    ],
    workflow: ['Raw CSV', 'Cleaning', 'Feature engineering', 'EDA charts', 'Insights'],
    decisions: [
      'Treated installs, price and size as parsing problems first, because the analysis is meaningless until they are numeric.',
      'Used interactive Plotly charts where exploring categories mattered, static charts elsewhere.',
    ],
    results: [
      { label: 'Rows in source data', value: '10,841' },
      { label: 'Columns', value: '13' },
    ],
    resultsNote:
      'Reported findings: Family, Tools and Games dominate by app count; a higher rating does not guarantee more installs; free apps get more installs while paid apps show slightly better average ratings.',
    limitations: [
      'Pandas on a roughly 10,000-row file, so it does not demonstrate large-scale processing.',
      'Findings are descriptive and not tested for statistical significance.',
    ],
    next: ['Add significance tests for the free versus paid rating gap.', 'Repeat the cleaning in PySpark on a larger scrape.'],
    repo: `${GH}/Playstore-Analysis`,
    demo: null,
  },
]

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
