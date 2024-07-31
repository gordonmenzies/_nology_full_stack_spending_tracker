// let date = new Date();

// let day = date.getDate();
// let month = date.getMonth() + 1;
// let year = date.getFullYear();

// // This arrangement can be altered based on how we want the date's format to appear.
// let currentDate = `${day}${month}${year}`;

export default interface Transaction {
  id: number;
  text: string;
  category: string;
  amount: number;
  date: Date;
}
