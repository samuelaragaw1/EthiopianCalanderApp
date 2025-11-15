//adding list of elements
let element_0 =  document.querySelector("#zero");
let element_1 = document.querySelector("#one");
let element_2 = document.querySelector("#two");
let ele_arry = [element_0, element_1, element_2];
let ele_index = [0, 1, 2];
let ethio_month = ["መስከረም", "ጥቅምት", "ኅዳር", "ታህሣሥ", "ጥር", "የካቲት", "መጋቢት", "ሚያዝያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜ"];
let days_of_week = ["ሰኞ", "ማክሰኞ", "ረቡዕ", "ሐሙስ", "ዓርብ", "ቅዳሜ", "እሁድ"];

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

//frist render of each boxs
createElement(ele_arry[1], (e_m===13), ethio_month[months-1], e_y, 7, true, date, e_m-1);
let date_output = `${ethio_month[months-1]} ${date} ${e_y}`;


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
    for(e of document.querySelectorAll(".month, .month_shifted")) {
        e.remove();
    }

    //ele_arry maniplation and animation of container
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
        createElement(ele_arry[centerIndex], (u_m==13), ethio_month[u_m-1], u_y, 5,e_m==u_m, date, u_m-1);
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
    for(e of document.querySelectorAll(".month, .month_shifted") ) {
        e.remove();
    }

    //ele_arry maniplation and animation of container
    for(var i = 0; i < ele_index.length; i++){
        if(ele_index[i] > 0){
            ele_index[i] = ele_index[i] - 1;
        }
        else {
            ele_index[i] = 2
        }
    }
    for (var i = 0; i < ele_index.length; i++) {
        
        ele_arry[i].style.animationName = "none"; // Reset animation
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
        createElement(ele_arry[centerIndex], (u_m==13), ethio_month[u_m-1], u_y, 5, e_m==u_m, date, u_m-1);
    }, 600);
});

//rendering each month
function createElement(parent, pugme, month, year, pugme_number, current_month, current_day, month_number) {
    let element_array = [];
    for(let i = 0;i < 7;i++){
        //adjusting parameters for css
        let horizontal = i - 1;
        let vertical = 0;

        //creating and adjusting an element
        let element = document.createElement("div");
        element.className = "days_of_week"
        element.innerHTML = `<p>${days_of_week[i]}</p>`; 

        //defining varible for css
        element.style.setProperty("--horizontal", horizontal);
        element.style.setProperty("--vertical", vertical);

        //adding into parent and array
        parent.append(element);
        element_array.push(element);
    }
    if (!pugme) {
        for(let i = 1;i < 8;i++) {
            //ajusting parameters for css
            let horizontal = i - 1;
            let vertical = 13.333333333;

            //creating and adjusting an element
            let element = document.createElement("div");
            element.className = "month"
            element.innerHTML = `<p>${month}</p>
                                <p>${i}</p>                                     
                                <p>${year}</p>`;
            element.id = "div" + i; 

            //defining varible for css
            element.style.setProperty("--horizontal", horizontal);
            element.style.setProperty("--vertical", vertical);
            
            //adding into parent and array
            parent.append(element);
            element_array.push(element);

            //to stylize the current date
            if((i == current_day) && current_month) {
                element.classList.add("current_date_style");
            }

            //if the month is shifted
            adjust_p(element, month_number);
        }
        for(let i = 8;i < 15;i++){
            //ajusting parameter for css
            let horizontal = i - 8;
            let vertical = 13.333333333*2;

            //creating and adjusting an element
            let element = document.createElement("div");
            element.className = "month"
            element.innerHTML =  `<p>${month}</p>
                                <p>${i}</p>                                     
                                <p>${year}</p>`;

            //defining varible for css
            element.style.setProperty("--horizontal", horizontal);
            element.style.setProperty("--vertical", vertical);

            //adding parent
            parent.append(element);
            element_array.push(element);

            //to stylize the current date
            if(i == current_day && current_month) {
                element.classList.add("current_date_style");
            }

            //if the month is shifted
            adjust_p(element, month_number);
        }
        for(let i = 15;i < 22;i++){
            //ajusting parameter for css
            let horizontal = i - 15;
            let vertical = 13.333333333*3;

            //creating and adjusting an element
            let element = document.createElement("div");
            element.className = "month"
            element.innerHTML =  `<p>${month}</p>
                                <p>${i}</p>                                     
                                <p>${year}</p>`;
            
            
            //defining varible for css
            element.style.setProperty("--horizontal", horizontal);
            element.style.setProperty("--vertical", vertical);

            //adding to parent
            parent.append(element);
            element_array.push(element);

            //to stylize the current date
            if(i == current_day && current_month) {
                element.classList.add("current_date_style");
            }
            
            //if the month is shifted
            adjust_p(element, month_number);
        }
        for(let i = 22;i < 29;i++){
            //ajusting parameter for css
            let horizontal = i - 22;
            let vertical = 13.333333333*4;

            //creating and adjusting an element
            let element = document.createElement("div");
            element.className = "month"
            element.innerHTML =  `<p>${month}</p>
                                <p>${i}</p>                                     
                                <p>${year}</p>`;

            
            //defining varible for css
            element.style.setProperty("--horizontal", horizontal);
            element.style.setProperty("--vertical", vertical);

            //adding to parent
            parent.append(element);
            element_array.push(element);

            //to stylize the current date
            if(i == current_day && current_month) {
                element.classList.add("current_date_style");
            }

            //if the month is shifted
            adjust_p(element, month_number);
        }
        for(let i = 29;i < 31;i++){
            //ajusting parameter for css
            let horizontal = i - 29;
            let vertical = 13.333333333*5;

            //creating and adjusting an element
            let element = document.createElement("div");
            element.className = "month"
            element.innerHTML =  `<p>${month}</p>
                                <p>${i}</p>                                     
                                <p>${year}</p>`;
            
            //defining varible for css
            element.style.setProperty("--horizontal", horizontal);
            element.style.setProperty("--vertical", vertical);

            //adding to parent
            parent.append(element);
            element_array.push(element);

            //to stylize the current date
            if(i == current_day && current_month) {
                element.classList.add("current_date_style");
            }

            //if the month is shifted
            adjust_p(element, month_number);
        }
    }
    else {
        for(let i = 1;i < pugme_number;i++) {
            //ajusting parameters for css
            let horizontal = i - 1;
            let vertical = 13.333333333;

            //creating and adjusting an element
            let element = document.createElement("div");
            element.className = "month"
            element.innerHTML = `<p>${month}</p>
                                <p>${i}</p>                                     
                                <p>${year}</p>`;
            
            //defining varible for css
            element.style.setProperty("--horizontal", horizontal);
            element.style.setProperty("--vertical", vertical);

            //adding to parent
            parent.append(element);
            element_array.push(element);

            //to stylize the current date
            if(i == current_day && current_month) {
                element.classList.add("current_date_style");
            }

            //if the month is shifted
            adjust_p(element, month_number);
        }
    }
    return element_array;
}

/*adjust the position each month name in the day box*/
function adjust_p(element, month) {
    console.log("working");
    if (month == 2 || month == 4 || month == 9) {
        element.classList.remove("month");
        element.classList.add("month_shifted");
    }
}