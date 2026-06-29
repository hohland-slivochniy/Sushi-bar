
let cart={}
function add(btn){
 const b=btn.parentNode.querySelector('.badge')
 cart[b.innerText=(+b.innerText)+1]=true
}
function order(){alert('Заказ успешно оформлен. Корзина очищена')}
