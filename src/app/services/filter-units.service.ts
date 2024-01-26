import { Injectable } from '@angular/core';
import { Location } from '../types/location.interface';

const OPENING_HOURS = {
  manha: {
    first: '06',
    last: '12'
  },
  tarde: {
    first: '12',
    last: '18',
  },
  noite: {
    first: '18',
    last: '23',
  }
}

type HOUR_INDEXES = 'manha' | 'tarde' | 'noite';

@Injectable({
  providedIn: 'root'
})
export class FilterUnitsService {

  constructor() { }

  //função para convertar o dia da semana de int (0-6) para formato utilizado no json
  transformWeekday(weekday: number) {
    switch (weekday) {
      case 0:
        return 'Dom.';
      case 6:
        return 'Sáb.';
      default:
        return 'Seg. à Sex.';
    }
  }

  //função responsável por filtrar as unidades que se encontram abertas de acordo com os filtros selecionados pelo usuário
  filterUnits(unit: Location, open_hour: string, close_hour: string) {
    //Nem todas as unidades possuem um schedule. Nestes casos, deve-se sempre retornar true.
    //*Não se pode filtar por algo que não existe*
    if (!unit.schedules) return true

    //Converte o horário de abertura e fechamento para inteiro, assim será possível manipular esse valor posteriormente
    let open_hour_filter = parseInt(open_hour, 10)
    let close_hour_filter = parseInt(close_hour, 10)

    //retorna, em inteiro (0-6), o dia da semana em que o dispositivo do usuário se encontra
    let todays_weekday = this.transformWeekday(new Date().getDay());


    //looping com intuito de verificar se determinada unidade se encontra aberta no momento buscado
    for (let i = 0; i < unit.schedules.length; i++) {
      let schedule_hour = unit.schedules[i].hour;
      let schedule_weekday = unit.schedules[i].weekdays;


      //verificando se unidade está aberta
      if (todays_weekday === schedule_weekday) {
        if (schedule_hour !== 'Fechada') {
          let [unit_open_hour, unit_close_hour] = schedule_hour.split(' às ')
          let unit_open_hour_int = parseInt(unit_open_hour.replace('h', ''), 10)
          let unit_close_hour_int = parseInt(unit_close_hour.replace('h', ''), 10)

          //Como já foi verificado se a unidade se encontra aberta naquele dia, agora tem de se verificar se
          //a unidade já abriu e ainda não fechou, no horário selecionado pelo filtro
          if (unit_open_hour_int <= open_hour_filter && unit_close_hour_int >= close_hour_filter) return true
          else return false
        }
      }
    }
    return false;
  }

  //Função para filtrar as unidades de acordo com a pesquisa do usuário
  filter(results: Location[], showClosed: boolean, hour: string) {
    let intermediateResults = results;

    if (!showClosed) {
      //linha para filtrar, APENAS, unidades abertas, alocando na variavel intermediateResults, que será utilizada mais tarde
      intermediateResults = results.filter(location => location.opened === true)
    }
    if (hour) {
      //Conversão da hora para novo tipo "HOUR_INDEXES" que separa entre "manha", "tarde" e "noite"
      const OPEN_HOURS = OPENING_HOURS[hour as HOUR_INDEXES].first;
      const CLOSE_HOURS = OPENING_HOURS[hour as HOUR_INDEXES].last;

      //Caso o usuário tenha selecionado algum filtro por horário, aqui ele chama a função de filtrar e retorna o resultado.
      return intermediateResults.filter(location => this.filterUnits(location, OPEN_HOURS, CLOSE_HOURS))
    } else {
      return intermediateResults;
    }
  }
}
