import { reactive } from "vue";
import { ExpenseModel } from "./ExpenseModel";

export class ExpenseControl {
    transactions = reactive([])

    addTransaction({id, date, transaction, debet, nominal}){
        this.transactions.push(new ExpenseModel({id, date, transaction, debet, nominal}))
    }

    updateTransaction({id, date, transaction, debet, nominal}){
        const trx = this.transactions.map(tr => tr.state).find(tr => tr.id === id);
        if (!trx) return false;

        if (date !== undefined) trx.date = date;
        if (transaction !== undefined) trx.transaction = transaction;
        if (debet !== undefined) trx.debet = debet;
        if (nominal !== undefined) trx.nominal = nominal;
    }

    deleteTransaction({id}){
        this.transactions = this.transactions.filter(trx => trx.id !== id);
    }

    readTransaction(){
        return [...this.transactions];
    }
    readTransactionByDateAZ(){
        return this.readTransaction().sort((a, b) => a.date - b.date)
    }
    readTransactionByDateZA(){
        return this.readTransaction().sort((a, b) => b.date - a.date)
    }
    readTransactionByAlphabetAZ(){
        return this.readTransaction().sort((a, b) => a.transaction.localeCompare(b.transaction))
    }
    readTransactionByAlphabetZA(){
        return this.readTransaction().sort((a, b) => b.transaction.localeCompare(a.transaction))
    }
    readTransactionByHigherNominal(){
        return this.readTransaction().sort((a, b) => a.nominal - b.nominal)
    }
    readTransactionBySmallerNominal(){
        return this.readTransaction().sort((a, b) => b.nominal - a.nominal)
    }
    onlyReadDebetTransaction(){
        return this.readTransaction().filter(trx => trx.debet)
    }
    onlyReadCreditTransaction(){
        return this.readTransaction().filter(trx => !trx.debet)
    }
    
}