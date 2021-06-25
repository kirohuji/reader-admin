import localforage from "localforage";
import BookModel from "./BookModel.js";
const isTitle = (line) => {
	return (
		line.length < 30 &&
		line.indexOf("[") === -1 &&
		line.indexOf("(") === -1 &&
		(line.startsWith("CHAPTER ") ||
			line.startsWith("Chapter ") ||
			line.startsWith("序章") ||
			line.startsWith("前言") ||
			line.startsWith("写在前面的话") ||
			line.startsWith("后记") ||
			line.startsWith("楔子") ||
			line.startsWith("后记") ||
			line.startsWith("后序") ||
			(line.indexOf("第") > -1 &&
				line.indexOf("章") > -1 &&
				line.indexOf("第") < line.indexOf("章")) ||
			(line.indexOf("第") > -1 &&
				line.indexOf("节") > -1 &&
				line.indexOf("第") < line.indexOf("节")) ||
			(line.indexOf("第") > -1 &&
				line.indexOf("回") > -1 &&
				line.indexOf("第") < line.indexOf("回")) ||
			(line.indexOf("第") > -1 &&
				line.indexOf("卷") > -1 &&
				line.indexOf("第") < line.indexOf("卷")) ||
			(line.indexOf("第") > -1 &&
				line.indexOf("部") > -1 &&
				line.indexOf("第") < line.indexOf("部")) ||
			(line.indexOf("第") > -1 &&
				line.indexOf("辑") > -1 &&
				line.indexOf("第") < line.indexOf("辑")) ||
			(line.indexOf("第") > -1 &&
				line.indexOf("集") > -1 &&
				line.indexOf("第") < line.indexOf("集")) ||
			(line.indexOf("第") > -1 &&
				line.indexOf("话") > -1 &&
				line.indexOf("第") < line.indexOf("话")) ||
			(line.indexOf("第") > -1 &&
				line.indexOf("篇") > -1 &&
				line.indexOf("第") < line.indexOf("篇")) ||
			/^[\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07]+$/.test(
				line
			) ||
			/^\d+$/.test(line))
	);
};
const escapeHTML = (str) => {
	var escapeChars = {
		"¢": "cent",
		"£": "pound",
		"¥": "yen",
		"€": "euro",
		"©": "copy",
		"®": "reg",
		"<": "lt",
		">": "gt",
		'"': "quot",
		"&": "amp",
		"'": "#39",
	};

	var regexString = "[";
	for (var key in escapeChars) {
		regexString += key;
	}
	regexString += "]";

	var regex = new RegExp(regexString, "g");
	return str.replace(regex, function(m) {
		return "&" + escapeChars[m] + ";";
	});
};
class BookUtil {
	static addBook(key, buffer) {
		console.log('addBook')
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
