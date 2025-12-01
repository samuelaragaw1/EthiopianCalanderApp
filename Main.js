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
let e_leap = false;


//check the ethiopian leap
let date_at_sep11;
if (g_m > 9 || (g_m == 9 && g_d >= 12)) {
    if ((g_y - 8)%4 == 0){
        date_at_sep11 = new Date(`9,12,${g_y}`);
    }
    else {
         date_at_sep11 = new Date(`9,11,${g_y}`);
    }
}
else {
    if ((g_y - 9)%4 == 0){
        date_at_sep11 = new Date(`9,12,${g_y}`);
    }
    else {
        date_at_sep11 = new Date(`9,11,${g_y}`);
    }
}

//check wether the grigorian date is before sept-11 or not
//ethiopian calander parameters
let e_y;
let e_m;
let index_starting_day = grigorian.getDay() - 1;

//calculate the year
if (g_m > 9 || (g_m == 9 && g_d >= 11)) {
    e_y = g_y - 7;
}
else {
    e_y = g_y - 8;
}

//calculate date
let time_difference = grigorian.getTime() - date_at_sep11.getTime();
let days = (((time_difference/1000)/60)/60)/24;
let date = Math.floor((days)%30 + 1);
console.log(index_starting_day);

//calculate month
let months = Math.floor(days/30) + 1;
e_m = months;

//calculating the starting index for renderinf each date  
let index_starting_month = Math.abs((index_starting_day - (date - 1)))%7;
let index_ending_month = (30 + index_starting_month - 1)%7;

//frist render of each boxs
createElement(ele_arry[1], (e_m===13), ethio_month[months-1], e_y, 6, true, date, e_m-1, index_starting_month, index_ending_month);
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


//if the next privious is clicked
document.querySelector("button:first-child").addEventListener('click', () => {
    //reducing user interface month
    u_m--;
    if (u_m === 0){
        u_m = 13;
        u_y--;
    }

    //removing each element
    for(e of document.querySelectorAll(".month, .month_shifted, .days_of_week")) {
        e.remove();
    }


    //adjusting index of starting  and ending of the month
    if (u_m!==13) {
        if (index_starting_month !== 0) {
            index_ending_month = index_starting_month - 1;
            index_starting_month = (index_ending_month - (30 - 1) + 7*100)%7;
        }
        else {
            index_ending_month = 6;
            index_starting_month = (index_ending_month - (30 - 1) + 7*100)%7;
        }
    }
    else {
        //checking the pervious index is on monday
        if (index_starting_month !== 0) {
            index_ending_month = index_starting_month - 1;
        }
        else {
            index_ending_month = 6;
        }


        //adjusting if we can draw it in single line 
        //if it is greater than 4 then it drawable in single line
        if (index_ending_month >= 4 ) {
            index_starting_month = index_ending_month - 4;
        }
        //if it is less than 4 then it drawable in double line line
        else {
            index_starting_month = 7 - ((6 - index_ending_month) + 5)%7;
        } 
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
        createElement(ele_arry[centerIndex], (u_m==13), ethio_month[u_m-1], u_y, 5,e_m==u_m, date, u_m-1, index_starting_month, index_ending_month);
    }, 600);

});


//if the next button is clicked
document.querySelector("button:nth-child(3)").addEventListener('click', () => {
    //increasing user interface month
    u_m++;
    if (u_m === 14){
        u_m = 1;
        u_y++;
    }

    //removing previous elements
    for(e of document.querySelectorAll(".month, .month_shifted, .days_of_week") ) {
        e.remove();
    }


    //setting the new indexs for starting and ending day of the month 
    if (u_m!==13) {
        if (index_ending_month !== 6) {
            index_starting_month = index_ending_month + 1;
            index_ending_month = (30 + index_starting_month - 1)%7;
        }
        else {
            index_starting_month = 0;
            index_ending_month = (30 + index_starting_month - 1)%7;
        }
    }
    else {
        if (index_ending_month !== 6) {
            index_starting_month = index_ending_month + 1;
            index_ending_month = (5 + index_starting_month - 1)%7;
        }
        else {
            index_starting_month = 0;
            index_ending_month = (5 + index_starting_month - 1)%7;
        }
    }
    // console.log(`ending day: ${index_ending_month}`);
    // console.log(`starting day: ${index_starting_month}`);


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
        createElement(ele_arry[centerIndex], (u_m==13), ethio_month[u_m-1], u_y, 5, e_m==u_m, date, u_m-1, index_starting_month, index_ending_month);
    }, 600);
});

//rendering each month
function createElement(parent, pugme, month, year, pugme_number, current_month, current_day, month_number, starting_index, ending_index) {
    console.log(`current month ${current_month}`);
    let counter = 1;
    let element_array = [];
    console.log(`starting index: ${starting_index}`);
    console.log(`ending index: ${ending_index}`);
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
        for(let i = starting_index + 1;i < 8;i++) {
            //ajusting parameters for css
            let horizontal = i - 1;
            let vertical = 13.333333333;

            //creating and adjusting an element
            let element = document.createElement("div");
            element.className = "month"
            element.innerHTML = `<p>${month}</p>
                                <p>${counter++}</p>
                                <p>${year}</p>`;
            element.id = "div" + i; 

            //defining varible for css
            element.style.setProperty("--horizontal", horizontal);
            element.style.setProperty("--vertical", vertical);
            //adding into parent and array
            parent.append(element);
            element_array.push(element);

            //to stylize the current date
            if((counter == current_day) && (current_month) && (e_y == year)) {
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
                                <p>${counter++}</p>                                     
                                <p>${year}</p>`;

            //defining varible for css
            element.style.setProperty("--horizontal", horizontal);
            element.style.setProperty("--vertical", vertical);

            //adding parent
            parent.append(element);
            element_array.push(element);

            //to stylize the current date
            
            if((counter == current_day) && (current_month) && (e_y == year)) {
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
                                <p>${counter++}</p>
                                <p>${year}</p>`;
            //defining varible for css
            element.style.setProperty("--horizontal", horizontal);
            element.style.setProperty("--vertical", vertical);

            //adding to parent
            parent.append(element);
            element_array.push(element);

            //to stylize the current date
            if((counter == current_day) && (current_month) && (e_y == year)) {
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
                                <p>${counter++}</p>
                                <p>${year}</p>`;

            //defining varible for css
            element.style.setProperty("--horizontal", horizontal);
            element.style.setProperty("--vertical", vertical);

            //adding to parent
            parent.append(element);
            element_array.push(element);

            //to stylize the current date
            if((counter == current_day) && (current_month) && (e_y == year)) {
                element.classList.add("current_date_style");
            }

            //if the month is shifted
            adjust_p(element, month_number);
        }
        if(starting_index == 6) {
            for(let i = 0;i < 7;i++){
                //ajusting parameter for css
                let horizontal = i;
                let vertical = 13.333333333*5;

                //creating and adjusting an element
                let element = document.createElement("div");
                element.className = "month"
                element.innerHTML =  `<p>${month}</p>
                                    <p>${counter++}</p>
                                    <p>${year}</p>`;
                //defining varible for css
                element.style.setProperty("--horizontal", horizontal);
                element.style.setProperty("--vertical", vertical);

                //adding to parent
                parent.append(element);
                element_array.push(element);

                //to stylize the current date
                if((counter == current_day) && (current_month) && (e_y == year)) {
                     element.classList.add("current_date_style");
                }

                //if the month is shifted
                adjust_p(element, month_number);
            }
            //rendering the last element
            //adjusting parameter for css
            let horizontal = 0;
            let vertical = 13.333333333*6;

            //creating and adjusting an element
            let element = document.createElement("div");
            element.className = "month"
            element.innerHTML =  `<p>${month}</p>
                                <p>30</p>
                                <p>${year}</p>`;
            //defining varible for css
            element.style.setProperty("--horizontal", horizontal);
            element.style.setProperty("--vertical", vertical);

            //styling current
            if((counter == current_day) && (current_month) && (e_y == year)) {
                element.classList.add("current_date_style");
            }

            //adding to parent
            parent.append(element);
            element_array.push(element);
        }
        else {
            for(let i = 0;i <= ending_index;i++){
                //ajusting parameter for css
                let horizontal = i;
                let vertical = 13.333333333*5;

               //creating and adjusting an element
                let element = document.createElement("div");
                element.className = "month"
                element.innerHTML =  `<p>${month}</p>
                                    <p>${counter++}</p>
                                    <p>${year}</p>`;
                //defining varible for css
                element.style.setProperty("--horizontal", horizontal);
                element.style.setProperty("--vertical", vertical);

                //adding to parent
                parent.append(element);
                element_array.push(element);

                //to stylize the current date
                if((counter == current_day) && (current_month) && (e_y == year)) {
                    element.classList.add("current_date_style");
                }

                //if the month is shifted
                adjust_p(element, month_number);

            }
        }
    }
    else {
        //two types of ending for it to render based on single line or double line
        if (ending_index >= 4) {
            for(let i = starting_index; i <= ending_index;i++) {
                //ajusting parameters for css
                let horizontal = i;
                let vertical = 13.333333333;

                //creating and adjusting an element
                let element = document.createElement("div");
                element.className = "month"
                element.innerHTML = `<p>${month}</p>
                                    <p>${counter++}</p>
                                    <p>${year}</p>`;
                //defining varible for css
                element.style.setProperty("--horizontal", horizontal);
                element.style.setProperty("--vertical", vertical);

                //adding to parent
                parent.append(element);
                element_array.push(element);

                //to stylize the current date
                if((counter == current_day) && (current_month) && (e_y == year)) {
                    element.classList.add("current_date_style");
                }

                //if the month is shifted
                adjust_p(element, month_number);
            }
        }
        else {
            //one rendering above
            for(let i = starting_index; i <= 6;i++) {
                //ajusting parameters for css
                let horizontal = i;
                let vertical = 13.333333333;

                //creating and adjusting an element
                let element = document.createElement("div");
                element.className = "month"
                element.innerHTML = `<p>${month}</p>
                                    <p>${counter++}<p>${year}</p>`;
                //defining varible for css
                element.style.setProperty("--horizontal", horizontal);
                element.style.setProperty("--vertical", vertical);

                //adding to parent
                parent.append(element);
                element_array.push(element);

                //to stylize the current date
                if((counter == current_day) && (current_month) && (e_y == year)) {
                    element.classList.add("current_date_style");
                }
                //if the month is shifted
                adjust_p(element, month_number);
            }
            //other rendering blow
            for(let i = 0; i <= ending_index;i++) {
                //ajusting parameters for css
                let horizontal = i;
                let vertical = 13.333333333*2;

                //creating and adjusting an element
                let element = document.createElement("div");
                element.className = "month"
                element.innerHTML = `<p>${month}</p>
                                    <p>${counter++}</p>
                                    <p>${year}</p>`;
                //defining varible for css
                element.style.setProperty("--horizontal", horizontal);
                element.style.setProperty("--vertical", vertical);

                //adding to parent
                parent.append(element);
                element_array.push(element);

                //to stylize the current date
                if((counter == current_day) && (current_month) && (e_y == year)) {
                    element.classList.add("current_date_style");
                }
                //if the month is shifted
                adjust_p(element, month_number);
            }
        }
    }
    return element_array;
}
/*adjust the position each month name in the day box*/
function adjust_p(element, month) {
    // console.log("working");
    if (month == 2 || month == 4 || month == 9) {
        element.classList.remove("month");
        element.classList.add("month_shifted");
    }
}
