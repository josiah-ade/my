import UserPageComponent from "@/shared/components/user";
import AdminLayout from "@/shared/layouts/admin";

export default function UsersPage() {
  return (
    <div>
      <UserPageComponent />
    </div>
  );
}

UsersPage.Layout = AdminLayout;
