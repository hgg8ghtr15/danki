const fs = require('fs')

class TipoE {
  constructor(minhaString) {
    this.minhaString = minhaString;

    this.BANCO = minhaString.substring(0, 3);
    this.LOTE = minhaString.substring(3, 7);
    this.REGISTRO = minhaString.substring(7, 8);
    this.REGISTRO_LOTE = minhaString.substring(8, 13);
    this.SEGMENTO_SEGMENTO = minhaString.substring(13, 14);
    this.TIPO_DE_LANCAMENTO = minhaString.substring(14, 15);
    this.CNAB1 = minhaString.substring(15, 17);
    this.TIPO_EMPRESA = minhaString.substring(17, 18);
    this.NUMERO_EMPRESA = minhaString.substring(18, 32);
    this.CONVENIO_BANCO = minhaString.substring(32, 52);
    this.CODIGO_AGENCIA = minhaString.substring(52, 57);
    this.DV_AGENCIA = minhaString.substring(57, 58);
    this.NUMERO_CONTA = minhaString.substring(58, 70);
    this.DV_VERIFICADOR_CONTA = minhaString.substring(70, 71);
    this.DV_AG_CONTA = minhaString.substring(71, 72);
    this.NOME_EMPRESA = minhaString.substring(72, 102);
    this.CNAB2 = minhaString.substring(102, 108);
    this.NATUREZA_LANCAMENTO = minhaString.substring(108, 111);
    this.TIPO_COMPLEMENTO = minhaString.substring(111, 113);
    this.COMPLEMENTO = minhaString.substring(113, 133);
    this.CPMF = minhaString.substring(133, 134);
    this.DATA_CONTABIL = minhaString.substring(134, 142);
    this.DATA_LANCAMENTO = minhaString.substring(142, 150);
    this.VALOR_DO_LANCAMENTO = minhaString.substring(151, 168);
    this.TIPO_DEBITO_CREDITO = minhaString.substring(168, 169);
    this.CATEGORIA_DO_LANCAMENTO = minhaString.substring(169, 172);
    this.CODIGO_DE_BANCO = minhaString.substring(172, 176);
    this.HISTORICO = minhaString.substring(176, 202);
    this.NUMERO_DOCUMENTO = minhaString.substring(202, 208);
    this.SEGUNDA_LINHA = minhaString.substring(208, 240);
  }
}

// Exemplo de uso da classe TipoE

let arquivoProcessado = []

// const minhaString = "2370004300003E0  103605221000049000000000000000677270329300000000322113 FRANCIS MARIS CRUZ                  DPV00                    N0000000015062023000000000000008885D1050777TARIFA BANCARIA          0010623CESTA PRIME EXCLUSIVA          0";
// const tipoE = new TipoE(minhaString);

// console.log(tipoE)


function lerArquivo() {
  return new Promise((resolve, reject) => {
    fs.readFile('CC1506H052.RET', (erro, data) => {
      if (erro) {
        reject(erro);
        return;
      }
      resolve(data);
    });
  });
}

// Exemplo de uso da função lerArquivo

lerArquivo()
  .then((data) => {
    let str = data.toString();
    let linhas = str.split('\n');

    linhas.forEach((linha) => {
      // console.log(linha)
      const tipoE = new TipoE(linha);
      // console.log(tipoE)
      arquivoProcessado.push(tipoE)
    });

  })
  .catch((erro) => {
    console.error(erro);
  });

setTimeout(() => {
  console.log(arquivoProcessado)
}, 2000)
// console.log(arquivoProcessado + "str")
