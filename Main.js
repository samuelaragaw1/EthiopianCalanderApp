//adding list of elements
let element_0 =  document.querySelector("#zero");
let element_1 = document.querySelector("#one");
let element_2 = document.querySelector("#two");
let ele_arry = [element_0, element_1, element_2];
let ele_index = [0, 1, 2];
let ethio_month = ["መስከረም", "ጥቅምት", "ኅዳር", "ታህሣሥ", "ጥር", "የካቲት", "መጋቢት", "ሚያዝያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜ"];
//grigorian calander parameters
let grigorian = new Date();
let g_y = grigorian.getFullYear();
let g_m = grigorian.getMonth() + 1;
let g_d = grigorian.getDate();
let date_str = "9,11," + g_y;
let date_at_sep11 = new Date(date_str);
let e_leap = false;



//ethiopian calander parameters
let e_y;
let e_m;
let e_d;
//calculate the year
if (g_m >= 9 || (g_m == 9 && g_d >= 11)) {
    e_y = g_y - 7;
}
else {
    e_y = g_y - 8;
}
//calculate date
let time_difference = grigorian.getTime() - date_at_sep11.getTime();
let days = (((time_difference/1000)/60)/60)/24;
let date = Math.floor((days)%30 + 1);
//calculate month
let months = Math.floor(days/30) + 1;
e_m = months;
//date output
createElement(ele_arry[1], (e_m===13), ethio_month[months-1], e_y, 7);
let date_output = ethio_month[months-1] + " " + date + " " + e_y;


//user date year and month
let u_m = e_m;
let u_y = e_y;


//adjusting screen the button next
if (window.innerWidth <= 1200){
    document.querySelector("button:nth-child(3)").style.marginLeft = (40 - Math.floor((1200 - window.innerWidth)/40)) + "%";
}
else{
    document.querySelector("button:nth-child(3)").style.marginLeft = "40%";
}
window.addEventListener('resize', () => {
    if (window.innerWidth <= 1200){
        document.querySelector("button:nth-child(3)").style.marginLeft = (40 - Math.floor((1200 - window.innerWidth)/40)) + "%";
    }
    else{
        document.querySelector("button:nth-child(3)").style.marginLeft = "40%";
    }
});
document.querySelector("#date_output").innerHTML = "<div>" + date_output + "</div>"
//when the next button is clicked
document.querySelector("button:first-child").addEventListener('click', () => {
    //reducing user interface month
    u_m--;
    if (u_m === 0){
        u_m = 13;
        u_y--;
    }

    //removing each element
    for(e of document.querySelectorAll(".month")) {
        e.remove();
    }

    for (var i = 0; i < ele_index.length; i++) {
        ele_index[i] = (ele_index[i] + 1) % 3;
    }
    for (var i = 0; i < ele_index.length; i++) {
        // Reset animation
        ele_arry[i].style.animationName = "none";
        ele_arry[i].offsetHeight; // trigger reflow

        ele_arry[i].style.animationName = "slide_right";
        ele_arry[i].style.animationDuration = "0.6s";
        ele_arry[i].style.animationTimingFunction = "ease-in-out";
        ele_arry[i].classList.remove("container0", "container1", "container2");
        ele_arry[i].classList.add(`container${ele_index[i]}`);
    }

    //adding day of months
    setTimeout( () => {
        let centerIndex = ele_index.indexOf(1);
        createElement(ele_arry[centerIndex], (u_m==13), ethio_month[u_m-1], u_y, 6);
    }, 600);

});
document.querySelector("button:nth-child(3)").addEventListener('click', () => {
    //increasing user interface month
    u_m++;
    if (u_m === 14){
        u_m = 1;
        u_y++;
    }

    //removing previous elements
    for(e of document.querySelectorAll(".month")) {
        e.remove();
    }

    for(var i = 0; i < ele_index.length; i++){
        if(ele_index[i] > 0){
            ele_index[i] = ele_index[i] - 1;
        }
        else {
            ele_index[i] = 2
        }
    }
    for (var i = 0; i < ele_index.length; i++) {
        // Reset animation
        ele_arry[i].style.animationName = "none";
        ele_arry[i].offsetHeight; // trigger reflow

        ele_arry[i].style.animationName = "slide_left";
        ele_arry[i].style.animationDuration = "0.6s";
        ele_arry[i].style.animationTimingFunction = "ease-in-out";
        ele_arry[i].classList.remove("container0", "container1", "container2");
        ele_arry[i].classList.add(`container${ele_index[i]}`);
    }

    //adding day of months
    setTimeout( () => {
        let centerIndex = ele_index.indexOf(1);
        createElement(ele_arry[centerIndex], (u_m==13), ethio_month[u_m-1], u_y, 6);
    }, 600);
});
//rendering each month
function createElement(parent, pugme, month, year, pugme_number) {
    let element_array = [];
    if (!pugme) {
        for(let i = 1;i < 8;i++) {
            let element = document.createElement("div");
            element.className = "month"
            element.innerHTML = `<p>${month}</p>
                                <p>${i}</p>                                     
                                <p>${year}</p>`;
            element.id = "day_" + i;
            element.style.left = (i-1)*11.428571429 + "vw";
            element.style.top = 13.333333333 + "vh";
            parent.append(element);
            element_array.push(element);
        }
        for(let i = 8;i < 15;i++){
            let element = document.createElement("div");
            element.className = "month"
            element.innerHTML =  `<p>${month}</p>
                                <p>${i}</p>                                     
                                <p>${year}</p>`;
            element.id = "day_" + i;
            element.style.left = (i-8)*11.428571429 + "vw";
            element.style.top = 13.333333333*2 + "vh";
            parent.append(element);
            element_array.push(element);
        }
        for(let i = 15;i < 22;i++){
            let element = document.createElement("div");
            element.className = "month"
            element.innerHTML =  `<p>${month}</p>
                                <p>${i}</p>                                     
                                <p>${year}</p>`;
            element.id = "day_" + i;
            element.style.left = (i-15)*11.428571429 + "vw";
            element.style.top = 13.333333333*3 + "vh";
            parent.append(element);
            element_array.push(element);
        }
        for(let i = 22;i < 29;i++){
            let element = document.createElement("div");
            element.className = "month"
            element.innerHTML =  `<p>${month}</p>
                                <p>${i}</p>                                     
                                <p>${year}</p>`;
            element.id = "day_" + i;
            element.style.left = (i-22)*11.428571429 + "vw";
            element.style.top = 13.333333333*4 + "vh";
            parent.append(element);
            element_array.push(element);
        }
        for(let i = 29;i < 31;i++){
            let element = document.createElement("div");
            element.className = "month"
            element.innerHTML =  `<p>${month}</p>
                                <p>${i}</p>                                     
                                <p>${year}</p>`;
            element.id = "day_" + i;
            element.style.left = (i-29)*11.428571429 + "vw";
            element.style.top = 13.333333333*5 + "vh";
            parent.append(element);
            element_array.push(element);
        }
    }
    else {
        for(let i = 1;i < pugme_number;i++) {
            let element = document.createElement("div");
            element.className = "month"
            element.innerHTML = `<p>${month}</p>
                                <p>${i}</p>                                     
                                <p>${year}</p>`;
            element.id = "day_" + i;
            element.style.left = (i-1)*11.428571429 + "vw";
            element.style.top = 13.333333333+ "vh";
            parent.append(element);
            element_array.push(element);
        }
    }
    return element_array;
}