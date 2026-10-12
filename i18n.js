// ระบบหลายภาษา: อ่านข้อความจาก LANG[th|en] ตาม data-i18n="กลุ่ม.คีย์"
// เพิ่มภาษาใหม่: สร้าง js/lang/xx.js, เพิ่ม <script> ใน index.html และปุ่มที่ data-lang="xx"
const I18N = {
  lang: 'th',
  t(path){
    const get = l => path.split('.').reduce((o, k) => o?.[k], LANG[l]);
    return get(this.lang) ?? get('th') ?? path;
  },
  apply(){
    document.documentElement.lang = this.lang;
    document.title = this.t('meta.title');
    document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = this.t(el.dataset.i18n));
    document.querySelectorAll('[data-i18n-alt]').forEach(el => el.alt = this.t(el.dataset.i18nAlt));
    document.querySelectorAll('[data-i18n-title]').forEach(el => el.title = this.t(el.dataset.i18nTitle));
    document.querySelectorAll('[data-lang]').forEach(b => b.classList.toggle('active', b.dataset.lang === this.lang));
    document.dispatchEvent(new Event('langchange'));
  },
  set(lang){
    if(!LANG[lang]) return;
    this.lang = lang;
    try{ localStorage.setItem('kalasin_lang', lang); }catch{}
    this.apply();
  },
  init(){
    let saved = null;
    try{ saved = localStorage.getItem('kalasin_lang'); }catch{}
    this.lang = LANG[saved] ? saved : 'th';
    document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => this.set(b.dataset.lang)));
    this.apply();
  }
};
I18N.init();
