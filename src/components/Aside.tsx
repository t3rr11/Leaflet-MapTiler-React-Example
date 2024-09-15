import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';
import { faMap } from '@fortawesome/free-solid-svg-icons';

const MenuItems = [
  { key: 'leaflet', label: 'Leaflet', icon: faMap, route: '/leaflet', disabled: false, released: true },
  { key: 'maptiler', label: 'MapTiler', icon: faMap, route: '/maptiler', disabled: false, released: true },
];

const MenuItemClasses = `flex p-2 rounded mx-4 gap-2 hover:cursor-pointer hover:bg-slate-600 hover:text-white items-center`;
const DisabledMenuItemClasses = `${MenuItemClasses} !bg-gray-200 !text-gray-500 !hover:bg-gray-200 !hover:text-gray-500 !hover:cursor-not-allowed`;

export const Aside = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="flex flex-1 flex-col items-center gap-2 min-w-[15.6rem] max-w-[15.6rem] bg-white shadow-[rgba(0,0,0.2,0.1)_1px_0px_10px_0px]">
      <div className="flex flex-col gap-2 w-full py-5">
        {MenuItems.map((item) => (
          <div
            key={`menuItem-${item.key}`}
            data-side-nav={item.key}
            className={`${item.disabled ? DisabledMenuItemClasses : MenuItemClasses} ${
              location.pathname === item.route && 'bg-slate-600 text-white'
            }`}
            onClick={() => {
              if (!item.disabled) navigate(item.route);
            }}
          >
            <div className="flex justify-center items-center w-8 h-8 rounded text-base">
              <FontAwesomeIcon icon={item.icon} className="text-sm" />
            </div>
            <div className="flex flex-col text-left">
              {item.label}
              {!item.released && <span className="text-[10px]">In development</span>}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
