/*
  Motor de Cálculo de Lombada (portado do Celeiro Literário)
  Mantido fora dos capistas para preservar leveza.
*/

(function(){
  // Espessura por página em cm — calibrado pra bater com motor_plataformas_pod_v1.js
  // (grafica_propria.papeis), que já é o valor confiável usado no restante do
  // sistema e confere exatamente com a fórmula oficial publicada pela Amazon
  // KDP (0,0572mm/pág pro papel bookcel). Os valores antigos aqui (offset75:
  // 0,0021 etc.) estavam entre 3x e 5x abaixo do correto — provavelmente
  // portados de uma tabela em polegadas/página sem converter pra cm, ou de
  // uma fonte com metodologia diferente — e faziam a "Ficha técnica (motor
  // oficial Polimata)" do OKapista Polimata mostrar uma lombada bem mais
  // fina do que a real (uma capa desenhada nessa medida erraria feio contra
  // a lombada de verdade na gráfica). polen80/polen90 não têm correspondente
  // na outra tabela — estimados por interpolação linear a partir da mesma
  // curva de offset75/90 (pólen tende a ser um pouco mais encorpado que
  // offset na mesma gramatura); confirme com a gráfica antes de fechar um
  // arquivo final com esses dois papéis específicos.
  const fatoresPadrao = {
    offset75: 0.010,
    offset90: 0.012,
    polen80: 0.0107,
    polen90: 0.0125,
    couche115: 0.010,
    couche150: 0.013,
    manual: 0.010
  };

  const formatosPadrao = {
    a5: { largura: 14.8, altura: 21 },
    "16x23": { largura: 16, altura: 23 },
    "6x9": { largura: 15.24, altura: 22.86 },
    "14x21": { largura: 14, altura: 21 }
  };

  function numeroSeguro(valor, fallback = 0){
    const n = Number(valor);
    return Number.isFinite(n) ? n : fallback;
  }

  function obterFatorPapel(papel, fatorManual){
    if(papel === "manual") return numeroSeguro(fatorManual, fatoresPadrao.manual);
    return fatoresPadrao[papel] || fatoresPadrao.manual;
  }

  function obterFormato(formato, larguraManual, alturaManual){
    if(formato === "personalizado"){
      return {
        largura: numeroSeguro(larguraManual, 14.8),
        altura: numeroSeguro(alturaManual, 21)
      };
    }
    return formatosPadrao[formato] || formatosPadrao.a5;
  }

  function calcularCapaFisica(opcoes){
    const formato = obterFormato(opcoes.formato, opcoes.larguraManual, opcoes.alturaManual);
    const paginas = Math.max(0, numeroSeguro(opcoes.paginas, 0));
    const fator = obterFatorPapel(opcoes.papel, opcoes.fatorManual);
    const sangria = numeroSeguro(opcoes.sangria, 0.3);
    const orelha = numeroSeguro(opcoes.orelha, 0);

    const lombada = paginas * fator;
    const larguraAberta = (formato.largura * 2) + lombada + (sangria * 2) + (orelha * 2);
    const alturaAberta = formato.altura + (sangria * 2);

    return {
      formato,
      paginas,
      fator,
      sangria,
      orelha,
      lombada,
      larguraAberta,
      alturaAberta
    };
  }

  window.CeleiroMotorLombada = {
    fatoresPadrao,
    formatosPadrao,
    obterFatorPapel,
    obterFormato,
    calcularCapaFisica
  };
})();
