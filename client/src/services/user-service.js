export class UserService {
  static async get() {
    try {
      const res = await fetch(`/users/me`, {
        credentials: "include",
      });
      if (res.status === 403) {
        return null;
      }
      const user = await res.json();
      return user;
    } catch (e) {
      return null;
    }
  }
}
