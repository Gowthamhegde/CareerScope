import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import SchemaMarkup from './SchemaMarkup';
import PropTypes from 'prop-types';

const Breadcrumbs = ({ items }) => {
  // Generate schema data for BreadcrumbList
  const schemaData = {
    items: items.map(item => ({
      name: item.label,
      url: `https://salarypredictor.ai${item.url}`
    }))
  };

  return (
    <>
      {/* Schema Markup */}
      <SchemaMarkup type="BreadcrumbList" data={schemaData} />

      {/* Visual Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center flex-wrap gap-2 text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isFirst = index === 0;

            return (
              <li key={item.url} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRight size={14} className="text-white/30" />
                )}
                
                {isLast ? (
                  <span className="text-cyan font-medium flex items-center gap-2">
                    {isFirst && <Home size={14} />}
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.url}
                    className="text-subtext hover:text-white transition-colors flex items-center gap-2"
                  >
                    {isFirst && <Home size={14} />}
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Breadcrumbs;
