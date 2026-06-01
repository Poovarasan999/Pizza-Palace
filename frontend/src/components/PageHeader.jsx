import { Link } from 'react-router-dom';

export default function PageHeader({ title, subtitle, badge, breadcrumb }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary to-secondary px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="pizza-pattern absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-7xl">
        {breadcrumb && (
          <nav className="mb-3 flex items-center gap-2 text-sm text-white/70">
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-2">
                {i > 0 && <span>/</span>}
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {badge && (
          <span className="mb-3 inline-block rounded-full bg-white/20 px-4 py-1 text-xs font-bold uppercase tracking-wider">
            {badge}
          </span>
        )}
        <h1 className="text-3xl font-extrabold sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-xl text-white/80">{subtitle}</p>}
      </div>
    </div>
  );
}
