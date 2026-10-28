interface InfoItem {
  title: string
  description: string
}

export function InfoGrid({ items }: { items: InfoItem[] }) {
  return (
    <div className="grid">
      {items.map((item) => (
        <div key={item.title} className="card info-card">
          <h3 className="card-title">{item.title}</h3>
          <p className="muted">{item.description}</p>
        </div>
      ))}
    </div>
  )
}
