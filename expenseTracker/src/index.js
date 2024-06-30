import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { useState } from "react";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <AddExpense />
  </StrictMode>
);

function AddExpense()
{
  let name, value;
  const [data, SetData] = useState([]);
  const [expense, SetExpense] = useState({des:'', amount:'', type:'Food'});

  const handelInput = (event) =>
    {
      name = event.target.name;
      value = event.target.value;
      SetExpense({...expense, [name]:value});
    }
  

  const submitInput = () =>
    {
      let {des, amount, type} = expense;
      const mili = Date.now();
      const date = new Date(mili);
      const d = date.toString();
      SetData([...data, {des, amount, type, d}]);
      SetExpense({des:'', amount:'', type:'Food'});
    }
  
  const deleteInfo = (index) =>
    {
      console.log('delete')
      console.log(data)
      const newArray = data.filter((item, i) => i != index)
      SetData(newArray)
      console.log(data)
    }
  return (
    <>
    <section id="add">
      <div className='text'>
        <p>Add Expense To your ExpenseList.</p>
      </div>
      <div className='expense'>
        <form>
          <label>Desicription</label>
          <input name='des' type="text" value={expense.des} onChange={handelInput}/>
          <br/>
          <label>Amount</label>
          <input name='amount' type="number"  value={expense.amount} onChange={handelInput}/>
          <br/>
          <label>Category</label>
          <select name="type" value={expense.type} onChange={handelInput}>
            <option value="food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Other">Other</option>
          </select>
          <br/>
          <button type='button' onClick={submitInput}>Add it</button>
        </form>
      </div>
    </section>
    <br/>
    <p className='exp-text'>Expense List</p>
    <section id='list'>
        <table>
          <tbody>
          <tr>
            <td>Sr. no.</td>
            <td>Desicription</td>
            <td>Amount</td>
            <td>Type</td>
            <td>Date and Time</td>
            <td></td>
          </tr>
          {
            data.map(
              (info, index) =>{
                return (
                  <tr>
                    <td>{index}</td>
                    <td>{info.des}</td>
                    <td>{info.amount}</td>
                    <td>{info.type}</td>
                    <td>{info.d}</td>
                    <td><button onClick={() => deleteInfo(index)}>x</button></td>
                  </tr>
                )
              }
            )
          }
          </tbody>
        </table>
      </section>
    </>
  )
}
