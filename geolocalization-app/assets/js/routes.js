let routes = {
  front: {
    login: {
      name: "login",
      path: "/auth/login",
    },
    me: {
      name: "Me",
      path: "/auth/me"
    },
    jobs: {
      name: "jobs",
      path: "/"
    }
  },
  back:{
    login: {
      name: "login",
      path: "/api/auth/login",
    },
    me: {
      name: "Me",
      path: "/api/auth/me"
    },
    jobs: {
      name: "jobs",
      path: "/api/jobs"
    }
  }
}
export default routes