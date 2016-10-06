var corrupt = { '0': { id: 23, weight: 1, name: 'susan' },
  '1':
   { id: 24,
     weight: 1.5,
     name: 'bobby',
     total: { '0': [Object], '1': [Object] } } }
var billArray = [
  {
    id: 23,
  name: "susan",
  weight: 1,
  total: [
    // {description: "gas", payment: 23},{description: "drugs", payment: 100}
  ]
},
{
  id: 24,
name: "bobby",
weight: 1.5,
total: [
  {description: "food",payment: 25} , {description: "candy", payment: 15}
]
}
]
var billObject = {
  0:{id: 23, name:"susan", weight: 1, total: {
    0:{description: "gas", payment: 23},
    1:{description: "drugs", payment: 100}
  }
},
  1:{id: 23, name:"bobby", weight: 1.5, total: {
    0:{description: "food", payment: 25},
    1:{description: "candy", payment: 15}
  }
}
}

function _convertBillToObject(bill){
  return bill.reduce((obj,item,idx) => {
    obj[idx]={id:item.id, weight:item.weight, name:item.name, total: item.total.reduce((o,it,x)=>{
      o[x]={description:it.description, payment:it.payment};
      return o;
    },{})}
    return obj
  },{})
}
function _convertBillToArray(bill){
  return Object.keys(bill).reduce((arr,item,idx) => {

    var temp = {};
    temp.id=bill[item].id;
    temp.name=bill[item].name;
    temp.weight=bill[item].weight;
    var temp2 = bill[item].total || [];
    temp.total = Object.keys(temp2).reduce((ar,it,ix) => {
      ar.push(temp2[it])
      return ar;
    },[])
    arr.push(temp)
    return arr;
  },[])
}
function _totalBill(bill){
  var total = 0
  bill.forEach((a)=>{
    if(a.total.length === 0) return;
    return a.total.forEach(b => {
      total += b.payment
    })
  })
  return total
}
//console.log(_convertBillToObject(billArray));
console.log(_convertBillToArray(corrupt));
//console.log(_totalBill(billArray));
