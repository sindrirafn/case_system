import { NavLink, Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar__brand">
          <h2>Casevia</h2>
          <p>Case Management System</p>
        </div>

        <nav className="sidebar__nav">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/cases">Cases</NavLink>
          <NavLink to="/cases/new">Create Case</NavLink>
          <NavLink to="/users">Users</NavLink>
        </nav>
      </aside>

      <div className="main-content">
        <header className="topbar">
          <h1>Casevia</h1>
        </header>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;