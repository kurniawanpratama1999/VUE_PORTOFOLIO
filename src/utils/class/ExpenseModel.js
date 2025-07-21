import { reactive } from "vue";

export class ExpenseModel {
    constructor({id, date, transaction, debet, nominal}){
        if (!debet && nominal > 0 || debet && nominal < 0) nominal = nominal * -1  
        this.state = reactive({
            id, 
            date, 
            transaction, 
            debet,
            nominal,
        })
    }

    get id () {
        return this.state.id;
    }

    get date () {
        return this.state.date;
    }

    set date ({date}) {
        this.state.date = date;
    }

    get transaction () {
        return this.state.transaction;
    }

    set transaction ({transaction}) {
        this.state.transaction = transaction;
    }

    get debet () {
        return this.state.debet;
    }

    set debet ({isDebet}) {
        this.state.debet = isDebet;
    }

    get nominal () {
        return this.state.nominal;
    }

    set nominal ({nominal}) {
        this.state.nominal = nominal;
    }
}