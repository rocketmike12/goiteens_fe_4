const userInput = document.querySelector("#bookmarkInput");
const bookmarkList = document.querySelector("#bookmarkList");
const addBookmarkBtn = document.querySelector("#addBookmarkBtn");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

const render = function () {
    bookmarkList.innerHTML = "";
    bookmarks.forEach((el, idx) => {
        const newBookmark = document.createElement("li");
        newBookmark.innerHTML = `<a href="${el}">${el}</a> <button>X</button>`;
        newBookmark.id = `T${idx}`;
        bookmarkList.appendChild(newBookmark);
    });
};

const addBookmark = function () {
    bookmarks.push(userInput.value);
    userInput.value = "";
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    render();
};

const bookmarkChecker = function (e) {
    if (e.target.tagName === "BUTTON") {
        bookmarks.splice(e.target.parentElement.id.slice(1), 1);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        render();
    }
};

addBookmarkBtn.addEventListener("click", addBookmark);
bookmarkList.addEventListener("click", bookmarkChecker);
render();
