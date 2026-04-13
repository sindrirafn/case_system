import { NavLink, Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";

function MainLayout() {
  return (
    <div className={styles.appShell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <h2>Casevia</h2>
          <p>Case Management System</p>
        </div>

        <nav className={styles.nav}>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
            } 
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/cases"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
            }
          >
            Cases
          </NavLink>
          <NavLink
            to="/cases/new"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
            }
          >
            Create Case
          </NavLink>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
            }
          >
            Users
          </NavLink>
        </nav>
      </aside>

      <div className={styles.mainContent}>
        <header className={styles.topbar}>
          <h1>Casevia</h1>
        </header>

        <main className={styles.pageContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;