import { useEffect, lazy } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout.jsx";
import { PrivateRoute } from "./PrivateRoute.jsx";
import { RestrictedRoute } from "./RestrictedRoute.jsx";
import { refreshUser } from "../redux/auth/operations.js";
import { useAuth } from "../hooks/useAuth.js";

const HomePage = lazy(() => import("../pages/Home.jsx"));
const RegisterPage = lazy(() => import("../pages/Register.jsx"));
const LoginPage = lazy(() => import("../pages/Login.jsx"));
const TasksPage = lazy(() => import("../pages/Tasks.jsx"));

export const App = () => {
    const dispatch = useDispatch();
    const { isRefreshing } = useAuth();

    useEffect(() => {
        dispatch(refreshUser());
    }, [dispatch]);

    return isRefreshing ? (
        <b>Refreshing user...</b>
    ) : (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route
                    path="/register"
                    element={<RestrictedRoute redirectTo="/tasks" component={<RegisterPage />} />}
                />
                <Route
                    path="/login"
                    element={<RestrictedRoute redirectTo="/tasks" component={<LoginPage />} />}
                />
                <Route
                    path="/tasks"
                    element={<PrivateRoute redirectTo="/login" component={<TasksPage />} />}
                />
            </Route>
        </Routes>
    );
};
