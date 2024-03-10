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

  updateData = () => {
    console.log('updateData');
  };

  deleteData = () => {
    console.log('deleteData');
  };
}
