import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Icons from "lucide-react";
import logo from "../assets/dss_logo.webp";
import { useAuth } from "../store/AuthContext";
import { toast } from "react-toastify";

const sidebarItems = [
  {
    key: "dashboard",
    title: "Dashboard",
    icon: "LayoutDashboard",
    path: "/dashboard",
  },
  {
    key: "blog",
    title: "Blogs",
    icon: "Newspaper",
    path: "/blog",
  },
  {
    key: "gallery",
    title: "Project Gallery",
    icon: "Images",
    path: "/gallery",
  },
  {
    key: "product",
    title: "Product",
    icon: "ShoppingCart",
    path: "/product",
  },
  {
    key: "team",
    title: "Our Team",
    icon: "UsersRound",
    path: "/team",
  },
  {
    key: "inquiry",
    title: "Inquiry",
    icon: "CircleUser",
    path: "/inquiry",
  },

  {
    key: "visitor",
    title: "Website Visitor",
    icon: "Eye",
    path: "/visitor",
  },
  {
    key: "subscriber",
    title: "News Latter Subscribers",
    icon: "Mails",
    path: "/subscriber",
  },
  {
    key: "job",
    title: "Job Application",
    icon: "Dock",
    path: "/job-application",
  },
  {
    key: "client",
    title: "Client",
    icon: "Users",
    path: "/clienttable",
  },
  {
    key: "offers",
    title: "Offers",
    icon: "Tag",
    path: "/offers",
  },
];

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = (key) => {
    if (isCollapsed) return;
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    if (!isCollapsed) {
      setOpenDropdown(null);
    }
  };

  return (
    <div
      className={`${
        isCollapsed
          ? "w-16  tracking-wider flex flex-col justify-center items-center"
          : "w-64"
      } bg-black  h-screen ease-in-out shadow-2xl`}
    >
      {/* Header */}
      <div className="p-1 border-b border-gray-200/20  ">
        <div className="flex items-center justify-between h-18">
          {!isCollapsed && (
            <div className="flex items-center">
              <img src={logo} alt="logo" className="h-18 w-36 bg-white" />
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-gray-200 hover:text-white"
          >
            <Icons.Menu size={20} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-1 space-y-1 overflow-y-auto flex-1">
        {sidebarItems.map((item, index) => {
          const Icon = Icons[item.icon] || Icons.Circle;
          const isActive = openDropdown === item.key;

          return (
            <div key={index} className="relative">
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.key)}
                    className={`w-full flex items-center text-gray-300  hover:text-white justify-between p-1.5 rounded-lg transition-all duration-200 group `}
                    //    ${
                    //   isActive
                    //     ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    //     : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    // }`}
                    title={isCollapsed ? item.title : ""}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} className="flex-shrink-0" />
                      {!isCollapsed && (
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
                      )}
                    </div>
                    {!isCollapsed && (
                      <Icons.ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          isActive ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {isActive && !isCollapsed && (
                    <div className=" ml-4  border-l border-gray-700 pl-4">
                      {item.children.map((child, idx) => (
                        <NavLink
                          key={idx}
                          to={child.path}
                          className={({ isActive }) => `
                            block text-sm p-1 rounded-sm transition-colors duration-200
                            ${
                              isActive
                                ? "text-white bg-neutral-800"
                                : "text-gray-400 hover:text-white "
                            }
                          `}
                        >
                          {child.title}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-2 p-1.5 rounded-lg transition-all duration-200 group
                    ${
                      isActive
                        ? "text-gray-300"
                        : "text-gray-300 hover: hover:text-white"
                    }
                  `}
                  title={isCollapsed ? item.title : ""}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="text-sm font-medium">{item.title}</span>
                  )}
                </NavLink>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      {/* {!isCollapsed && (
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <Icons.User size={16} className="text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">{userRole}</p>
              <p className="text-gray-400 text-xs">Online</p>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Sidebar;
