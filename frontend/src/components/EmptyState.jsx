import { Link } from 'react-router-dom';

export default function EmptyState({ icon, title, description, actionLabel, actionTo }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-16 text-center shadow-md">
      <span className="mb-4 text-6xl" role="img" aria-hidden="true">
        {icon}
      </span>
      <h2 className="mb-2 text-xl font-bold">{title}</h2>
      <p className="mb-6 max-w-md text-gray-600">{description}</p>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="rounded-lg bg-primary px-6 py-3 font-medium text-white hover:bg-primary/90"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
