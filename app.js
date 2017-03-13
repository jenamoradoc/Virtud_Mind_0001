 

function card_builder(currency_one, currency_two, currency_to, destiny_col_id){
  
  currency_one_value = (currencies[currency_one] / currencies[currency_to]).toPrecision(oscilation_mode+1)
  currency_two_value = (currencies[currency_two] / currencies[currency_to]).toPrecision(oscilation_mode+1)
  
  str_card = "<div class='card' style='width: 20rem;'>";
  str_card += "   <div class='card-block'>";  
  str_card += "     <p class='card-text'><span> <span class='stock-number'> 1 </span>" + currency_one + " = <span class='stock-number'>" + currency_one_value + "</span> " + currency_to + "s " +  "</span></p>"; 
  str_card += "     <p class='card-text'><span> <span class='stock-number'> 1 </span>" + currency_two + " = <span class='stock-number'>" + currency_two_value + "</span> " + currency_to + "s " +  "</span></p>"; 
  str_card += "   </div>";
  str_card += "   <div class='card-footer text-muted'>"
  str_card += "       <p class='t_" + Date.now() + " card-text'></p>";
  str_card += "   </div>";
  str_card += "</div>";
  
  $("#" + destiny_col_id).prepend(str_card);
  
};

function randomize_mocks(){
  var dolar_variation = (Math.random() - 0.5)/(10^oscilation_mode);
  var real_variation = (Math.random() - 0.5)/(10^oscilation_mode); 
  
  currencies["dolar"] = currencies["dolar"] + dolar_variation;
  currencies["real"] = currencies["real"] + real_variation; 
}

function update_refresh_time_labels() { 
  $("p[class^='t_']").each(function(i, obj) {
    time_stamp = parseInt($(obj).attr("class").split(" ")[0].split("_")[1]); 
    time = parseInt(-((time_stamp - Date.now()) / 1000));
    $(obj).html("<small>" +  time + " seconds ago ... </small>");
  });
}

function find_stocks(){
  randomize_mocks();
  card_builder('real', 'dolar', 'peso', "pesocol");
  card_builder('peso', 'dolar', 'real', "realcol");
  card_builder('real', 'peso', 'dolar', "dolarcol");
  update_refresh_time_labels();
  save_status_quo();
}

function status_quo(){
  if (localStorage.getItem("AllDoc") != null) {  
    container_html = localStorage.getItem("AllDoc");
    $(".container").html(container_html);
  }
}

function save_status_quo(){
  container = $(".container").html();
  localStorage.setItem("AllDoc", container);
}

status_quo();
find_stocks();

setInterval("find_stocks();", refresh_time);
