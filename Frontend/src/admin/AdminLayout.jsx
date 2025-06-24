import Sidebar from "./components/Sidebar";

// admin/AdminLayout.jsx
export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        {" "}
        {/* Debug border */}
        {children || <div>NO CHILDREN RENDERED!</div>}
      </main>
    </div>
  );
}
