import FriendsLayout from "../layouts/FriendsLayout";
import MainLayout from "../layouts/MainLayout";
import SignLayout from "../layouts/SignLayout";

export const publicRoutes = [
  { path: '/login/:type?', component: SignLayout},
];

export const authRoutes = [
  {path: '/:id?', component: MainLayout},
  {path: '/friends', component: FriendsLayout}
]