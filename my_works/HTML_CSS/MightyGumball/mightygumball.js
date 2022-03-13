var lastReportTime = 0;


window.onload = function () {
    setInterval(handleRefresh, 3000);
}



function updateSales(sales) {
    var salesDiv = document.getElementById("sales");
    //Итерация по каждому элементу в массиве
    for (var i = 0; i < sales.length; i++) {
        var sale = sales[i];
        //Для каждого элемента создаем div и присваиваем класс saleitem используя css
        var div = document.createElement("div");
        div.setAttribute("class", "saleItem");
        //Задаем содержимое для элемента div с помощью innerHTML, после добавляем в качестве дочернего элемента salesDiv
        div.innerHTML = sale.name + " sold " + sale.sales + " gumballs";
        salesDiv.appendChild(div);
    }
    if (sales.length > 0) {
        lastReportTime = sales[sales.length - 1].time;
        //Присваиваем самый свежий отчет переменной
    }
}



function handleRefresh() {
    var url = "http://gumball.wickedlysmart.com" +
        "?callback=updateSales" +
        "&lastreporttime=" + lastReportTime +
        "&random=" + (new Date()).getTime(); //Приписка после + добавляет новый фиксированный параметр к url с временем и позволяет избежать кэша браузера
    //Принимаем json с сервера
    var newScriptElement = document.createElement("script");
    //Создаем новый элемент скрипт
    newScriptElement.setAttribute("src", url);
    //Присваеваем его атрибуту src значение в виде url адреса
    newScriptElement.setAttribute("id", "jsonp");
    //присваиваем идентификатор для нового эемента

    var oldScriptElement = document.getElementById("jsonp");
    //извлекаем созданный элемент
    var head = document.getElementsByTagName("head")[0];
    //извлекаем ссылку на элемент
    if (oldScriptElement == null) {
        head.appendChild(newScriptElement);
        //Проверяет есть существует ли элемент скрипт в дом
    } else {
        head.replaceChild(newScriptElement, oldScriptElement);
        //Если скрипт уже имеется то заменияем его на newScript и oldScript
    }
};