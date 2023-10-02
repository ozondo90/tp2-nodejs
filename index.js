var http = require("http");

http.createServer((req, res)=>{
  res.writeHead(200 , {"content-type" : "application/json" , "Accept" : "application/json"});
  
  const words = [
    {
      frenchWord : "mangue",
      englishWord : "mangose"
    },
    {
      frenchWord : "fain",
      englishWord : "hungry"
    },
    {
      frenchWord : "pied",
      englishWord : "foot"
    },
    {
      frenchWord : "livre",
      englishWord : "book"
    },
    {
      frenchWord : "aimer",
      englishWord : "love"
    },
    {
      frenchWord : "maison",
      englishWord : "house"
    },
    {
      frenchWord : "fille",
      englishWord : "girl"
    },
    {
      frenchWord : "telephone",
      englishWord : "phone"
    },
    {
      frenchWord : "stylo",
      englishWord : "pen"
    },
    {
      frenchWord : "banque",
      englishWord : "bank"
    }
  ];

  function getTranslation(tab, word){
    let tranlateWord = "";
    let msg = "";
    let foundWord = false;
    
    
    for(let i = 0; i < tab.length; i++){
      
      if(word == tab[i].frenchWord){
        tranlateWord = tab[i].englishWord;
        foundWord = true;
        break;
      }else if(word == tab[i].englishWord){
        tranlateWord = tab[i].frenchWord;
        foundWord = true;
        break;
      }
    };

    if(!foundWord){
      msg = "Le mot que vous demander n'existe pas dans le dictionnaire";
    }
    
    return {tranlateWord , msg};
  }

  var reqData = "";
  
  req.on("data" , (chunk)=>{
    reqData += chunk.toString();
  })
  
  var resData = "";
  req.on("end" , ()=>{

    resData = getTranslation(words , reqData);
    
    const traitement = ()=>{
      if(resData.tranlateWord !=""){
        return resData.tranlateWord
      }else{
        return resData.msg
      }
    };
    
    res.end(traitement());
  })
  
}).listen(8005 , ()=>{
  console.log("Server running on port 8005")
})