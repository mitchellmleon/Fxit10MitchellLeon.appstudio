let req = ""
let query = ""
let results = ""
let pw = "Jays123!"  
let userName = "mml21934"
let allCustomers = []

customerSelect.onshow=function(){
    txtResponse.style.height = "140px"
    let query = "SELECT DISTINCT name FROM customer;"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=mml21934&pass=" + pw + "&database=mml21934&query=" + query)

    if (req.status == 200) { //transit worked.
            allCustomers = JSON.parse(req.responseText)
            
        
            drpCustomers.clear()
            for (i = 0; i <= allCustomers.length - 1; i++)
                drpCustomers.addItem(allCustomers[i])
    } else {
        NSB.MsgBox(`Error: ${req.status}`);
    }  
}


drpCustomers.onclick=function(s){
   if(typeof(s) == "object") {
      return
    } else {
    drpCustomers.value = s // show user selection in drpCustomers
    
    query = `SELECT state FROM customer WHERE name = '${s}';`
    
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=mml21934&pass=" + pw + "&database=mml21934&query=" + query)
    
    if (req.status == 200) {
      customerState = JSON.parse(req.responseText)
      console.log(customerState)
    } else 
      console.log("error")
    
    query = `SELECT name FROM customer WHERE state = '${customerState[0]}'`
 
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=mml21934&pass=" + pw + "&database=mml21934&query=" + query)
    
    if (req.status == 200) { //transit worked.

      customerWithTheSameState = JSON.parse(req.responseText)
      console.log(customerWithTheSameState)
    } else
      console.log("error")
    
    let customerMessage = ""
    for (i = 0; i <= customerWithTheSameState.length - 1; i++)
      customerMessage = customerMessage + customerWithTheSameState[i] + "\n"
    txtResponse.value = customerMessage
  }
}