export class DataService {
  loadData(skip = 0): Promise<Data[]> {
    return new Promise<Data[]>((resolve) => {
      setTimeout(() => {
        resolve([{
          firstName: "Hans",
          lastName: "Müller"
        }, {
          firstName: "Max",
          lastName: "Mustermann"
        }].slice(skip))
      }, 1000);
    });
  }
}

type Data = {
  firstName: string;
  lastName: string  
}