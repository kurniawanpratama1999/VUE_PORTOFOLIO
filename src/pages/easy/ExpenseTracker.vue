<script setup>
    import ExpensePopupControl from '@/components/ExpensePopupControl.vue';
    import { ExpenseControl } from '@/utils/class/ExpenseControl';
    import { computed, reactive} from 'vue';
    const control = new ExpenseControl;

    const record = reactive({
      maximum: 1000000,
      idCount: 0,
      filterID: "a",
      filterNMNL: "",
      filterDATE: "",
    })

    const hook = reactive({
      id: null,
      date: null,
      transaction: null,
      debet: null,
      nominal: 0,
    })

    const setting = reactive({
      isControl: false,
      btnSave: (item) => {
        const {id, date, transaction, debet, nominal} = hook
        
        if (id === null) {
          record.idCount += 1
          const send = {id: record.idCount, date: new Date(date), 
                    transaction, debet, 
                    nominal}
  
          control.addTransaction(send)
        } else {
          const send = {id, date: new Date(date), 
                    transaction, debet, 
                    nominal}
          console.log(hook.nominal)
          control.updateTransaction(send)
        }

        setting.isControl = false;

        hook.id = null;
        hook.date = Date.now();
        hook.transaction = null;
        hook.debet = null;
        hook.nominal = 0;
      },
      btnClose: () => {
        setting.isControl = false
        hook.id = null;
        hook.date = Date.now();
        hook.transaction = null;
        hook.debet = null;
        hook.nominal = 0;
      }

    })

    const display = reactive({
      percentage: () => {
        const {total, creditTransaction} = utils

        const max = (record.maximum === null || record.maximum === 0 || !record.maximum) ? 100000 : record.maximum 
        return (total(creditTransaction) / max) * -100 
      },
      debet: () => {
        const {convertIDR, total, debetTransaction} = utils
        return convertIDR(total(debetTransaction))
      },
      credit: () => {
        const {convertIDR, total, creditTransaction} = utils
        return convertIDR(total(creditTransaction))
      },
      balance: () => {
        const {convertIDR, total, debetTransaction, creditTransaction} = utils
        return convertIDR(total(debetTransaction) + total(creditTransaction))
      }
    })
    
    const utils = reactive({
      transactions: computed(() => {
        let result;
        
        switch (record.filterID) {
          case "a":
            result = control.readTransaction();break
          case "z":
            result = control.readTransaction().sort((a, b) => b.id - a.id);
            break
        }

        switch (record.filterNMNL) {
          case "a":
            result = result.sort((a, b) => a.nominal - b.nominal);break;
            case "z":
              result = result.sort((a, b) => b.nominal - a.nominal);break;
              default:break;
            }
            
        switch (record.filterDATE) {
          case "a":
            result = result.sort((a, b) => a.date - b.date);break;
            
          case "z":
            result = result.sort((a, b) => b.date - a.date);break;
              
          default:break;
        }
        

        return result;
      }),
      debetTransaction: computed(() => control.onlyReadDebetTransaction()),
      creditTransaction: computed(() => control.onlyReadCreditTransaction()),
      total: (data) => data.map(item => item.nominal).reduce((a, b) => a + b, 0),
      convertIDR: (number) => {
        return new Intl.NumberFormat("id-ID", {style: 'currency', currency: "IDR", minimumFractionDigits: 0}).format(number)
      },
    })

    const btnNewDebet = () => {
      setting.isControl = true;
      hook.debet = false;
    }

    const btnList = (item) => {
      const [date, month, year] = [new Date(item.date).getDate(), new Date(item.date).getMonth(), new Date(item.date).getFullYear()]
      const sendDate = `${year}-${(month+1).toString().padStart(2, "0")}-${date}`

      hook.id = item.id;
      hook.date = sendDate;
      hook.transaction = item.transaction;
      hook.nominal = item.nominal;
      hook.debet = item.debet

      setting.isControl = true
    }

    record.idCount += 1
    control.addTransaction({id: record.idCount, date: Date.now(), transaction: "Buy Coffe", debet: false, nominal: 4000});
    record.idCount += 1
    control.addTransaction({id: record.idCount, date: Date.now(), transaction: "Service Motor", debet: false, nominal: 50000});
    record.idCount += 1
    control.addTransaction({id: record.idCount, date: Date.now(), transaction: "Buy Quota", debet: false, nominal: 15000});
    record.idCount += 1
    control.addTransaction({id: record.idCount, date: Date.now(), transaction: "Eat", debet: false, nominal: 12000});
    record.idCount += 1
    control.addTransaction({id: record.idCount, date: Date.now(), transaction: "Income", debet: true, nominal: 120000});
</script>

<template>
  <form>
    <h2>Expense Tracker</h2>
    <p class="debet_total">{{ display.debet() }}</p>
    <p class="credit_total">{{ display.credit()}}</p>
    <p class="balance_total">{{ display.balance() }}</p>
    <p class="percentage_total">{{ display.percentage() + '%' }}</p>
    <label for="maximum" class="maximum">
      <input type="number" name="maximum" id="maximum" placeholder="Maximum Expense 0.00" v-model="record.maximum">
    </label>

    <select name="id" id="id" class="filter_id" v-model="record.filterID">
      <option value="a">id(0~9)</option>
      <option value="z">id(9~0)</option>
    </select>
    <select name="nominal" id="nominal" class="filter_nominal" v-model="record.filterNMNL">
      <option value="">~ nmnl ~</option>
      <option value="a">nmnl(0~9)</option>
      <option value="z">nmnl(9~0)</option>
    </select>
    <select name="date" id="date" class="filter_date" v-model="record.filterDATE">
      <option value="">~ date ~</option>
      <option value="a">date(a~z)</option>
      <option value="z">date(z~a)</option>
    </select>

    <ul>
      <li v-for="(item, key) in utils.transactions" :key>
        <button type="button" :class="[item.debet ? 'debet' : 'credit']" @click="btnList(item)">
          <span class="item_id">id: {{ item.id }}</span>
          <span class="item_date">{{ new Intl.DateTimeFormat("id-ID", {dateStyle: "short"}).format(item.date) }}</span>
          <span class="item_nominal">{{ utils.convertIDR(item.nominal) }}</span>
          <span class="item_transaction">{{ item.transaction }}</span>
        </button>
      </li>
    </ul>

    <!--  -->
    <ExpensePopupControl :hook :setting/>
    <!--  -->
    <button class="new_debet" type="button" @click="btnNewDebet">Add Transaction</button>
  </form>
</template>

<style lang="css" scoped>
form{
  background-color: rgba(255, 255, 255, 0.4);
  margin: 0px 10px;
  padding: 10px;
  border-radius: 5px;
  display: grid;
  grid-template-areas: 
  'h2 h2 h2 h2 h2 h2'
  'db db db cr cr cr'
  'bl bl bl pr pr pr'
  'mx mx mx mx mx mx'
  'fa fa fn fn fd fd'
  'ls ls ls ls ls ls'
  '.. nd nd nd nd ..';

  grid-template-columns: repeat(6, 1fr);
  row-gap: 10px;
  column-gap: 5px;
  position: relative;
}

h2 {
  grid-area: h2;
  background-color: lightsalmon;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
}

p[class*="total"] {
  font-weight: bold;
  background-color: whitesmoke;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Courier New', Courier, monospace;
  letter-spacing: 2px;
  border-radius: 5px;
}

.debet_total {
  grid-area: db;
  border-top: 10px solid rgb(73, 214, 73);
  color: darkgreen;
}

.credit_total {
  grid-area: cr;
  border-top: 10px solid rgb(255, 137, 137);
  color: darkred;
}

.balance_total {
  grid-area: bl;
  border-top: 10px solid rgb(88, 88, 236);
  color: darkblue;
}

.percentage_total {
  grid-area: pr;
  border-top: 10px solid rgb(206, 88, 236);
  color: darkmagenta;
}

.maximum {
  grid-area: mx;
  border-bottom: 1px solid;
  display: grid;
}

.maximum input {
  padding: 5px;
  background-color: transparent;
  border: 0;
  outline: 0px;
  font-family: 'Courier New', Courier, monospace;
  font-style: italic;
}

select[class*="filter_"]{
  background-color: rgba(255, 255, 255, .7);
  border: 0;
  outline: 0;
  text-align: center;
}

#id {
  grid-area: fa;
}
#nominal {
  grid-area: fn;
}
#date {
  grid-area: fd;
}

ul {
  grid-area: ls;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

ul li button {
  background-color: rgba(245, 245, 245, 0.7);
  width: 100%;
  display: grid;
  grid-template-areas: 
  'id nominal date'
  'trx trx trx';
  grid-template-columns: repeat(3, 1fr);
  border-width: 0px 10px 0px 10px;
  border-style: solid;
  padding: 5px 10px;
  row-gap: 5px;
  cursor: pointer;
}

ul li button.debet {
  border-color: green;
}

ul li button.credit {
  border-color: darkred;
}

ul li button span.item_id {
  grid-area: id;
  text-align: left;
  font-size: .7rem;
  color: rgba(0, 0, 0, .5);
  font-style: italic;
}

ul li button span.item_date {
  grid-area: date;
  text-align: right;
  font-size: .7rem;
  color: rgba(0, 0, 0, .5);
  font-style: italic;
}

ul li button span.item_nominal {
  grid-area: nominal;
  text-align: center;
  color: rgba(0, 0, 0, .5);
  font-size: .7rem;
  font-style: italic;
}

ul li button span.item_transaction {
  grid-area: trx;
  text-align: left;
}

button[class*="new_"] {
  height: 40px;
  border-radius: 5px;
  font-size: .9rem;
}

.new_debet {
  grid-area: nd;
  background-color: lightgreen;
  border: 1px solid green;
  color: darkgreen;
}

.new_credit {
  grid-area: nc;
  background-color: lightcoral;
  border: 1px solid darkred;
  color: darkred;
}
</style>
