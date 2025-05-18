// Створіть веб-додаток блогу, який дозволяє користувачам створювати, переглядати, оновлювати та видаляти пости.
// 1. Використовуйте Node.js для створення сервера.
// 2. Використовуйте json-server для створення серверу та обробки запитів.
// 3. Використовуйте пакетний менеджер npm для управління залежностями та інсталяції необхідних пакетів. Для збирання проєкту ініціалізуйте новий проєкт та встановіть Parcel.
// 4. Використовуйте шаблонізатор Handlebars для відображення сторінок блогу.
// 5. Використовуйте bd.json для зберігання даних про пости та коментарі.
// 6. Реалізуйте механізм пагінації для перегляду списку постів.
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _ts_generator(thisArg, body) {
    var f, y, t, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var postList = document.querySelector(".post-list");
var createForm = document.querySelector("form");
var posts = [];
function getPosts() {
    return /*#__PURE__*/ _async_to_generator(function() {
        var data;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        fetch("http://localhost:3000/posts")
                    ];
                case 1:
                    data = _state.sent();
                    return [
                        4,
                        data.json()
                    ];
                case 2:
                    posts = _state.sent();
                    render();
                    return [
                        2
                    ];
            }
        });
    })();
}
var render = function render() {
    postList.innerHTML = "";
    posts.forEach(function(el) {
        postList.insertAdjacentHTML("beforeend", '\n				<li class="post" id="P'.concat(el.id, '">\n					<h2 class="post-title">').concat(el.title, '</h2>\n					<p class="post-text">').concat(el.text, '</p>\n					<p class="post-author">by ').concat(el.author, '</p>\n					<button class="editBtn">edit</button>\n					<button class="delBtn">delete</button>\n				</li>\n			'));
    });
};
createForm.addEventListener("submit", function(e) {
    e.preventDefault();
    var createData = Object.fromEntries(new FormData(createForm));
    fetch("http://localhost:3000/posts/", {
        method: "POST",
        body: JSON.stringify(createData)
    });
    render();
});
postList.addEventListener("click", function(e) {
    var currentPost = e.target.parentElement;
    if (e.target.className === "delBtn") {
        fetch("http://localhost:3000/posts/".concat(currentPost.id.slice(1)), {
            method: "DELETE"
        });
        render();
    } else if (e.target.className === "editBtn") currentPost.innerHTML = '\n			<input type="text" value="'.concat(currentPost.children[0].innerText, '">	\n			<input type="text" value="').concat(currentPost.children[1].innerText, '">	\n			<input type="text" value="').concat(currentPost.children[2].innerText.split(" ")[1], '">\n			<button class="saveBtn">save</button>\n		');
    else if (e.target.className === "saveBtn") {
        fetch("http://localhost:3000/posts/".concat(currentPost.id.slice(1)), {
            method: "PATCH",
            body: JSON.stringify({
                title: currentPost.children[0].value,
                text: currentPost.children[1].value,
                views: currentPost.children[2].value
            })
        });
        render();
    }
});
getPosts();

