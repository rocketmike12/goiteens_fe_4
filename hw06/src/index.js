import { generateWord } from "./word";
import { generateColor } from "./color"

const genBtn = document.querySelector("button");
const text = document.querySelector(".text");

genBtn.addEventListener("click", () => {
	text.innerHTML = text.innerHTML + `<p style="color: ${generateColor()}">${generateWord()}</p>`;
});
