import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, ...props }) => {
    // возвращаем компонент Route
    return (
        // если loggedIn = true, отрисуем компонент с пропсами, если false - перенаправим на стр с авторизацией
        props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace />
    )
}

export default ProtectedRouteElement;