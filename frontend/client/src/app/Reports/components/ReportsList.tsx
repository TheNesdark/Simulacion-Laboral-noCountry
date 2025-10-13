interface Report {
  id: string;
  title: string;
  date: string;
  doctor: string;
}

interface ReportsListProps {
  reports: Report[];
}

export default function ReportsList({ reports }: ReportsListProps) {
  return (
    <section className="reports-list">
      {reports.map((report) => (
        <article className="report-card" key={report.id}>
            <h2>{report.title}</h2>
            <time dateTime={report.date}>
              {report.date}   -   {report.doctor}
            </time>
            <div className="report-card__meta">
              <span className="report-card__meta-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4 0-2.21-1.79-4-4-4-2.21 0-4 1.79-4 4 0 2.21 1.79 4 4 4z" />
                  <path d="M12 19c-5 0-5-2-5-4h10c0 2-5 4-5 4z" />
                </svg>
              </span>
              <span>{report.date}</span>
            </div>
        </article>
      ))}
    </section>
  );
}