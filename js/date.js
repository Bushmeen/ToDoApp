const date= new Date;
const day= document.querySelector(".date-day")
const month= document.querySelector(".date-month")
const year= document.querySelector(".date-year")



day.textContent=date.getDate();
month.textContent=date.getMonth()+1;
year.textContent=date.getFullYear();