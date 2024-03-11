export class DatabaseStorage<T> {
  private readonly data: Map<string, T>;

  constructor() {
    this.data = new Map();
  }

  createData = (idValue: string, newDataUser: T) => {
    this.data.set(idValue, newDataUser);
  };

  getAllData = () => {
    const users = Array.from(this.data.values());
    return users;
  };

  getDataById = (idValue: string) => {
    const user = this.data.get(idValue);
    return user;
  };

  updateData = (idValue: string) => {
    const user = this.data.get(idValue);
    return user;
  };

  deleteData = (idValue: string) => {
    const res = this.data.delete(idValue);
    return res;
  };
}
