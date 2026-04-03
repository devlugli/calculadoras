function moeda(v){
  return v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
}

function valorPresente(parcela, taxa, prazo){

  if(taxa<=0){
    return parcela*prazo;
  }

  let i=taxa/100;

  return parcela*((1-Math.pow(1+i,-prazo))/i);
}

function calcular(){

  let renda=parseFloat(document.getElementById("renda").value)||0;

  let entrada=parseFloat(document.getElementById("entrada").value)||0;

  let juros=parseFloat(document.getElementById("juros").value)||0;

  let prazo=parseInt(document.getElementById("prazo").value)||0;

  let percentual=parseFloat(document.getElementById("percentual").value)||0;

  let parcela=renda*(percentual/100);

  let financiado=valorPresente(parcela,juros,prazo);

  let valorCarro=financiado+entrada;

  document.getElementById("tituloResultado").innerText="Valor estimado do carro";

  document.getElementById("valorResultado").innerText=moeda(valorCarro);

  document.getElementById("textoResultado").innerText=
  "Com parcela aproximada de "+moeda(parcela)+
  ", seria possível financiar cerca de "+moeda(financiado)+
  ". Considerando a entrada, o carro poderia custar aproximadamente "+moeda(valorCarro)+".";

}


/* CALCULO AUTOMATICO */

window.onload=function(){

  document.getElementById("renda").addEventListener("input",calcular);

  document.getElementById("entrada").addEventListener("input",calcular);

  document.getElementById("juros").addEventListener("input",calcular);

  document.getElementById("prazo").addEventListener("input",calcular);

  document.getElementById("percentual").addEventListener("input",calcular);

  calcular();

}