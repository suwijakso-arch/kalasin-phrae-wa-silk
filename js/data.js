// ข้อมูลที่ไม่ขึ้นกับภาษา (ชื่อ/คำอธิบายอยู่ใน js/lang/*.js ตาม id)
// type: attr = สถานที่ท่องเที่ยว | food = ร้านอาหาร | cafe = คาเฟ่
const PLACES = [
  {id:'a1', type:'attr', icon:'bi-water',          img:'img/lampao.jpg'},
  {id:'a2', type:'attr', icon:'bi-bricks',         img:'img/phukumkhao.jpg'},
  {id:'a3', type:'attr', icon:'bi-brightness-high',img:'img/wat-phusing.jpg'},
  {id:'a4', type:'attr', icon:'bi-scissors',       img:'img/weaving-bannphon.jpg'},
  {id:'f1', type:'food', icon:'bi-egg-fried',      img:'img/food-isan.jpg'},
  {id:'f2', type:'food', icon:'bi-fish',           img:'img/food-lampao.jpg'},
  {id:'f3', type:'food', icon:'bi-cup-hot',        img:'img/food-phutai.jpg'},
  {id:'c1', type:'cafe', icon:'bi-cup-straw',      img:'img/cafe-1.jpg'},
  {id:'c2', type:'cafe', icon:'bi-cup-hot-fill',   img:'img/cafe-2.jpg'},
  {id:'c3', type:'cafe', icon:'bi-cake2',          img:'img/cafe-3.jpg'}
];
const TYPE_CLASS = {attr:'t-attr', food:'t-food', cafe:'t-cafe'};
const LIST_ID = {attr:'listPlaces', food:'listFood', cafe:'listCafe'};
