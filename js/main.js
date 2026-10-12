const t = path => I18N.t(path);
const store = {
  get(key, fallback){ try{ return JSON.parse(localStorage.getItem(key)) ?? fallback; }catch{ return fallback; } },
  set(key, val){ try{ localStorage.setItem(key, JSON.stringify(val)); }catch{} }
};
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let favs = store.get('kalasin_favs', []);

function cardHTML(p){
  const on = favs.includes(p.id);
  const name = t(`items.${p.id}.name`);
  return `<div class="col-md-6 col-lg-4">
    <article class="place">
      <div class="thumb ${TYPE_CLASS[p.type]}"><i class="bi ${p.icon}" aria-hidden="true"></i><img src="${p.img}" alt="${esc(name)}" loading="lazy" onerror="this.remove()"></div>
      <div class="body">
        <span class="mb-2"><span class="tag">${esc(t('type.' + p.type))}</span></span>
        <h3>${esc(name)}</h3>
        <div class="meta mb-2"><i class="bi bi-geo-alt"></i> ${esc(t(`items.${p.id}.area`))}</div>
        <p>${esc(t(`items.${p.id}.desc`))}</p>
        <button class="btn btn-sm fav-btn ${on ? 'on' : ''}" data-id="${p.id}" aria-pressed="${on}">
          <i class="bi ${on ? 'bi-heart-fill' : 'bi-heart'}"></i> ${esc(t(on ? 'card.saved' : 'card.save'))}
        </button>
      </div>
    </article></div>`;
}

function render(){
  Object.entries(LIST_ID).forEach(([type, id]) => {
    document.getElementById(id).innerHTML = PLACES.filter(p => p.type === type).map(cardHTML).join('');
  });
  document.getElementById('favCount').textContent = favs.length;
}

document.addEventListener('click', e => {
  const btn = e.target.closest('.fav-btn');
  if(!btn) return;
  const id = btn.dataset.id;
  favs = favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id];
  store.set('kalasin_favs', favs);
  render();
});

// ฟอร์มติดต่อ
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.cName.value.trim(), email = form.cEmail.value.trim(), msg = form.cMsg.value.trim();
  if(!name || !/^\S+@\S+\.\S+$/.test(email) || !msg){
    formStatus.className = 'mt-3 text-danger';
    formStatus.textContent = t('contact.err');
    return;
  }
  const msgs = store.get('kalasin_messages', []);
  msgs.push({name, email, msg, at: new Date().toLocaleString(I18N.lang === 'th' ? 'th-TH' : 'en-GB')});
  store.set('kalasin_messages', msgs);
  form.reset();
  formStatus.className = 'mt-3 text-success';
  formStatus.textContent = t('contact.ok');
});

document.getElementById('btnShowMsgs').addEventListener('click', () => {
  const msgs = store.get('kalasin_messages', []);
  document.getElementById('msgList').innerHTML = msgs.length
    ? msgs.map(m => `<div class="border-bottom py-2"><strong>${esc(m.name)}</strong> (${esc(m.email)}) <span class="text-muted">${esc(m.at)}</span><br>${esc(m.msg)}</div>`).join('')
    : esc(t('contact.empty'));
});

// ไฮไลต์เมนูตามส่วนที่กำลังดู
const links = [...document.querySelectorAll('.navbar .nav-link')];
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if(en.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id));
  });
}, {rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('header[id],section[id]').forEach(s => io.observe(s));

// ปิดเมนูมือถือหลังกดลิงก์
links.forEach(l => l.addEventListener('click', () => {
  const m = document.getElementById('menu');
  if(m.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(m).hide();
}));

// วาดการ์ดใหม่เมื่อเปลี่ยนภาษา
document.addEventListener('langchange', () => {
  render();
  formStatus.textContent = '';
  document.getElementById('msgList').textContent = '';
});
render();
