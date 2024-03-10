export class DatabaseStorage<T> {
  private readonly data: Map<string, T>;

  constructor() {
    this.data = new Map();
  }

  createData = (idValue: string, newDataUser: T) => {
    this.data.set(idValue, newDataUser);
  };

  getAllData = () => {
    console.log('getAllData');
  };

  getDataById = () => {
    console.log('getDataById');
  };

  updateData = () => {
    console.log('updateData');
  };

  deleteData = () => {
    console.log('deleteData');
  };
}
