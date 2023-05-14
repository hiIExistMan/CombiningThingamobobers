let objects = [];
let selectedObj;
let discoveredThingamobobers = [];
function setup(){
    createCanvas(windowWidth-100,windowHeight);

    loadDisovered();
    console.log(discoveredThingamobobers);
    loadToolbar();
    setInterval(saveDiscovered,10000);
}

function loadToolbar() {
    for(let type of discoveredThingamobobers) {
        let img = document.createElement("img");
        img.src="media/final/" + type + ".png";
        img.width = 100;
        img.height = 100;
        img.onclick = () => {
            create(type);
        }
        document.querySelector(".toolbar").appendChild(img);
        //img.parent()
    }
}

function loadDisovered() {
    try{
    let discoveredThingamobobersT = localStorage.getItem(
        "discoveredThingamobobers"
    ).split(",");
    discoveredThingamobobers = discoveredThingamobobersT
    } catch {
        discoveredThingamobobers = ["fire", "water", "air", "earth"];

    }
    if(discoveredThingamobobers.length < 4) {
        discoveredThingamobobers = ["fire", "water", "air", "earth"];

    }
    
}

function saveDiscovered() {
    localStorage.setItem(
        "discoveredThingamobobers",
        discoveredThingamobobers.join(",")
    );
}

function create(adding) {
    let obj = new Thingamobober(random(50,width-50),random(50,height-50),adding);
    objects.push(obj);
}

function draw() {
    document.querySelector(".toolbar").style.height = windowHeight + "px";
    background("white");
    for(let obj of objects) {
        obj.show();
    }
    if(selectedObj) {
        selectedObj.x = mouseX-selectedObj.w/2;
        selectedObj.y = mouseY-selectedObj.w/2;
    }
}

function mousePressed() {
    for(let obj of objects) {
        if(mouseX > obj.x && mouseY > obj.y && mouseX < obj.x+obj.w && mouseY < obj.y+obj.w) {
            selectedObj = obj
            break
        }
    }
}

function mouseReleased() {
    if(!selectedObj)return;
    let chosenOne;
    for(let obj of objects) {
        if(mouseX > obj.x && mouseY > obj.y && mouseX < obj.x+obj.w && mouseY < obj.y+obj.w) {
            if(obj != selectedObj) {
            chosenOne = obj
            break
            }
        }
    }
    if(!chosenOne) {
        console.log("Released with no chosenOne")
        selectedObj = undefined
        return;
    }
    let obj = [chosenOne,selectedObj];
    let objArray = [chosenOne.type, selectedObj.type];
    objArray.sort();
    let combined = objArray.join(" ")
    console.log(combined);
    if(Object.keys(combos).some(obj => obj == combined)) {

        const filteredArray = objects.filter(item => !obj.includes(item));
        objects = filteredArray;
        print([...objects])
        objects.push(new Thingamobober(mouseX-50,mouseY-50,combos[combined]));
        delete chosenOne;
        delete selectedObj;
        if(!discoveredThingamobobers.includes(combos[combined])) {
            discoveredThingamobobers.push(combos[combined]);
            let img = document.createElement("img");
            img.src="media/final/" + combos[combined] + ".png";
            img.width = 100;
            img.height = 100;
            img.onclick = () => {
                create(combos[combined]);
            }
            document.querySelector(".toolbar").appendChild(img);
        }

    }
}

addEventListener("resize", () => {
    resizeCanvas(window.innerWidth-100,window.innerHeight);
})