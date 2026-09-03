export function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="section-title">
      {eyebrow && <p>{eyebrow}</p>}
      <h2>{title}</h2>
      {text && <span>{text}</span>}
    </div>
  );
}
