import localforage from "localforage";
class BookUtil {
	static addBook(key, buffer) {å
		return localforage.setItem(key, buffer);
	}
	static deleteBook(key) {
		return localforage.removeItem(key);
	}
	static fetchBook(key) {
		return localforage.getItem(key);
	}
}

export default BookUtil;
