document.addEventListener('DOMContentLoaded',()=>{
  const listaMusicas=document.getElementById('lista-musicas');
  const resultado=document.getElementById('resultado');
  const inputBusca=document.getElementById('busca');
  const botaoBuscar=document.getElementById('botaoBuscar');
  const btnCompartilhar=document.getElementById('btnCompartilhar');
  const modoPalcoBtn=document.getElementById('modoPalcoBtn');
  const iconeBusca=document.getElementById('icone-busca');
  const descricao=document.getElementById('descricao');
  const buscaContainer=document.querySelector('.busca-container');

  const musicas=Object.keys(cifras);

  function mostrarListaMusicas(busca){
    listaMusicas.innerHTML='';
    if(!busca.trim()) return;
    const filtradas=musicas.filter(m=>m.toLowerCase().includes(busca.toLowerCase()));
    if(filtradas.length===0){
      listaMusicas.innerHTML=`<div class="musica"><strong>Nenhum resultado encontrado</strong></div>`;
      return;
    }
    filtradas.forEach(nome=>{
      const div=document.createElement('div');
      div.classList.add('musica');
      div.dataset.nome=nome;
      div.innerHTML=`<strong>${cifras[nome].titulo}</strong><span>${cifras[nome].artista}</span>`;
      listaMusicas.appendChild(div);
    });
  }

  botaoBuscar.addEventListener('click',()=>{
    buscaContainer.classList.add('active');
    inputBusca.focus();
    resultado.style.display='none';
    modoPalcoBtn.style.display='none';
  });

  listaMusicas.addEventListener('click',e=>{
    const item=e.target.closest('.musica');
    if(!item||item.innerText==="Nenhum resultado encontrado") return;
    const nome=item.dataset.nome;
    const cifra=getCifra(nome);
    resultado.innerHTML=`<pre>${cifra}</pre>`;
    resultado.style.display='block';
    modoPalcoBtn.style.display='block';

    buscaContainer.classList.remove('active');
    botaoBuscar.style.display='none';
    descricao.style.display='none';

    iconeBusca.style.display='block';
    btnCompartilhar.style.display='block';
  });

  iconeBusca.addEventListener('click',()=>{
    buscaContainer.classList.add('active');
    inputBusca.focus();
    botaoBuscar.style.display='block';
    descricao.style.display='block';
  });

  btnCompartilhar.addEventListener('click',()=>{
    if(!resultado.innerText.trim()){ alert('Selecione uma música primeiro!'); return; }
    if(navigator.share){ navigator.share({title:'Compartilhar Música',text:`Olha essa música:\n${resultado.innerText}`,url:window.location.href}); }
    else{ alert('Seu navegador não suporta compartilhamento nativo!'); }
  });

  modoPalcoBtn.addEventListener('click',()=>{
    const palco=document.createElement('div');
    palco.classList.add('modo-palco');
    palco.innerHTML=`<pre>${resultado.innerText}</pre><button id="sairPalco">❌ Sair do Palco</button>`;
    document.body.appendChild(palco);
    document.getElementById('sairPalco').addEventListener('click',()=>{ palco.remove(); });
  });

  inputBusca.addEventListener('keyup',e=>{ if(e.key==="Enter") mostrarListaMusicas(inputBusca.value); });
});









