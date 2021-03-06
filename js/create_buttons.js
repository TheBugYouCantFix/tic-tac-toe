const content = document.querySelector(".content");

for (let i = 0; i < 9; i++){
    content.innerHTML += `<button class="button" onclick="clicked(this.id)" id=${i}></button>\n`;
}