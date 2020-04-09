function Calcular() {
    var KmlitroGasolina = Number(document.getElementById('KmlitroGasolina').value.replace(',', '.'))
    var KmlitroEtanol = Number(document.getElementById('KmlitroEtanol').value.replace(',', '.'))
    var PreçoGasolina = Number(document.getElementById('PreçoGasolina').value.replace(',', '.'))
    var PreçoEtanol = Number(document.getElementById('PreçoEtanol').value.replace(',', '.'))
    var QuilometragemDiaria = Number(document.getElementById('QuilometragemDiaria').value)
    var DiasCalcular = Number(document.getElementById('DiasCalcular').value.replace(',', '.'))
    var valorDiarioG = (QuilometragemDiaria / KmlitroGasolina) * PreçoGasolina
    var valorDiarioE = (QuilometragemDiaria / KmlitroEtanol) * PreçoEtanol
    var c = 1
    var d = 0
    meuArray2 = []
    var somadorDiaADiaG = 0
    var somadorDiaADiaE = 0

    if (KmlitroEtanol < 0 || PreçoEtanol < 0 || DiasCalcular < 0 || KmlitroGasolina < 0 || PreçoGasolina < 0 || QuilometragemDiaria < 0) {
        alert('Verifique seus dados e tente novamente')
    } else if (Number.isInteger(DiasCalcular) !== true) {
        alert('Digite um número inteiro na caixa "Dias a Calcular"')
    } else if (PreçoGasolina > 10 || PreçoEtanol > 10) {
        alert('Verifique o valor dos combustíveis e tente novamente')
    } else {
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart1);
        google.charts.setOnLoadCallback(drawChart2);
        while (c != DiasCalcular + 1) {

            meuArray1 = []
            d = 0
            while (d != 1) {
                meuArray1.push(c)
                somadorDiaADiaG += valorDiarioG
                somadorDiaADiaE += valorDiarioE
                meuArray1.push(somadorDiaADiaG)
                meuArray1.push(somadorDiaADiaE)
                d += 1
            }
            meuArray2.push(meuArray1)
            c += 1
        }
        meuArray2.unshift([0, 0, 0])
        meuArray2.unshift(['Dia', 'Gasolina', 'Etanol'])
        console.log(meuArray2)

        var preçoPorKmG = PreçoGasolina / KmlitroGasolina
        var e = 0
        meuArray4 = []
        while (e <= 10.01) {
            meuArray3 = []
            f = 0
            while (f != 1) {
                let preçoPorKmE = e / KmlitroEtanol
                meuArray3.push(e, preçoPorKmG, preçoPorKmE)
                f += 1
            }
            if (meuArray3[2] <= meuArray3[1]) {
                var pontoDeEquilibrio = meuArray3[0]
            }
            meuArray4.push(meuArray3)
            e += 0.01

        }
        meuArray4.unshift([0, preçoPorKmG, 0])
        meuArray4.unshift(['Valor Teorico do litro Etanol R$', 'Preço por Km Gasolina R$', 'Preço por Km Etanol R$'])
        console.log(meuArray4)

        function drawChart1() {
            let data = google.visualization.arrayToDataTable(
                meuArray2
            );


            let options = {
                title: 'Gasolina vs Etanol',
                curveType: 'function',
                legend: { position: 'bottom' }
            };

            let chart = new google.visualization.LineChart(document.getElementById('curve_chart1'));

            chart.draw(data, options);
        }
        function drawChart2() {
            let data = google.visualization.arrayToDataTable(
                meuArray4
            );


            let options = {
                title: 'Comparação de preços',
                curveType: 'function',
                legend: { position: 'bottom' },
                hAxis: {
                    title: 'Preço Etanol'
                },
                vAxis: {
                    title: 'Preço por KM',
                }
            };

            let chart = new google.visualization.LineChart(document.getElementById('curve_chart2'))

            chart.draw(data, options)
        }
        var PreçofinalPorPeriodoG = meuArray2[meuArray2.length - 1][1]
        var PreçofinalPorPeriodoE = meuArray2[meuArray2.length - 1][2]

        document.getElementById('textoFinalComparacao1').innerHTML = `No final do período de ${DiasCalcular} dias você terá gasto:<br> `
        document.getElementById('textoFinalComparacao1').innerHTML += `Gasolina <b>R$${PreçofinalPorPeriodoG.toFixed(2)}</b>,<br> Etanol <b>R$${PreçofinalPorPeriodoE.toFixed(2)}.`
        document.getElementById('textoFinalComparacao2').innerHTML = `<br>Se o valor do Etanol estiver abaixo de <b>R$${pontoDeEquilibrio.toFixed(2)}</b> o litro, compensa abastecer Etanol.<br>`
        document.getElementById('textoFinalComparacao2').innerHTML += `Obs.: Motor frio  etanol tende a ser menos eficiente que a gasolina.`
    }
}

function Zerar() {
    let zerar = document.getElementById('KmlitroGasolina')
    zerar.value = ''
    zerar.focus()
    document.getElementById('KmlitroEtanol').value = ''
    document.getElementById('PreçoGasolina').value = ''
    document.getElementById('PreçoEtanol').value = ''
    document.getElementById('QuilometragemDiaria').value = ''
    document.getElementById('DiasCalcular').value = ''
    document.getElementById('textoFinalComparacao1')
    document.getElementById('textoFinalComparacao2')
    document.getElementById('curve_chart1')
    document.getElementById('curve_chart2')
}