import type { ModelRow } from '../data/types'

/** Model comparison with an inline bar scaled to R², so differences are visible at a glance. */
export default function ModelTable({ rows }: { rows: ModelRow[] }) {
  return (
    <div className="table-wrap">
      <table className="model-table">
        <caption>Eight regressors on the same split (lower MAE and RMSE and higher R² are better)</caption>
        <thead>
          <tr>
            <th scope="col">Model</th>
            <th scope="col">MAE (min)</th>
            <th scope="col">RMSE (min)</th>
            <th scope="col">R²</th>
            <th scope="col">
              <span className="sr-only">R² bar</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.model} className={i === 0 ? 'selected' : undefined}>
              <th scope="row">
                {r.model}
                {i === 0 && <span className="chosen"> (selected)</span>}
              </th>
              <td>{r.mae.toFixed(2)}</td>
              <td>{r.rmse.toFixed(2)}</td>
              <td>{r.r2.toFixed(2)}</td>
              <td aria-hidden="true">
                <span className="bar" style={{ width: `${r.r2 * 100}%` }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
