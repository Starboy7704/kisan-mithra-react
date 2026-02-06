function PublicRoute({ children }) {
  // Simply render children (login/signup pages)
  // PrivateRoute handles protecting dashboard pages
  return children;
}

export default PublicRoute;
